import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Categorías vigentes del sitio. Sin jerarquía.
export const CATEGORIES = [
  'Análisis',
  'Casos de Uso',
  'Equipos',
  'Eventos',
  'Herramientas',
  'Jugadores',
] as const;

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articulos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().default(''),
      pubDate: z.coerce.date(),
      // Fecha de la última revisión importante (alimenta dateModified en el JSON-LD).
      updatedDate: z.coerce.date().optional(),
      category: z.enum(CATEGORIES),
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
      draft: z.boolean().default(false),
    }),
});

// Páginas estáticas con contenido en Markdown (sobre-mi).
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().default(''),
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
    }),
});

export const collections = { articulos, pages };
