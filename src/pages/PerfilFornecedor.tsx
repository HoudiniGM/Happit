import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/Layout';
import { FORNECEDORA_EXEMPLO, formatBRL } from '../data/mock';
import {
  IconArrowLeft,
  IconCheck,
  IconMapPin,
} from '../components/Icons';
import { Pill, StarRating, Toast } from '../components/ui';

export default function PerfilFornecedor() {
  const navigate = useNavigate();
  const f = FORNECEDORA_EXEMPLO;
  const [toast, setToast] = useState<string | null>(null);

  const metricas = [
    { label: 'Nota média', valor: f.nota.toFixed(1).replace('.', ','), accent: 'text-amber-500' },
    { label: 'Eventos realizados', valor: String(f.eventosRealizados), accent: 'text-brand-600' },
    { label: 'Entregas no prazo', valor: `${f.percentualNoPrazo}%`, accent: 'text-emerald-600' },
    { label: 'Pedidos concluídos', valor: `${f.percentualConcluidos}%`, accent: 'text-emerald-600' },
    { label: 'Avaliações', valor: String(f.avaliacoes), accent: 'text-slate-700' },
    { label: 'Clientes recorrentes', valor: String(f.clientesRecorrentes), accent: 'text-coral-500' },
  ];

  const fotos = ['🎂', '🧁', '🍰', '🎀'];

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-5">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          <IconArrowLeft width={16} height={16} /> Voltar
        </button>

        {/* Galeria */}
        <div className="grid grid-cols-4 gap-2">
          {fotos.map((e, i) => (
            <div
              key={i}
              className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-orange-50 text-4xl ${
                i === 0 ? 'col-span-2 row-span-2 aspect-square text-6xl' : 'aspect-square'
              }`}
            >
              {e}
            </div>
          ))}
        </div>

        {/* Cabeçalho */}
        <div className="ef-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">
                  {f.nome}
                </h1>
                <Pill tone="green">
                  <IconCheck width={12} height={12} /> Verificado
                </Pill>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <StarRating value={f.nota} showValue />
                <span className="text-sm text-slate-400">
                  · {f.avaliacoes} avaliações
                </span>
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <IconMapPin width={14} height={14} /> {f.regiao}
                </span>
                <span>• {f.capacidade}</span>
                <span className="font-semibold text-emerald-600">
                  • {f.entrega}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">a partir de</p>
              <p className="text-2xl font-extrabold text-brand-600">
                {formatBRL(f.precoInicial)}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {f.descricao}
          </p>
        </div>

        {/* Métricas de reputação */}
        <section>
          <h2 className="mb-3 text-base font-bold text-slate-800">
            Reputação
          </h2>
          <div className="grid grid-cols-3 gap-3 @2xl:grid-cols-6">
            {metricas.map((m) => (
              <div
                key={m.label}
                className="ef-card flex flex-col items-center p-3 text-center"
              >
                <p className={`text-xl font-extrabold ${m.accent}`}>
                  {m.valor}
                </p>
                <p className="mt-0.5 text-[10px] font-medium leading-tight text-slate-500">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Avaliações */}
        <section>
          <h2 className="mb-3 text-base font-bold text-slate-800">
            O que dizem os clientes
          </h2>
          <div className="space-y-3">
            {f.avaliacoesLista.map((a, i) => (
              <div key={i} className="ef-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      {a.autor.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {a.autor}
                      </p>
                      <StarRating value={a.nota} size={12} />
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{a.data}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{a.texto}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Barra fixa de ação */}
      <div className="sticky bottom-0 -mx-4 mt-5 flex items-center justify-between gap-3 border-t border-slate-100 bg-white/90 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
        <div>
          <p className="text-xs text-slate-400">a partir de</p>
          <p className="text-lg font-extrabold text-slate-900">
            {formatBRL(f.precoInicial)}
          </p>
        </div>
        <button
          onClick={() => {
            setToast('Proposta solicitada! Maria responde em até 24h.');
            setTimeout(() => setToast(null), 2200);
          }}
          className="ef-btn-primary"
        >
          Solicitar proposta
        </button>
      </div>

      {toast && <Toast>✓ {toast}</Toast>}
    </AppShell>
  );
}
