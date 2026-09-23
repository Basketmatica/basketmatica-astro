---
title: "Glosario de Basketball Analytics"
description: "Definiciones y fórmulas de las métricas y conceptos clave del análisis moderno del baloncesto, con enlaces a los hilos donde se aplican."
pubDate: "2024-09-08T13:02:59.000Z"
category: "Herramientas"
heroImage: "../../assets/blog/glosario-de-basketball-analytics/glosario-basketball-analytics.png"
heroAlt: "Balón de baloncesto rodeado de gráficos y métricas como eFG %, TS %, USG %, PER y ORTG/DRTG"
originalSlug: "glosario-de-basketball-analytics"
---

¡Bienvenido al Glosario de Basketball Analytics! Este recurso está diseñado para ayudarte a descubrir y entender las métricas y conceptos clave que están transformando el análisis del baloncesto moderno. Aquí encontrarás definiciones claras y ejemplos prácticos de las estadísticas avanzadas más utilizadas por analistas, entrenadores y aficionados de todo el mundo.

Este glosario se actualiza regularmente con nuevos términos que vamos explorando en nuestros hilos de X y artículos. Puedes acceder a mi cuenta de X pulsando [aquí](https://x.com/basketmatica). Ya seas un principiante en el análisis de datos aplicado al baloncesto, un experto buscando afinar tus conocimientos o simplemente un amante de este deporte, este glosario es tu punto de referencia. ¡Espero que encuentres esta herramienta útil y educativa! Te dejo un índice aquí arriba para que encuentres el término que estás buscando fácilmente.

### Notación de las fórmulas

Todas las fórmulas usan las mismas siglas, las habituales en Basketball Reference y NBA.com. Los porcentajes (métricas cuyo nombre termina en %) se expresan de 0 a 100, y los ratios (2PR, 3PR, FTR, PPA) como cociente.

| Sigla | Significado |
| --- | --- |
| FGA / FGM | Tiros de campo intentados / convertidos |
| 2PA / 3PA / 3PM | Tiros de 2 intentados / tiros de 3 intentados / triples convertidos |
| FTA / FTM | Tiros libres intentados / convertidos |
| ORB / DRB / REB | Rebotes ofensivos / defensivos / totales |
| AST / STL / BLK | Asistencias / robos / tapones realizados |
| BLKA | Tapones recibidos |
| TOV | Pérdidas de balón |
| PF / FD | Faltas personales cometidas / recibidas |
| PTS | Puntos |
| MP | Minutos jugados por el jugador |
| POS | Posesiones |
| DFGM / DFGA | Tiros anotados / intentados por el rival con el jugador como defensor más cercano |
| Subíndice <sub>eq</sub> | Valor del equipo (por ejemplo, MP<sub>eq</sub> son los minutos totales del equipo, la suma de los cinco jugadores en pista, de modo que MP<sub>eq</sub>/5 equivale a los minutos de un jugador que jugase todo el partido) |
| Subíndice <sub>riv</sub> | Valor del equipo rival |
| Subíndice *ast* / *uast* | Solo los tiros convertidos con asistencia / sin asistencia |

Sobre el multiplicador de los tiros libres: en la fórmula de POS se usa 0,4 y en TS%, TOV% y USG% se usa 0,44. Son dos aproximaciones distintas de cuántos tiros libres cierran una posesión (0,44 es el valor calibrado que usan Basketball Reference y NBA.com para las métricas de jugador; el 0,4 de POS tiene su [hilo explicativo](https://x.com/basketmatica/status/1948051932029001903)).

#### 2 Point Rate (2PR)

**Definición:** Mide la proporción de tiros de 2 puntos respecto al total de tiros de campo intentados por un jugador o equipo.

**Fórmula:**

$$
\mathrm{2PR} = \frac{\twoPA}{\FGA}
$$

**Es útil para:** Evaluar el enfoque ofensivo de un jugador o equipo, especialmente en comparación con su tendencia a lanzar desde el perímetro.

[**Ampliación/Aplicación**](/2024/06/13/como-se-corono-lebron-james-como-maximo-anotador-de-la-historia/#:~:text=Ratios%3A,de%2010%20temporadas\).)

#### 3 Point Rate (3PR)

**Definición:** Mide la proporción de tiros de 3 puntos respecto al total de tiros de campo intentados por un jugador o equipo.

**Fórmula:**

$$
\mathrm{3PR} = \frac{\threePA}{\FGA}
$$

**Es útil para:** Analizar la dependencia de un jugador o equipo en los tiros de larga distancia y su estrategia ofensiva.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1818345457757688107)

#### Adjusted Plus-Minus (APM)

**Definición:** Ajusta el Plus-Minus básico al considerar la calidad de los compañeros de equipo y oponentes, usando modelos estadísticos (regresiones) para aislar el impacto individual de un jugador.

**Es útil para:** Medir el valor verdadero de un jugador más allá de su entorno, proporcionando una evaluación más justa de su impacto en el juego. Es la base sobre la que se construye el Real Plus-Minus (RPM), que además incorpora información del boxscore.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1828039347926335824)

#### Assist Percentage (AST%)

**Definición:** Estima el porcentaje de tiros de campo convertidos por sus compañeros, mientras el jugador está en pista, que provienen de una asistencia suya.

**Fórmula:**

$$
\mathrm{AST\%} = 100 \times \frac{\AST}{\left(\dfrac{\MP}{\MP_{eq}/5}\right) \times \FGM_{eq} - \FGM}
$$

**Es útil para:** Evaluar la capacidad de un jugador para crear oportunidades de anotación para sus compañeros, reflejando su rol en la distribución del juego. En un equipo, la fórmula se simplifica a AST/FGM del equipo, que coincide con el FGM %AST.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1818345462295908558)

#### Block Percentage (BLK%)

**Definición:** Estima el porcentaje de intentos de tiro de 2 puntos del equipo rival que un jugador bloquea mientras está en cancha. Se ajusta en función de los minutos jugados y del volumen de tiros de 2 intentados por los oponentes (los triples se excluyen porque rara vez se taponan) para proporcionar una medición relativa del impacto en protección del aro.

**Fórmula:**

$$
\mathrm{BLK\%} = 100 \times \frac{\BLK \times (\MP_{eq}/5)}{\MP \times (\FGA_{riv} - \threePA_{riv})}
$$

**Es útil para:** Evaluar la capacidad de un jugador como protector del aro más allá del número total de tapones. Permite comparar jugadores con diferentes roles y tiempos de juego, identificando a aquellos que realmente disuaden intentos de tiro cerca del aro.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1903766101458129336)

