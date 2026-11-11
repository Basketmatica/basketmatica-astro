import { getEntry, render } from 'astro:content';
import { fold, plainText } from './text';

export interface GlossaryTerm {
  /** Encabezado tal cual: "True Shooting Percentage (TS%)". */
  heading: string;
  /** Nombre sin la sigla: "True Shooting Percentage". */
  name: string;
  /** Sigla entre paréntesis, si la hay: "TS%". */
  acronym?: string;
  /** Ancla en /glosario/ (la genera Astro a partir del encabezado). */
  slug: string;
  /** Definición en texto plano. */
  definition: string;
}

let cache: Promise<GlossaryTerm[]> | undefined;

/**
 * Extrae los términos de src/content/pages/glosario.md: cada `####` es una métrica y su
 * `**Definición:**` es su definición. El glosario es la única fuente: la métrica de la semana,
 * el buscador y los datos estructurados salen de aquí.
 */
export function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  cache ??= (async () => {
    const entry = await getEntry('pages', 'glosario');
    if (!entry) throw new Error('Falta src/content/pages/glosario.md');
    const { headings } = await render(entry);
    const h4 = headings.filter((h) => h.depth === 4);
    const sections = (entry.body ?? '').split(/^#### .*$/m).slice(1);
    if (sections.length !== h4.length) {
      throw new Error(`Glosario: ${h4.length} encabezados pero ${sections.length} secciones`);
    }
    return h4.map((h, i) => {
      const m = h.text.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
      const def = sections[i].match(/\*\*Definición:\*\*\s*(.+)/)?.[1] ?? '';
      return {
        heading: h.text,
        name: m ? m[1] : h.text,
        acronym: m?.[2],
        slug: h.slug,
        definition: plainText(def),
      };
    });
  })();
  return cache;
}

/** Busca la ficha del glosario de una métrica por nombre (sin sigla) o por sigla. */
export async function findTerm(name: string, acronym?: string): Promise<GlossaryTerm | undefined> {
  const terms = await getGlossaryTerms();
  const n = fold(name);
  return (
    terms.find((t) => fold(t.name) === n) ??
    (acronym ? terms.find((t) => t.acronym && fold(t.acronym) === fold(acronym)) : undefined)
  );
}
