/** Markdown → texto plano (para índices de búsqueda, definiciones y conteo de palabras). */
export function plainText(md: string): string {
  return md
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')          // fórmulas en bloque
    .replace(/\$[^$\n]+\$/g, ' ')                // fórmulas en línea
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')       // imágenes
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')     // enlaces → su texto
    .replace(/<[^>]+>/g, ' ')                    // HTML
    .replace(/^\s*\|?[\s:|-]+\|[\s:|-]*$/gm, ' ') // separadores de tabla
    .replace(/[|#>*_`~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Quita acentos y pasa a minúsculas: "Jokić" → "jokic". */
export const fold = (s: string): string =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
