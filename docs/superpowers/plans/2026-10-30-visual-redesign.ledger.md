# Ledger — plano: docs/superpowers/plans/2026-10-30-visual-redesign.md

Execução inline, sem worktree isolado (branch main, padrão já usado nas
Fases 2 deste projeto) e sem skill de TDD (repo não tem framework de teste;
verificação = build + checagem visual no navegador, conforme o próprio
plano define).

Pre-flight: tasks compartilham a mesma fórmula (paleta → botão → varredura
→ verificação) replicada em 3 sites independentes; nenhuma task consome
output de outra entre sites diferentes. `auto-dealership` é a referência
(Tasks 1-3), replicado em `luxury-dealership` (4-6) e `popular-dealership`
(7-9); Task 10 é checagem de paridade entre os 3.

Ruling (setup): sem worktree — branch main — motivo: convenção já
estabelecida e aprovada pelo usuário nas Fases 2 — custo se errado: reverter
commits de main em vez de descartar branch.

Ruling (setup): sem skill de TDD — motivo: repo sem framework de teste,
plano já adapta a verificação para build+visual — custo se errado: bug
visual só aparece em checagem manual, não em CI automática.

Task 1: complete (commit b82eaee, build: npm run build → ok, visual: tema
claro carregando por padrão confirmado no navegador, hero ainda vibrante —
esperado, tratado na Task 2)

Task 1: Ruling: rampa --slate-50..950 tinha claro/escuro trocados (bug
achado na checagem visual — hero renderizou escuro mesmo em "tema claro")
— corrigido (commit 1a1f0b4) e tabela do plano atualizada para Tasks 4/7
não repetirem — custo se não corrigido: os 3 sites careriam sempre no
tema escuro de fato, mesmo com useTheme apontando 'light'.

Task 2: Ruling: a regra de "cor fora da paleta → token" não cobria o caso
de cores semânticas reconhecíveis fora do site (coração vermelho/rose do
botão de favorito, igual ao verde do WhatsApp já previsto no plano) — mantive
`rose-500`/`rose-400` no toggle de favorito (só removendo sombra colorida),
mesma categoria de exceção do WhatsApp/emerald. Custo se errado: um ponto de
cor fora da paleta monocromática, mas é um padrão de UX amplamente
reconhecido (coração vermelho = favoritado), não uma cor "vibrante de marca".

