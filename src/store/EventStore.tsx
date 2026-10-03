import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  ALERTAS,
  CATEGORIAS_ORCAMENTO,
  CHECKLIST,
  CONVIDADOS,
  EVENTO,
  FORNECEDORES_EVENTO,
  type Alerta,
  type CategoriaOrcamento,
  type ChecklistItem,
  type Convidado,
  type ConviteStatus,
  type FornecedorEvento,
  type RestricaoAlimentar,
} from '../data/mock';

interface Perfil {
  logado: boolean;
  tipo: 'Organizador' | 'Fornecedor' | null;
  email: string | null;
}

interface EventStoreValue {
  perfil: Perfil;
  login: (tipo: 'Organizador' | 'Fornecedor', email: string) => void;
  logout: () => void;

  evento: typeof EVENTO;
  categorias: CategoriaOrcamento[];
  setCategoriaValor: (id: string, valor: number) => void;

  fornecedores: FornecedorEvento[];
  contratarFornecedor: (f: FornecedorEvento) => void;
  pagarRestante: (id: string) => void;

  convidados: Convidado[];
  setConviteStatus: (id: string, status: ConviteStatus) => void;
  setConviteRestricao: (id: string, restricao: RestricaoAlimentar) => void;

  checklist: ChecklistItem[];
  toggleChecklist: (id: string) => void;

  alertas: Alerta[];

  // Carteira derivada
  carteira: {
    orcamento: number;
    contratado: number;
    pago: number;
    restante: number;
  };

  // Resposta do convidado (tela pública)
  respostaConvite: { status: ConviteStatus; restricao: RestricaoAlimentar };
  responderConvite: (status: ConviteStatus, restricao: RestricaoAlimentar) => void;
}

const EventStoreContext = createContext<EventStoreValue | null>(null);

export function EventStoreProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfil] = useState<Perfil>({
    logado: false,
    tipo: null,
    email: null,
  });
  const [categorias, setCategorias] = useState<CategoriaOrcamento[]>(
    CATEGORIAS_ORCAMENTO,
  );
  const [fornecedores, setFornecedores] =
    useState<FornecedorEvento[]>(FORNECEDORES_EVENTO);
  const [convidados, setConvidados] = useState<Convidado[]>(CONVIDADOS);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(CHECKLIST);
  const [respostaConvite, setRespostaConvite] = useState<{
    status: ConviteStatus;
    restricao: RestricaoAlimentar;
  }>({ status: 'Pendente', restricao: 'Nenhuma' });

  const login = (tipo: 'Organizador' | 'Fornecedor', email: string) =>
    setPerfil({ logado: true, tipo, email });
  const logout = () => setPerfil({ logado: false, tipo: null, email: null });

  const setCategoriaValor = (id: string, valor: number) =>
    setCategorias((prev) =>
      prev.map((c) => (c.id === id ? { ...c, valor: Math.max(0, valor) } : c)),
    );

  const contratarFornecedor = (f: FornecedorEvento) =>
    setFornecedores((prev) => {
      const existe = prev.some((p) => p.categoriaId === f.categoriaId && p.status === 'Procurando');
      if (existe) {
        // Substitui a necessidade "Procurando" pela contratação
        return prev.map((p) =>
          p.categoriaId === f.categoriaId && p.status === 'Procurando' ? f : p,
        );
      }
      return [...prev, f];
    });

  const pagarRestante = (id: string) =>
    setFornecedores((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, valorPago: p.valorContratado, percentualPago: 100 }
          : p,
      ),
    );

  const setConviteStatus = (id: string, status: ConviteStatus) =>
    setConvidados((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );

  const setConviteRestricao = (id: string, restricao: RestricaoAlimentar) =>
    setConvidados((prev) =>
      prev.map((c) => (c.id === id ? { ...c, restricao } : c)),
    );

  const toggleChecklist = (id: string) =>
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, concluido: !c.concluido } : c)),
    );

  const responderConvite = (
    status: ConviteStatus,
    restricao: RestricaoAlimentar,
  ) => setRespostaConvite({ status, restricao });

  const carteira = useMemo(() => {
    const contratado = fornecedores.reduce(
      (s, f) => s + f.valorContratado,
      0,
    );
    const pago = fornecedores.reduce((s, f) => s + f.valorPago, 0);
    return {
      orcamento: EVENTO.orcamento,
      contratado,
      pago,
      restante: contratado - pago,
    };
  }, [fornecedores]);

  const value: EventStoreValue = {
    perfil,
    login,
    logout,
    evento: EVENTO,
    categorias,
    setCategoriaValor,
    fornecedores,
    contratarFornecedor,
    pagarRestante,
    convidados,
    setConviteStatus,
    setConviteRestricao,
    checklist,
    toggleChecklist,
    alertas: ALERTAS,
    carteira,
    respostaConvite,
    responderConvite,
  };

  return (
    <EventStoreContext.Provider value={value}>
      {children}
    </EventStoreContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEventStore() {
  const ctx = useContext(EventStoreContext);
  if (!ctx)
    throw new Error('useEventStore deve ser usado dentro de EventStoreProvider');
  return ctx;
}
