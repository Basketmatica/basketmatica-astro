import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Categorías a conservar (CLAUDE.md). Se aplanan: sin jerarquía.
export const CATEGORIES = [
  'Análisis',
  'Casos de Uso',
  'Equipos',
  'Eventos',
  'Herramientas',
  'Jugadores',
] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().default(''),
      pubDate: z.coerce.date(),
      category: z.enum(CATEGORIES),
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
      // Slug original de WordPress -> URL /AAAA/MM/DD/originalSlug/
      originalSlug: z.string(),
      draft: z.boolean().default(false),
    }),
});

// Páginas estáticas (sobre-mi, archivo-basketmatica): conservan su ruta original.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().default(''),
      originalSlug: z.string(),
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
    }),
});

export const collections = { blog, pages };
