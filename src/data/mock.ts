// Dados fictícios da plataforma Happit.
// Datas em dd/mm, valores em R$. Nenhum backend real.

export type FornecedorStatus = 'Confirmado' | 'Aguardando' | 'Procurando';
export type PagamentoStatus = 'Pago' | 'Pendente' | 'Contratado';
export type ConviteStatus = 'Sim' | 'Não' | 'Talvez' | 'Pendente';
export type RestricaoAlimentar =
  | 'Nenhuma'
  | 'Vegetariano'
  | 'Vegano'
  | 'Alergia a amendoim';

export interface CategoriaOrcamento {
  id: string;
  emoji: string;
  nome: string;
  valor: number;
}

export interface FornecedorEvento {
  id: string;
  categoriaId: string;
  nome: string;
  categoria: string;
  emoji: string;
  status: FornecedorStatus;
  valorContratado: number;
  valorPago: number;
  percentualPago: number; // 0..100
  vencimento?: string; // dd/mm
}

export interface Convidado {
  id: string;
  nome: string;
  status: ConviteStatus;
  restricao: RestricaoAlimentar;
  acompanhantes: number;
}

export interface Alerta {
  id: string;
  tipo: 'critico' | 'atencao' | 'info';
  texto: string;
  prazo?: string;
}

export interface ChecklistItem {
  id: string;
  fase: string;
  prazoLabel: string;
  tarefa: string;
  concluido: boolean;
  categoriaId?: string;
}

export interface PropostaFornecedor {
  id: string;
  nome: string;
  preco: number;
  estrelas: number;
  avaliacoes: number;
  distanciaKm: number;
  disponivel: boolean;
  destaque?: 'melhor-combinacao';
  tag: string;
  descricao: string;
}

export const EVENTO = {
  nome: 'Aniversário da Ana',
  tipo: 'Festa de aniversário',
  data: '20/11',
  hora: '19h',
  local: 'Salão de festas, Campinas',
  tema: 'Tropical',
  convidados: 80,
  orcamento: 8000,
};

export const CATEGORIAS_ORCAMENTO: CategoriaOrcamento[] = [
  { id: 'buffet', emoji: '🍽', nome: 'Buffet', valor: 3000 },
  { id: 'decoracao', emoji: '🎈', nome: 'Decoração', valor: 1000 },
  { id: 'bebidas', emoji: '🥂', nome: 'Bebidas', valor: 700 },
  { id: 'musica', emoji: '🎵', nome: 'Música', valor: 800 },
  { id: 'bolo', emoji: '🍰', nome: 'Bolo', valor: 400 },
  { id: 'fotografia', emoji: '📸', nome: 'Fotografia', valor: 800 },
  { id: 'outros', emoji: '✨', nome: 'Outros', valor: 1300 },
];

export const FORNECEDORES_EVENTO: FornecedorEvento[] = [
  {
    id: 'f-espaco',
    categoriaId: 'outros',
    nome: 'Espaço X',
    categoria: 'Salão de festas',
    emoji: '🏛',
    status: 'Confirmado',
    valorContratado: 2500,
    valorPago: 2500,
    percentualPago: 100,
    vencimento: '01/11',
  },
  {
    id: 'f-buffet',
    categoriaId: 'buffet',
    nome: 'Buffet Y',
    categoria: 'Buffet',
    emoji: '🍽',
    status: 'Confirmado',
    valorContratado: 3000,
    valorPago: 1500,
    percentualPago: 50,
    vencimento: '13/11',
  },
  {
    id: 'f-dj',
    categoriaId: 'musica',
    nome: 'DJ Z',
    categoria: 'Música',
    emoji: '🎵',
    status: 'Aguardando',
    valorContratado: 800,
    valorPago: 400,
    percentualPago: 50,
    vencimento: '14/11',
  },
  {
    id: 'f-foto',
    categoriaId: 'fotografia',
    nome: 'Fotógrafo W',
    categoria: 'Fotografia',
    emoji: '📸',
    status: 'Confirmado',
    valorContratado: 800,
    valorPago: 800,
    percentualPago: 100,
    vencimento: '18/11',
  },
  {
    id: 'f-deco',
    categoriaId: 'decoracao',
    nome: 'Decoração K',
    categoria: 'Decoração',
    emoji: '🎈',
    status: 'Procurando',
    valorContratado: 0,
    valorPago: 0,
    percentualPago: 0,
  },
];

