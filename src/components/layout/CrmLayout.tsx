import { useState } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import logo from "@/assets/logo.png";
import {
  ChevronDown, ChevronRight, X, LogOut,
  LayoutDashboard, ShoppingCart, Target, UsersRound, Monitor, Clock, ListChecks,
  Trophy, Users, Palette
} from "lucide-react";

const CRM_NAV = [
  { name: "Painel CRM", href: "/crm", icon: LayoutDashboard },
  { name: "Registrar Venda", href: "/crm/registrar-venda", icon: ShoppingCart },
  { name: "Minhas Vendas", href: "/crm/minhas-vendas", icon: Target },
  { name: "Ranking Geral", href: "/crm/ranking-geral", icon: Trophy },
  { name: "Ranking Minha Equipe", href: "/crm/ranking-equipe", icon: Users },
  { name: "Criativos", href: "/crm/criativos", icon: Palette },
  { name: "Gestão de Equipes", href: "/crm/equipes", icon: UsersRound },
  { name: "Visão Gerente", href: "/crm/gerente", icon: Monitor },
  { name: "Monitoramento de Ponto", href: "/crm/monitoramento-ponto", icon: Clock },
  { name: "Registros de Ponto", href: "/crm/registros-ponto", icon: ListChecks },
];

export default function CrmLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/crm" className="flex items-center gap-2">
            <img src={logo} alt="ServiTime" className="h-9 w-auto" />
            <span className="text-sidebar-foreground font-semibold text-sm">Saúde</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-sidebar-foreground md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Badge */}
        <div className="px-4 py-3 border-b border-sidebar-border">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sidebar-primary/20 text-sidebar-primary-foreground text-xs font-semibold tracking-wide">
            <Monitor className="h-3.5 w-3.5" />
            CRM Saúde
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {CRM_NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => { if (window.innerWidth < 768) setSidebarOpen(false); }}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Sair</span>
          </button>
          <p className="text-[10px] uppercase tracking-widest text-sidebar-muted text-center">
            ServiTime CRM Saúde v1.0
          </p>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <AppHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
