export type Servico = {
  id: number;
  nome: string;
};

export type Empresa = {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  cnpj: string;
  tempoContrato: string;
  contratoPath?: string | null;
  servicos?: Servico[];
};

const apiFetch = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const res = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
};

export const fetchServicos = async () => {
  try {
    return await apiFetch<Servico[]>("/api/servicos");
  } catch (error) {
    console.error("Failed to load services:", error);
    return [];
  }
};

export const fetchEmpresas = async () => {
  try {
    return await apiFetch<Empresa[]>("/api/empresas");
  } catch (error) {
    console.error("Failed to load empresas:", error);
    return [];
  }
};

export const fetchEmpresa = (id: number) => apiFetch<Empresa>(`/api/empresas/${id}`);

export const createEmpresa = (data: FormData) =>
  fetch("/api/empresas", { method: "POST", body: data }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to create empresa");
    }
    return res.json();
  });

export const updateEmpresa = (id: number, data: FormData) =>
  fetch(`/api/empresas/${id}`, { method: "PUT", body: data }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to update empresa");
    }
    return res.json();
  });

export const deleteEmpresa = (id: number) =>
  fetch(`/api/empresas/${id}`, { method: "DELETE" }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to delete empresa");
    }
    return res.json();
  });
