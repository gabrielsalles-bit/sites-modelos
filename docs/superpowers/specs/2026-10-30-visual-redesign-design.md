# Redesign visual dos 3 templates de concessionária

## Intenção e porquê

Os 3 sites do monorepo (`auto-dealership`, `luxury-dealership`, `popular-dealership`)
são hoje demos de vendas mostradas a donos de concessionária antes de fechar
contrato, e também servem de ponto de partida para o produto final entregue a
cada cliente (que depois recebe um redesign totalmente próprio por cima da
mesma base funcional).

O dono do projeto considera o visual atual "amador" — cores muito vibrantes
(ex.: laranja chamativo), que tiram credibilidade na hora de vender o produto
para concessionárias, que normalmente esperam uma identidade mais séria e
profissional. Ele quer substituir essa linguagem visual nos 3 templates,
mantendo 100% das funcionalidades já construídas, usando como referência de
estrutura/profissionalismo (não de cor) o arquivo Figma "Touring Cars"
(Figma Community), visto em 8 telas: home, sobre nós, contato, anuncie seu
veículo, estoque/nossos modelos, e página de detalhe de veículo.

## Referência visual

Screenshots reais das 6 telas do protótipo Figma "Touring Cars" usadas como
referência estão salvas em `docs/superpowers/specs/assets/touring-cars-reference/`
(`home.png`, `sobre.png`, `contato.png`, `anuncie.png`, `estoque.png`,
`detalhe-veiculo.png`). Quem for planejar/construir deve olhar essas imagens
diretamente, não só a descrição abaixo — a descrição é um resumo, as imagens
são a fonte da verdade. **Ignorar a cor dessas imagens**, elas não são o que
está sendo copiado (ver "Decisão de paleta").

## O que a referência ensina (não as cores, a estrutura)

- Paleta quase monocromática: fundo branco/cinza bem claro, texto e UI em
  preto. A única cor fora disso são badges de status semânticos (azul
  "Reservado", verde "Vendido") — nunca usada como identidade de marca.
- Tipografia bold, grande, geométrica para títulos (inclusive quebrada em
  várias linhas no hero); labels de ficha técnica em caixa alta cinza
  pequena, valor em bold preto — hierarquia muito clara com poucos pesos.
- Botões primários em pílula preta sólida, cantos arredondados em cards e
  inputs, bordas finas (1px) em vez de sombra/glow pesado.
- Cards de veículo: imagem com cantos arredondados, nome bold, km/ano em
  cinza pequeno, preço em destaque, seta ">" de navegação.
- Blocos editoriais (ex. "Destaque semanal"): imagem + card preto com texto
  branco lado a lado, como revista.
- Grid de 2 colunas label/valor para especificações técnicas.
- Sidebar de filtro com inputs "de/até", botão preto "Filtrar" + botão
  outline "Limpar".
- Formulários com label acima do input, bordas finas arredondadas,
  consistentes entre páginas (contato, anuncie, captura de lead).
- Rodapé preto/escuro, 3 colunas (marca+tagline, contato, newsletter).
- Fotografia em cor plena faz o trabalho visual — a UI em si é neutra.

## Decisão de paleta (definida nesta conversa)

Base monocromática/neutra (fundo claro, texto quase-preto, escala de cinzas)
em todos os 3 sites — igual à referência — **mais um acento sutil e escuro
por site**, não vibrante, usado só em detalhes pontuais (link ativo, ícone,
leve destaque de CTA secundário), nunca como cor de fundo dominante:

- `auto-dealership`: azul bem escuro/dessaturado (não o azul vibrante atual).
- `luxury-dealership`: âmbar/bronze escuro (não o amarelo-ouro vibrante atual).
- `popular-dealership`: ciano/petróleo escuro (não o ciano vibrante atual).

Os valores exatos (hex/RGB) ficam para a fase de planejamento — ver
"O que fica para quem for construir".

## Infraestrutura já existente (reaproveitar, não recriar)

Os 3 sites já usam um sistema de tokens via variáveis CSS (`--surface-page`,
`--surface-card`, `--ink`, escala `--slate-*`, mais os tokens de acento por
site) definidos em `src/index.css`, com um bloco `:root` (escuro) e um bloco
`:root.light` (claro), resolvidos no `tailwind.config.js` de cada site via
`rgb(var(--token) / <alpha-value>)`. Existe também um hook `useTheme` com
toggle claro/escuro já funcional.

Isso significa que boa parte do redesign é **trocar os valores dos tokens**
(e ajustar os componentes que não os usam), não reconstruir a arquitetura de
tema do zero.

