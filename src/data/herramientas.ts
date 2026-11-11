import type { IconName } from '../components/Icon.astro';

// Herramientas de /herramientas/. Fuente única: listado, portada y buscador salen de aquí.
// Cada una tiene además su página en src/pages/herramientas/<slug>.astro (con ToolLayout).
export interface Herramienta {
  slug: string;
  title: string;
  description: string;
  status: 'Disponible' | 'Beta' | 'Próximamente';
  icon: IconName;
}

export const herramientas: Herramienta[] = [
  {
    slug: 'generador-reportes-acb',
    title: 'Generador de Reportes ACB',
    description:
      'Introduce el nombre de cualquier jugador de la Liga Endesa y obtén un scouting report en PDF con estadísticas avanzadas y análisis de IA en menos de un minuto.',
    status: 'Disponible',
    icon: 'ball',
  },
  {
    slug: 'generador-reportes-nba',
    title: 'Generador de Reportes NBA',
    description:
      'Introduce el nombre de cualquier jugador de la NBA y obtén un scouting report en PDF con estadísticas avanzadas y análisis de IA en menos de un minuto.',
    status: 'Disponible',
    icon: 'chart',
  },
];

export const toolHref = (h: Herramienta) => `/herramientas/${h.slug}/`;
