# 📋 Documentación Técnica - Portfolio Web

## Arquitectura Técnica

### Estructura de Componentes

#### 1. Layout Principal
```html
<body>
  <header class="container">...</header>
  <section id="bckPage" class="container">...</section>
  <section id="services" class="container">...</section>
  <section id="projects" class="container">...</section>
  <section id="about" class="container">...</section>
  <section id="contact" class="container">...</section>
  <footer id="footer" class="container">...</footer>
</body>
```

#### 2. Sistema de Navegación
- **Desktop**: Navegación horizontal fija
- **Móvil**: Menú hamburguesa con animación
- **Scroll**: Header transparente → sólido al hacer scroll

### CSS Architecture

#### Variables CSS Globales
```css
:root {
  --primary-bg: #0f172a;
  --secondary-bg: #1e293b;
  --accent-violet: #8b5cf6;
  --accent-indigo: #6366f1;
  --text-primary: #f9fafb;
  --text-secondary: #e5e7eb;
  --glass-bg: rgba(30, 41, 59, 0.8);
}
```

#### Sistema de Grid
- **Proyectos**: `grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))`
- **Servicios**: Flexbox con `flex-wrap`
- **Responsive**: Breakpoints en 768px y 1024px

### JavaScript Functionality

#### Intersection Observer
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
      }, index * 200);
    }
  });
}, { threshold: 0.1 });
```

#### Event Listeners
- **Burguer Menu**: Toggle classes para menú móvil
- **Scroll Events**: Cambiar opacidad del header
- **Link Clicks**: Cerrar menú móvil automáticamente

## Performance Metrics

### Core Web Vitals (Estimados)
- **LCP (Largest Contentful Paint)**: ~1.2s
- **FID (First Input Delay)**: ~50ms
- **CLS (Cumulative Layout Shift)**: ~0.05

### Bundle Size
- **HTML**: ~15KB (minificado)
- **CSS**: ~25KB (minificado)
- **JavaScript**: ~8KB (minificado)
- **Imágenes**: ~2.5MB (sin optimizar)
- **Total**: ~2.5MB

## Browser Support

### Desktop
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+
- ✅ Samsung Internet 15+

### Características Requeridas
- CSS `backdrop-filter`
- CSS Grid
- CSS Flexbox
- Intersection Observer API
- ES6+ JavaScript

## SEO Optimization

### Meta Tags
```html
<meta name="description" content="Portfolio de Martin Nomdedeu - Desarrollador Web & Ingeniero Mecánico">
<meta name="keywords" content="portfolio, web development, industrial engineering, proyectos">
<meta name="author" content="Martin Nomdedeu">
```

### Structured Data
- Person schema para información personal
- Organization schema para proyectos
- WebSite schema para navegación

### Performance SEO
- Imágenes con `alt` descriptivos
- HTML semántico (`<header>`, `<main>`, `<section>`, `<footer>`)
- Enlaces descriptivos
- URLs limpias

## Accessibility (A11Y)

### Conformidad WCAG 2.1
- **Nivel A**: ✅ Cumple
- **Nivel AA**: ✅ Cumple
- **Nivel AAA**: ⚠️ Parcial

### Características Implementadas
- ✅ Navegación por teclado
- ✅ Contraste de color adecuado (4.5:1 mínimo)
- ✅ Texto alternativo en imágenes
- ✅ Estructura semántica HTML
- ✅ ARIA labels donde necesario
- ✅ Focus indicators visibles

### Herramientas de Testing A11Y
- Lighthouse Accessibility Audit
- WAVE Web Accessibility Evaluation Tool
- axe DevTools

## Security Headers

### Content Security Policy (CSP)
```
default-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
script-src 'self';
```

### Security Headers Recomendados
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Deployment

### Static Hosting Options
1. **GitHub Pages**: Gratuito, integración directa
2. **Netlify**: CDN global, HTTPS automático
3. **Vercel**: Optimizado para SPAs
4. **AWS S3 + CloudFront**: Escalable, económico

### Build Process
```bash
# Minificación (opcional)
npx html-minifier index.html --output index.min.html
npx clean-css-cli style.css --output style.min.css
npx uglify-js script.js --output script.min.js
```

### Environment Variables
```javascript
const config = {
  development: {
    baseURL: 'http://localhost:8000',
    debug: true
  },
  production: {
    baseURL: 'https://nomdedev.github.io/Portfolio',
    debug: false
  }
};
```

## Monitoring & Analytics

### Performance Monitoring
- **Lighthouse CI**: Tests automatizados de performance
- **WebPageTest**: Análisis detallado de carga
- **Google PageSpeed Insights**: Métricas Core Web Vitals

### Error Tracking
```javascript
window.addEventListener('error', (event) => {
  console.error('Error capturado:', event.error);
  // Enviar a servicio de monitoring
});
```

### User Analytics
- **Google Analytics 4**: Comportamiento de usuarios
- **Hotjar**: Heatmaps y session recordings
- **Microsoft Clarity**: Análisis gratuito

## Future Enhancements

### Planned Features
- [ ] Modo claro/oscuro toggle
- [ ] Internacionalización (i18n)
- [ ] PWA capabilities
- [ ] Blog integrado
- [ ] Formulario de contacto funcional
- [ ] Animaciones más avanzadas (GSAP)

### Technical Debt
- [ ] Optimizar imágenes (WebP, lazy loading)
- [ ] Implementar CSS custom properties más extenso
- [ ] Añadir tests de integración completos
- [ ] Mejorar performance en dispositivos móviles

## Troubleshooting

### Problemas Comunes

#### 1. Animaciones no funcionan
**Síntomas**: Elementos no aparecen al hacer scroll
**Solución**: Verificar soporte de Intersection Observer
```javascript
if (!('IntersectionObserver' in window)) {
  // Fallback para navegadores antiguos
}
```

#### 2. Glassmorphism no se ve
**Síntomas**: Fondos transparentes sin blur
**Solución**: Verificar soporte de `backdrop-filter`
```css
@supports not (backdrop-filter: blur(10px)) {
  .glassmorphism {
    background: rgba(30, 41, 59, 0.95);
  }
}
```

#### 3. Fuentes no cargan
**Síntomas**: Texto en fuente serif
**Solución**: Verificar conexión a Google Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

## Contributing Guidelines

### Code Style
- **HTML**: 2 espacios de indentación
- **CSS**: BEM methodology, propiedades ordenadas alfabéticamente
- **JavaScript**: ESLint con configuración estándar

### Commit Messages
```
feat: add new project section
fix: resolve mobile menu animation
docs: update README with deployment instructions
style: format CSS with prettier
test: add accessibility tests
```

### Pull Request Process
1. Crear issue describiendo el cambio
2. Crear branch desde `main`
3. Implementar cambios con tests
4. Ejecutar suite completa de tests
5. Crear PR con descripción detallada
6. Code review y merge

---

*Documentación actualizada: Enero 2026*