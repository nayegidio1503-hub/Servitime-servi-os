import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { toast } from "@/components/ui/use-toast";
import { deleteEmpresa } from "@/lib/api";

export default function ExcluirEmpresa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const companyId = Number(id);

  const mutation = useMutation({
    mutationFn: () => deleteEmpresa(companyId),
    onSuccess: () => {
      toast({ title: "Empresa excluída", description: "Os dados foram removidos com sucesso." });
      navigate("/admin/empresas");
    },
    onError: (error) => {
      toast({ title: "Erro ao excluir", description: (error as Error).message });
    },
  });

  const onDelete = () => {
    if (!companyId) {
      toast({ title: "ID inválido", description: "Nenhuma empresa selecionada." });
      return;
    }

    const confirmed = window.confirm("Tem certeza que deseja excluir esta empresa? Esta ação não pode ser desfeita.");
    if (!confirmed) return;

    mutation.mutate();
  };

  return (
    <div>
      <PageHeader
        title="Excluir Empresa"
        description="Remova a empresa do cadastro e delete o arquivo de contrato associado." 
      />

      <div className="rounded-lg border border-border bg-card p-6">
        <p className="mb-4 text-sm text-muted-foreground">
          Clique no botão abaixo para excluir permanentemente esta empresa e seus dados.
        </p>
        <Button variant="destructive" onClick={onDelete} disabled={mutation.isLoading}>
          {mutation.isLoading ? "Excluindo..." : "Excluir Empresa"}
        </Button>
      </div>
    </div>
  );
}
