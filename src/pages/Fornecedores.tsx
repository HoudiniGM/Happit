import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/Layout';
import { useEventStore } from '../store/EventStore';
import {
  PROPOSTAS_DECORACAO,
  formatBRL,
  type FornecedorEvento,
  type PropostaFornecedor,
} from '../data/mock';
import {
  IconArrowRight,
  IconCheck,
  IconMapPin,
  IconSparkle,
} from '../components/Icons';
import { Pill, StarRating, Toast } from '../components/ui';

type Ordem = 'melhor' | 'preco' | 'distancia' | 'avaliacao';

export default function Fornecedores() {
  const navigate = useNavigate();
  const { contratarFornecedor, fornecedores } = useEventStore();
  const [ordem, setOrdem] = useState<Ordem>('melhor');
  const [soDisponiveis, setSoDisponiveis] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const jaContratada =
    fornecedores.find((f) => f.categoriaId === 'decoracao')?.status !==
    'Procurando';

  const propostas = useMemo(() => {
    let lista = [...PROPOSTAS_DECORACAO];
    if (soDisponiveis) lista = lista.filter((p) => p.disponivel);
    switch (ordem) {
      case 'preco':
        lista.sort((a, b) => a.preco - b.preco);
        break;
      case 'distancia':
        lista.sort((a, b) => a.distanciaKm - b.distanciaKm);
        break;
      case 'avaliacao':
        lista.sort((a, b) => b.estrelas - a.estrelas || b.avaliacoes - a.avaliacoes);
        break;
      default:
        lista.sort((a, b) =>
          a.destaque === 'melhor-combinacao'
            ? -1
            : b.destaque === 'melhor-combinacao'
              ? 1
              : 0,
        );
    }
    return lista;
  }, [ordem, soDisponiveis]);

  function contratar(p: PropostaFornecedor) {
    const novo: FornecedorEvento = {
      id: `f-deco-${p.id}`,
      categoriaId: 'decoracao',
      nome: p.nome,
      categoria: 'Decoração',
      emoji: '🎈',
      status: 'Confirmado',
      valorContratado: p.preco,
      valorPago: Math.round(p.preco / 2),
      percentualPago: 50,
      vencimento: '15/11',
    };
    contratarFornecedor(novo);
    setToast(`${p.nome} contratado! Valor adicionado à carteira.`);
    setTimeout(() => {
      setToast(null);
      navigate('/carteira');
    }, 1600);
  }

  const filtros: { id: Ordem; label: string }[] = [
    { id: 'melhor', label: '✨ Melhor combinação' },
    { id: 'preco', label: 'Menor preço' },
    { id: 'distancia', label: 'Mais perto' },
    { id: 'avaliacao', label: 'Melhor avaliação' },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-5">
        <div>
          <Pill tone="brand">🎈 Decoração</Pill>
          <h1 className="mt-2 text-xl font-extrabold text-slate-900">
            Encontramos 8 fornecedores na sua região
          </h1>
          <p className="text-sm text-slate-500">
            Comparamos preço, avaliação e disponibilidade para a data{' '}
            <strong>20/11</strong>. Veja as 3 melhores propostas.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-2">
          {filtros.map((f) => (
            <button
              key={f.id}
              onClick={() => setOrdem(f.id)}
              className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                ordem === f.id
                  ? 'border-brand-500 bg-brand-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={() => setSoDisponiveis((v) => !v)}
            className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
              soDisponiveis
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded ${
                soDisponiveis ? 'bg-emerald-500 text-white' : 'border border-slate-300'
              }`}
            >
              {soDisponiveis && <IconCheck width={10} height={10} />}
            </span>
            Só disponíveis na data
          </button>
        </div>

        {/* Cards de propostas */}
        <div className="grid gap-4 @2xl:grid-cols-3">
          {propostas.map((p) => {
            const melhor = p.destaque === 'melhor-combinacao';
            return (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-2xl border-2 bg-white p-5 shadow-card transition ${
                  melhor
                    ? 'border-brand-500 ring-4 ring-brand-100'
                    : 'border-slate-100'
                }`}
              >
                {melhor && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white shadow-lift">
                    <IconSparkle width={12} height={12} /> Melhor combinação
                  </span>
                )}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl">
                      🎈
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {p.nome}
                      </p>
                      <Pill tone={melhor ? 'brand' : 'slate'}>{p.tag}</Pill>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  {p.descricao}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <StarRating value={p.estrelas} showValue />
                  <span className="text-xs text-slate-400">
                    ({p.avaliacoes})
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <IconMapPin width={13} height={13} />
                    {p.distanciaKm.toFixed(1).replace('.', ',')} km
                  </span>
                  {p.disponivel && (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                      <IconCheck width={13} height={13} /> Disponível
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400">a partir de</p>
                    <p className="text-2xl font-extrabold text-slate-900">
                      {formatBRL(p.preco)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate('/fornecedor')}
                    className="ef-btn-secondary flex-1 text-xs"
                  >
                    Ver perfil
                  </button>
                  <button
                    onClick={() => contratar(p)}
                    disabled={jaContratada}
                    className={`flex-1 text-xs ${
                      melhor ? 'ef-btn-primary' : 'ef-btn-coral'
                    }`}
                  >
                    {jaContratada ? 'Contratado' : 'Contratar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700">
          <p className="font-semibold">
            ✨ Por que o Studio C é a melhor combinação?
          </p>
          <p className="mt-1 text-xs text-brand-600">
            Melhor equilíbrio entre preço ({formatBRL(600)}), nota (5,0) e
            disponibilidade confirmada na data do evento — a {formatBRL(250)}{' '}
            abaixo da proposta mais cara.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate('/fornecedor')}
            className="ef-btn-ghost text-brand-600"
          >
            Conhecer uma fornecedora em detalhe
            <IconArrowRight width={14} height={14} />
          </button>
        </div>
      </div>

      {toast && <Toast>✓ {toast}</Toast>}
    </AppShell>
  );
}
