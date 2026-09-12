# Diagramas de flujo (archify)

Cada proyecto puede tener un **diagrama de flujo interactivo** que explica, de forma general, qué proceso resuelve y cómo lo resuelve. Se genera con la skill **archify** y se embebe solo en la ficha.

## Estructura

```
diagrams-src/<slug>.workflow.json   ← fuente (spec de archify)
public/diagrams/<slug>.html         ← artefacto entregado (HTML autocontenido)
```

El `<slug>` es el mismo de `lib/projects.ts`. El diagrama se toma de los pasos reales de cada proyecto (`howItWorksEs`), más dos tarjetas de contexto: **Problema** (de `descriptionEs`) y **Solución** (de `featuresEs`).

## Cómo se embebe

`lib/project-images.ts#getProjectDiagram(slug)` detecta `public/diagrams/<slug>.html` en build time. Si existe, la ficha muestra la sección **"Flujo del proceso"** (iframe `loading="lazy"` con `?embed=1&theme=dark`) y la suma al índice de la página. Si no existe, no se muestra nada. **No hace falta tocar código** al agregar o sacar un diagrama.

## Crear o editar un diagrama

1. Editá el spec en `diagrams-src/<slug>.workflow.json`.
2. Validá (showcase exige 9/9 checks, 0 errores, 0 warnings):

   ```bash
   node bin/archify.mjs validate workflow <spec.json> --quality showcase --json
   ```

3. Entregá el HTML:

   ```bash
   node bin/archify.mjs deliver workflow <spec.json> public/diagrams/<slug>.html --quality showcase --json
   ```

   Los comandos corren desde el directorio de la skill archify.

## Reglas de autoría

- Un solo camino principal claro; nodos con label corto (≤ ~22 caracteres) y `width: 190`.
- Máximo 6 nodos en el camino principal (columnas 0..5).
- Las tarjetas llevan el detalle largo, no los nodos.
- `meta.quality_profile: "showcase"`.

## Notas

- **Idioma**: el contenido es español. La UI fija del viewer no soporta `es`, así que su interfaz cae a inglés (limitación del renderer, no del contenido).
- **Peso**: cada HTML pesa ~700 KB (incluye todo el runtime del viewer). Están lazy-loaded, pero suman ~14 MB en el repo entre todos. Si molesta, se pueden dejar solo para los proyectos destacados.
