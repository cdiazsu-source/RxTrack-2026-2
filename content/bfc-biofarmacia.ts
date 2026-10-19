import type { ExerciseContent } from "./_schema";
import { fx } from "./bfc-helpers";

/**
 * BFC — Bloque Biofarmacia (Módulos 1–4, prof. Helber Barbosa): capítulo de
 * lectura + ejercicios resueltos por módulo. Este archivo NO es una asignatura:
 * lo importa `bfc.ts`.
 *
 * Fuentes: programa oficial del curso, Shargel & Yu (2016), Aguilar (2014),
 * Dressman & Krämer (2005), Barbosa & Zambrano (2024), ICH M9 (2020), guía EMA de
 * bioequivalencia (2010), Resolución 1124 de 2016, y los artículos citados al final
 * de cada capítulo (DOI verificados en Crossref). Los NÚMEROS de los ejercicios son
 * didácticos: están calculados y revisados, pero no son datos de un producto real
 * salvo que se diga lo contrario. El programa no trae calendario semana a semana
 * del bloque: este material sigue el temario, no inventa lo que se vio en clase.
 */
export const bfcBiofarmacia: Record<string, { chapter: string; exercises: ExerciseContent[] }> = {
  // ─────────────────────────────────────────────────────────────────────────
  "introduccion-biofarmacia": {
    chapter: `#### Para qué sirve este curso (y por qué importa antes de ser químico farmacéutico)

Una tableta de 500 mg no entrega «500 mg al paciente». Entrega 500 mg al estómago, y de ahí en adelante empieza una carrera de obstáculos: la tableta tiene que **romperse**, el fármaco tiene que **disolverse**, atravesar la pared del intestino, sobrevivir al hígado, repartirse por el cuerpo y llegar en **concentración suficiente** al sitio donde actúa. Biofarmacia y Farmacocinética estudian exactamente esa carrera: la primera, **hasta que el fármaco entra a la sangre**; la segunda, **desde que está en la sangre** y cómo cambia su concentración con el tiempo.

> Analogía: piensa en un servicio de entregas a domicilio. **Biofarmacia** estudia qué pasó con el paquete desde que sale de la bodega hasta que entra a la ciudad (empaque, ruta, tráfico, peajes): cómo el empaque y la vía de transporte condicionan **cuánto** llega y **qué tan rápido**. **Farmacocinética** estudia qué pasa con los paquetes **dentro** de la ciudad: cómo se reparten por los barrios (distribución), cuáles se transforman en la bodega local (metabolismo) y a qué velocidad salen de la ciudad (eliminación). **Farmacodinamia** (la materia de Farmacología General) es lo que ocurre cuando el paquete por fin llega a la casa correcta: el efecto.

#### Las tres disciplinas, con definiciones de trabajo

* **Biofarmacia:** estudia la relación entre las **propiedades fisicoquímicas del fármaco**, la **forma farmacéutica** (con sus excipientes y su proceso de fabricación) y la **vía de administración**, y su efecto sobre la **velocidad y la magnitud** con que el fármaco llega a la circulación sistémica. Su pregunta central: *¿el medicamento entrega el fármaco como debería?*
* **Farmacocinética (PK):** estudia y **cuantifica en función del tiempo** la absorción, distribución, metabolismo y eliminación. Su producto son **modelos matemáticos** (ecuaciones) que describen la curva de concentración contra tiempo. Su pregunta central: *¿cuánto fármaco hay en el cuerpo en cada momento, y cuánto tengo que dar y cada cuánto?*
* **Farmacodinamia (PD):** lo que el fármaco le hace al organismo (efecto en función de la concentración). La PK dice *cuánto hay*; la PD dice *qué hace eso que hay*. Juntas explican la respuesta terapéutica.

El nombre «farmacocinética» (del griego *kinesis*, movimiento) se atribuye a F. H. Dost (1953); el primer planteamiento matemático con compartimentos es de Teorell (1937). Lo que hoy llamamos biofarmacia nace en los años 60 al descubrirse algo incómodo: **dos productos con el mismo principio activo y la misma dosis podían dar efectos distintos**. El caso clásico es el de la digoxina: Lindenbaum y colaboradores (1971) midieron niveles séricos tras dar digoxina de distintos fabricantes y encontraron **diferencias grandes de biodisponibilidad** entre preparaciones nominalmente iguales. Desde entonces, «mismo contenido» dejó de significar «misma exposición del paciente».

#### LADME: el recorrido del fármaco, etapa por etapa

LADME es la sigla de las cinco etapas. Memorízala como un viaje en orden:

1. **L — Liberación.** El fármaco sale de la forma farmacéutica: la tableta se **desintegra**, los gránulos se **disgregan** y el sólido se **disuelve** en los líquidos del tubo digestivo. Es la etapa propia de la **Biofarmacia**. Si el fármaco no se disuelve, **no se puede absorber**.
2. **A — Absorción.** El fármaco disuelto atraviesa las membranas (en la vía oral, la pared del intestino) y llega a la sangre. Se mide con la **velocidad** (qué tan rápido) y la **magnitud** (cuánto) de la absorción.
3. **D — Distribución.** Desde la sangre, el fármaco se reparte por los tejidos según el flujo sanguíneo, su afinidad por las proteínas del plasma, su liposolubilidad y las barreras (p. ej. la barrera hematoencefálica).
4. **M — Metabolismo.** El organismo transforma el fármaco, sobre todo en el **hígado** (enzimas CYP450 y conjugación), casi siempre hacia moléculas más polares y fáciles de excretar.
5. **E — Excreción (eliminación).** El fármaco y sus metabolitos salen del cuerpo: sobre todo por **riñón** (orina) y **bilis** (heces).

Observa que **metabolismo + excreción = eliminación**, y que **absorción + distribución + eliminación** son los tres procesos que cambian la concentración en sangre con el tiempo. En muchos libros se habla de ADME y se deja la liberación dentro de la absorción; el programa de este curso usa **LADME** precisamente para que la liberación (la etapa donde interviene el químico farmacéutico al diseñar el medicamento) quede visible.

> Analogía de la tina: imagina una tina con el desagüe abierto y una llave que gotea. El agua de la tina es el **fármaco en el cuerpo**; la llave es la **absorción** (entra); el desagüe es la **eliminación** (sale); y el tamaño de la tina es el **volumen de distribución**. Si la llave gotea más rápido que lo que el desagüe saca, el nivel sube; si deja de gotear, el nivel baja. Toda la farmacocinética de los módulos 5 a 9 es esta tina con ecuaciones.

#### Acción local vs. sistémica

No todo fármaco tiene que pasar a la sangre para actuar:

* **Acción local:** el efecto ocurre **donde se aplica** (una crema antimicótica en la piel, un colirio, un inhalador de broncodilatador, un antiácido). Aquí interesa que el fármaco llegue y **permanezca** en el sitio; la absorción sistémica suele ser un efecto indeseado (más riesgo de efectos adversos).
* **Acción sistémica:** el fármaco debe **absorberse, entrar a la circulación** y distribuirse hasta el sitio de acción. Es el caso de casi todas las tabletas y cápsulas orales y de las inyecciones.

Esta distinción define **qué se mide** para evaluar un producto: en uno sistémico se mide **concentración en plasma** (Módulos 5–10); en uno local, la concentración en sangre puede ser irrelevante y se necesitan otras pruebas.

#### La ventana terapéutica: el «rango de concentración útil»

Cada fármaco tiene una **concentración mínima efectiva (CME)**, por debajo de la cual no hay efecto, y una **concentración mínima tóxica (CMT)**, por encima de la cual aparecen efectos adversos importantes. El intervalo entre ambas es la **ventana terapéutica**. Toda la farmacocinética clínica es el arte de **mantener la concentración dentro de esa ventana**: ni tan baja que no sirva, ni tan alta que dañe. Los fármacos con ventana estrecha (digoxina, fenitoína, litio, tacrolimus, warfarina) exigen mucho más control — y por eso la bioequivalencia los trata con límites más estrictos (Módulo 9).

#### ¿Por qué se mide en plasma si el efecto ocurre en un tejido?

Porque medir el fármaco en el sitio de acción casi nunca es posible en una persona. Se acepta un supuesto práctico: **la concentración en plasma es proporcional a la concentración en el sitio de acción** (el fármaco está en equilibrio rápido entre sangre y tejido). Si el supuesto vale, la curva de plasma contra tiempo es un **espejo fiel** de lo que pasa en el órgano blanco. Es un supuesto, no una verdad universal: para fármacos con efecto retardado o con acumulación en tejido, hay que modelar la relación PK–PD explícitamente.

#### Las tres familias de factores que modifican la respuesta

El programa agrupa lo que influye en la respuesta del paciente en tres grandes bloques; los módulos 3 y 4 los desarrollan:

* **Factores de entrada:** el **fármaco** (solubilidad, pKa, tamaño, estabilidad), la **vía** y el **método de administración**, la **dosis** y el **régimen** (Módulo 3).
* **Factores de la forma farmacéutica (SENF):** liberación, excipientes, proceso de fabricación, interacciones con alimentos (Módulo 4).
* **Factores del paciente:** edad, peso, función hepática y renal, genética, enfermedad, otros medicamentos, alimentos.

#### El papel del químico farmacéutico

El objetivo del curso es que puedas: (1) **interpretar** cómo el sistema de entrega del fármaco modifica la respuesta terapéutica; (2) **participar en el diseño** de un estudio de biodisponibilidad y bioequivalencia y leer sus resultados; (3) **seleccionar y suministrar medicamentos** de forma racional en el ámbito hospitalario. Fíjate en que los tres son decisiones con consecuencias para un paciente: elegir un genérico, ajustar una dosis, preparar una fórmula magistral o una preparación extemporánea sin saber **cómo se comporta en el cuerpo** es operar a ciegas.

#### Un primer hábito: las unidades de concentración

Casi todos los errores de principiante en farmacocinética son de unidades. Memoriza estas equivalencias (todas se obtienen multiplicando por un **factor de conversión que vale 1**):

${fx(
  "1 mg/L = 1 µg/mL",
  "1 µg/L = 1 ng/mL",
  "1 mg/L = 1000 µg/L = 1000 ng/mL",
  "1 mg/dL = 10 mg/L",
  "µmol/L = (mg/L ÷ masa molar en g/mol) × 1000",
)}

La última merece una explicación: **mg/L ÷ g/mol = mmol/L**, porque los miligramos se dividen entre gramos por mol (da milimoles). Para pasar de mmol/L a µmol/L se multiplica por 1000. Revisa siempre que las unidades **se cancelen** hasta dejar la que pides.

#### En resumen

* **Biofarmacia** (hasta la entrada a sangre) → **Farmacocinética** (tiempo en el cuerpo) → **Farmacodinamia** (efecto).
* **LADME**: Liberación, Absorción, Distribución, Metabolismo, Excreción. Eliminación = metabolismo + excreción.
* **Local** (importa el sitio de aplicación) vs. **sistémica** (importa la concentración en sangre).
* **Ventana terapéutica** = intervalo entre la concentración mínima efectiva y la mínima tóxica.
* Se mide en **plasma** bajo el supuesto de equilibrio rápido con el sitio de acción.
* Equivalencias que no pueden fallarte: **mg/L = µg/mL**, **µg/L = ng/mL**.

#### Para profundizar

* Shargel L, Yu ABC. *Applied Biopharmaceutics and Pharmacokinetics*, 7.ª ed., 2016 (cap. 1).
* Lindenbaum J, Mellow MH, Blackstone MO, Butler VP. Variation in biologic availability of digoxin from four preparations. *N Engl J Med* 1971;285:1344-1347. DOI 10.1056/NEJM197112092852403.
* Benet LZ, Zia-Amirhosseini P. Basic principles of pharmacokinetics. *Toxicol Pathol* 1995;23:115-123. DOI 10.1177/019262339502300203.`,
    exercises: [
      {
        question: [
          "**Conversión de unidades.** Tras una dosis, el laboratorio reporta una concentración plasmática de **0,35 µg/mL**. Exprésala (a) en **mg/L**, (b) en **ng/mL** y (c) en **µmol/L**, sabiendo que la masa molar del fármaco es **151,2 g/mol** (paracetamol).",
        ].join("\n"),
        solution: [
          "**Paso 1 — mg/L.**",
          "",
          "*Interpretación:* queremos cambiar la unidad sin cambiar la cantidad real; para eso multiplicamos por factores que valen 1.",
          "",
          "Se usa la equivalencia **1 µg/mL = 1 mg/L** (porque 1 mL = 10⁻³ L y 1 µg = 10⁻³ mg: ambos factores son 10⁻³ y se compensan).",
          "",
          "0,35 µg/mL × (10⁻³ mg / 1 µg) × (1 mL / 10⁻³ L) = 0,35 mg/L.",
          "",
          "**Conclusión:** la concentración es **0,35 mg/L**; el número no cambia porque µg/mL y mg/L son la misma unidad escrita distinto.",
          "",
          "**Paso 2 — ng/mL.**",
          "",
          "*Interpretación:* 1 µg = 1000 ng; el mL no cambia.",
          "",
          "0,35 µg/mL × (1000 ng / 1 µg) = **350 ng/mL**.",
          "",
          "**Conclusión:** 0,35 µg/mL = 350 ng/mL. Así suelen reportarse los niveles bajos en estudios de bioequivalencia.",
          "",
          "**Paso 3 — µmol/L.**",
          "",
          "*Interpretación:* para pasar de masa a moles hay que dividir entre la masa molar (los 151,2 g contienen 1 mol).",
          "",
          "0,35 mg/L × (1 g / 1000 mg) × (1 mol / 151,2 g) × (10⁶ µmol / 1 mol)",
          "",
          "= 0,35 × 10⁻³ ÷ 151,2 × 10⁶ µmol/L = **2,31 µmol/L**.",
          "",
          "(Unidades: mg se cancela con mg; g se cancela con g; mol se cancela con mol; queda µmol/L.)",
          "",
          "**Conclusión:** 0,35 mg/L equivalen a 2,31 µmol/L. Los µmol/L son útiles para comparar fármacos de distinto tamaño molecular, porque cuentan moléculas y no masa.",
        ].join("\n"),
      },
      {
        question: [
          "**Clasificación en LADME.** Un paciente toma una tableta de liberación inmediata de ibuprofeno con un vaso de agua. Ordena y clasifica estos eventos en la etapa LADME que les corresponde: (1) la tableta se desintegra en fragmentos en el estómago; (2) el ibuprofeno disuelto atraviesa la pared del intestino delgado; (3) parte del fármaco se une a la albúmina del plasma; (4) el hígado lo convierte en metabolitos hidroxilados y glucuronidados; (5) los metabolitos aparecen en la orina; (6) el sólido de las partículas se disuelve en el líquido intestinal.",
        ].join("\n"),
        solution: [
          "**Interpretación:** LADME es una secuencia; ubica cada evento según *dónde está el fármaco* y *qué le ocurre*.",
          "",
          "| Evento | Etapa | Por qué |",
          "|---|---|---|",
          "| (1) la tableta se desintegra | **L — Liberación** | todavía no hay fármaco disuelto; se rompe la forma farmacéutica |",
          "| (6) el sólido se disuelve | **L — Liberación** | el fármaco pasa a estar en solución, listo para absorberse |",
          "| (2) atraviesa la pared intestinal | **A — Absorción** | pasa del lumen a la circulación |",
          "| (3) se une a albúmina | **D — Distribución** | ocurre dentro de la sangre; condiciona cuánto fármaco libre llega a los tejidos |",
          "| (4) el hígado lo transforma | **M — Metabolismo** | biotransformación enzimática |",
          "| (5) metabolitos en la orina | **E — Excreción** | salida del organismo |",
          "",
          "**Orden temporal correcto:** (1) → (6) → (2) → (3) → (4) → (5). Nota que la disolución (6) ocurre **antes** de la absorción (2), y que la desintegración (1) precede a la disolución.",
          "",
          "**Conclusión:** de seis eventos, dos son **liberación** (1 y 6), uno es absorción, uno es distribución, uno metabolismo y uno excreción. La liberación es la etapa que el diseño del medicamento controla directamente.",
        ].join("\n"),
      },
      {
        question: [
          "**Opción múltiple.** ¿Cuál de las siguientes preguntas corresponde al campo de la **Biofarmacia** (y no al de la Farmacocinética pura)?",
          "",
          "A) ¿Cuál es la vida media de eliminación del fármaco en un paciente con insuficiencia renal?",
          "B) ¿Cómo cambia la velocidad de disolución y la cantidad absorbida si cambio el tamaño de partícula del principio activo?",
          "C) ¿Qué dosis de mantenimiento mantiene una concentración de 10 mg/L en estado estable?",
          "D) ¿Cuál es el volumen de distribución aparente del fármaco?",
        ].join("\n"),
        solution: [
          "**Respuesta: B.**",
          "",
          "**Interpretación:** la Biofarmacia estudia cómo las propiedades del fármaco y de la **forma farmacéutica** modifican la **velocidad y cantidad que llega a circulación**. El tamaño de partícula afecta la disolución (etapa L) y, a través de ella, la absorción.",
          "",
          "* A y D preguntan por parámetros del **cuerpo** (t1/2, Vd) una vez que el fármaco ya está en sangre: son **farmacocinética**.",
          "* C es un cálculo de **régimen de dosificación**, también farmacocinética (Módulo 7).",
          "",
          "**Conclusión:** la pista es si la pregunta trata de lo que **entrega el medicamento** (biofarmacia) o de lo que **hace el cuerpo** con el fármaco ya absorbido (farmacocinética).",
        ].join("\n"),
      },
      {
        question: [
          "**Ventana terapéutica.** Un antiarrítmico tiene concentración mínima efectiva de **1,0 µg/mL** y concentración mínima tóxica de **2,5 µg/mL**. Un paciente tiene una concentración plasmática de **3,1 µg/mL**. (a) ¿Está dentro de la ventana? (b) ¿Cuántas veces supera la CMT? (c) ¿Qué ancho tiene la ventana, y por qué un fármaco con ventana así de estrecha exige más cuidado?",
        ].join("\n"),
        solution: [
          "**(a) ¿Dentro de la ventana?**",
          "",
          "*Interpretación:* comparar el valor medido con los dos límites.",
          "",
          "1,0 µg/mL (CME) < 3,1 µg/mL, pero 3,1 µg/mL > 2,5 µg/mL (CMT). Está **por encima** del límite superior.",
          "",
          "**Conclusión:** el paciente está en la **zona tóxica**: debe reducirse la dosis o espaciar el intervalo (Módulo 7).",
          "",
          "**(b) Cuántas veces supera la CMT.**",
          "",
          "3,1 µg/mL ÷ 2,5 µg/mL = **1,24 veces** (la unidad µg/mL se cancela y el cociente no tiene unidades).",
          "",
          "**Conclusión:** supera la CMT en un 24 %.",
          "",
          "**(c) Ancho de la ventana.**",
          "",
          "Cociente CMT/CME = 2,5 ÷ 1,0 = **2,5**. El límite tóxico es solo 2,5 veces el efectivo.",
          "",
          "**Conclusión:** con una ventana tan estrecha, una variación de apenas ±25–30 % en la exposición —lo que puede pasar al cambiar de marca, de lote o por una interacción— puede dejar al paciente sin efecto o intoxicado. Por eso estos fármacos se monitorizan en sangre y se les exigen límites de bioequivalencia más estrictos (90,00–111,11 % en lugar de 80,00–125,00 %).",
        ].join("\n"),
      },
      {
        question: [
          "**Local vs. sistémica.** Para cada producto indica si se busca principalmente **acción local** o **sistémica**, y qué consecuencia tiene para el uso de la concentración plasmática como medida de desempeño: (a) tableta de losartán para hipertensión; (b) crema de clotrimazol para una tiña en la piel; (c) inhalador de salbutamol; (d) inyección intravenosa de un antibiótico.",
        ].join("\n"),
        solution: [
          "**Interpretación:** pregúntate *¿dónde está el órgano blanco y qué ruta usa el fármaco para llegar?*",
          "",
          "| Producto | Acción buscada | Consecuencia para la concentración plasmática |",
          "|---|---|---|",
          "| (a) losartán oral | **Sistémica** (actúa sobre receptores vasculares y renales) | El plasma es una medida válida del desempeño: se usa para biodisponibilidad/bioequivalencia |",
          "| (b) clotrimazol tópico | **Local** (la tiña está en la epidermis) | El plasma casi no informa: lo útil es la concentración en la piel; la absorción sistémica es indeseada |",
          "| (c) salbutamol inhalado | **Local** en el pulmón (broncodilatación) | La parte que llega a plasma viene sobre todo de lo deglutido o absorbido; para evaluar el producto se necesitan además pruebas de depósito pulmonar |",
          "| (d) antibiótico IV | **Sistémica** (la infección puede estar en cualquier tejido) | El plasma es la medida natural; biodisponibilidad = 100 % por definición |",
          "",
          "**Conclusión:** la concentración plasmática es el 'espejo' del efecto solo cuando el fármaco actúa de forma **sistémica**. En acción local se necesitan otros métodos (concentración en el sitio, estudios clínicos o pruebas in vitro de liberación), y por eso el Módulo 9 menciona que algunas formas no orales pueden eximirse del estudio in vivo solo bajo condiciones específicas.",
        ].join("\n"),
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "parametros-bioequivalencia": {
    chapter: `#### La curva que lo resume todo

Cuando se administra un fármaco por una vía que exige absorción (p. ej. oral) y se toman muestras de sangre a intervalos, al graficar **concentración plasmática (C)** contra **tiempo (t)** aparece siempre la misma forma: la concentración **sube**, llega a un **máximo** y luego **baja**. Casi todos los parámetros biofarmacéuticos son simplemente formas de medir esa curva.

${fx(
  "C",
  "↑",
  "│            ● Cmax",
  "│         ●     ●",
  "│       ●          ●",
  "│     ●               ●",
  "│   ●                    ●",
  "│ ●                           ●   ●",
  "└────────────────────────────────────→ t",
  "   lag   tmax",
)}

Las partes de la curva y lo que cada una te dice:

* **Tiempo de latencia (tlag):** el retraso antes de que aparezca fármaco en sangre (la tableta aún no se disuelve, o hay vaciamiento gástrico lento, o una cubierta entérica).
* **Fase de absorción:** la concentración sube porque **entra más de lo que sale**.
* **Cmax (concentración máxima):** el pico. Es el punto donde la velocidad de entrada **iguala** a la de salida. Se mide directamente de los datos.
* **tmax:** el tiempo al que ocurre el pico. También se lee directo de los datos.
* **Fase de eliminación:** la concentración baja porque **sale más de lo que entra**; en escala logarítmica suele ser una recta cuya pendiente da la constante de eliminación K.
* **ABC o AUC (área bajo la curva):** el área entre la curva y el eje del tiempo; mide la **exposición total** del organismo.

#### Velocidad y magnitud: dos preguntas distintas

La definición clásica de biodisponibilidad tiene **dos** palabras clave:

* **Magnitud (extensión)** = *cuánto* fármaco llega a la circulación sistémica → se mide con el **ABC** (y con la fracción biodisponible F).
* **Velocidad** = *qué tan rápido* llega → se mide con **Cmax** y **tmax**.

> Analogía: dos buses llevan el mismo número de pasajeros (misma magnitud) al mismo destino, pero uno sale cada 5 minutos y otro espera a llenarse. El total que llega al final del día es igual (mismo ABC), pero el momento en que más gente llega a la vez (Cmax) y la hora de la primera llegada (tmax) son distintas. Para un analgésico que debe actuar rápido, o un antiepiléptico donde un pico alto da efectos adversos, **la velocidad importa tanto como la cantidad**.

Por eso la bioequivalencia compara **ABC y Cmax** (Módulo 9): cubre magnitud y velocidad a la vez.

#### Cómo se calcula el ABC (regla de los trapecios)

Con datos discretos, el área entre dos tiempos consecutivos se aproxima por un **trapecio**:

${fx(
  "ABC_{t₁→t₂} = #{C₁ + C₂|2} · (t₂ − t₁)",
  "ABC_{0→t} = Σ  #{C_{i} + C_{i+1}|2} · (t_{i+1} − t_{i})",
)}

*Por qué funciona:* entre dos muestras no sabemos cómo se comportó la curva; la aproximación más simple es una **recta** entre los dos puntos. El área bajo una recta entre dos alturas C₁ y C₂ y un ancho Δt es el **promedio de las alturas por el ancho** — la fórmula del trapecio. Sumas todos los trapecios y obtienes **ABC₀→t** (hasta el último dato medido).

Pero el fármaco no desaparece en el último punto. Se **extrapola** el área que queda:

${fx(
  "ABC_{t→∞} = #{C_{última}|K}",
  "ABC_{0→∞} = ABC_{0→t} + #{C_{última}|K}",
)}

*Por qué C_última/K:* la cola es una exponencial C = C_última·e^(−K·t'); su integral desde 0 hasta infinito es C_última/K. Se exige que la parte extrapolada sea **pequeña** (la guía EMA pide que ABC₀→t cubra **al menos el 80 %** de ABC₀→∞).

Las **unidades** del ABC salen de multiplicar altura por ancho: (mg/L) × h = **mg·h/L**.

#### Biodisponibilidad absoluta y relativa

* **Absoluta (F):** compara la vía en estudio con la **intravenosa**, que por definición tiene 100 % de biodisponibilidad (todo el fármaco entra a sangre):

${fx(
  "F = #{ABC_{oral} / Dosis_{oral}|ABC_{IV} / Dosis_{IV}}",
)}

  *Por qué se divide cada ABC por su dosis:* el ABC es proporcional a la dosis que llegó a sangre; dividiendo por la dosis se obtiene el ABC «por mg administrado», y así se pueden comparar dosis distintas. F es un número entre 0 y 1 (o 0–100 %).

* **Relativa (F_rel):** compara dos productos por la **misma vía** (uno de prueba contra uno de referencia). Es la base de la bioequivalencia:

${fx(
  "F_{rel} = #{ABC_{prueba} / Dosis_{prueba}|ABC_{ref} / Dosis_{ref}}",
)}

#### Parámetros farmacodinámicos que acompañan a los farmacocinéticos

Cuando se superpone la ventana terapéutica a la curva de concentración aparecen parámetros de la **respuesta**:

* **Inicio de acción:** tiempo que tarda la curva en superar la concentración mínima efectiva.
* **Duración de la acción:** tiempo que la concentración permanece por encima de la CME.
* **Intensidad:** relacionada con la concentración máxima alcanzada dentro de la ventana.
* **Índice terapéutico:** cociente entre la dosis (o concentración) tóxica y la efectiva; mide el «margen de seguridad». Cuanto más pequeño, más estrecha la ventana.

#### Equivalencias que define la regulación colombiana (Resolución 1124 de 2016)

* **Equivalentes farmacéuticos:** mismo principio activo, **misma cantidad molar**, misma forma farmacéutica y misma vía. Pueden diferir en excipientes. **No garantizan** por sí solos equivalencia terapéutica.
* **Alternativas farmacéuticas:** mismo principio activo pero **distinta forma, concentración o especie química** (otra sal, otro éster).
* **Bioequivalentes:** equivalentes o alternativas farmacéuticas cuyas biodisponibilidades (**Cmax, tmax y ABC**, a la misma dosis molar) son tan similares que se espera el **mismo efecto**.
* **Producto de referencia:** normalmente el innovador, con eficacia, seguridad y calidad establecidas.

> Analogía: dos recetas de arepas con los mismos ingredientes activos (maíz, agua, sal) pueden quedar distintas según el tipo de molienda, el tiempo de reposo o la plancha. Son «equivalentes farmacéuticos» en la lista de ingredientes, pero solo la prueba de comerlas (el estudio in vivo) demuestra si saben igual (bioequivalencia).

#### En resumen

* La curva C–t da **Cmax, tmax y ABC**; **velocidad** = Cmax y tmax; **magnitud** = ABC.
* **ABC** por trapecios + cola **C_última/K**; unidades mg·h/L.
* **F absoluta** compara con IV; **F relativa** compara dos productos por la misma vía; siempre se **normaliza por la dosis**.
* **Equivalente farmacéutico ≠ bioequivalente**: lo segundo exige estudio (o una bioexención justificada).

#### Para profundizar

* Shargel L, Yu ABC. *Applied Biopharmaceutics and Pharmacokinetics*, 7.ª ed., 2016 (caps. de biodisponibilidad y bioequivalencia).
* Ministerio de Salud y Protección Social (Colombia). Resolución 1124 de 2016, Anexo Técnico 1 (definiciones y diseño).
* EMA. Guideline on the investigation of bioequivalence (CPMP/EWP/QWP/1401/98 Rev. 1), 2010.`,
    exercises: [
      {
        question: [
          "**Cálculo del ABC por trapecios, con extrapolación.** Tras una dosis oral se midieron estas concentraciones plasmáticas:",
          "",
          "| t (h) | 0 | 0,5 | 1 | 2 | 4 | 6 | 8 | 12 |",
          "|---|---|---|---|---|---|---|---|---|",
          "| C (mg/L) | 0 | 3,9 | 6,1 | 7,6 | 6,0 | 3,8 | 2,4 | 0,95 |",
          "",
          "Calcula (a) Cmax y tmax, (b) ABC₀→12 por trapecios, (c) la constante de eliminación K con los dos últimos puntos, (d) ABC₀→∞ y (e) si el ABC₀→12 cubre al menos el 80 % del ABC₀→∞.",
        ].join("\n"),
        solution: [
          "**(a) Cmax y tmax.**",
          "",
          "*Interpretación:* se leen directamente de la tabla: el valor más alto de C y el tiempo al que ocurre.",
          "",
          "El mayor C es **7,6 mg/L**, a las **2 h**.",
          "",
          "**Conclusión:** Cmax = 7,6 mg/L; tmax = 2 h.",
          "",
          "**(b) ABC₀→12 por trapecios.**",
          "",
          "*Interpretación:* sumamos el área de cada tramo entre muestras, con ABC = (C₁ + C₂)/2 × Δt. Unidades: (mg/L) × h = mg·h/L.",
          "",
          "| Tramo | (C₁ + C₂)/2 | Δt (h) | Área (mg·h/L) |",
          "|---|---|---|---|",
          "| 0 → 0,5 | (0 + 3,9)/2 = 1,95 | 0,5 | 0,975 |",
          "| 0,5 → 1 | (3,9 + 6,1)/2 = 5,00 | 0,5 | 2,500 |",
          "| 1 → 2 | (6,1 + 7,6)/2 = 6,85 | 1 | 6,850 |",
          "| 2 → 4 | (7,6 + 6,0)/2 = 6,80 | 2 | 13,600 |",
          "| 4 → 6 | (6,0 + 3,8)/2 = 4,90 | 2 | 9,800 |",
          "| 6 → 8 | (3,8 + 2,4)/2 = 3,10 | 2 | 6,200 |",
          "| 8 → 12 | (2,4 + 0,95)/2 = 1,675 | 4 | 6,700 |",
          "| **Suma** | | | **46,625** |",
          "",
          "**Conclusión:** ABC₀→12 ≈ **46,6 mg·h/L**.",
          "",
          "**(c) Constante de eliminación K.**",
          "",
          "*Interpretación:* en la fase terminal la curva es una exponencial C = C₀·e^(−Kt); entre dos puntos, K = ln(C₁/C₂)/(t₂ − t₁). Usamos los puntos de 8 y 12 h.",
          "",
          "K = ln(2,4 / 0,95) / (12 − 8) = ln(2,526) / 4 = 0,9268 / 4 = **0,2317 h⁻¹**.",
          "",
          "t1/2 = 0,693 / 0,2317 = 2,99 h ≈ 3 h.",
          "",
          "**Conclusión:** K = 0,232 h⁻¹ (vida media ≈ 3 h).",
          "",
          "**(d) ABC₀→∞.**",
          "",
          "*Interpretación:* a lo medido hay que sumar el área de la cola que queda más allá de las 12 h: C_última/K.",
          "",
          "Cola = 0,95 mg/L ÷ 0,2317 h⁻¹ = 4,10 mg·h/L (mg/L ÷ h⁻¹ = mg·h/L).",
          "",
          "ABC₀→∞ = 46,625 + 4,10 = **50,7 mg·h/L**.",
          "",
          "**Conclusión:** la exposición total es ≈ 50,7 mg·h/L.",
          "",
          "**(e) ¿Cubre al menos el 80 %?**",
          "",
          "46,625 ÷ 50,725 = 0,919 → **91,9 %**.",
          "",
          "**Conclusión:** sí (91,9 % > 80 %): el muestreo fue suficientemente largo para estimar bien la exposición, según el criterio de la guía EMA.",
        ].join("\n"),
      },
      {
        question: [
          "**Biodisponibilidad absoluta.** Un fármaco se administró (en estudios separados, a la misma persona) por vía IV (**100 mg**, ABC₀→∞ = **20,0 mg·h/L**) y por vía oral (**250 mg**, ABC₀→∞ = **30,0 mg·h/L**). Calcula la biodisponibilidad absoluta F de la tableta y explica qué significa el resultado.",
        ].join("\n"),
        solution: [
          "**Interpretación:** la vía IV es la referencia del 100 %. Para comparar vías con dosis distintas hay que **normalizar** cada ABC por su dosis.",
          "",
          "**Paso 1 — ABC por mg administrado.**",
          "",
          "* Oral: 30,0 mg·h/L ÷ 250 mg = 0,120 (mg·h/L)/mg.",
          "* IV: 20,0 mg·h/L ÷ 100 mg = 0,200 (mg·h/L)/mg.",
          "",
          "**Paso 2 — Cociente.**",
          "",
          "F = 0,120 ÷ 0,200 = **0,60** (60 %). Las unidades (mg·h/L)/mg se cancelan.",
          "",
          "**Conclusión:** solo el **60 %** de la dosis oral llega inalterada a la circulación sistémica; el otro 40 % se pierde (no se absorbe, se degrada en el intestino o se metaboliza en el primer paso hepático; en el Módulo 3 se separan esas pérdidas). Para lograr la misma exposición que 100 mg IV se necesitarían 100/0,60 ≈ 167 mg orales.",
        ].join("\n"),
      },
      {
        question: [
          "**Velocidad vs. magnitud.** Dos formulaciones orales de la misma dosis dieron: **A** → Cmax 9,8 mg/L, tmax 1,0 h, ABC 60 mg·h/L; **B** → Cmax 6,1 mg/L, tmax 3,0 h, ABC 59 mg·h/L. ¿Difieren en velocidad, en magnitud o en ambas? ¿Cuál escogerías para un analgésico de inicio rápido y por qué? ¿Cuál para un fármaco cuyo pico alto produce efectos adversos?",
        ].join("\n"),
        solution: [
          "**Interpretación:** magnitud = ABC; velocidad = Cmax y tmax.",
          "",
          "**Magnitud:** 59 ÷ 60 = 0,983 → B tiene el **98 %** del ABC de A. Prácticamente **iguales**.",
          "",
          "**Velocidad:** Cmax de B = 6,1 ÷ 9,8 = 0,62 → **62 %** del de A; y B alcanza su pico **3 veces más tarde** (3,0 h frente a 1,0 h). Difieren **claramente**.",
          "",
          "**Conclusión de la comparación:** misma magnitud, distinta velocidad. Por eso un criterio basado solo en el ABC no bastaría, y se exige también Cmax.",
          "",
          "* **Analgésico de inicio rápido:** **A** (pico alto y temprano → supera pronto la CME).",
          "* **Fármaco con efectos adversos asociados al pico:** **B** (pico más bajo y tardío, mismo total absorbido; es el principio de las formas de liberación modificada).",
          "",
          "**Conclusión:** son productos que *no* serían bioequivalentes entre sí (la relación de Cmax, 0,62, cae fuera de 0,80–1,25) aunque tengan el mismo contenido y la misma magnitud de absorción.",
        ].join("\n"),
      },
      {
        question: [
          "**Biodisponibilidad relativa con dosis distintas.** Un producto de prueba (**400 mg**) tuvo ABC = **38,0 mg·h/L**; el de referencia (**500 mg**) tuvo ABC = **50,0 mg·h/L**. Calcula F_rel e interpreta.",
        ].join("\n"),
        solution: [
          "**Interpretación:** como las dosis difieren, hay que normalizar por dosis antes de comparar.",
          "",
          "**Paso 1.** Prueba: 38,0 ÷ 400 = 0,0950. Referencia: 50,0 ÷ 500 = 0,1000.",
          "",
          "**Paso 2.** F_rel = 0,0950 ÷ 0,1000 = **0,95** (95 %).",
          "",
          "**Conclusión:** el producto de prueba entrega por cada mg el **95 %** de la exposición que da el de referencia. Sin la normalización habríamos calculado 38/50 = 76 %, lo que **subestima** el desempeño del producto por una simple diferencia de dosis. (Ojo: la bioequivalencia formal exige la misma dosis molar; esto es solo biodisponibilidad relativa.)",
        ].join("\n"),
      },
      {
        question: [
          "**Análisis dimensional del ABC.** (a) ¿Qué unidades tiene el ABC si la concentración está en ng/mL y el tiempo en h? (b) Convierte un ABC de **45 ng·h/mL** a **mg·h/L**. (c) Si la dosis fue de 10 mg, ¿qué unidades tiene el cociente Dosis/ABC y a qué parámetro corresponde?",
        ].join("\n"),
        solution: [
          "**(a)** ABC = concentración × tiempo → **ng·h/mL**.",
          "",
          "**(b)** *Interpretación:* 1 ng/mL = 1 µg/L = 10⁻³ mg/L, así que 45 ng·h/mL = 45 × 10⁻³ mg·h/L.",
          "",
          "45 ng·h/mL × (1 µg / 1000 ng) × (1000 mL / 1 L) × (1 mg / 1000 µg) = 45 × (1/1000) × 1000 × (1/1000) mg·h/L = **0,045 mg·h/L**.",
          "",
          "**Conclusión:** 45 ng·h/mL = 0,045 mg·h/L.",
          "",
          "**(c)** Dosis/ABC = mg ÷ (mg·h/L) = **L/h**. Es el **aclaramiento** (volumen depurado por hora; para IV, Cl = Dosis/ABC). Con 10 mg ÷ 0,045 mg·h/L = 222 L/h.",
          "",
          "**Conclusión:** revisar unidades revela *qué parámetro* estás calculando: si te sale L/h, es un aclaramiento; si te sale mg·h/L, un ABC.",
        ].join("\n"),
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "vias-dosis-regimen": {
    chapter: `#### El viaje depende de la puerta de entrada

La **vía de administración** define por dónde entra el fármaco y, con ello, **cuántos obstáculos** tiene que sortear antes de llegar a la sangre. Cada vía es un compromiso entre rapidez, comodidad, seguridad, costo y cuánto fármaco llega realmente. Este módulo recorre las vías y los factores de entrada que modifican la respuesta; el libro de Barbosa y Zambrano (2024) las revisa desde el enfoque farmacéutico.

#### Clasificación de las vías

| Grupo | Vías | Característica clave |
|---|---|---|
| **Enteral** (por el tubo digestivo) | oral, sublingual/bucal, rectal | Requieren **absorción**; la oral pasa por el hígado antes de llegar a la circulación sistémica (primer paso) |
| **Parenteral** (saltan el tubo digestivo) | intravenosa (IV), intramuscular (IM), subcutánea (SC), intradérmica, intratecal | La IV evita la absorción: F = 100 %. IM y SC dependen del flujo sanguíneo local |
| **Tópica / transdérmica** | piel, mucosas | Acción local o sistémica prolongada (parche); la barrera es el estrato córneo |
| **Inhalatoria, nasal, ocular, ótica, vaginal** | pulmón, mucosas | Acción local o sistémica rápida (pulmón: gran superficie y mucha irrigación) |

*Ideas clave por vía:*

* **Oral:** la más usada (cómoda, barata, segura), pero la más variable: depende de la disolución, del vaciamiento gástrico, del pH, de los alimentos y del **metabolismo de primer paso**.
* **Sublingual/bucal:** la mucosa está muy irrigada y el drenaje venoso **no pasa por el hígado**; evita el primer paso (p. ej. nitroglicerina). Por eso las normas de bioexención BCS **no aplican** a formas bucales o sublinguales.
* **Rectal:** el drenaje venoso de la parte baja del recto evita parcialmente el hígado; útil si hay vómito o inconsciencia.
* **IV:** efecto inmediato y dosis exacta; sin retorno (no se puede «sacar» el fármaco) y con riesgo de efectos adversos por picos altos.
* **IM/SC:** absorción por difusión hacia capilares; admiten **depósitos** de liberación prolongada.
* **Transdérmica:** libera durante días (parches de fentanilo, nicotina, estradiol); requiere moléculas pequeñas y lipofílicas.

#### Los obstáculos de la vía oral, en orden

${fx(
  "Dosis oral → [se disuelve] → [atraviesa el intestino] → [pasa la pared: metabolismo intestinal] → [pasa el hígado: primer paso] → circulación sistémica",
  "          Fa  (fracción absorbida)      Fg (fracción que escapa al intestino)      Fh (fracción que escapa al hígado)",
)}

La biodisponibilidad oral es el **producto** de las tres fracciones que sobreviven a cada obstáculo:

${fx(
  "F = Fa · Fg · Fh",
  "Fh = 1 − E_{H}",
  "E_{H} = #{Cl_{H}|Q_{H}}",
)}

* **Fa:** fracción de la dosis que atraviesa la pared intestinal (depende de disolución y permeabilidad).
* **Fg:** fracción que no es metabolizada en el propio intestino (p. ej. por CYP3A4 en el enterocito).
* **Fh:** fracción que escapa al hígado en el primer paso.
* **E_H (razón de extracción hepática):** fracción del fármaco que el hígado retira en **una sola pasada**; Cl_H es el aclaramiento hepático y Q_H el **flujo sanguíneo hepático** (≈ 90 L/h ≈ 1,5 L/min).

*Por qué se multiplican:* cada etapa deja pasar solo una fracción de lo que le llega; lo que sobrevive a la segunda es una fracción **de la fracción** de la primera. Ejemplo: si Fa = 0,9, Fg = 0,8 y Fh = 0,4, llegan 0,9 × 0,8 × 0,4 = 0,288 (28,8 %).

> Analogía: una fila de tres aduanas. En la primera dejan pasar el 90 % de la carga; en la segunda, el 80 % de lo que llegó; en la tercera, el 40 %. La carga final no es 90 − 20 − 60 = 10 %, sino 0,9 × 0,8 × 0,4 = 28,8 %: **se multiplican las fracciones**, no se suman las pérdidas.

Los fármacos con **E_H alta** (propranolol, morfina, lidocaína, nitroglicerina) tienen primer paso intenso: su dosis oral es mucho mayor que la IV, y su biodisponibilidad es muy sensible a cambios de flujo hepático o a inhibidores enzimáticos.

#### Factores de entrada que modifican la respuesta

* **Del fármaco:** solubilidad, **pKa**, lipofilia (log P), tamaño molecular, estabilidad en el pH gástrico y frente a enzimas.
* **De la vía y del método:** vía, sitio, ritmo de administración (bolo, infusión), volumen, concentración.
* **De la forma farmacéutica:** Módulo 4.
* **Del paciente:** edad, peso, función hepática y renal, vaciamiento gástrico, alimentos, genética.

#### La hipótesis de partición por pH

Las membranas biológicas son lipídicas: atraviesan con facilidad las moléculas **sin carga (no ionizadas)** y con dificultad las **ionizadas**. Los ácidos y bases débiles existen en equilibrio entre sus dos formas, y la proporción depende del **pH** del medio y del **pKa** del fármaco (ecuación de Henderson–Hasselbalch):

${fx(
  "Ácido débil:  fracción no ionizada = #{1|1 + 10^{(pH − pKa)}}",
  "Base débil:   fracción no ionizada = #{1|1 + 10^{(pKa − pH)}}",
)}

*De dónde sale:* para un ácido HA ⇌ H⁺ + A⁻, pH = pKa + log([A⁻]/[HA]); despejando [A⁻]/[HA] = 10^(pH−pKa), y la fracción no ionizada es [HA]/([HA] + [A⁻]) = 1/(1 + 10^(pH−pKa)). Cuando pH = pKa, la mitad está ionizada y la mitad no (50 %).

**Regla práctica:** los **ácidos** se absorben mejor en medio **ácido** (estómago) y las **bases** en medio **menos ácido** (intestino). Pero hay una trampa famosa: aunque un ácido débil esté más no ionizado en el estómago, **casi todos los fármacos se absorben principalmente en el intestino delgado**, porque tiene una superficie enorme (vellosidades y microvellosidades) y un tiempo de contacto largo; la fracción ionizada que se absorbe en el intestino, multiplicada por esa gran superficie, supera lo que absorbe el estómago. La hipótesis de partición por pH (Shore, Brodie y Hogben, 1957) es un **buen primer modelo**, no la historia completa: también intervienen transportadores, flujo, solubilidad y tiempo de tránsito.

#### Dosis y régimen de dosificación

* **Dosis:** cantidad de fármaco administrada de una vez (mg).
* **Régimen de dosificación:** el plan completo: **dosis + intervalo (τ) + vía + duración**.
* **Dosis de carga:** dosis inicial mayor para alcanzar rápido la concentración objetivo (útil con fármacos de vida media larga).
* **Dosis de mantenimiento:** la que repone lo eliminado en cada intervalo para **mantener** la concentración.
* **Intervalo (τ):** tiempo entre dosis; se escoge según la vida media y la ventana terapéutica.

La relación fundamental (la derivarás en el Módulo 7) es:

${fx(
  "C_{ss,prom} = #{F · Dosis|Cl · τ}",
)}

*Cómo leerla:* lo que **entra por hora** (F · Dosis / τ) debe igualar lo que **sale por hora** (Cl · C_ss); en promedio, la concentración de equilibrio sube con la dosis y con la biodisponibilidad, y baja con el aclaramiento y con la frecuencia de omisión.

**Dosis por peso y volumen a administrar:** en pediatría y en preparaciones líquidas se calcula la dosis en **mg/kg** y después se convierte a **mL** con la concentración de la presentación:

${fx(
  "Dosis (mg) = (mg/kg) · peso (kg)",
  "Volumen (mL) = Dosis (mg) ÷ concentración (mg/mL)",
)}

#### En resumen

* Las vías **enterales** requieren absorción; las **parenterales** (IV) la evitan; la **oral** sufre **primer paso**.
* **F = Fa · Fg · Fh** y **Fh = 1 − E_H**: las fracciones se **multiplican**.
* **Henderson–Hasselbalch** da la fracción no ionizada; pH = pKa → 50 %; la absorción real depende también de superficie y tiempo.
* **Régimen** = dosis + intervalo + vía + duración; **C_ss,prom = F·Dosis/(Cl·τ)**.
* Las dosis pediátricas y líquidas: **mg/kg → mg → mL** con unidades que se cancelan.

#### Para profundizar

* Barbosa HJ, Zambrano PV. *Revisión crítica de las vías de administración de medicamentos desde un enfoque farmacéutico*. Universidad Nacional de Colombia, 2024. https://repositorio.unal.edu.co/handle/unal/87111
* Shore PA, Brodie BB, Hogben CAM. The gastric secretion of drugs: a pH partition hypothesis. *J Pharmacol Exp Ther* 1957;119:361-369.
* Lennernäs H. Intestinal permeability and its relevance for absorption and elimination. *Xenobiotica* 2007;37:1015-1051. DOI 10.1080/00498250701704819.`,
    exercises: [
      {
        question: [
          "**Partición por pH.** La aspirina (ácido acetilsalicílico) es un ácido débil con **pKa ≈ 3,5**. Calcula la **fracción no ionizada** en (a) el estómago (pH 1,5), (b) el intestino (pH 6,5) y (c) el plasma (pH 7,4). (d) Explica por qué, aun así, se absorbe sobre todo en el intestino.",
        ].join("\n"),
        solution: [
          "**Interpretación:** para un ácido débil, fracción no ionizada = 1 / (1 + 10^(pH − pKa)). Cuanto más alto el pH respecto al pKa, más ionizado.",
          "",
          "**(a) Estómago, pH 1,5.**",
          "",
          "pH − pKa = 1,5 − 3,5 = −2,0 → 10^(−2) = 0,01.",
          "",
          "Fracción no ionizada = 1 / (1 + 0,01) = 0,990 → **99,0 %**.",
          "",
          "**Conclusión:** casi toda la aspirina está sin carga en el estómago.",
          "",
          "**(b) Intestino, pH 6,5.**",
          "",
          "pH − pKa = 3,0 → 10³ = 1000. Fracción = 1 / 1001 = 0,000999 → **0,0999 %**.",
          "",
          "**Conclusión:** en el intestino solo ≈ 0,1 % es no ionizado.",
          "",
          "**(c) Plasma, pH 7,4.**",
          "",
          "pH − pKa = 3,9 → 10^3,9 = 7943. Fracción = 1 / 7944 = **0,0126 %**.",
          "",
          "**Conclusión:** en sangre el fármaco está casi totalmente ionizado; eso favorece que *quede atrapado* en el plasma tras absorberse.",
          "",
          "**(d) ¿Por qué se absorbe en el intestino?**",
          "",
          "La relación entre estómago e intestino es 99,0 / 0,0999 ≈ **990 veces** más no ionizado en el estómago. Pero el intestino delgado ofrece una superficie de absorción del orden de **cientos de veces mayor** (vellosidades y microvellosidades) y un tiempo de contacto mucho más largo, y además el pH 6,5 favorece la **disolución** del ácido (más soluble cuando está ionizado). El efecto del área y del tiempo compensa con creces la menor fracción no ionizada.",
          "",
          "**Conclusión:** la partición por pH explica **la tendencia**, pero no basta para predecir el sitio de absorción; hay que sumarle superficie, tiempo de tránsito y solubilidad.",
        ].join("\n"),
      },
      {
        question: [
          "**Metabolismo de primer paso.** Un fármaco oral tiene: Fa = **0,90**, Fg = **0,80** y razón de extracción hepática E_H = **0,60**. Se sabe que Q_H = **90 L/h**. Calcula (a) Fh, (b) la biodisponibilidad oral F, (c) el aclaramiento hepático Cl_H y (d) la dosis oral necesaria para igualar la exposición de **100 mg IV**.",
        ].join("\n"),
        solution: [
          "**(a) Fh.**",
          "",
          "*Interpretación:* si el hígado retira el 60 % del fármaco en una pasada, sobrevive el 40 %.",
          "",
          "Fh = 1 − E_H = 1 − 0,60 = **0,40**.",
          "",
          "**(b) F.**",
          "",
          "*Interpretación:* tres aduanas seguidas → se multiplican las fracciones que sobreviven.",
          "",
          "F = Fa × Fg × Fh = 0,90 × 0,80 × 0,40 = **0,288** (28,8 %).",
          "",
          "**Conclusión:** menos de un tercio de la dosis oral llega a la circulación sistémica; la mayor pérdida (60 %) es hepática.",
          "",
          "**(c) Aclaramiento hepático.**",
          "",
          "Despejando E_H = Cl_H/Q_H → Cl_H = E_H × Q_H = 0,60 × 90 L/h = **54 L/h**.",
          "",
          "**Conclusión:** el hígado depura 54 litros de sangre por hora en esa primera pasada; está limitado por el flujo (es un fármaco de extracción alta).",
          "",
          "**(d) Dosis oral equivalente a 100 mg IV.**",
          "",
          "La exposición (ABC) = F × Dosis / Cl. Para igualar ABC_oral = ABC_IV con F_IV = 1: F × Dosis_oral = Dosis_IV → Dosis_oral = 100 mg ÷ 0,288 = **347 mg**.",
          "",
          "**Conclusión:** hay que dar ≈ 3,5 veces la dosis IV por vía oral. Si un inhibidor enzimático reduce E_H de 0,60 a 0,30 (Fh = 0,70), F sube a 0,9 × 0,8 × 0,7 = 0,504: casi **se duplica** la exposición con la misma dosis. Esa sensibilidad es la razón de las interacciones graves en fármacos de alta extracción.",
        ].join("\n"),
      },
      {
        question: [
          "**Dosis por peso y volumen.** Un niño de **18 kg** debe recibir amoxicilina a **40 mg/kg/día** repartidos cada 8 h. La suspensión disponible es de **250 mg/5 mL**. (a) ¿Cuántos mg al día? (b) ¿Cuántos mg por toma? (c) ¿Cuántos mL por toma? (d) ¿Cuántas tomas diarias hay?",
        ].join("\n"),
        solution: [
          "*(Ejercicio ilustrativo de cálculo; la dosis real siempre se verifica en la información de prescripción y con el prescriptor.)*",
          "",
          "**(a) Dosis diaria.**",
          "",
          "*Interpretación:* mg/kg/día × kg = mg/día.",
          "",
          "40 mg/(kg·día) × 18 kg = **720 mg/día** (kg se cancela con kg).",
          "",
          "**(d) Tomas diarias.** 24 h ÷ 8 h = **3 tomas**.",
          "",
          "**(b) Por toma.** 720 mg/día ÷ 3 tomas/día = **240 mg por toma**.",
          "",
          "**(c) Volumen por toma.**",
          "",
          "*Interpretación:* la concentración de la suspensión es 250 mg por cada 5 mL = 50 mg/mL.",
          "",
          "240 mg × (5 mL / 250 mg) = **4,8 mL por toma** (mg se cancela con mg).",
          "",
          "**Conclusión:** el niño recibe 4,8 mL tres veces al día (14,4 mL/día). Siempre se revisa que la dosis diaria no pase del máximo recomendado y se aclara con el cuidador el uso de una jeringa dosificadora (la cuchara doméstica es imprecisa).",
        ].join("\n"),
      },
      {
        question: [
          "**Elegir la vía.** Para cada situación, escoge la vía más adecuada entre oral, sublingual, IV, intramuscular depot o transdérmica y justifica con un argumento biofarmacéutico: (a) crisis anginosa que requiere alivio en minutos con un fármaco de primer paso hepático muy alto; (b) paciente inconsciente en urgencias que necesita un antibiótico a concentración inmediata; (c) anticonceptivo con efecto sostenido por semanas; (d) tratamiento crónico de hipertensión en un paciente ambulatorio.",
        ].join("\n"),
        solution: [
          "| Caso | Vía | Argumento |",
          "|---|---|---|",
          "| (a) angina | **Sublingual** | La mucosa muy irrigada deja pasar el fármaco directo a la circulación venosa sistémica y **evita el primer paso hepático** (fármaco con E_H alta que por vía oral perdería casi toda la dosis); inicio en minutos |",
          "| (b) inconsciente, antibiótico urgente | **IV** | No requiere absorción ni deglución; F = 100 % y la concentración deseada se alcanza de inmediato |",
          "| (c) efecto sostenido por semanas | **Intramuscular depot** (o implante/parche, según el caso) | Un depósito oleoso o una suspensión se absorbe lentamente y mantiene la concentración semanas; liberación **controlada por la forma farmacéutica** |",
          "| (d) crónico ambulatorio | **Oral** | Cómoda, barata y segura para uso diario; si el fármaco tiene biodisponibilidad adecuada y vida media compatible con 1–2 tomas, es la mejor opción |",
          "",
          "**Conclusión:** la elección combina **qué tan rápido** se necesita el efecto, **cuánto fármaco** debe llegar (primer paso), **qué tan sostenida** debe ser la exposición y **qué puede hacer el paciente** (deglutir, adherencia).",
        ].join("\n"),
      },
      {
        question: [
          "**Base débil.** Una base débil hipotética tiene **pKa = 8,0**. Calcula su fracción no ionizada en el estómago (pH 1,5), el intestino (pH 6,5) y el plasma (pH 7,4), y explica qué le pasa a una base débil que se difunde desde la sangre hacia el jugo gástrico.",
        ].join("\n"),
        solution: [
          "**Interpretación:** para una base, fracción no ionizada = 1 / (1 + 10^(pKa − pH)).",
          "",
          "* Estómago (pH 1,5): pKa − pH = 6,5 → 10^6,5 = 3,16 × 10⁶ → fracción = 1 / (3,16 × 10⁶ + 1) = 3,2 × 10⁻⁷ → **0,00003 %**.",
          "* Intestino (pH 6,5): pKa − pH = 1,5 → 10^1,5 = 31,6 → fracción = 1 / 32,6 = 0,0307 → **3,07 %**.",
          "* Plasma (pH 7,4): pKa − pH = 0,6 → 10^0,6 = 3,98 → fracción = 1 / 4,98 = 0,2008 → **20,1 %**.",
          "",
          "**Conclusión:** en el estómago la base está ionizada en esencia al 100 %: no atraviesa la membrana. En el plasma hay una fracción mayor no ionizada (20 %), que puede difundirse hacia un compartimento ácido como el jugo gástrico; allí se **ioniza** y queda **atrapada** («atrapamiento iónico»), de modo que la base se acumula en el compartimento ácido. Es el mecanismo que Shore, Brodie y Hogben describieron para la secreción gástrica de fármacos.",
        ].join("\n"),
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "senf-liberacion-disolucion": {
    chapter: `#### De la tableta a la solución: la cascada de la liberación

Un fármaco **sólo se absorbe cuando está disuelto**. Por eso, en una forma sólida oral, la cascada es:

${fx(
  "Tableta → [desintegración] → gránulos → [disgregación] → partículas finas → [DISOLUCIÓN] → fármaco en solución → [absorción] → sangre",
)}

El **paso más lento** de la cascada manda sobre la velocidad total (es el **paso limitante**). Hay dos casos extremos y la clave del curso es saber en cuál estás:

* **Limitado por disolución:** el fármaco se absorbe con facilidad pero se disuelve mal (típico de fármacos poco solubles). Aquí **la forma farmacéutica manda**: cualquier cambio en tamaño de partícula, excipientes o proceso cambia la biodisponibilidad.
* **Limitado por permeabilidad:** se disuelve bien pero atraviesa mal la membrana. Aquí manda la **fisiología** y la forma farmacéutica casi no importa.

El **SENF** (Sistema de Entrega del Fármaco) es, justamente, la forma farmacéutica con sus excipientes y su proceso de fabricación, en tanto **condiciona la liberación**. Para el químico farmacéutico es el único eslabón de la cadena que **diseña y controla**.

#### La ecuación de Noyes–Whitney, derivada desde cero

Noyes y Whitney (1897) observaron que un sólido se disuelve más rápido cuanto más lejos está la solución de saturarse. Nernst y Brunner le dieron la forma física actual.

> Analogía: imagina un terrón de azúcar en un vaso de té. Alrededor del terrón se forma una **capa delgada de jarabe casi saturado**, y el azúcar tiene que **difundirse** a través de esa capa hacia el resto del té. Cuanto **más superficie** tiene el terrón (azúcar en polvo), **más delgada** es la capa (agitar con la cuchara) y **más vacío** está el té (poco azúcar disuelto), más rápido se disuelve.

Esa imagen se traduce con la **primera ley de Fick** (la difusión es proporcional a la diferencia de concentración e inversamente proporcional a la distancia):

${fx(
  "#{dM|dt} = #{D · A · (C_{s} − C)|h}",
)}

* **dM/dt:** velocidad de disolución (masa por tiempo, mg/s o mg/min).
* **D:** coeficiente de difusión del fármaco en el medio (cm²/s). Aumenta con la temperatura y disminuye con la viscosidad.
* **A:** área superficial de sólido expuesta al medio (cm²). **Más pequeñas las partículas → mayor A.**
* **C_s:** solubilidad de saturación en la capa que rodea al sólido (mg/mL).
* **C:** concentración en el seno del medio (mg/mL).
* **h:** espesor de la capa de difusión (cm). **Más agitación → h menor → disolución más rápida.**
* **(C_s − C):** la fuerza impulsora.

**Condiciones sink (sumidero):** cuando C es muy pequeña frente a C_s (menos del 10–15 % de C_s, y por convención de las farmacopeas el volumen debe ser al menos 3 veces el necesario para saturar), el término (C_s − C) ≈ C_s y la disolución deja de frenarse: **dM/dt = D·A·C_s/h**. Es la razón por la que las pruebas de disolución se hacen en 900 mL y a veces con tensioactivo (Gibaldi y Feldman, 1967). Si el medio no cumple sink, el ensayo no discrimina bien.

*Supuesto importante:* Noyes–Whitney asume que A es constante, lo cual **no** es cierto en una tableta (las partículas se encogen al disolverse).

#### Cuando el área cambia: la ley de la raíz cúbica (Hixson–Crowell)

Para partículas que conservan su forma y se encogen, el área es proporcional a la masa elevada a 2/3; integrando se obtiene:

${fx(
  "W_{0}^{1/3} − W^{1/3} = k · t",
)}

Si graficas W^(1/3) contra el tiempo, obtienes una **recta** de pendiente −k. (Hixson y Crowell, 1931.)

#### Los factores que cambian la disolución, uno por uno

| Factor | Qué cambia en la ecuación | Efecto |
|---|---|---|
| **Tamaño de partícula** | A | Partículas más pequeñas → A mayor → disolución más rápida (micronización) |
| **Humectabilidad** | A efectiva | Sólidos hidrofóbicos no se mojan y se aglomeran: un tensioactivo (laurilsulfato de sodio) los moja y sube la A efectiva |
| **Polimorfismo y estado sólido** | C_s | La forma **amorfa** y los polimorfos metaestables son más solubles que la forma cristalina estable; los **hidratos** suelen serlo menos que los anhidros |
| **Sal vs. base/ácido libre** | C_s y pH de la capa | Una sal soluble crea un pH local favorable y se disuelve más rápido (por eso se formulan sales de ácidos y bases débiles) |
| **pH del medio** | C_s | Un ácido débil es más soluble a pH alto; una base débil, a pH bajo |
| **Temperatura** | D y C_s | Más temperatura → más D y, usualmente, más C_s |
| **Agitación** | h | Más agitación → h menor |
| **Viscosidad** | D | Más viscosidad → D menor (relación de Stokes–Einstein) |

**La solubilidad depende del pH.** Para un ácido débil y una base débil:

${fx(
  "Ácido débil:  S = S_{0} · (1 + 10^{(pH − pKa)})",
  "Base débil:   S = S_{0} · (1 + 10^{(pKa − pH)})",
)}

donde S₀ es la **solubilidad intrínseca** (de la forma no ionizada). *De dónde sale:* la solubilidad total es la suma de la forma no ionizada (S₀, constante) y de la ionizada (que crece con el pH para un ácido).

#### Excipientes y proceso de fabricación: los factores que sí controlas

* **Desintegrantes** (almidón, croscarmelosa, crospovidona): aceleran la desintegración; una cantidad insuficiente la retrasa.
* **Lubricantes hidrofóbicos** (estearato de magnesio): en exceso o con mezclado prolongado forman una película que **repele el agua** y frena la disolución.
* **Aglutinantes:** demasiado aglutinante o demasiada fuerza de compresión → tabletas duras que se desintegran lentamente.
* **Tensioactivos:** mejoran la humectación y la solubilización, pero según la guía ICH M9 pueden **alterar la absorción** (efecto sobre el transporte, la permeabilidad y el tránsito) y por eso se examinan con cuidado en las bioexenciones.
* **Diluyentes** como el manitol y el sorbitol: pueden acelerar el tránsito intestinal en cantidades grandes; también aparecen en la lista de excipientes críticos.
* **Recubrimientos** (entéricos, de película): retrasan o protegen según el diseño.
* **Proceso:** el método de granulación, la fuerza de compresión, el secado y el mezclado cambian la porosidad y la dureza y, con ellas, la velocidad de disolución. Por eso un cambio de **sitio de fabricación o de proceso** puede requerir demostrar que la disolución (o la bioequivalencia) se mantiene.

#### Formas de liberación modificada

* **Liberación prolongada/extendida:** liberan el fármaco durante horas para reducir la frecuencia de dosis y aplanar el pico. Dos grandes mecanismos: **matriz** (la liberación sigue, cuando es por difusión, la raíz cuadrada del tiempo: **modelo de Higuchi**, Q = k·t^(1/2)) y **reservorio/membrana** (más cercana a orden cero), además de sistemas **osmóticos**.
* **Liberación retardada:** cubiertas entéricas que se abren a pH alto.
* Para estas formas, **la bioexención por BCS no aplica** y los estudios de bioequivalencia exigen condiciones en ayuno y con alimentos (Módulo 9).

#### Interacciones con alimentos

Los alimentos pueden **aumentar**, **disminuir** o **no cambiar** la absorción, por varios mecanismos:

* **Retrasan el vaciamiento gástrico** (comidas grasas, voluminosas): puede retrasar tmax.
* **Cambian el pH** gástrico y la secreción biliar: los **ácidos biliares** solubilizan fármacos lipofílicos (griseofulvina, ciertos antifúngicos azólicos), que se absorben **más** con una comida grasa.
* **Aumentan el flujo sanguíneo esplácnico**, lo que puede aumentar la extracción de algunos fármacos.
* **Quelación:** el calcio de los lácteos y los cationes divalentes forman complejos insolubles con tetraciclinas y fluoroquinolonas, que se absorben **menos**.
* **Competencia por transportadores** o **adsorción** en fibra.

Para evaluarlo en el desarrollo clínico, la guía de la FDA sobre efecto de los alimentos (2022) recomienda un estudio con una comida **alta en grasa**; la guía EMA especifica una comida con **≈ 50 % de calorías de grasa y 800–1000 kcal**. Un producto debe usarse como indica su etiqueta (en ayunas o con alimentos), y los estudios de bioequivalencia se diseñan en consecuencia.

#### Ensayo de disolución

Los aparatos de uso más común son la **canastilla** (aparato 1, ≈ 100 rpm) y la **paleta** (aparato 2, 50–75 rpm), con ≤ 900 mL de medio a 37 °C y muestreo a varios tiempos. Para las bioexenciones, la guía ICH M9 pide comparar **perfiles** en **tres pH (1,2; 4,5; 6,8)**, con al menos **12 unidades**, sin tensioactivos ni solventes orgánicos. Un buen ensayo de disolución es **discriminatorio** (detecta cambios que de verdad afectan la absorción), y su valor máximo es cuando se establece una **correlación in vitro–in vivo (IVIVC)**, con la que la prueba de laboratorio predice la curva de plasma (Dressman et al., 1998).

#### En resumen

* **Sólo se absorbe lo disuelto**: la **disolución** suele ser el paso limitante para fármacos poco solubles.
* **Noyes–Whitney:** dM/dt = D·A·(C_s − C)/h. Se acelera con **más A**, **más C_s**, **menos h**.
* **Sink:** el volumen de medio debe poder disolver al menos 3 veces la dosis.
* **Henderson–Hasselbalch para solubilidad:** ácidos más solubles a pH alto; bases, a pH bajo.
* Excipientes y proceso (lubricantes, desintegrantes, compresión, recubrimiento) **modifican la liberación**.
* **Alimentos:** retrasan, aumentan o disminuyen la absorción según el mecanismo.

#### Para profundizar

* Noyes AA, Whitney WR. The rate of solution of solid substances in their own solutions. *J Am Chem Soc* 1897;19:930-934. DOI 10.1021/ja02086a003.
* Hixson AW, Crowell JH. Dependence of reaction velocity upon surface and agitation. *Ind Eng Chem* 1931;23:923-931. DOI 10.1021/ie50260a018.
* Higuchi T. Rate of release of medicaments from ointment bases containing drugs in suspension. *J Pharm Sci* 1961;50:874-875. DOI 10.1002/jps.2600501018.
* Gibaldi M, Feldman S. Establishment of sink conditions in dissolution rate determinations. *J Pharm Sci* 1967;56:1238-1242. DOI 10.1002/jps.2600561005.
* Dressman JB, Amidon GL, Reppas C, Shah VP. Dissolution testing as a prognostic tool for oral drug absorption: immediate release dosage forms. *Pharm Res* 1998;15:11-22. DOI 10.1023/A:1011984216775.
* Welling PG. Effects of food on drug absorption. *Annu Rev Nutr* 1996;16:383-415. DOI 10.1146/annurev.nutr.16.1.383.
* Dressman J, Krämer J. *Pharmaceutical Dissolution Testing*. Taylor & Francis, 2005.`,
    exercises: [
      {
        question: [
          "**Velocidad de disolución (Noyes–Whitney).** Un fármaco tiene D = **6,0 × 10⁻⁶ cm²/s**, una superficie expuesta A = **2,0 cm²**, una capa de difusión de h = **30 µm** y una solubilidad C_s = **1,5 mg/mL**. Se disuelve en condiciones sink (C ≈ 0). Calcula (a) dM/dt en mg/min y (b) la velocidad si la micronización multiplica el área por 10.",
        ].join("\n"),
        solution: [
          "**Interpretación:** aplicamos dM/dt = D·A·(C_s − C)/h. Lo primero es tener **todas las unidades en cm, s y mg/mL (= mg/cm³)**.",
          "",
          "**Paso 1 — Convertir h.** 30 µm × (10⁻⁴ cm / 1 µm) = **3,0 × 10⁻³ cm**.",
          "",
          "**Paso 2 — Fuerza impulsora.** (C_s − C) = 1,5 − 0 = 1,5 mg/mL = 1,5 mg/cm³ (1 mL = 1 cm³).",
          "",
          "**Paso 3 — Sustituir.**",
          "",
          "dM/dt = (6,0 × 10⁻⁶ cm²/s × 2,0 cm² × 1,5 mg/cm³) / 3,0 × 10⁻³ cm",
          "",
          "*Unidades:* cm²/s × cm² × mg/cm³ ÷ cm = (cm⁴ · mg)/(s · cm³ · cm) = **mg/s** (los cm se cancelan).",
          "",
          "Numerador: 6,0 × 10⁻⁶ × 2,0 × 1,5 = 1,8 × 10⁻⁵. Dividido entre 3,0 × 10⁻³ = **6,0 × 10⁻³ mg/s**.",
          "",
          "**Paso 4 — A mg/min.** 6,0 × 10⁻³ mg/s × 60 s/min = **0,36 mg/min**.",
          "",
          "**Conclusión (a):** en esas condiciones se disuelven 0,36 mg cada minuto; una dosis de 250 mg tardaría del orden de 250/0,36 ≈ 690 min, es decir, no se disolvería a tiempo: el fármaco sería de **absorción limitada por disolución**.",
          "",
          "**(b)** Como dM/dt es **proporcional a A**, si A × 10 → **3,6 mg/min** (10 veces más rápido).",
          "",
          "**Conclusión (b):** micronizar es la palanca más directa para acelerar la disolución de un fármaco poco soluble. (Nota: el cálculo supone A constante; en la realidad A baja a medida que las partículas se disuelven.)",
        ].join("\n"),
      },
      {
        question: [
          "**Condiciones sink.** Se quiere ensayar la disolución de una tableta de **200 mg** de un fármaco con solubilidad **0,05 mg/mL**, en **900 mL** de medio. (a) ¿Cuánto fármaco puede disolverse como máximo en 900 mL? (b) ¿Se cumple sink si el criterio es un volumen de al menos 3 veces el de saturación? (c) ¿Qué harías?",
        ].join("\n"),
        solution: [
          "**(a) Máximo que cabe en 900 mL.**",
          "",
          "*Interpretación:* el medio se satura cuando la concentración llega a C_s.",
          "",
          "Masa máxima = C_s × V = 0,05 mg/mL × 900 mL = **45 mg**.",
          "",
          "**Conclusión:** de los 200 mg, solo 45 mg **pueden** disolverse; el ensayo nunca llegaría al 100 %, aunque la tableta fuera perfecta.",
          "",
          "**(b) Volumen de saturación y criterio 3×.**",
          "",
          "Volumen de saturación = Dosis / C_s = 200 mg ÷ 0,05 mg/mL = **4000 mL**. El criterio 3× pide 3 × 4000 = **12 000 mL**, muy por encima de los 900 mL.",
          "",
          "**Conclusión:** **no** se cumple sink: con 900 mL la fuerza impulsora (C_s − C) se va a cero y la disolución se frena por saturación, no por la formulación.",
          "",
          "**(c) Qué hacer.**",
          "",
          "Aumentar la solubilidad del medio **sin cambiar el fármaco**: añadir un **tensioactivo** (p. ej. laurilsulfato de sodio) a una concentración justificada, de modo que C_s aparente suba. Con C_s aparente de 0,5 mg/mL, el volumen de saturación sería 200/0,5 = 400 mL y 3× = 1200 mL (todavía algo mayor que 900 mL, pero cercano). Para fines de bioexención la guía ICH M9 **no admite tensioactivos**; por eso este fármaco **no podría** optar a una bioexención y requeriría estudio in vivo.",
          "",
          "**Conclusión:** la condición sink no es un detalle de laboratorio: determina si el ensayo mide la formulación o mide solo la saturación del medio.",
        ].join("\n"),
      },
      {
        question: [
          "**Solubilidad vs. pH.** El ibuprofeno es un ácido débil con **pKa ≈ 4,4** y solubilidad intrínseca **S₀ ≈ 0,021 mg/mL** (valores de literatura aproximados, con fines didácticos). (a) Calcula la solubilidad a pH 1,2, 4,5 y 6,8. (b) Para una dosis máxima de **800 mg**, ¿se cumple el criterio de alta solubilidad de ICH M9 (dosis disuelta en ≤ 250 mL en todo el intervalo pH 1,2–6,8)?",
        ].join("\n"),
        solution: [
          "**Interpretación:** para un ácido débil, S = S₀·(1 + 10^(pH − pKa)).",
          "",
          "**(a) Solubilidades.**",
          "",
          "* pH 1,2: pH − pKa = −3,2 → 10^−3,2 = 0,00063 → S = 0,021 × 1,00063 = **0,021 mg/mL**.",
          "* pH 4,5: pH − pKa = 0,1 → 10^0,1 = 1,259 → S = 0,021 × 2,259 = **0,047 mg/mL**.",
          "* pH 6,8: pH − pKa = 2,4 → 10^2,4 = 251,2 → S = 0,021 × 252,2 = **5,30 mg/mL**.",
          "",
          "**Conclusión:** la solubilidad **sube ~250 veces** entre pH 1,2 y 6,8: el ibuprofeno es casi insoluble en el estómago y muy soluble en el intestino bajo.",
          "",
          "**(b) Criterio de alta solubilidad.**",
          "",
          "*Interpretación:* ICH M9 clasifica con la **menor** solubilidad medida en pH 1,2–6,8, y exige que la dosis más alta se disuelva en 250 mL. Se necesita por tanto S ≥ Dosis/250 mL.",
          "",
          "Solubilidad mínima requerida = 800 mg ÷ 250 mL = **3,2 mg/mL**.",
          "",
          "La menor solubilidad (pH 1,2) es 0,021 mg/mL ≪ 3,2 mg/mL: **no se cumple** (faltan ≈ 150 veces).",
          "",
          "**Conclusión:** con esta dosis el ibuprofeno es de **baja solubilidad**; como además es de alta permeabilidad, cae en **Clase II del SCB**: su absorción está limitada por la disolución y su desempeño sí depende de la formulación (tamaño de partícula, sales, excipientes). Por eso no se le concede bioexención con las reglas estándar.",
        ].join("\n"),
      },
      {
        question: [
          "**Ley de la raíz cúbica (Hixson–Crowell).** Una muestra de **100 mg** de partículas tiene **60 mg** sin disolver después de **10 min**. Calcula (a) la constante k, (b) cuánto queda a los 20 min y (c) el tiempo total para disolver todo.",
        ].join("\n"),
        solution: [
          "**Interpretación:** W₀^(1/3) − W^(1/3) = k·t. Trabajamos con raíces cúbicas de la masa.",
          "",
          "**Paso 1 — Raíces cúbicas.** 100^(1/3) = **4,6416**; 60^(1/3) = **3,9149** (mg^(1/3)).",
          "",
          "**Paso 2 — k.** k = (4,6416 − 3,9149) / 10 min = 0,7267 / 10 = **0,0727 mg^(1/3)/min**.",
          "",
          "**Conclusión (a):** k = 0,0727 mg^(1/3)/min.",
          "",
          "**(b) A los 20 min.** W^(1/3) = 4,6416 − 0,0727 × 20 = 4,6416 − 1,4534 = 3,1882 → W = 3,1882³ = **32,4 mg**.",
          "",
          "**Conclusión (b):** a los 20 min quedan 32,4 mg (67,6 % disuelto). Observa que **no** es lineal: en los primeros 10 min se disolvieron 40 mg y en los siguientes 10, 27,6 mg, porque el área disponible va disminuyendo.",
          "",
          "**(c) Tiempo total.** W = 0 → t = W₀^(1/3) / k = 4,6416 / 0,0727 = **63,9 min**.",
          "",
          "**Conclusión (c):** se disuelve todo en ≈ 64 min. Si el modelo fuera de orden cero con la velocidad inicial (4 mg/min) se predeciría 25 min: la raíz cúbica refleja bien el 'frenado' por pérdida de superficie.",
        ].join("\n"),
      },
      {
        question: [
          "**Alimentos e interacciones.** Para cada caso indica el **sentido probable** del efecto sobre la biodisponibilidad (aumenta, disminuye, sin cambio importante) y el **mecanismo**: (a) tetraciclina tomada con leche; (b) griseofulvina con una comida grasa; (c) un fármaco muy soluble y muy permeable (Clase I) con una comida ligera; (d) una tableta con cubierta entérica tomada con una comida abundante.",
        ].join("\n"),
        solution: [
          "| Caso | Efecto probable | Mecanismo |",
          "|---|---|---|",
          "| (a) tetraciclina + leche | **Disminuye** | El **calcio** quela la tetraciclina y forma un complejo insoluble que no se absorbe |",
          "| (b) griseofulvina + comida grasa | **Aumenta** | La grasa estimula la secreción biliar; los **ácidos biliares solubilizan** el fármaco lipofílico (poco soluble) y suben la disolución |",
          "| (c) fármaco Clase I + comida ligera | **Sin cambio importante** | Ya está bien disuelto y se absorbe bien; sin factor limitante que el alimento pueda modificar (puede retrasar un poco el tmax) |",
          "| (d) entérica + comida abundante | **Retraso (tmax mayor)**, posible variabilidad | Retrasa el vaciamiento gástrico: la tableta tarda más en llegar al intestino, donde la cubierta se abre |",
          "",
          "**Conclusión:** los efectos de los alimentos dependen del **fármaco** y de la **forma farmacéutica**; no hay una regla única. Por eso los estudios de bioequivalencia especifican ayuno o con alimentos según la etiqueta del producto de referencia, y las formas de liberación modificada se estudian en ambas condiciones.",
        ].join("\n"),
      },
    ],
  },
};
