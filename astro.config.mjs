// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Restricción CLAUDE.md: estático, GitHub Pages, dominio apex, sin `base`.
  output: 'static',
  site: 'https://basketmatica.com',
  redirects: {
    '/categoria/analisis/':    '/articulos/analisis/',
    '/categoria/casos-de-uso/': '/articulos/casos-de-uso/',
    '/categoria/equipos/':     '/articulos/equipos/',
    '/categoria/eventos/':     '/articulos/eventos/',
    '/categoria/herramientas/': '/articulos/herramientas/',
    '/categoria/jugadores/':   '/articulos/jugadores/',
    '/generador-reportes-nba/': '/herramientas/generador-reportes-nba/',
    '/2025/06/20/generador-de-reportes-de-la-nba/': '/herramientas/generador-reportes-nba/',
    '/2024/09/08/glosario-de-basketball-analytics/': '/glosario/',
  },
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
