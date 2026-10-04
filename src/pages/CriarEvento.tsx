import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/Layout';
import { useEventStore } from '../store/EventStore';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
} from '../components/Icons';
import { formatBRL } from '../data/mock';

const TIPOS = [
  { id: 'aniversario', emoji: '🎂', label: 'Aniversário' },
  { id: 'casamento', emoji: '💍', label: 'Casamento' },
  { id: 'infantil', emoji: '🧸', label: 'Festa infantil' },
  { id: 'corporativo', emoji: '💼', label: 'Corporativo' },
  { id: 'cha', emoji: '🍼', label: 'Chá de bebê' },
  { id: 'outro', emoji: '✨', label: 'Outro' },
];

const TEMAS = ['Tropical', 'Clássico', 'Minimalista', 'Boho', 'Neon', 'Vintage'];
const NECESSIDADES = [
  '🍰 Bolo',
  '🍽 Buffet',
  '🪑 Mesas e cadeiras',
  '🎈 Decoração',
  '📸 Fotografia',
  '🎵 Música',
  '🥂 Bebidas',
  '✉️ Convites',
];

const PASSOS = [
  'Tipo',
  'Data e local',
  'Convidados',
  'Orçamento',
  'Tema e necessidades',
];

export default function CriarEvento() {
  const navigate = useNavigate();
  const { evento } = useEventStore();
  const [passo, setPasso] = useState(0);

  const [tipo, setTipo] = useState('aniversario');
  const [data, setData] = useState('20/11');
  const [hora, setHora] = useState('19:00');
  const [local, setLocal] = useState('Salão de festas, Campinas');
  const [convidados, setConvidados] = useState(80);
  const [orcamento, setOrcamento] = useState(8000);
  const [tema, setTema] = useState('Tropical');
  const [necessidades, setNecessidades] = useState<string[]>(NECESSIDADES);

  const total = PASSOS.length;
  const ultimo = passo === total - 1;

  function toggleNecessidade(n: string) {
    setNecessidades((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n],
    );
  }

  function avancar() {
    if (ultimo) navigate('/plano');
    else setPasso((p) => p + 1);
  }
  function voltar() {
    if (passo === 0) navigate('/painel');
    else setPasso((p) => p - 1);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        {/* Cabeçalho + progresso */}
        <div className="mb-5">
          <button
            onClick={voltar}
            className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-700"
          >
            <IconArrowLeft width={16} height={16} />
            {passo === 0 ? 'Painel' : 'Voltar'}
          </button>
          <h1 className="text-xl font-extrabold text-slate-900">
            Criar evento
          </h1>
          <p className="text-sm text-slate-500">
            Passo {passo + 1} de {total} · {PASSOS[passo]}
          </p>

          <div className="mt-3 flex gap-1.5">
            {PASSOS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition ${
                  i <= passo ? 'bg-brand-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="ef-card ef-animate p-5" key={passo}>
          {/* Passo 1 — Tipo */}
          {passo === 0 && (
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Que tipo de evento você quer realizar?
              </h2>
              <p className="mb-4 text-sm text-slate-500">
                Vamos montar o plano certo para ele.
              </p>
              <div className="grid grid-cols-2 gap-3 @xl:grid-cols-3">
                {TIPOS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTipo(t.id)}
                    className={`flex flex-col items-start gap-1 rounded-2xl border-2 p-4 text-left transition ${
                      tipo === t.id
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="text-sm font-semibold text-slate-700">
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Passo 2 — Data e local */}
          {passo === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-800">
                Quando e onde vai ser?
              </h2>
              <div className="grid gap-4 @md:grid-cols-2">
                <div>
                  <label className="ef-label">Data (dd/mm)</label>
                  <input
                    className="ef-input"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="20/11"
                  />
                </div>
                <div>
                  <label className="ef-label">Horário</label>
                  <input
                    className="ef-input"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    placeholder="19:00"
                  />
                </div>
              </div>
              <div>
                <label className="ef-label">Local</label>
                <input
                  className="ef-input"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Passo 3 — Convidados */}
          {passo === 2 && (
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Quantos convidados você espera?
              </h2>
              <p className="mb-5 text-sm text-slate-500">
                Isso ajuda a dimensionar buffet, mesas e decoração.
              </p>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-brand-600">
                  {convidados}
                </p>
                <p className="text-sm text-slate-500">convidados estimados</p>
              </div>
              <input
                type="range"
                min={50}
                max={200}
                step={5}
                value={convidados}
                onChange={(e) => setConvidados(Number(e.target.value))}
                className="mt-5 w-full accent-brand-600"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>50</span>
                <span>200</span>
              </div>
            </div>
          )}

          {/* Passo 4 — Orçamento */}
          {passo === 3 && (
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Qual é o seu orçamento?
              </h2>
              <p className="mb-5 text-sm text-slate-500">
                Vamos dividir esse valor entre as categorias do evento.
              </p>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-brand-600">
                  {formatBRL(orcamento)}
                </p>
              </div>
              <input
                type="range"
                min={3000}
                max={20000}
                step={500}
                value={orcamento}
                onChange={(e) => setOrcamento(Number(e.target.value))}
                className="mt-5 w-full accent-brand-600"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>R$ 3.000</span>
                <span>R$ 20.000</span>
              </div>
              <p className="mt-3 rounded-xl bg-brand-50 p-3 text-xs text-brand-700">
                💡 Com {formatBRL(orcamento)} para {convidados} convidados, dá
                cerca de {formatBRL(Math.round(orcamento / convidados))} por
                pessoa.
              </p>
            </div>
          )}

          {/* Passo 5 — Tema e necessidades */}
          {passo === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Qual o estilo do evento?
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TEMAS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTema(t)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        tema === t
                          ? 'border-brand-500 bg-brand-600 text-white'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  O que você já sabe que vai precisar?
                </h3>
                <p className="mb-3 text-xs text-slate-500">
                  Pode ajustar depois no plano.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {NECESSIDADES.map((n) => {
                    const ativo = necessidades.includes(n);
                    return (
                      <button
                        key={n}
                        onClick={() => toggleNecessidade(n)}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                          ativo
                            ? 'border-brand-300 bg-brand-50 text-brand-700'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {n}
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md ${
                            ativo
                              ? 'bg-brand-600 text-white'
                              : 'border border-slate-300'
                          }`}
                        >
                          {ativo && <IconCheck width={12} height={12} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resumo + ação */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {evento.nome} em construção
          </p>
          <button onClick={avancar} className="ef-btn-primary">
            {ultimo ? 'Gerar meu plano' : 'Continuar'}
            <IconArrowRight width={16} height={16} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
