import { Monitor, TrendingUp, Users, DollarSign, Target } from "lucide-react";

const metrics = [
  { label: "Total de Vendas", value: "0", icon: DollarSign },
  { label: "Vendedores Ativos", value: "0", icon: Users },
  { label: "Meta da Equipe", value: "R$ 0,00", icon: Target },
  { label: "Taxa de Conversão", value: "0%", icon: TrendingUp },
];

export default function VisaoGerente() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6 text-primary" />
          Visão Gerente
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Métricas e desempenho da equipe.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{m.label}</span>
                <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{m.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Desempenho por Vendedor</h2>
          <div className="text-sm text-muted-foreground text-center py-10">
            Nenhum dado disponível.
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Metas vs Realizado</h2>
          <div className="text-sm text-muted-foreground text-center py-10">
            Nenhum dado disponível.
          </div>
        </div>
      </div>
    </div>
  );
}
