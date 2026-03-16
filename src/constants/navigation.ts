import {
  LayoutDashboard, Building, DollarSign, Users, UserCircle, FileText,
  Settings, BarChart3, HeartPulse, Sparkles, ShieldCheck,
  TreePine, Droplets, Sofa, Hammer, Eye, MapPin, Briefcase, Receipt,
  FileCheck, KeyRound, Monitor
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: any;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_ITEMS: NavGroup[] = [
  {
    label: "Administrativo",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Empresas", href: "/admin/empresas", icon: Building },
      { name: "Financeiro", href: "/admin/financeiro", icon: DollarSign },
      { name: "Relatórios", href: "/admin/relatorios", icon: BarChart3 },
    ],
  },
  {
    label: "RH & Ponto",
    items: [
      { name: "Painel RH", href: "/rh", icon: Users },
      { name: "Funcionários", href: "/rh/funcionarios", icon: UserCircle },
      { name: "Folha de Pagamento", href: "/rh/folha", icon: FileText },
      { name: "Holerites", href: "/rh/holerites", icon: Receipt },
      { name: "Atestados", href: "/rh/atestados", icon: FileCheck },
    ],
  },
  {
    label: "CRM Saúde",
    items: [
      { name: "Abrir CRM Saúde", href: "/crm", icon: Monitor },
    ],
  },
  {
    label: "Serviços Prestados",
    items: [
      { name: "Limpeza", href: "/servicos/limpeza", icon: Sparkles },
      { name: "Pós-Obra", href: "/servicos/pos-obra", icon: Hammer },
      { name: "Portaria", href: "/servicos/portaria", icon: ShieldCheck },
      { name: "Controlador de Acesso", href: "/servicos/controlador-acesso", icon: KeyRound },
      { name: "Jardinagem", href: "/servicos/jardinagem", icon: TreePine },
      { name: "Piscina", href: "/servicos/piscina", icon: Droplets },
      { name: "Estofados", href: "/servicos/estofados", icon: Sofa },
      { name: "Saúde", href: "/servicos/saude", icon: HeartPulse },
      { name: "Reformas", href: "/servicos/reformas", icon: Hammer },
    ],
  },
];
