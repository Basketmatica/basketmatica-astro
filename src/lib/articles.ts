import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublished } from './urls';
import { plainText } from './text';

export type Article = CollectionEntry<'articulos'>;

/** Artículos publicados, del más reciente al más antiguo. */
export async function getArticles(): Promise<Article[]> {
  return (await getCollection('articulos', isPublished)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

const WORDS_PER_MINUTE = 220;

/** Minutos de lectura estimados (sin fórmulas ni marcado). */
export function readingMinutes(article: Article): number {
  const words = plainText(article.body ?? '').split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Artículo anterior (más antiguo) y siguiente (más reciente) en el orden cronológico. */
export function neighbors(all: Article[], current: Article): { prev?: Article; next?: Article } {
  const i = all.findIndex((a) => a.id === current.id);
  if (i < 0) return {};
  return { next: all[i - 1], prev: all[i + 1] };
}