**Checado durante o planejamento:** os componentes adicionados na Fase 2 em
`auto-dealership` (`TcoCalculatorCard`, `AIChatBox`, `OfficialDossierModal`,
`PriceAlertModal`) usam classes como `bg-slate-950`/`text-blue-400`, que
pareciam literais à primeira vista — mas `slate` e `blue` já são mapeados
via CSS variable no `tailwind.config.js` desse site, então essas classes
**já são tokens** e respondem normalmente à troca de paleta. Não precisam de
migração; só a troca de valores nas variáveis CSS (ver plano de execução).

## Objetivos

- Os 3 templates deixam de parecer "amadores" e passam a transmitir
  profissionalismo e credibilidade, na linha do Touring Cars.
- Nenhuma das 7 funcionalidades da Fase 2 (Favoritos, Comparador, Concierge,
  Calculadora de TCO, Consultor IA, Dossiê Oficial, Alerta de Preço) é
  removida, quebrada ou perde comportamento.
- O resultado serve tanto como demo de vendas quanto como ponto de partida
  visual para a base entregue a clientes fechados.
- Os 3 sites continuam com paridade de funcionalidades e de padrão de
  componente — a diferença entre eles passa a ser só o acento de cor e
  pequenos ajustes de copy/foco de negócio, não arquitetura divergente.

## Não-objetivos

- Não é objetivo desta etapa unificar os 3 sites numa cor só — cada um
  mantém seu acento (ver "Decisão de paleta").
- Não é objetivo desta etapa desenhar o sistema de "montagem modular por
  funcionalidades escolhidas pelo cliente" (arquitetura de entrega
  pós-fechamento) — esse é um tópico separado, ainda em aberto, que será
  tratado depois.
- Não é objetivo reescrever a lógica/dados das funcionalidades existentes —
  é um redesign visual, não uma reescrita de produto.
- Não é objetivo redesenhar o conteúdo/copy de cada site além do que o novo
  padrão visual naturalmente exige (ex. headline reestruturada em linhas).

## Anti-objetivos (falharia mesmo "funcionando")

- Continuar parecendo vibrante/amador, ou trocar uma cor chamativa por
  outra cor chamativa.
- Quebrar qualquer uma das 7 funcionalidades da Fase 2, mesmo que o visual
  fique bonito.
- Os 3 sites divergirem em padrão de componente a ponto de dificultar
  manutenção em paralelo (perder a paridade estrutural que já existe hoje).

## Escopo: workspace `portal`

O monorepo tem um 4º workspace, `sites/portal`, além dos 3 sites de
concessionária. Ele não usa o sistema de tokens CSS (cores em hex literal) e
seu conteúdo é uma página técnica interna — lista os 3 modelos e explica a
arquitetura do monorepo ("NPM Workspaces", "Build Orquestrado", "Roteamento
GitHub Pages") — não é uma demo voltada para dono de concessionária. **Fica
fora do escopo deste redesign**, confirmado com o responsável do projeto.

## Tema padrão (claro/escuro)

Os 3 sites já têm toggle claro/escuro (`useTheme`), hoje com o escuro como
padrão ao carregar. Como a referência e a decisão de paleta descrevem uma
base clara ("fundo branco/cinza bem claro"), e o objetivo é causar a melhor
primeira impressão possível num dono de concessionária vendo a demo pela
primeira vez, **o tema claro passa a ser o padrão ao carregar** nos 3 sites
(o escuro continua disponível via toggle).

## Restrições

- Monorepo com npm workspaces (`sites/*`), Vite + React 18 + Tailwind CSS 3,
  deploy no GitHub Pages com `base` por path — isso não muda.
- Reaproveitar o sistema de tokens via CSS variables já existente em vez de
  criar um novo mecanismo de tema.
- Cada mudança visual precisa ser verificada rodando o dev server e
  conferindo no navegador (preview), como foi feito nas fases anteriores,
  antes de considerar pronta.
- Build de produção de cada site precisa continuar limpo (sem erros) depois
  da mudança.

## O que fica para quem for construir (fase de planejamento)

- Valores exatos (hex/RGB) da escala neutra e dos 3 acentos escuros por
  site, respeitando contraste em modo claro e escuro.
- Se a fonte atual (`Inter` para corpo, `Outfit` para heading) muda ou é
  mantida — a referência não exige troca de fonte, só de paleta/estrutura;
  decidir com base em como `Outfit`/`Inter` ficam no novo layout.
- Lista componente a componente de onde trocar classes literais por tokens,
  e onde ajustar raio de borda, sombra/glow e espaçamento para bater com o
  padrão "flat, borda fina, bastante whitespace" da referência.
- Ordem de execução entre os 3 sites e entre os componentes compartilhados
  (ex.: construir o padrão uma vez e portar, vs. ajustar site por site,
  como foi feito na Fase 2 com cada funcionalidade).
- Migração dos componentes literais da Fase 2 em `auto-dealership` para o
  sistema de tokens, como parte deste trabalho.
