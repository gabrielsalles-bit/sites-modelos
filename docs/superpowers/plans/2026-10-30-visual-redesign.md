# Redesign Visual dos 3 Templates — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir a linguagem visual vibrante/"amadora" dos 3 templates de concessionária (`auto-dealership`, `luxury-dealership`, `popular-dealership`) por um visual monocromático e profissional inspirado na referência Touring Cars, preservando 100% das funcionalidades já existentes.

**Architecture:** Os 3 sites já usam um sistema de tokens de cor via CSS variables (`--slate-*`, `--ink`, `--surface-*`, tokens de acento por site), resolvidos no `tailwind.config.js` de cada site e trocados por um toggle de tema (`useTheme`). O redesign é majoritariamente uma troca de **valores** desses tokens (nova escala neutra + acento escuro/dessaturado por site) e de alguns componentes de UI compartilhados (`Button.jsx`), mais uma varredura por site removendo gradientes multicoloridos, brilhos (glow) e orbs decorativos que não passam pelos tokens. Nenhuma lógica de negócio é tocada.

**Tech Stack:** React 18 + Vite + Tailwind CSS 3 (monorepo npm workspaces), sem framework de testes configurado nos 3 sites — a verificação de cada task é: build de produção limpo + inspeção visual via navegador (dev server), comparando com as capturas de referência.

**Spec:** [docs/superpowers/specs/2026-10-30-visual-redesign-design.md](../specs/2026-10-30-visual-redesign-design.md) — imagens de referência em `docs/superpowers/specs/assets/touring-cars-reference/`.

## Global Constraints

- Preservar 100% das funcionalidades da Fase 2 (Favoritos, Comparador, Concierge, Calculadora de TCO, Consultor IA, Dossiê Oficial, Alerta de Preço) — nenhuma mudança de lógica/estrutura JSX além de classes de estilo.
- `sites/portal` fica fora do escopo — não tocar.
- Tema claro vira o padrão ao carregar nos 3 sites; o toggle para escuro continua disponível e funcional.
- Reaproveitar o sistema de tokens CSS existente (`:root` / `:root.light` em cada `index.css`, resolvido via `tailwind.config.js`) — não criar um novo mecanismo de tema.
- Build de produção (`npm run build` em cada workspace) precisa continuar limpo após cada task.
- Verificação de cada task: `npm run dev` no site afetado → abrir no navegador → conferir visualmente contra a imagem de referência correspondente em `docs/superpowers/specs/assets/touring-cars-reference/` → `npm run build` sem erros.
- Fonte: manter `Inter` (corpo) e `Outfit` (heading) nos 3 sites — já são sans-serif geométricas/bold compatíveis com a referência, não há necessidade de trocar e isso reduz risco/escopo. Nenhuma task deste plano mexe em `fontFamily`.
- Ordem de execução: `auto-dealership` primeiro (sites mais simples, sem tokens de superfície dedicados), depois `luxury-dealership`, depois `popular-dealership` — replicando a mesma fórmula já validada no primeiro site, no mesmo espírito de "construir uma vez, portar" usado na Fase 2.

### Tabela de paleta — escala neutra (compartilhada pelos 3 sites)

Mesma escala e mesmos nomes de variável (`--slate-*`, `--ink`) nos 3 sites. Valores em `R G B` (formato já usado nos arquivos, consumido como `rgb(var(--token) / <alpha-value>)`).

**Atenção — convenção já existente nos 3 arquivos (confirmada no código original, não é escolha nova deste plano):** `--ink`, `--surface-*` e os tokens de acento são mapeados **direto** por tema (claro recebe o valor claro, escuro recebe o valor escuro). A rampa genérica `--slate-50..950`, porém, já era **invertida** entre os blocos no código original — `:root` (escuro) usa a rampa padrão (50=quase-branco → 950=quase-preto, valores Tailwind padrão), e `:root.light` usa a MESMA rampa com os papéis invertidos (50=quase-preto → 950=quase-branco) — porque os componentes já usam `slate-950` como "fundo de página" (claro no tema claro, escuro no tema escuro) e `slate-50` como tom de alto contraste pontual. Esta tabela já reflete essa inversão; não reordenar.

