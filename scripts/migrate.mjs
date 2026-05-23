// One-off: WordPress.com WXR export -> Astro Content Collections (Markdown).
// - Posts  -> src/content/blog/<slug>.md   (URL /AAAA/MM/DD/slug/)
// - Pages  -> src/content/pages/<slug>.md  (sobre-mi, archivo-basketmatica)
// Descarga imágenes a src/assets/** (optimizables) y documentos a public/files/.
// Requiere acceso a internet. Idempotente: no re-descarga assets ya presentes.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const XML = path.join(ROOT, 'basketmtica.WordPress.2026-05-23.xml');

const CONTACT_EMAIL = 'yagoriudavets@gmail.com';
const CATEGORIES = ['Análisis', 'Casos de Uso', 'Equipos', 'Eventos', 'Herramientas', 'Jugadores'];

// ---------- helpers ----------
const pad = (n) => String(n).padStart(2, '0');
const ensureDir = (d) => fs.mkdirSync(d, { recursive: true });

function txt(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (node.__cdata != null) return Array.isArray(node.__cdata) ? node.__cdata.join('') : String(node.__cdata);
  if (node['#text'] != null) return String(node['#text']);
  return '';
}
const asArray = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);

function parseWpDate(s) {
  // "2023-06-03 20:36:14" (hora local del sitio) -> fecha UTC con mismos componentes.
  const m = s.match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
  if (!m) return new Date(s);
  const [, y, mo, d, h, mi, se] = m.map(Number);
  return new Date(Date.UTC(y, mo - 1, d, h, mi, se));
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“').replace(/&#8221;/g, '”').replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…').replace(/&#8230;/g, '…');
}

function firstParagraph(html) {
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!m) return '';
  const text = decodeEntities(m[1].replace(/<[^>]+>/g, '').trim());
  return text.length > 155 ? text.slice(0, 154).trimEnd() + '…' : text;
}

function isDownloadable(url) {
  return /^https?:\/\//.test(url) && /(basketmatica|wordpress\.com|wp\.com)/i.test(url);
}
function baseName(url) {
  const clean = decodeURIComponent(url.split('?')[0].split('#')[0]);
  return path.basename(clean).replace(/[^\w.\-]/g, '_');
}

async function download(url, dest) {
  if (fs.existsSync(dest)) return true;
  const noQuery = url.split('?')[0];
  const variants = [url];
  if (noQuery !== url) variants.push(noQuery);
  const resize = noQuery.match(/^(.*?)-\d+x\d+(\.[a-zA-Z]+)$/);
  if (resize) variants.push(resize[1] + resize[2]);
  for (const v of variants) {
    try {
      const res = await fetch(v, { headers: { 'User-Agent': 'Mozilla/5.0 migrate' } });
      if (res.ok) {
        ensureDir(path.dirname(dest));
        fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
        return true;
      }
    } catch { /* try next */ }
  }
  console.warn('  ⚠️  no se pudo descargar:', url);
  return false;
}

// ---------- turndown ----------
function makeTurndown(fileLinks) {
  const td = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
  });
  td.use(gfm);
  td.keep(['details', 'summary']); // sin imágenes dentro (verificado); se conservan tal cual

  // Figcaption -> pie en cursiva
  td.addRule('figcaption', {
    filter: 'figcaption',
    replacement: (content) => (content.trim() ? `\n\n*${content.trim()}*\n\n` : ''),
  });

  return td;
}

// ---------- main ----------
const raw = fs.readFileSync(XML, 'utf8');
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  parseTagValue: false,
  parseAttributeValue: false,
  trimValues: false,
  cdataPropName: '__cdata',
  textNodeName: '#text',
});
const doc = parser.parse(raw);
const items = asArray(doc.rss.channel.item);

const posts = items.filter((i) => txt(i['wp:post_type']) === 'post' && txt(i['wp:status']) === 'publish');
const pagesItems = items.filter((i) => txt(i['wp:post_type']) === 'page' && txt(i['wp:status']) === 'publish');
const attachments = items.filter((i) => txt(i['wp:post_type']) === 'attachment');

