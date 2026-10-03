import { useNavigate } from 'react-router-dom';
import { useDevice } from '../store/DeviceStore';
import { PublicShell } from '../components/PublicShell';
import { PASSOS_COMO_FUNCIONA } from '../data/mock';
import { IconArrowRight, IconCalendar, IconStore } from '../components/Icons';
import { Pill } from '../components/ui';

const SLOGAN =
  'Você organiza o evento. Nós cuidamos para que nada seja esquecido.';

export default function Home() {
  const { mode } = useDevice();
  const navigate = useNavigate();

  const ComoFunciona = (
    <div className="grid gap-3 md:grid-cols-4">
      {PASSOS_COMO_FUNCIONA.map((p) => (
        <div
          key={p.numero}
          className="ef-card relative p-4 md:p-5"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-lg">
              {p.emoji}
            </span>
            <span className="text-xs font-bold text-brand-500">
              Passo {p.numero}
            </span>
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-800">{p.titulo}</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            {p.texto}
          </p>
        </div>
      ))}
    </div>
  );

  const CTAs = (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      <button
        onClick={() => navigate('/cadastro?perfil=Organizador')}
        className="ef-btn-primary flex-1"
      >
        Criar meu evento <IconArrowRight width={16} height={16} />
      </button>
      <button
        onClick={() => navigate('/cadastro?perfil=Fornecedor')}
        className="ef-btn-secondary flex-1"
      >
        <IconStore width={16} height={16} /> Sou fornecedor
      </button>
    </div>
  );

  /* ----------------------------- APP ----------------------------- */
  if (mode === 'app') {
    return (
      <PublicShell>
        <div className="flex flex-col gap-6 bg-gradient-to-b from-brand-50 to-white px-5 pb-8 pt-10">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lift">
              <IconCalendar width={20} height={20} />
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              Evento<span className="text-brand-600">Fácil</span>
            </span>
          </div>

          <div>
            <Pill tone="coral">✨ Seu organizador de eventos</Pill>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-slate-900">
              Transforme uma ideia de festa em um plano completo.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {SLOGAN}
            </p>
          </div>

          {CTAs}
        </div>

        <div className="px-5 py-6">
          <h2 className="mb-3 text-base font-bold text-slate-800">
            Como funciona
          </h2>
          {ComoFunciona}
        </div>

        <div className="mx-5 mb-8 rounded-2xl bg-brand-600 p-5 text-white">
          <p className="text-sm font-semibold">
            Encontrar fornecedor é fácil. Coordenar tudo é o problema.
          </p>
          <p className="mt-1 text-xs text-brand-100">
            O EventoFácil é o sistema operacional do seu evento: checklist,
            orçamento, fornecedores, pagamentos e convidados em um só lugar.
          </p>
        </div>
      </PublicShell>
    );
  }

  /* ---------------------------- SITE ----------------------------- */
  return (
    <PublicShell desktopFull>
      {/* Nav */}
      <header className="flex items-center justify-between border-b border-slate-100 px-10 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lift">
            <IconCalendar width={20} height={20} />
          </div>
          <span className="text-lg font-extrabold tracking-tight">
            Evento<span className="text-brand-600">Fácil</span>
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-semibold text-slate-500">
          <span className="cursor-default hover:text-slate-800">
            Como funciona
          </span>
          <span className="cursor-default hover:text-slate-800">
            Para fornecedores
          </span>
          <button
            onClick={() => navigate('/login')}
            className="hover:text-slate-800"
          >
            Entrar
          </button>
          <button
            onClick={() => navigate('/cadastro?perfil=Organizador')}
            className="ef-btn-primary"
          >
            Criar meu evento
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="grid grid-cols-2 items-center gap-10 bg-gradient-to-br from-brand-50 to-white px-10 py-14">
        <div>
          <Pill tone="coral">✨ Seu organizador de eventos</Pill>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900">
            Transforme uma ideia de festa em um{' '}
            <span className="text-brand-600">plano completo.</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
            {SLOGAN}
          </p>
          <div className="mt-7 max-w-md">{CTAs}</div>
          <p className="mt-4 text-xs text-slate-400">
            Para festas de 50 a 200 convidados · Sem assessoria profissional
          </p>
        </div>

        <HeroPreview />
      </section>

      {/* Como funciona */}
      <section className="px-10 py-14">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Como funciona
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Do primeiro clique até o dia do evento, em 4 passos.
          </p>
        </div>
        {ComoFunciona}
      </section>

      {/* Banner final */}
      <section className="mx-10 mb-14 flex items-center justify-between gap-8 rounded-3xl bg-brand-600 p-10 text-white">
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold">
            Encontrar fornecedor é fácil. Coordenar tudo é o problema.
          </h3>
          <p className="mt-2 text-sm text-brand-100">
            O EventoFácil é o sistema operacional do seu evento: checklist
            inteligente, orçamento, fornecedores, pagamentos intermediados e
            convidados — tudo em um só lugar.
          </p>
        </div>
        <button
          onClick={() => navigate('/cadastro?perfil=Organizador')}
          className="ef-btn-coral whitespace-nowrap"
        >
          Começar agora <IconArrowRight width={16} height={16} />
        </button>
      </section>
    </PublicShell>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="ef-card rotate-1 p-5">
        <p className="text-xs font-semibold text-slate-400">Painel do evento</p>
        <p className="text-lg font-bold text-slate-900">Aniversário da Ana</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-slate-50 p-2">
            <p className="text-[10px] text-slate-400">Data</p>
            <p className="text-sm font-bold text-slate-800">20/11</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-2">
            <p className="text-[10px] text-slate-400">Convidados</p>
            <p className="text-sm font-bold text-slate-800">80</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-2">
            <p className="text-[10px] text-slate-400">Orçamento</p>
            <p className="text-sm font-bold text-brand-600">R$ 8 mil</p>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {[
            ['🍽 Buffet Y', 'Confirmado', 'bg-emerald-500'],
            ['🎵 DJ Z', 'Aguardando', 'bg-amber-400'],
            ['🎈 Decoração', 'Procurando', 'bg-rose-500'],
          ].map(([n, s, c]) => (
            <div
              key={n}
              className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2"
            >
              <span className="text-sm font-medium text-slate-700">{n}</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <span className={`h-1.5 w-1.5 rounded-full ${c}`} />
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-5 -left-5 -rotate-3 rounded-2xl bg-coral-500 px-4 py-3 text-white shadow-lift">
        <p className="text-xs font-semibold">🔔 Alerta automático</p>
        <p className="text-[11px] text-orange-50">
          DJ precisa do cronograma até 10/11
        </p>
      </div>
    </div>
  );
}
