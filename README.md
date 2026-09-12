# Martin Nomdedeu - Portfolio

Portfolio de Martin Nomdedeu - Data Scientist | Machine Learning Engineer | AI & Automation. Convierto datos y modelos de IA en decisiones de negocio.

Un portfolio web minimalista construido con Next.js 16, React 19, TypeScript y Tailwind CSS: hero, about, proyectos filtrables por categoría, experiencia, docencia, skills y contacto. Bilingüe ES/EN.

## 🌐 Información del Proyecto

### 🚀 Versión Principal
- **Rama**: `main` (única rama)
- **Framework**: Next.js 15 + React 18 + TypeScript
- **UI Components**: Radix UI + Tailwind CSS
- **Deployment**: Vercel automático
- **URL del Portfolio**: https://martinnomdedeu.com

### 👤 Información Personal
- **Nombre**: Martin Nomdedeu
- **Título**: Data Scientist | Machine Learning Engineer | AI & Automation
- **Ubicación**: La Plata, Buenos Aires, Argentina
- **Email**: martin.nomdedeu@gmail.com
- **Teléfono**: ***REMOVED***
- **LinkedIn**: https://linkedin.com/in/martin-nomdedeu
- **GitHub**: https://github.com/nomdedev

## ✨ Características Destacadas

- **🎨 Diseño Minimalista**: Dark mode de alto contraste con un solo acento esmeralda, sin gradientes ni decoraciones
- **🌐 Bilingüe**: Español e inglés con selector persistente (localStorage)
- **📱 Diseño Responsivo**: Optimizado para desktop, tablet y móvil (mobile-first)
- **⚡ Animaciones Suaves**: Transiciones CSS y animaciones al hacer scroll
- **🔍 SEO Optimizado**: Meta tags, Open Graph, Twitter Cards, sitemap.xml, robots.txt
- **🖼️ Galerías Interactivas**: Grid de proyectos con visualización detallada
- **🔗 Integración Social**: Enlaces directos a LinkedIn, GitHub y Email
- **📄 CV Descargable**: CV en PDF disponible para descarga
- **🌙 Dark Mode**: Tema oscuro por defecto con diseño consistente
- **🧭 Smooth Scroll**: Navegación fluida entre secciones

## 📁 Estructura del Proyecto

```
portfolio/
├── app/                           # Next.js App Router
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal con meta tags SEO
│   ├── page.tsx                  # Página principal que importa componentes
│   └── sitemap.ts                # Sitemap para SEO
├── components/                    # Componentes React
│   ├── portfolio/                # Componentes del portfolio
│   │   ├── navigation.tsx        # Navegación sticky header
│   │   ├── hero.tsx              # Sección Hero con información principal
│   │   ├── about.tsx             # Sección About con skills y contacto
│   │   ├── experience.tsx       # Sección Experience con timeline
│   │   ├── projects.tsx          # Sección Projects con grid
│   │   ├── contact.tsx           # Sección Contact con formulario
│   │   ├── footer.tsx            # Footer con links y sociales
│   │   └── side-elements.tsx     # Elementos fijos laterales
│   ├── theme-provider.tsx        # Provider de tema
│   └── ui/                       # Componentes UI (Radix)
├── lib/                          # Utilidades
│   └── utils.ts                  # Funciones helper
├── public/                       # Archivos estáticos
│   ├── cv.pdf                    # CV descargable
│   ├── img/                      # Imágenes de proyectos
│   │   ├── harvesting/           # Imágenes proyecto Harvesting
│   │   ├── Rexxus/               # Imágenes proyecto Rexxus
│   │   ├── tsolares/             # Imágenes proyecto Tanques Solares
│   │   └── vecinosimple/         # Imágenes proyecto Vecino Simple
│   ├── manifest.json             # PWA manifest
│   └── robots.txt                # Robots.txt para SEO
├── styles/                       # Estilos adicionales
├── tests/                        # Tests automatizados
│   ├── cv-test.spec.ts           # Tests de CV
│   └── redirect-test.spec.ts     # Tests de redirección
└── [config files]                # next.config.mjs, tsconfig.json, etc.
```

## 🛠️ Tecnologías Utilizadas

### Framework y Stack Principal
- **Next.js 15**: Framework React para aplicaciones web modernas con App Router
- **React 18**: Biblioteca JavaScript para interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework de utilidades CSS

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Características avanzadas
  - Flexbox y Grid para layouts
  - Animaciones y transiciones suaves
  - Glassmorphism con `backdrop-filter`
  - Variables CSS para temas
- **JavaScript ES6+**: Interactividad y animaciones
  - Intersection Observer para scroll animations
  - Event listeners para navegación móvil

### SEO y PWA
- **Meta Tags**: Descripción, keywords, Open Graph
- **Twitter Cards**: Optimización para redes sociales
- **Sitemap**: Generación automática de sitemap.xml
- **Robots.txt**: Configuración para crawlers
- **PWA Manifest**: Configuración para instalación como app

### Herramientas de Desarrollo
- **Google Fonts**: Tipografía Inter para diseño moderno
- **Radix UI**: Componentes UI accesibles y personalizables
- **Playwright**: Testing end-to-end
- **Python**: Testing automatizado con requests/beautifulsoup4

### Testing
- **Playwright**: Tests de interfaz de usuario
- **Python Requests**: Tests de API/HTTP
- **BeautifulSoup4**: Parsing HTML para validación

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js 18+** (para Next.js)
- **pnpm** (recomendado) o npm
- **Git** para control de versiones
- Navegador web moderno

