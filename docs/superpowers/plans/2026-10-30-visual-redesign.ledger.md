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

Task 2 (em andamento): Ruling: --surface-footer fica escuro nos dois temas
(já decidido no spec), mas os tokens slate-*/ink usados dentro do rodapé
invertem com o tema — sem correção o texto do rodapé ficaria ilegível no
tema claro (cinza escuro sobre fundo escuro). Adicionei a classe
`.theme-pinned-dark` em auto-dealership (mesmo padrão já existente em
luxury-dealership) e apliquei no elemento `<footer>` — replicar o mesmo
em popular-dealership na Task 7/8 (luxury já tem a classe, só a Task 4
atualiza os valores). Custo se errado: rodapé ilegível no tema claro.
