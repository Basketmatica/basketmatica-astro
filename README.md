# Basketmática

Código de [basketmatica.com](https://basketmatica.com): análisis de datos aplicado al baloncesto.
Sitio estático hecho con [Astro](https://astro.build/), desplegado en GitHub Pages.

## Desarrollo

Requiere Node ≥ 22.12.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/ localmente
```

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/content/articulos/*.md` | Artículos. El nombre del fichero es el slug de la URL. |
| `src/content/pages/sobre-mi.md` | Texto de "Sobre mí". |
| `src/content.config.ts` | Esquema tipado de las colecciones y lista de categorías. |
| `src/pages/` | Rutas: portada, artículos, categorías, herramientas, glosario, archivo, servicios. |
| `src/pages/[...path].astro` | Genera cada artículo en `/AAAA/MM/DD/slug/`. |
| `src/layouts/` | `BaseLayout` (SEO, JSON-LD), `BlogPost`, `ToolLayout`. |
| `src/components/` | Componentes reutilizables (tarjetas, nav, pie, filtros, newsletter…). |
| `src/data/metricas-semana.ts` | Métricas que rotan en la portada. |
| `src/lib/urls.ts` | Rutas de artículos, slugs de categoría, fechas, `isPublished`. |
| `src/consts.ts` | Título, redes sociales, email de contacto. |
| `src/assets/` | Imágenes (Astro las optimiza). Las de un artículo, en `blog/<slug>/`. |
| `public/files/` | Descargables (PDF de ejemplo, XLSX, CSV). |
| `.github/workflows/deploy.yml` | Build y despliegue. |

## Tareas habituales

### Publicar un artículo
1. Crear `src/content/articulos/<slug>.md` con este frontmatter:
   ```yaml
   title: "…"
   description: "140–160 caracteres, escrita a mano"
   pubDate: "2026-12-01T10:00:00.000Z"
   category: "Análisis"        # Análisis | Casos de Uso | Equipos | Eventos | Herramientas | Jugadores
   heroImage: "../../assets/blog/<slug>/hero.jpg"
   heroAlt: "Qué se ve en la imagen"
   draft: false
   ```
2. Imágenes en `src/assets/blog/<slug>/`, con texto alternativo en cada `![…]()`.
3. Fórmulas en `$$…$$` con las macros de siglas (`\FGA`, `\PTS`…, ver `astro.config.mjs`).
4. URL resultante: `/AAAA/MM/DD/<slug>/`. **No cambiar el slug ni la fecha después de publicar.**
5. Con `pubDate` futura (o `draft: true`) el artículo no se publica; el build diario de las 08:00 UTC
   lo publica cuando llega la fecha.
6. Si se revisa a fondo un artículo ya publicado, añadir `updatedDate`.

### Añadir una métrica al glosario
El glosario es el artículo `glosario-de-basketball-analytics.md`, que se renderiza en `/glosario/`.
Cada métrica es un encabezado `####` con Definición, Fórmula, "Es útil para" y enlace a la
ampliación; el índice se genera solo a partir de esos encabezados. Si además debe rotar en la
portada, añadirla al array de `src/data/metricas-semana.ts`.

### Añadir un hilo al archivo
Añadir un objeto al array `threads` de `src/pages/archivo-basketmatica.astro` (fecha, tema,
tipo `concepto` | `caso`, título y URL).

### Añadir una herramienta
1. Crear `src/pages/herramientas/<nombre>.astro` con `ToolLayout` (`appUrl` = app de Streamlit).
2. Añadir su `ToolCard` en `src/pages/herramientas/index.astro`.
3. Si es la destacada, actualizar el bloque "Herramienta destacada" de `src/pages/index.astro`.

Las herramientas actuales (ACB y NBA) son apps de Streamlit embebidas en un iframe; el sitio
no tiene backend.

## Despliegue

Cada push a `main` ejecuta `.github/workflows/deploy.yml` (build con Astro y publicación en
GitHub Pages con Node 22). También se ejecuta a diario (08:00 UTC) para publicar artículos
programados y rotar la métrica de la semana. El dominio se declara en `public/CNAME`.

### URLs heredadas
`astro.config.mjs` mantiene redirecciones de las URLs del blog anterior
(`/categoria/<slug>/` → `/articulos/<slug>/`, `/generador-reportes-nba/` y la antigua
`/2024/09/08/glosario-de-basketball-analytics/`). No se eliminan: hay enlaces externos que
apuntan a ellas.

## SEO

El sitio genera automáticamente sitemap (`/sitemap-index.xml`), `robots.txt`, canonical, Open
Graph / Twitter Card (imagen 1200×630 a partir del `heroImage`), JSON-LD (`WebSite`,
`Organization`, `Person`, `BlogPosting`, `BreadcrumbList`), RSS (`/rss.xml`) y artículos relacionados.

### Alta en buscadores (una sola vez, manual)
1. [Google Search Console](https://search.google.com/search-console): añadir propiedad de **dominio**
   `basketmatica.com` y verificarla con el registro TXT en el DNS.
2. En *Sitemaps*, enviar `https://basketmatica.com/sitemap-index.xml`.
3. En *Inspección de URLs*, solicitar indexación de la portada y de los artículos principales.
4. [Bing Webmaster Tools](https://www.bing.com/webmasters): importar desde Google Search Console.
5. Revisar cada semana *Rendimiento* y *Páginas*.
