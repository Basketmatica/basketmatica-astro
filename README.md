# Basketmática

Código de [basketmatica.com](https://basketmatica.com): análisis de datos aplicado al baloncesto.
Sitio estático hecho con [Astro](https://astro.build/), desplegado en GitHub Pages.

## Desarrollo

Requiere Node ≥ 22.23.4 (`.nvmrc` fija la 22).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # genera dist/
npm run preview      # sirve dist/ localmente
npm run check        # astro check: tipos y plantillas
npm run check:links  # comprueba enlaces/imágenes/anclas internas sobre dist/
npm run verify       # check + build + check:links (lo mismo que hace el CI)
```

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/content/articulos/*.md` | Artículos. El nombre del fichero es el slug de la URL. También admite `.mdx`. |
| `src/content/pages/` | `sobre-mi.md` y `glosario.md` (el glosario, que se renderiza en `/glosario/`). |
| `src/content.config.ts` | Esquema tipado de las colecciones y lista de categorías. |
| `src/pages/` | Rutas: portada, artículos, categorías, herramientas, glosario, archivo, datos, servicios, buscar. |
| `src/pages/[...path].astro` | Genera cada artículo en `/AAAA/MM/DD/slug/`. |
| `src/pages/search-index.json.ts` | Índice estático del buscador (`/buscar/`): artículos, glosario, herramientas, hilos y páginas. |
| `src/layouts/` | `BaseLayout` (SEO, JSON-LD, tema, analítica), `BlogPost`, `ToolLayout`. |
| `src/components/` | Componentes (tarjetas, nav, pie, `Icon`, `CategoryFilters`, `ShareLinks`, `IntervalChart`, newsletter…). |
| `src/data/` | `herramientas.ts` (listado de herramientas), `hilos.ts` (archivo de hilos), `metricas-semana.ts`. |
| `src/lib/` | `urls.ts` (rutas, categorías, `isPublished`), `articles.ts` (listado, tiempo de lectura), `glosario.ts` (términos del glosario), `text.ts`. |
| `src/consts.ts` | Título, redes sociales, email, newsletter, código de analítica. |
| `src/styles/` | `tokens.css` (paleta clara y oscura), `global.css`. |
| `src/assets/` | Imágenes (Astro las optimiza). Las de un artículo, en `blog/<slug>/`. |
| `public/files/` | Descargables (PDF de ejemplo, XLSX, CSV). |
| `scripts/check-links.mjs` | Comprobador de enlaces internos. |
| `.github/workflows/deploy.yml` | CI: tipos, build, enlaces y despliegue. `.github/dependabot.yml`: actualizaciones. |

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
Editar `src/content/pages/glosario.md`. Cada métrica es un encabezado `####` con
`**Definición:**`, Fórmula, "Es útil para" y enlace a la ampliación. De ahí salen solos el índice,
el buscador de métricas, los datos estructurados (`DefinedTerm`) y el índice de `/buscar/`.
Para que además rote como "Métrica de la semana", añadirla al array de `src/data/metricas-semana.ts`:
el build falla si el nombre no coincide con una ficha del glosario (así nunca se desincronizan).

### Añadir un hilo al archivo
Añadir un objeto al array `threads` de `src/data/hilos.ts` (fecha, tema, tipo `concepto` | `caso`,
título y URL). La página del archivo, la portada y el buscador lo recogen solos.

### Añadir una herramienta
1. Crear `src/pages/herramientas/<slug>.astro` con `ToolLayout` (`appUrl` = app de Streamlit).
2. Añadirla a `src/data/herramientas.ts`: el listado, el buscador y el resto salen de ahí.
3. Si es la destacada, actualizar el bloque "Herramienta destacada" de `src/pages/index.astro`.

Las herramientas actuales (ACB y NBA) son apps de Streamlit embebidas en un iframe; el sitio
no tiene backend.

### Tema claro / oscuro
Sigue la preferencia del sistema y el visitante puede forzarlo con el botón del menú (se recuerda).
Todos los colores son tokens de `src/styles/tokens.css`: en componentes usar siempre `var(--…)`
(`--brand`, `--surface`, `--on-brand`, `--accent-600`…), nunca colores fijos.

### Analítica (opcional, sin cookies)
Está desactivada. Para activarla: crear una cuenta gratuita en [GoatCounter](https://www.goatcounter.com),
y poner el código del sitio en `GOATCOUNTER_CODE` de `src/consts.ts`. Cuenta también las navegaciones internas.

### Gráficos
`src/components/IntervalChart.astro` dibuja en SVG (sin JS) un gráfico de puntos con banda; hay un
ejemplo en `/datos/`. Para gráficos dentro de un artículo nuevo, usar un `.mdx` e importar el componente.
Los artículos existentes siguen en `.md`. Se probó convertir los cuatro más cargados de fórmulas y HTML
a `.mdx` y el resultado era idéntico, así que se puede hacer cuando haga falta; conviene convertir solo el
artículo que vaya a incrustar un componente, porque en MDX un `{` o un `<` sueltos en el texto rompen la compilación.

## Despliegue

Cada push a `main` ejecuta `.github/workflows/deploy.yml`: `npm ci`, `astro check`, build, comprobación
de enlaces y publicación en GitHub Pages. Los pull requests solo validan (no despliegan). También se ejecuta a diario (08:00 UTC) para publicar artículos
programados y rotar la métrica de la semana. El dominio se declara en `public/CNAME`.

### URLs heredadas
`astro.config.mjs` mantiene redirecciones de las URLs del blog anterior
(`/categoria/<slug>/` → `/articulos/<slug>/`, `/generador-reportes-nba/` y la antigua
`/2024/09/08/glosario-de-basketball-analytics/` → `/glosario/`). No se eliminan: hay enlaces externos que
apuntan a ellas.

## SEO

El sitio genera automáticamente sitemap (`/sitemap-index.xml`), `robots.txt`, canonical, Open
Graph / Twitter Card (imagen 1200×630 a partir del `heroImage`; sin él, `src/assets/brand/og-default.jpg`), JSON-LD (`WebSite` con buscador,
`Organization`, `Person`, `BlogPosting`, `BreadcrumbList`, `DefinedTermSet` en el glosario), RSS (`/rss.xml`) y artículos relacionados.

### Alta en buscadores (una sola vez, manual)
1. [Google Search Console](https://search.google.com/search-console): añadir propiedad de **dominio**
   `basketmatica.com` y verificarla con el registro TXT en el DNS.
2. En *Sitemaps*, enviar `https://basketmatica.com/sitemap-index.xml`.
3. En *Inspección de URLs*, solicitar indexación de la portada y de los artículos principales.
4. [Bing Webmaster Tools](https://www.bing.com/webmasters): importar desde Google Search Console.
5. Revisar cada semana *Rendimiento* y *Páginas*.

## Seguridad y dependencias
Dependabot propone actualizaciones semanales (npm) y mensuales (Actions); el CI (tipos, build y enlaces)
debe estar en verde antes de aceptarlas. El proyecto está en Astro 7 (Node ≥ 22.23.4). `npm audit` solo
muestra 4 avisos de severidad baja de KaTeX anidado en `rehype-katex` (afecta a la opción `trust` con
contenido ajeno; aquí todo el contenido es propio). No usar `npm audit fix --force`: propone un downgrade.

Con Astro 7 el Markdown usa por defecto otro procesador (Sätteri). Este sitio fija el clásico con
`unified()` en `astro.config.mjs` porque las fórmulas dependen de `remark-math` y `rehype-katex`.
