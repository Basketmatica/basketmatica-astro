# Proyecto: migración Basketmática (WordPress.com → Astro)

## Objetivo
Migrar el blog desde wordpress-export.xml a un sitio Astro estático,
desplegable en GitHub Pages con dominio propio basketmatica.com.

## Restricciones técnicas (NO negociables)
- output: 'static'. Sin SSR, sin adaptadores de servidor.
- Debe funcionar en GitHub Pages: site = 'https://basketmatica.com', sin `base`.
- Para las URLs con formato: /AAAA/MM/DD/slug/. Quiero optimizar los nombres, pero que sigan una nomenclatura clara y se respete de cara a futuras entradas.
  Las páginas (sobre-mi, archivo) mantienen su ruta original.
- Usar Content Collections con esquema tipado para las entradas.
- Las imágenes se descargan en local (src/assets o public), nada de hotlinking a wp-content.

## Convenciones
- Astro + TypeScript. Sin frameworks de UI salvo que sea imprescindible.
- Categorías a conservar: Análisis, Casos de Uso, Eventos, Herramientas, Jugadores, Equipos.
- No commitear secretos ni claves.

## Fuera de alcance por ahora
- La newsletter (se resolverá con un servicio externo, no tocar todavía).
- El "Generador de Reportes NBA" (decidir aparte).