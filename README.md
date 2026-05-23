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
Herramienta interactiva en `/generador-reportes-nba/` ([src/pages/generador-reportes-nba.astro](src/pages/generador-reportes-nba.astro)).
El formulario llama a un backend externo en Render (`https://reportgeneratornba.onrender.com`) que
genera el PDF; el front es estático. La entrada del blog `/2025/06/20/generador-de-reportes-de-la-nba/`
enlaza a esta página.

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
