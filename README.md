# EventoFácil — Protótipo interativo

> **Você organiza o evento. Nós cuidamos para que nada seja esquecido.**

Protótipo navegável de uma plataforma de organização de eventos, com **versão APP (mobile)** e **versão SITE (desktop responsivo)**. As duas versões compartilham exatamente as mesmas funcionalidades, fluxo e componentes — alterne entre elas pelo botão **App / Site** no topo da tela.

Todo o conteúdo está em **português do Brasil** (datas em dd/mm, valores em R$). Usa apenas **dados fictícios**, sem backend real.

## Como rodar

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

Outros comandos:

```bash
npm run build    # build de produção (type-check + Vite)
npm run preview  # serve o build
npm run lint     # linter
```

## Alternar APP x SITE

O seletor **App / Site** fica fixo no topo. O mesmo código de tela é renderizado dentro de:

- **App** → moldura de celular com **barra de navegação inferior** (Início, Evento, Fornecedores, Carteira, Convidados).
- **Site** → janela de navegador com **menu lateral** e layout em colunas/cards.

## Fluxo navegável (prioridade 1)

1. **Home** (`/`) — proposta de valor, slogan, "como funciona" em 4 passos. Landing no site, boas-vindas no app.
2. **Cadastro / Login** (`/cadastro`, `/login`) — e-mail + senha, com escolha de perfil (Organizador ou Fornecedor).
3. **Criar evento** (`/criar-evento`) — passo a passo (tipo, data/local, convidados, orçamento, tema/necessidades).
4. **Plano do evento** (`/plano`) — checklist inteligente + divisão sugerida do orçamento, ajustável.
5. **Painel do evento** (`/painel`) — resumo, fornecedores com status e % pago, alertas de dependências, próximos prazos.
6. **Fornecedores recomendados** (`/fornecedores`) — "8 fornecedores na sua região", filtros e 3 propostas comparáveis com a **"Melhor combinação"**.
7. **Perfil do fornecedor** (`/fornecedor`) — reputação da Maria (nota, eventos, % no prazo, recorrentes), avaliações, "Solicitar proposta".
8. **Carteira** (`/carteira`) — orçamento/contratado/pago/restante, pagamento por fornecedor, "Pagar", intermediação segura.
9. **Convidados** (`/convidados`) — lista com status, restrições consolidadas (enviadas ao buffet), compartilhar convite.
10. **Convite público** (`/convite`) — tela do convidado, sem login: Sim / Não / Talvez + restrição alimentar.

### Telas extras (prioridade 2)

- **Painel do fornecedor** (`/fornecedor-painel`) — pedidos, agenda, pagamentos a receber, reputação.
- **Avaliação pós-evento** (`/avaliacao`) — organizador avalia o fornecedor (estrelas, pontualidade, comentário).

## Interações prototipadas

- Avançar pelo passo a passo de **criar evento** (5 passos, com progresso).
- **Contratar** uma proposta de decoração → valor refletido automaticamente na **Carteira**.
- **Pagar** o restante de um fornecedor → barra de progresso e totais atualizam.
- Mudar o **status do convite** (Sim/Não/Talvez) na lista de convidados e na tela pública.
- Abrir o **perfil do fornecedor** e solicitar proposta.
- Ajustar a divisão do **orçamento** por categoria no plano.

O estado é compartilhado (React Context), então as mudanças refletem entre as telas durante a navegação. Recarregar a página volta aos dados de exemplo.

## Estilo visual

- Base branco / cinza muito claro, bastante espaço em branco, tipografia **Inter**.
- Cor primária **violeta/índigo** (botões e destaques); acento secundário **coral**.
- Cores de status: **verde** (confirmado/pago), **amarelo** (aguardando/pendente), **vermelho** (procurando/atrasado).
- Cantos arredondados, sombras suaves, ícones de linha, emojis só em títulos de categoria.

## Stack

- React + TypeScript + Vite
- React Router (navegação entre telas)
- Tailwind CSS (design system / componentes reutilizáveis)

## Componentes reutilizáveis

Idênticos no app e no site (em `src/components/ui.tsx`): `StatusBadge`, `ConviteBadge`, `PaymentProgress`, `StarRating`, `StatCard`, `Pill`, `Toast`. Os dados fictícios ficam em `src/data/mock.ts` e o estado em `src/store/`.

> Dados, nomes e valores são fictícios e servem apenas para demonstração.
