# Martín Nomdedeu - Portfolio

Portfolio de Martín Nomdedeu - Ingeniero Electromecánico, Product Manager & Technical Leader especializado en transformación digital, optimización operativa y desarrollo de productos.

Un portfolio web moderno y elegante construido con Next.js 15, React, TypeScript y Tailwind CSS que showcases proyectos de desarrollo web, ingeniería industrial y soluciones tecnológicas innovadoras.

## 🌐 Información del Proyecto

### 🚀 Versión Principal
- **Rama**: `main` (única rama)
- **Framework**: Next.js 15 + TypeScript
- **UI Components**: Radix UI + Tailwind CSS
- **Deployment**: Vercel automático
- **Edición Visual**: Compatible con v0.dev

## ✨ Características Destacadas

- **🎨 Diseño Moderno**: Tema oscuro con acentos violetas y efectos glassmorphism
- **📱 Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **⚡ Animaciones Suaves**: Transiciones CSS y animaciones al hacer scroll
- **🖼️ Galerías Interactivas**: Visualización detallada de proyectos con múltiples imágenes
- **🔗 Integración Social**: Enlaces directos a LinkedIn y GitHub
- **🛠️ Tecnologías Actuales**: Next.js 15, TypeScript, Tailwind CSS, Radix UI

## 📁 Estructura de Imágenes

```
img/
├── tsolares/           # Proyecto Tanques Solares
│   ├── ts1-fabricacion.jpg
│   ├── ts2-detalleproducto.jpg
│   ├── ts3-productohogar.jpg
│   └── ts4-procesofab.jpg
├── harvesting/         # Proyecto Máquina Cosechadora
├── Rexxus/            # Proyectos Web
├── vecinosimple/      # Proyecto Vecino Simple
└── [otras imágenes]
```

## 🏗️ Arquitectura del Proyecto

```
portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── sitemap.ts         # Sitemap para SEO
├── components/            # Componentes React
│   ├── portfolio/         # Componentes del portfolio
│   │   ├── navigation.tsx
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── experience.tsx
│   │   ├── projects.tsx
│   │   ├── contact.tsx
│   │   ├── footer.tsx
│   │   └── side-elements.tsx
│   ├── theme-provider.tsx
│   └── ui/                # Componentes UI (Radix)
├── lib/                   # Utilidades
│   └── utils.ts
├── public/                # Archivos estáticos
│   ├── img/              # Imágenes del portfolio
│   └── icons/            # Iconos y favicons
├── styles/               # Estilos adicionales
├── tests/                # Tests automatizados
└── [config files]        # next.config.mjs, tsconfig.json, etc.
```

## 🛠️ Tecnologías Utilizadas

### Framework y Stack Principal
- **Next.js 15**: Framework React para aplicaciones web modernas
- **React 18**: Biblioteca JavaScript para interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework de utilidades CSS

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Características avanzadas
  - Flexbox y Grid para layouts
  - Animaciones y transiciones
  - Glassmorphism con `backdrop-filter`
  - Variables CSS para temas
- **JavaScript ES6+**: Interactividad y animaciones
  - Intersection Observer para scroll animations
  - Event listeners para navegación móvil

### Herramientas de Desarrollo
- **Google Fonts**: Tipografía Inter para diseño moderno
- **Icons8**: Iconografía profesional
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
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # Linting con ESLint

# Testing (futuro)
pnpm test         # Ejecutar tests
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

### � Verificación del Proyecto

Este proyecto incluye scripts de verificación para asegurar que todo esté configurado correctamente:

#### Para Windows PowerShell:
```powershell
.\check_main.ps1
```

#### Para Windows Command Prompt:
```batch
check_main.bat
```

### Qué Verifican los Scripts:

- ✅ Rama actual (debe ser `main`)
- ✅ Versión de Next.js instalada
- ✅ Archivos requeridos presentes (`app/`, `components/`, configuración)
- ✅ Servidor de desarrollo corriendo
- ✅ Instrucciones paso a paso para importar a v0.dev

## 📱 Secciones del Portfolio

### 🏠 Hero Section (bckPage)
- Presentación personal con animaciones de texto
- Fondo animado con gradientes violetas
- Llamado a acción para ver proyectos

### 💼 Servicios (Services)
- Diseño de sitios web para empresas
- Experiencia de usuario optimizada
- Herramientas de administración
- Análisis de datos

### 🚀 Proyectos (Projects)
Proyectos destacados:

1. **Solar Water Tanks** - Desarrollo de tanques solares
   - Tecnologías: CAD, Ingeniería Mecánica
   - Enlace: [Drive Link](https://drive.google.com/file/d/...)

2. **Harvesting Machine** - Diseño de máquina cosechadora
   - Tecnologías: CAD, Normas ISO
   - Enlace: [Drive Link](https://drive.google.com/file/d/...)

3. **Industrial Gas Tank** - Diseño de tanque industrial
   - Tecnologías: CAD, Ingeniería Industrial
   - Enlace: [Drive Link](https://drive.google.com/file/d/...)

### 👨‍💻 Sobre Mí (About)
- Información personal y profesional
- Imagen de perfil con efectos visuales
- Enlaces a contacto

### 📞 Contacto (Contact)
- Información de contacto directa
- Enlaces a LinkedIn
- Formas múltiples de comunicación

### 🔗 Footer
- Enlaces sociales (GitHub, LinkedIn)
- Información de copyright

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
- **Fade In Up**: Proyectos aparecen al hacer scroll
- **Hover Effects**: Transformaciones y sombras
- **Text Reveal**: Animación de título principal
- **Background Shift**: Gradientes animados

## 🔧 Desarrollo y Mantenimiento

### Estructura de Archivos
- `index.html`: Contenido y estructura
- `style.css`: Estilos y diseño visual
- `script.js`: Funcionalidad interactiva

### Mejores Prácticas Implementadas
- ✅ HTML semántico
- ✅ CSS modular y mantenible
- ✅ JavaScript no obstructivo
- ✅ Imágenes optimizadas
- ✅ Enlaces accesibles
- ✅ Diseño responsivo
- ✅ Testing automatizado

### Optimizaciones de Performance
- CSS crítico en línea
- Imágenes lazy-loaded
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
- Email: [martin.nomdedeu@gmail.com](mailto:martin.nomdedeu@gmail.com)

---

## 📚 Recursos Adicionales

### 🎯 Guía de Marketing Digital
Para optimizar tu portfolio y estrategia de marketing profesional, consulta nuestra **[Guía Definitiva de Portfolios y Marketing Digital](PORTFOLIO_MARKETING_GUIDE.md)** que incluye:

- Estrategias de posicionamiento de marca personal
- Optimización SEO para profesionales
- Diseño de portfolios que convierten
- Content marketing para técnicos
- Analytics y A/B testing
- Casos de éxito reales

### 📋 Checklist de Optimización
- [ ] **SEO Técnico**: Meta tags, schema markup, Core Web Vitals
- [ ] **Contenido**: Casos de estudio con métricas cuantificables
- [ ] **Social Proof**: Testimonials y logos de clientes
- [ ] **Conversiones**: CTAs estratégicos y formularios optimizados
- [ ] **Analytics**: Google Analytics 4 y heatmaps configurados

---

⭐ **Si te gusta este portfolio, ¡dale una estrella!**

Última actualización: Enero 2026
#   F o r c e   r e d e p l o y   w i t h   G e i s t   f o n t s 
 
 