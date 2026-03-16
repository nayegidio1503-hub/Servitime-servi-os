import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/PageHeader";
import { toast } from "@/components/ui/use-toast";
import { fetchServicos, createEmpresa } from "@/lib/api";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  cep: z.string().min(1, "CEP é obrigatório"),
  telefone: z.string().min(1, "Telefone celular é obrigatório"),
  telefoneFixo: z.string().optional(),
  cnpj: z.string().min(1, "CNPJ é obrigatório"),
  tempoContrato: z.string().min(1, "Tempo de contrato é obrigatório"),
  servicos: z.array(z.number()).min(1, "Selecione ao menos um serviço"),
  contrato: z.any().refine((f) => f?.length > 0, "Contrato é obrigatório"),
});

type FormValues = z.infer<typeof schema>;

export default function CadastrarEmpresa() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const servicesQuery = useQuery({
    queryKey: ["servicos"],
    queryFn: fetchServicos,
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => createEmpresa(formData),
    onSuccess: () => {
      toast({ title: "Empresa cadastrada", description: "O cadastro foi salvo com sucesso." });
      queryClient.invalidateQueries(["empresas"]);
      navigate("/admin/empresas");
    },
    onError: (error) => {
      toast({ title: "Erro ao salvar", description: (error as Error).message });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      endereco: "",
      cep: "",
      telefone: "",
      telefoneFixo: "",
      cnpj: "",
      tempoContrato: "",
      servicos: [],
      contrato: undefined,
    },
  });

  const services = useMemo(() => servicesQuery.data ?? [], [servicesQuery.data]);

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("nome", values.nome);
    formData.append("endereco", values.endereco);
    formData.append("telefone", values.telefone);
    formData.append("cnpj", values.cnpj);
    formData.append("tempoContrato", values.tempoContrato);
    values.servicos.forEach((id) => formData.append("servicos", String(id)));

    if (values.contrato?.[0]) {
      formData.append("contrato", values.contrato[0]);
    }

    mutation.mutate(formData);
  };

  return (
    <div>
      <PageHeader
        title="Cadastrar Empresa"
        description="Crie um novo cadastro de empresa e vincule serviços contratados."
      />

      <div className="rounded-lg border border-border bg-card p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: ServiTime" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, número, bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefoneFixo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone fixo (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 1234-5678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000/0000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tempoContrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo de duração do contrato</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 12 meses" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="servicos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serviços contratados</FormLabel>
                  <div className="grid gap-2 rounded-md border border-input bg-background p-4">
                    {services.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Carregando serviços...</p>
                    ) : (
                      services.map((servico) => {
                        const checked = field.value.includes(servico.id);
                        return (
                          <label key={servico.id} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(checked) => {
                                const next = checked
                                  ? [...field.value, servico.id]
                                  : field.value.filter((id) => id !== servico.id);
                                field.onChange(next);
                              }}
                            />
                            <span>ServiTime {servico.nome}</span>
                          </label>
                        );
                      })
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contrato de prestação de serviço</FormLabel>
                  <FormControl>
                    <label className="flex w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground shadow-sm transition hover:border-primary">
                      <span className="truncate">{field.value?.[0]?.name ?? "Selecione um arquivo (PDF/DOCX)"}</span>
                      <span className="text-xs text-muted-foreground">Escolher</span>
                      <input
                        type="file"
                        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={(event) => field.onChange(event.target.files)}
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Salvando..." : "Cadastrar empresa"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
