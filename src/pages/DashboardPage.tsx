import { PageHeader } from "@/components/layout/PageHeader";
import { SkeletonCards } from "@/components/layout/SkeletonCards";
import { LayoutDashboard, Users, Building, DollarSign, ClipboardList, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Funcionários Ativos", value: "248", icon: Users, change: "+12%" },
  { label: "Empresas Cadastradas", value: "32", icon: Building, change: "+3" },
  { label: "Receita Mensal", value: "R$ 485.200", icon: DollarSign, change: "+8.5%" },
  { label: "Ordens de Serviço", value: "156", icon: ClipboardList, change: "23 abertas" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Visão geral do sistema ServiTime"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-lg p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Atividade Recente
          </h3>
          <div className="space-y-3">
            {["Novo funcionário cadastrado", "Ordem de serviço #142 concluída", "Pagamento processado - Empresa ABC", "Atestado recebido - João Silva", "Equipe de limpeza alocada - Condomínio Sol"].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{item}</p>
                  <p className="text-xs text-muted-foreground">Há {i + 1}h</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Próximas Tarefas
          </h3>
          <div className="space-y-3">
            {["Fechar folha de pagamento - Mar/2026", "Renovar contrato - Empresa XYZ", "Reunião de supervisores", "Vistoria - Condomínio Estrela", "Revisão de escalas - Portaria"].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className="h-4 w-4 rounded-full border-2 border-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{item}</p>
                  <p className="text-xs text-muted-foreground">Em {i + 1} dia(s)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
