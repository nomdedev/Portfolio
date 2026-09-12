# Contexto del Proyecto - Portfolio Martín Nomdedeu

## Información General

Este documento contiene toda la información contextual necesaria para entender y trabajar en el portfolio de Martín Nomdedeu.

### Información Personal
- **Nombre**: Martín Nomdedeu
- **Título**: Ingeniero Electromecánico, Product Manager & Technical Leader
- **Email**: martin.nomdedeu.dev@gmail.com
- **LinkedIn**: https://linkedin.com/in/martin-nomdedeu
- **GitHub**: https://github.com/nomdedev
- **URL del Portfolio**: https://martinnomdedeu.com

### Descripción Profesional
Portfolio profesional que showcases proyectos de desarrollo web, ingeniería industrial y soluciones tecnológicas innovadoras. Especializado en transformación digital, optimización operativa y desarrollo de productos.

## Stack Tecnológico

### Framework Principal
- **Next.js 15**: Framework React con App Router para aplicaciones web modernas
- **React 18**: Biblioteca JavaScript para interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript para mayor seguridad de tipos

### Estilos y UI
- **Tailwind CSS**: Framework de utilidades CSS para diseño rápido
- **Radix UI**: Componentes UI accesibles y personalizables
- **CSS3**: Características avanzadas (Flexbox, Grid, Animaciones, Glassmorphism)

### SEO y PWA
- **Meta Tags**: Optimización para motores de búsqueda
- **Open Graph**: Optimización para redes sociales
- **Twitter Cards**: Optimización para Twitter
- **Sitemap**: Generación automática de sitemap.xml
- **Robots.txt**: Configuración para crawlers
- **PWA Manifest**: Configuración para instalación como aplicación

### Testing
- **Playwright**: Testing end-to-end de interfaces de usuario
- **Python Requests**: Tests de API/HTTP
- **BeautifulSoup4**: Parsing HTML para validación

## Estructura del Proyecto

### Directorio `app/`
Directorio principal de Next.js App Router.

#### `app/layout.tsx`
Layout principal de la aplicación que incluye:
- Meta tags SEO (título, descripción, Open Graph, Twitter Cards)
- Configuración de fuentes (Inter de Google Fonts)
- ThemeProvider para gestión de tema
- Estructura HTML base
- Importación de estilos globales

#### `app/page.tsx`
Página principal que importa y renderiza todos los componentes del portfolio en orden:
1. Navigation
2. Hero
3. About
4. Experience
5. Projects
6. Contact
7. Footer
8. SideElements

#### `app/globals.css`
Estilos globales que incluyen:
- Variables CSS para colores y temas
- Estilos base para HTML
- Utilidades personalizadas
- Animaciones y transiciones

#### `app/sitemap.ts`
Generación automática de sitemap.xml para SEO con todas las páginas del sitio.

### Directorio `components/portfolio/`
Componentes específicos del portfolio.

#### `components/portfolio/navigation.tsx`
Navegación sticky header que incluye:
- Logo/nombre del portfolio
- Links a secciones (About, Experience, Projects, Contact)
- Dropdown menu para dispositivos móviles
- Smooth scroll al navegar
- Efectos de hover en links

#### `components/portfolio/hero.tsx`
Sección Hero con:
- Nombre y título profesional
- Descripción breve
- Botones CTA (View Projects, Download CV)
- Fondo con efectos glassmorphism
- Animaciones de entrada

#### `components/portfolio/about.tsx`
Sección About que incluye:
- Descripción personal y profesional
- 6 categorías de skills:
  - Frontend Development
  - Backend Development
  - DevOps & Cloud
  - Project Management
  - Data & Analytics
  - Soft Skills
- Datos de contacto (email, LinkedIn, GitHub)
- Imagen de perfil

#### `components/portfolio/experience.tsx`
Sección Experience con timeline de 4 posiciones:
- Cargo y empresa
- Período de tiempo
- Descripción de responsabilidades
- Logros y tecnologías
- Diseño vertical con línea temporal

