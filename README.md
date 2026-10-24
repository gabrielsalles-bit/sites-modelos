# Ecossistema de Sites para Concessionárias — Monorepo

> Repositório monorepo modular contendo **3 modelos de sites especializados para o mercado automotivo**, desenvolvidos com arquitetura independente e de alta performance.

🌐 **Portal Hub Online (GitHub Pages):**  
👉 **[https://carlswilson22.github.io/sites-modelos/](https://carlswilson22.github.io/sites-modelos/)**

---

## 🏎️ Os 3 Modelos de Sites Integrados

| Projeto | Nicho & Perfil | Destaques Técnicos | Link de Acesso |
|---|---|---|---|
| **Modelo 01: AutoElite Motors** | Concessionária de Seminovos Selecionados | Vídeo cinematográfico GSAP ScrollTrigger em 4 cenas, galeria 360°, laudo cautelar aprovado e simulador de financiamento. | [Acessar Modelo 01](https://carlswilson22.github.io/sites-modelos/auto-dealership/) |
| **Modelo 02: Apex Luxury Motors** | Carros Esportivos, Exóticos & Blindados | Estética minimalista Dark & Gold, vitrine de supercarros, blindados certificados nível III-A e concierge VIP. | [Acessar Modelo 02](https://carlswilson22.github.io/sites-modelos/luxury-dealership/) |
| **Modelo 03: DriveNow Motors** | Revenda Multimarcas & Financiamento Rápido | Foco em aprovação de crédito ágil, simulador interativo de parcelas em tempo real e módulo de Troca com Troco. | [Acessar Modelo 03](https://carlswilson22.github.io/sites-modelos/popular-dealership/) |

---

## 🏛️ Estrutura de Pastas do Monorepo

```
sites-modelos/
├── .github/workflows/deploy.yml   # CI/CD automatizado para GitHub Pages
├── scripts/build-all.mjs          # Script orquestrador de build multi-sites
├── sites/                         # Pastas dedicadas aos 3 projetos
│   ├── auto-dealership/           # Modelo 01: Seminovos Selecionados
│   ├── luxury-dealership/         # Modelo 02: Exóticos & Luxo
│   └── popular-dealership/        # Modelo 03: Multimarcas & Financiamento
├── public/                        # Assets da vitrine central (Hub)
├── src/                           # Portal Hub Showcase
├── package.json                   # Gerenciador geral de workspaces
└── vite.config.js                 # Base do Hub: '/sites-modelos/'
```

---

## 💻 Comandos de Desenvolvimento Local

```bash
# Instalar dependências de todos os projetos
npm install

# Iniciar o Portal Hub Showcase (Porta 5173)
npm run dev

# Iniciar o Modelo 1: Seminovos (Porta 5174)
npm run dev:dealership

# Iniciar o Modelo 2: Luxo & Exóticos (Porta 5175)
npm --workspace=luxury-dealership run dev

# Iniciar o Modelo 3: Financiamento Rápido (Porta 5176)
npm --workspace=popular-dealership run dev

# Compilar todos os modelos simultaneamente para deploy
npm run build
```