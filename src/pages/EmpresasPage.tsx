import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { fetchEmpresas } from "@/lib/api";

export default function EmpresasPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["empresas"],
    queryFn: fetchEmpresas,
  });

  return (
    <div>
      <PageHeader
        title="Empresas"
        description="Gerencie os cadastros de empresas e contratos." 
        actions={
          <Link to="/admin/empresas/cadastrar">
            <Button>Nova empresa</Button>
          </Link>
        }
      />

      <div className="rounded-lg border border-border bg-card p-6">
        {isLoading ? (
          <p>Carregando empresas...</p>
        ) : isError ? (
          <p>Erro ao buscar empresas.</p>
        ) : data && data.length > 0 ? (
          <div className="grid gap-4">
            {data.map((empresa) => (
              <div key={empresa.id} className="rounded-md border border-input bg-background p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{empresa.nome}</p>
                    <p className="text-sm text-muted-foreground">CNPJ: {empresa.cnpj}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/admin/empresas/${empresa.id}/editar`}>
                      <Button size="sm">Editar</Button>
                    </Link>
                    <Link to={`/admin/empresas/${empresa.id}/excluir`}>
                      <Button variant="destructive" size="sm">
                        Excluir
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  <p>Endereço: {empresa.endereco}</p>
                  <p>Telefone: {empresa.telefone}</p>
                  <p>Tempo de contrato: {empresa.tempoContrato}</p>
                  <p>
                    Serviços: {empresa.servicos?.map((s) => s.nome).join(", ") || "Nenhum"}
                  </p>
                  {empresa.contratoPath && (
                    <a
                      href={empresa.contratoPath}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Ver contrato
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma empresa cadastrada.</p>
        )}
      </div>
    </div>
  );
}
