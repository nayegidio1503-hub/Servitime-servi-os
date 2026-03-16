import { UsersRound, Plus, Search } from "lucide-react";

export default function GestaoEquipes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <UsersRound className="h-6 w-6 text-primary" />
            Gestão de Equipes
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie equipes e vendedores do CRM.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Nova Equipe
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Buscar equipe ou membro..."
          className="w-full pl-9 pr-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Empty state */}
        <div className="col-span-full bg-card border border-border rounded-lg p-10 text-center">
          <UsersRound className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Nenhuma equipe cadastrada.</p>
          <p className="text-muted-foreground/60 text-xs mt-1">Crie sua primeira equipe para organizar seus vendedores.</p>
        </div>
      </div>
    </div>
  );
}
