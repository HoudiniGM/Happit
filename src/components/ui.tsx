import type { ReactNode } from 'react';
import { IconStar } from './Icons';
import {
  formatBRL,
  type ConviteStatus,
  type FornecedorStatus,
} from '../data/mock';

/* ---------------- StatusBadge (fornecedor) ---------------- */
export function StatusBadge({ status }: { status: FornecedorStatus }) {
  const map: Record<FornecedorStatus, string> = {
    Confirmado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Aguardando: 'bg-amber-50 text-amber-700 border-amber-200',
    Procurando: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  const dot: Record<FornecedorStatus, string> = {
    Confirmado: 'bg-emerald-500',
    Aguardando: 'bg-amber-500',
    Procurando: 'bg-rose-500',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${map[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}

/* ---------------- ConviteBadge ---------------- */
export function ConviteBadge({ status }: { status: ConviteStatus }) {
  const map: Record<ConviteStatus, string> = {
    Sim: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Não: 'bg-rose-50 text-rose-700 border-rose-200',
    Talvez: 'bg-amber-50 text-amber-700 border-amber-200',
    Pendente: 'bg-slate-100 text-slate-500 border-slate-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${map[status]}`}
    >
      {status}
    </span>
  );
}

/* ---------------- PaymentProgress ---------------- */
export function PaymentProgress({
  percent,
  size = 'md',
}: {
  percent: number;
  size?: 'sm' | 'md';
}) {
  const color =
    percent >= 100
      ? 'bg-emerald-500'
      : percent > 0
        ? 'bg-amber-400'
        : 'bg-slate-300';
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-slate-100 ${
        size === 'sm' ? 'h-1.5' : 'h-2.5'
      }`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${Math.min(100, percent)}%` }}
      />
    </div>
  );
}

/* ---------------- StarRating ---------------- */
export function StarRating({
  value,
  size = 14,
  showValue = false,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <IconStar
            key={i}
            width={size}
            height={size}
            className={i <= Math.round(value) ? 'text-amber-400' : 'text-slate-200'}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-sm font-semibold text-slate-700">
          {value.toFixed(1).replace('.', ',')}
        </span>
      )}
    </span>
  );
}

/* ---------------- StatCard ---------------- */
export function StatCard({
  label,
  value,
  accent = 'brand',
  hint,
}: {
  label: string;
  value: string;
  accent?: 'brand' | 'green' | 'amber' | 'coral' | 'slate';
  hint?: string;
}) {
  const accentMap = {
    brand: 'text-brand-600',
    green: 'text-emerald-600',
    amber: 'text-amber-600',
    coral: 'text-coral-500',
    slate: 'text-slate-700',
  };
  return (
    <div className="ef-card p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${accentMap[accent]}`}>{value}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

/* ---------------- Money ---------------- */
export function Money({ value }: { value: number }) {
  return <span>{formatBRL(value)}</span>;
}

/* ---------------- SectionTitle ---------------- */
export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-bold text-slate-800">{children}</h2>
      {action}
    </div>
  );
}

/* ---------------- Pill ---------------- */
export function Pill({
  children,
  tone = 'brand',
}: {
  children: ReactNode;
  tone?: 'brand' | 'coral' | 'slate' | 'green';
}) {
  const map = {
    brand: 'bg-brand-50 text-brand-700',
    coral: 'bg-orange-50 text-coral-600',
    slate: 'bg-slate-100 text-slate-600',
    green: 'bg-emerald-50 text-emerald-700',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${map[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---------------- Toast (inline feedback) ---------------- */
export function Toast({ children }: { children: ReactNode }) {
  return (
    <div className="ef-animate fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lift md:bottom-8">
      {children}
    </div>
  );
}
