# Ecossistema de Sites para Concessionárias — Monorepo

> Repositório monorepo 100% modular contendo **3 modelos de sites especializados para o mercado automotivo** e uma **vitrine/portal central**.

🌐 **Portal Hub Online (GitHub Pages):**  
👉 **[https://carlswilson22.github.io/sites-modelos/](https://carlswilson22.github.io/sites-modelos/)**

---

## 🏎️ Aplicações Integradas (em `sites/`)

| Aplicação / Pasta | Nicho & Função | Link de Acesso |
|---|---|---|
| **`sites/portal/`** | **Vitrine Central / Portal Hub**: Catálogo responsivo com links e métricas dos 3 modelos. | [Acessar Vitrine](https://carlswilson22.github.io/sites-modelos/) |
| **`sites/auto-dealership/`** | **Modelo 01: AutoElite Motors**: Concessionária de seminovos com vídeo interativo GSAP ScrollTrigger. | [Acessar Modelo 01](https://carlswilson22.github.io/sites-modelos/auto-dealership/) |
| **`sites/luxury-dealership/`** | **Modelo 02: Apex Luxury Motors**: Superesportivos, blindados certificados e concierge VIP. | [Acessar Modelo 02](https://carlswilson22.github.io/sites-modelos/luxury-dealership/) |
| **`sites/popular-dealership/`** | **Modelo 03: DriveNow Motors**: Multimarcas com simulador de crédito dinâmico e Troca com Troco. | [Acessar Modelo 03](https://carlswilson22.github.io/sites-modelos/popular-dealership/) |

---

## 🏛️ Estrutura de Pastas do Monorepo

```
sites-modelos/
├── .github/workflows/deploy.yml   # CI/CD automatizado no GitHub Actions
├── scripts/build-all.mjs          # Script orquestrador de build multi-sites
│
├── sites/                         # TODAS as aplicações ficam aqui dentro!
│   ├── portal/                    # Vitrine / Catálogo central (Hub)
│   ├── auto-dealership/           # Modelo 01: Seminovos Selecionados
│   ├── luxury-dealership/         # Modelo 02: Exóticos & Luxo
│   └── popular-dealership/        # Modelo 03: Multimarcas & Financiamento
│
├── package.json                   # Gerenciador geral de workspaces
├── package-lock.json              # Trava de dependências
├── .gitignore                     # Proteção de arquivos locais
└── README.md                      # Manual do repositório
```

---

## 💻 Comandos de Desenvolvimento Local

```bash
# Instalar dependências de todos os projetos de uma só vez
npm install

# Iniciar a Vitrine Central / Portal Hub (Porta 5173)
npm run dev

# Iniciar o Modelo 1: Seminovos (Porta 5174)
npm run dev:dealership

# Iniciar o Modelo 2: Luxo & Exóticos (Porta 5175)
npm run dev:luxury

# Iniciar o Modelo 3: Financiamento Rápido (Porta 5176)
npm run dev:popular

# Compilar todas as aplicações para produção
npm run build
```