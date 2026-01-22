#  ESTRUCTURA DE IMÁGENES DEL PORTFOLIO

Esta carpeta contiene todas las imágenes necesarias para mostrar los proyectos del portfolio de Martin Nomdedeu.

##  Estructura de Directorios

```
img/
├── Rexxus/           # Imágenes de Rexus.app
│   ├── rexus.jpg         # 🖼️ IMAGEN PRINCIPAL - Dashboard
│   ├── rexus.svg         # Placeholder SVG (temporal)
│   ├── rexus1-dashboard.jpg
│   ├── rexus2-usuarios.jpg
│   ├── rexus3-reportes.jpg
│   └── rexus4-api.jpg
├── tsolares/         # Imágenes de Tanques Solares
│   ├── tsolares.jpg      # 🖼️ IMAGEN PRINCIPAL - Diseño del tanque
│   ├── tsolares.svg      # Placeholder SVG (temporal)
│   ├── ts1-fabricacion.jpg
│   ├── ts2-detalleproducto.jpg
│   ├── ts3-productohogar.jpg
│   └── ts4-procesofab.jpg
├── harvesting/       # Imágenes de Máquina Cosechadora
│   ├── harvest1-diseno.jpg
│   ├── harvest2-prototipo.jpg
│   ├── harvest3-pruebas.jpg
│   └── harvest4-componentes.jpg
└── vecinosimple/     # Imágenes de Vecino Simple
    ├── vecinosimple.jpg  # 🖼️ IMAGEN PRINCIPAL - Interfaz de gestión
    ├── vecinosimple.svg  # Placeholder SVG (temporal)
    ├── vecino1-consorcios.jpg
    ├── vecino2-expensas.jpg
    ├── vecino3-reclamos.jpg
    └── vecino4-comunicacion.jpg
```

##  Imágenes Prioritarias (Requeridas)

### 1. Rexxus/rexus.jpg
- **Ubicación**: `/public/img/Rexxus/rexus.jpg`
- **Uso**: Se muestra en la sección de proyectos destacados
- **Contenido**: Dashboard principal de Rexus.app
- **Estado**: Placeholder SVG disponible temporalmente

### 2. vecinosimple/vecinosimple.jpg
- **Ubicación**: `/public/img/vecinosimple/vecinosimple.jpg`
- **Uso**: Se muestra en la sección de proyectos destacados
- **Contenido**: Interfaz de gestión de consorcios
- **Estado**: Placeholder SVG disponible temporalmente

### 3. tsolares/tsolares.jpg
- **Ubicación**: `/public/img/tsolares/tsolares.jpg`
- **Uso**: Se muestra en la sección de proyectos destacados
- **Contenido**: Diseño del tanque solar
- **Estado**: Placeholder SVG disponible temporalmente

##  Especificaciones Técnicas

- **Formato**: JPG o PNG de alta calidad
- **Dimensiones**: Mínimo 800x600px, recomendado 1200x800px
- **Peso**: Máximo 500KB por imagen
- **Estilo**: Profesional, bien iluminado, sin texto superpuesto

##  Próximos Pasos

1. **Agregar las 3 imágenes principales**:
   - `Rexxus/rexus.jpg` (reemplaza rexus.svg)
   - `vecinosimple/vecinosimple.jpg` (reemplaza vecinosimple.svg)
   - `tsolares/tsolares.jpg` (reemplaza tsolares.svg)

2. **Agregar imágenes detalladas** en cada subdirectorio según necesidad

3. **Optimizar imágenes** para web (comprimir sin perder calidad)

4. **Eliminar placeholders SVG** una vez agregadas las imágenes JPG

5. **Probar** que se carguen correctamente en el portfolio

##  Notas Importantes

- Las imágenes principales se referencian desde `components/portfolio/projects.tsx`
- Los placeholders SVG son temporales y se eliminarán al agregar las imágenes reales
- Mantén la estructura de nombres de archivos para compatibilidad automática
