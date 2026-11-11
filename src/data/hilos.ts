// Hilos de X de @basketmatica para /archivo-basketmatica/ (y para el buscador).
// Para añadir uno: nuevo objeto al final del array `threads`.

export const LEGEND = [
  { emoji: '🏀', label: 'Tiro y Ofensiva' },
  { emoji: '🛡️', label: 'Defensa e Intangibles' },
  { emoji: '🧠', label: 'Táctica y Métricas' },
  { emoji: '💻', label: 'Data, IA y Futuro' },
  { emoji: '⚕️', label: 'Físico' },
] as const;

export const TIPOS = [
  { value: 'concepto', label: 'Fundamentos' },
  { value: 'caso', label: 'Casos prácticos' },
] as const;

// concepto: explica una métrica o idea atemporal. caso: la aplica a un jugador, equipo o competición concreta.
export type Thread = {
  fecha: string;
  tema: (typeof LEGEND)[number]['emoji'];
  tipo: (typeof TIPOS)[number]['value'];
  titulo: string;
  url: string;
};

export const threads: Thread[] = [
  { fecha: 'Junio 2024',      tema: '🏀', tipo: 'concepto', titulo: 'La mentira de la Valoración (PIR)',                                   url: 'https://x.com/basketmatica/status/1804495718205247706' },
  { fecha: 'Julio 2024',      tema: '🧠', tipo: 'concepto', titulo: 'Four Factors: El ADN de la victoria',                                  url: 'https://x.com/basketmatica/status/1809359535561216002' },
  { fecha: 'Julio 2024',      tema: '🧠', tipo: 'concepto', titulo: 'Top-Down vs Bottom-Up: Dos filosofías',                                 url: 'https://x.com/basketmatica/status/1816082554312609954' },
  { fecha: 'Agosto 2024',     tema: '🏀', tipo: 'concepto', titulo: 'Olvida el FG%: Usa eFG% y TS%',                                        url: 'https://x.com/basketmatica/status/1819680384830890253' },
  { fecha: 'Agosto 2024',     tema: '🧠', tipo: 'concepto', titulo: 'La trampa del +/-: Cuándo miente',                                     url: 'https://x.com/basketmatica/status/1828039339936215291' },
  { fecha: 'Septiembre 2024', tema: '🏀', tipo: 'concepto', titulo: 'USG% y PER: Volumen vs. Eficiencia',                                  url: 'https://x.com/basketmatica/status/1838153080010944917' },
  { fecha: 'Octubre 2024',    tema: '🧠', tipo: 'concepto', titulo: '¿Existe la métrica perfecta?',                                         url: 'https://x.com/basketmatica/status/1842934860492742964' },
  { fecha: 'Octubre 2024',    tema: '🧠', tipo: 'concepto', titulo: 'Posesiones: El motor del dato',                                        url: 'https://x.com/basketmatica/status/1848769578127806966' },
  { fecha: 'Noviembre 2024',  tema: '🧠', tipo: 'concepto', titulo: 'Clutch Time: Análisis bajo presión',                                  url: 'https://x.com/basketmatica/status/1853389813015068685' },
  { fecha: 'Noviembre 2024',  tema: '💻', tipo: 'concepto', titulo: 'Muestras Pequeñas: El peligro del dato',                              url: 'https://x.com/basketmatica/status/1858125119010312523' },
  { fecha: 'Diciembre 2024',  tema: '🏀', tipo: 'concepto', titulo: 'Dunk Score: Midiendo la potencia aérea',                              url: 'https://x.com/basketmatica/status/1863192053871444032' },
  { fecha: 'Diciembre 2024',  tema: '🧠', tipo: 'concepto', titulo: 'Sesgos: El enemigo de la objetividad',                                url: 'https://x.com/basketmatica/status/1868316339276050613' },
  { fecha: 'Diciembre 2024',  tema: '🧠', tipo: 'concepto', titulo: 'Cómo leer un Boxscore como un profesional',                           url: 'https://x.com/basketmatica/status/1873306066857173274' },
  { fecha: 'Enero 2025',      tema: '🏀', tipo: 'concepto', titulo: '¿Qué es un buen tiro según la estadística?',                          url: 'https://x.com/basketmatica/status/1880950947071062318' },
  { fecha: 'Febrero 2025',    tema: '💻', tipo: 'concepto', titulo: 'Dentro de la NBA: Equipos de Data Analytics',                         url: 'https://x.com/basketmatica/status/1888524759593304212' },
  { fecha: 'Marzo 2025',      tema: '🧠', tipo: 'concepto', titulo: 'RPM vs APM: Midiendo impacto real',                                   url: 'https://x.com/basketmatica/status/1895831369911357904' },
  { fecha: 'Marzo 2025',      tema: '🛡️', tipo: 'concepto', titulo: 'STL% y BLK%: Más allá del Boxscore',                                 url: 'https://x.com/basketmatica/status/1903766115597078846' },
  { fecha: 'Abril 2025',      tema: '⚕️', tipo: 'concepto', titulo: 'Load Management: Prevenir lesiones',                                  url: 'https://x.com/basketmatica/status/1911451593058172966' },
  { fecha: 'Mayo 2025',       tema: '🧠', tipo: 'concepto', titulo: 'Contexto: La métrica invisible',                                       url: 'https://x.com/basketmatica/status/1918994267394941208' },
  { fecha: 'Mayo 2025',       tema: '🧠', tipo: 'concepto', titulo: 'Scouting con Datos: Talento oculto',                                   url: 'https://x.com/basketmatica/status/1926655639939400029' },
  { fecha: 'Junio 2025',      tema: '🏀', tipo: 'concepto', titulo: 'Self-Creation: %AST vs %UAST',                                        url: 'https://x.com/basketmatica/status/1934224789121499286' },
  { fecha: 'Julio 2025',      tema: '🧠', tipo: 'concepto', titulo: 'Analítica en tiempo real: cómo no ahogarte en datos durante el partido', url: 'https://x.com/basketmatica/status/1945130419009073201' },
  { fecha: 'Julio 2025',      tema: '🛡️', tipo: 'caso',     titulo: 'Marcus Smart a los Lakers: un fichaje que los datos explican',        url: 'https://x.com/basketmatica/status/1947333693439094799' },
  { fecha: 'Julio 2025',      tema: '💻', tipo: 'concepto', titulo: 'El Factor 0.4: Matemáticas de los TL',                               url: 'https://x.com/basketmatica/status/1948051932029001903' },
  { fecha: 'Julio 2025',      tema: '💻', tipo: 'concepto', titulo: 'Ampliación del 0.4: ¿Cuándo quedará obsoleto?',                       url: 'https://x.com/basketmatica/status/1950601060768252247' },
  { fecha: 'Agosto 2025',     tema: '🏀', tipo: 'concepto', titulo: 'Triples: Arquetipos de Volumen/Eficacia',                             url: 'https://x.com/basketmatica/status/1954972940706947521' },
  { fecha: 'Agosto 2025',     tema: '🏀', tipo: 'concepto', titulo: 'Hot Hand: ¿Mito o Realidad?',                                         url: 'https://x.com/basketmatica/status/1955694315448971528' },
  { fecha: 'Septiembre 2025', tema: '🏀', tipo: 'caso',     titulo: 'Análisis ofensivo de Santi Aldama en el Eurobasket 2025',             url: 'https://x.com/basketmatica/status/1965112257278628273' },
  { fecha: 'Septiembre 2025', tema: '🏀', tipo: 'caso',     titulo: 'Alperen Sengun: Explosión Estadística',                               url: 'https://x.com/basketmatica/status/1967661236457185524' },
  { fecha: 'Septiembre 2025', tema: '🧠', tipo: 'concepto', titulo: 'Rotaciones Óptimas: Gestión de minutos',                              url: 'https://x.com/basketmatica/status/1970930758949695750' },
  { fecha: 'Octubre 2025',    tema: '🧠', tipo: 'concepto', titulo: 'Win Shares: Aportando victorias',                                     url: 'https://x.com/basketmatica/status/1976006603427254294' },
  { fecha: 'Octubre 2025',    tema: '🛡️', tipo: 'concepto', titulo: 'Glue Guys: Midiendo intangibles',                                    url: 'https://x.com/basketmatica/status/1981436265988857885' },
  { fecha: 'Octubre 2025',    tema: '🧠', tipo: 'concepto', titulo: 'Modelo RAPTOR: Emparejamientos',                                      url: 'https://x.com/basketmatica/status/1983625603812118537' },
  { fecha: 'Enero 2026',      tema: '💻', tipo: 'concepto', titulo: '¿Y si borramos el Boxscore? (Tracking)',                              url: 'https://x.com/i/status/2011688595292074447' },
  { fecha: 'Enero 2026',      tema: '🏀', tipo: 'concepto', titulo: 'Box Creation: la métrica de los creadores',                           url: 'https://x.com/basketmatica/status/2014770253348110381' },
  { fecha: 'Junio 2026',      tema: '🛡️', tipo: 'concepto', titulo: 'DFG%: La defensa al tiro rival',                                      url: 'https://x.com/basketmatica/status/2062429183570239647' },
  { fecha: 'Julio 2026',      tema: '🏀', tipo: 'concepto', titulo: 'eFG%: La métrica que no distingue tiradores',                          url: 'https://x.com/basketmatica/status/2072213668104999085' },
  { fecha: 'Agosto 2026',     tema: '🏀', tipo: 'caso',     titulo: 'Top 10 TS% ACB 25/26: dietas de tiro y no tiradores',                  url: 'https://x.com/basketmatica/status/2087479462548152577' },
  { fecha: 'Agosto 2026',     tema: '🧠', tipo: 'caso',     titulo: 'El líder de PIR de la ACB 25/26 no gana ningún premio',                url: 'https://x.com/basketmatica/status/2090016185496789184' },
  { fecha: 'Agosto 2026',     tema: '🧠', tipo: 'caso',     titulo: 'Contador vs tasa en la lista de España: análisis jugador por jugador',                url: 'https://x.com/basketmatica/status/2093277671178609147' },
  { fecha: 'Septiembre 2026', tema: '🧠', tipo: 'concepto', titulo: 'Ritmo y victorias: correr no explica ganar',                         url: 'https://x.com/basketmatica/status/2095406509786329470' },
  { fecha: 'Septiembre 2026', tema: '🧠', tipo: 'caso',     titulo: 'Valencia Basket 25/26: los 4 Factores del campeón',               url: 'https://x.com/basketmatica/status/2097943208030560256' },
  { fecha: 'Noviembre 2026',  tema: '🏀', tipo: 'concepto', titulo: 'Offensive Load: lo que el USG% no ve',                                 url: 'https://x.com/basketmatica/status/2117949325255102509' },
];