### Instalación y Desarrollo

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/nomdedev/Portfolio.git
   cd Portfolio
   ```

2. **Cambiar a rama main** (principal)
   ```bash
   git checkout main
   ```

3. **Instalar dependencias**
   ```bash
   # Con pnpm (recomendado)
   pnpm install

   # O con npm
   npm install
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   # Con pnpm
   pnpm dev

   # O con npm
   npm run dev
   ```

5. **Abrir en navegador**
   ```
   http://localhost:3000
   ```

### 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm start            # Servidor de producción
npm run lint         # Linting con ESLint

# Con pnpm
pnpm dev             # Servidor de desarrollo
pnpm build           # Build de producción
pnpm start           # Servidor de producción
pnpm lint            # Linting con ESLint
```

## 🌟 Flujo de Trabajo

### Rama Única: `main`
Este proyecto usa una **única rama principal** (`main`) para todo el desarrollo. Esto simplifica el workflow y mantiene todo centralizado.

**Para trabajar en el proyecto:**
```bash
# Sincronizar con el remoto
git pull origin main

# Crear rama de feature para cambios grandes
git checkout -b feature/nueva-funcionalidad

# Después de trabajar, merge a main
git checkout main
git merge feature/nueva-funcionalidad
git push origin main
```

### 🎨 Edición Visual con v0.dev

1. **Importar proyecto**: Ve a [v0.dev](https://v0.dev) → Import Repository
2. **Seleccionar rama**: `main` (única rama disponible)
3. **Framework**: Next.js (auto-detectado)
4. **¡Empieza a editar!**

**Prompts útiles para v0.dev:**
- `"Add a testimonials section with client reviews"`
- `"Create a contact form with validation"`
- `"Add a dark mode toggle"`
- `"Create a blog section with latest posts"`
- `"Add animated background effects"`

## 📱 Secciones del Portfolio

### 1. 🏠 Hero Section
- Nombre, título y línea de posicionamiento ("Convierto datos y modelos de IA en decisiones de negocio")
- Ubicación y CTAs: ver proyectos / descargar CV / contacto
- Links directos a GitHub, LinkedIn y email

### 2. 💼 About Section
- Descripción en 2 párrafos + 3 métricas destacadas (+5 años en datos e IA, 80% reducción de tiempos, docente UNLP)

### 3. 🚀 Projects Section
- 3 proyectos destacados (tenis ATP, fine-tuning LLMs, tradingview-mcp)
- Grilla filtrable por 4 categorías: ML & IA, Trading & Quant, Automatización & Agentes, Productos & Software
- Cada card: título, descripción con contexto de negocio, tags de stack, link a repo (badge "Privado" si no es público)

### 4. 💼 Experience Section
- Timeline vertical: Sumed (2026–hoy), MPS (2023–2025), Nueve de Julio SAT (2021–2023), CTA (2019–2023)

### 5. 🎓 Teaching Section
- Docente de IA, Posgrado Facultad de Ciencias Económicas UNLP (2026–hoy)

### 6. 🛠️ Skills Section
- Chips en 4 grupos: Machine Learning, LLMs & GenAI, Data Engineering, Automatización & Integración

### 7. 📞 Contact Section
- Email, teléfono/WhatsApp, LinkedIn y GitHub + CTAs directos (sin formulario)

### 8. 🔗 Footer
- Navegación secundaria, sociales, copyright con año dinámico

## 🎨 Diseño y UX

### Paleta de Colores
- **Fondo Principal**: `#0f172a` aprox. (oklch oscuro neutro)
- **Acento único**: esmeralda (oklch 0.78 0.17 160) para CTAs y highlights
- **Texto**: `#f9fafb` (White), `#e5e7eb` (Light Gray)

### Tipografía
- **Fuente Principal**: Inter (Google Fonts)
- **Pesos**: 400, 500, 600, 700
- **Tamaños**: Responsive (rem units)

### Animaciones
- **Fade In Up**: Elementos aparecen al hacer scroll
- **Hover Effects**: Transformaciones y sombras en tarjetas
- **Smooth Scroll**: Navegación fluida entre secciones
- **Glassmorphism**: Efectos de desenfoque en elementos fijos

### Responsive Design
- **Mobile First**: Diseño optimizado para móviles primero
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Dropdown Menu**: Menú hamburguesa en dispositivos móviles

## 🔧 SEO y Optimización

### Meta Tags
- Título optimizado para búsqueda
- Descripción meta con palabras clave
- Open Graph para redes sociales
- Twitter Cards para Twitter

### Sitemap
- Generación automática de sitemap.xml
- Incluye todas las páginas del sitio

### Robots.txt
- Configuración para crawlers
- Permite indexación de contenido relevante

### Performance
- Imágenes optimizadas
- CSS crítico en línea
- Animaciones hardware-accelerated
- Fuentes optimizadas

## 🤝 Contribución

Si deseas contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

**Martin Nomdedeu**
- GitHub: [github.com/nomdedev](https://github.com/nomdedev)
- LinkedIn: [linkedin.com/in/martin-nomdedeu](https://linkedin.com/in/martin-nomdedeu)
- Email: [martin.nomdedeu@gmail.com](mailto:martin.nomdedeu@gmail.com)
- Portfolio: [martinnomdedeu.com](https://martinnomdedeu.com)

---

⭐ **Si te gusta este portfolio, ¡dale una estrella!**

Última actualización: Enero 2026