#### `components/portfolio/projects.tsx`
Sección Projects con grid de 4 proyectos:
1. **Rexxus** - Plataforma web empresarial
2. **Tanques Solares** - Desarrollo de tanques solares
3. **Vecino Simple** - Aplicación de gestión comunitaria
4. **Harvesting Machine** - Diseño de máquina cosechadora

Cada proyecto incluye:
- Imagen representativa
- Título y descripción
- Tecnologías utilizadas
- Enlace a demo/repositorio

#### `components/portfolio/contact.tsx`
Sección Contact con:
- Formulario de contacto funcional
- Enlaces directos a redes sociales
- Botones CTA para contacto directo
- Información de contacto completa

#### `components/portfolio/footer.tsx`
Footer con:
- Enlaces a redes sociales (GitHub, LinkedIn)
- Enlace de email
- Información de copyright
- Navegación rápida a secciones

#### `components/portfolio/side-elements.tsx`
Elementos fijos laterales con:
- Enlace a GitHub
- Enlace a LinkedIn
- Email directo
- Efectos hover y tooltips
- Posicionamiento fijo a la derecha

### Directorio `public/`
Archivos estáticos del proyecto.

#### `public/cv.pdf`
CV descargable en formato PDF.

#### `public/img/`
Directorio de imágenes de proyectos organizadas por proyecto:
- `harvesting/` - Imágenes del proyecto Harvesting Machine
- `Rexxus/` - Imágenes del proyecto Rexxus
- `tsolares/` - Imágenes del proyecto Tanques Solares
- `vecinosimple/` - Imágenes del proyecto Vecino Simple

#### `public/manifest.json`
PWA manifest para instalación como aplicación:
- Nombre de la aplicación
- Iconos de diferentes tamaños
- Colores del tema
- Configuración de pantalla inicial

#### `public/robots.txt`
Configuración para crawlers de motores de búsqueda.

### Directorio `components/`
Componentes generales.

#### `components/theme-provider.tsx`
Provider de tema para gestión del tema oscuro/claro.

#### `components/ui/`
Componentes UI de Radix UI reutilizables.

### Directorio `lib/`
Utilidades y funciones helper.

#### `lib/utils.ts`
Funciones helper para:
- Manejo de clases CSS (cn)
- Otras utilidades comunes

### Directorio `tests/`
Tests automatizados del proyecto.

#### `tests/cv-test.spec.ts`
Tests para verificar el CV:
- Disponibilidad del archivo CV
- Validación del formato
- Verificación de enlaces

#### `tests/redirect-test.spec.ts`
Tests para verificar redirecciones:
- Redirecciones correctas
- Códigos de estado HTTP
- URLs destino

## Secciones del Portfolio

### 1. Hero Section
**Propósito**: Presentación inicial del profesional

**Contenido**:
- Nombre completo
- Título profesional
- Descripción breve (2-3 líneas)
- Botones CTA:
  - "View Projects" - Scroll a sección Projects
  - "Download CV" - Descarga del CV en PDF

**Diseño**:
- Fondo con efecto glassmorphism
- Tipografía grande y destacada
- Animaciones de entrada suaves

### 2. About Section
**Propósito**: Información personal y profesional detallada

**Contenido**:
- Descripción personal (2-3 párrafos)
- 6 categorías de skills con listas de tecnologías:
  - **Frontend**: React, Next.js, TypeScript, Tailwind CSS, etc.
  - **Backend**: Node.js, Python, PostgreSQL, MongoDB, etc.
  - **DevOps & Cloud**: AWS, Docker, CI/CD, etc.
  - **Project Management**: Agile, Scrum, Jira, etc.
  - **Data & Analytics**: Python, SQL, Tableau, etc.
  - **Soft Skills**: Liderazgo, comunicación, resolución de problemas, etc.
- Datos de contacto:
  - Email con mailto link
  - LinkedIn con enlace directo
  - GitHub con enlace directo

**Diseño**:
- Layout de dos columnas (texto + imagen)
- Skills en grid de 2x3
- Iconos para cada categoría de skills

### 3. Experience Section
**Propósito**: Timeline de experiencia profesional

**Contenido**:
- 4 posiciones en formato timeline:
  1. **Cargo más reciente** (actual)
  2. **Cargo anterior**
  3. **Cargo anterior**
  4. **Cargo inicial**

