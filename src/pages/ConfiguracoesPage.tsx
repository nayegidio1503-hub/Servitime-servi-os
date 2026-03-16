import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Settings, Smartphone, Link2, CheckCircle2, Key, Globe, Server, Copy, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ConfiguracoesPage() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_STRIPE_KEY ?? "");
  const [apiUrl, setApiUrl] = useState("");
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Configurações"
        description="Configurações gerais do sistema."
        badge="Administrativo"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Configurações Gerais */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary" />
            Configurações Gerais
          </h3>
          <div className="space-y-3">
            {["Nome do Sistema", "Fuso Horário", "Idioma", "Notificações"].map((item) => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{item}</span>
                <span className="text-sm text-muted-foreground">—</span>
              </div>
            ))}
          </div>
        </div>

        {/* Integração App de Ponto */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              Integração ao App de Ponto
            </h3>
            <Badge variant="secondary" className="text-xs">Desconectado</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Conecte o aplicativo de ponto eletrônico inserindo as credenciais da API abaixo.
          </p>

          {/* API URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              URL da API
            </label>
            <input
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.appдепonto.com.br/v1"
              className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>

          {/* API Key */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5 text-muted-foreground" />
              Chave da API (API Key)
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="YOUR_STRIPE_KEY_HERE"
                className="w-full px-3 py-2.5 pr-10 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none transition-all placeholder:text-muted-foreground font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Status info */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Status da Conexão</span>
              </div>
              <Badge variant="outline" className="text-xs">Aguardando configuração</Badge>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Sincronização Automática</span>
              </div>
              <span className="text-sm text-muted-foreground">—</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Dispositivos Registrados</span>
              </div>
              <span className="text-sm text-muted-foreground tabular-nums">0</span>
            </div>
          </div>

          <Button disabled={!apiKey || !apiUrl} className="w-full">
            Conectar API
          </Button>
        </div>
      </div>
    </div>
  );
}