#### Bottom Up Metrics

**Definición:** Métricas que se centran en la producción individual de un jugador, como la valoración (VAL).

**Es útil para:** Analizar el rendimiento individual de un jugador de manera aislada, sin considerar el contexto del equipo.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1816082554312609954)

#### Defensive Field Goal Percentage (DFG%)

**Definición:** Mide el porcentaje de tiros que el rival convierte cuando un jugador es su defensor más cercano. No cuenta cuántos tiros tapona, sino cuánto degrada la eficiencia del rival en los lanzamientos que defiende. El dato lo genera el tracking óptico, que asigna un único defensor a cada tiro según la proximidad en el momento del lanzamiento, por lo que es un *proxy* (en esquemas de ayudas o cambios puede atribuir el tiro a quien rotaba y no al responsable real de la cobertura).

**Fórmula:**

$$
\mathrm{DFG\%} = 100 \times \frac{\DFGM}{\DFGA}
$$

**Es útil para:** Evaluar el impacto defensivo individual al contestar tiros, algo que el boxscore tradicional no recoge. Debe leerse segmentado por distancia (protección de aro vs. cierre perimetral) y, sobre todo, mediante el DIFF%: la diferencia entre el porcentaje real del rival y la media de la liga en esa zona. El número bruto engaña —un pívot siempre tendrá un DFG% más alto que un base por defender tiros cercanos al aro— y tampoco captura la disuasión, los tiros que el rival decide no intentar.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/2062429183570239647)

