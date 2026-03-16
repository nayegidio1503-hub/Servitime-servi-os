import { Menu, Bell, User } from "lucide-react";
import logo from "@/assets/logo.png";

interface AppHeaderProps {
  onMenuToggle: () => void;
  title?: string;
}

export function AppHeader({ onMenuToggle, title }: AppHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-md hover:bg-accent transition-colors"
        >
          <Menu className="h-5 w-5 text-muted-foreground" />
        </button>
        {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-md hover:bg-accent transition-colors relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
}
