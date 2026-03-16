import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X, LogOut, Settings } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import logo from "@/assets/logo.png";

interface AppSidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function AppSidebar({ open, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(NAV_ITEMS.map((g) => [g.label, true]))
  );

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="ServiTime" className="h-9 w-auto" />
          </Link>
          <button onClick={onToggle} className="text-sidebar-foreground md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((group) => (
            <div key={group.label} className="mb-2">
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-2 py-1.5 text-[11px] uppercase tracking-widest font-semibold text-sidebar-muted hover:text-sidebar-foreground transition-colors"
              >
                {group.label}
                {expandedGroups[group.label] ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>

              {expandedGroups[group.label] && (
                <div className="mt-1 space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => {
                          if (window.innerWidth < 768) onToggle();
                        }}
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
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <Link
            to="/admin/configuracoes"
            onClick={() => {
              if (window.innerWidth < 768) onToggle();
            }}
            className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-sm transition-colors ${
              location.pathname === "/admin/configuracoes"
                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span>Configurações</span>
          </Link>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Sair</span>
          </button>
          <p className="text-[10px] uppercase tracking-widest text-sidebar-muted text-center">
            ServiTime ERP v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