#### Defensive Box Plus-Minus (DBPM)

**Definición:** Métrica complementaria al OBPM que estima el impacto defensivo de un jugador por cada 100 posesiones del equipo, respecto a un jugador promedio de la liga (0 = promedio). Es una métrica basada en el boxscore, creada por Daniel Myers y publicada por Basketball Reference. A diferencia del OBPM, el DBPM depende más del contexto del equipo, ya que las estadísticas individuales defensivas son más limitadas y menos representativas del impacto real.

**Es útil para:** Tener una referencia aproximada del impacto defensivo de un jugador en comparación con el promedio de la liga. Aunque menos precisa que su contraparte ofensiva, ayuda a detectar tendencias y comparar aportes defensivos entre jugadores con roles distintos.

#### Defensive Rating (DefRtg)

**Definición:** Mide la cantidad de puntos permitidos cada 100 posesiones. En un equipo se calcula con todos sus partidos; en un jugador, con las posesiones del equipo mientras él está en pista.

**Fórmula:** ([Explicación de por qué se pondera a 100 posesiones](https://x.com/basketmatica/status/1869867724874129710))

$$
\mathrm{DefRtg} = 100 \times \frac{\PTS_{riv}}{\POS_{riv}}
$$

**Es útil para:** Comprender la eficacia de un equipo (o de un jugador o alineación, mientras están en pista) para evitar que sus oponentes anoten, lo que la hace valiosa a la hora de analizar los enfrentamientos defensivos y la defensa general del equipo. Además, al medirse cada 100 posesiones, es ideal para comparar con otros equipos o jugadores.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1848769588194091220)

#### Defensive Rebound Percentage (DRB%)

**Definición:** Determina el porcentaje de rebotes defensivos disponibles que un jugador o equipo captura. Los rebotes defensivos disponibles son los que captura el equipo más los rebotes ofensivos del rival.

**Fórmula:**

$$
\mathrm{DRB\%} = 100 \times \frac{\DRB \times (\MP_{eq}/5)}{\MP \times (\DRB_{eq} + \ORB_{riv})}
$$

**Es útil para:** Evaluar la capacidad de un jugador o equipo para asegurar posesiones después de que el oponente falle un tiro. En un equipo, la fórmula se simplifica a DRB<sub>eq</sub> / (DRB<sub>eq</sub> + ORB<sub>riv</sub>).

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1809359563503857952)

#### Defensive Turnover Percentage (DTOV%)

**Definición:** Mide el porcentaje de posesiones del equipo rival que terminan en pérdida de balón. Es el TOV% del rival y se aplica a equipos, ya que el boxscore no permite separar qué pérdidas son provocadas por la defensa y cuáles son errores del atacante.

**Fórmula:**

$$
\mathrm{DTOV\%} = 100 \times \frac{\TOV_{riv}}{\FGA_{riv} + 0{,}44 \times \FTA_{riv} + \TOV_{riv}}
$$

**Es útil para:** Evaluar la efectividad defensiva de un equipo en términos de generar pérdidas de balón del rival.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1809359563503857952)

#### Dunk Score

**Definición:** Métrica desarrollada por NBA Stats basada en IA y datos de tracking que mide la calidad de un mate realizado por un jugador durante un partido o temporada.

**Es útil para:** Evaluar de manera objetiva la calidad de un mate, enriqueciendo las narrativas alrededor del juego y desglosando una acción tan compleja como es un mate en parámetros analizables (salto, estilo, potencia y contexto de los defensores).

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1863192053871444032)

#### Effective Field Goal Percentage (eFG%)

**Definición:** Mide la eficiencia en el tiro de un jugador o equipo, dando mayor peso a los tiros de tres puntos debido a su mayor valor.

**Fórmula:**

$$
\mathrm{eFG\%} = 100 \times \frac{\FGM + 0{,}5 \times \threePM}{\FGA}
$$

**Es útil para:** Comparar la eficiencia de tiro considerando el valor adicional de los triples, ofreciendo una evaluación más precisa que el porcentaje de tiro simple.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1809359544394420729)

