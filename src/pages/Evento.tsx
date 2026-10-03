import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/Layout';
import { useEventStore } from '../store/EventStore';
import { formatBRL } from '../data/mock';
import {
  IconCheck,
  IconClock,
  IconPlus,
} from '../components/Icons';
import { Pill, SectionTitle, StatusBadge } from '../components/ui';

export default function Evento() {
  const navigate = useNavigate();
  const { checklist, toggleChecklist, fornecedores, evento, categorias } =
    useEventStore();

  const fases = ['30 dias antes', '15 dias antes', '3 dias antes'];
  const concluidas = checklist.filter((c) => c.concluido).length;

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-5">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Cronograma do evento
          </h1>
          <p className="text-sm text-slate-500">
            {evento.nome} · {evento.data} às {evento.hora}
          </p>
        </div>

        {/* Progresso geral */}
        <div className="ef-card flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-bold text-slate-800">
              Progresso do checklist
            </p>
            <p className="text-xs text-slate-500">
              {concluidas} de {checklist.length} tarefas concluídas
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-lg font-extrabold text-brand-600">
            {Math.round((concluidas / checklist.length) * 100)}%
          </div>
        </div>

        {/* Checklist por fases */}
        <section className="space-y-5">
          {fases.map((fase, idx) => {
            const itens = checklist.filter((c) => c.fase === fase);
            return (
              <div key={fase}>
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <h2 className="text-sm font-bold text-slate-800">{fase}</h2>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="ml-3 space-y-2 border-l-2 border-dashed border-slate-200 pl-5">
                  {itens.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => toggleChecklist(c.id)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-left transition hover:border-brand-200"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition ${
                          c.concluido
                            ? 'bg-emerald-500 text-white'
                            : 'border border-slate-300'
                        }`}
                      >
                        {c.concluido && <IconCheck width={14} height={14} />}
                      </span>
                      <span
                        className={`flex-1 text-sm font-medium ${
                          c.concluido
                            ? 'text-slate-400 line-through'
                            : 'text-slate-700'
                        }`}
                      >
                        {c.tarefa}
                      </span>
                      <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-slate-400">
                        <IconClock width={12} height={12} /> {c.prazoLabel}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Fornecedores do evento */}
        <section>
          <SectionTitle
            action={
              <button
                onClick={() => navigate('/fornecedores')}
                className="ef-btn-ghost text-brand-600"
              >
                <IconPlus width={14} height={14} /> Adicionar
              </button>
            }
          >
            Fornecedores do evento
          </SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {fornecedores.map((f) => (
              <div key={f.id} className="ef-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-lg">
                      {f.emoji}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {f.nome}
                      </p>
                      <p className="text-xs text-slate-400">{f.categoria}</p>
                    </div>
                  </div>
                  <StatusBadge status={f.status} />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {f.status === 'Procurando'
                      ? 'Ainda não contratado'
                      : `${formatBRL(f.valorContratado)} · ${f.percentualPago}% pago`}
                  </span>
                  {f.status === 'Procurando' ? (
                    <button
                      onClick={() => navigate('/fornecedores')}
                      className="font-semibold text-coral-500 hover:underline"
                    >
                      Buscar
                    </button>
                  ) : (
                    f.vencimento && (
                      <Pill tone="slate">vence {f.vencimento}</Pill>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Orçamento por categoria (resumo) */}
        <section>
          <SectionTitle>Orçamento por categoria</SectionTitle>
          <div className="ef-card grid grid-cols-2 gap-px overflow-hidden bg-slate-100 sm:grid-cols-4">
            {categorias.map((c) => (
              <div key={c.id} className="bg-white p-4">
                <p className="text-xs text-slate-400">
                  {c.emoji} {c.nome}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {formatBRL(c.valor)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
