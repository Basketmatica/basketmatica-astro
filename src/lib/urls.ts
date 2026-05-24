import type { CollectionEntry } from 'astro:content';

// Mapa nombre de categoría -> nicename (slug WordPress original).
const CATEGORY_SLUGS: Record<string, string> = {
  'Análisis': 'analisis',
  'Casos de Uso': 'casos-de-uso',
  'Equipos': 'equipos',
  'Eventos': 'eventos',
  'Herramientas': 'herramientas',
  'Jugadores': 'jugadores',
};

export function categorySlug(name: string): string {
  return CATEGORY_SLUGS[name] ?? name.toLowerCase();
}

export function categoryFromSlug(slug: string): string | undefined {
  return Object.keys(CATEGORY_SLUGS).find((k) => CATEGORY_SLUGS[k] === slug);
}

const pad = (n: number) => String(n).padStart(2, '0');

// Ruta de una entrada: /AAAA/MM/DD/slug/ (formato WordPress conservado).
export function postPath(entry: CollectionEntry<'articulos'>): string {
  const d = entry.data.pubDate;
  const y = d.getUTCFullYear();
  const m = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());
  return `/${y}/${m}/${day}/${entry.data.originalSlug}/`;
}

// Partes para getStaticPaths del catch-all [...path].astro (sin barras inicial/final).
export function postPathParam(entry: CollectionEntry<'articulos'>): string {
  return postPath(entry).replace(/^\/|\/$/g, '');
}

export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}
