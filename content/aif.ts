import type { SubjectContent } from "./_schema";

/**
 * Análisis Instrumental Farmacéutico (UNAL) — programa oficial DEFINITIVO
 * "PROGRAMACIÓN — Segundo Semestre de 2026". Código 2015649. Elaboró: JM Lozano.
 * Profesores: García Castañeda (Módulo I), Nicolás Mateo González (Módulo II),
 * Martínez Ramírez (Módulo III). Las fechas se ponen en la app.
 *
 * Estructura oficial = 3 módulos por semanas:
 *   Módulo I  (sem 1–5)  : espectroscopía IR + métodos potenciométricos.
 *   Módulo II (sem 6–10) : métodos físicos + espectrofotometría + UV-Visible.
 *   Módulo III(sem 11–16): cromatografía + HPLC/GC + técnicas acopladas y MS.
 * Los módulos temáticos de abajo conservan su `slug` (no romper apuntes) y solo
 * se reetiquetan/reordenan bajo ese agrupamiento.
 */
export const aif: SubjectContent = {
  code: "AIF",
  slug: "aif",
  name: "Análisis Instrumental Farmacéutico",
  credits: "4",
  professors: [
    "Javier Eduardo García Castañeda — Módulo I (jaegarciac@unal.edu.co)",
    "Nicolás Mateo González — Módulo II (nmgonzalezl@unal.edu.co)",
    "Jorge Ariel Martínez Ramírez — Módulo III (jamartinezra@unal.edu.co)",
  ],
  scheduleTheory:
    "Clases magistrales: Martes 7:00–9:00 (Ed. Gloria Galeano Garcés–Aulas, salón 207) · Miércoles 7:00–8:00 (salón 107)",
  scheduleLab:
    "Prácticas de laboratorio 8:00–13:00 (Laboratorio 120, Edificio 500, Facultad de Ciencias Agrarias): Grupo 1 miércoles · Grupo 2 jueves · Grupo 3 viernes",
  totalClasses: 32,
  hasLab: true,
  descriptionSummary:
    "Manejo teórico y práctico de las **técnicas instrumentales** más usadas en el análisis fisicoquímico: **polarimetría, refractometría, espectroscopia UV-Vis e IR, métodos potenciométricos, cromatografía HPLC y de gases**. La profundidad está dada por el **fundamento de la técnica**, el conocimiento y manejo del instrumento, y el desarrollo de técnicas analíticas aplicadas al análisis farmacéutico y al **control de calidad**.",
  objectiveGeneral:
    "Proporcionar al estudiante conocimiento de los **principios fundamentales del Análisis Instrumental** que le permitirán la posterior comprensión del análisis instrumental aplicado al **análisis farmacéutico** y su aplicación en el **control de la calidad**.",
  objectivesSpecific: [
    "**Seleccionar y ejecutar** apropiadamente las técnicas para el análisis cualitativo y cuantitativo en el ámbito farmacéutico, químico y de alimentos.",
    "Realizar el **tratamiento de datos, análisis de resultados y conceptualización** bajo los criterios de la normatividad nacional e internacional.",
    "**Comunicar** el conocimiento adquirido en la asignatura.",
  ],

  // AIF tiene componente cuantitativo y de laboratorio fuerte: se muestran todas
  // las secciones.
  sections: ["modulos", "proyectos", "fechas", "glosario", "formulas", "bibliografia", "insumos", "prompt-ia"],

  modules: [
    {
      slug: "conceptos-previos",
      title: "Conceptos previos: unidades de concentración y equivalentes",
      description:
        "Repaso operativo de lo que el resto del curso da por sabido: **unidades de concentración** (molaridad, **normalidad**, **molalidad**, % p/p y % p/v, ppm), **equivalentes y miliequivalentes**, el **peso equivalente** y su dependencia de la reacción (ácido-base, redox, precipitación), y cómo **se conservan los equivalentes al diluir y al tomar alícuotas**. Es la base para las **titulaciones potenciométricas del Módulo I** y para todo cálculo de preparación de soluciones valorantes.",
      hasLab: false,
      exercises: [
        {
          question: [
            "**Problema 1.** ¿Cuántos equivalentes y miliequivalentes de HCl hay en **350 mL** de una solución de **HCl al 37 % p/p**?",
            "",
            "*Dato que hay que asumir* (el enunciado no lo da): densidad de la solución = **1,19 g/mL**, valor tabulado para el HCl concentrado al 37 %. Hay que **declararlo** como supuesto en la respuesta.",
            "",
            "Masa molar del HCl = 36,46 g/mol.",
          ].join("\n"),
          solution: [
            "#### Paso 1 — Masa de solución",
            "La densidad convierte volumen en masa:",
            "masa de solución = 350 mL × 1,19 g/mL = **416,5 g**",
            "",
            "#### Paso 2 — Masa de HCl puro",
            "\"37 % p/p\" = 37 g de HCl por cada 100 g de solución:",
            "masa de HCl = 416,5 g × 0,37 = **154,1 g**",
            "",
            "#### Paso 3 — Moles de HCl",
            "n = 154,1 g ÷ 36,46 g/mol = **4,23 mol**",
            "",
            "#### Paso 4 — De moles a equivalentes",
            "El HCl es **monoprótico**: cede 1 H⁺ por fórmula, así que θ = 1 y los equivalentes coinciden con los moles.",
            "n.º de equivalentes = 4,23 mol × 1 = **4,23 eq**",
            "n.º de miliequivalentes = 4,23 eq × 1000 = **4226 meq**",
            "",
            "#### Verificación",
            "En 350 mL hay 4,23 eq → normalidad ≈ 4,23 ÷ 0,350 ≈ **12 N**, justo el valor típico del HCl concentrado de laboratorio. El resultado es coherente.",
            "",
            "| Magnitud | Valor |",
            "| --- | --- |",
            "| Equivalentes de HCl | 4,23 eq |",
            "| Miliequivalentes de HCl | ≈ 4226 meq |",
            "| Normalidad equivalente | ≈ 12 N |",
          ].join("\n"),
        },
        {
          question: [
            "**Problema 2.** 140 mg de un mineral de hierro fueron tratados con ácido sulfúrico concentrado; todo el hierro en la solución quedó como Fe²⁺. Luego se adicionó lentamente agua, se filtró y la solución se transfirió cuantitativamente a un **balón aforado de 50 mL**. Se tomó una **alícuota de 10 mL** con pipeta aforada y se transfirió cuantitativamente a un **balón aforado de 25 mL**. De esta solución se tomaron **10 mL** con pipeta aforada y se transfirieron a un Erlenmeyer; se añadieron 15 mL de agua y se valoró con **sulfato de cerio(IV) 0,0189 N**, gastando **6,00 mL**.",
            "",
            "¿Qué **porcentaje de hierro** contiene el mineral?",
            "",
            "Masa atómica del Fe = 55,85 g/mol.",
          ].join("\n"),
          solution: [
            "#### Reacción de la valoración",
            "Fe²⁺ → Fe³⁺ + e⁻ (pierde 1 e⁻ → θ = 1)",
            "Ce⁴⁺ + e⁻ → Ce³⁺ (gana 1 e⁻ → θ = 1)",
            "Relación **1 : 1** en equivalentes (y también en moles, porque θ = 1 para ambos).",
            "",
            "#### Paso 1 — Equivalentes de Ce(IV) gastados = equivalentes de Fe²⁺ en lo valorado",
            "eq Ce(IV) = 0,0189 eq/L × 0,00600 L = **1,134×10⁻⁴ eq**",
            "Esos son los equivalentes de Fe²⁺ en los **10 mL tomados del balón de 25 mL**.",
            "",
            "#### Paso 2 — Subir al balón de 25 mL",
            "El balón de 25 mL tiene 25/10 veces lo que había en la alícuota valorada de 10 mL:",
            "eq Fe (balón 25 mL) = 1,134×10⁻⁴ × (25 ÷ 10) = **2,835×10⁻⁴ eq**",
            "",
            "#### Paso 3 — Esos equivalentes venían del balón de 50 mL",
            "Pasar de 10 mL a 25 mL es una **dilución**: cambia el volumen, **no los equivalentes**. Los 2,835×10⁻⁴ eq son los que había en los **10 mL tomados del balón de 50 mL**.",
            "",
            "#### Paso 4 — Subir al balón de 50 mL (todo el hierro del mineral)",
            "eq Fe (balón 50 mL) = 2,835×10⁻⁴ × (50 ÷ 10) = **1,4175×10⁻³ eq**",
            "Como θ(Fe²⁺) = 1, esos equivalentes **son moles de Fe**: n(Fe) = 1,4175×10⁻³ mol.",
            "",
            "#### Paso 5 — Masa de hierro y porcentaje",
            "masa Fe = 1,4175×10⁻³ mol × 55,85 g/mol = 0,07917 g = **79,17 mg**",
            "% Fe = (79,17 mg ÷ 140 mg) × 100 = **56,5 %**",
            "",
            "| Etapa | Equivalentes de Fe |",
            "| --- | --- |",
            "| 10 mL valorados (del balón de 25) | 1,134×10⁻⁴ eq |",
            "| Balón de 25 mL | 2,835×10⁻⁴ eq |",
            "| 10 mL del balón de 50 mL | 2,835×10⁻⁴ eq |",
            "| Balón de 50 mL (mineral completo) | 1,4175×10⁻³ eq |",
            "",
            "**Respuesta: el mineral contiene 56,5 % de hierro.**",
          ].join("\n"),
        },
      ],
    },

    // ── MÓDULO I (semanas 1–5) — Prof. Javier Eduardo García Castañeda ──────────
    {
      slug: "ir",
      title: "Módulo I — Espectroscopía en la región infrarroja (FT-IR)",
      description:
        "**Módulo I (semanas 1–5).** Fundamentos y aplicaciones de la espectroscopía en la **región infrarroja**. Vibraciones moleculares y bandas características (huella dactilar). Técnicas de muestreo: **pastilla de KBr** y **ATR**. Instrumentación **FT-IR**. Aplicaciones cualitativas: identificación de materias primas frente a espectros de referencia de farmacopea. Se hace **quiz en cada clase**.",
      hasLab: true,
      labProtocol:
        "Prácticas 1 y 2 (con quiz): aplicación de la espectrofotometría IR en pastilla de KBr y método ATR; preparación y estandarización de soluciones; determinación de % de humedad en una materia prima. Práctica 3: seminario Instrumentación FT-IR (quiz seminario).",
    },
    {
      slug: "metodos-electrometricos",
      title: "Módulo I — Métodos potenciométricos y titulaciones potenciométricas",
      description:
        "**Módulo I (semanas 1–5).** **Titulaciones potenciométricas** en medio acuoso y no acuoso y de **óxido-reducción**. Potenciometría y electrodos selectivos de iones; medida y control de **pH**. Aplicación a las volumetrías de neutralización del control de calidad. **Quiz en cada clase**; el **PRIMER PARCIAL** cubre los temas del Módulo I.",
      hasLab: true,
      labProtocol:
        "Aplicaciones de la potenciometría en medios acuoso y no acuoso y de óxido-reducción. Práctica 4: seminario Instrumentación en titulaciones potenciométricas (quiz seminario). Seminario de resultados oral y parcial práctico.",
    },

    // ── MÓDULO II (semanas 6–10) — Prof. Nicolás Mateo González ────────────────
    {
      slug: "metodos-fisicos",
      title: "Módulo II — Métodos físicos de análisis: refractometría y polarimetría",
      description:
        "**Módulo II (semana 6).** Fundamento, instrumentación y aplicaciones de la **refractometría** (índice de refracción, ley de Snell) y la **polarimetría** (rotación óptica, rotación específica). Uso en identificación y control de pureza de materias primas.",
      hasLab: true,
      labProtocol:
        "Prácticas 1 y 2: 1) métodos físicos de análisis — refractometría y polarimetría; 2) espectrofotometría UV-Visible: cuantificación de un analito en las regiones Visible y UV del espectro electromagnético.",
    },
    {
      slug: "espectrofotometria-fundamentos",
      title: "Módulo II — Fundamentos de espectrofotometría",
      description:
        "**Módulo II (semanas 7–9).** Interacción radiación-materia. **Conceptos básicos y leyes de la espectrofotometría**: **ley de Lambert-Beer** y sus desviaciones, **error espectrofotométrico**. Métodos de cuantificación por **aditividad** y **diferencial**.",
      hasLab: true,
      labProtocol:
        "Prácticas 3 y 4: aditividad de absorbancias y aplicación de la espectrofotometría UV-Visible; determinación de la constante **pKa** para analitos en las regiones Visible y UV.",
    },
    {
      slug: "uv-visible",
      title: "Módulo II — Espectrofotometría UV-Visible",
      description:
        "**Módulo II (semanas 9–10).** Aplicaciones de la espectrofotometría en la **región UV-VIS**. Transiciones electrónicas, **cromóforos y auxocromos**, instrumentación. **Elementos de estadística** en el análisis instrumental farmacéutico. Determinación de **pKa** por espectrofotometría; espectrofotometría de mezclas. Seminario: Instrumentación UV-Visible (**16 de septiembre**). El **SEGUNDO PARCIAL** cubre los temas del Módulo II.",
      hasLab: true,
      labProtocol:
        "Parcial práctico de las prácticas 1 a 4. Discusión y evaluación de informes: métodos físicos de análisis, valoración de soluciones y espectrofotometría UV-Vis.",
    },

    // ── MÓDULO III (semanas 11–16) — Prof. Jorge Ariel Martínez Ramírez ────────
    {
      slug: "cromatografia-fundamentos",
      title: "Módulo III — Introducción a la cromatografía",
      description:
        "**Módulo III (semanas 11–12).** Introducción a la cromatografía: **historia y clasificación** de los métodos cromatográficos. **Fundamentación de la separación**: cromatograma, mecanismos de separación, retención (**k**), selectividad (**α**), eficiencia (**N**, HETP, **van Deemter**) y **resolución**. Partes principales de un sistema cromatográfico. **Idoneidad del sistema** (system suitability).",
      hasLab: true,
      labProtocol:
        "Práctica 1 (Quiz 1): reconocimiento de un sistema de cromatografía líquida y uno de gases; verificación de calibración de micropipetas; partes principales (suministro de fases móviles, inyección, bombas, hornos, columnas, sistemas de detección) y mecanismos de separación. Seminario: Instrumentación HPLC y GC.",
    },
    {
      slug: "hplc-gc",
      title: "Módulo III — Cromatografía líquida (HPLC) y de gases (GC)",
      description:
        "**Módulo III (semana 13).** Sistemas de **identificación y cuantificación**: **estándar externo**, **estándar interno** y **adición de estándar**. Fases móviles y estacionarias, inyección, bombas, hornos, columnas y sistemas de detección en HPLC y GC. Aplicación a la valoración de fármacos en un medicamento.",
      hasLab: true,
      labProtocol:
        "Práctica 2: índices de retención de Kováts. Práctica 3: evaluación del cambio de distintos parámetros cromatográficos en la identificación y cuantificación de dos fármacos en un medicamento. Práctica 4: análisis de identificación y cuantificación de dos fármacos en un medicamento.",
    },
    {
      slug: "tecnicas-acopladas-ms",
      title: "Módulo III — Técnicas acopladas (GC-MS / LC-MS) y espectrometría de masas",
      description:
        "**Módulo III (semanas 14–16).** Introducción a las **técnicas acopladas o hifenadas** (**GC-MS** y **LC-MS**). La **espectrometría de masas** como detector: introducción a la **interpretación de espectros de masas**. Retroalimentaciones prácticas. El **TERCER PARCIAL** cubre los temas del Módulo III.",
      hasLab: true,
      labProtocol: "Práctica 5: análisis de un espectro de masas.",
    },
  ],

  glossary: [
    { term: "Relación señal/ruido (S/N)", moduleSlug: "espectrofotometria-fundamentos", definition: "Cociente entre la **señal analítica** y el **ruido de fondo**; determina la detectabilidad. LOD ≈ S/N de 3; LOQ ≈ S/N de 10." },
    { term: "LOD / LOQ", moduleSlug: "espectrofotometria-fundamentos", definition: "**Límite de detección**: menor concentración distinguible del blanco con confianza razonable. **Límite de cuantificación**: menor concentración medible con exactitud y precisión aceptables." },
    { term: "Adición de estándar", moduleSlug: "hplc-gc", definition: "Técnica de calibración en la que se añaden cantidades conocidas del analito a la propia muestra para **corregir el efecto matriz**." },
    { term: "Estándar interno", moduleSlug: "hplc-gc", definition: "Compuesto de referencia añadido en cantidad constante a patrones y muestras; se cuantifica por la **razón de señales** analito/estándar, corrigiendo variaciones de inyección." },
    { term: "Ley de Lambert-Beer", moduleSlug: "espectrofotometria-fundamentos", definition: "La **absorbancia** es proporcional a la concentración y al paso óptico: A = ε·b·c. Se desvía a concentraciones altas y con radiación no monocromática." },
    { term: "Cromóforo / auxocromo", moduleSlug: "uv-visible", definition: "**Cromóforo**: grupo responsable de la absorción UV-Vis (conjugación, aromáticos). **Auxocromo**: grupo que desplaza o intensifica la banda (–OH, –NH₂)." },
    { term: "ATR (reflectancia total atenuada)", moduleSlug: "ir", definition: "Técnica de muestreo en IR que permite analizar sólidos y líquidos directamente sobre un cristal, sin preparar pastilla de KBr." },
    { term: "Potenciometría", moduleSlug: "metodos-electrometricos", definition: "Medida del **potencial** de una celda a corriente ≈ 0 para determinar la actividad de un ion; base del pH-metro y de los electrodos selectivos." },
    { term: "Titulación potenciométrica", moduleSlug: "metodos-electrometricos", definition: "Valoración en la que el punto de equivalencia se detecta por el **cambio brusco de potencial** (o de pH), no por un indicador visual." },
    { term: "Idoneidad del sistema (system suitability)", moduleSlug: "cromatografia-fundamentos", definition: "Pruebas (repetibilidad de área, factor de cola, platos teóricos, resolución) que verifican que el sistema cromatográfico es **apto antes** de analizar muestras." },
    { term: "Resolución cromatográfica (Rs)", moduleSlug: "cromatografia-fundamentos", definition: "Grado de separación entre dos picos vecinos; combina **retención, selectividad y eficiencia**. Rs ≥ 1,5 = separación a línea base." },
    { term: "Índices de retención de Kováts", moduleSlug: "hplc-gc", definition: "Escala que sitúa el tiempo de retención de un analito en GC entre los de dos n-alcanos de referencia; permite **comparar retenciones entre equipos y columnas**." },
    { term: "Técnicas acopladas (hifenadas)", moduleSlug: "tecnicas-acopladas-ms", definition: "Unión de una técnica de separación con una de detección espectroscópica en línea (**GC-MS**, **LC-MS**): separa y a la vez identifica cada componente." },
    { term: "Ionización por impacto electrónico", moduleSlug: "tecnicas-acopladas-ms", definition: "En espectrometría de masas, bombardeo de la molécula con electrones de 70 eV; produce el **ion molecular** y un patrón de fragmentación reproducible." },
  ],

  formulas: [
    {
      name: "Normalidad (N)",
      expression: "N = #{n.º de equivalentes de soluto|litros de solución}\nN = M · θ",
      variables:
        "N = normalidad (eq·L⁻¹) · M = molaridad (mol·L⁻¹) · θ = equivalentes por mol (H⁺/OH⁻ o e⁻ intercambiados, o carga del ion)",
      description:
        "Concentración expresada en **equivalentes de soluto por litro de solución**. Un equivalente aporta o consume **un mol de carga** (un H⁺, un OH⁻ o un electrón), de modo que en el punto de equivalencia siempre se cumple **N₁·V₁ = N₂·V₂** sin arrastrar coeficientes estequiométricos.",
      moduleSlug: "conceptos-previos",
      derivation: [
        "La **normalidad** responde a: ¿cuántos equivalentes de reactivo hay por litro de solución? Un **equivalente (eq)** es la porción de sustancia que intercambia **un mol de cargas**.",
        "Se calcula **N = (masa de soluto ÷ peso equivalente) ÷ V(L)**, con **peso equivalente = masa molar ÷ θ**.",
        "**θ en ácido-base** = n.º de H⁺ u OH⁻ que cede o capta la fórmula: HCl → 1 · H₂SO₄ → 2 · Ca(OH)₂ → 2.",
        "**θ en redox** = n.º de electrones por fórmula: Fe²⁺→Fe³⁺ → 1 · MnO₄⁻→Mn²⁺ (medio ácido) → 5 · Cr₂O₇²⁻→2 Cr³⁺ → 6.",
        "**θ en precipitación / complejos** = carga total intercambiada: Ag⁺ / Cl⁻ → 1 · Ba²⁺ / SO₄²⁻ → 2.",
        "Relación con la molaridad: **N = M · θ**. Por eso N nunca es menor que M y **depende de la reacción**: el mismo H₂SO₄ 0,5 M es 1 N como diácido.",
        "Cómo se lee un valor: **HCl 12 N** ≈ ácido concentrado de bodega (12 eq/L = 12 mol/L, θ = 1). **NaOH 0,1 N** = 0,1 mol/L (θ = 1).",
        "Al **diluir**, la N baja pero **el número de equivalentes no cambia** (se reparte en más volumen). Esa invariancia permite arrastrar los equivalentes por una cadena de alícuotas.",
      ].join("\n"),
      examples: [
        [
          "**Ejemplo 1 — H₂SO₄ para una solución valorante.** Se disuelven 4,90 g de H₂SO₄ puro (M = 98,08 g/mol) hasta completar 500 mL de solución. ¿Normalidad como ácido diprótico?",
          "",
          "| Paso | Cálculo | Resultado |",
          "| --- | --- | --- |",
          "| θ (ácido-base) | H₂SO₄ cede 2 H⁺ | θ = 2 |",
          "| Peso equivalente | 98,08 ÷ 2 | 49,04 g/eq |",
          "| Equivalentes de soluto | 4,90 g ÷ 49,04 g/eq | 0,0999 eq |",
          "| Volumen | 500 mL | 0,500 L |",
          "| **Normalidad** | 0,0999 eq ÷ 0,500 L | **0,20 N** |",
          "",
          "**Lectura.** 0,20 N = 0,10 M × 2. Frente a una base, 1,00 mL de este ácido neutraliza 1,00 mL de NaOH 0,20 N.",
        ].join("\n"),
        [
          "**Ejemplo 2 — KMnO₄ en medio ácido (redox).** 3,16 g de KMnO₄ (M = 158,03 g/mol) disueltos en 1,00 L, para oxidar en medio ácido: MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O.",
          "",
          "| Paso | Cálculo | Resultado |",
          "| --- | --- | --- |",
          "| Molaridad | (3,16 ÷ 158,03) ÷ 1,00 L | 0,0200 M |",
          "| θ (redox) | e⁻ ganados por MnO₄⁻ | θ = 5 |",
          "| **Normalidad** | N = M · θ = 0,0200 × 5 | **0,100 N** |",
          "| Peso equivalente | 158,03 ÷ 5 | 31,61 g/eq |",
          "",
          "**Lectura.** La misma solución es 0,0200 M pero 0,100 N *para esta reacción*. En medio neutro (θ = 3) sería 0,0600 N: la normalidad **cambia con la semirreacción**, la molaridad no.",
        ].join("\n"),
      ],
    },
    {
      name: "Molalidad (m)",
      expression: "m = #{moles de soluto|kilogramos de disolvente}",
      variables:
        "m = molalidad (mol·kg⁻¹) · disolvente = solo el líquido que disuelve (agua, etanol…), sin contar el soluto ni el volumen final",
      description:
        "Moles de soluto por **kilogramo de disolvente** (no de solución). Al definirse por masa y no por volumen, **no cambia con la temperatura**; por eso es la unidad de las propiedades coligativas (ascenso ebulloscópico, descenso crioscópico).",
      moduleSlug: "conceptos-previos",
      derivation: [
        "La **molalidad** pregunta: ¿cuántos moles de soluto hay por cada **kilogramo de disolvente**? La diferencia con la molaridad está en el denominador: aquí es la **masa del disolvente solo**, no el volumen de la solución.",
        "Ventaja: al no depender del volumen, **no varía con la temperatura** ni con la densidad. Por eso **ΔT_eb = K_eb · m** y **ΔT_f = K_f · m** usan molalidad.",
        "En soluciones acuosas **diluidas**, m ≈ M (1 L de agua ≈ 1 kg). La diferencia se nota en soluciones concentradas o con disolventes no acuosos.",
      ].join("\n"),
      examples: [
        [
          "**Ejemplo 1 — NaCl en agua.** Se disuelven 11,7 g de NaCl (M = 58,44 g/mol) en 250 g de agua.",
          "",
          "| Paso | Cálculo | Resultado |",
          "| --- | --- | --- |",
          "| Moles de NaCl | 11,7 ÷ 58,44 | 0,200 mol |",
          "| Masa de disolvente | 250 g de agua | 0,250 kg |",
          "| **Molalidad** | 0,200 ÷ 0,250 | **0,800 m** |",
          "",
          "**Lectura.** 0,800 mol de NaCl por kg de agua. Descenso crioscópico: ΔT_f ≈ 1,86 °C·kg/mol × 0,800 m × 2 ≈ 2,98 °C.",
        ].join("\n"),
        [
          "**Ejemplo 2 — glucosa: m frente a M.** 90,0 g de glucosa (M = 180,16 g/mol) en 400 g de agua; densidad de la solución = 1,04 g/mL.",
          "",
          "| Paso | Cálculo | Resultado |",
          "| --- | --- | --- |",
          "| Moles de glucosa | 90,0 ÷ 180,16 | 0,500 mol |",
          "| **Molalidad** | 0,500 mol ÷ 0,400 kg | **1,25 m** |",
          "| Masa de solución | 90,0 + 400 | 490 g |",
          "| Volumen de solución | 490 g ÷ 1,04 g/mL | 471 mL |",
          "| Molaridad | 0,500 mol ÷ 0,471 L | 1,06 M |",
          "",
          "**Lectura.** m (1,25) > M (1,06): el kg de agua ocupa menos de un litro de solución y el soluto también aporta volumen. En agua muy diluida ambos valores casi coinciden.",
        ].join("\n"),
      ],
    },
    {
      name: "Equivalentes (eq) y peso equivalente",
      expression:
        "n_{eq} = #{masa de sustancia (g)|peso equivalente (g/eq)}\npeso equivalente = #{masa molar (g/mol)|θ}\nn_{eq} = n_{mol} · θ",
      variables:
        "n_{eq} = n.º de equivalentes (eq) · θ = equivalentes por mol · 1 meq = 10⁻³ eq · relación con normalidad: n_{eq} = N · V(L)",
      description:
        "Un **equivalente** es la cantidad de sustancia que aporta o consume **un mol de unidades reactivas** (un H⁺, un OH⁻, un electrón, una carga). Trabajar en equivalentes hace que en cualquier reacción se cumpla **eq(A) = eq(B)** en el punto final, sin balancear coeficientes.",
      moduleSlug: "conceptos-previos",
      derivation: [
        "Idea central: dos sustancias reaccionan **mol a mol solo si su “capacidad de reacción” es igual**. El equivalente **normaliza** esa capacidad: 1 eq de cualquier ácido neutraliza 1 eq de cualquier base; 1 eq de oxidante capta los electrones de 1 eq de reductor.",
        "Cálculo: **n_eq = masa ÷ peso equivalente**, con **peso equivalente = masa molar ÷ θ**. Equivalente y mol se enlazan por **n_eq = n_mol · θ**.",
        "El valor de **θ** depende de la **reacción**, no solo de la fórmula:",
        "• **Ácido-base:** θ = H⁺ intercambiados. HCl → 1 · H₂SO₄ → 2 · H₃PO₄ → 1, 2 o 3 según hasta dónde se neutralice · NaOH → 1 · Ca(OH)₂ → 2.",
        "• **Redox:** θ = e⁻ por fórmula. Fe²⁺→Fe³⁺ → 1 · MnO₄⁻→Mn²⁺ (ácido) → 5 · Cr₂O₇²⁻→2 Cr³⁺ → 6 · C₂O₄²⁻→2 CO₂ → 2.",
        "• **Precipitación / complejos:** θ = carga total intercambiada. Ag⁺ / Cl⁻ → 1 · Ba²⁺ / SO₄²⁻ → 2.",
        "Cómo se interpreta: si una alícuota contiene **1,13×10⁻⁴ eq** de Fe²⁺, hacen falta **exactamente 1,13×10⁻⁴ eq** de oxidante para el punto de equivalencia, sea cual sea el oxidante. Y como para el Fe²⁺ θ = 1, esos equivalentes **son también moles** de hierro.",
        "**Miliequivalente:** 1 meq = 10⁻³ eq. Habitual en electrolitos clínicos (Na⁺ plasmático ≈ 140 meq/L).",
        "Relación con la normalidad: **N = n_eq ÷ V(L)** y **n_eq = N · V**. Al **diluir**, la N baja pero **el n.º de equivalentes no cambia**: por eso los equivalentes se arrastran intactos por una cadena de diluciones y alícuotas.",
      ].join("\n"),
      examples: [
        [
          "**Ejemplo 1 — equivalentes en una neutralización.** ¿Cuántos equivalentes de Ca(OH)₂ (M = 74,09 g/mol) hay en 2,00 g, y qué volumen de HCl 0,100 N los neutraliza?",
          "",
          "| Paso | Cálculo | Resultado |",
          "| --- | --- | --- |",
          "| θ de Ca(OH)₂ | aporta 2 OH⁻ | θ = 2 |",
          "| Peso equivalente | 74,09 ÷ 2 | 37,05 g/eq |",
          "| Equivalentes de base | 2,00 ÷ 37,05 | 0,0540 eq |",
          "| Equivalentes de HCl | eq(ácido) = eq(base) | 0,0540 eq |",
          "| **Volumen de HCl 0,100 N** | 0,0540 eq ÷ 0,100 eq/L | **0,540 L = 540 mL** |",
          "",
          "**Lectura.** No hizo falta la ecuación balanceada 2 HCl + Ca(OH)₂ → CaCl₂ + 2 H₂O: al trabajar en equivalentes, el “2” ya está dentro de θ.",
        ].join("\n"),
        [
          "**Ejemplo 2 — equivalentes que se conservan al diluir (redox).** 25,0 mL de oxalato de sodio se valoran con KMnO₄ y consumen 2,40×10⁻³ eq. Otra alícuota de 25,0 mL se afora a 250 mL y de ese balón se toman 25,0 mL. ¿Cuántos equivalentes de oxalato hay en esa última alícuota?",
          "",
          "| Paso | Razonamiento | Resultado |",
          "| --- | --- | --- |",
          "| eq en la alícuota original de 25 mL | dato de la valoración | 2,40×10⁻³ eq |",
          "| eq en el balón de 250 mL | la dilución **no** cambia los equivalentes, solo el volumen | 2,40×10⁻³ eq |",
          "| eq en 25 mL del balón de 250 mL | 2,40×10⁻³ × (25 ÷ 250) | **2,40×10⁻⁴ eq** |",
          "",
          "**Lectura.** Diluir reparte los mismos equivalentes en más volumen: la normalidad cae a la décima parte, pero los equivalentes por alícuota se escalan solo por la fracción de volumen tomada. Es el mecanismo del **Problema 2** de este módulo.",
        ].join("\n"),
      ],
    },
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

  // Sistema de evaluación (PROGRAMA OFICIAL 2026-2, tal cual): tres módulos con
  // 10% práctico + 20% parcial teórico cada uno, más 10% de seminarios. Suma 100.
  evaluation: [
    { name: "Módulo I — Quices, informes orales, trabajo de laboratorio y parcial práctico", weight: 10 },
    { name: "Módulo I — Parcial teórico", weight: 20 },
    { name: "Módulo II — Quices, informes orales, trabajo de laboratorio y parcial práctico", weight: 10 },
    { name: "Módulo II — Parcial teórico", weight: 20 },
    { name: "Módulo III — Quices, talleres, informes y ejercicios", weight: 10 },
    { name: "Módulo III — Parcial", weight: 20 },
    { name: "Seminarios (Instrumentación FT-IR/potenciometría, UV-Visible, HPLC y GC)", weight: 10 },
  ],

  keyDates: [
    { name: "Primer parcial — Módulo I", weight: "20%", note: "Temas del Módulo I (espectroscopía IR + métodos potenciométricos). Alrededor de la semana 5." },
    { name: "Parcial práctico — Módulo I", weight: "parte del 10%", note: "Prácticas del Módulo I; incluye seminario de resultados oral." },
    { name: "Segundo parcial — Módulo II", weight: "20%", note: "Temas del Módulo II (métodos físicos + espectrofotometría UV-Vis + estadística). Alrededor de la semana 10." },
    { name: "Parcial práctico — Módulo II", weight: "parte del 10%", note: "Prácticas 1 a 4; discusión y evaluación de informes." },
    { name: "Tercer parcial — Módulo III", weight: "20%", note: "Temas del Módulo III (cromatografía + HPLC/GC + técnicas acopladas y MS). Semana 16." },
    { name: "Seminario — Instrumentación FT-IR y potenciometría (Módulo I)", weight: "parte del 10%" },
    { name: "Seminario — Instrumentación UV-Visible (Módulo II)", weight: "parte del 10%", note: "16 de septiembre." },
    { name: "Seminario — Instrumentación HPLC y GC (Módulo III)", weight: "parte del 10%" },
  ],

  projects: [
    { title: "Seminario de instrumentación", category: "Seminario" },
    { title: "Informes de laboratorio", category: "Laboratorio" },
    { title: "Valoración de una materia prima problema", category: "Laboratorio" },
  ],

  bibliography: [
    { kind: "libro", reference: "Guías y tutoriales de la asignatura." },
    { kind: "libro", reference: "Farmacopea de los Estados Unidos de América (USP)." },
    { kind: "libro", reference: "Olsen E. Métodos ópticos de análisis. Editorial Reverté. 1990." },
    { kind: "libro", reference: "Skoog D.A., Crouch S.R., Holler F.J. Principios de Análisis Instrumental. Cengage Learning Editores. 2008." },
    { kind: "libro", reference: "Skoog, West, Holler y Crouch. Fundamentos de Química Analítica. Ed. Thomson. 9ª ed. 2015." },
    { kind: "libro", reference: "Ayres G. Análisis Químico Cuantitativo. 2ª ed. Ed. El Castillo S.A. Madrid. 1970." },
    { kind: "libro", reference: "Harris D.C. Análisis Químico Cuantitativo. Ed. Reverté. 3ª ed. Barcelona. 2006." },
    { kind: "libro", reference: "Quattrocchi O.A. Introducción a la HPLC. Aplicación y práctica. Artes gráficas Farro. 1992." },
    { kind: "libro", reference: "Gross J.H. Mass Spectrometry. A textbook. 2ª ed. Springer. 2011." },
  ],
};
