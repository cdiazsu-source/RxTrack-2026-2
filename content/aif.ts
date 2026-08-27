import type { SubjectContent } from "./_schema";

/**
 * Análisis Instrumental Farmacéutico (UNAL) — ESQUELETO DE ARRANQUE.
 *
 * ⚠️ Este contenido es un borrador razonable de los temas típicos de la
 * asignatura, NO el programa oficial. Antes de confiar en él:
 *   1. Reemplaza módulos, pesos de evaluación, fechas y bibliografía con los
 *      del programa real (docente / SIA).
 *   2. Ajusta `professors`, `credits`, horarios y `totalClasses`.
 * El `slug` de cada módulo es estable: si lo cambias después de sembrar,
 * el seed crea un módulo nuevo en vez de actualizar el existente.
 */
export const aif: SubjectContent = {
  code: "AIF",
  slug: "aif",
  name: "Análisis Instrumental Farmacéutico",
  credits: "3",
  professors: [],
  scheduleTheory: "",
  scheduleLab: "",
  totalClasses: 32,
  descriptionSummary:
    "Fundamentos y aplicación de las **técnicas instrumentales** de análisis a la identificación y cuantificación de principios activos, impurezas y excipientes en materias primas y productos farmacéuticos, con énfasis en la **selección de la técnica**, la **validación de métodos** y la interpretación de resultados. *(Descripción provisional — reemplazar por la del programa oficial.)*",
  objectiveGeneral:
    "Al finalizar la asignatura estarás en capacidad de **seleccionar, aplicar e interpretar** técnicas instrumentales espectroscópicas, cromatográficas y electroquímicas para resolver problemas analíticos del control de calidad farmacéutico. *(Provisional.)*",
  objectivesSpecific: [
    "Relacionar el **fundamento fisicoquímico** de cada técnica con el tipo de información que entrega y sus límites.",
    "Aplicar los criterios de **validación de métodos analíticos** (exactitud, precisión, linealidad, especificidad, LOD/LOQ, robustez).",
    "Interpretar espectros y cromatogramas para **identificar y cuantificar** analitos en matrices farmacéuticas.",
  ],
  hasLab: true,

  modules: [
    {
      slug: "intro-quimiometria",
      title: "Módulo 1: Introducción al análisis instrumental y validación de métodos",
      description:
        "Panorama de las técnicas instrumentales y criterios de selección. Señal, ruido y **relación señal/ruido**. Calibración: curva de calibración, **adición de estándar**, estándar interno. Parámetros de **validación** (exactitud, precisión, linealidad, especificidad, **LOD/LOQ**, rango, robustez). Cifras significativas y propagación de error.",
      hasLab: true,
      labProtocol: "Construcción y evaluación de una curva de calibración; cálculo de LOD/LOQ y del error asociado a una medida.",
    },
    {
      slug: "uv-visible",
      title: "Módulo 2: Espectrofotometría UV-Visible",
      description:
        "Interacción radiación-materia en la región UV-Vis. **Ley de Lambert-Beer** y desviaciones. Transiciones electrónicas y grupos cromóforos/auxocromos. Instrumentación (fuentes, monocromador, detector). Aplicaciones cuantitativas en control de calidad; espectrofotometría derivada y de mezclas.",
      hasLab: true,
      labProtocol: "Cuantificación de un principio activo por UV-Vis: verificación de linealidad, repetibilidad y recuperación.",
    },
    {
      slug: "fluorescencia",
      title: "Módulo 3: Espectroscopía de luminescencia molecular (fluorescencia)",
      description:
        "Diagrama de Jablonski, **fluorescencia y fosforescencia**. Rendimiento cuántico, efecto de disolvente, pH, temperatura y **quenching**. Instrumentación y ventajas de sensibilidad y selectividad frente a la absorción. Aplicaciones farmacéuticas.",
      hasLab: true,
      labProtocol: "Determinación fluorimétrica de un analito trazable: efecto de pH y del apagamiento sobre la señal.",
    },
    {
      slug: "ir-raman",
      title: "Módulo 4: Espectroscopía vibracional (IR y Raman)",
      description:
        "Vibraciones moleculares, modos activos en **IR** y en **Raman**. Regiones y bandas características, huella dactilar. Técnicas de muestreo (ATR, pastilla de KBr, transmisión). Uso en **identificación** de materias primas y polimorfismo.",
      hasLab: true,
      labProtocol: "Identificación de materias primas por IR-ATR y comparación con espectros de referencia (farmacopea).",
    },
    {
      slug: "espectroscopia-atomica",
      title: "Módulo 5: Espectroscopía atómica (absorción y emisión)",
      description:
        "**Absorción atómica** (llama y horno de grafito) y **emisión** (ICP-OES). Atomización, interferencias espectrales y químicas, correcciones de fondo. Determinación de **metales pesados** y contaminantes elementales (ICH Q3D) en productos farmacéuticos.",
      hasLab: true,
      labProtocol: "Determinación de un metal por absorción atómica de llama: curva de calibración y control de interferencias.",
    },
    {
      slug: "electroanalitica",
      title: "Módulo 6: Métodos electroanalíticos",
      description:
        "**Potenciometría** y electrodos selectivos de iones; medida y control de **pH**. Nociones de **conductimetría** y **voltamperometría**. Valoraciones potenciométricas. Aplicaciones en control de calidad y en estudios de estabilidad.",
      hasLab: true,
      labProtocol: "Valoración potenciométrica de un principio activo ácido/base débil; determinación del punto de equivalencia.",
    },
    {
      slug: "cromatografia-liquida",
      title: "Módulo 7: Cromatografía líquida de alta eficiencia (HPLC/UHPLC)",
      description:
        "Fundamentos de la separación: **retención, selectividad, eficiencia y resolución**; ecuación de van Deemter. Fases estacionarias y móviles, modos (fase reversa, intercambio iónico). Detectores (UV/DAD, fluorescencia, IR). **Idoneidad del sistema** (system suitability) y cuantificación (estándar externo/interno). Es la técnica de referencia de las monografías.",
      hasLab: true,
      labProtocol: "Valoración de un principio activo por HPLC en fase reversa: idoneidad del sistema, linealidad y precisión.",
    },
    {
      slug: "cromatografia-gases",
      title: "Módulo 8: Cromatografía de gases y acoplamientos",
      description:
        "**Cromatografía de gases (GC)**: inyección, columnas capilares, programación de temperatura, detectores (FID, ECD). Análisis de **solventes residuales** (ICH Q3C) y volátiles. Introducción a los acoplamientos **GC-MS / LC-MS** y a la espectrometría de masas como detector.",
      hasLab: true,
      labProtocol: "Determinación de solventes residuales por GC-headspace-FID: identificación por tiempo de retención y cuantificación.",
    },
  ],

  glossary: [
    { term: "Relación señal/ruido (S/N)", moduleSlug: "intro-quimiometria", definition: "Cociente entre la magnitud de la **señal analítica** y la del **ruido de fondo**; determina la detectabilidad. LOD ≈ S/N de 3; LOQ ≈ S/N de 10." },
    { term: "LOD / LOQ", moduleSlug: "intro-quimiometria", definition: "**Límite de detección**: menor concentración distinguible del blanco con confianza razonable. **Límite de cuantificación**: menor concentración que puede medirse con exactitud y precisión aceptables." },
    { term: "Adición de estándar", moduleSlug: "intro-quimiometria", definition: "Técnica de calibración en la que se añaden cantidades conocidas del analito a la propia muestra para **corregir el efecto matriz**." },
    { term: "Ley de Lambert-Beer", moduleSlug: "uv-visible", definition: "La **absorbancia** es proporcional a la concentración del analito y al paso óptico: A = ε·b·c. Se desvía a concentraciones altas y con radiación no monocromática." },
    { term: "Cromóforo / auxocromo", moduleSlug: "uv-visible", definition: "**Cromóforo**: grupo funcional responsable de la absorción UV-Vis (dobles enlaces conjugados, aromáticos). **Auxocromo**: grupo que desplaza o intensifica la banda (–OH, –NH₂)." },
    { term: "Quenching (apagamiento)", moduleSlug: "fluorescencia", definition: "Disminución de la intensidad de fluorescencia por procesos que desactivan el estado excitado (colisional, estático, por oxígeno, por pH)." },
    { term: "ATR", moduleSlug: "ir-raman", definition: "**Reflectancia total atenuada**: técnica de muestreo en IR que permite analizar sólidos y líquidos directamente sobre un cristal, sin preparación de pastilla." },
    { term: "Interferencia química (absorción atómica)", moduleSlug: "espectroscopia-atomica", definition: "Formación de compuestos poco disociables en la llama que reducen la población de átomos libres y, por tanto, la señal (p. ej. fosfato sobre calcio)." },
    { term: "Potenciometría", moduleSlug: "electroanalitica", definition: "Medida del **potencial** de una celda a corriente ~cero para determinar la actividad de un ion; base del pH-metro y de los electrodos selectivos." },
    { term: "Resolución cromatográfica (Rs)", moduleSlug: "cromatografia-liquida", definition: "Grado de separación entre dos picos vecinos; combina **selectividad**, **eficiencia** y **retención**. Rs ≥ 1,5 se considera separación a línea base." },
    { term: "Idoneidad del sistema (system suitability)", moduleSlug: "cromatografia-liquida", definition: "Conjunto de pruebas (repetibilidad de área, factor de cola, platos teóricos, resolución) que verifican que el sistema cromatográfico es apto **antes** de analizar muestras." },
    { term: "Solventes residuales", moduleSlug: "cromatografia-gases", definition: "Disolventes orgánicos volátiles usados en la síntesis o formulación que quedan como impurezas; se controlan por GC según límites de ICH Q3C." },
  ],

  formulas: [
    {
      name: "Ley de Lambert-Beer",
      expression: "A = ε b c",
      variables: "A = absorbancia · ε = absortividad molar · b = paso óptico · c = concentración",
      description: "Relaciona la **absorbancia** medida con la **concentración** del analito; base de la cuantificación por espectrofotometría UV-Vis.",
      moduleSlug: "uv-visible",
      derivation:
        "Surge de suponer que cada capa infinitesimal de disolución absorbe una fracción constante de la radiación incidente; al integrar sobre el paso óptico se obtiene log(I_{0}/I) = ε·b·c. Es lineal solo si la radiación es **monocromática**, la disolución es **diluida** (sin interacciones soluto-soluto) y no hay dispersión ni fluorescencia; a A > ~1 suele perderse la linealidad.\nA = absorbancia — adimensional (A = log I_{0}/I).\nε = absortividad molar — L·mol⁻¹·cm⁻¹ (o absortividad específica en L·g⁻¹·cm⁻¹).\nb = longitud del camino óptico de la celda — cm.\nc = concentración del analito — mol·L⁻¹ (o g·L⁻¹ con absortividad específica).",
    },
    {
      name: "Resolución cromatográfica",
      expression: "R_{s} = #{2(t_{R2} − t_{R1})|w_{1} + w_{2}}",
      variables: "t_{R} = tiempo de retención de cada pico · w = ancho de pico en la base",
      description: "Cuantifica qué tan bien **separados** están dos picos vecinos. R_{s} ≥ 1,5 = separación a línea base.",
      moduleSlug: "cromatografia-liquida",
      derivation:
        "Compara la distancia entre los máximos de dos picos con el promedio de sus anchos: si la distancia supera ~1,5 veces el ancho medio, el solapamiento del área es despreciable (< 1 %). La resolución se puede mejorar aumentando la **eficiencia** (N, columnas más largas o partícula más fina), la **selectividad** (α, cambiando fase móvil/estacionaria) o el **factor de retención** (k).\nR_{s} = resolución — adimensional.\nt_{R1}, t_{R2} = tiempos de retención de los picos 1 y 2 — min.\nw_{1}, w_{2} = anchos de los picos medidos en la base (por intersección de tangentes) — min.",
    },
    {
      name: "Ecuación de van Deemter",
      expression: "H = A + #{B|u} + C u",
      variables: "H = altura equivalente de plato teórico · u = velocidad lineal de la fase móvil · A, B, C = términos de difusión de remolino, difusión longitudinal y transferencia de masa",
      description: "Describe cómo la **eficiencia** de la columna (H, a menor mejor) depende de la **velocidad de flujo**; tiene un mínimo en la velocidad óptima.",
      moduleSlug: "cromatografia-liquida",
      derivation:
        "Suma tres contribuciones al ensanchamiento de banda: **A** (caminos de flujo desiguales entre partículas, casi independiente de u), **B/u** (difusión del analito a lo largo de la columna, importante a flujos bajos) y **Cu** (resistencia a la transferencia de masa entre fases, importante a flujos altos). El mínimo de H marca la velocidad de flujo que da la máxima eficiencia.\nH = altura equivalente a un plato teórico (HETP) — µm o mm.\nu = velocidad lineal media de la fase móvil — mm·s⁻¹.\nA = término de difusión de remolino (empaque) — µm.\nB = término de difusión longitudinal — µm·mm·s⁻¹.\nC = término de transferencia de masa — µm·s·mm⁻¹.",
    },
  ],

  evaluation: [
    { name: "1er Parcial", weight: 20 },
    { name: "2do Parcial", weight: 20 },
    { name: "3er Parcial", weight: 20 },
    { name: "Informes de laboratorio", weight: 20 },
    { name: "Quices y talleres", weight: 10 },
    { name: "Trabajo final / seminario", weight: 10 },
  ],

  keyDates: [
    { name: "1er Parcial", weight: "20%" },
    { name: "2do Parcial", weight: "20%" },
    { name: "3er Parcial", weight: "20%" },
    { name: "Entrega trabajo final", weight: "10%" },
  ],

  projects: [
    { title: "Trabajo final / seminario", category: "Seminario" },
    { title: "Informes de laboratorio", category: "Laboratorio" },
  ],

  bibliography: [
    { kind: "libro", reference: "Skoog D.A., Holler F.J., Crouch S.R. Principios de Análisis Instrumental. 6ª/7ª ed. Cengage Learning." },
    { kind: "libro", reference: "Harris D.C. Análisis Químico Cuantitativo. 3ª ed. Reverté." },
    { kind: "libro", reference: "Rubinson K.A., Rubinson J.F. Análisis Instrumental. Prentice Hall." },
    { kind: "libro", reference: "The United States Pharmacopeia (USP-NF) — capítulos generales <621> Cromatografía, <851> Espectrofotometría, <233> Impurezas elementales." },
    { kind: "libro", reference: "ICH Q2(R2) Validation of Analytical Procedures; ICH Q3C Residual Solvents; ICH Q3D Elemental Impurities." },
    { kind: "revista", reference: "Journal of Pharmaceutical and Biomedical Analysis" },
    { kind: "revista", reference: "Analytical Chemistry" },
  ],
};