Cada posición incluye:
- Título del cargo
- Nombre de la empresa
- Período (mes/año - presente o mes/año - mes/año)
- Descripción de responsabilidades (3-5 bullets)
- Logros destacados (2-3 bullets)
- Tecnologías utilizadas

**Diseño**:
- Timeline vertical con línea continua
- Tarjetas para cada posición
- Efectos hover en tarjetas
- Animaciones al hacer scroll

### 4. Projects Section
**Propósito**: Showcase de proyectos destacados

**Contenido**:
- Grid de 2 columnas responsivo
- 4 proyectos principales:

1. **Rexxus**
   - Descripción: Plataforma web empresarial para gestión de procesos
   - Tecnologías: Next.js, React, TypeScript, PostgreSQL
   - Enlace: Demo o repositorio

2. **Tanques Solares**
   - Descripción: Desarrollo de tanques solares para calentamiento de agua
   - Tecnologías: CAD, Ingeniería Mecánica, Normas ISO
   - Enlace: Documentación técnica

3. **Vecino Simple**
   - Descripción: Aplicación de gestión comunitaria para vecindarios
   - Tecnologías: React, Node.js, MongoDB
   - Enlace: Demo o repositorio

4. **Harvesting Machine**
   - Descripción: Diseño de máquina cosechadora industrial
   - Tecnologías: CAD, Ingeniería Industrial, Normas ISO
   - Enlace: Documentación técnica

**Diseño**:
- Grid de 2 columnas en desktop, 1 columna en móvil
- Tarjetas con imagen, título, descripción y tecnologías
- Efectos hover con transformación y sombra
- Botones para ver detalles

### 5. Contact Section
**Propósito**: Información de contacto y formulario

**Contenido**:
- Formulario de contacto con:
  - Nombre
  - Email
  - Asunto
  - Mensaje
  - Botón de envío
- Enlaces directos:
  - LinkedIn
  - GitHub
  - Email
- Botones CTA:
  - "Send Message"
  - "Connect on LinkedIn"
  - "View GitHub Profile"

**Diseño**:
- Layout de dos columnas (formulario + enlaces)
- Formulario con validación
- Iconos para cada red social

### 6. Footer
**Propósito**: Información adicional y navegación

**Contenido**:
- Enlaces a redes sociales:
  - GitHub
  - LinkedIn
  - Email
- Navegación rápida:
  - About
  - Experience
  - Projects
  - Contact
- Información de copyright

**Diseño**:
- Fondo oscuro consistente
- Iconos para redes sociales
- Links con efectos hover

### 7. Side Elements
**Propósito**: Acceso rápido a redes sociales

**Contenido**:
- Icono de GitHub (enlace a perfil)
- Icono de LinkedIn (enlace a perfil)
- Icono de Email (mailto link)

**Diseño**:
- Posicionamiento fijo a la derecha
- Efectos hover con tooltips
- Visible en desktop, oculto en móvil

## Características del Sitio

### Responsive Design
- **Mobile First**: Diseño optimizado para móviles primero
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Grid System**: Grid de 2 columnas para proyectos en desktop, 1 columna en móvil
- **Typography**: Tamaños de fuente responsivos

### Dark Mode
- Tema oscuro por defecto
- Colores optimizados para lectura en modo oscuro
- Alto contraste para accesibilidad
- Consistencia en toda la aplicación

### Animaciones
- **Fade In Up**: Elementos aparecen al hacer scroll
- **Hover Effects**: Transformaciones y sombras en tarjetas y botones
- **Smooth Scroll**: Navegación fluida entre secciones
- **Glassmorphism**: Efectos de desenfoque en elementos fijos

### SEO Optimizado
- **Meta Tags**: Título, descripción, keywords
- **Open Graph**: Optimización para Facebook, LinkedIn
- **Twitter Cards**: Optimización para Twitter
- **Sitemap**: Generación automática de sitemap.xml
- **Robots.txt**: Configuración para crawlers
- **Semantic HTML**: Estructura semántica para mejor indexación

