// Sistema de datos estructurados para proyectos - VERSION OPTIMIZADA
const projectsData = [
  // 🏆 PROYECTOS HERO (Máxima prominencia - Top 3)
  {
    id: 'erp-system',
    title: 'Sistema ERP para PyMEs',
    category: 'software',
    tier: 'hero',
    featured: true,
    year: 2024,
    complexity: 'enterprise',
    rating: 5,
    technologies: ['Python', 'SQL', 'Flask', 'PostgreSQL'],
    impact: '🚀 Reducción 60% tiempo gestión administrativa | 💰 ROI 300% primer año | 👥 50+ PyMEs activas',
    description: 'Sistema completo de gestión empresarial desde cero con módulos de inventario, facturación, gestión de clientes y reportes financieros automatizados.',
    image: './img/minimalist-office.jpg',
    links: {
      github: 'https://github.com/nomdedev',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed',
    highlights: ['Módulos completos', 'Automatización total', 'Escalabilidad cloud']
  },
  {
    id: 'vecino-simple',
    title: 'Vecino Simple - App Inmobiliaria',
    category: 'software',
    tier: 'hero',
    featured: true,
    year: 2024,
    complexity: 'enterprise',
    rating: 5,
    technologies: ['Next.js', 'React Native', 'Supabase', 'Railway', 'Stripe'],
    impact: '🏢 Digitalización completa gestión consorcios | ⏱️ Reducción 80% tiempo administrativo | 💳 Procesamiento automático expensas',
    description: 'Aplicación web completa para administración de consorcios y propiedades inmobiliarias con gestión de expensas, reservas y comunicación integrada.',
    image: './img/workspace-shelving-interior-workspacehome-office.jpg',
    links: {
      github: 'https://github.com/nomdedev',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed',
    highlights: ['Multi-plataforma', 'Pagos integrados', 'Comunicación en tiempo real']
  },
  {
    id: 'portfolio-tracker',
    title: 'Portfolio Tracker Fintech',
    category: 'fintech',
    tier: 'hero',
    featured: true,
    year: 2024,
    complexity: 'enterprise',
    rating: 5,
    technologies: ['Python', 'Pandas', 'Plotly', 'FastAPI', 'React', 'PostgreSQL'],
    impact: '📊 Plataforma completa gestión inversiones | 🤖 Análisis automático | 📈 Rendimiento 25% superior mercado',
    description: 'Plataforma fintech para gestión de portafolios con APIs financieras, análisis técnico avanzado y dashboards interactivos en tiempo real.',
    image: './img/accounting-chart-coffee-cup-contemporary.jpg',
    links: {
      github: 'https://github.com/nomdedev',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed',
    highlights: ['APIs financieras', 'Machine Learning', 'Dashboards en tiempo real']
  },

  // ⭐ PROYECTOS PRINCIPALES (Alta prominencia)
  {
    id: 'solar-water-tanks',
    title: 'Solar Water Tanks - Desarrollo de Producto',
    category: 'industrial',
    tier: 'primary',
    featured: false,
    year: 2024,
    complexity: 'high',
    rating: 4,
    technologies: ['CAD 3D', 'Ingeniería Mecánica', 'Diseño Sostenible', 'Análisis Térmico'],
    impact: '☀️ Eficiencia energética 40% superior | 💡 Reducción costos 60% | 🏭 Producción industrial certificada',
    description: 'Desarrollo completo de tanques de agua solar para almacenamiento eficiente utilizando energía renovable con certificación industrial.',
    image: './img/tsolares/ts1-fabricacion.jpg',
    links: {
      github: null,
      demo: 'https://drive.google.com/file/d/1v2NwTHMbI-9AdzLoGngcVnXfmTjSk4Sm/view',
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed',
    highlights: ['Certificación ISO', 'Diseño sostenible', 'Producción industrial']
  },
  {
    id: 'exus-app',
    title: 'RexUs.app - AI Platform',
    category: 'ai',
    tier: 'primary',
    featured: false,
    year: 2024,
    complexity: 'high',
    rating: 4,
    technologies: ['Python', 'AI/ML', 'Automatización', 'Cloud Computing'],
    impact: '🤖 Automatización procesos empresariales | ⚡ Reducción 75% tareas manuales | 🎯 Precisión 95% predicciones',
    description: 'Plataforma de automatización con IA para optimizar procesos empresariales con machine learning aplicado a workflows inteligentes.',
    image: './img/workspace-shelving-interior-workspacehome-office.jpg',
    links: {
      github: 'https://github.com/nomdedev/Rexus.app',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed',
    highlights: ['Machine Learning', 'Automatización inteligente', 'Procesos optimizados']
  },
  {
    id: 'docente-ia',
    title: 'Docente Inteligencia Artificial',
    category: 'education',
    tier: 'primary',
    featured: false,
    year: 2024,
    complexity: 'medium',
    rating: 4,
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Industria 4.0'],
    impact: '🎓 Formación 200+ profesionales | 🏆 Certificación universitaria | 📈 Empleabilidad 85% graduados',
    description: 'Cursos especializados IA aplicados a procesos industriales en Universidad Nacional de La Plata con certificación oficial.',
    image: './img/minimalist-office2.jpg',
    links: {
      github: null,
      demo: 'https://www.linkedin.com/in/martin-nomdedeu/',
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'ongoing',
    highlights: ['Certificación oficial', '200+ estudiantes', 'Industria 4.0']
  },

  // 📋 PROYECTOS SECUNDARIOS (Menor prominencia)
  {
    id: 'electric-bus',
    title: 'Electric Bus Conversion',
    category: 'industrial',
    tier: 'secondary',
    featured: false,
    year: 2022,
    complexity: 'high',
    rating: 4,
    technologies: ['Conversión Eléctrica', 'Ingeniería Automotriz', 'Sostenibilidad'],
    impact: '🚌 Primera conversión eléctrica Argentina | ⚡ Eficiencia 300% superior | 🌱 Reducción 100% emisiones',
    description: 'Conversión completa de autobús operativo a energía eléctrica para empresa Nueve de Julio - proyecto pionero en Argentina.',
    image: './img/business-busy-clean-computer.jpg',
    links: {
      github: null,
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed',
    highlights: ['Proyecto pionero', 'Sostenibilidad total', 'Certificación técnica']
  },
  {
    id: 'process-automation',
    title: 'Automatización de Procesos Empresariales',
    category: 'automation',
    tier: 'secondary',
    featured: false,
    year: 2024,
    complexity: 'medium',
    rating: 4,
    technologies: ['Zapier', 'Make.com', 'Python Scripting', 'APIs'],
    impact: '⚡ Reducción 75% tiempo procesamiento | 🤖 50+ flujos automatizados | 💰 ROI 400% primer trimestre',
    description: 'Flujos de trabajo automatizados para optimizar procesos administrativos y operativos con integración multi-plataforma.',
    image: './img/workspace-shelving-interior-workspacehome-office.jpg',
    links: {
      github: 'https://github.com/nomdedev',
      demo: null,
      contact: 'https://www.linkedin.com/in/martin-nomdedeu/'
    },
    status: 'completed',
    highlights: ['Multi-plataforma', 'Integración APIs', 'ROI demostrado']
  }
];

// Configuración de filtros optimizada
const filterConfig = {
  categories: {
    all: { label: 'Todos', icon: '📂', count: 8 },
    hero: { label: '⭐ Hero', icon: '⭐', count: 3 },
    primary: { label: '🔥 Principal', icon: '🔥', count: 3 },
    secondary: { label: '📋 Secundario', icon: '📋', count: 2 },
    industrial: { label: '🏭 Industrial', icon: '🏭', count: 2 },
    ai: { label: '🤖 IA & ML', icon: '🤖', count: 1 },
    software: { label: '💻 Software', icon: '💻', count: 2 },
    fintech: { label: '📊 Fintech', icon: '📊', count: 1 },
    automation: { label: '⚡ Automatización', icon: '⚡', count: 1 },
    education: { label: '🎓 Educación', icon: '🎓', count: 1 }
  },
  technologies: [
    'Python', 'React', 'Next.js', 'AI/ML', 'PostgreSQL', 'FastAPI',
    'TensorFlow', 'CAD 3D', 'Zapier', 'Supabase', 'Stripe', 'Pandas'
  ],
  tiers: {
    hero: 'Proyectos estrella - máxima prominencia',
    primary: 'Proyectos principales - alta visibilidad',
    secondary: 'Proyectos complementarios - soporte'
  },
  complexity: {
    enterprise: 'Empresarial - Alto impacto',
    high: 'Complejo - Alta dificultad',
    medium: 'Intermedio - Moderado',
    low: 'Básico - Introductorio'
  }
};