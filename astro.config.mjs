// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Restricción CLAUDE.md: estático, GitHub Pages, dominio apex, sin `base`.
  output: 'static',
  site: 'https://basketmatica.com',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
