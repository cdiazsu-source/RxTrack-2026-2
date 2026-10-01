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
  sections: ["modulos", "laboratorio", "proyectos", "fechas", "glosario", "formulas", "bibliografia", "insumos", "prompt-ia"],

  modules: [
    {
      slug: "conceptos-previos",
      title: "Conceptos previos: unidades de concentración y equivalentes",
      description:
        "Repaso operativo de lo que el resto del curso da por sabido: **unidades de concentración** (molaridad, **normalidad**, **molalidad**, % p/p y % p/v, ppm), **equivalentes y miliequivalentes**, el **peso equivalente** y su dependencia de la reacción (ácido-base, redox, precipitación), y cómo **se conservan los equivalentes al diluir y al tomar alícuotas**. Es la base para las **titulaciones potenciométricas del Módulo I** y para todo cálculo de preparación de soluciones valorantes.",
      hasLab: false,
      chapter: [
        "#### Qué problema resuelve una volumetría",
        "",
        "Una valoración (titulación) parte de una idea simple: agregar, gota a gota, una solución de concentración **exactamente conocida** (el valorante) sobre la muestra, hasta que reaccione por completo con lo que quieres medir (el analito). Pero no cualquier reacción sirve para esto. Tiene que cumplir dos condiciones **al mismo tiempo**:",
        "",
        "1. **Ser casi total** (K_eq muy grande). Si la reacción se queda a medias, el volumen gastado ya no refleja la cantidad real de analito.",
        "2. **Ser rápida.** Si tarda en completarse, cada gota que agregas todavía no ha reaccionado cuando cae la siguiente, y te pasas del punto correcto sin darte cuenta.",
        "",
        "> Analogía: llenar un vaso hasta el borde con un gotero. Si el gotero suelta el agua muy despacio (reacción lenta), para cuando notas que ya llegó al borde, ya se desbordó. Necesitas que cada gota \"cuente\" de inmediato.",
        "",
        "#### Valorar vs. estandarizar — no son lo mismo (aunque se vean idénticos en el mesón)",
        "",
        "Es normal confundirlos: en el laboratorio **se hacen exactamente igual** — mismo vaso, misma bureta, mismas adiciones gota a gota, mismo electrodo. La diferencia no está en el procedimiento, está en **qué es lo que no conoces** y **qué papel juega cada solución**.",
        "",
        "**Valorar (titular)** es el verbo general: agregar un valorante de concentración **ya conocida** sobre una muestra para averiguar **cuánto analito hay en ella** (p. ej., cuánto ácido nicotínico hay en una materia prima problema).",
        "",
        "**Estandarizar** es un **caso particular** de valorar: aquí lo que no conoces con certeza no es la muestra, es **el propio valorante**. Lo valoras frente a un **patrón primario** (una sustancia de pureza certificada, ≥ 99,9 %) para hallar su **concentración real** — porque la concentración con la que lo preparaste (la nominal) casi nunca es exacta.",
        "",
        "| | Valorar una muestra | Estandarizar un valorante |",
        "| --- | --- | --- |",
        "| Lo que ya conoces (fijo) | La concentración del valorante (ya estandarizado) | La pureza del patrón primario (certificada, ≥ 99,9 %) |",
        "| Lo que buscas (incógnita) | Cuánto analito hay en la muestra problema | La concentración **real** del valorante |",
        "| Ejemplo en este curso | Valorar el ácido nicotínico con NaOH ya estandarizado → % de pureza | Estandarizar el NaOH frente a biftalato de potasio → N real del NaOH |",
        "",
        "**La idea que resuelve la confusión:** toda estandarización es, mecánicamente, una valoración — pero el \"analito\" de esa valoración es el valorante mismo. Por eso el orden importa: **primero se estandariza, después se valora**. No puedes confiar en el resultado de valorar una materia prima con un NaOH cuya concentración real no conoces — por eso la Práctica 1 (estandarizar NaOH, HClO₄, KMnO₄ y NaNO₂ frente a sus patrones primarios) va **antes** que las Prácticas 3, 4 y 5, que son las que valoran las materias primas problema usando esos valorantes ya estandarizados.",
        "",
        "#### Punto de equivalencia vs. punto final — no son lo mismo",
        "",
        "Es de los conceptos que más se prestan a confusión, así que conviene separarlo desde ya:",
        "",
        "| | Punto de equivalencia | Punto final |",
        "| --- | --- | --- |",
        "| Qué es | El momento **teórico exacto** en que los equivalentes de valorante igualan a los del analito | El momento en que **tú lo detectas** en el laboratorio |",
        "| Cómo se nota | Nunca se observa directamente — es un cálculo | Cambio de color (indicador) o salto brusco de una señal instrumental (pH, potencial) |",
        "| Ejemplo en este curso | El cruce por cero de la segunda derivada en una titulación potenciométrica | El salto brusco de mV que ves en la primera derivada |",
        "",
        "**La idea clave:** el punto final es tu mejor estimación práctica del punto de equivalencia. Un buen método analítico minimiza la diferencia entre los dos — por eso en las titulaciones potenciométricas del laboratorio se refina el punto de equivalencia con la primera y la segunda derivada, en vez de quedarte con el primer salto visible.",
        "",
        "#### Antes de pesar: la regla del 10–90 % de la bureta",
        "",
        "Para que el volumen gastado tenga poco error de lectura, debe caer entre el **10 % y el 90 %** de la capacidad de la bureta (normalmente 25–50 mL). Si al calcular cuánto vas a gastar el resultado queda fuera de ese rango, la solución **no** es rellenar la bureta a la mitad de la titulación — es ajustar antes de empezar: pesar menos o más muestra, o cambiar la concentración del valorante.",
        "",
        "#### Las 4 formas de organizar una valoración",
        "",
        "No siempre conviene (o se puede) agregar el valorante directo sobre la muestra. Cada variante resuelve un problema distinto:",
        "",
        "**1. Directa** — la normal: el valorante cae directo sobre el analito hasta el punto final. Se usa siempre que se pueda.",
        "",
        "**2. Inversa** — se invierten los papeles: mides un volumen exacto de valorante y le vas agregando la muestra, en vez de al revés.",
        "",
        "**3. Residual (retrovaloración)** — cuando la directa no es viable (reacción lenta, analito insoluble o volátil, o no hay indicador para el punto final directo). Se hace en 3 pasos:",
        "",
        "* agregas un **exceso medido** de un valorante primario;",
        "* dejas que reaccione por completo con el analito;",
        "* el **exceso que sobró** (el que no reaccionó) lo valoras con un segundo valorante.",
        "",
        "El analito se calcula por diferencia: **meq(analito) = meq(valorante primario) − meq(valorante secundario gastado en el exceso)**.",
        "",
        "> Ejemplo farmacéutico: cuantificar CaCO₃ en una tableta antiácida. Se agrega HCl en exceso conocido (reacciona con todo el CaCO₃ disponible) y ese exceso de HCl se valora después con NaOH.",
        "",
        "**4. Indirecta (por sustitución)** — el analito no reacciona directo con nada fácil de valorar. Primero reacciona con un reactivo intermedio en exceso que libera una **segunda especie**, proporcional a la cantidad de analito, y es esa segunda especie la que se valora.",
        "",
        "> Ejemplo farmacéutico clásico: cuantificar Cu²⁺. Se agrega KI en exceso → libera I₂ (proporcional al Cu²⁺ presente) → el I₂ se valora con tiosulfato de sodio.",
        "",
        "#### Corrección por blanco: cuando el reactivo también \"gasta\" valorante",
        "",
        "A veces el solvente o los reactivos auxiliares consumen un poco de valorante por sí solos, por impurezas — no porque haya analito reaccionando. Para descontar ese efecto, se repite exactamente el mismo procedimiento **sin la muestra** (el \"blanco\") y se resta:",
        "",
        "```formula",
        "V_{real} = V_{muestra} − V_{blanco}",
        "```",
        "",
        "#### Factor de dilución: cuando trabajas con alícuotas",
        "",
        "Casi ningún análisis real usa la muestra completa: se disuelve, se afora a un volumen conocido, y solo se toma una **alícuota** (una porción medida) para valorar. Eso significa que el resultado de la valoración representa solo una fracción de la muestra original — hay que \"reconstruirla\" matemáticamente.",
        "",
        "El **factor de dilución (FD)** es el número por el que multiplicas para deshacer una dilución/alícuota y volver a la cantidad total original:",
        "",
        "```formula",
        "FD = #{V_{balón}|V_{alícuota}}",
        "```",
        "",
        "Si hay **varias diluciones en cadena** (balón → alícuota → otro balón → otra alícuota…), los factores de cada etapa **se multiplican** entre sí, nunca se suman. Y la regla que hace posible todo esto: **los equivalentes de analito no cambian al diluir** — solo cambia el volumen en el que están repartidos. Por eso se pueden \"arrastrar\" intactos por toda la cadena de alícuotas y solo multiplicar por el FD al final.",
        "",
        "#### Los errores que más se repiten (para no cometerlos)",
        "",
        "* Usar la concentración **nominal** de un valorante sin haberlo estandarizado primero frente a un patrón primario.",
        "* No usar blanco cuando el reactivo o el solvente sí interfieren.",
        "* Confundir el factor de equivalencia (η) de una misma sustancia entre reacciones distintas — por ejemplo, el KMnO₄ tiene η = 5 en medio ácido pero η = 3 en medio neutro.",
        "* Sumar factores de dilución en vez de multiplicarlos cuando hay dos o más diluciones en cadena.",
        "* Olvidar que, en una retrovaloración, el analito sale **restando**, no sumando los dos valorantes.",
      ].join("\n"),
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
        {
          question: [
            "**Problema 3.** ¿Cuántos equivalentes y miliequivalentes de H₂SO₄ hay en **350 mL** de una solución de H₂SO₄ al **98 % p/p** (densidad 1,80 g/mL, PM = 98,00 g/mol)?",
          ].join("\n"),
          solution: [
            "#### Paso 1 — Masa de la solución",
            "masa de solución = 350 mL × 1,80 g/mL = **630,0 g**",
            "",
            "#### Paso 2 — Masa de H₂SO₄ puro",
            "masa de H₂SO₄ = 630,0 g × 0,98 = **617,4 g**",
            "",
            "#### Paso 3 — Peso equivalente",
            "El H₂SO₄ es diprótico (θ = 2): PE = 98,00 ÷ 2 = **49,00 g/eq**",
            "",
            "#### Paso 4 — Equivalentes y miliequivalentes",
            "n.º de equivalentes = 617,4 g ÷ 49,00 g/eq = **12,60 eq**",
            "n.º de miliequivalentes = 12,60 × 1000 = **12 600 meq**",
            "",
            "| Magnitud | Valor |",
            "| --- | --- |",
            "| Peso equivalente | 49,00 g/eq |",
            "| Equivalentes de H₂SO₄ | 12,60 eq |",
            "| Miliequivalentes de H₂SO₄ | 12 600 meq |",
          ].join("\n"),
        },
        {
          question: [
            "**Problema 4.** ¿Cuántos equivalentes y miliequivalentes de KMnO₄ hay en **350 mL** de una solución **0,10 N**?",
          ].join("\n"),
          solution: [
            "#### Por qué este problema es más corto",
            "Aquí la concentración ya viene en **Normalidad**, que por definición ya incluye el factor de equivalencia (η = 5 para el KMnO₄ en medio ácido). No hace falta el peso molecular.",
            "",
            "#### Cálculo directo",
            "n.º de equivalentes = N × V(L) = 0,10 eq/L × 0,350 L = **0,035 eq**",
            "n.º de miliequivalentes = 350 mL × 0,10 meq/mL = **35,0 meq**",
            "",
            "**Lectura.** Compara con el Problema 3: ahí hubo que pasar por masa → PM → PE. Aquí no, porque la Normalidad ya es \"equivalentes por litro\" — por eso es la unidad preferida para valorantes ya estandarizados.",
          ].join("\n"),
        },
        {
          question: [
            "**Problema 5.** ¿Cuántos equivalentes y miliequivalentes de K₂Cr₂O₇ hay en **2,76 g** de K₂Cr₂O₇ puro? (PM = 294,00 g/mol; Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O)",
          ].join("\n"),
          solution: [
            "#### Paso 1 — Contar los electrones por fórmula",
            "Hay 2 átomos de Cr, cada uno pasa de +6 a +3 (gana 3 e⁻): 2 × 3 = **6 electrones por fórmula** → η = 6",
            "",
            "#### Paso 2 — Peso equivalente",
            "PE = 294,00 ÷ 6 = **49,00 g/eq**",
            "",
            "#### Paso 3 — Equivalentes y miliequivalentes",
            "eq = 2,76 g ÷ 49,00 g/eq = **0,05633 eq**",
            "meq = 0,05633 × 1000 = **56,33 meq**",
            "",
            "| Magnitud | Valor |",
            "| --- | --- |",
            "| η (electrones) | 6 |",
            "| Peso equivalente | 49,00 g/eq |",
            "| Equivalentes | 0,05633 eq |",
            "| Miliequivalentes | 56,33 meq |",
          ].join("\n"),
        },
        {
          question: [
            "**Problema 6.** ¿Cuántos equivalentes y miliequivalentes de Na₂S₂O₃ hay en **725 mg** de Na₂S₂O₃·5H₂O (tiosulfato de sodio pentahidratado, PM = 248,18 g/mol)? La reacción es 2S₂O₃²⁻ → S₄O₆²⁻ + 2e⁻ (η = 1 por fórmula).",
          ].join("\n"),
          solution: [
            "#### Por qué se usa el PM de la sal hidratada",
            "La muestra que se pesa en la balanza es la sal **con su agua de hidratación** — esa masa de agua forma parte de lo que realmente pesaste, así que el PM correcto a usar es el de la forma pentahidratada (248,18), no el del anhidro (158,11).",
            "",
            "#### Paso 1 — Peso equivalente",
            "PE = 248,18 ÷ 1 = **248,18 mg/meq** (η = 1 → PE numéricamente igual al PM)",
            "",
            "#### Paso 2 — Miliequivalentes",
            "meq = 725 mg ÷ 248,18 mg/meq = **2,921 meq**",
            "",
            "#### Paso 3 — Equivalentes",
            "eq = 2,921 ÷ 1000 = **2,921×10⁻³ eq**",
            "",
            "**Lectura.** Si por error se usara el PM del anhidro (158,11) en vez del pentahidratado, el resultado saldría inflado — un error común cuando se mezcla el dato de pureza/PM de la etiqueta con el de una tabla distinta.",
          ].join("\n"),
        },
        {
          question: [
            "**Problema 7 (valoración indirecta + factor de dilución).** Una materia prima de sulfato de cobre(II) pentahidratado fue analizada así: se pesaron **80 mg**, se disolvieron y se llevaron a un balón aforado de **50 mL**. Se tomó una alícuota de **10 mL**, se agregó ácido acético glacial y KI en exceso (libera I₂ proporcional al Cu²⁺), y esa solución se valoró con tiosulfato de sodio **0,0093 N**, gastando **4,00 mL**. ¿Qué porcentaje de CuSO₄ **anhidro** (PM = 159,60 g/mol) contiene la materia prima?",
          ].join("\n"),
          solution: [
            "#### Reacciones en juego (valoración indirecta / por sustitución)",
            "2Cu²⁺ + 4I⁻ → 2CuI(s) + I₂",
            "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻",
            "Los meq de tiosulfato gastados = meq de I₂ liberado = meq de Cu²⁺ en la alícuota. Esa cadena es lo que permite valorar Cu²⁺ sin reaccionar directo con él.",
            "",
            "#### Paso 1 — meq de tiosulfato gastados",
            "meq = 4,00 mL × 0,0093 meq/mL = **0,0372 meq**",
            "",
            "#### Paso 2 — meq de CuSO₄ en la alícuota (misma cantidad, por la cadena de equivalencia)",
            "meq CuSO₄ = **0,0372 meq**",
            "",
            "#### Paso 3 — Masa de CuSO₄ anhidro en la alícuota",
            "PE(CuSO₄, η=1) = 159,60 mg/meq",
            "masa = 0,0372 meq × 159,60 mg/meq = **5,937 mg**",
            "",
            "#### Paso 4 — Factor de dilución y masa total",
            "FD = V_balón ÷ V_alícuota = 50 ÷ 10 = **5**",
            "masa total de CuSO₄ = 5,937 mg × 5 = **29,69 mg**",
            "",
            "#### Paso 5 — Porcentaje",
            "% CuSO₄ anhidro = (29,69 ÷ 80,00) × 100 = **37,1 %**",
            "",
            "**Por qué «anhidro» y no «pentahidratado».** Aunque la materia prima pesada es la sal con agua, el reporte pide la riqueza del CuSO₄ **anhidro** — el PE a usar en el Paso 3 es el del anhidro (159,60), sin importar que la sal original tuviera agua de cristalización.",
          ].join("\n"),
        },
        {
          question: [
            "**Problema 8 (doble dilución en cadena).** Se pesaron **20 mg** de un mineral de cromo, se disolvió y se oxidó todo el cromo a Cr⁺⁶; la solución se llevó a un balón de **25 mL**. Se tomó una alícuota de **10 mL**, se llevó a un segundo balón de **25 mL**, y de este se tomaron otros **10 mL** para valorar (con H₂SO₄ 6 N y KI en exceso) con tiosulfato de sodio **0,0174 N**, gastando **8,00 mL**. El Cr⁺⁶ se reduce a Cr³⁺ (η = 3 por átomo). ¿Qué porcentaje de cromo contiene el mineral? (peso atómico Cr = 51,996 g/mol)",
          ].join("\n"),
          solution: [
            "#### Paso 1 — Peso equivalente del cromo",
            "PE(Cr) = 51,996 ÷ 3 = **17,332 mg/meq**",
            "",
            "#### Paso 2 — meq de tiosulfato = meq de Cr en la alícuota valorada",
            "meq = 8,00 mL × 0,0174 meq/mL = **0,1392 meq**",
            "",
            "#### Paso 3 — Factor de dilución total (dos diluciones en cadena → se multiplican)",
            "FD = (25÷10) × (25÷10) = 2,5 × 2,5 = **6,25**",
            "",
            "#### Paso 4 — Masa de Cr en la alícuota valorada, y masa total",
            "masa (alícuota) = 0,1392 meq × 17,332 mg/meq = **2,413 mg**",
            "masa total = 2,413 mg × 6,25 = **15,08 mg**",
            "",
            "#### Paso 5 — Porcentaje",
            "% Cr = (15,08 ÷ 20,00) × 100 = **75,4 %**",
            "",
            "**Lectura.** Cuando hay **dos** diluciones seguidas (balón→alícuota→balón→alícuota), el FD de cada etapa se multiplica — nunca se suma. Sumarlos por error es de los fallos que más se repiten en el parcial.",
          ].join("\n"),
        },
        {
          question: [
            "**Problema 9 (valoración redox directa, % pureza).** Se pesaron **150 mg** de una materia prima de ácido ascórbico (vitamina C, PM = 176,12 g/mol) y se disolvieron en agua acidulada. La valoración redox directa con yodo (I₂) **0,0500 N** consumió **17,00 mL**. El ácido ascórbico se oxida perdiendo 2 electrones (η = 2). ¿Qué porcentaje de pureza tiene la muestra?",
          ].join("\n"),
          solution: [
            "#### Paso 1 — Peso equivalente",
            "PE = 176,12 ÷ 2 = **88,06 mg/meq**",
            "",
            "#### Paso 2 — meq de I₂ gastados = meq de ácido ascórbico reaccionante",
            "meq = 17,00 mL × 0,0500 meq/mL = **0,8500 meq**",
            "",
            "#### Paso 3 — Masa de ácido ascórbico que realmente reaccionó",
            "masa = 0,8500 meq × 88,06 mg/meq = **74,85 mg**",
            "",
            "#### Paso 4 — Porcentaje de pureza (dividir siempre por la masa PESADA, no reusar un valor fijo)",
            "% pureza = (74,85 ÷ 150,00) × 100 = **49,9 %**",
            "",
            "**Alerta del error más común.** Con varias réplicas, cada una tiene su propia masa pesada — el % de pureza de cada una se calcula dividiendo por **esa** masa, no reutilizando un «mg encontrados» constante en todas. Es el mismo error que se corrigió en la tabla de pureza del ácido nicotínico (Práctica 3, Módulo I).",
          ].join("\n"),
        },
        {
          question: [
            "**Problema 10 (valoración residual / retrovaloración).** Para determinar CaCO₃ (PM = 100,09 g/mol) en una tableta antiácida, se tomaron 200 mg de polvo y se agregaron **50,00 mL de HCl 0,1000 N** (exceso medido). El exceso de HCl que no reaccionó se valoró con **18,50 mL de NaOH 0,0950 N**. El CaCO₃ reacciona con 2 H⁺ (η = 2, PE = 50,045 mg/meq). ¿Cuántos mg de CaCO₃ hay en el polvo analizado?",
          ].join("\n"),
          solution: [
            "#### Por qué aquí no sirve la valoración directa",
            "El CaCO₃ es poco soluble y reacciona lento con un ácido diluido — por eso se usa **retrovaloración**: exceso medido de HCl (reacciona con todo el CaCO₃ disponible) y luego se valora lo que sobró.",
            "",
            "#### Paso 1 — meq totales de HCl agregados",
            "meq(HCl total) = 50,00 mL × 0,1000 meq/mL = **5,000 meq**",
            "",
            "#### Paso 2 — meq del exceso de HCl (los que reaccionaron con el NaOH)",
            "meq(exceso) = 18,50 mL × 0,0950 meq/mL = **1,7575 meq**",
            "",
            "#### Paso 3 — meq de HCl que sí reaccionaron con el CaCO₃",
            "meq(CaCO₃) = meq(HCl total) − meq(exceso) = 5,000 − 1,7575 = **3,2425 meq**",
            "",
            "#### Paso 4 — Masa de CaCO₃",
            "masa = 3,2425 meq × 50,045 mg/meq = **162,3 mg**",
            "",
            "**Lectura.** La resta del Paso 3 es el corazón de toda retrovaloración: nunca valoras el analito directamente, sino que lo infieres por diferencia frente a un exceso conocido.",
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
    { term: "Punto de equivalencia vs. punto final", moduleSlug: "conceptos-previos", definition: "El **punto de equivalencia** es el momento teórico exacto en que los equivalentes de valorante igualan a los del analito — nunca se observa directamente, se calcula. El **punto final** es lo que sí detectas en el laboratorio (cambio de color, salto de potencial): es tu mejor estimación práctica del punto de equivalencia." },
    { term: "Valoración directa", moduleSlug: "conceptos-previos", definition: "El valorante se agrega directamente sobre la solución del analito hasta el punto final. Es la forma por defecto: se usa siempre que la reacción sea rápida y haya una forma clara de detectar el punto final." },
    { term: "Valoración inversa", moduleSlug: "conceptos-previos", definition: "Se invierten los papeles habituales: se mide un volumen exacto del valorante y se le agrega progresivamente la muestra, en vez de al revés." },
    { term: "Valoración residual (retrovaloración)", moduleSlug: "conceptos-previos", definition: "Se usa cuando la valoración directa no es viable (reacción lenta, analito insoluble o volátil, sin indicador adecuado). Se agrega un exceso medido de un valorante primario, se deja reaccionar todo el analito, y el exceso no reaccionado se valora con un segundo valorante; el analito se calcula por diferencia." },
    { term: "Valoración indirecta (por sustitución)", moduleSlug: "conceptos-previos", definition: "El analito no reacciona directamente con nada fácil de valorar. Primero reacciona con un reactivo intermedio en exceso que libera una segunda especie proporcional a la cantidad de analito, y esa segunda especie es la que se valora (ej.: Cu²⁺ + KI en exceso → libera I₂ → el I₂ se valora con tiosulfato)." },
    { term: "Corrección por blanco", moduleSlug: "conceptos-previos", definition: "Se repite todo el procedimiento sin la muestra para medir cuánto valorante consumen por sí solos el solvente y los reactivos (impurezas). El volumen real de la muestra es V_muestra − V_blanco." },
    { term: "Factor de dilución (FD)", moduleSlug: "conceptos-previos", definition: "Número que multiplica el resultado de una alícuota para reconstruir la cantidad total en la muestra original: FD = V_balón ÷ V_alícuota. Con varias diluciones en cadena, los FD de cada etapa se multiplican entre sí. Los equivalentes de analito no cambian al diluir — solo el volumen en que están repartidos." },
    { term: "Valorar (valoración)", moduleSlug: "conceptos-previos", definition: "Agregar un valorante de concentración ya conocida sobre una muestra para averiguar cuánto analito hay en ella (p. ej., el % de pureza de una materia prima). El valorante ya debe estar estandarizado de antemano." },
    { term: "Estandarizar (estandarización)", moduleSlug: "conceptos-previos", definition: "Un caso particular de valorar, en el que el \"analito\" es el propio valorante: se valora frente a un patrón primario (pureza certificada ≥ 99,9 %) para hallar su concentración real, porque la nominal con la que se preparó casi nunca es exacta. Siempre se hace antes de usar ese valorante para valorar cualquier otra cosa." },
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
      name: "Peso equivalente (PE): la regla correcta según el tipo de analito",
      expression: "PE = #{PM|η}",
      variables:
        "PM = peso molecular (g/mol o mg/mmol) · η = «cuántas unidades reactivas» aporta una fórmula completa: H⁺/OH⁻ para ácido-base, e⁻ transferidos para redox, o carga iónica intercambiada para sales",
      description:
        "Antes de dividir por η hay que **elegir bien la regla**: depende de qué tipo de analito es y en qué reacción participa. Esta ficha reúne las 4 reglas del peso equivalente y los ejercicios resueltos de los reactivos que más aparecen en el curso (valorantes y patrones primarios de las prácticas de potenciometría).",
      moduleSlug: "conceptos-previos",
      derivation: [
        "Regla 1 — **Ácido** (dona H⁺): η = n.º de H⁺ que cede la fórmula. HCl → 1 (monoprótico) · H₂SO₄ → 2 (diprótico) · H₃PO₄ → hasta 3, según cuántos H⁺ se neutralicen en esa reacción.",
        "Regla 2 — **Base** (dona OH⁻ o acepta H⁺): η = n.º de OH⁻ que cede. NaOH → 1 · Ca(OH)₂ → 2.",
        "Regla 3 — **Sal o especie iónica, por carga negativa**: η = n.º de cargas negativas generadas o consumidas.",
        "Regla 4 — **Sal o especie iónica, por carga positiva**: η = n.º de cargas positivas generadas o consumidas. Las reglas 3 y 4 deben dar el **mismo PE** — sirven para comprobar el cálculo entre sí.",
        "Regla 5 — **Redox**: η = n.º de electrones transferidos por fórmula unidad completa. Hay que mirar la **semirreacción**, no solo la fórmula: el mismo elemento puede transferir distinto n.º de electrones según el medio (ácido, neutro o básico) y según cuántos átomos de ese elemento tenga la fórmula.",
        "**Cómo elegir la regla correcta, en dos preguntas:** (1) ¿es una reacción ácido-base o una redox? (2) sobre la semirreacción o la disociación, ¿cuántas unidades reactivas intercambia **una fórmula completa** de la sustancia — no un solo átomo, si hay más de uno en la fórmula?",
      ].join("\n"),
      examples: [
        [
          "**Ejemplo 1 — tres valorantes ácido-base comunes del laboratorio.**",
          "",
          "| Sustancia | Reacción | PM (g/mol) | η | PE = PM/η (g/eq = mg/meq) |",
          "| --- | --- | --- | --- | --- |",
          "| NaOH | → Na⁺ + OH⁻ | 40,00 | 1 (1 OH⁻) | 40,00 |",
          "| HCl | → H⁺ + Cl⁻ | 36,50 | 1 (1 H⁺, monoprótico) | 36,50 |",
          "| H₂SO₄ | → 2H⁺ + SO₄²⁻ | 98,00 | 2 (2 H⁺, diprótico) | 49,00 |",
          "",
          "**Lectura.** El PM del H₂SO₄ es más del doble que el de NaOH, pero su PE (49,00) queda muy cerca del de NaOH (40,00) — porque cada mol de H₂SO₄ \"vale\" por 2 equivalentes. Por eso la Normalidad (no la Molaridad) es la unidad natural para compararlos en una valoración.",
        ].join("\n"),
        [
          "**Ejemplo 2 — cuatro reactivos redox del laboratorio (siempre mira la semirreacción, no solo la fórmula).**",
          "",
          "| Sustancia | Semirreacción | PM (g/mol) | e⁻ transferidos (η) | PE (mg/meq) |",
          "| --- | --- | --- | --- | --- |",
          "| KMnO₄ (medio ácido) | Mn⁺⁷ + 5e⁻ → Mn⁺² | 158,00 | 5 | 31,60 |",
          "| Na₂S₂O₃ (anhidro) | 2 S⁺² → 2 S⁺²·⁵ + 2×0,5e⁻ | 158,11 | 1 | 158,11 |",
          "| K₂Cr₂O₇ | 2 Cr⁺⁶ + 2×3e⁻ → 2 Cr⁺³ | 294,00 | 6 | 49,00 |",
          "| Na₂C₂O₄ | 2 C⁺³ → 2 C⁺⁴ + 2×1e⁻ | 134,00 | 2 | 67,00 |",
          "",
          "**Lectura.** Fíjate en el tiosulfato: aunque su PM (158,11) es casi igual al del KMnO₄ (158,00), su η es 1 en vez de 5 — así que su PE es 5 veces más grande. Un η mal contado (p. ej. usar η=2, como si cada azufre transfiriera 1 electrón completo) daría un PE a la mitad del real; ese es el error más común con esta sal.",
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

  // Laboratorio del Módulo I (Prof. García Castañeda). Logística del cronograma
  // del grupo G-02 / subgrupo J3 (Cesar + Juan José Erazo Duarte) y guía-tutorial
  // oficial de laboratorio. Material de referencia: no pasa por `db:seed`.
  labRules: [
    "**Dónde y cuándo:** Laboratorio 120, Edificio 500 (Facultad de Ciencias Agrarias). Grupo 2 (G-02): **jueves, 8:00–13:00**.",
    "**Asistencia mínima 90 %.** Por debajo de ese umbral la asignatura se califica **0.0**, aunque la inasistencia esté justificada (Art. 32, Acuerdo 008 de 2008, UNAL).",
    "**Trabajo en parejas.** Cesar está en el subgrupo **J3**, con **Juan José Erazo Duarte**.",
    "**Presentación y EPP:** bata blanca abotonada, zapatos cerrados, cabello recogido, sin uñas largas ni esmalte; gafas de seguridad y guantes según el riesgo de la práctica. En la zona de trabajo no se come, no se bebe y no se manipulan lentes de contacto.",
    "**Electrodo según el tipo de valoración:** acuosa → electrodo combinado de vidrio con electrolito **KCl** · no acuosa → electrodo combinado de vidrio con electrolito **LiCl** · redox → electrodo combinado de **platino**.",
    "**Antes de pesar:** consultar la tabla de valorantes, purezas y patrones primarios de la **Práctica 1** (miliequivalente y patrón primario de cada valorante).",
    "**Montaje de bureta y electrodo combinado:** ver el video de referencia antes de la práctica → https://drive.google.com/file/d/1ZgALwf8Y9CNv9mwTYzvexv16coFV2i1R/view?usp=sharing",
    "**Plan del subgrupo J3 — Módulo I (semanas 1 a 5):** sem. transición/1 → preparar y estandarizar NaNO₂ 0,1 M + FT-IR (extracción del activo, muestras 5 y 6, pastilla de KBr) + valoración potenciométrica acuosa · sem. 2 → valoración potenciométrica no acuosa + %humedad por pérdida por secado · sem. 3 → valoración redox y completar prácticas faltantes · sem. 4 → completar prácticas faltantes · sem. 5 → **parcial práctico** (Cesar 9:20 a.m., Juan José 9:40 a.m.) + seminario de Instrumentación (potenciometría), asignado a J3.",
    "**Muestras asignadas al subgrupo J3:** FT-IR/ATR → tableta (muestras 5 y 6), extracción del activo · potenciometría acuosa → **ácido nicotínico** (valoración directa) · potenciometría no acuosa → **acetato de sodio·3H₂O** (USP/ANMAT) · potenciometría redox → **oxalato de sodio** (USP/ANMAT) · %humedad → **sulfato de sodio anhidro** (ANMAT).",
    "**Residuos y orden:** disponer los residuos químicos según el Sistema de Gestión Ambiental de la Sede (no verter al desagüe sin autorización); dejar la mesa limpia y descontaminada. Salidas de emergencia y duchas de seguridad siempre despejadas.",
    "**Referencia general:** Manual de Seguridad para Laboratorios, UNAL (División Nacional de Salud Ocupacional): http://www.laboratorios.bogota.unal.edu.co/userfiles/files/MANUAL%20DE%20SEGURIDAD%20LABORATORIOS%2031-10-2012_final(1).pdf",
  ],

  labPractices: [
    {
      number: 1,
      title: "Preparación y estandarización de soluciones valorantes",
      moduleSlug: "metodos-electrometricos",
      fundamento:
        "La **concentración nominal** de un valorante casi nunca coincide con la real: depende de la pureza del reactivo, de su estabilidad y de la forma de prepararlo. Por eso, antes de usarlo para cuantificar una materia prima, se **estandariza** frente a un **patrón primario** — una sustancia de pureza conocida y alta, estable, no higroscópica y de peso equivalente grande. La estandarización potenciométrica sigue el potencial de la celda con cada adición y ubica el punto de equivalencia por la **primera derivada**.",
      desarrollo: [
        "#### Tipo de valoración, analito y valorante",
        "",
        "**Tipo de valoración:** nitrimétrica (por diazotación), con punto final eléctrico *dead-stop*. Es una categoría propia — **no** es ácido-base acuosa, ni no acuosa, ni redox clásica — aunque el montaje (vaso + agitación + electrodos + bureta) se parezca al de las demás. **Modalidad: directa** — el NaNO₂ gotea directo sobre la sulfanilamida hasta el punto final; no hay exceso que se valore después (eso sería residual) ni un reactivo intermedio que libere otra especie (eso sería indirecta).",
        "",
        "| | Analito (sulfanilamida) | Valorante (NaNO₂) |",
        "| --- | --- | --- |",
        "| PM | **172,20 g/mol** | **69,00 g/mol** |",
        "| η (factor de equivalencia) | **1** (un solo –NH₂ reactivo) | **1** (1 mol de NaNO₂ → 1 mol de HNO₂ reactivo) |",
        "| **Peso equivalente (PE = PM / η)** | **172,2 mg/meq** | **69,0 mg/meq** |",
        "",
        "**Estructura del analito.** La sulfanilamida es un anillo bencénico con un grupo **–NH₂** (amina aromática primaria — el que reacciona con el HNO₂) en una posición y un grupo **–SO₂NH₂** (sulfonamida) en posición *para*. Ese grupo sulfonamida es el que históricamente le da actividad antibacteriana como fármaco; aquí se usa solo como **patrón primario** por su alta pureza y estabilidad.",
        "",
        "**Estructura del valorante.** El NaNO₂ es una sal inorgánica simple: el ion **nitrito (NO₂⁻)**, de geometría angular (resonancia entre dos formas equivalentes N=O), junto con su contraión Na⁺. No reacciona como nitrito directamente — en el medio ácido se convierte primero en **ácido nitroso (HNO₂)**, la especie que de verdad ataca a la amina de la sulfanilamida (ver la reacción más abajo).",
        "",
        "#### La reacción de diazotación, paso a paso",
        "",
        "La sulfanilamida es una **amina aromática primaria** (–NH₂ unido directo al anillo bencénico). Frente al **ácido nitroso** (HNO₂, generado en el momento a partir de NaNO₂ + HCl), sufre una **nitrosación** que termina en una **sal de diazonio**, estable solo en frío:",
        "",
        "```formula",
        "NaNO₂ + HCl → HNO₂ + NaCl",
        "```",
        "",
        "```formula",
        "Ar−NH₂ + HNO₂ + HCl → Ar−N₂⁺Cl⁻ + 2H₂O",
        "```",
        "",
        "(Ar = el resto aromático de la sulfanilamida). El HNO₂ se protona a un catión nitrosonio (NO⁺), la amina lo ataca con su par de electrones libre, y la especie intermedia pierde agua para formar el enlace **N≡N⁺** del diazonio. Es exactamente el mismo tipo de reacción con el que se preparan los colorantes azoicos en química orgánica — aquí se usa solo como reacción analítica cuantitativa.",
        "",
        "> Analogía: el HNO₂ es como una llave que solo encaja un instante — se forma, reacciona de inmediato con la amina disponible, y mientras quede sulfanilamida sin reaccionar, nunca se acumula libre en la solución.",
        "",
        "#### Por qué el punto final es eléctrico, no de color (técnica *dead-stop*)",
        "",
        "Mientras queda sulfanilamida sin reaccionar, el HNO₂ que se forma gota a gota se consume de inmediato — por eso casi no hay HNO₂ libre y casi no pasa corriente entre los dos electrodos sumergidos (el combinado Ag/AgCl // Pt, con la punta de la bureta goteando justo encima). En el instante en que **toda** la sulfanilamida ya reaccionó, la primera gota de NaNO₂ en exceso deja HNO₂ libre en el medio: esa especie es electroactiva y se **depolariza** en el electrodo de platino, lo que dispara un salto brusco de potencial. Ese salto — no un cambio de color — es el punto final *dead-stop*.",
        "",
        "#### Ejemplo numérico resuelto (concentración real del NaNO₂)",
        "",
        "Supongamos que se pesaron **43,05 mg** de sulfanilamida (patrón primario, mequiv = 172,2 mg) y la titulación gastó **V_eq = 2,50 mL** de NaNO₂.",
        "",
        "| Paso | Cálculo | Resultado |",
        "| --- | --- | --- |",
        "| meq de sulfanilamida pesados | 43,05 mg ÷ 172,2 mg/meq | 0,2500 meq |",
        "| meq de NaNO₂ en el punto de equivalencia | eq(NaNO₂) = eq(sulfanilamida) | 0,2500 meq |",
        "| **Normalidad real del NaNO₂** | 0,2500 meq ÷ 2,50 mL | **0,1000 N** |",
        "",
        "**Lectura.** Esta N real — no la nominal con la que se preparó el NaNO₂ — es la que se usa de ahí en adelante en cualquier otra práctica que use NaNO₂ como valorante.",
      ].join("\n"),
      keyPoints: [
        "Criterios de patrón primario: pureza ≥ 99,9 %, estable al aire y al secado, no higroscópico ni eflorescente, peso equivalente alto (menos error al pesar), reacción estequiométrica y rápida con el valorante.",
        "**NaNO₂ 0,1 M:** para 750 mL se pesan ≈ 5,18 g de NaNO₂ (85 % de pureza); si se preparan 250 mL, escalar a ≈ 1,73 g. Disolver en agua destilada, aforar y trasvasar a **botella ámbar rotulada** (el nitrito se oxida con la luz y el aire).",
        "Estandarización del NaNO₂ frente a **sulfanilamida**: disolver el patrón pesado en 40 mL de agua + 12 mL de HCl concentrado (≈ 3 N) y enfriar; la diazotación es lenta y exotérmica.",
        "Montaje: vaso con agitación magnética + **electrodo combinado Ag/AgCl // Pt**; la **punta de la bureta debe quedar sumergida** en la solución de sulfanilamida (técnica *dead-stop*, propia de la nitrimetría).",
        "Esquema de adición: 1,0 mL hasta llegar a 3,0 mL → 0,5 mL hasta 4,0 mL → 0,25 mL hasta el punto final; luego 2–3 adiciones más de 0,5 mL para confirmar potencial constante. **Registrar mV después de cada adición.**",
        "El punto de equivalencia se toma donde ΔmV/ΔV es máximo (primera derivada), no por color.",
      ],
      procedure:
        "#### Preparación de NaNO₂ 0,1 M\n" +
        "1. Calcular la masa de NaNO₂ según el volumen a preparar (≈ 5,18 g para 750 mL; ≈ 1,73 g para 250 mL) y su pureza (85 %).\n" +
        "2. Pesar el NaNO₂ y disolverlo en un poco de agua destilada.\n" +
        "3. Trasvasar a probeta/matraz y aforar al volumen final con agua destilada.\n" +
        "4. Pasar a **botella ámbar**, rotular (reactivo, concentración nominal, fecha, responsable) y reservar para estandarizar.\n\n" +
        "#### Estandarización frente a sulfanilamida\n" +
        "1. Pesar la masa de sulfanilamida indicada por el docente (patrón primario); anotar el peso exacto.\n" +
        "2. Disolver en **40 mL de agua destilada + 12 mL de HCl concentrado**; enfriar la solución.\n" +
        "3. Montar el vaso sobre agitador magnético con el electrodo combinado y la bureta con NaNO₂; **sumergir la punta de la bureta** en la solución.\n" +
        "4. Titular según el esquema de adición (1,0 → 0,5 → 0,25 mL) registrando el potencial (mV) tras cada adición y el volumen acumulado.\n" +
        "5. Pasado el punto final, hacer 2–3 adiciones más de 0,5 mL para verificar potencial constante.\n" +
        "6. Graficar mV vs. V y ΔmV/ΔV vs. V; leer el **volumen de equivalencia** y calcular la concentración real.\n\n" +
        "#### Tabla de valorantes y patrones primarios (referencia para pesar)\n" +
        "| Valorante | mequiv (mg) | Pureza / propiedad | Patrón primario | mequiv patrón (mg) |\n" +
        "| --- | --- | --- | --- | --- |\n" +
        "| Na₂S₂O₃·5H₂O | 248,18 | 96 % | Dicromato de potasio | 49,0 |\n" +
        "| KMnO₄ | 31,6 | 98 % | Oxalato de sodio | 67,0 |\n" +
        "| Ácido perclórico | 100,5 | 70 % p/p; d = 1,6 g/mL | Biftalato de potasio | 204,2 |\n" +
        "| Ácido clorhídrico | 36,5 | 36,5 % p/p; d = 1,19 g/mL | Carbonato de sodio | 53,0 |\n" +
        "| Ácido sulfúrico | 49,0 | 98 % p/p; d = 1,8 g/mL | Sulfanilamida | 172,2 |\n" +
        "| Ácido fosfórico | 32,7 | 85 % p/p; d = 1,7 g/mL | Carbonato de calcio | 100,0 |\n" +
        "| NaOH | 40,0 | Lentejas | Biftalato de potasio | — |\n" +
        "| NaNO₂ | 69,0 (g/mol) | 85 % | Sulfanilamida | 172,2 |\n" +
        "| Edetato disódico·2H₂O | 292,2 (g/mol) | 98 % | — | — |\n",
      equations: [
        {
          name: "Molaridad",
          expression: "M = #{mmol de soluto|mL de solución}",
          variables: "mmol de soluto = mg de soluto / peso milimolar",
          description: "Concentración nominal con la que se prepara el valorante antes de estandarizar.",
        },
        {
          name: "Normalidad real por patrón primario",
          expression: "N = #{m_{patrón} (mg)|mequiv_{patrón} (mg) · V_{eq} (mL)}",
          variables:
            "m_{patrón} = masa pesada del patrón · mequiv_{patrón} = miliequivalente del patrón (tabla) · V_{eq} = volumen de valorante en el punto de equivalencia",
          description: "Concentración real del valorante tras la estandarización.",
        },
      ],
      dataRequested: [
        "Masa de NaNO₂ pesada y volumen preparado; concentración nominal.",
        "Masa exacta del patrón primario (sulfanilamida) en cada réplica.",
        "Tabla volumen (mL) – potencial (mV) de cada estandarización.",
        "Volumen de equivalencia por la primera derivada (ΔmV/ΔV).",
        "Concentración real (M y N) del valorante y su promedio entre réplicas.",
      ],
      studyTopics: [
        "Valoración nitrimétrica (diazotación) y técnica *dead-stop*.",
        "Criterios y ejemplos de patrones primarios ácido-base, redox y de precipitación.",
        "Ubicación del punto de equivalencia por primera y segunda derivada.",
      ],
      quizQuestions: [
        {
          question:
            "¿Qué papel juega el ácido nitroso (HNO₂) en esta valoración, y por qué se **genera en el momento** (NaNO₂ + HCl) en vez de añadirse ya preparado?",
          solution: [
            "El HNO₂ es el reactivo que realmente ataca la amina aromática de la sulfanilamida (nitrosación → diazotación). Es una especie **inestable**: se descompone con facilidad, sobre todo al calentarse o concentrarse, dando óxidos de nitrógeno y agua.",
            "",
            "Por eso no se prepara ni se guarda como reactivo aparte: se genera **in situ**, gota a gota, a partir de NaNO₂ (estable, es lo que de verdad está en la bureta) y el HCl ya presente en el medio de reacción. Así solo existe la cantidad justa de HNO₂ necesaria para reaccionar de inmediato con la sulfanilamida disponible en ese instante — nunca se acumula un exceso que se descomponga antes de reaccionar.",
            "",
            "**Idea clave:** mientras quede sulfanilamida sin reaccionar, el HNO₂ generado se consume casi al instante — esto es justamente lo que hace posible el punto final *dead-stop* (pregunta siguiente).",
          ].join("\n"),
        },
        {
          question:
            "¿Por qué el punto final de esta valoración se detecta **eléctricamente** (técnica *dead-stop*, con electrodo combinado Ag/AgCl // Pt) y no con un indicador de color?",
          solution: [
            "Mientras quede sulfanilamida sin reaccionar, el HNO₂ que se forma con cada gota de NaNO₂ se consume de inmediato — no hay HNO₂ **libre** en la solución, así que casi no pasa corriente entre los dos electrodos sumergidos (la bureta gotea justo sobre ellos).",
            "",
            "En el instante en que **toda** la sulfanilamida ya reaccionó, la primera gota de NaNO₂ en exceso deja HNO₂ libre en el medio. Esa especie es **electroactiva**: se depolariza en el electrodo de platino, lo que dispara un **salto brusco de potencial/corriente**. Ese salto — no un cambio de color — es el punto final.",
            "",
            "**Por qué no serviría un indicador visual aquí:** la sulfanilamida y sus productos de diazotación no tienen un cambio de color neto y confiable en este rango — la señal eléctrica es mucho más nítida y reproducible que cualquier indicador disponible para esta reacción.",
          ].join("\n"),
        },
        {
          question:
            "**Cálculo.** Se pesan **51,66 mg** de sulfanilamida (patrón primario, mequiv = 172,2 mg/meq) y la titulación con NaNO₂ gasta **V_eq = 3,00 mL**. Calcula la **normalidad real** del NaNO₂.",
          solution: [
            "#### Paso 1 — meq de sulfanilamida pesados",
            "meq = 51,66 mg ÷ 172,2 mg/meq = **0,3000 meq**",
            "",
            "#### Paso 2 — meq de NaNO₂ en el punto de equivalencia",
            "Por el principio de equivalencia, eq(NaNO₂) = eq(sulfanilamida): **0,3000 meq**",
            "",
            "#### Paso 3 — Normalidad real",
            "N = 0,3000 meq ÷ 3,00 mL = **0,1000 N**",
            "",
            "**Lectura.** Esta N real (no la nominal con la que se preparó el NaNO₂) es la que debe usarse en cualquier otra práctica donde el NaNO₂ actúe como valorante.",
          ].join("\n"),
        },
      ],
    },

    {
      number: 2,
      title: "Identificación de un activo por FT-IR en un producto terminado",
      moduleSlug: "ir",
      fundamento:
        "Una molécula absorbe radiación infrarroja cuando la **frecuencia de la radiación coincide con la frecuencia de vibración** de un enlace y esa vibración produce un **cambio en el momento dipolar**. El espectro se interpreta en dos zonas: la **región de grupos funcionales** (4000–1500 cm⁻¹), donde cada banda se asigna a un grupo (O–H, N–H, C=O, C≡N…), y la **región de la huella dactilar** (1500–400 cm⁻¹), que se compara en bloque contra un espectro de referencia para confirmar identidad. En un producto terminado el activo está mezclado con excipientes, así que primero se **extrae** con un disolvente selectivo.",
      desarrollo: [
        "#### Las dos estructuras de este curso: Naproxeno y Captopril",
        "",
        "Los dos medicamentos de referencia que se identifican en esta práctica son **Naproxeno** y **Captopril**. Antes de leer su espectro conviene saber qué grupos funcionales tiene cada uno — son justamente esos grupos los que explican sus bandas más características.",
        "",
        "**Naproxeno** — ácido (S)-2-(6-metoxinaftalen-2-il)propanoico. Es un AINE (antiinflamatorio no esteroideo) derivado del ácido propiónico: un **naftaleno** (dos anillos bencénicos fusionados, aromático) con un **metoxilo (–OCH₃)** en un extremo y, en el otro, una cadena corta **–CH(CH₃)–COOH** que termina en un **ácido carboxílico**.",
        "",
        "| # | Banda (cm⁻¹) | Asignación | Intensidad |",
        "| --- | --- | --- | --- |",
        "| 1 | 2970–3300 (ancha) | O–H del ácido carboxílico, dimerizado por puente de hidrógeno | Media-fuerte, ancha |",
        "| 2 | ≈1725 | C=O de ácido carboxílico (tensión) | Fuerte |",
        "| 3 | ≈1605 y ≈1510 | C=C aromático del naftaleno | Media |",
        "| 4 | ≈1230 | C–O–C del éter aromático (metoxilo Ar–O–CH₃) | Fuerte |",
        "| 5 | ≈860 y ≈815 | C–H aromático fuera del plano (patrón de sustitución del naftaleno) | Media |",
        "",
        "**Captopril** — ácido (2S)-1-[(2S)-2-metil-3-sulfanilpropanoil]pirrolidina-2-carboxílico. Es un inhibidor de la ECA: un anillo de **pirrolidina** (como en la prolina) unido por un enlace **amida** a una cadena corta que lleva un **grupo tiol (–SH)** — el grupo que le da su actividad — y conserva un **ácido carboxílico libre** en el anillo.",
        "",
        "| # | Banda (cm⁻¹) | Asignación | Intensidad |",
        "| --- | --- | --- | --- |",
        "| 1 | ≈2550–2575 | S–H del tiol (banda aguda y débil, poco común — muy diagnóstica) | Débil, aguda |",
        "| 2 | ≈1740–1750 | C=O del ácido carboxílico libre | Fuerte |",
        "| 3 | ≈1630–1650 | C=O de la amida terciaria (amida I; sin banda N–H porque el nitrógeno está dentro del anillo) | Fuerte |",
        "| 4 | ≈1400–1420 | Flexión C–H / C–N asociada al anillo de pirrolidina | Media |",
        "| 5 | ≈1180–1200 | C–N de la amida terciaria | Media |",
        "",
        "**Por qué estas bandas bastan para distinguirlos a simple vista.** El naproxeno no tiene azufre: nunca va a mostrar la banda aguda de S–H cerca de 2550–2575 cm⁻¹. El captopril no tiene anillos aromáticos: nunca va a mostrar el par de bandas de C=C aromático cerca de 1605/1510 cm⁻¹ ni las bandas de sustitución aromática fuera de plano cerca de 860/815 cm⁻¹. Antes incluso de comparar toda la huella dactilar contra el espectro de referencia, esas ausencias/presencias ya permiten saber frente a cuál de los dos fármacos se está.",
      ].join("\n"),
      keyPoints: [
        "Si la tableta tiene recubrimiento, retirarlo **manualmente** antes de macerar.",
        "Se preparan dos Eppendorf: **T** (macerado total, lectura directa — activo + excipientes) y **E** (para la extracción).",
        "Disolvente de extracción: **acetona** (disuelve el activo, no los excipientes insolubles); agitar suave 1 min en cabina de extracción.",
        "Centrifugar el Eppendorf E a **15 000 rpm por 5 min**; tomar solo el **sobrenadante** con pipeta Pasteur, sin arrastrar sólido.",
        "Evaporar la acetona hasta que aparezca el sólido; raspar suave para eliminar acetona ocluida y pasar el sólido al Eppendorf **Ex**.",
        "Pastilla: mezclar el sólido con **KBr en proporción 1:300 (mg/mg)**, macerar hasta que no queden cristales visibles de KBr y prensar en el pastillador. El KBr debe estar seco.",
        "Reporte: tabla comparando el número de onda de la **muestra** vs. **patrón (referencia)** vs. **literatura**, grupo por grupo, en KBr y en ATR si se tomaron ambos.",
        "La huella dactilar se compara por **superposición visual**: si solo cambia la **intensidad** de las bandas (no su posición), se interpreta como diferencia de concentración, no de identidad.",
      ],
      procedure:
        "#### Extracción del activo\n" +
        "1. Seleccionar las tabletas necesarias para reunir **100–500 mg de activo** y macerarlas en cápsula de porcelana hasta mezcla homogénea (retirar antes el recubrimiento, si lo hay).\n" +
        "2. Transferir el macerado a dos Eppendorf de 1,5 mL: uno marcado **T** (total, lectura directa) y otro **E** (extracción).\n" +
        "3. En cabina de extracción, añadir **acetona** al Eppendorf E, tapar y agitar suave a mano durante **1 minuto**.\n" +
        "4. Centrifugar el Eppendorf E a **15 000 rpm durante 5 minutos**.\n" +
        "5. Con pipeta Pasteur, transferir el **sobrenadante** (sin arrastrar sólido) a un vidrio de reloj.\n" +
        "6. Dejar evaporar la acetona hasta que aparezca el sólido; raspar suave para retirar la acetona ocluida.\n" +
        "7. Transferir el sólido a un Eppendorf marcado **Ex**.\n" +
        "8. Mezclar una fracción del sólido con KBr en proporción **1:300 (mg/mg)**, macerar hasta que no queden cristales visibles de KBr y prensar en el pastillador.\n\n" +
        "#### Lectura y reporte\n" +
        "1. Registrar el espectro de la pastilla **T** (activo + excipientes) y el de la pastilla **Ex** (activo extraído). Tomar ATR si el equipo lo permite.\n" +
        "2. Asignar las bandas de la región de grupos funcionales con la tabla de correlación.\n" +
        "3. Superponer el espectro Ex con el del patrón y con el de literatura; comparar la huella dactilar y concluir sobre la identidad.\n\n" +
        "#### Tabla de correlación de grupos funcionales\n" +
        "| Grupo funcional | Región (cm⁻¹) | Intensidad |\n" +
        "| --- | --- | --- |\n" +
        "| C–H (alcanos) | 2850–2970 / 1340–1470 | Fuerte |\n" +
        "| C–H (alquenos =C–H) | 3010–3095 / 675–995 | Media/Fuerte |\n" +
        "| C–H (alquinos ≡C–H) | 3300 | Fuerte |\n" +
        "| C–H (aromáticos) | 3010–3100 / 690–900 | Media/Fuerte |\n" +
        "| O–H (alcohol/fenol monomérico) | 3590–3650 | Variable |\n" +
        "| O–H (con puente de hidrógeno) | 3200–3600 | Variable, a veces amplia |\n" +
        "| O–H (ácido carboxílico) | 2500–2700 | Amplia |\n" +
        "| N–H (aminas, amidas) | 3300–3500 | Media |\n" +
        "| C=C (alquenos) | 1610–1680 | Variable |\n" +
        "| C=C (aromáticos) | 1500–1600 | Variable |\n" +
        "| C≡C (alquinos) | 2100–2260 | Variable |\n" +
        "| C–N (aminas, amidas) | 1180–1360 | Fuerte |\n" +
        "| C≡N (nitrilos) | 2210–2280 | Fuerte |\n" +
        "| C–O (alcoholes, éteres, ácidos, ésteres) | 1050–1300 | Fuerte |\n" +
        "| C=O (aldehídos, cetonas, ácidos, ésteres) | 1690–1760 | Fuerte |\n" +
        "| NO₂ (nitro) | 1500–1570 / 1300–1370 | Fuerte |\n",
      dataRequested: [
        "Espectro de la pastilla T (lectura directa) y de la pastilla Ex (activo extraído); espectros ATR si se tomaron.",
        "Tabla comparativa por grupo funcional: número de onda de la muestra vs. patrón vs. literatura (en KBr y en ATR).",
        "Imagen de la superposición de espectros muestra / patrón / literatura, con la huella dactilar señalada.",
        "Conclusión de identidad: ¿el activo del producto coincide con el patrón?",
      ],
      studyTopics: [
        "Vibraciones moleculares (tensión y flexión); condición del cambio de momento dipolar.",
        "Técnica de pastilla de KBr vs. reflectancia total atenuada (ATR): ventajas y artefactos.",
        "Interpretación sistemática de espectros IR de fármacos; regiones diagnósticas.",
      ],
      quizQuestions: [
        {
          question:
            "Describe la **estructura del naproxeno** por grupos funcionales y, para cada uno, indica la banda IR/ATR que debería aparecer.",
          solution: [
            "El naproxeno es ácido (S)-2-(6-metoxinaftalen-2-il)propanoico: un **naftaleno** (anillo aromático bicíclico) con un **metoxilo (–OCH₃)** en un extremo y una cadena **–CH(CH₃)–COOH** (ácido carboxílico) en el otro.",
            "",
            "| Grupo funcional | Banda esperada (cm⁻¹) | Por qué |",
            "| --- | --- | --- |",
            "| O–H del ácido carboxílico | 2970–3300 (ancha) | Puente de hidrógeno del dímero típico de ácidos carboxílicos — ensancha mucho la banda |",
            "| C=O del ácido carboxílico | ≈1725 | Tensión del doble enlace C=O, banda fuerte característica de ácidos |",
            "| C=C aromático (naftaleno) | ≈1605 y ≈1510 | Tensión del anillo aromático; aparecen como pareja |",
            "| C–O–C del metoxilo (éter aromático) | ≈1230 | Tensión asimétrica del enlace Ar–O–CH₃ |",
            "| C–H aromático fuera de plano | ≈860 y ≈815 | Reflejan el patrón de sustitución del naftaleno |",
          ].join("\n"),
        },
        {
          question:
            "Describe la **estructura del captopril** por grupos funcionales y, para cada uno, indica la banda IR/ATR que debería aparecer.",
          solution: [
            "El captopril es ácido (2S)-1-[(2S)-2-metil-3-sulfanilpropanoil]pirrolidina-2-carboxílico: un anillo de **pirrolidina** unido por un enlace **amida** a una cadena corta con un **grupo tiol (–SH)**, y con un **ácido carboxílico libre** en el anillo.",
            "",
            "| Grupo funcional | Banda esperada (cm⁻¹) | Por qué |",
            "| --- | --- | --- |",
            "| S–H del tiol | ≈2550–2575 | Banda aguda y débil, poco común en otros fármacos — muy diagnóstica |",
            "| C=O del ácido carboxílico libre | ≈1740–1750 | Tensión del doble enlace C=O |",
            "| C=O de la amida terciaria (amida I) | ≈1630–1650 | Sin banda N–H acompañante, porque el nitrógeno está dentro del anillo de pirrolidina (amida terciaria) |",
            "| C–H / C–N del anillo de pirrolidina | ≈1400–1420 | Flexión asociada a la estructura cíclica saturada |",
            "| C–N de la amida terciaria | ≈1180–1200 | Tensión del enlace C–N del grupo amida |",
          ].join("\n"),
        },
        {
          question:
            "Un espectro problema muestra una banda **aguda y débil cerca de 2560 cm⁻¹**, pero **no** muestra el par de bandas entre 1500–1610 cm⁻¹ típico de anillos aromáticos. ¿A cuál de los dos fármacos de esta práctica corresponde, y por qué?",
          solution: [
            "Corresponde al **captopril**.",
            "",
            "**Por qué la banda a 2560 cm⁻¹ apunta a captopril:** esa es la región diagnóstica del enlace **S–H** del grupo tiol — una banda aguda y débil poco común, que solo tiene el captopril entre los dos fármacos de esta práctica (el naproxeno no tiene azufre en su estructura).",
            "",
            "**Por qué la ausencia de bandas 1500–1610 cm⁻¹ confirma que no es naproxeno:** esas bandas corresponden a la tensión C=C de un anillo **aromático** — el naftaleno del naproxeno siempre las muestra. El captopril no tiene ningún anillo aromático (su anillo es la pirrolidina, saturado), así que su espectro nunca las presenta.",
            "",
            "**Lectura.** Estas dos observaciones —presencia de S–H y ausencia de aromático— son justamente las más rápidas de usar para distinguir un fármaco del otro, antes incluso de comparar toda la huella dactilar contra el espectro de referencia.",
          ].join("\n"),
        },
      ],
    },

    {
      number: 3,
      title: "Potenciometría en medio acuoso: valoración de ácido nicotínico",
      moduleSlug: "metodos-electrometricos",
      fundamento:
        "El **ácido nicotínico** (niacina, vitamina B₃) es un ácido carboxílico débil **monoprótico**. Se cuantifica por **valoración ácido-base directa** con NaOH previamente estandarizado, en agua, siguiendo el potencial con un **electrodo combinado de vidrio** (electrolito interno KCl). El punto de equivalencia se ubica por la **primera derivada** de la curva mV vs. volumen; con él se calcula la pureza de la materia prima.",
      desarrollo: [
        "#### Tipo de valoración, analito y valorante",
        "",
        "**Tipo de valoración:** ácido-base en **medio acuoso**. **Modalidad: directa** — el NaOH gotea directo sobre el ácido nicotínico hasta el punto de equivalencia.",
        "",
        "| | Analito (ácido nicotínico) | Valorante (NaOH) |",
        "| --- | --- | --- |",
        "| PM | **123,11 g/mol** | **40,00 g/mol** |",
        "| η (factor de equivalencia) | **1** (ácido monoprótico, 1 H⁺) | **1** (1 OH⁻) |",
        "| **Peso equivalente (PE = PM / η)** | **123,1 mg/meq** | **40,00 mg/meq** |",
        "",
        "**Estructura del analito.** El ácido nicotínico (niacina, vitamina B₃) es un anillo de **piridina** (aromático, con un nitrógeno básico que no participa aquí) con un grupo **–COOH** en la posición 3 — ese carboxilo es el único grupo que reacciona en esta valoración.",
        "",
        "**Estructura del valorante.** El NaOH es una base fuerte inorgánica simple: el ion **hidróxido (OH⁻)** junto con su contraión Na⁺. Al disociarse por completo en agua, cada mol de NaOH aporta exactamente 1 mol de OH⁻ disponible para neutralizar un ácido — por eso η = 1.",
        "",
        "#### La reacción ácido-base, paso a paso",
        "",
        "El ácido nicotínico es el ácido **piridina-3-carboxílico**: un anillo de piridina (aromático, con un nitrógeno básico) que lleva un grupo **–COOH** en la posición 3. Es un ácido **débil** (pKa ≈ 4,8) y **monoprótico** — solo el hidrógeno del carboxilo se transfiere en esta valoración; el nitrógeno del anillo es básico, pero no interviene porque se está neutralizando el lado ácido de la molécula.",
        "",
        "```formula",
        "HNic + OH⁻ → Nic⁻ + H₂O",
        "```",
        "",
        "(HNic = ácido nicotínico; Nic⁻ = ion nicotinato, su base conjugada). Es una neutralización simple **1 : 1** entre un H⁺ y un OH⁻ — por eso η = 1 y el peso equivalente coincide numéricamente con el peso molecular (123,1).",
        "",
        "#### Por qué el salto de potencial es claro aunque el ácido sea débil",
        "",
        "Antes del punto de equivalencia, la mezcla HNic/Nic⁻ se comporta como un **buffer**: el pH (y el potencial) cambia poco con cada adición. Justo en el punto de equivalencia, todo el analito ya es Nic⁻ — la base conjugada de un ácido débil — así que la solución queda **ligeramente básica** (se hidroliza un poco: Nic⁻ + H₂O ⇌ HNic + OH⁻). Ese cambio de régimen (de zona tamponada a zona sin tampón) es lo que produce el salto brusco de potencial que el electrodo de vidrio registra, aunque el ácido en sí sea débil.",
        "",
        "#### Ejemplo numérico resuelto (% pureza)",
        "",
        "Supongamos que se pesaron **67,5 mg** de la materia prima problema, la N real del NaOH (de su propia estandarización) es **0,0998 N**, y la titulación potenciométrica dio **V_eq = 5,50 mL** (cruce por cero de la segunda derivada).",
        "",
        "| Paso | Cálculo | Resultado |",
        "| --- | --- | --- |",
        "| mg de ácido nicotínico hallados | 5,50 mL × 0,0998 meq/mL × 123,1 mg/meq | 67,58 mg |",
        "| **% de pureza** | 67,58 mg ÷ 67,5 mg × 100 | **100,1 %** |",
        "",
        "**Lectura.** Un resultado así, muy cercano a 100 %, es el esperado para una materia prima farmacopeica de buena calidad; valores que se alejan bastante de 100 % (por arriba o por abajo) suelen apuntar a un error de pesada, de estandarización del NaOH, o a una lectura equivocada del V_eq.",
      ].join("\n"),
      keyPoints: [
        "Analito monoprótico → **peso equivalente = PM / 1 ≈ 123,1 g/eq** (PM del ácido nicotínico ≈ 123,11 g/mol).",
        "Valorante: NaOH **estandarizado** (usar la N real de la Práctica 1, no la nominal).",
        "Electrodo combinado de vidrio con electrolito **KCl**; calibrar el potenciómetro con buffers antes de empezar.",
        "Disolver la materia prima en agua destilada recién hervida y fría (sin CO₂) para no falsear el salto.",
        "Adiciones más finas cerca del salto de potencial; registrar mV después de cada adición y 2–3 adiciones más pasado el punto final.",
        "La **guía oficial no trae el ejemplo numérico** de ácido nicotínico: **no se anotan aquí pesos ni volúmenes** — esas tablas se llenan durante la práctica.",
      ],
      procedure:
        "#### Montaje\n" +
        "1. Calibrar el potenciómetro con soluciones buffer.\n" +
        "2. Pesar la materia prima (el docente indica el rango); anotar el peso exacto. Disolver en ~50 mL de agua destilada sin CO₂.\n" +
        "3. Montar el vaso sobre agitador magnético con el electrodo combinado (KCl) y la bureta con NaOH estandarizado.\n\n" +
        "#### Titulación\n" +
        "1. Adicionar NaOH en incrementos regulares registrando volumen acumulado y potencial (mV).\n" +
        "2. Al acercarse el salto de potencial, reducir el incremento (0,1–0,2 mL).\n" +
        "3. Continuar 2–3 adiciones después del punto final para cerrar la curva.\n" +
        "4. Graficar mV vs. V y ΔmV/ΔV vs. V; leer el **volumen de equivalencia**.\n\n" +
        "#### Cálculo\n" +
        "Con V_eq, la normalidad real del NaOH y el peso equivalente del ácido nicotínico, calcular los mg de analito y el **% de pureza** respecto al peso de muestra.",
      equations: [
        {
          name: "Potencial de la celda en valoración ácido-base",
          expression: "E_{celda} = L' − 0,059 · pH",
          variables:
            "L' = constante de la celda (agrupa potenciales de referencia y de unión) · 0,059 = 2,303·RT/F a 25 °C (V por unidad de pH)",
          description:
            "Forma de la ecuación de Nernst para el electrodo de vidrio: el potencial varía ~59 mV por unidad de pH. Vale igual en medio acuoso y no acuoso.",
        },
        {
          name: "Porcentaje de pureza",
          expression: "%pureza = #{V_{eq} · N_{NaOH} · PEq|m_{muestra} (mg)} × 100",
          variables:
            "V_{eq} = volumen de equivalencia (mL) · N_{NaOH} = normalidad real del valorante · PEq ≈ 123,1 mg/meq (ácido nicotínico) · m_{muestra} = masa de materia prima pesada",
        },
      ],
      dataRequested: [
        "Peso de la materia prima problema.",
        "Tabla volumen (mL) – potencial (mV) de la titulación.",
        "Volumen de equivalencia por la primera derivada.",
        "% de pureza calculado (y comparación con la especificación farmacopeica).",
      ],
      studyTopics: [
        "Peso equivalente en reacciones ácido-base; analitos monopróticos y polipróticos.",
        "Ecuación de Nernst aplicada al electrodo de vidrio; significado de L' y del factor 0,059.",
        "Métodos para ubicar el punto final: primera derivada, segunda derivada y método de Gran.",
      ],
      quizQuestions: [
        {
          question:
            "Escribe la reacción de neutralización entre el ácido nicotínico y el NaOH, e indica por qué su factor de equivalencia η = 1.",
          solution: [
            "```formula",
            "HNic + OH⁻ → Nic⁻ + H₂O",
            "```",
            "",
            "(HNic = ácido nicotínico; Nic⁻ = ion nicotinato, su base conjugada).",
            "",
            "**Por qué η = 1.** El ácido nicotínico es un ácido **monoprótico**: su única molécula de –COOH cede exactamente **un** H⁺ en esta reacción. El nitrógeno del anillo de piridina es básico, pero no interviene aquí porque se está neutralizando el lado ácido de la molécula, no el básico. Como η = 1, el peso equivalente coincide numéricamente con el peso molecular: PE = 123,1 mg/meq.",
          ].join("\n"),
        },
        {
          question:
            "¿Por qué el punto de equivalencia de esta valoración cae en una zona **ligeramente básica** (pH > 7) y no exactamente en pH = 7?",
          solution: [
            "En el punto de equivalencia, todo el ácido nicotínico ya se convirtió en su base conjugada, el ion **nicotinato (Nic⁻)**. Pero el nicotinato, al ser la base conjugada de un ácido **débil**, se **hidroliza parcialmente** en agua:",
            "",
            "```formula",
            "Nic⁻ + H₂O ⇌ HNic + OH⁻",
            "```",
            "",
            "Esa hidrólisis libera un poco de OH⁻, lo que deja la solución **ligeramente básica** en el punto de equivalencia — no neutra. Esto es general para **cualquier** sal de ácido débil con base fuerte (lo mismo pasa, por ejemplo, con el acetato de sodio de la Práctica 4). El electrodo de vidrio detecta este cambio de régimen igual: lo que importa para ubicar el punto final es el **salto brusco** de potencial, no que ese salto ocurra justo en pH = 7.",
          ].join("\n"),
        },
        {
          question:
            "**Cálculo.** Se pesan **55,2 mg** de materia prima problema. La N real del NaOH (de su propia estandarización) es **0,1005 N**, y la titulación potenciométrica dio **V_eq = 4,45 mL**. Calcula el % de pureza.",
          solution: [
            "#### Paso 1 — mg de ácido nicotínico hallados",
            "mg = V_eq × N_NaOH × PEq = 4,45 mL × 0,1005 meq/mL × 123,1 mg/meq = **55,05 mg**",
            "",
            "#### Paso 2 — % de pureza",
            "% pureza = 55,05 mg ÷ 55,2 mg × 100 = **99,7 %**",
            "",
            "**Lectura.** Un resultado tan cercano a 100 % es el esperado para una materia prima farmacopeica de buena calidad. Recuerda dividir siempre por la masa **pesada en esta réplica** — no por un valor de \"mg encontrados\" reutilizado de otra réplica.",
          ].join("\n"),
        },
      ],
    },

    {
      number: 4,
      title: "Potenciometría en medio no acuoso: valoración de acetato de sodio",
      moduleSlug: "metodos-electrometricos",
      fundamento:
        "El **acetato de sodio** es una base tan débil que **no puede valorarse en agua**: el agua *nivela* las bases débiles y el salto de potencial desaparece. Se titula en **ácido acético glacial** (disolvente poco básico, *diferenciador*) con **ácido perclórico (HClO₄)** como valorante, usando un electrodo combinado de vidrio con electrolito **LiCl**. El agua residual de la muestra se elimina con **anhídrido acético** antes de titular. El punto final se ve como un vire de color (cristal violeta: azul → verde aguamarina) y se confirma por la primera derivada.",
      desarrollo: [
        "#### Tipo de valoración, analito y valorante",
        "",
        "**Tipo de valoración:** ácido-base en **medio no acuoso**. **Modalidad: directa** — el HClO₄ gotea directo sobre el acetato de sodio; lo \"no acuoso\" es el disolvente (ácido acético glacial), no la modalidad.",
        "",
        "| | Analito (acetato de sodio) | Valorante (HClO₄) |",
        "| --- | --- | --- |",
        "| PM | **82,04 g/mol** | **100,46 g/mol** |",
        "| η (factor de equivalencia) | **1** (1 carga negativa en el acetato) | **1** (ácido monoprótico fuerte) |",
        "| **Peso equivalente (PE = PM / η)** | **82,04 mg/meq** | **100,46 mg/meq** |",
        "",
        "**Estructura del analito.** El acetato de sodio es una sal simple: el ion **acetato** (CH₃COO⁻, el grupo carboxilato del ácido acético) con su contraión **Na⁺**. No es un fármaco de estructura compleja — se usa aquí como ejemplo de **base débil** que exige medio no acuoso para poder valorarse.",
        "",
        "**Estructura del valorante.** El ácido perclórico es un ácido inorgánico fuerte: un átomo de cloro rodeado por 4 oxígenos en geometría tetraédrica (ion **perclorato, ClO₄⁻**) más el H⁺ ionizable. Es uno de los ácidos más fuertes que existen — por eso, en un disolvente poco básico como el ácido acético glacial, actúa como ácido **diferenciado** (ver la reacción más abajo).",
        "",
        "#### La reacción, paso a paso: por qué no se puede hacer en agua",
        "",
        "El acetato de sodio es la sal de un ácido débil (ácido acético, pKa ≈ 4,76) con una base fuerte: en agua se comporta como una **base débil** — el ion acetato le quita un protón al agua (CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻) solo parcialmente. El agua, al ser ella misma capaz de aceptar o donar protones con bastante facilidad, **nivela** la fuerza efectiva de cualquier base más débil que el OH⁻: el salto de potencial se vuelve demasiado pequeño para ubicar un punto de equivalencia confiable.",
        "",
        "En **ácido acético glacial** (un disolvente mucho menos básico que el agua) ese problema desaparece, porque el disolvente ya no compite por aceptar el protón del valorante. Ahí, el HClO₄ se comporta como un ácido extremadamente fuerte:",
        "",
        "```formula",
        "HClO₄ + CH₃COOH → CH₃COOH₂⁺ + ClO₄⁻",
        "```",
        "",
        "Ese catión **acetonio** (CH₃COOH₂⁺) es el verdadero ácido reactivo frente al acetato de sodio:",
        "",
        "```formula",
        "CH₃COONa + CH₃COOH₂⁺ → 2 CH₃COOH + Na⁺",
        "```",
        "",
        "En conjunto, la reacción neta de la valoración es:",
        "",
        "```formula",
        "CH₃COONa + HClO₄ → CH₃COOH + NaClO₄",
        "```",
        "",
        "> Analogía: el agua es un árbitro que nivela a todos los jugadores débiles al mismo nivel bajo; el ácido acético glacial, al ser un árbitro mucho menos exigente, deja que incluso una base muy débil como el acetato \"compita\" de forma medible frente a un ácido fuerte.",
        "",
        "#### Ejemplo numérico resuelto (% pureza, base húmeda y base seca)",
        "",
        "Se pesan **20,5 mg** de acetato de sodio en vaso seco; la titulación con HClO₄ **0,0998 N** gasta **V_eq = 2,50 mL**; por la Práctica 6 (pérdida por secado) se determinó un **% de humedad = 0,35 %**.",
        "",
        "| Paso | Cálculo | Resultado |",
        "| --- | --- | --- |",
        "| mg de acetato de sodio hallados | 2,50 mL × 0,0998 meq/mL × 82,04 mg/meq | 20,47 mg |",
        "| **% pureza en base húmeda (BH)** | 20,47 mg ÷ 20,5 mg × 100 | **99,9 %** |",
        "| **% pureza en base seca (BS)** | 99,9 % ÷ (100 − 0,35) × 100 | **100,2 %** |",
        "",
        "**Lectura.** El paso de BH a BS siempre **sube** un poco el resultado, porque le está descontando al denominador el agua que no es analito — es el mismo ajuste que se usa en cualquier materia prima higroscópica.",
      ].join("\n"),
      keyPoints: [
        "Trabajar en **vaso seco**: el agua consume HClO₄ y desplaza el punto final.",
        "Añadir 1–2 mL de **anhídrido acético** y agitar 2 min para neutralizar el agua residual; luego 20 mL de **ácido acético glacial**.",
        "Indicador visual: 2–3 gotas de **cristal violeta** (vira de azul a verde aguamarina en el punto de equivalencia).",
        "Valorante: **HClO₄ 0,1 N** en bureta de 5 mL. Esquema: 0,5 mL hasta 1,5 mL → 0,25 mL hasta potencial constante.",
        "Analito monobásico → **peso equivalente = PM / 1 = 82,04 g/eq** (acetato de sodio anhidro).",
        "Cálculo de referencia: mg de acetato de sodio = V(HClO₄) · N(HClO₄) · 82,04. Ejemplo: 2,5 mL × 0,1 N × 82,04 ≈ **20,5 mg**.",
        "Reportar la pureza en **base húmeda (BH)** y en **base seca (BS)**, con el % de humedad de la Práctica 6.",
      ],
      procedure:
        "#### Preparación de la muestra\n" +
        "1. Pesar ≈ **20,5 mg** de materia prima en un **vaso seco**; anotar el peso exacto.\n" +
        "2. Añadir **1–2 mL de anhídrido acético** y agitar 2 min.\n" +
        "3. Añadir **20 mL de ácido acético glacial** y disolver.\n" +
        "4. Añadir 2–3 gotas de **cristal violeta**.\n\n" +
        "#### Titulación potenciométrica\n" +
        "1. Montar el electrodo combinado (electrolito **LiCl**) y la bureta con **HClO₄ 0,1 N**.\n" +
        "2. Titular añadiendo **0,5 mL** hasta llegar a 1,5 mL, registrando el potencial (mV) tras cada adición.\n" +
        "3. Seguir con adiciones de **0,25 mL** hasta que el potencial se mantenga constante.\n" +
        "4. Anotar el volumen del vire de color (azul → verde) y el volumen de equivalencia potenciométrico.\n\n" +
        "#### Cálculo\n" +
        "Calcular los mg de acetato de sodio con V_eq · N(HClO₄) · 82,04 y el **% de pureza** en BH; con el % de humedad (Práctica 6), pasar a BS.",
      equations: [
        {
          name: "Miligramos de acetato de sodio",
          expression: "m_{AS} (mg) = V_{HClO₄} (mL) · N_{HClO₄} · PEq_{AS}",
          variables: "PEq_{AS} = 82,04 mg/meq (PM / 1) · ejemplo: 2,5 mL × 0,1 N × 82,04 ≈ 20,5 mg",
        },
        {
          name: "Porcentaje de pureza (base húmeda)",
          expression: "%pureza_{BH} = #{m_{AS} calculada (mg)|m_{muestra} pesada (mg)} × 100",
          variables: "m_{AS} = mg de acetato de sodio hallados en la titulación",
        },
        {
          name: "Paso de base húmeda a base seca",
          expression: "%pureza_{BS} = #{%pureza_{BH}|100 − %Humedad} × 100",
          variables: "%Humedad = pérdida por secado de la materia prima (Práctica 6)",
        },
      ],
      dataRequested: [
        "Peso de la materia prima (vaso seco).",
        "Tabla volumen (mL) – potencial (mV); volumen del vire de color.",
        "Volumen de equivalencia por la primera derivada.",
        "% de pureza en base húmeda y en base seca.",
      ],
      studyTopics: [
        "Autoprotólisis del ácido acético (Ks) y concepto de disolvente nivelador vs. diferenciador.",
        "Por qué una base débil requiere medio no acuoso; elección del disolvente y del valorante.",
        "Función del anhídrido acético y precauciones de manejo del ácido perclórico.",
      ],
      quizQuestions: [
        {
          question:
            "¿Por qué el acetato de sodio no se puede valorar potenciométricamente en agua, y cómo resuelve ese problema usar ácido acético glacial como disolvente?",
          solution: [
            "El acetato de sodio es la sal de un ácido débil (ácido acético, pKa ≈ 4,76): en agua se comporta como una **base débil**, porque el ion acetato solo le quita un protón al agua de forma parcial (CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻). El agua, al ser capaz de aceptar o donar protones con bastante facilidad, **nivela** la fuerza efectiva de cualquier base más débil que el OH⁻ — el salto de potencial frente a cualquier ácido se vuelve demasiado pequeño para ubicar un punto de equivalencia confiable.",
            "",
            "En **ácido acético glacial**, un disolvente mucho menos básico que el agua, ese problema desaparece: el disolvente ya no compite por aceptar el protón del valorante, así que el HClO₄ se comporta ahí como un ácido **extremadamente fuerte** (diferenciador) y el acetato de sodio sí produce un salto de potencial nítido y medible.",
          ].join("\n"),
        },
        {
          question:
            "Escribe la reacción neta entre el acetato de sodio y el HClO₄ en ácido acético glacial, pasando por el catión **acetonio** como intermediario.",
          solution: [
            "**Paso 1 — el HClO₄ protona al propio disolvente** (eso es lo que lo vuelve un ácido tan fuerte en este medio):",
            "",
            "```formula",
            "HClO₄ + CH₃COOH → CH₃COOH₂⁺ + ClO₄⁻",
            "```",
            "",
            "**Paso 2 — el catión acetonio (CH₃COOH₂⁺) es el verdadero ácido reactivo frente al acetato:**",
            "",
            "```formula",
            "CH₃COONa + CH₃COOH₂⁺ → 2 CH₃COOH + Na⁺",
            "```",
            "",
            "**Reacción neta de la valoración:**",
            "",
            "```formula",
            "CH₃COONa + HClO₄ → CH₃COOH + NaClO₄",
            "```",
          ].join("\n"),
        },
        {
          question:
            "**Cálculo.** Se pesan **18,9 mg** de acetato de sodio en vaso seco; la titulación con HClO₄ **0,1005 N** gasta **V_eq = 2,30 mL**; la Práctica 6 determinó un % de humedad = **0,40 %**. Calcula el % de pureza en base húmeda (BH) y en base seca (BS).",
          solution: [
            "#### Paso 1 — mg de acetato de sodio hallados",
            "mg = 2,30 mL × 0,1005 meq/mL × 82,04 mg/meq = **18,96 mg**",
            "",
            "#### Paso 2 — % de pureza en base húmeda",
            "% BH = 18,96 mg ÷ 18,9 mg × 100 = **100,3 %**",
            "",
            "#### Paso 3 — % de pureza en base seca",
            "% BS = 100,3 % ÷ (100 − 0,40) × 100 = **100,7 %**",
            "",
            "**Lectura.** El paso de BH a BS siempre **sube** un poco el resultado: se le está descontando al denominador el agua que no es analito.",
          ].join("\n"),
        },
      ],
    },

    {
      number: 5,
      title: "Potenciometría redox: valoración de oxalato de sodio con permanganato",
      moduleSlug: "metodos-electrometricos",
      fundamento:
        "El **oxalato de sodio** es el **patrón primario clásico del permanganato de potasio**. En medio ácido y en caliente, el ion oxalato se oxida a **CO₂** (cede 2 electrones) mientras el MnO₄⁻ se reduce a Mn²⁺. El **KMnO₄ es su propio indicador**: la primera gota en exceso tiñe la solución de rosa persistente. El potencial se sigue con un **electrodo de platino** (inerte, mide el potencial redox del par) y el punto de equivalencia se ubica por la primera derivada.",
      desarrollo: [
        "#### Tipo de valoración, analito y valorante",
        "",
        "**Tipo de valoración:** **redox** (óxido-reducción). **Modalidad: directa** — el KMnO₄ gotea directo sobre el oxalato de sodio y además actúa como su propio indicador (vira a rosa persistente).",
        "",
        "| | Analito (oxalato de sodio) | Valorante (KMnO₄) |",
        "| --- | --- | --- |",
        "| PM | **134,00 g/mol** | **158,00 g/mol** |",
        "| η (factor de equivalencia) | **2** (2 electrones cedidos por ion oxalato) | **5** (en medio ácido: Mn⁺⁷ + 5e⁻ → Mn⁺²) |",
        "| **Peso equivalente (PE = PM / η)** | **67,0 mg/meq** | **31,60 mg/meq** |",
        "",
        "**Estructura del analito.** El oxalato de sodio es una sal simple: el ion **oxalato** (⁻OOC–COO⁻, el dianión del ácido oxálico — el ácido dicarboxílico más simple) con dos contraiones **Na⁺**.",
        "",
        "**Estructura del valorante.** El permanganato de potasio es una sal inorgánica: el ion **permanganato (MnO₄⁻)**, con el manganeso en su estado de oxidación más alto (+7) rodeado por 4 oxígenos en geometría tetraédrica, junto con su contraión K⁺. Es ese Mn⁺⁷, fuertemente oxidante, el que se reduce a Mn²⁺ ganando 5 electrones — y es también lo que le da su color púrpura intenso, la base de su función como autoindicador.",
        "",
        "#### La reacción redox, paso a paso",
        "",
        "Semirreacción de **oxidación** (el oxalato cede electrones; el carbono pasa de +3 a +4):",
        "",
        "```formula",
        "C₂O₄²⁻ → 2CO₂ + 2e⁻",
        "```",
        "",
        "Semirreacción de **reducción** (el permanganato gana electrones; el Mn pasa de +7 a +2):",
        "",
        "```formula",
        "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O",
        "```",
        "",
        "Para que los electrones cedidos y ganados cuadren, se multiplica la primera semirreacción ×5 y la segunda ×2, y se suman — así se cancelan los 10 electrones de cada lado:",
        "",
        "```formula",
        "5C₂O₄²⁻ + 2MnO₄⁻ + 16H⁺ → 10CO₂ + 2Mn²⁺ + 8H₂O",
        "```",
        "",
        "#### Por qué hay que calentar (y por qué arranca lenta)",
        "",
        "Al principio la reacción es **lenta incluso en caliente**, porque enfrenta dos iones de carga negativa que se repelen (barrera de activación alta). Lo curioso es que **se acelera sola** a medida que avanza: el Mn²⁺ que se va formando actúa como **catalizador** de las siguientes adiciones (reacción autocatalítica). Por eso las primeras gotas de KMnO₄ tardan varios segundos en decolorarse y las últimas, antes del punto final, casi no tardan nada.",
        "",
        "#### Ejemplo numérico resuelto (% pureza)",
        "",
        "Se pesan **33,5 mg** de oxalato de sodio; el KMnO₄ ya estandarizado es **0,1002 N**; la titulación potenciométrica da **V_eq = 5,00 mL**.",
        "",
        "| Paso | Cálculo | Resultado |",
        "| --- | --- | --- |",
        "| mg de oxalato de sodio hallados | 5,00 mL × 0,1002 meq/mL × 67,0 mg/meq | 33,57 mg |",
        "| **% de pureza** | 33,57 mg ÷ 33,5 mg × 100 | **100,2 %** |",
      ].join("\n"),
      keyPoints: [
        "Analito → **peso equivalente = PM / 2 = 67,0 g/eq** (2 electrones transferidos por ion oxalato).",
        "Pesar ≈ **33,5 mg** de materia prima en un vaso cubierto con papel aluminio (protección de la luz).",
        "Medio: **20–30 mL de agua + 6 mL de H₂SO₄ 9 N**; calentar a **60–70 °C** con agitación (la reacción oxalato–permanganato es muy lenta en frío).",
        "Valorante: **KMnO₄ estandarizado** (N real de la Práctica 1). Bureta protegida de la luz.",
        "Esquema: añadir hasta 4 mL, luego **0,25 mL** hasta el punto final (incoloro → **rosa** persistente ~30 s).",
        "Cálculo de referencia: mg de oxalato de sodio = V(KMnO₄) · N(KMnO₄) · 67,0. Ejemplo: 5 mL × 0,1 N × 67,0 ≈ **33,5 mg**.",
        "Electrodo de **platino**: enjuagar y no tocar la superficie; retirar del medio en cuanto se termina la lectura.",
      ],
      procedure:
        "#### Preparación\n" +
        "1. Pesar ≈ 33,5 mg de materia prima en un vaso cubierto con papel aluminio; anotar el peso exacto.\n" +
        "2. Añadir 20–30 mL de agua destilada y **6 mL de H₂SO₄ 9 N**.\n" +
        "3. Calentar a **60–70 °C** sobre plancha con agitación magnética.\n\n" +
        "#### Titulación\n" +
        "1. Montar el electrodo de platino y la bureta con KMnO₄ estandarizado.\n" +
        "2. Añadir KMnO₄ hasta ~4 mL registrando volumen y potencial (mV); esperar a que cada adición se decolore antes de seguir.\n" +
        "3. Continuar con adiciones de **0,25 mL** hasta el punto final (rosa persistente) y 2–3 adiciones más para cerrar la curva.\n" +
        "4. Graficar mV vs. V y ΔmV/ΔV vs. V; leer el **volumen de equivalencia**.\n\n" +
        "#### Cálculo\n" +
        "mg de oxalato de sodio = V_eq · N(KMnO₄) · 67,0; **% de pureza** = mg hallados / mg pesados × 100.",
      equations: [
        {
          name: "Peso equivalente del oxalato de sodio",
          expression: "PEq_{OS} = #{PM|2} = 67,0 mg/meq",
          variables: "PM del oxalato de sodio = 134,0 g/mol · 2 = electrones transferidos por ion oxalato",
        },
        {
          name: "Miligramos de oxalato de sodio",
          expression: "m_{OS} (mg) = V_{KMnO₄} (mL) · N_{KMnO₄} · 67,0",
          variables: "V_{KMnO₄} = volumen de equivalencia · N_{KMnO₄} = normalidad real del permanganato",
        },
        {
          name: "Ecuación de Nernst (par redox)",
          expression: "E = E° − #{0,059|n} · log Q",
          variables:
            "E° = potencial estándar del par · n = electrones intercambiados · Q = cociente de reacción (productos / reactivos)",
          description: "El electrodo de platino mide E; el salto en el punto de equivalencia refleja el cambio brusco de Q.",
        },
      ],
      dataRequested: [
        "Peso de la materia prima problema.",
        "Tabla volumen (mL) – potencial (mV) de la titulación.",
        "Volumen de equivalencia por la primera derivada; volumen del viraje a rosa.",
        "% de pureza calculado.",
      ],
      studyTopics: [
        "Peso equivalente en reacciones redox; número de electrones y semirreacciones.",
        "Por qué la reacción oxalato–permanganato necesita calor y medio ácido fuerte.",
        "KMnO₄ como autoindicador; electrodos indicadores inertes (Pt) y de referencia.",
      ],
      quizQuestions: [
        {
          question:
            "Escribe las semirreacciones de oxidación y de reducción de esta valoración, y la ecuación global balanceada. Explica por qué hay que multiplicar la primera semirreacción ×5 y la segunda ×2.",
          solution: [
            "**Oxidación** (el oxalato cede electrones; el carbono pasa de +3 a +4):",
            "",
            "```formula",
            "C₂O₄²⁻ → 2CO₂ + 2e⁻",
            "```",
            "",
            "**Reducción** (el permanganato gana electrones; el Mn pasa de +7 a +2):",
            "",
            "```formula",
            "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O",
            "```",
            "",
            "**Por qué ×5 y ×2.** La primera semirreacción libera 2 electrones y la segunda necesita 5. Para que los electrones **cedidos** igualen a los **ganados** (nunca pueden sobrar ni faltar electrones en una reacción redox balanceada), hay que encontrar el mínimo común múltiplo de 2 y 5, que es 10: multiplicando la de oxidación ×5 y la de reducción ×2, ambas quedan en 10 electrones y se pueden sumar cancelándolos:",
            "",
            "```formula",
            "5C₂O₄²⁻ + 2MnO₄⁻ + 16H⁺ → 10CO₂ + 2Mn²⁺ + 8H₂O",
            "```",
          ].join("\n"),
        },
        {
          question:
            "¿Por qué esta valoración requiere calentar la solución, y por qué las primeras gotas de KMnO₄ tardan más en decolorarse que las últimas (antes del punto final)?",
          solution: [
            "**Por qué se calienta.** La reacción entre el oxalato y el permanganato es **lenta** incluso en caliente, porque enfrenta a dos especies de carga negativa que se repelen — eso le da una barrera de activación alta. Calentar (60–70 °C) aporta la energía necesaria para que la reacción proceda a una velocidad práctica para el laboratorio.",
            "",
            "**Por qué se acelera sola a medida que avanza (autocatálisis).** El **Mn²⁺** que se va formando actúa como **catalizador** de las siguientes adiciones de KMnO₄. Por eso las primeras gotas tardan varios segundos en decolorarse (todavía no hay Mn²⁺ catalizador acumulado) y las últimas, ya cerca del punto final, casi no tardan nada (ya hay bastante Mn²⁺ catalizando la reacción).",
          ].join("\n"),
        },
        {
          question:
            "**Cálculo.** Se pesan **31,8 mg** de oxalato de sodio; el KMnO₄ ya estandarizado es **0,0995 N**; la titulación potenciométrica da **V_eq = 4,80 mL**. Calcula el % de pureza.",
          solution: [
            "#### Paso 1 — mg de oxalato de sodio hallados",
            "mg = 4,80 mL × 0,0995 meq/mL × 67,0 mg/meq = **32,00 mg**",
            "",
            "#### Paso 2 — % de pureza",
            "% pureza = 32,00 mg ÷ 31,8 mg × 100 = **100,6 %**",
          ].join("\n"),
        },
      ],
    },

    {
      number: 6,
      title: "Determinación de %Humedad por pérdida por secado (USP ⟨731⟩): sulfato de sodio anhidro",
      moduleSlug: "metodos-electrometricos",
      fundamento:
        "La **pérdida por secado** mide toda la materia volátil que sale del sólido al calentarlo: agua **no esencial** (adsorbida) y parte del agua **esencial** (de cristalización), más disolventes residuales. Se trabaja con **1–2 g** de muestra y se seca **hasta peso constante**, definido como una diferencia entre dos pesadas consecutivas **≤ 0,50 mg por g de muestra**. El % de humedad permite convertir cualquier resultado de pureza de **base húmeda a base seca**.",
      keyPoints: [
        "Secar primero la **cápsula destapada + su tapa** a la temperatura de ensayo (≈ 30 min), enfriar en **desecador** y pesar → **PCV** (peso de cápsula vacía).",
        "Colocar 1–2 g de muestra, pesar → **PCMH** (cápsula + muestra húmeda).",
        "Secar **destapada** a **100 °C durante 2 h**, enfriar en desecador y pesar → **PCMS₁**.",
        "Repetir el secado en tramos de 1 h y volver a pesar (**PCMS₂**, PCMS₃…) hasta **peso constante**.",
        "Todas las pesadas tras enfriar en desecador: el sólido caliente da lecturas bajas y reabsorbe humedad al aire.",
        "El sulfato de sodio anhidro es **higroscópico**: minimizar el tiempo de exposición al aire al pesar.",
      ],
      procedure:
        "#### Pérdida por secado\n" +
        "1. Secar la cápsula destapada y su tapa (misma T del ensayo) ≈ 30 min; enfriar en desecador; pesar → **PCV**.\n" +
        "2. Colocar 1–2 g de muestra en la cápsula; pesar → **PCMH**.\n" +
        "3. Llevar la cápsula **destapada** a la estufa a **100 °C por 2 h**.\n" +
        "4. Enfriar en desecador hasta temperatura ambiente; pesar → **PCMS₁**.\n" +
        "5. Secar 1 h más; enfriar; pesar → **PCMS₂**. Repetir hasta que la diferencia entre dos pesadas consecutivas sea ≤ 0,50 mg/g de muestra (**peso constante**).\n" +
        "6. Calcular el % de humedad con la última pesada (PCMS).\n\n" +
        "#### Uso del resultado\n" +
        "Con el % de humedad, convertir la pureza obtenida en las valoraciones (Prácticas 3–5) de base húmeda a base seca.",
      equations: [
        {
          name: "Porcentaje de humedad (pérdida por secado)",
          expression: "%Humedad = #{(PCMH − PCV) − (PCMS − PCV)|PCMH − PCV} × 100",
          variables:
            "PCV = peso de la cápsula vacía · PCMH = peso de cápsula + muestra húmeda · PCMS = peso de cápsula + muestra seca a peso constante",
          description: "El numerador es la masa de agua perdida; el denominador, la masa de muestra húmeda.",
        },
        {
          name: "Masa de muestra en base seca",
          expression: "BS (mg) = (PCMH − PCV) − m_{agua}",
          variables: "m_{agua} = (PCMH − PCV) − (PCMS − PCV) = masa perdida en el secado",
        },
        {
          name: "Contenido en base seca",
          expression: "%contenido_{BS} = #{mg de analito en la muestra|BS (mg)} × 100",
          variables: "mg de analito = los hallados en la valoración correspondiente",
        },
      ],
      dataRequested: [
        "PCV, PCMH y cada PCMS (PCMS₁, PCMS₂, …) hasta peso constante.",
        "Masa de agua perdida y % de humedad calculado.",
        "% de contenido de la materia prima asociada en base húmeda y en base seca.",
      ],
      studyTopics: [
        "Agua esencial (de cristalización, de constitución) vs. agua no esencial (adsorbida, retenida).",
        "USP ⟨731⟩ pérdida por secado: condiciones, criterio de peso constante y alternativas (Karl Fischer, termobalanza).",
        "Diferencia entre resultado en base húmeda y en base seca; cuándo exige cada uno la farmacopea.",
      ],
    },
  ],
};
