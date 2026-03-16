import { Users, Medal, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const equipeData = [
  { pos: 1, nome: "Você", vendas: 42, meta: 50, receita: "R$ 84.000", destaque: true },
  { pos: 2, nome: "João Almeida", vendas: 38, meta: 45, receita: "R$ 76.000", destaque: false },
  { pos: 3, nome: "Maria Silva", vendas: 35, meta: 40, receita: "R$ 70.000", destaque: false },
  { pos: 4, nome: "Pedro Rocha", vendas: 30, meta: 40, receita: "R$ 60.000", destaque: false },
  { pos: 5, nome: "Laura Mendes", vendas: 27, meta: 35, receita: "R$ 54.000", destaque: false },
];

const metaEquipe = { total: 172, meta: 210, receita: "R$ 344.000" };

function getMedalColor(pos: number) {
  if (pos === 1) return "text-yellow-500";
  if (pos === 2) return "text-gray-400";
  if (pos === 3) return "text-amber-600";
  return "text-muted-foreground";
}

export default function RankingEquipe() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Ranking Minha Equipe
        </h1>
        <p className="text-muted-foreground mt-1">Classificação dos membros da sua equipe</p>
      </div>

      {/* Resumo equipe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{metaEquipe.total}</p>
            <p className="text-sm text-muted-foreground">Vendas da Equipe</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{Math.round((metaEquipe.total / metaEquipe.meta) * 100)}%</p>
            <p className="text-sm text-muted-foreground">Meta Atingida</p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${(metaEquipe.total / metaEquipe.meta) * 100}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Medal className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-2xl font-bold text-foreground">{metaEquipe.receita}</p>
            <p className="text-sm text-muted-foreground">Receita Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Ranking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Membros da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {equipeData.map((m) => (
              <div
                key={m.pos}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                  m.destaque ? "border-primary/50 bg-primary/5" : "border-border hover:bg-muted/30"
                }`}
              >
                <span className={`font-bold text-lg w-8 text-center ${getMedalColor(m.pos)}`}>
                  {m.pos <= 3 ? <Medal className="h-5 w-5 mx-auto" /> : m.pos}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground flex items-center gap-2">
                    {m.nome}
                    {m.destaque && <Badge variant="outline" className="text-xs">Você</Badge>}
                  </p>
                  <div className="flex gap-3 text-sm text-muted-foreground mt-0.5">
                    <span>{m.vendas} vendas</span>
                    <span>{Math.round((m.vendas / m.meta) * 100)}% da meta</span>
                  </div>
                </div>
                <p className="font-semibold text-primary text-sm">{m.receita}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
