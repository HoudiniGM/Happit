import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/Layout';
import { useEventStore } from '../store/EventStore';
import { RESUMO_RESTRICOES } from '../data/mock';
import { IconCheck, IconShare } from '../components/Icons';
import {
  ConviteBadge,
  Pill,
  SectionTitle,
  StatCard,
  Toast,
} from '../components/ui';
import type { ConviteStatus } from '../data/mock';

export default function Convidados() {
  const navigate = useNavigate();
  const { convidados, setConviteStatus, evento } = useEventStore();
  const [toast, setToast] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<ConviteStatus | 'Todos'>('Todos');

  const confirmados = convidados.filter((c) => c.status === 'Sim').length;
  const talvez = convidados.filter((c) => c.status === 'Talvez').length;
  const recusados = convidados.filter((c) => c.status === 'Não').length;

  const r = RESUMO_RESTRICOES;
  const restricoes = [
    { emoji: '✅', label: 'Sem restrição', valor: r.semRestricao, tone: 'bg-emerald-50 text-emerald-700' },
    { emoji: '🥗', label: 'Vegetarianos', valor: r.vegetarianos, tone: 'bg-lime-50 text-lime-700' },
    { emoji: '🌱', label: 'Veganos', valor: r.veganos, tone: 'bg-green-50 text-green-700' },
    { emoji: '🥜', label: 'Alergia a amendoim', valor: r.amendoim, tone: 'bg-rose-50 text-rose-700' },
  ];

  const lista =
    filtro === 'Todos'
      ? convidados
      : convidados.filter((c) => c.status === filtro);

  const opcoes: ConviteStatus[] = ['Sim', 'Talvez', 'Não'];

  function compartilhar() {
    setToast('Link do convite copiado! Compartilhe no WhatsApp.');
    setTimeout(() => setToast(null), 2200);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Convidados</h1>
            <p className="text-sm text-slate-500">
              {confirmados} confirmados de {evento.convidados} convidados
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={compartilhar} className="ef-btn-secondary">
              <IconShare width={16} height={16} /> Compartilhar
            </button>
            <button
              onClick={() => navigate('/convite')}
              className="ef-btn-primary"
            >
              Ver convite
            </button>
          </div>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Confirmados" value={String(confirmados)} accent="green" />
          <StatCard label="Talvez" value={String(talvez)} accent="amber" />
          <StatCard label="Não vão" value={String(recusados)} accent="coral" />
        </div>

        {/* Restrições consolidadas */}
        <section>
          <SectionTitle
            action={
              <Pill tone="brand">
                <IconCheck width={12} height={12} /> Enviado ao buffet
              </Pill>
            }
          >
            Resumo de restrições alimentares
          </SectionTitle>
          <div className="ef-card p-4">
            <p className="mb-3 text-xs text-slate-500">
              Este resumo consolidado é enviado automaticamente ao Buffet Y para
              preparar o cardápio ({r.total} convidados).
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {restricoes.map((x) => (
                <div
                  key={x.label}
                  className={`rounded-2xl p-3 ${x.tone}`}
                >
                  <p className="text-2xl font-extrabold">{x.valor}</p>
                  <p className="text-xs font-semibold">
                    {x.emoji} {x.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lista */}
        <section>
          <SectionTitle
            action={
              <div className="flex gap-1">
                {(['Todos', 'Sim', 'Talvez', 'Não'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltro(f)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      filtro === f
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            }
          >
            Lista de convidados
          </SectionTitle>

          <div className="ef-card divide-y divide-slate-100">
            {lista.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {c.nome.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {c.nome}
                  </p>
                  <p className="text-xs text-slate-400">
                    {c.restricao === 'Nenhuma'
                      ? 'Sem restrição'
                      : c.restricao}
                    {c.acompanhantes > 0 &&
                      ` · +${c.acompanhantes} acompanhante${c.acompanhantes > 1 ? 's' : ''}`}
                  </p>
                </div>

                {/* Alterar status (interativo) */}
                <div className="hidden items-center gap-1 sm:flex">
                  {opcoes.map((op) => (
                    <button
                      key={op}
                      onClick={() => {
                        setConviteStatus(c.id, op);
                        setToast(`${c.nome} marcado como "${op}".`);
                        setTimeout(() => setToast(null), 1600);
                      }}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                        c.status === op
                          ? op === 'Sim'
                            ? 'bg-emerald-500 text-white'
                            : op === 'Talvez'
                              ? 'bg-amber-400 text-white'
                              : 'bg-rose-500 text-white'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
                <div className="sm:hidden">
                  <ConviteBadge status={c.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {toast && <Toast>✓ {toast}</Toast>}
    </AppShell>
  );
}
