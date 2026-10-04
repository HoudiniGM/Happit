import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/Layout';
import { useEventStore } from '../store/EventStore';
import { formatBRL } from '../data/mock';
import {
  IconArrowRight,
  IconBell,
  IconCalendar,
  IconChevronRight,
  IconClock,
  IconMapPin,
  IconUsers,
} from '../components/Icons';
import {
  PaymentProgress,
  Pill,
  SectionTitle,
  StatCard,
  StatusBadge,
} from '../components/ui';

export default function Painel() {
  const navigate = useNavigate();
  const {
    evento,
    fornecedores,
    alertas,
    carteira,
    checklist,
    convidados,
  } = useEventStore();

  const confirmados = convidados.filter((c) => c.status === 'Sim').length;
  const proximos = checklist.filter((c) => !c.concluido).slice(0, 3);

  const alertaTone = {
    critico: 'border-rose-200 bg-rose-50 text-rose-700',
    atencao: 'border-amber-200 bg-amber-50 text-amber-700',
    info: 'border-slate-200 bg-slate-50 text-slate-600',
  };
  const alertaDot = {
    critico: 'bg-rose-500',
    atencao: 'bg-amber-500',
    info: 'bg-slate-400',
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Resumo do evento */}
        <section className="ef-animate rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <Pill tone="coral">🎈 {evento.tema}</Pill>
              <h1 className="mt-2 text-2xl font-extrabold">{evento.nome}</h1>
            </div>
            <span className="rounded-xl bg-white/15 px-3 py-1 text-xs font-semibold">
              {evento.tipo}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-brand-50">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar width={16} height={16} /> {evento.data} · {evento.hora}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconMapPin width={16} height={16} /> {evento.local}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconUsers width={16} height={16} /> {evento.convidados} convidados
            </span>
          </div>
        </section>

        {/* Cartões de resumo */}
        <div className="grid grid-cols-2 gap-3 @2xl:grid-cols-4">
          <StatCard
            label="Orçamento"
            value={formatBRL(carteira.orcamento)}
            accent="slate"
          />
          <StatCard
            label="Já pago"
            value={formatBRL(carteira.pago)}
            accent="green"
            hint={`de ${formatBRL(carteira.contratado)} contratado`}
          />
          <StatCard
            label="A pagar"
            value={formatBRL(carteira.restante)}
            accent="amber"
          />
          <StatCard
            label="Confirmados"
            value={`${confirmados}/${evento.convidados}`}
            accent="brand"
          />
        </div>

        {/* Alertas de dependência */}
        <section>
          <SectionTitle
            action={
              <Pill tone="coral">
                <IconBell width={12} height={12} /> {alertas.length} alertas
              </Pill>
            }
          >
            Alertas de dependências
          </SectionTitle>
          <div className="space-y-2">
            {alertas.map((a) => (
              <div
                key={a.id}
                className={`flex items-center gap-3 rounded-2xl border p-3.5 ${alertaTone[a.tipo]}`}
              >
                <span
                  className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${alertaDot[a.tipo]}`}
                />
                <p className="flex-1 text-sm font-medium">{a.texto}</p>
                {a.prazo && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-white/60 px-2 py-1 text-xs font-bold">
                    <IconClock width={12} height={12} /> {a.prazo}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 @3xl:grid-cols-2">
          {/* Fornecedores */}
          <section>
            <SectionTitle
              action={
                <button
                  onClick={() => navigate('/fornecedores')}
                  className="inline-flex items-center text-xs font-semibold text-brand-600 hover:underline"
                >
                  Ver todos <IconChevronRight width={14} height={14} />
                </button>
              }
            >
              Fornecedores
            </SectionTitle>
            <div className="ef-card divide-y divide-slate-100">
              {fornecedores.map((f) => (
                <div key={f.id} className="flex items-center gap-3 p-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-lg">
                    {f.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {f.nome}
                    </p>
                    <p className="text-xs text-slate-400">{f.categoria}</p>
                  </div>
                  <div className="hidden w-24 sm:block">
                    <PaymentProgress percent={f.percentualPago} size="sm" />
                    <p className="mt-1 text-right text-[11px] font-semibold text-slate-400">
                      {f.percentualPago}% pago
                    </p>
                  </div>
                  <StatusBadge status={f.status} />
                </div>
              ))}
            </div>
          </section>

          {/* Cronograma por fases */}
          <section>
            <SectionTitle
              action={
                <button
                  onClick={() => navigate('/evento')}
                  className="inline-flex items-center text-xs font-semibold text-brand-600 hover:underline"
                >
                  Cronograma <IconChevronRight width={14} height={14} />
                </button>
              }
            >
              Próximos prazos
            </SectionTitle>
            <div className="ef-card p-2">
              {proximos.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <IconClock width={16} height={16} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {c.tarefa}
                    </p>
                    <p className="text-xs text-slate-400">
                      {c.fase} · {c.prazoLabel}
                    </p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => navigate('/evento')}
                className="mt-1 flex w-full items-center justify-center gap-1 rounded-xl bg-slate-50 py-2.5 text-sm font-semibold text-brand-600 hover:bg-slate-100"
              >
                Ver cronograma completo
                <IconArrowRight width={14} height={14} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