| Token | `:root` (escuro, toggle) | `:root.light` (claro, padrão) |
|---|---|---|
| `--ink` | `245 245 244` | `23 23 22` |
| `--slate-50` | `250 250 249` | `24 24 23` |
| `--slate-100` | `243 242 240` | `32 32 30` |
| `--slate-200` | `229 227 224` | `48 47 45` |
| `--slate-300` | `205 202 197` | `72 70 67` |
| `--slate-400` | `158 154 148` | `110 107 103` |
| `--slate-500` | `120 116 111` | `142 139 134` |
| `--slate-600` | `87 84 80` | `173 170 164` |
| `--slate-700` | `62 60 57` | `198 195 189` |
| `--slate-800` | `42 41 39` | `222 220 215` |
| `--slate-900` | `26 25 24` | `237 236 233` |
| `--slate-950` | `16 16 15` | `250 250 249` |

(Achado durante a execução da Task 1: a primeira versão desta tabela tinha as colunas da rampa `--slate-*` trocadas — `ink`/`surface-*`/acento continuam mapeados direto, só a rampa `slate-*` precisa da inversão. Corrigido aqui e já aplicado em `auto-dealership`.)

Tokens de superfície (`luxury-dealership` e `popular-dealership` têm `--surface-*`; `auto-dealership` usa `--slate-950` diretamente como fundo de página via `bg-slate-950` no `body` — manter essa convenção, só atualizar o valor, não introduzir `--surface-page` nele):

| Token | Claro (padrão) | Escuro (toggle) |
|---|---|---|
| `--surface-page` | `255 255 255` | `13 13 12` |
| `--surface-card` | `247 246 244` | `20 20 19` |
| `--surface-card-alt` | `244 243 240` | `24 24 23` |
| `--surface-band` | `243 241 237` | `17 17 16` |
| `--surface-modal` | `255 255 255` | `18 18 17` |
| `--surface-footer` | `23 23 22` | `8 8 7` |

`--surface-footer` fica propositalmente escuro nos dois temas (igual à referência, que mantém o rodapé sempre escuro independente do resto da página).

**Achado durante a execução da Task 2 (`auto-dealership`):** como `--surface-footer` é fixo escuro mas os tokens `--slate-*`/`--ink` usados dentro do rodapé invertem com o tema, o texto do rodapé ficava ilegível no tema claro. Correção: o elemento `<footer>` recebe a classe `theme-pinned-dark`, que repiná `--slate-*`/`--ink`/acento para os valores escuros independente do `.light` no `<html>` — mesmo padrão que `luxury-dealership` já tinha para o conteúdo sobre foto/vídeo do Hero. `auto-dealership` já ganhou essa classe (ver `src/index.css`); `luxury-dealership` só precisa atualizar os valores da classe que já existe (Task 4); `popular-dealership` precisa da classe criada do zero (Task 7), igual ao que foi feito em `auto-dealership`.

### Tabela de paleta — acento escuro por site

Acento usado só em detalhes pontuais (CTA primário via fórmula abaixo, ícones, link ativo, badges) — nunca como cor de fundo dominante de seção.

**`auto-dealership` (`--blue-*`):**

| Token | Claro | Escuro |
|---|---|---|
| `--blue-300` | `71 92 122` | `148 171 201` |
| `--blue-400` | `51 73 102` | `109 136 170` |
| `--blue-500` | `38 58 84` | `82 110 148` |
| `--blue-600` | `28 44 66` | `60 85 117` |
| `--blue-950` | `219 226 235` | `26 35 48` |

**`luxury-dealership` (`--amber-*`):**

| Token | Claro | Escuro |
|---|---|---|
| `--amber-200` | `214 196 168` | `224 208 183` |
| `--amber-300` | `176 148 108` | `196 170 132` |
| `--amber-400` | `141 110 71` | `168 136 94` |
| `--amber-500` | `110 83 50` | `140 108 68` |
| `--amber-600` | `84 61 35` | `110 83 50` |

**`popular-dealership` (`--cyan-*` e `--violet-*`):**

| Token | Claro | Escuro |
|---|---|---|
| `--cyan-300` | `90 140 145` | `140 180 184` |
| `--cyan-400` | `61 107 112` | `103 148 152` |
| `--cyan-500` | `45 84 89` | `77 119 123` |
| `--cyan-600` | `33 64 68` | `58 92 96` |
| `--cyan-950` | `222 232 233` | `20 32 33` |
| `--violet-300` | `140 130 165` | `180 172 204` |
| `--violet-500` | `95 83 130` | `130 118 163` |
| `--violet-950` | `230 227 238` | `28 25 38` |

