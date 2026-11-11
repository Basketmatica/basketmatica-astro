import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { getArticles } from '../lib/articles';
import { getGlossaryTerms } from '../lib/glosario';
import { postPath } from '../lib/urls';
import { fold, plainText } from '../lib/text';
import { herramientas, toolHref } from '../data/herramientas';
import { threads } from '../data/hilos';

// Índice de búsqueda estático para /buscar/. Cada entrada lleva `s`: texto ya normalizado
// (minúsculas, sin acentos) en el que busca el cliente.
interface Entry {
  t: string;  // título
  d: string;  // descripción corta
  u: string;  // URL
  k: string;  // tipo
  f: string;  // título normalizado
  s: string;  // texto normalizado completo
  e?: boolean; // enlace externo
}

const entry = (t: string, d: string, u: string, k: string, body = '', e = false): Entry => ({
  t, d, u, k, f: fold(t), s: fold(`${t} ${d} ${body}`), ...(e ? { e } : {}),
});

export const GET: APIRoute = async () => {
  const out: Entry[] = [];

  for (const a of await getArticles()) {
    out.push(entry(a.data.title, a.data.description, postPath(a), 'Artículo', plainText(a.body ?? '').slice(0, 8000)));
  }
  for (const t of await getGlossaryTerms()) {
    out.push(entry(t.heading, t.definition, `/glosario/#${t.slug}`, 'Glosario'));
  }
  for (const h of herramientas) {
    out.push(entry(h.title, h.description, toolHref(h), 'Herramienta'));
  }
  for (const th of threads) {
    out.push(entry(th.titulo, `Hilo en X · ${th.fecha}`, th.url, 'Hilo', '', true));
  }

  const sobreMi = await getEntry('pages', 'sobre-mi');
  out.push(entry('Sobre mí', sobreMi?.data.description ?? '', '/sobre-mi/', 'Página', plainText(sobreMi?.body ?? '')));
  out.push(entry('Servicios de análisis de datos', 'Modelos predictivos, reportes de scouting y análisis de rotaciones para clubes y medios.', '/servicios/', 'Página'));
  out.push(entry('Datos y código', 'Repositorios, datasets y descargables de los análisis de Basketmática.', '/datos/', 'Página'));
  out.push(entry('Archivo de hilos', 'Todos los hilos de X filtrables por tema y tipo.', '/archivo-basketmatica/', 'Página'));

  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json' } });
};
