import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventStore } from '../store/EventStore';
import { PublicShell } from '../components/PublicShell';
import type { ConviteStatus, RestricaoAlimentar } from '../data/mock';
import {
  IconArrowLeft,
  IconCalendar,
  IconCheck,
  IconClock,
  IconMapPin,
} from '../components/Icons';

const RESTRICOES: RestricaoAlimentar[] = [
  'Nenhuma',
  'Vegetariano',
  'Vegano',
  'Alergia a amendoim',
];

export default function Convite() {
  const navigate = useNavigate();
  const { evento, respostaConvite, responderConvite } = useEventStore();

  const [status, setStatus] = useState<ConviteStatus>(respostaConvite.status);
  const [restricao, setRestricao] = useState<RestricaoAlimentar>(
    respostaConvite.restricao,
  );
  const [enviado, setEnviado] = useState(false);

  function confirmar() {
    responderConvite(status, restricao);
    setEnviado(true);
  }

  const opcoes: { v: ConviteStatus; label: string; emoji: string; cor: string }[] = [
    { v: 'Sim', label: 'Sim, vou!', emoji: '🎉', cor: 'emerald' },
    { v: 'Talvez', label: 'Talvez', emoji: '🤔', cor: 'amber' },
    { v: 'Não', label: 'Não vou', emoji: '😢', cor: 'rose' },
  ];

  function corBotao(cor: string, ativo: boolean) {
    const map: Record<string, string> = {
      emerald: ativo
        ? 'border-emerald-500 bg-emerald-500 text-white'
        : 'border-slate-200 text-slate-600 hover:border-emerald-300',
      amber: ativo
        ? 'border-amber-400 bg-amber-400 text-white'
        : 'border-slate-200 text-slate-600 hover:border-amber-300',
      rose: ativo
        ? 'border-rose-500 bg-rose-500 text-white'
        : 'border-slate-200 text-slate-600 hover:border-rose-300',
    };
    return map[cor];
  }

  return (
    <PublicShell>
      <div className="flex min-h-full flex-col bg-gradient-to-b from-brand-50 via-orange-50/40 to-white">
        <div className="px-5 pt-5">
          <button
            onClick={() => navigate('/convidados')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            <IconArrowLeft width={14} height={14} /> Voltar (visão do organizador)
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-6">
          {/* Convite */}
          <div className="ef-card overflow-hidden">
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-8 text-center text-white">
              <p className="text-4xl">🎈</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-100">
                Você está convidado
              </p>
              <h1 className="mt-1 text-2xl font-extrabold">{evento.nome}</h1>
              <p className="mt-1 text-sm text-brand-100">Tema {evento.tema}</p>
            </div>

            <div className="space-y-3 px-6 py-5">
              <InfoLinha
                icon={<IconCalendar width={18} height={18} />}
                label="Data"
                valor={`${evento.data}`}
              />
              <InfoLinha
                icon={<IconClock width={18} height={18} />}
                label="Horário"
                valor={evento.hora}
              />
              <InfoLinha
                icon={<IconMapPin width={18} height={18} />}
                label="Local"
                valor={evento.local}
              />
            </div>
          </div>

          {!enviado ? (
            <div className="mt-5">
              <h2 className="text-center text-sm font-bold text-slate-800">
                Você vai poder comparecer?
              </h2>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {opcoes.map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setStatus(o.v)}
                    className={`flex flex-col items-center gap-1 rounded-2xl border-2 py-3 text-sm font-bold transition ${corBotao(
                      o.cor,
                      status === o.v,
                    )}`}
                  >
                    <span className="text-2xl">{o.emoji}</span>
                    {o.label}
                  </button>
                ))}
              </div>

              {status !== 'Não' && (
                <div className="ef-animate mt-5">
                  <h3 className="text-sm font-bold text-slate-800">
                    Você tem alguma restrição alimentar?
                  </h3>
                  <p className="mb-2 text-xs text-slate-500">
                    Avisamos o buffet para preparar algo pra você.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {RESTRICOES.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRestricao(r)}
                        className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                          restricao === r
                            ? 'border-brand-500 bg-brand-600 text-white'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {r === 'Nenhuma' ? 'Nenhuma' : r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={confirmar}
                disabled={status === 'Pendente'}
                className="ef-btn-primary mt-6 w-full"
              >
                Confirmar resposta
              </button>
            </div>
          ) : (
            <div className="ef-animate mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                <IconCheck width={28} height={28} />
              </span>
              <h2 className="mt-3 text-lg font-extrabold text-emerald-800">
                {status === 'Sim'
                  ? 'Presença confirmada! 🎉'
                  : status === 'Talvez'
                    ? 'Resposta registrada 🤔'
                    : 'Que pena! 😢'}
              </h2>
              <p className="mt-1 text-sm text-emerald-700">
                {status === 'Não'
                  ? 'A organizadora foi avisada.'
                  : `Sua resposta foi enviada à organizadora.${
                      restricao !== 'Nenhuma'
                        ? ` Restrição: ${restricao}.`
                        : ''
                    }`}
              </p>
              <button
                onClick={() => setEnviado(false)}
                className="ef-btn-secondary mt-4"
              >
                Alterar resposta
              </button>
            </div>
          )}

          <p className="mt-6 text-center text-xs text-slate-400">
            Enviado via Happit · você não precisa criar conta
          </p>
        </div>
      </div>
    </PublicShell>
  );
}

function InfoLinha({
  icon,
  label,
  valor,
}: {
  icon: React.ReactNode;
  label: string;
  valor: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        {icon}
      </span>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-800">{valor}</p>
      </div>
    </div>
  );
}