`--emerald-*` (usado só para o botão/badge "WhatsApp", cor semântica reconhecível, não é "a cor da marca") **não muda** — mantém os valores atuais nos 3 sites.

### Fórmula do botão primário (pílula preta/branca invertida por tema)

Em vez de gradiente multicolorido + sombra colorida, o CTA primário vira uma pílula sólida que inverte com o tema (preta com texto claro no modo claro; clara com texto escuro no modo escuro — sempre com contraste alto contra o fundo da página):

```
bg-ink text-{page-bg-token} hover:opacity-90 border border-ink/10 shadow-sm
```

onde `{page-bg-token}` é `slate-950` em `auto-dealership` (não tem token de página dedicado) e `surface-page` em `luxury-dealership`/`popular-dealership`. `rounded-xl` vira `rounded-full` em todos os botões (`baseStyles`).

### Regra de varredura (gradientes, glow, orbs)

Ao rodar `grep -rn "gradient-to\|blur-\[\|shadow-\(blue\|amber\|cyan\|emerald\|violet\|indigo\|purple\|teal\)-[0-9]\+\/" src` em cada site:

- **Gradiente multicor de UI** (botão, badge, fundo de seção, borda) → cor sólida de token (ink, ou o acento do site). **Gradiente de foto→transparente** para legibilidade de texto sobre imagem (ex. overlay escuro no hero) **pode ficar** — não é o problema.
- **Orb decorativo colorido com blur grande** (`blur-[Npx]` num círculo absoluto) → remover o elemento. A referência não usa esse recurso.
- **Sombra colorida** (`shadow-blue-600/25` etc.) → `shadow-sm` ou remover.

Além desse grep, cada task de varredura roda um segundo grep para pegar cor
Tailwind fora da paleta do site (não listada no `tailwind.config.js` desse
site — ex. `orange`, `red`, `pink`, `yellow`, `lime`, `rose`, `fuchsia`,
`sky`, `teal`, `green`, usados como texto/fundo/borda, não só em gradiente):

```
grep -rn "\-\(red\|orange\|yellow\|lime\|pink\|rose\|fuchsia\|purple\|indigo\|sky\|teal\|green\|gray\|zinc\|neutral\|stone\)-[0-9]" src
```

Qualquer ocorrência vira cor sólida de token (ink ou o acento do site), igual à regra de gradiente.

## Review Focus

- Classe de cor que não passa pelo sistema de tokens (hex literal ou cor Tailwind não mapeada no `tailwind.config.js`, ex. `text-orange-500`, `from-purple-600`) sobrevive à troca de valores e continua "amadora" mesmo depois do redesign — a varredura por grep de cada site precisa cobrir isso, não só os padrões já listados.
- Contraste no modo escuro: como o CTA e o rodapé usam fórmulas invertidas/fixas, confirmar que texto continua legível nos dois temas, não só no claro (que é o que mais se olha por ser o padrão novo).
- As 4 funcionalidades da Fase 2 que só existem em `auto-dealership`/`luxury-dealership` (Calculadora de TCO, Consultor IA, Dossiê Oficial, Alerta de Preço) continuam funcionando (cálculo, resposta do chat, geração do link do WhatsApp) depois da troca de classes — é um risco real porque essas edições mexem no mesmo JSX que tem a lógica.
- Build de produção: a nova paleta precisa sobreviver ao purge do Tailwind (classes usadas de fato no JSX, não só definidas em variável) e ao `base` path do GitHub Pages — conferir `npm run build` em cada site, não só o dev server.
- Paridade entre os 3 sites: como `auto-dealership` é feito primeiro e os outros dois replicam o padrão, conferir ao final que pílula de botão, badge, card e rodapé ficam visualmente consistentes nos 3 (mesmo raio, mesma espessura de borda, mesma fórmula de inversão de cor), não só que cada um individualmente "ficou menos vibrante".

---

## Task 1: `auto-dealership` — paleta e tema padrão