### Performance
- **Imágenes Optimizadas**: Formatos webp, lazy loading
- **CSS Crítico**: Estilos críticos en línea
- **Animaciones Hardware-Accelerated**: Uso de transform y opacity
- **Fuentes Optimizadas**: Google Fonts con display swap

## Comandos Disponibles

### Desarrollo
```bash
npm run dev          # Iniciar servidor de desarrollo (localhost:3000)
pnpm dev             # Iniciar servidor de desarrollo con pnpm
```

### Producción
```bash
npm run build        # Construir para producción
pnpm build           # Construir para producción con pnpm
npm start            # Iniciar servidor de producción
pnpm start           # Iniciar servidor de producción con pnpm
```

### Linting
```bash
npm run lint         # Ejecutar linter ESLint
pnpm lint            # Ejecutar linter con pnpm
```

### Testing
```bash
npm test             # Ejecutar tests
pnpm test            # Ejecutar tests con pnpm
```

## Paleta de Colores

### Colores Principales
- **Fondo Principal**: `#0f172a` (Slate 900)
- **Fondo Secundario**: `#1e293b` (Slate 800)
- **Texto Principal**: `#f9fafb` (Gray 50)
- **Texto Secundario**: `#e5e7eb` (Gray 200)

### Acentos
- **Violeta**: `#8b5cf6` (Violet 500)
- **Índigo**: `#6366f1` (Indigo 500)
- **Violeta Hover**: `#7c3aed` (Violet 600)
- **Índigo Hover**: `#4f46e5` (Indigo 600)

### Glassmorphism
- **Fondo**: `rgba(30, 41, 59, 0.8)`
- **Backdrop Filter**: `blur(10px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`

## Tipografía

### Fuente Principal
- **Nombre**: Inter
- **Fuente**: Google Fonts
- **Pesos**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Tamaños de Fuente
- **H1**: 2.5rem (40px) - Hero title
- **H2**: 2rem (32px) - Section titles
- **H3**: 1.5rem (24px) - Card titles
- **Body**: 1rem (16px) - Body text
- **Small**: 0.875rem (14px) - Small text

## Iconografía

### Fuentes de Iconos
- **Radix Icons**: Iconos de Radix UI
- **Lucide Icons**: Iconos adicionales si es necesario

### Iconos Utilizados
- GitHub
- LinkedIn
- Email
- Arrow Down
- External Link
- Download
- Menu (hamburguesa)
- Close

## Prácticas de Desarrollo

### Convenciones de Código
- **TypeScript**: Tipado estricto para todos los componentes
- **Componentes**: Funcionales con hooks
- **Estilos**: Tailwind CSS para estilos, CSS modules para estilos específicos
- **Nombres**: camelCase para variables/funciones, PascalCase para componentes

### Git Workflow
- **Rama Principal**: `main`
- **Branching**: Crear branches de feature para cambios grandes
- **Commits**: Mensajes descriptivos en presente (ej: "Add contact form")
- **Pull Requests**: Revisión de código antes de merge

### Testing
- **Unit Tests**: Para funciones helper y componentes pequeños
- **Integration Tests**: Para flujos de usuario
- **E2E Tests**: Para pruebas completas del sitio

## Deployment

### Plataforma
- **Vercel**: Deploy automático desde GitHub

### Configuración
- **Environment Variables**: Configuradas en Vercel
- **Domain**: martinnomdedeu.com
- **SSL**: Certificado SSL automático

### Proceso de Deploy
1. Push a rama `main`
2. Vercel detecta cambios
3. Build automático
4. Deploy a producción

## Mantenimiento

### Actualizaciones Regulares
- **Dependencias**: Actualizar mensualmente
- **Seguridad**: Revisar vulnerabilidades con `npm audit`
- **Contenido**: Actualizar proyectos y experiencia periódicamente

### Monitoreo
- **Analytics**: Google Analytics 4
- **Performance**: Core Web Vitals
- **SEO**: Search Console

## Recursos Adicionales

### Documentación
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)

### Herramientas
- [v0.dev](https://v0.dev) - Edición visual
- [Vercel](https://vercel.com) - Hosting
- [GitHub](https://github.com) - Control de versiones

---

Última actualización: Enero 2026
