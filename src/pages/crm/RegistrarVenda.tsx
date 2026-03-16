import { useState } from "react";
import { ShoppingCart, Plus, Search } from "lucide-react";

export default function RegistrarVenda() {
  const [formData, setFormData] = useState({
    cliente: "",
    telefone: "",
    email: "",
    plano: "",
    valor: "",
    formaPagamento: "",
    observacoes: "",
    etapa: "prospeccao",
  });

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: save to database
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          Registrar Venda
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Cadastre uma nova venda ou lead no CRM.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dados do Cliente */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <h2 className="text-base font-semibold text-foreground">Dados do Cliente</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nome do Cliente *</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={formData.cliente}
                onChange={(e) => update("cliente", e.target.value)}
                placeholder="Buscar ou cadastrar cliente..."
                className="w-full pl-9 pr-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Telefone</label>
              <input
                value={formData.telefone}
                onChange={(e) => update("telefone", e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">E-mail</label>
              <input
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="cliente@email.com"
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        {/* Dados da Venda */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <h2 className="text-base font-semibold text-foreground">Dados da Venda</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Plano / Produto *</label>
            <select
              value={formData.plano}
              onChange={(e) => update("plano", e.target.value)}
              className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none"
            >
              <option value="">Selecione o plano...</option>
              <option value="basico">Plano Básico</option>
              <option value="intermediario">Plano Intermediário</option>
              <option value="premium">Plano Premium</option>
              <option value="empresarial">Plano Empresarial</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Etapa do Funil</label>
            <select
              value={formData.etapa}
              onChange={(e) => update("etapa", e.target.value)}
              className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none"
            >
              <option value="prospeccao">Prospecção</option>
              <option value="qualificacao">Qualificação</option>
              <option value="proposta">Proposta Enviada</option>
              <option value="negociacao">Negociação</option>
              <option value="fechamento">Fechamento</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Valor (R$)</label>
              <input
                value={formData.valor}
                onChange={(e) => update("valor", e.target.value)}
                placeholder="0,00"
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Forma de Pagamento</label>
              <select
                value={formData.formaPagamento}
                onChange={(e) => update("formaPagamento", e.target.value)}
                className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none"
              >
                <option value="">Selecione...</option>
                <option value="boleto">Boleto</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="pix">PIX</option>
                <option value="debito">Débito Automático</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Observações</label>
            <textarea
              value={formData.observacoes}
              onChange={(e) => update("observacoes", e.target.value)}
              rows={3}
              placeholder="Anotações sobre a venda..."
              className="w-full px-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring/20 outline-none resize-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="lg:col-span-2 flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2.5 rounded-md border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Registrar Venda
          </button>
        </div>
      </form>
    </div>
  );
}
