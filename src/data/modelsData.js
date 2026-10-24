export const modelsList = [
  {
    id: 'auto-dealership',
    title: 'AutoElite Motors',
    tagline: 'Concessionária & Revenda de Seminovos',
    category: 'Automotivo',
    description: 'Showroom digital de alto padrão com vídeo cinematográfico interativo controlado por rolagem (GSAP ScrollTrigger), visualizador multi-ângulo, simulador de financiamento e avaliação de troca via WhatsApp.',
    status: 'available', // 'available' | 'in_development' | 'planned'
    badge: 'Disponível Ao Vivo',
    path: 'auto-dealership/',
    previewImage: 'auto-dealership/images/hero-video-poster.jpg',
    features: [
      'Hero cinematográfica com ScrollTrigger',
      'Catálogo de veículos com filtros avançados',
      'Simulador de financiamento em tempo real',
      'Garantia e perícia cautelar certificada',
      'Design 100% responsivo e acessível'
    ],
    techStack: ['React 18', 'GSAP ScrollTrigger', 'Tailwind CSS', 'Vite', 'Lucide Icons']
  },
  {
    id: 'modelo-02',
    title: 'Modelo 02',
    tagline: 'Em Desenvolvimento',
    category: 'Em Breve',
    description: 'Segundo modelo de site profissional de alta conversão. Estrutura modular reservada e pronta para desenvolvimento do próximo nicho.',
    status: 'in_development',
    badge: 'Em Construção',
    path: '#',
    previewImage: null,
    features: [
      'Arquitetura isolada no monorepo',
      'Layout moderno e focado em conversão',
      'Pipeline de build automatizado no GitHub Actions'
    ],
    techStack: ['React 18', 'Tailwind CSS', 'Vite']
  },
  {
    id: 'modelo-03',
    title: 'Modelo 03',
    tagline: 'Planejado',
    category: 'Planejamento',
    description: 'Terceiro modelo comercial para fechamento do catálogo de sites modelos de alto impacto.',
    status: 'planned',
    badge: 'Planejado',
    path: '#',
    previewImage: null,
    features: [
      'Estrutura reservada para expansão',
      'Deploy automático integrado ao Hub',
      'Padrões de acessibilidade e performance'
    ],
    techStack: ['React 18', 'Tailwind CSS', 'Vite']
  }
];