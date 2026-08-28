import type { SubjectContent } from "./_schema";

/**
 * Análisis Instrumental Farmacéutico (UNAL) — desde el programa oficial
 * "PROGRAMACIÓN 2025-2S" (Prof. Lozano / García Castañeda / Martínez Ramírez).
 * Código 2015649. Las fechas se dejan vacías: van en la app.
 */
export const aif: SubjectContent = {
  code: "AIF",
  slug: "aif",
  name: "Análisis Instrumental Farmacéutico",
  credits: "4",
  professors: [
    "José Manuel Lozano Moreno (Módulo I)",
    "Javier Eduardo García Castañeda (Módulo II)",
    "Jorge Ariel Martínez Ramírez (Módulo III)",
  ],
  scheduleTheory: "Martes 7:00–9:00, Miércoles 7:00–8:00",
  scheduleLab: "Miércoles / Jueves / Viernes 8:00–13:00 (según grupo)",
  totalClasses: 32,
  hasLab: true,
  descriptionSummary:
    "Manejo teórico y práctico de las **técnicas instrumentales** más usadas en el análisis fisicoquímico farmacéutico —polarimetría, refractometría, espectrofotometría UV-Vis, IR, métodos potenciométricos, HPLC y GC— con énfasis en el **fundamento de la técnica**, el conocimiento del instrumento y el desarrollo de métodos analíticos aplicados al **control de calidad**.",
  objectiveGeneral:
    "Proporcionar al estudiante conocimiento de los **principios fundamentales del análisis instrumental** aplicado al análisis farmacéutico y su aplicación en el control de la calidad. Al finalizar será capaz de **seleccionar y ejecutar** apropiadamente las técnicas para el análisis cualitativo y cuantitativo en el ámbito farmacéutico, químico y de alimentos, con tratamiento de datos e interpretación de resultados bajo la normatividad nacional e internacional.",
  objectivesSpecific: [
    "Relacionar el **fundamento fisicoquímico** de cada técnica con el tipo de información que entrega, su instrumentación y sus límites.",
    "Desarrollar y aplicar **métodos analíticos** cuantitativos (curva de calibración, adición de estándar, estándar interno) con criterios de calidad.",
    "Interpretar espectros y cromatogramas para **identificar y cuantificar** analitos en materias primas y productos farmacéuticos.",
  ],

  // AIF tiene componente cuantitativo y de laboratorio fuerte: se muestran todas
  // las secciones.
  sections: ["modulos", "proyectos", "fechas", "glosario", "formulas", "bibliografia", "insumos", "prompt-ia"],

  modules: [
    {
      slug: "metodos-fisicos",
      title: "Módulo 1: Métodos físicos de análisis — refractometría y polarimetría",
      description:
        "Fundamento, instrumentación y aplicaciones de la **refractometría** (índice de refracción, ley de Snell) y la **polarimetría** (rotación óptica, rotación específica). Uso en identificación y control de pureza de materias primas.",
      hasLab: true,
      labProtocol: "Práctica 1. Métodos físicos de análisis: refractometría y polarimetría. Estandarización de soluciones.",
    },
    {
      slug: "espectrofotometria-fundamentos",
      title: "Módulo 2: Fundamentos de espectrofotometría",
      description:
        "Interacción radiación-materia. Leyes de la espectrofotometría: **ley de Lambert-Beer** y sus desviaciones. **Error espectrofotométrico**. Métodos de cuantificación por **aditividad** y **diferencial**. Elementos de estadística en el análisis instrumental (curva de calibración, S/N, LOD/LOQ).",
      hasLab: true,
      labProtocol: "Práctica 2. Estandarización de soluciones. Construcción y evaluación de una curva de calibración.",
    },
    {
      slug: "uv-visible",
      title: "Módulo 3: Espectrofotometría UV-Visible",
      description:
        "Transiciones electrónicas, **cromóforos y auxocromos**. Instrumentación (fuentes, monocromador, detector). Aplicaciones cualitativas y **cuantitativas** en control de calidad; determinación de la constante **pKa** por espectrofotometría; espectrofotometría de mezclas.",
      hasLab: true,
      labProtocol: "Prácticas 3 y 4. Aplicación de la espectrofotometría UV-Visible: cuantificación de un analito y determinación de pKa.",
    },
    {
      slug: "ir",
      title: "Módulo 4: Espectroscopía en la región infrarroja (FT-IR)",
      description:
        "Vibraciones moleculares y bandas características (huella dactilar). Técnicas de muestreo: **pastilla de KBr** y **ATR**. Instrumentación FT-IR. Aplicaciones **cualitativas**: identificación de materias primas frente a espectros de referencia de farmacopea.",
      hasLab: true,
      labProtocol: "Aplicación de la espectroscopía FT-IR en pastilla de KBr y método ATR. Identificación de materias primas.",
    },
    {
      slug: "metodos-electrometricos",
      title: "Módulo 5: Métodos potenciométricos y electrométricos",
      description:
        "**Potenciometría** y electrodos selectivos de iones; medida y control de **pH**. **Titulaciones potenciométricas** en medio acuoso y no acuoso, de **óxido-reducción** y **complejometría**. Aplicación a las volumetrías de neutralización del control de calidad.",
      hasLab: true,
      labProtocol: "Aplicaciones de la potenciometría a las volumetrías de neutralización en medio acuoso y no acuoso, óxido-reducción y complejometría.",
    },
    {
      slug: "cromatografia-fundamentos",
      title: "Módulo 6: Introducción a la cromatografía",
      description:
        "Historia y **clasificación de los métodos cromatográficos**. Principios básicos de la separación: retención (**k**), selectividad (**α**), eficiencia (**N**, HETP, **ecuación de van Deemter**) y **resolución**. Partes principales de un sistema cromatográfico. **Idoneidad del sistema** (system suitability).",
      hasLab: true,
      labProtocol: "Práctica-taller: reconocimiento de un sistema de cromatografía líquida y uno de gases. Partes principales y mecanismos de separación.",
    },
    {
      slug: "hplc-gc",
      title: "Módulo 7: Cromatografía líquida (HPLC) y de gases (GC)",
      description:
        "Fases móviles y estacionarias, inyección, bombas, hornos, columnas y **sistemas de detección**. **Cuantificación**: estándar externo, **estándar interno** y adición de estándar. Aplicación a la valoración de fármacos y a solventes residuales; evaluación experimental de la **ecuación de van Deemter**.",
      hasLab: true,
      labProtocol: "Práctica II: evaluación de la ecuación de van Deemter. Práctica III: identificación y cuantificación de dos fármacos en un medicamento.",
    },
    {
      slug: "tecnicas-acopladas-ms",
      title: "Módulo 8: Técnicas acopladas (GC-MS) e introducción a la espectrometría de masas",
      description:
        "Introducción a las **técnicas acopladas GC-MS**. La **espectrometría de masas** como detector: ionización por **impacto electrónico**, patrón de fragmentación, e introducción a la interpretación de espectros de masas.",
      hasLab: true,
      labProtocol: "Práctica demostrativa y taller de interpretación de un espectro de masas en modo de impacto electrónico.",
    },
  ],

  glossary: [
    { term: "Relación señal/ruido (S/N)", moduleSlug: "espectrofotometria-fundamentos", definition: "Cociente entre la **señal analítica** y el **ruido de fondo**; determina la detectabilidad. LOD ≈ S/N de 3; LOQ ≈ S/N de 10." },
    { term: "LOD / LOQ", moduleSlug: "espectrofotometria-fundamentos", definition: "**Límite de detección**: menor concentración distinguible del blanco con confianza razonable. **Límite de cuantificación**: menor concentración medible con exactitud y precisión aceptables." },
    { term: "Adición de estándar", moduleSlug: "espectrofotometria-fundamentos", definition: "Técnica de calibración en la que se añaden cantidades conocidas del analito a la propia muestra para **corregir el efecto matriz**." },
    { term: "Estándar interno", moduleSlug: "hplc-gc", definition: "Compuesto de referencia añadido en cantidad constante a patrones y muestras; se cuantifica por la **razón de señales** analito/estándar, corrigiendo variaciones de inyección." },
    { term: "Ley de Lambert-Beer", moduleSlug: "espectrofotometria-fundamentos", definition: "La **absorbancia** es proporcional a la concentración y al paso óptico: A = ε·b·c. Se desvía a concentraciones altas y con radiación no monocromática." },
    { term: "Cromóforo / auxocromo", moduleSlug: "uv-visible", definition: "**Cromóforo**: grupo responsable de la absorción UV-Vis (conjugación, aromáticos). **Auxocromo**: grupo que desplaza o intensifica la banda (–OH, –NH₂)." },
    { term: "ATR (reflectancia total atenuada)", moduleSlug: "ir", definition: "Técnica de muestreo en IR que permite analizar sólidos y líquidos directamente sobre un cristal, sin preparar pastilla de KBr." },
    { term: "Potenciometría", moduleSlug: "metodos-electrometricos", definition: "Medida del **potencial** de una celda a corriente ≈ 0 para determinar la actividad de un ion; base del pH-metro y de los electrodos selectivos." },
    { term: "Titulación potenciométrica", moduleSlug: "metodos-electrometricos", definition: "Valoración en la que el punto de equivalencia se detecta por el **cambio brusco de potencial** (o de pH), no por un indicador visual." },
    { term: "Idoneidad del sistema (system suitability)", moduleSlug: "cromatografia-fundamentos", definition: "Pruebas (repetibilidad de área, factor de cola, platos teóricos, resolución) que verifican que el sistema cromatográfico es **apto antes** de analizar muestras." },
    { term: "Resolución cromatográfica (Rs)", moduleSlug: "cromatografia-fundamentos", definition: "Grado de separación entre dos picos vecinos; combina **retención, selectividad y eficiencia**. Rs ≥ 1,5 = separación a línea base." },
    { term: "Ionización por impacto electrónico", moduleSlug: "tecnicas-acopladas-ms", definition: "En espectrometría de masas, bombardeo de la molécula con electrones de 70 eV; produce el **ion molecular** y un patrón de fragmentación reproducible." },
  ],

  formulas: [
    {
      name: "Ley de Lambert-Beer",
      expression: "A = ε b c",
      variables: "A = absorbancia · ε = absortividad molar · b = paso óptico · c = concentración",
      description: "Relaciona la **absorbancia** medida con la **concentración** del analito; base de la cuantificación por espectrofotometría UV-Vis.",
      moduleSlug: "espectrofotometria-fundamentos",
      derivation:
        "Al integrar sobre el camino óptico la fracción de radiación absorbida por cada capa infinitesimal se llega a log(I_{0}/I) = ε·b·c. Es lineal solo con radiación **monocromática**, disolución **diluida** y sin dispersión ni fluorescencia; a A > ~1 suele perderse la linealidad.\nA = absorbancia — adimensional.\nε = absortividad molar — L·mol⁻¹·cm⁻¹.\nb = paso óptico de la celda — cm.\nc = concentración del analito — mol·L⁻¹.",
    },
    {
      name: "Rotación específica (polarimetría)",
      expression: "[α]_{λ}^{T} = #{α|l · c}",
      variables: "α = rotación observada · l = longitud del tubo (dm) · c = concentración (g/mL)",
      description: "Propiedad constante de una sustancia ópticamente activa; se usa para **identificarla y evaluar su pureza óptica**.",
      moduleSlug: "metodos-fisicos",
      derivation:
        "La rotación observada de un plano de luz polarizada es proporcional a la concentración de sustancia activa y a la longitud del camino recorrido; al normalizar por ambas se obtiene una constante característica a una longitud de onda y temperatura dadas.\n[α]_{λ}^{T} = rotación específica — (°)·mL·g⁻¹·dm⁻¹, se reporta como número.\nα = rotación observada — grados (°).\nl = longitud del tubo polarimétrico — dm.\nc = concentración — g·mL⁻¹.",
    },
    {
      name: "Índice de refracción (ley de Snell)",
      expression: "n = #{sen θ_{i}|sen θ_{r}}",
      variables: "θ_{i} = ángulo de incidencia · θ_{r} = ángulo de refracción",
      description: "Constante física que depende de la naturaleza de la sustancia, la longitud de onda y la temperatura; se usa en **identificación y control de pureza**.",
      moduleSlug: "metodos-fisicos",
      derivation:
        "Al pasar la luz de un medio a otro cambia de velocidad y se desvía; la razón de los senos de los ángulos de incidencia y refracción es constante para un par de medios (ley de Snell). El refractómetro mide el ángulo crítico y lo convierte en n.\nn = índice de refracción — adimensional (se reporta a la línea D del sodio, 20 °C: n_{D}^{20}).\nθ_{i}, θ_{r} = ángulos de incidencia y refracción respecto a la normal.",
    },
    {
      name: "Número de platos teóricos",
      expression: "N = 16 #{t_{R}|w}^{2}",
      variables: "t_{R} = tiempo de retención del pico · w = ancho del pico en la base",
      description: "Mide la **eficiencia** de la columna: a mayor N, picos más estrechos y mejor separación. Parte de la prueba de idoneidad del sistema.",
      moduleSlug: "cromatografia-fundamentos",
      derivation:
        "Se obtiene modelando la columna como una serie de etapas de equilibrio: cuanto más estrecho es el pico frente a su tiempo de retención, más etapas efectivas tuvo el analito y mayor la eficiencia. Con el ancho a media altura la constante es 5,54 en vez de 16.\nN = número de platos teóricos — adimensional.\nt_{R} = tiempo de retención — min.\nw = ancho del pico en la base (tangentes) — min.",
    },
    {
      name: "Resolución cromatográfica",
      expression: "R_{s} = #{2(t_{R2} − t_{R1})|w_{1} + w_{2}}",
      variables: "t_{R} = tiempos de retención de dos picos · w = anchos en la base",
      description: "Cuantifica qué tan **separados** están dos picos vecinos. R_{s} ≥ 1,5 = separación a línea base (< 1 % de solapamiento).",
      moduleSlug: "cromatografia-fundamentos",
      derivation:
        "Compara la distancia entre los máximos de dos picos con el promedio de sus anchos. Se mejora aumentando la **eficiencia** (N), la **selectividad** (α, cambiando fase móvil/estacionaria) o el **factor de retención** (k).\nR_{s} = resolución — adimensional.\nt_{R1}, t_{R2} = tiempos de retención — min.\nw_{1}, w_{2} = anchos de pico en la base — min.",
    },
    {
      name: "Ecuación de van Deemter",
      expression: "H = A + #{B|u} + C u",
      variables: "H = HETP · u = velocidad lineal de la fase móvil · A, B, C = difusión de remolino, difusión longitudinal y transferencia de masa",
      description: "Describe cómo la **eficiencia** (H, a menor mejor) depende de la **velocidad de flujo**; tiene un mínimo en la velocidad óptima.",
      moduleSlug: "hplc-gc",
      derivation:
        "Suma tres contribuciones al ensanchamiento de banda: **A** (caminos de flujo desiguales, casi independiente de u), **B/u** (difusión longitudinal, importante a flujos bajos) y **Cu** (resistencia a la transferencia de masa, importante a flujos altos). El mínimo de H marca la velocidad de máxima eficiencia.\nH = altura equivalente a un plato teórico (HETP) — µm o mm.\nu = velocidad lineal media de la fase móvil — mm·s⁻¹.\nA, B, C = coeficientes de cada término.",
    },
  ],

  evaluation: [
    { name: "Quices e informes — Módulo 1", weight: 10 },
    { name: "1er Parcial (Módulo 1)", weight: 20 },
    { name: "Trabajo de laboratorio — Módulo 2", weight: 10 },
    { name: "2do Parcial (Módulo 2)", weight: 20 },
    { name: "Talleres e informes — Módulo 3", weight: 10 },
    { name: "3er Parcial (Módulo 3)", weight: 20 },
    { name: "Seminarios", weight: 10 },
  ],

  keyDates: [
    { name: "1er Parcial (Módulo 1)", weight: "20%" },
    { name: "2do Parcial (Módulo 2)", weight: "20%" },
    { name: "3er Parcial (Módulo 3)", weight: "20%" },
    { name: "Seminario Módulo 1 — Instrumentación UV-Visible", weight: "parte del 10%" },
    { name: "Seminario Módulo 2 — Instrumentación FT-IR y potenciometría", weight: "parte del 10%" },
    { name: "Seminario Módulo 3 — Instrumentación HPLC y GC", weight: "parte del 10%" },
  ],

  projects: [
    { title: "Seminario de instrumentación", category: "Seminario" },
    { title: "Informes de laboratorio", category: "Laboratorio" },
    { title: "Valoración de una materia prima problema", category: "Laboratorio" },
  ],

  bibliography: [
    { kind: "libro", reference: "Skoog D.A., Holler F.J., Crouch S.R. Principios de Análisis Instrumental. Cengage Learning Editores. 2008." },
    { kind: "libro", reference: "Skoog, West, Holler, Crouch. Fundamentos de Química Analítica. Ed. Thomson. 9ª ed. 2015." },
    { kind: "libro", reference: "Harris D.C. Análisis Químico Cuantitativo. Ed. Reverté. 3ª ed. Barcelona. 2006." },
    { kind: "libro", reference: "Olsen E. Métodos ópticos de análisis. Editorial Reverté. 1990." },
    { kind: "libro", reference: "Ayres G. Análisis Químico Cuantitativo. 2ª ed. Ed. El Castillo S.A. Madrid. 1970." },
    { kind: "libro", reference: "Quattrocchi O.A. Introducción a la HPLC. Aplicación y práctica. Artes gráficas Farro. 1992." },
    { kind: "libro", reference: "Gross J.H. Mass Spectrometry. A textbook. 2nd ed. Springer. 2011." },
    { kind: "libro", reference: "USP-NF — capítulos generales <621> Cromatografía, <851> Espectrofotometría, <781> Rotación óptica." },
    { kind: "revista", reference: "Journal of Pharmaceutical and Biomedical Analysis" },
    { kind: "revista", reference: "Analytical Chemistry" },
  ],
};
