import { useState } from "react";
import { Target, Search, Filter, MoreHorizontal } from "lucide-react";

const ETAPAS: Record<string, { label: string; color: string }> = {
  prospeccao: { label: "Prospecção", color: "bg-muted text-muted-foreground" },
  qualificacao: { label: "Qualificação", color: "bg-warning/10 text-warning" },
  proposta: { label: "Proposta", color: "bg-primary/10 text-primary" },
  negociacao: { label: "Negociação", color: "bg-accent text-accent-foreground" },
  fechamento: { label: "Fechada", color: "bg-success/10 text-success" },
};

export default function MinhasVendas() {
  const [busca, setBusca] = useState("");
  const [filtroEtapa, setFiltroEtapa] = useState("todas");

  // Placeholder: no data yet
  const vendas: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          Minhas Vendas
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Acompanhe todas as suas vendas e leads.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por cliente, plano..."
            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={filtroEtapa}
          onChange={(e) => setFiltroEtapa(e.target.value)}
          className="px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none"
        >
          <option value="todas">Todas as Etapas</option>
          {Object.entries(ETAPAS).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Cliente</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Plano</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Valor</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Etapa</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Data</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vendas.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-muted-foreground">
                    Nenhuma venda registrada ainda. Comece registrando sua primeira venda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
