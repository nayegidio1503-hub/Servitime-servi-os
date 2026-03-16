import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CrmLayout from "@/components/layout/CrmLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ConfiguracoesPage from "@/pages/ConfiguracoesPage";
import StructuralPage from "@/pages/StructuralPage";
import EmpresasPage from "@/pages/EmpresasPage";
import CadastrarEmpresa from "@/pages/CadastrarEmpresa";
import AtualizarCadastroEmpresa from "@/pages/AtualizarCadastroEmpresa";
import ExcluirEmpresa from "@/pages/ExcluirEmpresa";
import NotFound from "@/pages/NotFound";

import CrmDashboard from "@/pages/crm/CrmDashboard";
import RegistrarVenda from "@/pages/crm/RegistrarVenda";
import MinhasVendas from "@/pages/crm/MinhasVendas";
import RankingGeral from "@/pages/crm/RankingGeral";
import RankingEquipe from "@/pages/crm/RankingEquipe";
import Criativos from "@/pages/crm/Criativos";
import GestaoEquipes from "@/pages/crm/GestaoEquipes";
import VisaoGerente from "@/pages/crm/VisaoGerente";
import MonitoramentoPonto from "@/pages/crm/MonitoramentoPonto";
import RegistrosPonto from "@/pages/crm/RegistrosPonto";

import {
  Building, DollarSign, BarChart3, Settings, Users, UserCircle,
  FileText, Receipt, FileCheck, Sparkles, Hammer, ShieldCheck, KeyRound,
  TreePine, Droplets, Sofa, HeartPulse, Briefcase, Eye, MapPin
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />

            {/* Admin */}
            <Route path="/admin/empresas" element={<EmpresasPage />} />
            <Route path="/admin/empresas/cadastrar" element={<CadastrarEmpresa />} />
            <Route path="/admin/empresas/:id/editar" element={<AtualizarCadastroEmpresa />} />
            <Route path="/admin/empresas/:id/excluir" element={<ExcluirEmpresa />} />

            <Route path="/admin/financeiro" element={<StructuralPage title="Financeiro" description="Controle financeiro e faturamento." icon={DollarSign} />} />
            <Route path="/admin/relatorios" element={<StructuralPage title="Relatórios" description="Relatórios gerenciais e operacionais." icon={BarChart3} />} />
            <Route path="/admin/configuracoes" element={<ConfiguracoesPage />} />

            {/* RH */}
            <Route path="/rh" element={<StructuralPage title="Painel RH" description="Visão geral de recursos humanos e gestão de ponto." icon={Users} badge="RH & Ponto" />} />
            <Route path="/rh/funcionarios" element={<StructuralPage title="Funcionários" description="Cadastro e gestão de funcionários." icon={UserCircle} />} />
            <Route path="/rh/folha" element={<StructuralPage title="Folha de Pagamento" description="Geração e gestão da folha de pagamento." icon={FileText} />} />
            <Route path="/rh/holerites" element={<StructuralPage title="Holerites" description="Visualização e emissão de holerites." icon={Receipt} />} />
            <Route path="/rh/atestados" element={<StructuralPage title="Atestados" description="Recebimento e gestão de atestados médicos." icon={FileCheck} />} />


            {/* Serviços */}
            <Route path="/servicos/limpeza" element={<StructuralPage title="ServiTime Limpeza" description="Gestão de equipes e escalas de limpeza." icon={Sparkles} badge="Serviço" />} />
            <Route path="/servicos/pos-obra" element={<StructuralPage title="ServiTime Pós-Obra" description="Gestão de limpeza e organização pós-obra." icon={Hammer} badge="Serviço" />} />
            <Route path="/servicos/portaria" element={<StructuralPage title="ServiTime Portaria" description="Gestão de equipes de portaria." icon={ShieldCheck} badge="Serviço" />} />
            <Route path="/servicos/controlador-acesso" element={<StructuralPage title="ServiTime Controlador de Acesso" description="Controle de acesso e monitoramento." icon={KeyRound} badge="Serviço" />} />
            <Route path="/servicos/jardinagem" element={<StructuralPage title="ServiTime Jardinagem" description="Gestão de equipes de jardinagem." icon={TreePine} badge="Serviço" />} />
            <Route path="/servicos/piscina" element={<StructuralPage title="ServiTime Limpeza e Manutenção de Piscina" description="Gestão de limpeza e manutenção de piscinas." icon={Droplets} badge="Serviço" />} />
            <Route path="/servicos/estofados" element={<StructuralPage title="ServiTime Limpeza de Estofados" description="Gestão de serviços de limpeza de estofados." icon={Sofa} badge="Serviço" />} />
            <Route path="/servicos/saude" element={<StructuralPage title="ServiTime Saúde" description="Gestão de serviços de saúde." icon={HeartPulse} badge="Serviço" />} />
            <Route path="/servicos/reformas" element={<StructuralPage title="ServiTime Reformas em Geral" description="Gestão de serviços de reforma." icon={Hammer} badge="Serviço" />} />

          </Route>

          {/* CRM ServiTime Saúde - Layout isolado */}
          <Route element={<CrmLayout />}>
            <Route path="/crm" element={<CrmDashboard />} />
            <Route path="/crm/registrar-venda" element={<RegistrarVenda />} />
            <Route path="/crm/minhas-vendas" element={<MinhasVendas />} />
            <Route path="/crm/ranking-geral" element={<RankingGeral />} />
            <Route path="/crm/ranking-equipe" element={<RankingEquipe />} />
            <Route path="/crm/criativos" element={<Criativos />} />
            <Route path="/crm/equipes" element={<GestaoEquipes />} />
            <Route path="/crm/gerente" element={<VisaoGerente />} />
            <Route path="/crm/monitoramento-ponto" element={<MonitoramentoPonto />} />
            <Route path="/crm/registros-ponto" element={<RegistrosPonto />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