#### Eight Factors

**Definición:** Expansión de los Four Factors de Dean Oliver, añadiendo las contrapartes defensivas de cada factor. Incluye Effective Field Goal Percentage (eFG%), eFG% del rival, Free Throw Rate (FTR), FTR del rival, Offensive Rebound Percentage (ORB%), Defensive Rebound Percentage (DRB%), Turnover Percentage (TOV%) y Defensive Turnover Percentage (DTOV%).

**Es útil para:** Evaluar de manera integral el rendimiento de un equipo, considerando tanto su ataque como su defensa.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1809359563503857952)

#### FGM %AST

**Definición:** Mide la proporción de los tiros de campo anotados que provienen de una asistencia.

**Fórmula:**

$$
\mathrm{FGM\ \%AST} = \frac{\FGM_{ast}}{\FGM}
$$

**Es útil para:** Medir cuánto del ataque de un jugador o equipo depende de la creación colectiva y del movimiento de balón. Un valor alto suele indicar buen juego en equipo y circulación de balón efectiva.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1934224789121499286)

#### FGM %UAST

**Definición:** Mide la proporción de los tiros de campo anotados que fueron generados sin asistencia.

**Fórmula:**

$$
\mathrm{FGM\ \%UAST} = \frac{\FGM_{uast}}{\FGM} = 1 - \mathrm{FGM\ \%AST}
$$

**Es útil para:** Evaluar la capacidad de creación individual de un jugador o equipo. Un valor alto refleja mayor volumen de jugadas de uno contra uno, creación propia o situaciones de aclarado (ISO).

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1934224789121499286)

#### Four Factors

**Definición:** Concepto creado por Dean Oliver que engloba cuatro métricas clave que tienen una alta correlación con la victoria en un juego: Effective Field Goal Percentage (40%), Turnover Percentage (25%), Offensive Rebound Percentage (20%) y Free Throw Rate (15%). Entre paréntesis figuran los pesos aproximados que Dean Oliver asignaba a cada factor.

**Es útil para:** Analizar las áreas críticas que determinan el éxito de un equipo en un partido.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1809359535561216002)

#### Free Throw Rate (FTR)

**Definición:** Calcula la frecuencia con la que un jugador o equipo va a la línea de tiros libres en relación con los tiros de campo intentados.

**Fórmula:**

$$
\mathrm{FTR} = \frac{\FTA}{\FGA}
$$

**Es útil para:** Evaluar la capacidad de un jugador o equipo para generar oportunidades en la línea de tiros libres, lo que puede ser clave en partidos apretados. Nota: en los Four Factors, Dean Oliver usa los tiros libres convertidos (FTM/FGA) en lugar de los intentados.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1809359551227113715)

#### Net Rating (NetRtg)

**Definición:** Métrica que mide la diferencia entre los puntos anotados y los puntos recibidos por cada 100 posesiones.

**Fórmula:**

$$
\mathrm{NetRtg} = \mathrm{OffRtg} - \mathrm{DefRtg}
$$

**Es útil para:** Evaluar de forma integral el rendimiento de un equipo (o de un jugador o alineación, mientras están en pista), combinando su eficiencia ofensiva y defensiva en una sola métrica. Al estar normalizada por 100 posesiones, permite comparar fácilmente equipos con diferentes ritmos de juego.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1918994269546656114)

#### Offensive Box Plus-Minus (OBPM)

**Definición:** Métrica desarrollada por Daniel Myers y publicada por Basketball Reference que estima la contribución ofensiva de un jugador por cada 100 posesiones del equipo, respecto a un jugador promedio de la liga (0 = promedio). Es una métrica basada en el boxscore: convierte estadísticas individuales (puntos, asistencias, pérdidas, etc.) en una estimación del impacto, mediante una regresión calibrada contra métricas de impacto en pista, y la ajusta por el contexto del equipo y el ritmo de juego.

**Es útil para:** Cuantificar el impacto ofensivo de un jugador de forma más completa que las estadísticas tradicionales. Permite comparar el valor ofensivo de jugadores con diferentes roles y minutos, identificando a aquellos que realmente elevan el rendimiento del equipo cuando están en pista.

