import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/Layout';
import { FORNECEDORA_EXEMPLO, formatBRL } from '../data/mock';
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
} from '../components/Icons';
import {
  Pill,
  SectionTitle,
  StarRating,
  StatCard,
} from '../components/ui';

const PEDIDOS = [
  { id: 'p1', evento: 'Aniversário da Ana', data: '20/11', valor: 400, status: 'Novo' },
  { id: 'p2', evento: 'Casamento Lima', data: '28/11', valor: 650, status: 'Novo' },
  { id: 'p3', evento: 'Chá da Bruna', data: '05/12', valor: 300, status: 'Proposta enviada' },
];

const AGENDA = [
  { id: 'a1', evento: 'Formatura Pedro', data: '12/11', hora: '20h' },
  { id: 'a2', evento: 'Aniversário da Ana', data: '20/11', hora: '19h' },
  { id: 'a3', evento: 'Casamento Lima', data: '28/11', hora: '18h' },
];

const RECEBER = [
  { id: 'r1', evento: 'Formatura Pedro', valor: 350, quando: 'Após o evento · 12/11' },
  { id: 'r2', evento: 'Aniversário da Ana', valor: 200, quando: 'Após o evento · 20/11' },
];

export default function PainelFornecedor() {
  const navigate = useNavigate();
  const f = FORNECEDORA_EXEMPLO;
  const totalReceber = RECEBER.reduce((s, r) => s + r.valor, 0);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Cabeçalho fornecedora */}
        <section className="ef-animate rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              {f.emoji}
            </span>
            <div>
              <h1 className="text-xl font-extrabold">{f.nome}</h1>
              <div className="mt-1 flex items-center gap-2">
                <StarRating value={f.nota} showValue />
                <span className="text-sm text-brand-100">
                  · {f.eventosRealizados} eventos
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Métricas */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Pedidos novos" value="2" accent="coral" />
          <StatCard label="Eventos na agenda" value={String(AGENDA.length)} accent="brand" />
          <StatCard label="A receber" value={formatBRL(totalReceber)} accent="green" />
          <StatCard label="No prazo" value={`${f.percentualNoPrazo}%`} accent="green" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Pedidos recebidos */}
          <section>
            <SectionTitle>Pedidos recebidos</SectionTitle>
            <div className="space-y-2">
              {PEDIDOS.map((p) => (
                <div
                  key={p.id}
                  className="ef-card flex items-center justify-between p-4"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {p.evento}
                    </p>
                    <p className="text-xs text-slate-400">
                      {p.data} · {formatBRL(p.valor)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill tone={p.status === 'Novo' ? 'coral' : 'slate'}>
                      {p.status}
                    </Pill>
                    {p.status === 'Novo' && (
                      <button className="ef-btn-primary px-3 py-1.5 text-xs">
                        Responder
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Agenda */}
          <section>
            <SectionTitle>Agenda de eventos</SectionTitle>
            <div className="ef-card p-2">
              {AGENDA.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-slate-50"
                >
                  <span className="flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <IconCalendar width={16} height={16} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {a.evento}
                    </p>
                    <p className="text-xs text-slate-400">
                      <IconClock width={11} height={11} className="mr-1 inline" />
                      {a.data} às {a.hora}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Pagamentos a receber */}
        <section>
          <SectionTitle
            action={<Pill tone="green">Total {formatBRL(totalReceber)}</Pill>}
          >
            Pagamentos a receber
          </SectionTitle>
          <div className="ef-card divide-y divide-slate-100">
            {RECEBER.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-bold text-slate-800">{r.evento}</p>
                  <p className="text-xs text-slate-400">{r.quando}</p>
                </div>
                <p className="text-sm font-extrabold text-emerald-600">
                  {formatBRL(r.valor)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Reputação */}
        <section>
          <SectionTitle
            action={
              <button
                onClick={() => navigate('/fornecedor')}
                className="inline-flex items-center text-xs font-semibold text-brand-600 hover:underline"
              >
                Ver perfil público <IconArrowRight width={14} height={14} />
              </button>
            }
          >
            Resumo da reputação
          </SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Nota" value={f.nota.toFixed(1).replace('.', ',')} accent="amber" />
            <StatCard label="Avaliações" value={String(f.avaliacoes)} accent="slate" />
            <StatCard label="Concluídos" value={`${f.percentualConcluidos}%`} accent="green" />
            <StatCard label="Recorrentes" value={String(f.clientesRecorrentes)} accent="coral" />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
