import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/Layout';
import { useEventStore } from '../store/EventStore';
import { PLANO_SUGERIDO, formatBRL } from '../data/mock';
import {
  IconArrowRight,
  IconCheck,
  IconSparkle,
} from '../components/Icons';
import { PaymentProgress, Pill, SectionTitle } from '../components/ui';

export default function Plano() {
  const navigate = useNavigate();
  const { categorias, setCategoriaValor, evento } = useEventStore();
  const [itens, setItens] = useState(
    PLANO_SUGERIDO.map((p) => ({ ...p })),
  );

  const totalCategorias = categorias.reduce((s, c) => s + c.valor, 0);
  const diff = totalCategorias - evento.orcamento;

  function toggleItem(id: string) {
    setItens((prev) =>
      prev.map((i) => (i.id === id ? { ...i, incluido: !i.incluido } : i)),
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <div className="ef-animate mb-5 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
          <Pill tone="coral">
            <IconSparkle width={13} height={13} /> Plano gerado
          </Pill>
          <h1 className="mt-3 text-xl font-extrabold">
            Montamos o plano do seu evento
          </h1>
          <p className="mt-1 text-sm text-brand-100">
            Com base em uma {evento.tipo.toLowerCase()} para {evento.convidados}{' '}
            convidados, isto é o que seu evento provavelmente precisa. Ajuste o
            que quiser.
          </p>
        </div>

        <div className="grid gap-5 @3xl:grid-cols-2">
          {/* Checklist inteligente */}
          <section>
            <SectionTitle
              action={
                <span className="text-xs font-semibold text-slate-400">
                  {itens.filter((i) => i.incluido).length} de {itens.length}
                </span>
              }
            >
              Checklist do evento
            </SectionTitle>
            <div className="space-y-2">
              {itens.map((i) => (
                <button
                  key={i.id}
                  onClick={() => toggleItem(i.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                    i.incluido
                      ? 'border-brand-100 bg-white'
                      : 'border-slate-100 bg-slate-50 opacity-60'
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-xl">
                    {i.emoji}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{i.nome}</p>
                    <p className="text-xs text-slate-500">{i.descricao}</p>
                  </div>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                      i.incluido
                        ? 'bg-brand-600 text-white'
                        : 'border border-slate-300'
                    }`}
                  >
                    {i.incluido && <IconCheck width={14} height={14} />}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Divisão do orçamento */}
          <section>
            <SectionTitle>Divisão sugerida do orçamento</SectionTitle>
            <div className="ef-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate-500">Orçamento total</span>
                <span className="text-lg font-extrabold text-slate-900">
                  {formatBRL(evento.orcamento)}
                </span>
              </div>
              <PaymentProgress
                percent={(totalCategorias / evento.orcamento) * 100}
              />
              <p
                className={`mt-2 text-xs font-semibold ${
                  diff > 0
                    ? 'text-rose-600'
                    : diff < 0
                      ? 'text-emerald-600'
                      : 'text-slate-500'
                }`}
              >
                {diff === 0
                  ? '✓ Distribuído exatamente no orçamento'
                  : diff > 0
                    ? `${formatBRL(diff)} acima do orçamento`
                    : `${formatBRL(-diff)} ainda disponível`}
              </p>

              <div className="mt-4 space-y-3">
                {categorias.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                      {c.emoji} {c.nome}
                    </span>
                    <div className="flex-1">
                      <input
                        type="range"
                        min={0}
                        max={5000}
                        step={100}
                        value={c.valor}
                        onChange={(e) =>
                          setCategoriaValor(c.id, Number(e.target.value))
                        }
                        className="w-full accent-brand-600"
                      />
                    </div>
                    <span className="w-20 shrink-0 text-right text-sm font-bold text-slate-800">
                      {formatBRL(c.valor)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => navigate('/painel')}
            className="ef-btn-secondary"
          >
            Salvar e ir ao painel
          </button>
          <button onClick={() => navigate('/painel')} className="ef-btn-primary">
            Confirmar plano <IconArrowRight width={16} height={16} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
