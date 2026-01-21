// Sistema de datos estructurados para proyectos
const projectsData = [
  // PROYECTOS DESTACADOS
  {
    id: 'erp-system',
    title: 'Sistema ERP para PyMEs',
    category: 'software',
    featured: true,
    year: 2024,
    complexity: 'enterprise',
    rating: 5,
    technologies: ['Python', 'SQL', 'Flask', 'PostgreSQL'],
    impact: 'Reducción 60% tiempo gestión administrativa',
    description: 'Sistema completo de gestión empresarial desde cero con módulos de inventario, facturación, gestión de clientes y reportes financieros.',
    image: './img/minimalist-office.jpg',
    links: {
      github: 'https://github.com/nomdedev',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },
  {
    id: 'vecino-simple',
    title: 'Vecino Simple - App Inmobiliaria',
    category: 'software',
    featured: true,
    year: 2024,
    complexity: 'enterprise',
    rating: 5,
    technologies: ['Next.js', 'React Native', 'Supabase', 'Railway', 'Stripe'],
    impact: 'Digitalización completa gestión consorcios, reducción 80% tiempo administrativo',
    description: 'Aplicación web completa para administración de consorcios y propiedades inmobiliarias con gestión de expensas, reservas y comunicación.',
    image: './img/workspace-shelving-interior-workspacehome-office.jpg',
    links: {
      github: 'https://github.com/nomdedev',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },
  {
    id: 'portfolio-tracker',
    title: 'Portfolio Tracker Fintech',
    category: 'fintech',
    featured: true,
    year: 2024,
    complexity: 'enterprise',
    rating: 5,
    technologies: ['Python', 'Pandas', 'Plotly', 'FastAPI', 'React', 'PostgreSQL'],
    impact: 'Plataforma completa gestión inversiones con análisis profesional',
    description: 'Plataforma fintech para gestión de portafolios con APIs financieras, análisis técnico y dashboards interactivos.',
    image: './img/accounting-chart-coffee-cup-contemporary.jpg',
    links: {
      github: 'https://github.com/nomdedev',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },

  // PROYECTOS INDUSTRIALES
  {
    id: 'solar-water-tanks',
    title: 'Solar Water Tanks - Desarrollo de Producto',
    category: 'industrial',
    featured: false,
    year: 2024,
    complexity: 'high',
    rating: 4,
    technologies: ['CAD 3D', 'Ingeniería Mecánica', 'Diseño Sostenible', 'Análisis Térmico'],
    impact: 'Solución sostenible que reduce costos energéticos',
    description: 'Desarrollo completo de tanques de agua solar para almacenamiento eficiente utilizando energía renovable.',
    image: './img/tsolares/ts1-fabricacion.jpg',
    links: {
      github: null,
      demo: 'https://drive.google.com/file/d/1v2NwTHMbI-9AdzLoGngcVnXfmTjSk4Sm/view',
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },
  {
    id: 'electric-bus',
    title: 'Electric Bus Conversion',
    category: 'industrial',
    featured: false,
    year: 2022,
    complexity: 'high',
    rating: 4,
    technologies: ['Conversión Eléctrica', 'Ingeniería Automotriz', 'Sostenibilidad'],
    impact: 'Primera conversión autobús eléctrico operativo en Argentina',
    description: 'Conversión completa de autobús operativo a energía eléctrica para empresa Nueve de Julio.',
    image: './img/business-busy-clean-computer.jpg',
    links: {
      github: null,
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },
  {
    id: 'harvesting-machine',
    title: 'Harvesting Machine Design',
    category: 'industrial',
    featured: false,
    year: 2023,
    complexity: 'high',
    rating: 4,
    technologies: ['CAD', 'Normas ISO', 'Ingeniería Agrícola'],
    impact: 'Máquina cosechadora con estándares internacionales ISO-9001',
    description: 'Diseño de máquina cosechadora que cumple estándares internacionales con investigación y validación.',
    image: './img/minimalist-office2.jpg',
    links: {
      github: null,
      demo: 'https://drive.google.com/file/d/17IMI_vSm_SlL-UP0Emtr5ZMxnJ6nsIDZ/view',
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },
  {
    id: 'industrial-gas-tank',
    title: 'Industrial Gas Tank Design',
    category: 'industrial',
    featured: false,
    year: 2023,
    complexity: 'medium',
    rating: 3,
    technologies: ['Ingeniería', 'Regulaciones Industriales', 'Diseño Estructural'],
    impact: 'Diseño tanque industrial con integridad estructural y eficiencia',
    description: 'Diseño y fabricación de tanque industrial de gas cumpliendo parámetros y regulaciones de seguridad.',
    image: './img/business-busy-clean-computer.jpg',
    links: {
      github: null,
      demo: 'https://drive.google.com/file/d/1Kae_YKxJJjizLA0zzIaVs5CQ2ysxkFhE/view',
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },

  // SOLUCIONES IA & AUTOMATIZACIÓN
  {
    id: 'rexus-app',
    title: 'RexUs.app - AI Platform',
    category: 'ai',
    featured: false,
    year: 2024,
    complexity: 'high',
    rating: 4,
    technologies: ['Python', 'AI/ML', 'Automatización'],
    impact: 'Plataforma automatización procesos empresariales',
    description: 'Plataforma de automatización con IA para optimizar procesos empresariales con machine learning.',
    image: './img/workspace-shelving-interior-workspacehome-office.jpg',
    links: {
      github: 'https://github.com/nomdedev/Rexus.app',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },
  {
    id: 'trading-ia',
    title: 'Trading IA System',
    category: 'ai',
    featured: false,
    year: 2024,
    complexity: 'high',
    rating: 4,
    technologies: ['Python', 'AI/ML', 'Trading Algorithms'],
    impact: 'Sistema trading automatizado con algoritmos IA',
    description: 'Sistema de trading automatizado utilizando algoritmos de machine learning para análisis de mercados.',
    image: './img/minimalist-office.jpg',
    links: {
      github: 'https://github.com/nomdedev/tradingIA',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },
  {
    id: 'process-automation',
    title: 'Automatización de Procesos Empresariales',
    category: 'automation',
    featured: false,
    year: 2024,
    complexity: 'medium',
    rating: 4,
    technologies: ['Zapier', 'Make.com', 'Python Scripting', 'APIs'],
    impact: 'Reducción 75% tiempo procesamiento tareas repetitivas',
    description: 'Flujos de trabajo automatizados para optimizar procesos administrativos y operativos.',
    image: './img/workspace-shelving-interior-workspacehome-office.jpg',
    links: {
      github: 'https://github.com/nomdedev',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },

  // DESARROLLO WEB
  {
    id: 'recipe-app',
    title: 'Recipe App',
    category: 'web',
    featured: false,
    year: 2024,
    complexity: 'low',
    rating: 3,
    technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
    impact: 'Aplicación web recetas con interfaz intuitiva',
    description: 'Aplicación web para buscar y preparar recetas con interfaz intuitiva y búsqueda avanzada.',
    image: './img/sackcloth-sackcloth-textured-laptop-ipad.jpg',
    links: {
      github: 'https://github.com/nomdedev/My-Projects',
      demo: 'https://my-projects-sable.vercel.app',
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },
  {
    id: 'arbitrage-extension',
    title: 'ArbitrageAR-USDT Chrome Extension',
    category: 'web',
    featured: false,
    year: 2024,
    complexity: 'medium',
    rating: 3,
    technologies: ['JavaScript', 'Chrome API', 'Fintech'],
    impact: 'Extensión arbitraje dólar oficial vs USDT',
    description: 'Extensión Chrome para arbitraje de Dólar Oficial vs USDT con interfaz moderna.',
    image: './img/accounting-chart-coffee-cup-contemporary.jpg',
    links: {
      github: 'https://github.com/nomdedev/ArbitrageAR-USDT',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed'
  },

  // EDUCACIÓN
  {
    id: 'docente-ia',
    title: 'Docente Inteligencia Artificial',
    category: 'education',
    featured: false,
    year: 2024,
    complexity: 'medium',
    rating: 4,
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Industria 4.0'],
    impact: 'Formación 200+ profesionales en tecnologías IA',
    description: 'Cursos especializados IA aplicados a procesos industriales en Universidad Nacional de La Plata.',
    image: './img/minimalist-office2.jpg',
    links: {
      github: null,
      demo: 'https://www.linkedin.com/in/martin-nomdedeu/',
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'ongoing'
  }
];

// Configuración de filtros
const filterConfig = {
  categories: {
    all: { label: 'Todos', icon: '📂', count: 13 },
    featured: { label: '⭐ Destacados', icon: '⭐', count: 3 },
    industrial: { label: '🏭 Industrial', icon: '🏭', count: 4 },
    ai: { label: '🤖 IA & ML', icon: '🤖', count: 2 },
    software: { label: '💻 Software', icon: '💻', count: 2 },
    web: { label: '🌐 Web Dev', icon: '🌐', count: 2 },
    fintech: { label: '📊 Fintech', icon: '📊', count: 1 },
    automation: { label: '⚡ Automatización', icon: '⚡', count: 1 },
    education: { label: '🎓 Educación', icon: '🎓', count: 1 }
  },
  technologies: [
    'Python', 'React', 'JavaScript', 'AI/ML', 'SQL', 'Next.js',
    'FastAPI', 'Flask', 'PostgreSQL', 'TensorFlow', 'CAD', 'ISO'
  ],
  complexity: {
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
    enterprise: 'Empresarial'
  }
};