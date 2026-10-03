import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEventStore } from '../store/EventStore';
import { PublicShell } from '../components/PublicShell';
import { IconArrowLeft, IconCalendar, IconStore, IconUsers } from '../components/Icons';
import { useDevice } from '../store/DeviceStore';

export default function Auth({ modo }: { modo: 'login' | 'cadastro' }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useEventStore();
  const { mode } = useDevice();

  const perfilInicial =
    (params.get('perfil') as 'Organizador' | 'Fornecedor') || 'Organizador';
  const [perfil, setPerfil] = useState<'Organizador' | 'Fornecedor'>(
    perfilInicial,
  );
  const [email, setEmail] = useState(
    perfilInicial === 'Fornecedor' ? 'maria@email.com' : 'ana@email.com',
  );
  const [senha, setSenha] = useState('••••••••');

  const ehCadastro = modo === 'cadastro';

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    login(perfil, email);
    if (perfil === 'Fornecedor') navigate('/fornecedor-painel');
    else if (ehCadastro) navigate('/criar-evento');
    else navigate('/painel');
  }

  const conteudo = (
    <div className="mx-auto flex w-full max-w-sm flex-col">
      <button
        onClick={() => navigate('/')}
        className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-700"
      >
        <IconArrowLeft width={16} height={16} /> Voltar
      </button>

      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lift">
          <IconCalendar width={20} height={20} />
        </div>
        <span className="text-lg font-extrabold tracking-tight">
          Happ<span className="text-brand-600">it</span>
        </span>
      </div>

      <h1 className="text-2xl font-extrabold text-slate-900">
        {ehCadastro ? 'Criar sua conta' : 'Entrar'}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {ehCadastro
          ? 'Escolha como você quer usar a plataforma.'
          : 'Bem-vindo de volta ao Happit.'}
      </p>

      {/* Escolha de perfil */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <PerfilCard
          ativo={perfil === 'Organizador'}
          onClick={() => setPerfil('Organizador')}
          icon={<IconUsers width={20} height={20} />}
          titulo="Organizador"
          desc="Crio e administro meu evento"
        />
        <PerfilCard
          ativo={perfil === 'Fornecedor'}
          onClick={() => setPerfil('Fornecedor')}
          icon={<IconStore width={20} height={20} />}
          titulo="Fornecedor"
          desc="Ofereço produtos e serviços"
        />
      </div>

      <form onSubmit={enviar} className="mt-5 flex flex-col gap-4">
        {ehCadastro && (
          <div>
            <label className="ef-label">Nome completo</label>
            <input
              className="ef-input"
              defaultValue={perfil === 'Fornecedor' ? 'Maria Silva' : 'Ana Souza'}
            />
          </div>
        )}
        <div>
          <label className="ef-label">E-mail</label>
          <input
            type="email"
            className="ef-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="ef-label">Senha</label>
          <input
            type="password"
            className="ef-input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button type="submit" className="ef-btn-primary mt-1">
          {ehCadastro
            ? `Criar conta como ${perfil}`
            : `Entrar como ${perfil}`}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        {ehCadastro ? 'Já tem conta?' : 'Ainda não tem conta?'}{' '}
        <button
          onClick={() => navigate(ehCadastro ? '/login' : '/cadastro')}
          className="font-semibold text-brand-600 hover:underline"
        >
          {ehCadastro ? 'Entrar' : 'Criar agora'}
        </button>
      </p>
    </div>
  );

  if (mode === 'app') {
    return (
      <PublicShell>
        <div className="flex-1 px-5 py-8">{conteudo}</div>
      </PublicShell>
    );
  }

  return (
    <PublicShell desktopFull>
      <div className="flex h-full">
        <div className="flex flex-1 items-center justify-center px-10 py-10">
          {conteudo}
        </div>
        <div className="hidden w-1/2 flex-col justify-center bg-gradient-to-br from-brand-600 to-brand-800 px-12 text-white md:flex">
          <h2 className="text-3xl font-extrabold leading-tight">
            Nada é esquecido quando tudo está no mesmo lugar.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-brand-100">
            Checklist, orçamento, fornecedores, pagamentos e convidados — o
            Happit coordena cada detalhe do seu evento.
          </p>
          <div className="mt-8 space-y-3">
            {[
              'Plano gerado automaticamente',
              'Fornecedores da sua região',
              'Pagamentos intermediados com segurança',
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}

function PerfilCard({
  ativo,
  onClick,
  icon,
  titulo,
  desc,
}: {
  ativo: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  titulo: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border-2 p-3 text-left transition ${
        ativo
          ? 'border-brand-500 bg-brand-50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
          ativo ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        {icon}
      </span>
      <p className="mt-2 text-sm font-bold text-slate-800">{titulo}</p>
      <p className="text-[11px] leading-snug text-slate-500">{desc}</p>
    </button>
  );
}
