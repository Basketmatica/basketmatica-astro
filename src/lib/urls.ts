import type { CollectionEntry } from 'astro:content';

// Mapa nombre de categoría -> slug de URL (/articulos/<slug>/).
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

const pad = (n: number) => String(n).padStart(2, '0');

// Ruta de una entrada: /AAAA/MM/DD/slug/. El slug es el nombre del fichero .md (entry.id) y,
// junto con la fecha, forma la URL pública: no cambiarlos una vez publicada la entrada.
export function postPath(entry: CollectionEntry<'articulos'>): string {
  const d = entry.data.pubDate;
  const y = d.getUTCFullYear();
  const m = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());
  return `/${y}/${m}/${day}/${entry.id}/`;
}

// Visible en el build: no es borrador y su fecha ya ha llegado. Un artículo con fecha futura
// aparece solo en el primer build posterior (cron diario de deploy.yml).
export function isPublished({ data }: CollectionEntry<'articulos'>): boolean {
  return !data.draft && data.pubDate <= new Date();
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
