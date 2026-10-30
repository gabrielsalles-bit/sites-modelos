# Sites Modelos — Concessionárias

Monorepo com **3 modelos de site para concessionárias de veículos** (do básico ao completo) e um **portal** que reúne todos em uma vitrine. Serve como catálogo de modelos para apresentar a clientes e como base para sites sob medida.

## Índice
- [Modelos](#modelos)
- [Stack](#stack)
- [Começando](#começando)
- [Comandos](#comandos)
- [Estrutura](#estrutura)
- [Build e deploy](#build-e-deploy)
- [Fluxo de trabalho](#fluxo-de-trabalho)
- [Solução de problemas](#solução-de-problemas)

## Modelos

| Pasta | Modelo | Nível | Destaques | Porta |
|---|---|---|---|---|
| `sites/portal` | Portal Hub | — | Vitrine com links e métricas dos 3 modelos | 5173 |
| `sites/auto-dealership` | AutoElite Motors | Básico | Seminovos, hero estática, destaques, contato, galeria | 5174 |
| `sites/luxury-dealership` | Apex Luxury Motors | Intermediário | Hero GSAP, visualizador 360°, simulador de financiamento, avaliação de troca, concierge VIP | 5175 |
| `sites/popular-dealership` | DriveNow Motors | Completo | Consultor de IA, comparador, favoritos, calculadora de TCO, dossiê, alertas de preço, troca com troco | 5176 |

## Stack
React 18 · Vite 5 · Tailwind CSS 3 · GSAP · Framer Motion · Lucide Icons · npm workspaces

## Começando

**Requisitos:** Node.js 20+ (há um `.nvmrc`; com nvm: `nvm use`) e Git.

```bash
git clone https://github.com/gabrielsalles-bit/sites-modelos.git
cd sites-modelos
npm install
npm run dev          # abre o portal em http://localhost:5173
```

Novo no projeto? Leia o [guia de contribuição](CONTRIBUTING.md) e o [onboarding](docs/ONBOARDING.md).

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` / `dev:portal` | Portal (5173) |
| `npm run dev:dealership` | Modelo 1 — Básico (5174) |
| `npm run dev:luxury` | Modelo 2 — Intermediário (5175) |
| `npm run dev:popular` | Modelo 3 — Completo (5176) |
| `npm run build` | Compila tudo em `dist/` |
| `npm run build:portal` · `build:auto` · `build:luxury` · `build:popular` | Compila um site isolado |
| `npm run preview` | Pré-visualiza o build do portal |

## Estrutura

```
sites-modelos/
├── .github/
│   ├── workflows/ci.yml         # build em cada Pull Request
│   ├── workflows/deploy.yml     # deploy no GitHub Pages (push na main)
│   ├── ISSUE_TEMPLATE/          # modelos de bug e tarefa
│   ├── pull_request_template.md
│   ├── CODEOWNERS
│   └── dependabot.yml
├── docs/ONBOARDING.md
├── scripts/build-all.mjs        # orquestra o build de todos os sites
├── sites/
│   ├── portal/
│   ├── auto-dealership/
│   ├── luxury-dealership/
│   └── popular-dealership/
├── CONTRIBUTING.md
└── package.json                 # workspaces
```

Cada site é independente: tem seu `package.json`, `vite.config.js`, `tailwind.config.js` e `src/` (`components/`, `pages/`, `data/`).

## Build e deploy
- `npm run build` gera `dist/` com o portal na raiz e cada modelo em `dist/<nome-do-site>/`.
- O `base` do Vite de cada site e os links `/sites-modelos/...` dependem do **nome do repositório** (`sites-modelos`). Se renomear o repositório, atualize esses caminhos.
- O workflow `deploy.yml` publica no GitHub Pages a cada push na `main`. O Pages só funciona em repositório público (ou plano pago); em repositório privado esse job falha, e isso é esperado.

## Fluxo de trabalho
1. Crie uma branch a partir da `main`: `feat/...`, `fix/...`, `docs/...`, `chore/...`.
2. Commits no padrão `tipo(escopo): descrição`, por exemplo `feat(luxury-dealership): adiciona galeria 360`.
3. Abra um Pull Request para a `main`; o CI roda `npm run build`.
4. Faça o merge (squash) com o CI verde. A branch é apagada automaticamente.

Evite commits diretos na `main`. Detalhes em [CONTRIBUTING.md](CONTRIBUTING.md).

## Solução de problemas
- **Erro de `@rollup/rollup-*` no build:** apague `node_modules` e `package-lock.json` e rode `npm install` (acontece ao trocar de sistema operacional).
- **Porta em uso:** feche o processo que a ocupa ou ajuste a porta no script `dev` do site.
- **Links quebrados após deploy:** confira se o nome do repositório bate com o `base` em `vite.config.js`.