**Files:**
- Modify: `sites/auto-dealership/src/index.css`
- Modify: `sites/auto-dealership/src/hooks/useTheme.js:12`
- Modify: `sites/auto-dealership/tailwind.config.js` (remover `boxShadow.glow-blue` e `boxShadow.glow-emerald`, não usados em nenhum componente)

**Interfaces:**
- Produces: tokens `--ink`, `--slate-50..950`, `--surface-footer`, `--blue-300..600`, `--blue-950` com os novos valores (tabelas acima) nos blocos `:root` (escuro) e `:root.light` (claro); `getInitialTheme()` retornando `'light'` como padrão quando não há tema salvo no `localStorage`.

- [ ] **Step 1: Atualizar os valores em `:root` (bloco escuro) de `sites/auto-dealership/src/index.css`** com os valores da coluna "Escuro" das tabelas de paleta (neutra + acento azul) acima. Manter a estrutura do arquivo (comentários, ordem), só trocar os números.
- [ ] **Step 2: Atualizar os valores em `:root.light` do mesmo arquivo** com os valores da coluna "Claro".
- [ ] **Step 3: Adicionar `--surface-footer: 23 23 22;` em `:root` e `--surface-footer: 8 8 7;` em `:root.light`** (hoje o arquivo já tem essa variável — só trocar os valores pelos da tabela de superfície).
- [ ] **Step 4: Em `sites/auto-dealership/src/hooks/useTheme.js:12`, trocar `return 'dark';` por `return 'light';`.**
- [ ] **Step 5: Em `sites/auto-dealership/tailwind.config.js`, remover as duas entradas `glow-blue` e `glow-emerald` do bloco `boxShadow`** (confirmado sem uso em `src/` nesta sessão de planejamento — se um `grep -rn "glow-blue\|glow-emerald" src` mostrar algum uso inesperado, ajustar esse uso para `shadow-sm` em vez de remover a entrada).
- [ ] **Step 6: Rodar `npm run dev` em `sites/auto-dealership` (porta 5174), abrir no navegador, confirmar que a página carrega em tema claro com fundo branco/cinza claro e texto quase-preto** (sem alternar o toggle ainda).
- [ ] **Step 7: Rodar `npm run build` em `sites/auto-dealership` e confirmar que termina sem erro.**
- [ ] **Step 8: Commit**

```bash
git add sites/auto-dealership/src/index.css sites/auto-dealership/src/hooks/useTheme.js sites/auto-dealership/tailwind.config.js
git commit -m "feat(auto): nova paleta monocromatica e tema claro como padrao"
```

---

## Task 2: `auto-dealership` — botão primário e varredura de gradiente/glow/orb

**Files:**
- Modify: `sites/auto-dealership/src/components/ui/Button.jsx`
- Modify: arquivos encontrados pela varredura (grep no Step 3 abaixo)

**Interfaces:**
- Consumes: tokens de Task 1 (`--ink`, `--slate-*`, `--blue-*`).
- Produces: `Button` com `baseStyles` usando `rounded-full` em vez de `rounded-xl`; variante `primary` seguindo a fórmula do botão primário (ver Global Constraints), demais variantes (`secondary`, `outline`, `ghost`) usando tokens neutros com borda fina; variante `whatsapp` inalterada.

- [ ] **Step 1: Em `sites/auto-dealership/src/components/ui/Button.jsx`, trocar `rounded-xl` por `rounded-full` em `baseStyles` (linha 16).**
- [ ] **Step 2: Substituir o objeto `variants` (linhas 24-30) por:**

```js
const variants = {
  primary: 'bg-ink text-slate-950 hover:opacity-90 border border-ink/10 shadow-sm',
  whatsapp: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 border border-emerald-400/30 hover:shadow-emerald-500/40',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-ink border border-slate-200',
  outline: 'bg-transparent hover:bg-slate-100 text-ink border border-slate-300',
  ghost: 'text-slate-500 hover:text-ink hover:bg-slate-100'
};
```

