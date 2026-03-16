import { ShoppingCart, Target, TrendingUp, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { label: "Vendas no Mês", value: "0", change: "+0%", up: true, icon: ShoppingCart },
  { label: "Meta Mensal", value: "R$ 0,00", change: "0% atingido", up: true, icon: Target },
  { label: "Ticket Médio", value: "R$ 0,00", change: "+0%", up: true, icon: TrendingUp },
  { label: "Clientes Ativos", value: "0", change: "+0", up: true, icon: Users },
];

export default function CrmDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Painel CRM Saúde</h1>
        <p className="text-sm text-muted-foreground mt-1">Acompanhe suas métricas de vendas e desempenho.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card border border-border rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground tabular-nums">{s.value}</p>
                <p className={`text-xs mt-1 flex items-center gap-0.5 ${s.up ? "text-success" : "text-destructive"}`}>
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent sales and pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Últimas Vendas</h2>
          <div className="text-sm text-muted-foreground text-center py-10">
            Nenhuma venda registrada ainda.
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Pipeline de Vendas</h2>
          <div className="space-y-3">
            {["Prospecção", "Qualificação", "Proposta", "Negociação", "Fechamento"].map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-28">{stage}</span>
                <div className="flex-1 bg-muted rounded-full h-2.5">
                  <div className="bg-primary/40 rounded-full h-2.5" style={{ width: "0%" }} />
                </div>
                <span className="text-xs text-muted-foreground tabular-nums w-6 text-right">0</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">Ranking de Vendedores</h2>
        <div className="text-sm text-muted-foreground text-center py-10">
          Nenhum dado de ranking disponível.
        </div>
      </div>
    </div>
  );
}
