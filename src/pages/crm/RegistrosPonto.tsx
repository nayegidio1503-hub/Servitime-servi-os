import { ListChecks, Search, Download } from "lucide-react";

export default function RegistrosPonto() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" />
            Registros de Ponto
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Histórico completo de registros de ponto.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Download className="h-4 w-4" />
          Exportar
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Buscar colaborador..."
            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none placeholder:text-muted-foreground"
          />
        </div>
        <input
          type="date"
          className="px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none"
        />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Colaborador</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Data</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Entrada</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Saída</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Total</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-16 text-muted-foreground">
                Nenhum registro encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
