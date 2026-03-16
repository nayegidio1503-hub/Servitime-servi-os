import { Clock, Search } from "lucide-react";

export default function MonitoramentoPonto() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          Monitoramento de Ponto
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Acompanhe o ponto dos colaboradores em tempo real.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Buscar colaborador..."
          className="w-full pl-9 pr-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Colaborador</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Entrada</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Saída</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Horas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center py-16 text-muted-foreground">
                Nenhum registro de ponto em tempo real.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