#### Offensive Rating (OffRtg)

**Definición:** Mide la cantidad de puntos anotados cada 100 posesiones. En un equipo se calcula con todos sus partidos; en un jugador, con las posesiones del equipo mientras él está en pista.

**Fórmula:** ([Explicación de por qué se pondera a 100 posesiones](https://x.com/basketmatica/status/1869867724874129710))

$$
\mathrm{OffRtg} = 100 \times \frac{\PTS}{\POS}
$$

**Es útil para:** Comparar el rendimiento ofensivo entre diferentes equipos, jugadores o alineaciones, ya que se ajusta el número de posesiones por fines comparativos. Se utiliza para identificar qué jugadores o alineaciones están contribuyendo más a la producción ofensiva del equipo.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1848769588194091220)

#### Offensive Rebound Percentage (ORB%)

**Definición:** Determina el porcentaje de rebotes ofensivos disponibles que un jugador o equipo captura. Los rebotes ofensivos disponibles son los que captura el equipo más los rebotes defensivos del rival.

**Fórmula:**

$$
\mathrm{ORB\%} = 100 \times \frac{\ORB \times (\MP_{eq}/5)}{\MP \times (\ORB_{eq} + \DRB_{riv})}
$$

**Es útil para:** Evaluar la capacidad de un equipo o jugador para extender posesiones y crear segundas oportunidades de anotación. En un equipo, la fórmula se simplifica a ORB<sub>eq</sub> / (ORB<sub>eq</sub> + DRB<sub>riv</sub>).

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1809359551227113715)

#### PACE

**Definición:** Mide el número de posesiones que un equipo juega por cada 48 minutos (ponderación NBA), indicando la velocidad del juego. En competiciones FIBA (ACB, Euroliga) se normaliza a 40 minutos.

**Fórmula:**

$$
\mathrm{PACE} = 48 \times \frac{\POS_{eq} + \POS_{riv}}{2 \times (\MP_{eq}/5)}
$$

**Es útil para:** Analizar la dinámica de un equipo en cuanto a su estilo de juego, ya sea que prefiera un ritmo más rápido o uno más controlado.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1818345459838067053)

#### Player Efficiency Rating (PER)

**Definición:** Evalúa el rendimiento de un jugador por minuto en cancha, considerando diversas estadísticas positivas y negativas. La media de la liga se normaliza a 15.

**Es útil para:** Evaluar de manera completa la contribución de un jugador, yendo más allá de las métricas de rendimiento tradicionales. Además, permite comparar jugadores de diferentes posiciones y roles, ya que ajusta por minutos jugados y las estadísticas promedio de la NBA.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1838153088521142778)

#### Player Impact Estimate (PIE)

**Definición:** Mide la contribución global de un jugador en un partido, incorporando la mayoría de las estadísticas del boxscore para calcular el porcentaje de eventos del partido en los que el jugador ha tenido un impacto.

**Es útil para:** Evaluar la influencia general de un jugador en el resultado de un partido, considerando tanto su producción ofensiva como defensiva.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1816082569412137264)

#### Plus-Minus (+/-)

**Definición:** Mide el impacto de un jugador en el marcador mientras está en la cancha, calculando la diferencia de puntos del equipo durante los minutos que el jugador está en pista.

**Fórmula:**

$$
\text{Plus-Minus} = \PTS_{eq}^{\text{(en pista)}} - \PTS_{riv}^{\text{(en pista)}}
$$

**Es útil para:** Evaluar cómo cambia el rendimiento de un equipo con un jugador en particular en la cancha, aunque no considera el contexto de los compañeros y oponentes.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1828039339936215291)

#### Points Per Attempt (PPA)

**Definición:** Calcula la cantidad de puntos que un jugador promedia por cada tiro de campo que intenta. Los puntos incluyen los de tiros libres.

**Fórmula:**

$$
\mathrm{PPA} = \frac{\PTS}{\FGA}
$$

