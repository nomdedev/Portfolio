# Martín Nomdedeu - Portfolio

Portfolio de Martín Nomdedeu - Ingeniero Electromecánico, Product Manager & Technical Leader especializado en transformación digital, optimización operativa y desarrollo de productos.

Un portfolio web moderno y elegante construido con Next.js 15, React 18, TypeScript y Tailwind CSS que showcases proyectos de desarrollo web, ingeniería industrial y soluciones tecnológicas innovadoras.

## 🌐 Información del Proyecto

### 🚀 Versión Principal
- **Rama**: `main` (única rama)
- **Framework**: Next.js 15 + React 18 + TypeScript
- **UI Components**: Radix UI + Tailwind CSS
- **Deployment**: Vercel automático
- **URL del Portfolio**: https://martinnomdedeu.com

### 👤 Información Personal
- **Nombre**: Martín Nomdedeu
- **Título**: Ingeniero Electromecánico, Product Manager & Technical Leader
- **Email**: martin.nomdedeu.dev@gmail.com
- **LinkedIn**: https://linkedin.com/in/martin-nomdedeu
- **GitHub**: https://github.com/nomdedev

## ✨ Características Destacadas

- **🎨 Diseño Moderno**: Tema oscuro por defecto con acentos violetas y efectos glassmorphism
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
- Presentación personal con nombre y título
- Descripción profesional breve
- Botones CTA para ver proyectos y descargar CV
- Fondo con diseño glassmorphism

### 2. 💼 About Section
- Descripción personal y profesional detallada
- 6 categorías de skills organizadas:
  - Frontend Development
  - Backend Development
  - DevOps & Cloud
  - Project Management
  - Data & Analytics
  - Soft Skills
- Datos de contacto directos (email, LinkedIn, GitHub)
- Imagen de perfil con efectos visuales

### 3. 🚀 Experience Section
- Timeline de experiencia profesional
- 4 posiciones destacadas con:
  - Cargo y empresa
  - Período de tiempo
  - Descripción de responsabilidades
  - Logros y tecnologías utilizadas

### 4. 🎨 Projects Section
- Grid de 2 columnas responsivo
- 4 proyectos principales:
  1. **Rexxus** - Plataforma web empresarial
  2. **Tanques Solares** - Desarrollo de tanques solares
  3. **Vecino Simple** - Aplicación de gestión comunitaria
  4. **Harvesting Machine** - Diseño de máquina cosechadora
- Cada proyecto incluye:
  - Imagen representativa
  - Título y descripción
  - Tecnologías utilizadas
  - Enlace a demo/repositorio

### 5. 📞 Contact Section
- Formulario de contacto funcional
- Enlaces directos a redes sociales
- Botones CTA para contacto directo
- Información de contacto completa

### 6. 🔗 Footer
- Enlaces a redes sociales (GitHub, LinkedIn)
- Enlace de email
- Información de copyright
- Navegación rápida a secciones

### 7. 📌 Side Elements
- Elementos fijos laterales con:
  - Enlace a GitHub
  - Enlace a LinkedIn
  - Email directo
- Efectos hover y tooltips

## 🎨 Diseño y UX

### Paleta de Colores
- **Fondo Principal**: `#0f172a` (Dark Slate)
- **Acentos**: `#8b5cf6` (Violet), `#6366f1` (Indigo)
- **Texto**: `#f9fafb` (White), `#e5e7eb` (Light Gray)
- **Glassmorphism**: `rgba(30, 41, 59, 0.8)` con `backdrop-filter: blur(10px)`

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

**Martín Nomdedeu**
- GitHub: [github.com/nomdedev](https://github.com/nomdedev)
- LinkedIn: [linkedin.com/in/martin-nomdedeu](https://linkedin.com/in/martin-nomdedeu)
- Email: [martin.nomdedeu.dev@gmail.com](mailto:martin.nomdedeu.dev@gmail.com)
- Portfolio: [martinnomdedeu.com](https://martinnomdedeu.com)

---

⭐ **Si te gusta este portfolio, ¡dale una estrella!**

Última actualización: Enero 2026
