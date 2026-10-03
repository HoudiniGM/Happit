import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/Layout';
import { useEventStore } from '../store/EventStore';
import { formatBRL } from '../data/mock';
import { IconCheck, IconStar } from '../components/Icons';
import { Pill, Toast } from '../components/ui';

export default function Avaliacao() {
  const navigate = useNavigate();
  const { fornecedores } = useEventStore();
  const contratados = fornecedores.filter((f) => f.status !== 'Procurando');

  const [selId, setSelId] = useState(contratados[0]?.id ?? '');
  const [estrelas, setEstrelas] = useState(0);
  const [hover, setHover] = useState(0);
  const [pontualidade, setPontualidade] = useState<string | null>(null);
  const [comentario, setComentario] = useState('');
  const [avaliados, setAvaliados] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const sel = contratados.find((f) => f.id === selId);
  const pontos = ['Chegou adiantado', 'No horário', 'Atrasou'];

  function enviar() {
    if (!sel || estrelas === 0) return;
    setAvaliados((prev) => [...prev, sel.id]);
    setToast(
      `Avaliação enviada! ${sel.nome} recebeu ${estrelas} estrela${estrelas > 1 ? 's' : ''}.`,
    );
    setEstrelas(0);
    setPontualidade(null);
    setComentario('');
    const proximo = contratados.find(
      (f) => f.id !== sel.id && ![...avaliados, sel.id].includes(f.id),
    );
    if (proximo) setSelId(proximo.id);
    setTimeout(() => setToast(null), 2200);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
          <Pill tone="coral">🎉 Evento concluído</Pill>
          <h1 className="mt-2 text-xl font-extrabold">
            Como foi o Aniversário da Ana?
          </h1>
          <p className="mt-1 text-sm text-brand-100">
            Avalie seus fornecedores. Sua opinião constrói a reputação deles e
            ajuda outros organizadores.
          </p>
        </div>

        {/* Seletor de fornecedor */}
        <div className="flex flex-wrap gap-2">
          {contratados.map((f) => {
            const feito = avaliados.includes(f.id);
            return (
              <button
                key={f.id}
                onClick={() => setSelId(f.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
                  selId === f.id
                    ? 'border-brand-500 bg-brand-600 text-white'
                    : feito
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span>{f.emoji}</span>
                {f.nome}
                {feito && <IconCheck width={14} height={14} />}
              </button>
            );
          })}
        </div>

        {/* Formulário */}
        {sel && (
          <div className="ef-card ef-animate p-6" key={sel.id}>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
                {sel.emoji}
              </span>
              <div>
                <p className="text-base font-bold text-slate-800">{sel.nome}</p>
                <p className="text-xs text-slate-400">
                  {sel.categoria} · {formatBRL(sel.valorContratado)}
                </p>
              </div>
            </div>

            {/* Estrelas */}
            <div className="mt-5 text-center">
              <p className="text-sm font-semibold text-slate-700">
                Qual sua nota geral?
              </p>
              <div className="mt-2 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setEstrelas(i)}
                    className="p-1"
                  >
                    <IconStar
                      width={34}
                      height={34}
                      className={
                        i <= (hover || estrelas)
                          ? 'text-amber-400'
                          : 'text-slate-200'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Pontualidade */}
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Pontualidade
              </p>
              <div className="flex flex-wrap gap-2">
                {pontos.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPontualidade(p)}
                    className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                      pontualidade === p
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Comentário */}
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Deixe um comentário (opcional)
              </p>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows={3}
                placeholder="Conte como foi a experiência..."
                className="ef-input resize-none"
              />
            </div>

            <button
              onClick={enviar}
              disabled={estrelas === 0}
              className="ef-btn-primary mt-5 w-full"
            >
              Enviar avaliação
            </button>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/painel')}
            className="ef-btn-ghost text-brand-600"
          >
            Voltar ao painel
          </button>
        </div>
      </div>

      {toast && <Toast>✓ {toast}</Toast>}
    </AppShell>
  );
}