**Es útil para:** Medir la eficiencia en la anotación de un jugador, comparando cuántos puntos obtiene en relación a la cantidad de tiros que realiza.

[**Ampliación/Aplicación**](/2024/06/13/como-se-corono-lebron-james-como-maximo-anotador-de-la-historia/#:~:text=Ratios%3A,de%2010%20temporadas\).)

#### Posesiones (POS)

**Definición:** Calcula el número de oportunidades que un equipo o jugador tiene para realizar una jugada. Se usa para medir el ritmo del juego y evaluar la eficiencia de un equipo o jugador.

**Fórmula:** ([Explicación de por qué no uso el factor 0,96](https://x.com/basketmatica/status/1841114749519741018) y [qué significa el multiplicador 0,4](https://x.com/basketmatica/status/1948051932029001903))

$$
\mathrm{POS} = \FGA + \TOV + 0{,}4 \times \FTA - \ORB
$$

**Es útil para:** Evaluar el rendimiento de un equipo o jugador en relación con las oportunidades que tienen para anotar. Permite comparar el ritmo, la eficiencia ofensiva y defensiva de los equipos, ya que la posesión determina las oportunidades disponibles para anotar puntos. Importante anotar que un rebote ofensivo no genera una nueva posesión, sencillamente extiende la actual (por ello se restan los rebotes ofensivos en la fórmula).

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1848769578127806966)

#### RAPTOR

**Definición:** Métrica de impacto desarrollada por FiveThirtyEight que estima la contribución ofensiva (ORAPTOR) y defensiva (DRAPTOR) de un jugador por cada 100 posesiones. Combina información de tracking data, estadísticas del boxscore, datos play-by-play y Plus-Minus. Su objetivo es aislar el efecto real del jugador sobre el rendimiento del equipo, corrigiendo por calidad de compañeros y rivales. FiveThirtyEight dejó de actualizarla tras la temporada 2022-23, por lo que hoy se usa como referencia histórica.

**Es útil para:** Evaluar el impacto global o contextualizado de un jugador en ambos extremos de la cancha. Permite analizar ajustes de rotación, valoraciones comparativas históricas o proyectadas y detección de ventajas en emparejamientos ofensivos y defensivos.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1983625603812118537)

#### Real Plus-Minus (RPM)

**Definición:** Mide el impacto global de un jugador en el rendimiento de su equipo, tanto en defensa como en ataque. Utiliza un modelo estadístico que ajusta la contribución individual de un jugador según la calidad de sus compañeros y oponentes. Parte de un APM regularizado y lo combina con información del boxscore para estabilizar las estimaciones.

**Es útil para:** Ofrecer una estimación más precisa del verdadero valor de un jugador, separando su impacto del de los demás en la cancha.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1828039350086463563)

#### Shot Making Efficiency

**Definición:** Métrica desarrollada por BBall Index que mide el rendimiento en el tiro de un jugador en comparación con lo esperado. Calcula un eFG% esperado basado en la dificultad del tiro, considerando factores como localización, tipo de tiro y nivel de contestación, y lo compara con el eFG% real.

**Es útil para:** Evaluar con precisión la efectividad de un jugador, ajustando los resultados según el promedio de la liga en tiros de dificultad equivalente. Esto permite minimizar sesgos derivados de tamaños de muestra pequeños y tener en cuenta múltiples factores que influyen en la calidad del tiro.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1880950972861591804)

#### Steal Percentage (STL%)

**Definición:** Métrica que estima el porcentaje de posesiones del equipo rival que terminan en un robo del jugador mientras está en pista. Se ajusta por los minutos disputados para ofrecer una medición más precisa del impacto en generación de pérdidas.

**Fórmula:**

$$
\mathrm{STL\%} = 100 \times \frac{\STL \times (\MP_{eq}/5)}{\MP \times \POS_{riv}}
$$

**Es útil para:** Determinar qué jugadores fuerzan más pérdidas en defensa de manera eficiente, sin depender únicamente del conteo total de robos. Es clave para identificar defensores disruptivos en el perímetro o en líneas de pase, ajustando las comparaciones según el contexto de juego.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1903766108357664824)