export const ALERTAS: Alerta[] = [
  {
    id: 'a1',
    tipo: 'critico',
    texto: 'O DJ precisa receber o cronograma do evento.',
    prazo: '10/11',
  },
  {
    id: 'a2',
    tipo: 'atencao',
    texto: 'A decoração precisa saber o número final de convidados.',
    prazo: '12/11',
  },
  {
    id: 'a3',
    tipo: 'info',
    texto: 'O buffet ainda não recebeu a quantidade final de convidados.',
  },
];

export const CHECKLIST: ChecklistItem[] = [
  { id: 'c1', fase: '30 dias antes', prazoLabel: 'até 21/10', tarefa: 'Contratar buffet', concluido: true, categoriaId: 'buffet' },
  { id: 'c2', fase: '30 dias antes', prazoLabel: 'até 21/10', tarefa: 'Contratar decoração', concluido: false, categoriaId: 'decoracao' },
  { id: 'c3', fase: '30 dias antes', prazoLabel: 'até 21/10', tarefa: 'Contratar fotógrafo', concluido: true, categoriaId: 'fotografia' },
  { id: 'c4', fase: '15 dias antes', prazoLabel: 'até 05/11', tarefa: 'Confirmar convidados', concluido: false },
  { id: 'c5', fase: '15 dias antes', prazoLabel: 'até 05/11', tarefa: 'Definir cardápio', concluido: false, categoriaId: 'buffet' },
  { id: 'c6', fase: '3 dias antes', prazoLabel: 'até 17/11', tarefa: 'Confirmar fornecedores', concluido: false },
  { id: 'c7', fase: '3 dias antes', prazoLabel: 'até 17/11', tarefa: 'Confirmar quantidade de pessoas', concluido: false },
];

export const PLANO_SUGERIDO = [
  { id: 'p-bolo', emoji: '🍰', nome: 'Bolo', descricao: 'Bolo personalizado para 80 pessoas', categoriaId: 'bolo', incluido: true },
  { id: 'p-buffet', emoji: '🍽', nome: 'Buffet', descricao: 'Comida e serviço de garçom', categoriaId: 'buffet', incluido: true },
  { id: 'p-mesas', emoji: '🪑', nome: 'Mesas e cadeiras', descricao: 'Aluguel para 80 convidados', categoriaId: 'outros', incluido: true },
  { id: 'p-deco', emoji: '🎈', nome: 'Decoração', descricao: 'Tema tropical', categoriaId: 'decoracao', incluido: true },
  { id: 'p-foto', emoji: '📸', nome: 'Fotografia', descricao: 'Cobertura de 4 horas', categoriaId: 'fotografia', incluido: true },
  { id: 'p-musica', emoji: '🎵', nome: 'Música', descricao: 'DJ com som e iluminação', categoriaId: 'musica', incluido: true },
  { id: 'p-bebidas', emoji: '🥂', nome: 'Bebidas', descricao: 'Open bar e refrigerantes', categoriaId: 'bebidas', incluido: true },
  { id: 'p-convites', emoji: '✉️', nome: 'Convites', descricao: 'Convite digital compartilhável', categoriaId: 'outros', incluido: true },
];

export const PROPOSTAS_DECORACAO: PropostaFornecedor[] = [
  {
    id: 'prop-a',
    nome: 'Decora Festas A',
    preco: 850,
    estrelas: 5,
    avaliacoes: 42,
    distanciaKm: 3.2,
    disponivel: true,
    tag: 'Mais avaliada',
    descricao: 'Decoração tropical completa, montagem e desmontagem inclusas.',
  },
  {
    id: 'prop-b',
    nome: 'Ateliê B',
    preco: 700,
    estrelas: 4,
    avaliacoes: 28,
    distanciaKm: 6.8,
    disponivel: true,
    tag: 'Bom custo',
    descricao: 'Arranjos tropicais e painel de fundo. Montagem inclusa.',
  },
  {
    id: 'prop-c',
    nome: 'Studio C',
    preco: 600,
    estrelas: 5,
    avaliacoes: 51,
    distanciaKm: 4.1,
    disponivel: true,
    destaque: 'melhor-combinacao',
    tag: 'Melhor combinação',
    descricao: 'Melhor equilíbrio entre preço, nota e disponibilidade na data.',
  },
];

