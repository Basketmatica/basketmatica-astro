// Comprueba, sobre el build (dist/), que todos los enlaces e imágenes internos existen y que
// las anclas (#id) apuntan a un elemento real. Sin dependencias: `npm run check:links`.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('No existe dist/. Ejecuta `npm run build` antes.');
  process.exit(2);
}

const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && htmlFiles.push(p);
  }
})(DIST);

const cache = new Map();
const html = (file) => (cache.has(file) ? cache.get(file) : (cache.set(file, readFileSync(file, 'utf8')), cache.get(file)));

/** Ruta de URL → fichero de dist/ (o undefined si no existe). */
function resolveFile(pathname) {
  const base = join(DIST, decodeURIComponent(pathname));
  const candidates = pathname.endsWith('/') ? [join(base, 'index.html')] : [base, base + '.html', join(base, 'index.html')];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

const pageUrl = (file) => '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '');
const errors = [];
let checked = 0;

for (const file of htmlFiles) {
  const page = pageUrl(file);
  const body = html(file);
  for (const m of body.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    const raw = m[1].replace(/&amp;/g, '&');
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) continue;   // externos, mailto:, data:…
    const url = new URL(raw, 'http://local' + page);
    if (url.hash.startsWith('#:~:')) url.hash = '';              // fragmento de texto: no es un id
    const target = resolveFile(url.pathname);
    checked++;
    if (!target) { errors.push(`${page}  →  ${raw}  (no existe)`); continue; }
    if (url.hash.length > 1 && target.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!new RegExp(`\\sid=["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(html(target))) {
        errors.push(`${page}  →  ${raw}  (ancla #${id} no encontrada)`);
      }
    }
  }
}

if (errors.length) {
  console.error(`\n✖ ${errors.length} enlace(s) roto(s) de ${checked} comprobados:\n`);
  for (const e of [...new Set(errors)]) console.error('  ' + e);
  process.exit(1);
}
console.log(`✔ ${checked} enlaces internos comprobados en ${htmlFiles.length} páginas: sin roturas.`);
