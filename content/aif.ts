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
      slug: "conceptos-previos",
      title: "Conceptos previos: unidades de concentración y equivalentes",
      description:
        "Repaso operativo de lo que el resto del curso da por sabido: **unidades de concentración** (molaridad, **normalidad**, **molalidad**, % p/p y % p/v, ppm), **equivalentes y miliequivalentes**, el **peso equivalente** y su dependencia de la reacción (ácido-base, redox, precipitación), y cómo **se conservan los equivalentes al diluir y al tomar alícuotas**. Es la base para las volumetrías del Módulo 5 y para todo cálculo de preparación de soluciones valorantes.",
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