export const FORNECEDORA_EXEMPLO = {
  id: 'maria-bolos',
  nome: 'Maria — Bolos personalizados',
  categoria: 'Bolo',
  emoji: '🍰',
  nota: 4.9,
  eventosRealizados: 23,
  percentualNoPrazo: 98,
  percentualConcluidos: 100,
  avaliacoes: 21,
  clientesRecorrentes: 8,
  precoInicial: 250,
  capacidade: 'Bolo para até 100 pessoas',
  entrega: 'Entrega disponível',
  regiao: 'Campinas',
  descricao:
    'Confeiteira especializada em bolos personalizados para festas. Trabalho artesanal, com atenção a cada detalhe do tema do seu evento.',
  avaliacoesLista: [
    { autor: 'Juliana R.', nota: 5, texto: 'Bolo lindo e delicioso! Entregou no horário combinado.', data: '12/09' },
    { autor: 'Marcos T.', nota: 5, texto: 'Superou as expectativas, todos os convidados elogiaram.', data: '28/08' },
    { autor: 'Patrícia L.', nota: 4, texto: 'Muito bom, só atrasou alguns minutos na entrega.', data: '03/08' },
  ],
};

export const CONVIDADOS: Convidado[] = [
  { id: 'g1', nome: 'Beatriz Costa', status: 'Sim', restricao: 'Nenhuma', acompanhantes: 1 },
  { id: 'g2', nome: 'Carlos Mendes', status: 'Sim', restricao: 'Vegetariano', acompanhantes: 0 },
  { id: 'g3', nome: 'Daniela Souza', status: 'Talvez', restricao: 'Vegano', acompanhantes: 2 },
  { id: 'g4', nome: 'Eduardo Lima', status: 'Sim', restricao: 'Nenhuma', acompanhantes: 1 },
  { id: 'g5', nome: 'Fernanda Alves', status: 'Não', restricao: 'Nenhuma', acompanhantes: 0 },
  { id: 'g6', nome: 'Gabriel Rocha', status: 'Sim', restricao: 'Alergia a amendoim', acompanhantes: 0 },
  { id: 'g7', nome: 'Helena Dias', status: 'Sim', restricao: 'Vegetariano', acompanhantes: 1 },
  { id: 'g8', nome: 'Igor Santos', status: 'Talvez', restricao: 'Nenhuma', acompanhantes: 0 },
  { id: 'g9', nome: 'Juliana Pires', status: 'Sim', restricao: 'Nenhuma', acompanhantes: 2 },
  { id: 'g10', nome: 'Lucas Barros', status: 'Pendente', restricao: 'Nenhuma', acompanhantes: 0 },
  { id: 'g11', nome: 'Mariana Reis', status: 'Sim', restricao: 'Vegano', acompanhantes: 0 },
  { id: 'g12', nome: 'Nicolas Freitas', status: 'Sim', restricao: 'Nenhuma', acompanhantes: 1 },
];

// Resumo consolidado de restrições (coerente com o enunciado: 80 convidados)
export const RESUMO_RESTRICOES = {
  total: 80,
  semRestricao: 65,
  vegetarianos: 8,
  veganos: 4,
  amendoim: 3,
};

export const PASSOS_COMO_FUNCIONA = [
  {
    numero: 1,
    emoji: '📝',
    titulo: 'Crie seu evento',
    texto: 'Conte o que você quer realizar: tipo, data, local, convidados e orçamento.',
  },
  {
    numero: 2,
    emoji: '📋',
    titulo: 'Receba o plano',
    texto: 'A plataforma monta um checklist, divide o orçamento e cria o cronograma.',
  },
  {
    numero: 3,
    emoji: '🤝',
    titulo: 'Escolha fornecedores',
    texto: 'Compare propostas da sua região e contrate com pagamento intermediado.',
  },
  {
    numero: 4,
    emoji: '🔔',
    titulo: 'Acompanhe tudo',
    texto: 'Status, prazos e alertas automáticos para nada ser esquecido.',
  },
];

export function formatBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: valor % 1 === 0 ? 0 : 2,
  });
}