#### Top Down Metrics

**Definición:** Métricas que evalúan el rendimiento de un jugador en el contexto del rendimiento del equipo completo, como el Plus-Minus.

**Es útil para:** Analizar cómo el rendimiento individual de un jugador se integra en el éxito global del equipo, proporcionando una visión global de su impacto.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1816082554312609954)

#### True Shooting Percentage (TS%)

**Definición:** Mide la eficiencia en el tiro de un jugador o equipo considerando tiros de campo, triples y tiros libres, proporcionando una visión más completa que el eFG%.

**Fórmula:**

$$
\mathrm{TS\%} = 100 \times \frac{\PTS}{2 \times (\FGA + 0{,}44 \times \FTA)}
$$

**Es útil para:** Evaluar la eficiencia total en el tiro, integrando tiros de campo, triples y tiros libres, lo que permite comparar jugadores con diferentes estilos de anotación.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1819680396662984860)

#### Turnover Percentage (TOV%)

**Definición:** Mide el porcentaje de posesiones de un jugador o equipo que terminan en pérdida de balón. Para un jugador, las posesiones se estiman como sus tiros de campo intentados, sus tiros libres (con el factor 0,44) y sus pérdidas.

**Fórmula:**

$$
\mathrm{TOV\%} = 100 \times \frac{\TOV}{\FGA + 0{,}44 \times \FTA + \TOV}
$$

**Es útil para:** Evaluar la seguridad con la que un jugador o equipo maneja el balón y cómo influye en la eficiencia de las posesiones de su equipo.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1809359548433723871)

#### Usage Percentage (USG%)

**Definición:** Indica el porcentaje de jugadas ofensivas de un equipo en las que un jugador termina la jugada mientras está en cancha, ya sea intentando un tiro (de campo o libre) o perdiendo el balón. Las asistencias no cuentan como jugada finalizada.

**Fórmula:**

$$
\mathrm{JF} = \FGA + 0{,}44 \times \FTA + \TOV
$$

$$
\mathrm{USG\%} = 100 \times \frac{\mathrm{JF} \times (\MP_{eq}/5)}{\MP \times \mathrm{JF}_{eq}}
$$

donde JF son las jugadas finalizadas (tiros de campo, tiros libres y pérdidas), del jugador o, con el subíndice *eq*, del equipo.

**Es útil para:** Ver la cantidad de posesiones en la que un jugador es el "foco" y detectar qué jugadores tienen más protagonismo en términos de finalización de jugadas ofensivas.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1838153083026592179)

#### Valoración (VAL)

**Definición:** Métrica que se utiliza para medir el rendimiento global de los jugadores en la pista de baloncesto (conocida como PIR en la Euroliga). Se basa en estadísticas acumulativas: suma las acciones positivas (puntos, rebotes, asistencias, robos, tapones y faltas recibidas) y resta las negativas (tiros fallados, pérdidas, tapones recibidos y faltas cometidas).

**Fórmula:**

$$
\begin{aligned}
\mathrm{VAL} ={} & \PTS + \REB + \AST + \STL \\
& + \BLK + \FD \\
& - (\FGA - \FGM) - (\FTA - \FTM) \\
& - \TOV - \BLKA - \PF
\end{aligned}
$$

**Es útil para:** Proporcionar una visión rápida y comprensible del rendimiento total de un jugador en un partido, aunque no ajusta para el contexto o la calidad de la competición.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1804495718205247706)

#### Win Shares (WS)

**Definición:** Métrica que estima el número de victorias que un jugador aporta a su equipo. Combina el impacto ofensivo y defensivo en un único valor, y el total de WS de todos los jugadores de un equipo se aproxima al total real de victorias del equipo.

**Es útil para:** Evaluar el impacto global de los jugadores más allá de las estadísticas tradicionales, identificar quiénes contribuyen al éxito del equipo y orientar las decisiones de los entrenadores en la confección de la plantilla, las rotaciones y el desarrollo de los jugadores.

[**Ampliación/Aplicación**](https://x.com/basketmatica/status/1976006603427254294)
