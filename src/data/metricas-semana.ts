// Lista ordenada de métricas para la sección "Métrica de la semana" de la home.
//
// Cómo funciona: index.astro calcula qué métrica toca según la fecha del build
// (una por semana, rotación cíclica). El cron de los lunes en .github/workflows/deploy.yml
// reconstruye el sitio para que aparezca la siguiente.
//
// Para añadir métricas: pega un nuevo objeto al final del array. `acronym` es opcional
// (omítelo en conceptos como "Four Factors"). Mantén `definition` en una sola frase.
// No reordenes el array salvo que quieras forzar qué métrica cae en una semana concreta:
// el orden, combinado con ANCHOR en index.astro, determina la secuencia.

export interface MetricaSemana {
  name: string;
  acronym?: string;
  definition: string;
}

export const metricasSemana: MetricaSemana[] = [
  {
    name: 'Free Throw Rate',
    acronym: 'FTR',
    definition: 'Calcula la frecuencia con la que un jugador o equipo va a la línea de tiros libres en relación con los tiros de campo intentados.',
  },
  {
    name: 'True Shooting Percentage',
    acronym: 'TS%',
    definition: 'Mide la eficiencia en el tiro considerando tiros de campo, triples y tiros libres, ofreciendo una visión más completa que el eFG%.',
  },
  {
    name: 'Effective Field Goal Percentage',
    acronym: 'eFG%',
    definition: 'Mide la eficiencia en el tiro dando mayor peso a los triples por su mayor valor respecto a los tiros de dos.',
  },
  {
    name: 'Usage Percentage',
    acronym: 'USG%',
    definition: 'Indica el porcentaje de jugadas ofensivas de un equipo que un jugador finaliza mientras está en cancha, ya sea con un tiro, un pase que acaba en tiro o una pérdida.',
  },
  {
    name: 'Player Efficiency Rating',
    acronym: 'PER',
    definition: 'Evalúa el rendimiento de un jugador por minuto en cancha combinando estadísticas positivas y negativas; el promedio de la liga es 15.',
  },
  {
    name: 'Net Rating',
    acronym: 'NetRtg',
    definition: 'Mide la diferencia entre los puntos anotados y los recibidos por un equipo cada 100 posesiones.',
  },
  {
    name: 'Defensive Rating',
    acronym: 'DefRtg',
    definition: 'Mide la cantidad de puntos que un equipo permite cada 100 posesiones.',
  },
  {
    name: 'Offensive Rating',
    acronym: 'OffRtg',
    definition: 'Mide la cantidad de puntos que un equipo anota cada 100 posesiones.',
  },
  {
    name: 'PACE',
    definition: 'Mide el número de posesiones que un equipo juega por cada 48 minutos, indicando la velocidad del juego.',
  },
  {
    name: 'Assist Percentage',
    acronym: 'AST%',
    definition: 'Calcula el porcentaje de tiros de campo convertidos por un equipo que provienen de asistencias de un jugador.',
  },
  {
    name: 'Turnover Percentage',
    acronym: 'TOV%',
    definition: 'Mide el porcentaje de posesiones de un jugador o equipo que terminan en pérdida de balón.',
  },
  {
    name: 'Offensive Rebound Percentage',
    acronym: 'ORB%',
    definition: 'Determina el porcentaje de rebotes ofensivos disponibles que un jugador o equipo captura.',
  },
  {
    name: 'Defensive Rebound Percentage',
    acronym: 'DRB%',
    definition: 'Determina el porcentaje de rebotes defensivos disponibles que un jugador o equipo captura.',
  },
  {
    name: 'Steal Percentage',
    acronym: 'STL%',
    definition: 'Estima el porcentaje de posesiones del rival que terminan en un robo del jugador mientras está en pista, ajustado por ritmo y minutos.',
  },
  {
    name: 'Block Percentage',
    acronym: 'BLK%',
    definition: 'Estima el porcentaje de intentos de tiro de campo del rival que un jugador bloquea mientras está en cancha, ajustado por minutos y volumen de tiros del oponente.',
  },
  {
    name: 'Defensive Field Goal Percentage',
    acronym: 'DFG%',
    definition: 'Mide el porcentaje de tiros que el rival convierte cuando un jugador es su defensor más cercano; aproxima el impacto defensivo que el boxscore no recoge.',
  },
  {
    name: 'Four Factors',
    definition: 'Los cuatro factores de Dean Oliver con mayor correlación con la victoria: eFG%, Free Throw Rate, Offensive Rebound % y Turnover %.',
  },
  {
    name: 'Win Shares',
    acronym: 'WS',
    definition: 'Estima el número de victorias que un jugador aporta a su equipo combinando su impacto ofensivo y defensivo.',
  },
  {
    name: 'Player Impact Estimate',
    acronym: 'PIE',
    definition: 'Mide la contribución global de un jugador en un partido combinando la mayoría de estadísticas del boxscore en un único porcentaje de impacto.',
  },
  {
    name: 'Points Per Attempt',
    acronym: 'PPA',
    definition: 'Calcula la cantidad de puntos que un jugador promedia por cada tiro de campo que intenta.',
  },
  {
    name: '3 Point Rate',
    acronym: '3PR',
    definition: 'Mide la proporción de tiros de tres respecto al total de tiros intentados por un jugador o equipo.',
  },
  {
    name: '2 Point Rate',
    acronym: '2PR',
    definition: 'Mide la proporción de tiros de dos respecto al total de tiros intentados por un jugador o equipo.',
  },
];
