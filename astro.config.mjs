// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const SIGLAS = [
  'FGA', 'FGM', 'FTA', 'FTM', 'ORB', 'DRB', 'REB', 'AST', 'STL', 'BLK', 'BLKA',
  'TOV', 'PTS', 'PF', 'FD', 'MP', 'POS', 'DFGM', 'DFGA',
];
const KATEX_MACROS = {
  ...Object.fromEntries(SIGLAS.map((s) => [`\\${s}`, `\\mathrm{${s}}`])),
  '\\twoPA': '\\mathrm{2PA}',
  '\\threePA': '\\mathrm{3PA}',
  '\\threePM': '\\mathrm{3PM}',
};

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
    // Fórmulas $$…$$ renderizadas en build (KaTeX), sin JS en cliente.
    remarkPlugins: [remarkMath],
    // Notación única de siglas (leyenda en el glosario). Las fórmulas usan \FGA, \MP…
    rehypePlugins: [[rehypeKatex, { macros: KATEX_MACROS }]],
  },
});