// mapa attachment id -> url
const attById = new Map();
for (const a of attachments) attById.set(txt(a['wp:post_id']), txt(a['wp:attachment_url']));

// mapa permalink (ambos dominios, con/sin barra) -> ruta local, para reescribir enlaces internos
const permalinkToLocal = new Map();
function addPermalink(link, local) {
  const variants = new Set();
  const bare = link.replace(/\/$/, '');
  for (const host of ['basketmatica.com', 'basketmatica.wordpress.com', 'www.basketmatica.com']) {
    const u = bare.replace(/^https?:\/\/[^/]+/, `https://${host}`);
    variants.add(u); variants.add(u + '/');
    variants.add(u.replace('https://', 'http://')); variants.add(u.replace('https://', 'http://') + '/');
  }
  for (const v of variants) permalinkToLocal.set(v, local);
}
for (const p of posts) {
  const d = parseWpDate(txt(p['wp:post_date']));
  const slug = txt(p['wp:post_name']);
  addPermalink(txt(p.link), `/${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}/${slug}/`);
}
for (const pg of pagesItems) addPermalink(txt(pg.link), `/${txt(pg['wp:post_name'])}/`);

function categoryOf(item) {
  const cats = asArray(item.category).filter((c) => c['@_domain'] === 'category').map((c) => txt(c));
  return cats.find((c) => CATEGORIES.includes(c)) || null;
}
function thumbUrl(item) {
  const metas = asArray(item['wp:postmeta']);
  const t = metas.find((m) => txt(m['wp:meta_key']) === '_thumbnail_id');
  return t ? attById.get(txt(t['wp:meta_value'])) : undefined;
}

async function processBody(html, { assetsAbsDir, assetsRel }) {
  let h = html;

  // wp:social-link guarda su URL SOLO en el comentario auto-cerrado -> convertir a <a> antes de limpiar
  h = h.replace(/<!--\s*wp:social-link\s*(\{[^}]*\})\s*\/-->/g, (_m, json) => {
    try {
      const o = JSON.parse(json);
      const svc = (o.service || 'enlace');
      const label = svc === 'mail' ? 'Email' : svc.charAt(0).toUpperCase() + svc.slice(1);
      return `<li class="wp-social-link-${svc}"><a href="${o.url}">${label}</a></li>`;
    } catch { return ''; }
  });

  // Formulario de contacto Jetpack (fuera de alcance) -> enlace mailto en su lugar
  h = h.replace(
    /<!--\s*wp:jetpack\/contact-form[\s\S]*?<!--\s*\/wp:jetpack\/contact-form\s*-->/g,
    `<p><a href="mailto:${CONTACT_EMAIL}">Escríbeme a ${CONTACT_EMAIL}</a></p>`,
  );

  h = h.replace(/<!--[\s\S]*?-->/g, '');                 // resto de comentarios Gutenberg
  h = h.replace(/\s(srcset|sizes)="[^"]*"/g, '');         // evita refs remotas en srcset
  h = h.replace(/<form[\s\S]*?<\/form>/gi, '');           // por si algún form quedara suelto

  // Embed (Twitter/X) -> enlace estático (la URL queda como texto en el wrapper)
  h = h.replace(/<figure[^>]*wp-block-embed[\s\S]*?<\/figure>/gi, (block) => {
    const m = block.match(/https?:\/\/[^\s"'<]+/);
    return m ? `<p>🐦 <a href="${m[0]}">Ver publicación original en X/Twitter</a></p>` : '';
  });

  // Bloque de descarga: quitar el botón duplicado -> queda un único enlace
  h = h.replace(/<a[^>]*wp-block-file__button[^>]*>[\s\S]*?<\/a>/gi, '');

  // reescribir enlaces internos -> rutas locales
  for (const [perm, local] of permalinkToLocal) h = h.split(`"${perm}"`).join(`"${local}"`).split(`"${perm}#`).join(`"${local}#`);

  // imágenes -> descarga local + ruta relativa (Astro las optimiza)
  const imgUrls = [...h.matchAll(/<img[^>]+src="([^"]+)"/gi)].map((m) => m[1]);
  for (const src of [...new Set(imgUrls)]) {
    if (!isDownloadable(src)) continue;
    const fname = baseName(src);
    const ok = await download(src, path.join(assetsAbsDir, fname));
    if (ok) h = h.split(src).join(assetsRel + fname);
  }

  // documentos (wp-block-file y enlaces directos) -> public/files + ruta absoluta
  const fileUrls = [...h.matchAll(/href="([^"]+\.(?:pdf|xlsx|xls|docx?|csv|zip))"/gi)].map((m) => m[1]);
  for (const url of [...new Set(fileUrls)]) {
    if (!isDownloadable(url)) continue;
    const fname = baseName(url);
    const ok = await download(url, path.join(ROOT, 'public', 'files', fname));
    if (ok) h = h.split(url).join(`/files/${fname}`);
  }

  let md = makeTurndown().turndown(h);
  md = md.replace(/\n{3,}/g, '\n\n').trim();
  return md;
}

function yaml(obj) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    lines.push(`${k}: ${typeof v === 'string' ? JSON.stringify(v) : v}`);
  }
  lines.push('---');
  return lines.join('\n');
}

