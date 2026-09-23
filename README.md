# Basketmática — Astro

Blog estático migrado desde WordPress.com a [Astro](https://astro.build/), desplegable en GitHub Pages con dominio `basketmatica.com`.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/ (estático)
npm run preview   # sirve dist/ localmente
```

## Estructura

- `src/content/blog/*.md` — las 10 entradas. URL `/AAAA/MM/DD/slug/` (slug original de WordPress).
- `src/content/pages/*.md` — páginas `sobre-mi` y `archivo-basketmatica` (rutas originales conservadas).
- `src/assets/**` — imágenes locales (optimizadas por Astro a WebP).
- `public/files/**` — documentos descargables (`.pdf`, `.xlsx`).
- `src/lib/urls.ts` — rutas por fecha y slugs de categoría.
- `src/content.config.ts` — esquema tipado de las colecciones.

### Categorías
Análisis · Casos de Uso · Equipos · Eventos · Herramientas · Jugadores → `/categoria/<slug>/`.

### Generador de Reportes NBA
Herramienta interactiva en `/herramientas/generador-reportes-nba/` ([src/pages/herramientas/generador-reportes-nba.astro](src/pages/herramientas/generador-reportes-nba.astro)).
El formulario llama a un backend externo en Render (`https://reportgeneratornba.onrender.com`) que
genera el PDF; el front es estático. Esta es la URL canónica: las antiguas
`/generador-reportes-nba/` y `/2025/06/20/generador-de-reportes-de-la-nba/` redirigen aquí.

## Migración (one-off)

`scripts/migrate.mjs` convirtió el export `basketmtica.WordPress.2026-05-23.xml`:
parsea el WXR, descarga imágenes y documentos a local (sin hotlinking), convierte
Gutenberg → Markdown, reescribe enlaces internos a rutas locales, sustituye el
formulario de contacto Jetpack por un `mailto`, y convierte el embed de X a enlace estático.

```bash
npm run migrate   # vuelve a generar el contenido (idempotente con los assets ya descargados)
```

El XML y el script pueden conservarse o archivarse fuera del repo tras la migración.

## Despliegue (GitHub Pages)

`.github/workflows/deploy.yml` compila y publica en cada push a `main`.
Pasos iniciales:

1. `git init && git add . && git commit -m "Migración inicial a Astro"`
2. Crear el repo en GitHub y `git push`.
3. En **Settings → Pages**, seleccionar **Source: GitHub Actions**.
4. Configurar el dominio `basketmatica.com` (el `public/CNAME` ya lo declara) y los registros DNS del apex.

## SEO

Lo que ya hace el sitio de forma automática: sitemap (`/sitemap-index.xml`), `robots.txt`, canonical, Open Graph/Twitter Card con imagen 1200×630 generada desde el `heroImage`, JSON-LD (`WebSite`, `Organization`, `Person`, `BlogPosting`, `BreadcrumbList`) y artículos relacionados al final de cada entrada.

Al publicar una entrada nueva:
- `description` de 140–160 caracteres, escrita a mano (es el texto que Google muestra bajo el título). No copiar el primer párrafo.
- `heroAlt` describiendo lo que se ve en la imagen, y texto alternativo en cada `![...]()` del cuerpo.
- Si se revisa una entrada ya publicada de forma relevante, añadir `updatedDate` al frontmatter.
- No cambiar el slug ni la fecha de una entrada publicada: cambia su URL.

### Alta en buscadores (una sola vez, manual)
1. [Google Search Console](https://search.google.com/search-console) → añadir propiedad de **dominio** `basketmatica.com` y verificarla con el registro TXT que indica Google, en el DNS del dominio.
2. En *Sitemaps*, enviar `https://basketmatica.com/sitemap-index.xml`.
3. En *Inspección de URLs*, solicitar la indexación de la portada y de los artículos principales.
4. [Bing Webmaster Tools](https://www.bing.com/webmasters) → *Importar desde Google Search Console*.
5. Revisar cada semana *Rendimiento* (consultas por las que aparece el sitio) y *Páginas*.
