# Basketmática — sitio web

Web de Basketmática (https://basketmatica.com): divulgación de análisis de datos aplicado al
baloncesto (NBA y ACB). Contiene artículos, un glosario de métricas, un archivo de hilos de X,
herramientas (generadores de reportes embebidos) y una página de servicios. Astro estático,
desplegado en GitHub Pages. Buscador estático, tema claro/oscuro y comprobaciones en CI.

## Restricciones técnicas (NO negociables)
- `output: 'static'`. Sin SSR ni adaptadores de servidor.
- GitHub Pages: `site = 'https://basketmatica.com'`, sin `base`. `trailingSlash: 'always'`.
- Las URLs públicas no se rompen: si algo cambia de ruta, se añade una redirección en
  `astro.config.mjs`. Las redirecciones heredadas existentes se conservan.
- Artículos en `/AAAA/MM/DD/slug/`: fecha = `pubDate`, slug = nombre del fichero `.md`.
  Una vez publicado, no se cambia ni la fecha ni el nombre del fichero.
  Las páginas (`/sobre-mi/`, `/archivo-basketmatica/`, `/glosario/`, `/servicios/`, `/datos/`, `/buscar/`) tienen ruta propia.
- Content Collections con esquema tipado (`src/content.config.ts`).
- Imágenes siempre en local (`src/assets`, optimizadas por Astro) o ficheros en `public/files`;
  nada de hotlinking.
- No commitear secretos ni claves. El sitio no tiene backend ni claves en el cliente.

## Convenciones
- Astro + TypeScript. Sin frameworks de UI salvo que sea imprescindible. JS en cliente mínimo.
- Contenido y textos de la web en español.
- Categorías (enum en `content.config.ts`, slug en `lib/urls.ts`): Análisis, Casos de Uso,
  Equipos, Eventos, Herramientas, Jugadores. Añadir una exige tocar ambos ficheros.
- Fórmulas con KaTeX (`$$…$$`) y siglas unificadas mediante macros (`\FGA`, `\MP`…) definidas en
  `astro.config.mjs`. Leyenda de siglas al inicio del glosario.
- Diseño: tokens en `src/styles/tokens.css` (paleta crema/espresso/teal, con tema oscuro), estilos
  globales en `global.css`. En componentes usar siempre `var(--…)`: un color fijo rompe el tema oscuro.
  Iconos con `Icon.astro` (SVG propio), no emojis.
- Scripts de cliente: el sitio usa `ClientRouter`, que no vuelve a ejecutar los scripts de módulo.
  Enlazar eventos con `astro:page-load` o por delegación en `document`, nunca solo al cargar.
- Datos con fuente única: herramientas (`src/data/herramientas.ts`), hilos (`src/data/hilos.ts`),
  glosario (`src/content/pages/glosario.md`, del que salen índice, buscador y métrica de la semana).
- Redes sociales y email de contacto: única fuente en `src/consts.ts`.
- Newsletter: formulario de Beehiiv embebido (`NewsletterCTA.astro` + script en `BaseLayout.astro`).

## Comandos
Requiere Node ≥ 22.23.4 (`.nvmrc`).
- `npm run dev` — servidor local (http://localhost:4321)
- `npm run build` — genera `dist/`; `npm run preview` — lo sirve
- `npm run check` — `astro check` (tipos); `npm run check:links` — enlaces internos sobre `dist/`
- `npm run verify` — todo lo anterior; ejecutarlo antes de dar un cambio por bueno

Un push a `main` despliega a producción. Además se reconstruye cada día a las 08:00 UTC para
publicar artículos programados (`pubDate` futura) y rotar la "Métrica de la semana".

Guía de mantenimiento (publicar artículo, añadir métrica, hilo o herramienta): ver `README.md`.
