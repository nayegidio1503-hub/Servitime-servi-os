import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/PageHeader";
import { toast } from "@/components/ui/use-toast";
import { fetchEmpresa, fetchServicos, updateEmpresa } from "@/lib/api";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  cep: z.string().min(1, "CEP é obrigatório"),
  telefone: z.string().min(1, "Telefone celular é obrigatório"),
  telefoneFixo: z.string().optional(),
  cnpj: z.string().min(1, "CNPJ é obrigatório"),
  tempoContrato: z.string().min(1, "Tempo de contrato é obrigatório"),
  servicos: z.array(z.number()).min(1, "Selecione ao menos um serviço"),
  contrato: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AtualizarCadastroEmpresa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const companyId = Number(id);

  const servicesQuery = useQuery({
    queryKey: ["servicos"],
    queryFn: fetchServicos,
  });

  const empresaQuery = useQuery({
    queryKey: ["empresa", companyId],
    queryFn: () => fetchEmpresa(companyId),
    enabled: !!companyId,
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateEmpresa(companyId, formData),
    onSuccess: () => {
      toast({ title: "Empresa atualizada", description: "Os dados foram salvos com sucesso." });
      queryClient.invalidateQueries(["empresas"]);
      queryClient.invalidateQueries(["empresa", companyId]);
      navigate("/admin/empresas");
    },
    onError: (error) => {
      toast({ title: "Erro ao atualizar", description: (error as Error).message });
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

  useEffect(() => {
    if (empresaQuery.data) {
      form.reset({
        nome: empresaQuery.data.nome,
        endereco: empresaQuery.data.endereco,
        cep: empresaQuery.data.cep ?? "",
        telefone: empresaQuery.data.telefone,
        telefoneFixo: empresaQuery.data.telefoneFixo ?? "",
        cnpj: empresaQuery.data.cnpj,
        tempoContrato: empresaQuery.data.tempoContrato,
        servicos: (empresaQuery.data.servicos ?? []).map((s) => s.id),
        contrato: undefined,
      });
    }
  }, [empresaQuery.data, form]);

  const services = useMemo(() => servicesQuery.data ?? [], [servicesQuery.data]);

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("nome", values.nome);
    formData.append("endereco", values.endereco);
    formData.append("cep", values.cep);
    formData.append("telefone", values.telefone);
    formData.append("telefoneFixo", values.telefoneFixo ?? "");
    formData.append("cnpj", values.cnpj);
    formData.append("tempoContrato", values.tempoContrato);
    values.servicos.forEach((id) => formData.append("servicos", String(id)));

    if (values.contrato?.[0]) {
      formData.append("contrato", values.contrato[0]);
    }

    mutation.mutate(formData);
  };

  if (empresaQuery.isLoading || servicesQuery.isLoading) {
    return <div>Carregando...</div>;
  }

  if (empresaQuery.isError) {
    return <div>Erro ao carregar dados da empresa.</div>;
  }

  return (
    <div>
      <PageHeader
        title="Atualizar Empresa"
        description="Edite os dados e o contrato da empresa." 
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

            <div className="space-y-2">
              <p className="text-sm font-medium">Contrato de prestação de serviço</p>
              <p className="text-xs text-muted-foreground">Envie um novo arquivo apenas se quiser substituir o contrato atual.</p>
              {empresaQuery.data?.contratoPath ? (
                <a
                  href={empresaQuery.data.contratoPath}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Ver contrato atual
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum contrato armazenado.</p>
              )}

              <FormField
                control={form.control}
                name="contrato"
                render={({ field }) => (
                  <FormItem>
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
            </div>

            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Atualizando..." : "Atualizar empresa"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