- [ ] **Step 3: Rodar os dois greps da seção "Regra de varredura" das Global Constraints em `sites/auto-dealership/src`** (o de gradiente/blur/sombra e o de cor fora da paleta) e listar os arquivos (excluindo `Button.jsx`, já tratado).
- [ ] **Step 4: Para cada arquivo listado, aplicar a regra de varredura das Global Constraints** (gradiente de UI → cor sólida de token; gradiente foto→transparente → manter; orb decorativo com blur → remover; sombra colorida → `shadow-sm` ou remover; cor fora da paleta → cor sólida de token). Não alterar nenhuma lógica JS/JSX, só classes de estilo.
- [ ] **Step 5: Rodar os dois greps do Step 3 de novo e confirmar que só restam (se houver) gradientes de foto→transparente, nenhum gradiente multicor de UI, nenhuma sombra colorida e nenhuma cor fora da paleta do site.**
- [ ] **Step 6: Rodar `npm run dev`, navegar pela Home, Estoque, um modal de detalhe de veículo (confirmar que os 4 recursos da Fase 2 — TCO, Dossiê, Alerta de Preço, e a página Consultor IA — ainda abrem e funcionam) e o rodapé; comparar visualmente com `docs/superpowers/specs/assets/touring-cars-reference/home.png` e `estoque.png`.**
- [ ] **Step 7: Rodar `npm run build` em `sites/auto-dealership` e confirmar que termina sem erro.**
- [ ] **Step 8: Commit**

```bash
git add sites/auto-dealership/src
git commit -m "feat(auto): botao em pilula e remocao de gradientes/glow vibrantes"
```

---

## Task 3: `auto-dealership` — verificação final (claro + escuro)

**Files:** nenhum (task só de verificação).

- [ ] **Step 1: No navegador, com o dev server de `auto-dealership` rodando, usar o toggle de tema para alternar para escuro.**
- [ ] **Step 2: Conferir que o texto permanece legível (contraste alto) em todas as seções visitadas no Task 2 — Home, Estoque, modal de detalhe, rodapé — no tema escuro.**
- [ ] **Step 3: Alternar de volta para claro e confirmar que o toggle persiste a escolha ao recarregar a página (comportamento já existente do `useTheme`, não deve ter sido quebrado).**
- [ ] **Step 4: Abrir o modal de Dossiê Oficial e o de Alerta de Preço uma vez em cada tema, confirmar que os dois continuam exibindo os dados do veículo corretamente (checagem de que a Review Focus "funcionalidades da Fase 2" não quebrou).**

Nenhum commit nesta task (é só verificação; se algo falhar, corrigir no Task 1 ou 2 e recommitar lá).

---

## Task 4: `luxury-dealership` — paleta e tema padrão

**Files:**
- Modify: `sites/luxury-dealership/src/index.css`
- Modify: `sites/luxury-dealership/src/hooks/useTheme.js:12`

**Interfaces:**
- Produces: mesmos tokens do Task 1, mais `--surface-page/card/band/card-alt/modal/footer` e `--amber-200..600` com os valores das tabelas de paleta (neutra + superfície + acento âmbar) acima.

- [ ] **Step 1: Atualizar os valores em `:root` (bloco escuro) de `sites/luxury-dealership/src/index.css`** com a coluna "Escuro" das tabelas neutra, superfície e acento âmbar.
- [ ] **Step 2: Atualizar os valores em `:root.light` do mesmo arquivo** com a coluna "Claro" das mesmas tabelas.
- [ ] **Step 3: Repetir os Steps 1-2 também no bloco `.theme-pinned-dark`** (usado para conteúdo sobreposto a foto/vídeo no Hero, e para o rodapé — ver nota em "Tabela de paleta — escala neutra") **usando os valores da coluna "`:root` (escuro, toggle)"** — esse bloco deve continuar sempre escuro independente do tema ativo, só os números mudam para bater com a nova paleta escura. Conferir se o `<footer>` do site já tem a classe `theme-pinned-dark` aplicada; se não tiver, adicionar (igual ao que foi feito em `auto-dealership`).
- [ ] **Step 4: Em `sites/luxury-dealership/src/hooks/useTheme.js:12`, trocar `return 'dark';` por `return 'light';`.**
- [ ] **Step 5: Rodar `npm run dev` em `sites/luxury-dealership` (porta 5175), abrir no navegador, confirmar tema claro por padrão.**
- [ ] **Step 6: Rodar `npm run build` em `sites/luxury-dealership` e confirmar que termina sem erro.**
- [ ] **Step 7: Commit**

```bash
git add sites/luxury-dealership/src/index.css sites/luxury-dealership/src/hooks/useTheme.js
git commit -m "feat(luxury): nova paleta monocromatica e tema claro como padrao"
```

