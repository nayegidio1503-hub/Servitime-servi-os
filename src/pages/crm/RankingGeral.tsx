import { Trophy, Medal, TrendingUp, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const rankingData = [
  { pos: 1, nome: "Ana Souza", vendas: 48, meta: 50, receita: "R$ 96.000" },
  { pos: 2, nome: "Carlos Lima", vendas: 42, meta: 50, receita: "R$ 84.000" },
  { pos: 3, nome: "Beatriz Ramos", vendas: 38, meta: 45, receita: "R$ 76.000" },
  { pos: 4, nome: "Diego Martins", vendas: 35, meta: 40, receita: "R$ 70.000" },
  { pos: 5, nome: "Fernanda Costa", vendas: 31, meta: 40, receita: "R$ 62.000" },
  { pos: 6, nome: "Gabriel Oliveira", vendas: 28, meta: 35, receita: "R$ 56.000" },
  { pos: 7, nome: "Helena Dias", vendas: 25, meta: 35, receita: "R$ 50.000" },
  { pos: 8, nome: "Igor Santos", vendas: 22, meta: 30, receita: "R$ 44.000" },
];

function getMedalColor(pos: number) {
  if (pos === 1) return "text-yellow-500";
  if (pos === 2) return "text-gray-400";
  if (pos === 3) return "text-amber-600";
  return "text-muted-foreground";
}

export default function RankingGeral() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Ranking Geral
        </h1>
        <p className="text-muted-foreground mt-1">Classificação geral de vendedores de todas as equipes</p>
      </div>

      {/* Top 3 destaque */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rankingData.slice(0, 3).map((vendedor) => (
          <Card key={vendedor.pos} className={`relative overflow-hidden ${vendedor.pos === 1 ? "border-yellow-500/50 bg-yellow-500/5" : ""}`}>
            <CardContent className="pt-6 text-center space-y-2">
              <Medal className={`h-10 w-10 mx-auto ${getMedalColor(vendedor.pos)}`} />
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">#{vendedor.pos} lugar</p>
              <h3 className="text-lg font-bold text-foreground">{vendedor.nome}</h3>
              <div className="flex justify-center gap-3 text-sm">
                <span className="text-muted-foreground">{vendedor.vendas} vendas</span>
                <span className="text-primary font-semibold">{vendedor.receita}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((vendedor.vendas / vendedor.meta) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{vendedor.vendas}/{vendedor.meta} da meta</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabela completa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4" />
            Classificação Completa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-semibold text-muted-foreground w-16">#</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Vendedor</th>
                  <th className="pb-3 font-semibold text-muted-foreground text-center">Vendas</th>
                  <th className="pb-3 font-semibold text-muted-foreground text-center">Meta</th>
                  <th className="pb-3 font-semibold text-muted-foreground text-center">% Meta</th>
                  <th className="pb-3 font-semibold text-muted-foreground text-right">Receita</th>
                </tr>
              </thead>
              <tbody>
                {rankingData.map((v) => (
                  <tr key={v.pos} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3">
                      <span className={`font-bold ${getMedalColor(v.pos)}`}>
                        {v.pos <= 3 ? <Medal className="h-4 w-4 inline" /> : v.pos}
                      </span>
                    </td>
                    <td className="py-3 font-medium text-foreground">{v.nome}</td>
                    <td className="py-3 text-center">{v.vendas}</td>
                    <td className="py-3 text-center text-muted-foreground">{v.meta}</td>
                    <td className="py-3 text-center">
                      <Badge variant={Math.round((v.vendas / v.meta) * 100) >= 80 ? "default" : "secondary"}>
                        {Math.round((v.vendas / v.meta) * 100)}%
                      </Badge>
                    </td>
                    <td className="py-3 text-right font-semibold text-primary">{v.receita}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
