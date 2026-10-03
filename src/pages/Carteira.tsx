import { useState } from 'react';
import { AppShell } from '../components/Layout';
import { useEventStore } from '../store/EventStore';
import { formatBRL } from '../data/mock';
import { IconShield } from '../components/Icons';
import {
  PaymentProgress,
  Pill,
  SectionTitle,
  StatCard,
  Toast,
} from '../components/ui';

export default function Carteira() {
  const { carteira, fornecedores, pagarRestante } = useEventStore();
  const [toast, setToast] = useState<string | null>(null);

  const contratados = fornecedores.filter((f) => f.status !== 'Procurando');
  const percentPago =
    carteira.contratado > 0
      ? (carteira.pago / carteira.contratado) * 100
      : 0;

  function pagar(id: string, nome: string, valor: number) {
    pagarRestante(id);
    setToast(`${formatBRL(valor)} pago a ${nome} com segurança.`);
    setTimeout(() => setToast(null), 2200);
  }

  function statusPagamento(f: (typeof fornecedores)[number]) {
    if (f.percentualPago >= 100)
      return { label: 'Pago', tone: 'green' as const };
    if (f.percentualPago > 0)
      return { label: 'Pago parcial', tone: 'coral' as const };
    return { label: 'Contratado', tone: 'slate' as const };
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-5">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Carteira do evento
          </h1>
          <p className="text-sm text-slate-500">
            Acompanhe o quanto já foi contratado e pago.
          </p>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            label="Orçamento"
            value={formatBRL(carteira.orcamento)}
            accent="slate"
          />
          <StatCard
            label="Contratado"
            value={formatBRL(carteira.contratado)}
            accent="brand"
          />
          <StatCard
            label="Pago"
            value={formatBRL(carteira.pago)}
            accent="green"
          />
          <StatCard
            label="Restante"
            value={formatBRL(carteira.restante)}
            accent="amber"
          />
        </div>

        {/* Barra geral */}
        <div className="ef-card p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">
              Pagamento geral
            </span>
            <span className="text-sm font-semibold text-slate-500">
              {Math.round(percentPago)}% quitado
            </span>
          </div>
          <PaymentProgress percent={percentPago} />
          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>{formatBRL(carteira.pago)} pago</span>
            <span>{formatBRL(carteira.restante)} a pagar</span>
          </div>
        </div>

        {/* Pagamento seguro */}
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <IconShield width={20} height={20} />
          </span>
          <div>
            <p className="text-sm font-bold text-emerald-800">
              Pagamento intermediado com segurança
            </p>
            <p className="text-xs text-emerald-600">
              O valor só é liberado ao fornecedor após a confirmação do serviço.
            </p>
          </div>
        </div>

        {/* Lista por fornecedor */}
        <section>
          <SectionTitle>Pagamentos por fornecedor</SectionTitle>
          <div className="space-y-3">
            {contratados.map((f) => {
              const sp = statusPagamento(f);
              const restante = f.valorContratado - f.valorPago;
              return (
                <div key={f.id} className="ef-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-lg">
                        {f.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {f.nome}
                        </p>
                        <p className="text-xs text-slate-400">{f.categoria}</p>
                      </div>
                    </div>
                    <Pill tone={sp.tone}>{sp.label}</Pill>
                  </div>

                  <div className="mt-3">
                    <PaymentProgress percent={f.percentualPago} size="sm" />
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[11px] text-slate-400">Contratado</p>
                      <p className="text-sm font-bold text-slate-800">
                        {formatBRL(f.valorContratado)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400">Pago</p>
                      <p className="text-sm font-bold text-emerald-600">
                        {formatBRL(f.valorPago)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400">Restante</p>
                      <p className="text-sm font-bold text-amber-600">
                        {formatBRL(restante)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {f.vencimento
                        ? `Vencimento: ${f.vencimento}`
                        : 'Sem vencimento'}
                    </span>
                    {restante > 0 ? (
                      <button
                        onClick={() => pagar(f.id, f.nome, restante)}
                        className="ef-btn-primary px-4 py-2 text-xs"
                      >
                        Pagar {formatBRL(restante)}
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-600">
                        ✓ Totalmente pago
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {toast && <Toast>✓ {toast}</Toast>}
    </AppShell>
  );
}