---

## Task 5: `luxury-dealership` — botão primário e varredura de gradiente/glow/orb

**Files:**
- Modify: `sites/luxury-dealership/src/components/ui/Button.jsx`
- Modify: arquivos encontrados pela varredura (grep no Step 3 abaixo)

**Interfaces:**
- Consumes: tokens de Task 4.
- Produces: `Button` com `rounded-full`; variante `gold` (padrão do site) seguindo a fórmula do botão primário; `outline`/`dark` com tokens neutros; `whatsapp` inalterado.

- [ ] **Step 1: Em `sites/luxury-dealership/src/components/ui/Button.jsx`, trocar `rounded-xl` por `rounded-full` em `baseStyles` (linha 18).**
- [ ] **Step 2: Substituir o objeto `variants` (linhas 20-25) por:**

```js
const variants = {
  gold: 'bg-ink text-surface-page hover:opacity-90 border border-ink/10 shadow-sm',
  outline: 'bg-transparent hover:bg-ink/5 text-ink border border-ink/15',
  dark: 'bg-surface-card-alt hover:bg-ink/5 text-slate-300 hover:text-ink border border-ink/10',
  whatsapp: 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/30 border border-emerald-400/30 font-bold'
};
```

- [ ] **Step 3: Rodar os dois greps da seção "Regra de varredura" das Global Constraints em `sites/luxury-dealership/src`** (excluindo `Button.jsx` e a linha do `whatsapp` acima, que ficam como estão) e listar os arquivos.
- [ ] **Step 4: Para cada arquivo listado, aplicar a regra de varredura das Global Constraints.**
- [ ] **Step 5: Repetir os dois greps do Step 3 e confirmar que só restam gradientes de foto→transparente e a linha `whatsapp` do `Button.jsx`.**
- [ ] **Step 6: Rodar `npm run dev`, navegar pela Home, Estoque, modal de detalhe (confirmar TCO, Dossiê, Alerta de Preço, Consultor IA ainda funcionam) e rodapé; comparar com as imagens de referência.**
- [ ] **Step 7: Rodar `npm run build` em `sites/luxury-dealership` e confirmar que termina sem erro.**
- [ ] **Step 8: Commit**

```bash
git add sites/luxury-dealership/src
git commit -m "feat(luxury): botao em pilula e remocao de gradientes/glow vibrantes"
```

---

## Task 6: `luxury-dealership` — verificação final (claro + escuro)

Mesmos steps do Task 3, aplicados a `luxury-dealership`. Nenhum commit (task só de verificação).

- [ ] **Step 1-4: repetir os 4 steps do Task 3 no site `luxury-dealership`.**

---

## Task 7: `popular-dealership` — paleta e tema padrão

**Files:**
- Modify: `sites/popular-dealership/src/index.css`
- Modify: `sites/popular-dealership/src/hooks/useTheme.js:12`

**Interfaces:**
- Produces: mesmos tokens neutros/superfície do Task 4, mais `--cyan-300..600`, `--cyan-950`, `--violet-300`, `--violet-500`, `--violet-950` com os valores das tabelas acima.

- [ ] **Step 1: Atualizar os valores em `:root` (bloco escuro) de `sites/popular-dealership/src/index.css`** com a coluna "Escuro" das tabelas neutra, superfície e acento ciano/violeta.
- [ ] **Step 2: Atualizar os valores em `:root.light` do mesmo arquivo** com a coluna "Claro" das mesmas tabelas.
- [ ] **Step 3: Adicionar a classe `.theme-pinned-dark` em `sites/popular-dealership/src/index.css`** (não existe ainda nesse site — criar do zero, copiando a estrutura de `auto-dealership/src/index.css`, com os tokens `--slate-*`/`--ink`/`--cyan-*`/`--violet-*` usando os valores da coluna "`:root` (escuro, toggle)") **e aplicar a classe no elemento `<footer>`** de `sites/popular-dealership/src/components/layout/Footer.jsx` (mesmo motivo do achado na Task 2 de `auto-dealership`: `--surface-footer` fixo escuro, mas `--slate-*`/`--ink` sem pin ficam ilegíveis no tema claro).
- [ ] **Step 4: Em `sites/popular-dealership/src/hooks/useTheme.js:12`, trocar `return 'dark';` por `return 'light';`.**
- [ ] **Step 5: Rodar `npm run build` em `sites/popular-dealership` e confirmar que termina sem erro.**
- [ ] **Step 6: Commit**