async function migratePost(item) {
  const title = decodeEntities(txt(item.title));
  const slug = txt(item['wp:post_name']);
  const date = parseWpDate(txt(item['wp:post_date']));
  const category = categoryOf(item);
  if (!category) { console.warn('  ⚠️  sin categoría válida, omitido:', title); return; }
  const rawHtml = txt(item['content:encoded']);
  const excerpt = decodeEntities(txt(item['excerpt:encoded'])).trim();

  const assetsAbsDir = path.join(ROOT, 'src', 'assets', 'blog', slug);
  const assetsRel = `../../assets/blog/${slug}/`;

  let heroImage, heroAlt;
  const hero = thumbUrl(item);
  if (hero && isDownloadable(hero)) {
    const fname = baseName(hero);
    if (await download(hero, path.join(assetsAbsDir, fname))) { heroImage = assetsRel + fname; heroAlt = title; }
  }

  const body = await processBody(rawHtml, { assetsAbsDir, assetsRel });
  const fm = yaml({
    title,
    description: excerpt || firstParagraph(rawHtml),
    pubDate: date.toISOString(),
    category,
    heroImage,
    heroAlt,
    originalSlug: slug,
  });
  const out = path.join(ROOT, 'src', 'content', 'blog', `${slug}.md`);
  ensureDir(path.dirname(out));
  fs.writeFileSync(out, `${fm}\n\n${body}\n`, 'utf8');
  console.log('  ✓ post:', `/${date.getUTCFullYear()}/${pad(date.getUTCMonth() + 1)}/${pad(date.getUTCDate())}/${slug}/`);
}

async function migratePage(item) {
  const title = decodeEntities(txt(item.title));
  const slug = txt(item['wp:post_name']);
  const rawHtml = txt(item['content:encoded']);
  const excerpt = decodeEntities(txt(item['excerpt:encoded'])).trim();

  const assetsAbsDir = path.join(ROOT, 'src', 'assets', 'pages', slug);
  const assetsRel = `../../assets/pages/${slug}/`;

  let heroImage, heroAlt;
  const hero = thumbUrl(item);
  if (hero && isDownloadable(hero)) {
    const fname = baseName(hero);
    if (await download(hero, path.join(assetsAbsDir, fname))) { heroImage = assetsRel + fname; heroAlt = title; }
  }

  const body = await processBody(rawHtml, { assetsAbsDir, assetsRel });
  const fm = yaml({ title, description: excerpt || firstParagraph(rawHtml), originalSlug: slug, heroImage, heroAlt });
  const out = path.join(ROOT, 'src', 'content', 'pages', `${slug}.md`);
  ensureDir(path.dirname(out));
  fs.writeFileSync(out, `${fm}\n\n${body}\n`, 'utf8');
  console.log('  ✓ page: /' + slug + '/');
}

console.log(`Posts: ${posts.length} · Pages: ${pagesItems.length} · Attachments: ${attachments.length}\n`);
for (const p of posts) await migratePost(p);
for (const pg of pagesItems) await migratePage(pg);
console.log('\nMigración completada.');
