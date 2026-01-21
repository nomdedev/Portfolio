# 🚀 Portfolio de Martin Nomdedeu

Un portfolio web moderno y elegante que showcases proyectos de desarrollo web, ingeniería industrial y soluciones tecnológicas innovadoras.

![Portfolio Preview](./img/minimalist-office.jpg)

## ✨ Características

- **🎨 Diseño Moderno**: Tema oscuro con acentos violetas y efectos glassmorphism
- **📱 Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **⚡ Animaciones Suaves**: Transiciones CSS y animaciones al hacer scroll
- **🔗 Integración Social**: Enlaces directos a LinkedIn y GitHub
- **🛠️ Tecnologías Actuales**: HTML5, CSS3 moderno, JavaScript ES6+

## 🏗️ Arquitectura del Proyecto

```
portfolio/
├── index.html          # Página principal
├── style.css           # Estilos CSS modernos
├── script.js           # JavaScript para interactividad
├── README.md           # Esta documentación
├── test_portfolio_simple.py  # Suite de testing
├── test_results.json   # Resultados de tests
├── playwright.config.js     # Configuración de Playwright
├── tests/              # Directorio de tests
│   └── portfolio_tests.js   # Tests de Playwright
└── img/                # Imágenes del portfolio
    ├── minimalist-office.jpg
    ├── minimalist-office2.jpg
    ├── business-busy-clean-computer.jpg
    └── ...
```

## 🛠️ Tecnologías Utilizadas

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
- Python 3.6+ (para servidor local)
- Navegador web moderno
- Node.js (opcional, para Playwright avanzado)

### Instalación y Ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/nomdedev/Portfolio.git
   cd Portfolio
   ```

2. **Iniciar servidor local**
   ```bash
   python -m http.server 8000
   ```

3. **Abrir en navegador**
   ```
   http://localhost:8000
   ```

## 🧪 Testing

### Tests Automatizados

Ejecutar la suite completa de tests:

```bash
# Tests simplificados (recomendado)
python test_portfolio_simple.py

# Tests con Playwright (requiere configuración adicional)
npx playwright test
```

### Cobertura de Tests

Los tests verifican:
- ✅ Carga correcta de la página principal
- ✅ Estructura HTML válida
- ✅ Archivos CSS y JS accesibles
- ✅ Imágenes existentes
- ✅ Enlaces internos funcionales
- ✅ Contenido de calidad (descripciones, tecnologías)
- ✅ Características modernas (glassmorphism, animaciones)

**Tasa de éxito actual: 76.2%** (16/21 tests pasan)

### Resultados de Tests

Los resultados detallados se guardan en `test_results.json`:

```json
{
  "tests_run": 21,
  "tests_passed": 16,
  "tests_failed": 5,
  "failures": [...]
}
```

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

**Martin Nomdedeu**
- LinkedIn: [linkedin.com/in/martin-nomdedeu](https://www.linkedin.com/in/martin-nomdedeu)
- Email: [Contáctame directamente](#contact)

---

⭐ **Si te gusta este portfolio, ¡dale una estrella!**

Última actualización: Enero 2026