```bash
git add sites/popular-dealership/src/index.css sites/popular-dealership/src/hooks/useTheme.js
git commit -m "feat(popular): nova paleta monocromatica e tema claro como padrao"
```

---

## Task 8: `popular-dealership` — botão primário e varredura de gradiente/glow/orb

**Files:**
- Modify: `sites/popular-dealership/src/components/ui/Button.jsx`
- Modify: arquivos encontrados pela varredura (grep no Step 3 abaixo)

**Interfaces:**
- Consumes: tokens de Task 7.
- Produces: `Button` com `rounded-full`; variante `primary` (padrão do site) seguindo a fórmula do botão primário; `ai` vira cor sólida ciano (em vez do gradiente violeta/índigo/roxo); `outline`/`dark` com tokens neutros; `whatsapp` inalterado.

- [ ] **Step 1: Em `sites/popular-dealership/src/components/ui/Button.jsx`, trocar `rounded-xl` por `rounded-full` em `baseStyles` (linha 18).**
- [ ] **Step 2: Substituir o objeto `variants` (linhas 20-26) por:**

```js
const variants = {
  primary: 'bg-ink text-surface-page hover:opacity-90 border border-ink/10 shadow-sm',
  outline: 'bg-transparent hover:bg-ink/5 text-ink border border-ink/15',
  dark: 'bg-slate-100 hover:bg-ink/5 text-slate-600 hover:text-ink border border-slate-200',
  whatsapp: 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/30 border border-emerald-400/30 font-bold',
  ai: 'bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400/30'
};
```

- [ ] **Step 3: Rodar os dois greps da seção "Regra de varredura" das Global Constraints em `sites/popular-dealership/src`** (excluindo `Button.jsx` e a linha do `whatsapp` acima) e listar os arquivos.
- [ ] **Step 4: Para cada arquivo listado, aplicar a regra de varredura das Global Constraints.**
- [ ] **Step 5: Repetir os dois greps do Step 3 e confirmar que só restam gradientes de foto→transparente e a linha `whatsapp` do `Button.jsx`.**
- [ ] **Step 6: Rodar `npm run dev`, navegar pela Home, Estoque, página do Consultor IA (confirmar que o chat ainda responde) e rodapé; comparar com as imagens de referência.**
- [ ] **Step 7: Rodar `npm run build` em `sites/popular-dealership` e confirmar que termina sem erro.**
- [ ] **Step 8: Commit**

```bash
git add sites/popular-dealership/src
git commit -m "feat(popular): botao em pilula e remocao de gradientes/glow vibrantes"
```

---

## Task 9: `popular-dealership` — verificação final (claro + escuro)

Mesmos steps do Task 3, aplicados a `popular-dealership` (sem Dossiê Oficial/Alerta de Preço/TCO, que não existem nesse site — conferir Favoritos, Comparador, Concierge e Consultor IA, que são as funcionalidades deste site). Nenhum commit (task só de verificação).

- [ ] **Step 1-3: repetir os steps 1-3 do Task 3 no site `popular-dealership`.**
- [ ] **Step 4: Abrir o Consultor IA e fazer uma pergunta rápida em cada tema, confirmar que o chat responde normalmente.**

---

## Task 10: Paridade entre os 3 sites e build geral

**Files:** nenhum (task só de verificação).

- [ ] **Step 1: Com os 3 dev servers rodando (portas 5174/5175/5176), abrir a Home dos 3 lado a lado (ou em abas) e conferir que o botão primário, os cards de veículo e o rodapé seguem o mesmo raio de borda, mesma espessura de borda e mesma fórmula de pílula invertida nos 3 — só o matiz do acento muda.**
- [ ] **Step 2: Rodar `npm run build` na raiz do monorepo (`node scripts/build-all.mjs`) e confirmar que os 3 sites compilam juntos sem erro.**
- [ ] **Step 3: Commit final (se Step 1 revelar algum ajuste pontual de paridade, aplicar e commitar antes deste step; caso contrário, nenhum commit necessário aqui).**
