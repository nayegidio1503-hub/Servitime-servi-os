import { Palette, Image, Copy, Download, Eye, ThumbsUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Criativo {
  id: number;
  titulo: string;
  tipo: "banner" | "post" | "story" | "carrossel" | "video";
  descricao: string;
  data: string;
  status: "ativo" | "rascunho" | "arquivado";
  visualizacoes: number;
  curtidas: number;
}

const criativos: Criativo[] = [
  { id: 1, titulo: "Plano Saúde Familiar - Promoção", tipo: "banner", descricao: "Banner para campanha de plano familiar com desconto de 20%", data: "15/03/2026", status: "ativo", visualizacoes: 1240, curtidas: 89 },
  { id: 2, titulo: "Depoimento Cliente - Maria", tipo: "carrossel", descricao: "Carrossel com depoimento de cliente satisfeita com o plano", data: "14/03/2026", status: "ativo", visualizacoes: 890, curtidas: 62 },
  { id: 3, titulo: "Benefícios Plano Premium", tipo: "post", descricao: "Post destacando os benefícios exclusivos do plano premium", data: "13/03/2026", status: "ativo", visualizacoes: 1580, curtidas: 124 },
  { id: 4, titulo: "Stories - Dia da Saúde", tipo: "story", descricao: "Sequência de stories para o Dia Mundial da Saúde", data: "12/03/2026", status: "rascunho", visualizacoes: 0, curtidas: 0 },
  { id: 5, titulo: "Vídeo Institucional", tipo: "video", descricao: "Vídeo curto apresentando a ServiTime Saúde", data: "10/03/2026", status: "ativo", visualizacoes: 3200, curtidas: 256 },
  { id: 6, titulo: "Comparativo de Planos", tipo: "post", descricao: "Infográfico comparando os planos disponíveis", data: "08/03/2026", status: "arquivado", visualizacoes: 720, curtidas: 45 },
];

const tipoColors: Record<string, string> = {
  banner: "bg-blue-500/10 text-blue-600",
  post: "bg-green-500/10 text-green-600",
  story: "bg-purple-500/10 text-purple-600",
  carrossel: "bg-orange-500/10 text-orange-600",
  video: "bg-red-500/10 text-red-600",
};

export default function Criativos() {
  const [filtro, setFiltro] = useState<string>("todos");

  const filtrados = filtro === "todos" ? criativos : criativos.filter((c) => c.status === filtro);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            Criativos
          </h1>
          <p className="text-muted-foreground mt-1">Materiais de apoio para vendas e divulgação</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {["todos", "ativo", "rascunho", "arquivado"].map((f) => (
          <Button
            key={f}
            variant={filtro === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltro(f)}
            className="capitalize"
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold text-foreground">{criativos.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold text-foreground">{criativos.filter(c => c.status === "ativo").length}</p>
            <p className="text-xs text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold text-foreground">{criativos.reduce((a, c) => a + c.visualizacoes, 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Visualizações</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-2xl font-bold text-foreground">{criativos.reduce((a, c) => a + c.curtidas, 0)}</p>
            <p className="text-xs text-muted-foreground">Curtidas</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de criativos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtrados.map((criativo) => (
          <Card key={criativo.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Image className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{criativo.titulo}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipoColors[criativo.tipo]}`}>
                        {criativo.tipo}
                      </span>
                      <Badge variant={criativo.status === "ativo" ? "default" : criativo.status === "rascunho" ? "secondary" : "outline"} className="text-xs">
                        {criativo.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{criativo.descricao}</p>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{criativo.data}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{criativo.visualizacoes}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{criativo.curtidas}</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Copy className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
