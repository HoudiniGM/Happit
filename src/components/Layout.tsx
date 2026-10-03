import { type ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDevice } from '../store/DeviceStore';
import { useEventStore } from '../store/EventStore';
import {
  IconBell,
  IconCalendar,
  IconHome,
  IconLogout,
  IconMonitor,
  IconSmartphone,
  IconStore,
  IconUsers,
  IconWallet,
} from './Icons';

const NAV = [
  { to: '/painel', label: 'Início', icon: IconHome },
  { to: '/evento', label: 'Evento', icon: IconCalendar },
  { to: '/fornecedores', label: 'Fornecedores', icon: IconStore },
  { to: '/carteira', label: 'Carteira', icon: IconWallet },
  { to: '/convidados', label: 'Convidados', icon: IconUsers },
];

/* Alterna APP x SITE — fica fora da moldura, sempre visível */
export function DeviceSwitch() {
  const { mode, setMode } = useDevice();
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-soft">
      <button
        onClick={() => setMode('app')}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
          mode === 'app'
            ? 'bg-brand-600 text-white'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <IconSmartphone width={15} height={15} /> App
      </button>
      <button
        onClick={() => setMode('site')}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
          mode === 'site'
            ? 'bg-brand-600 text-white'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <IconMonitor width={15} height={15} /> Site
      </button>
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lift">
        <IconCalendar width={18} height={18} />
      </div>
      {!compact && (
        <span className="text-lg font-extrabold tracking-tight text-slate-900">
          Evento<span className="text-brand-600">Fácil</span>
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shell com conteúdo interno (telas autenticadas do organizador)      */
/* ------------------------------------------------------------------ */
export function AppShell({ children }: { children: ReactNode }) {
  const { mode } = useDevice();
  return mode === 'app' ? (
    <MobileFrame>
      <MobileChrome>{children}</MobileChrome>
    </MobileFrame>
  ) : (
    <DesktopFrame>
      <DesktopChrome>{children}</DesktopChrome>
    </DesktopFrame>
  );
}

/* ---------------- Moldura celular ---------------- */
export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-4 bg-gradient-to-b from-slate-100 to-slate-200 px-4 py-6">
      <DeviceSwitch />
      <div className="relative h-[760px] w-[380px] max-w-full overflow-hidden rounded-[2.5rem] border-[10px] border-slate-900 bg-white shadow-2xl">
        <div className="absolute left-1/2 top-0 z-20 h-5 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-900" />
        <div className="flex h-full flex-col">{children}</div>
      </div>
      <p className="text-xs text-slate-400">Versão APP · mobile</p>
    </div>
  );
}

/* ---------------- Moldura desktop ---------------- */
export function DesktopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-slate-200 px-4 py-6">
      <DeviceSwitch />
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-300 bg-slate-50 shadow-2xl">
        <div className="flex h-7 items-center gap-1.5 bg-slate-800 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 text-[11px] text-slate-300">
            eventofacil.com.br
          </span>
        </div>
        {children}
      </div>
      <p className="text-xs text-slate-400">Versão SITE · desktop responsivo</p>
    </div>
  );
}

/* ---------------- Chrome do app (barra inferior) ---------------- */
function MobileChrome({ children }: { children: ReactNode }) {
  const { perfil, logout, evento } = useEventStore();
  const navigate = useNavigate();
  const location = useLocation();
  const title = NAV.find((n) => location.pathname.startsWith(n.to))?.label;

  return (
    <>
      {/* Topo */}
      <header className="flex items-center justify-between border-b border-slate-100 px-4 pb-3 pt-7">
        <div>
          <p className="text-[11px] font-medium text-slate-400">{title}</p>
          <p className="text-sm font-bold text-slate-900">{evento.nome}</p>
        </div>
        <div className="flex items-center gap-1">
          <NavLink
            to="/convite"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <IconBell width={18} height={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral-500" />
          </NavLink>
          {perfil.logado && (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
              title="Sair"
            >
              <IconLogout width={18} height={18} />
            </button>
          )}
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4">
        {children}
      </main>

      {/* Barra inferior */}
      <nav className="grid grid-cols-5 border-t border-slate-100 bg-white px-1 pb-1 pt-1">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-semibold transition ${
                isActive ? 'text-brand-600' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                    isActive ? 'bg-brand-50' : ''
                  }`}
                >
                  <Icon width={19} height={19} />
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

/* ---------------- Chrome do site (menu lateral) ---------------- */
function DesktopChrome({ children }: { children: ReactNode }) {
  const { perfil, logout, evento } = useEventStore();
  const navigate = useNavigate();

  return (
    <div className="flex h-[720px] bg-slate-50">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col border-r border-slate-200 bg-white px-4 py-5">
        <div className="px-1">
          <Logo />
        </div>

        <div className="mt-6 rounded-xl bg-brand-50 p-3">
          <p className="text-[11px] font-medium text-brand-500">Evento ativo</p>
          <p className="text-sm font-bold text-brand-800">{evento.nome}</p>
          <p className="text-xs text-brand-500">
            {evento.data} · {evento.convidados} convidados
          </p>
        </div>

        <nav className="mt-5 flex flex-1 flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lift'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon width={18} height={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {perfil.logado && (
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
          >
            <IconLogout width={18} height={18} /> Sair
          </button>
        )}
      </aside>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3.5">
          <div>
            <p className="text-xs font-medium text-slate-400">
              {evento.tipo} · {evento.local}
            </p>
            <p className="text-base font-bold text-slate-900">{evento.nome}</p>
          </div>
          <div className="flex items-center gap-3">
            <NavLink
              to="/convite"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
            >
              <IconBell width={18} height={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral-500" />
            </NavLink>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                {perfil.tipo === 'Fornecedor' ? 'F' : 'O'}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold text-slate-700">
                  {perfil.tipo ?? 'Organizador'}
                </p>
                <p className="text-[10px] text-slate-400">
                  {perfil.email ?? 'ana@email.com'}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
