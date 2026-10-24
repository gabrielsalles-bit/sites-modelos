# Ecossistema de Sites Modelos — Monorepo

> Repositório monorepo modular projetado para abrigar e demonstrar **3 modelos de sites comerciais completos e de alta performance**.

🌐 **Portal Hub Online (GitHub Pages):**  
👉 **[https://carlswilson22.github.io/sites-modelos/](https://carlswilson22.github.io/sites-modelos/)**

---

## 🎯 Modelos de Sites Integrados

| Modelo | Nicho | Status | Link de Acesso | Tecnologias Principais |
|---|---|---|---|---|
| **Modelo 01: AutoElite Motors** | Concessionária & Seminovos | ✅ **Disponível** | [Ver Demonstração](https://carlswilson22.github.io/sites-modelos/auto-dealership/) | React 18, GSAP ScrollTrigger, Tailwind CSS, Vite |
| **Modelo 02** | *A definir* | 🚧 **Em Breve** | `sites/modelo-02/` | React 18, Tailwind CSS, Vite |
| **Modelo 03** | *A definir* | 📋 **Planejado** | `sites/modelo-03/` | React 18, Tailwind CSS, Vite |

---

## 🏛️ Arquitetura do Repositório

O projeto utiliza uma arquitetura baseada em **NPM Workspaces** com pipeline de compilação automatizado:

```
sites-modelos/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD unificado para GitHub Pages
├── scripts/
│   └── build-all.mjs               # Script orquestrador de build multi-sites
├── sites/                          # Modelos independentes
│   ├── auto-dealership/            # Modelo 1: Concessionária de Seminovos (AutoElite)
│   ├── modelo-02/                  # Modelo 2: Estrutura modular reservada
│   └── modelo-03/                  # Modelo 3: Estrutura modular reservada
├── public/                         # Assets estáticos do Portal Hub
├── src/                            # Aplicação do Portal Hub (Showcase)
├── package.json                    # Configuração de NPM Workspaces
├── tailwind.config.js
└── vite.config.js                  # Vite da raiz (base: '/sites-modelos/')
```

---

## 💻 Comandos de Desenvolvimento

### Instalação de Dependências
```bash
npm install
```

### Executar em Desenvolvimento Local
```bash
# Iniciar o Portal Hub (Catálogo Showcase) na porta 5173
npm run dev

# Iniciar o Modelo 1 (Concessionária AutoElite) na porta 5174
npm run dev:dealership
```

### Compilação de Produção Unificada
```bash
# Compila o Portal Hub e todos os modelos presentes em sites/ para a pasta dist/
npm run build
```