Task 2: Ruling: ao trocar `bg-slate-900/70`/`border-slate-800` por engano
em VehicleCard.jsx eu quase mudei o NÚMERO do token (achando que "card claro
precisa de número baixo"), o que quebraria a convenção já existente de que a
rampa slate inverte entre temas (ver Task 1 ruling). Corrigido antes de
commitar. Regra para o resto da varredura: nunca trocar o número do shade
slate/acento já usado em um componente — só remover gradiente/blur/sombra
colorida, mantendo o token original.

Task 2: Ruling: ao escrever classes NOVAS (Button.jsx variants, bg do
Hero, badge, painel do FeaturedSection) reincidi no mesmo erro de direção
do Task 1 — usei slate-50/100/200/300 pensando "número baixo = claro",
quando na verdade só os tokens slate-900/950 (e border-slate-700/800)
produzem "claro no tema claro, escuro no tema escuro" nesta convenção.
Corrigido via checagem visual (hero ficou ilegível) + reescrita de todas
as classes novas usando 900/950 para fundo e 700/800 para borda. Regra
fixada para Tasks 5 e 8: para qualquer `bg-slate-*`/`border-slate-*` NOVO
(não herdado do código original), usar sempre 900 (fundo levemente
elevado) ou 950 (igual ao fundo da página), nunca 50-300; ink continua
sendo o valor direto para texto de alto contraste.

Task 2: complete (commit c233614, build: npm run build → ok, visual:
conferido claro/escuro no navegador, rodapé legível nos dois temas,
modal de Alerta de Preço testado e funcional)

Task 5 (em andamento): Ruling: achei 2 glows radiais decorativos em
`HeroVideoScrub.jsx` (`bg-[radial-gradient(...)] from-amber-500/15...`)
que o grep de "gradient-to" não pega (sintaxe `radial-gradient` diferente)
— mesma categoria do orb com blur já previsto na regra, removidos também.
Vale para a varredura em popular-dealership (Task 8): procurar também por
`radial-gradient` como padrão de orb/glow decorativo, não só `blur-[`.

Task 10: complete (build-all via `npm run build` na raiz — portal + 3
sites compilam juntos sem erro; paridade visual entre os 3 sites
confirmada cumulativamente nas Tasks 3/6/9 — mesma fórmula de pílula,
mesmo raio/borda, mesmo padrão de rodapé sempre escuro)

Final review: fresh subagent (code-level review of the 8-commit diff,
no dev server) found 2 concrete findings, both verified and fixed:

Final: fixed "Clique para ver ficha completa" pill in
sites/auto-dealership/src/components/home/FeaturedSection.jsx inheriting
--ink (near-black in light theme) over a direct-mapped bg-blue-600/90 pill
(doesn't invert with theme) — illegible by default. Added explicit
text-white. Verified visually RED (illegible) → GREEN (legible) on the
Destaques page, commit a0ff329.

Final: fixed sites/popular-dealership HeroSection.jsx and
FinancingSimulator.jsx mixing cyan+emerald in one text gradient — the
only spot in the whole redesign combining two accents, breaking the
single-accent-per-site rule. Unified to cyan-only. Verified visually,
commit a0ff329.

Both fixes rebuilt (npm run build, each site) and the root build-all
(`npm run build`) passes with all 4 packages (portal + 3 sites) together.
No further findings; final review is clean.

Task 9: complete (commit f1826b1 — achado durante a verificação: badge/
ícone de "Perfil Customizado" na página Consultor IA ainda estava violeta,
corrigido para ciano — claro/escuro conferidos, chat da IA testado com
pergunta real e respondeu corretamente com recomendações de veículos)

Task 8: complete (commit 143a62f, build: npm run build → ok, visual:
claro/escuro conferidos, rodapé legível nos dois temas; achado sem ação —
`<html class="dark">` estático em index.html é vestigial de antes do
sistema de tokens, não afeta nada hoje, fora de escopo deste plano)

Task 8: Ruling: `popular-dealership` tinha DOIS acentos para "IA" (violeta
no banner da Home + no header da página Consultor IA, ciano no resto) —
desde que simplifiquei a variante `ai` do Button para ciano sólido (regra
da fórmula do botão), unifiquei esses dois pontos para ciano também, pra
não sobrar uma segunda cor de marca dentro do mesmo site (contraria
"Decisão de paleta" do spec: 1 acento por site). O token `--violet-*`
continua definido no CSS, só não é mais usado ativamente.

Task 7: complete (commit e740a24, build: npm run build → ok, visual:
fundo claro por padrão confirmado, rodapé escuro e legível nos dois temas)

Task 6: complete (verificação apenas, sem commit: claro/escuro conferidos,
Showroom VIP e modal de detalhe abertos via Ferrari F8 Tributo, Alerta de
Preço testado e funcional, rodapé legível nos dois temas)

Task 5: complete (commit a0e4ff0, build: npm run build → ok, visual:
claro/escuro conferidos, hero permanece escuro de propósito, rodapé
legível nos dois temas)

Task 4: complete (commit 11c0809, build: npm run build → ok, visual:
navbar/página claras por padrão, hero permanece escuro de propósito via
theme-pinned-dark pré-existente — footer ganhou a classe, que faltava)

Task 3: complete (verificação apenas, sem commit: claro/escuro
alternados no navegador, rodapé legível nos dois temas, Alerta de Preço
e Dossiê Oficial abertos e funcionais, aba Calculadora TCO visível)

Task 2: Ruling: --surface-footer fica escuro nos dois temas
(já decidido no spec), mas os tokens slate-*/ink usados dentro do rodapé
invertem com o tema — sem correção o texto do rodapé ficaria ilegível no
tema claro (cinza escuro sobre fundo escuro). Adicionei a classe
`.theme-pinned-dark` em auto-dealership (mesmo padrão já existente em
luxury-dealership) e apliquei no elemento `<footer>` — replicar o mesmo
em popular-dealership na Task 7/8 (luxury já tem a classe, só a Task 4
atualiza os valores). Custo se errado: rodapé ilegível no tema claro.
