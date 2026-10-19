import type { ExerciseContent } from "./_schema";
import { fx } from "./bfc-helpers";

/**
 * BFC — Bloque Farmacocinética, parte A (Módulos 5–7, prof. Yolima Baena):
 * LADME y parámetros, modelos e IV en bolus, IV multidosis e infusión.
 * Capítulo de lectura + ejercicios resueltos. NO es una asignatura: lo importa `bfc.ts`.
 * Todos los números de los ejercicios están calculados y revisados con un script
 * independiente; son didácticos (no datos de un producto real).
 */
export const bfcFarmacocineticaA: Record<string, { chapter: string; exercises: ExerciseContent[] }> = {
  // ─────────────────────────────────────────────────────────────────────────
  "intro-farmacocinetica-ladme": {
    chapter: `#### Del esquema LADME a los números

En el Módulo 1 viste LADME como un viaje. Aquí cada etapa recibe su **mecanismo** y, sobre todo, su **parámetro**: lo que vuelve medible a la farmacocinética son cuatro números que describen al cuerpo frente a un fármaco — **volumen de distribución (Vd)**, **aclaramiento (Cl)**, **constante de eliminación (K)** y **vida media (t1/2)** — más el **ABC** y la **biodisponibilidad (F)** que ya conoces.

#### Absorción: cómo cruza el fármaco la membrana

* **Difusión pasiva:** a favor del gradiente de concentración, sin gasto de energía ni transportador; es el mecanismo de la mayoría de los fármacos y sigue la ley de Fick (más rápida con más gradiente, más superficie y más liposolubilidad). Es **no saturable**.
* **Difusión facilitada:** a favor del gradiente pero con **transportador**; saturable.
* **Transporte activo:** **contra** gradiente, con gasto de energía y transportador; **saturable** y competible (p. ej. levodopa por transportadores de aminoácidos).
* **Transporte por eflujo (P-gp y otros):** bombas que **devuelven** el fármaco al lumen intestinal y reducen la absorción (digoxina es sustrato de P-gp).
* **Vía paracelular:** por los espacios entre células, para moléculas pequeñas y polares.

Una guía rápida para anticipar si una molécula se absorbe bien por difusión es la **regla de los cinco de Lipinski** (1997): la absorción o permeabilidad tiende a ser pobre cuando la masa molecular supera 500, el log P supera 5, hay más de 5 donadores de enlace de hidrógeno o más de 10 aceptores. Es un **filtro estadístico** de desarrollo de fármacos, no una ley.

#### Distribución: adónde va y cuánto «espacio» ocupa

Tras entrar a la sangre, el fármaco se reparte según: **flujo sanguíneo** al tejido (los órganos muy irrigados —corazón, hígado, riñón, cerebro— reciben primero), **unión a proteínas** del plasma (albúmina para ácidos, α₁-glicoproteína ácida para bases) y **liposolubilidad**. Solo el fármaco **libre** (no unido) cruza membranas, se metaboliza y actúa.

El **volumen de distribución aparente (Vd)** es la relación entre la **cantidad total en el cuerpo** y la **concentración en plasma**:

${fx(
  "Vd = #{Cantidad de fármaco en el cuerpo (A)|Concentración plasmática (C)}",
)}

> Analogía: pones una cantidad conocida de colorante en un recipiente de forma desconocida, lo mezclas y mides cuán oscuro quedó el agua. Con la cantidad y la intensidad del color puedes calcular **cuánta agua parece haber** — aunque no veas el recipiente. Si el colorante se pega a las paredes (el fármaco se fija en los tejidos), el color del agua queda muy tenue y el volumen **aparente** resulta enorme, mayor que el recipiente real.

Por eso Vd **no es un volumen real**. Para una persona de 70 kg, el plasma son ≈ 3 L (0,04 L/kg), el agua extracelular ≈ 14–15 L (0,2 L/kg) y el agua corporal total ≈ 42 L (0,6 L/kg). Como orden de magnitud:

| Vd | Interpretación | Ejemplos (orden de magnitud) |
|---|---|---|
| ≈ 0,05–0,2 L/kg | Se queda sobre todo en plasma/extracelular; casi siempre muy unido a proteínas | warfarina (≈ 0,14 L/kg) |
| ≈ 0,5–1 L/kg | Se reparte en el agua corporal total | teofilina, paracetamol |
| ≫ 1 L/kg (varios L/kg o más) | Se **acumula en tejidos** (unión tisular, lipofilia) | digoxina (≈ 5–7 L/kg), amiodarona y cloroquina (decenas a cientos de L/kg) |

#### Metabolismo: transformar para eliminar

* **Fase I** (oxidación, reducción, hidrólisis): principalmente por las enzimas **CYP450** del hígado (CYP3A4 es la más importante en cantidad de sustratos).
* **Fase II** (conjugación con ácido glucurónico, sulfato, glutatión): añade un grupo muy polar que facilita la excreción.
* **Inducción** (rifampicina, carbamazepina) aumenta la actividad enzimática → baja la concentración del fármaco; **inhibición** (ketoconazol, ritonavir, jugo de toronja) la reduce → sube la concentración. Muchas interacciones graves son de este tipo.
* Algunos fármacos son **profármacos**: se activan por metabolismo.

#### Excreción

* **Renal:** suma de **filtración glomerular** (solo el fármaco libre; GFR ≈ 120 mL/min), **secreción tubular activa** y **reabsorción** pasiva: Cl_R = fu·GFR + secreción − reabsorción.
* **Biliar/fecal:** el fármaco pasa a la bilis; puede haber **recirculación enterohepática** (se reabsorbe en el intestino y prolonga la permanencia).
* **Otras:** pulmones (gases anestésicos), sudor, leche materna (menor importancia).

#### Los cuatro parámetros y cómo se relacionan

**Aclaramiento (Cl):** volumen de plasma que queda **completamente libre de fármaco por unidad de tiempo**. Es la medida directa de la capacidad del cuerpo para eliminar y se define a partir de la velocidad de eliminación:

${fx(
  "velocidad de eliminación = Cl · C",
)}

*Por qué:* si el cuerpo «limpia» Cl litros de plasma por hora y cada litro contiene C mg, cada hora salen Cl · C mg. Cl se mide en L/h (o mL/min). Los aclaramientos de los órganos **se suman**:

${fx(
  "Cl_{total} = Cl_{renal} + Cl_{hepático} + Cl_{otros}",
  "Cl_{renal} = f_{e} · Cl_{total}   (f_{e} = fracción excretada inalterada en orina)",
)}

**Constante de eliminación (K):** fracción del fármaco del cuerpo que se elimina por unidad de tiempo (h⁻¹). La velocidad de eliminación también es **K · A** (A = cantidad en el cuerpo). Igualando las dos expresiones:

${fx(
  "K · A = Cl · C   y   A = Vd · C   ⇒   K · Vd · C = Cl · C   ⇒   Cl = K · Vd",
)}

**Vida media (t1/2):** tiempo en que la concentración cae a la mitad. Para una eliminación de **primer orden**, sale de C = C₀·e^(−K·t) imponiendo C = C₀/2:

${fx(
  "#{1|2} = e^{−K · t_{1/2}}   ⇒   ln 2 = K · t_{1/2}   ⇒   t_{1/2} = #{0,693|K}",
  "t_{1/2} = #{0,693 · Vd|Cl}",
)}

La última forma es la más reveladora: **Cl y Vd son los parámetros «independientes»** (reflejan fisiología: capacidad de eliminar y espacio de distribución), mientras que **K y t1/2 son derivados**. Una vida media larga puede deberse a un Cl bajo **o** a un Vd muy grande: no son lo mismo clínicamente.

**ABC (IV):** de integrar C = C₀·e^(−K·t) desde 0 hasta ∞ se obtiene C₀/K; como C₀ = Dosis/Vd, queda:

${fx(
  "ABC = #{C_{0}|K} = #{Dosis|Vd · K} = #{Dosis|Cl}",
)}

#### Cuánto tarda en irse un fármaco (la regla de las 5 vidas medias)

Cada vida media se elimina la **mitad de lo que queda**: tras 1 vida media queda 50 %, tras 2 queda 25 %, tras 3 queda 12,5 %, tras 4 queda 6,25 %, tras 5 queda 3,125 %. Tras **≈ 5 vidas medias** se ha eliminado ≈ **97 %**, y por eso se acepta que el fármaco «prácticamente se fue» (y, en administración repetida, que se llegó a ≈ 97 % del estado estable). Para 90 %: 3,32 vidas medias; para 99 %: 6,64.

#### Local vs. sistémica y biodisponibilidad: el cierre del módulo

La **biodisponibilidad (F)** — fracción de la dosis que llega inalterada a la circulación sistémica — se estudió en el Módulo 2. Combina ahora los hilos: para una dosis oral, **F = Fa · Fg · Fh**, y la exposición total es **ABC = F · Dosis / Cl**. Si cambia la formulación, cambia F (biofarmacia); si cambia el paciente, cambian Cl y Vd (farmacocinética clínica).

#### En resumen

* **Vd = A/C** (volumen *aparente*, no real); **Cl = K · Vd**; **t1/2 = 0,693 · Vd/Cl**; **ABC = Dosis/Cl** (IV).
* **Cl y Vd** son independientes; **K y t1/2** dependen de ellos.
* Los aclaramientos de órganos **se suman**; **Cl_R = f_e · Cl_total**.
* **5 vidas medias ≈ 97 %** eliminado.
* Mecanismos de absorción: pasiva (no saturable), facilitada y activa (saturables), eflujo (P-gp).

#### Para profundizar

* Benet LZ, Zia-Amirhosseini P. Basic principles of pharmacokinetics. *Toxicol Pathol* 1995;23:115-123. DOI 10.1177/019262339502300203.
* Lipinski CA, Lombardo F, Dominy BW, Feeney PJ. Experimental and computational approaches to estimate solubility and permeability in drug discovery and development settings. *Adv Drug Deliv Rev* 1997;23:3-25. DOI 10.1016/S0169-409X(96)00423-1.
* Rowland M, Tozer TN. *Clinical Pharmacokinetics and Pharmacodynamics: Concepts and Applications*, 4.ª ed., 2011.
* Birkett DJ. *Farmacocinética fácil*. McGraw-Hill, 2005.`,
    exercises: [
      {
        question: [
          "**Parámetros a partir de dos mediciones.** Se administró un bolo IV de **500 mg**. Se midió **C = 8,0 mg/L a 1 h** y **C = 2,0 mg/L a 5 h** (modelo de un compartimento, eliminación de primer orden). Calcula (a) K, (b) t1/2, (c) C₀, (d) Vd, (e) Cl y (f) ABC₀→∞.",
        ].join("\n"),
        solution: [
          "**(a) K.**",
          "",
          "*Interpretación:* en la fase de eliminación, ln C baja linealmente con el tiempo; la pendiente entre dos puntos es −K.",
          "",
          "K = ln(C₁/C₂) / (t₂ − t₁) = ln(8,0 / 2,0) / (5 − 1) = ln 4 / 4 = 1,3863 / 4 = **0,3466 h⁻¹**.",
          "",
          "**Conclusión:** cada hora se elimina ≈ 34,7 % de lo que hay (instantáneamente).",
          "",
          "**(b) t1/2.** t1/2 = 0,693 / 0,3466 = **2,00 h**. (Comprobación: de 8,0 a 2,0 mg/L pasaron 4 h = 2 vidas medias: 8 → 4 → 2 ✓.)",
          "",
          "**(c) C₀ (concentración a t = 0).**",
          "",
          "*Interpretación:* extrapolamos hacia atrás desde t = 1 h: C₀ = C(1 h) · e^(+K·1).",
          "",
          "C₀ = 8,0 × e^(0,3466 × 1) = 8,0 × 1,4142 = **11,31 mg/L**.",
          "",
          "**(d) Vd.**",
          "",
          "*Interpretación:* Vd = cantidad total administrada IV / concentración inicial.",
          "",
          "Vd = 500 mg ÷ 11,31 mg/L = **44,2 L** (mg se cancela con mg; queda L).",
          "",
          "**Conclusión:** 44,2 L ≈ 0,63 L/kg en una persona de 70 kg: el fármaco se reparte en el agua corporal total.",
          "",
          "**(e) Cl.** Cl = K · Vd = 0,3466 h⁻¹ × 44,2 L = **15,3 L/h** (≈ 255 mL/min).",
          "",
          "**Conclusión:** el cuerpo limpia ≈ 15,3 L de plasma por hora.",
          "",
          "**(f) ABC₀→∞.** ABC = Dosis/Cl = 500 mg ÷ 15,32 L/h = **32,6 mg·h/L**. Comprobación: C₀/K = 11,31 ÷ 0,3466 = 32,6 ✓.",
          "",
          "**Conclusión:** la exposición total a esta dosis es 32,6 mg·h/L. Duplicar la dosis duplicaría el ABC (comportamiento lineal).",
        ].join("\n"),
      },
      {
        question: [
          "**¿Cuánto tarda en eliminarse?** Un fármaco tiene **t1/2 = 2,0 h**. (a) ¿Qué porcentaje de la dosis queda tras 1, 2, 3, 4 y 5 vidas medias? (b) ¿Cuánto tiempo hay que esperar para que se haya eliminado el 90 %? (c) ¿Y el 99 %?",
        ].join("\n"),
        solution: [
          "**(a) Fracción remanente.**",
          "",
          "*Interpretación:* cada vida media la cantidad se multiplica por ½; tras n vidas medias queda (½)ⁿ.",
          "",
          "| n | Queda | Eliminado | Tiempo |",
          "|---|---|---|---|",
          "| 1 | 50 % | 50 % | 2 h |",
          "| 2 | 25 % | 75 % | 4 h |",
          "| 3 | 12,5 % | 87,5 % | 6 h |",
          "| 4 | 6,25 % | 93,75 % | 8 h |",
          "| 5 | 3,125 % | 96,9 % | 10 h |",
          "",
          "**Conclusión:** tras 5 vidas medias (10 h) se ha eliminado ≈ 97 %.",
          "",
          "**(b) 90 % eliminado → queda 10 %.**",
          "",
          "(½)ⁿ = 0,10 → n = ln(0,10)/ln(0,5) = (−2,3026)/(−0,6931) = **3,32 vidas medias** → 3,32 × 2,0 h = **6,64 h**.",
          "",
          "**(c) 99 % eliminado → queda 1 %.**",
          "",
          "n = ln(0,01)/ln(0,5) = 6,64 vidas medias → 6,64 × 2,0 h = **13,3 h**.",
          "",
          "**Conclusión:** pasar de 90 % a 99 % cuesta el **doble** de tiempo (3,32 → 6,64 vidas medias). Esto se usa, por ejemplo, para saber cuánto esperar entre estudios cruzados (lavado) o antes de una cirugía.",
        ].join("\n"),
      },
      {
        question: [
          "**Aclaramiento renal y función renal.** Para el fármaco del ejercicio 1 (Cl = **15,32 L/h**, Vd = **44,2 L**) se sabe que **f_e = 0,40** (40 % se excreta inalterado por el riñón). (a) Calcula Cl_renal y Cl_no renal. (b) Si un paciente tiene la función renal reducida a la **mitad** (Cl_renal × 0,5) y la parte no renal no cambia, calcula el nuevo Cl, la variación porcentual y la nueva t1/2.",
        ].join("\n"),
        solution: [
          "**(a) Separar el aclaramiento.**",
          "",
          "*Interpretación:* f_e es la fracción del Cl total que corresponde al riñón; el resto es no renal (hígado, etc.).",
          "",
          "Cl_renal = f_e × Cl = 0,40 × 15,32 = **6,13 L/h**.",
          "",
          "Cl_no renal = (1 − f_e) × Cl = 0,60 × 15,32 = **9,19 L/h**.",
          "",
          "**(b) Con función renal a la mitad.**",
          "",
          "Cl_renal nuevo = 6,13 × 0,5 = 3,06 L/h.",
          "",
          "Cl nuevo = 3,06 + 9,19 = **12,26 L/h**.",
          "",
          "Variación = (12,26 − 15,32) / 15,32 = −0,20 → **−20 %**.",
          "",
          "t1/2 nueva = 0,693 × Vd / Cl = 0,693 × 44,2 / 12,26 = **2,50 h** (antes 2,00 h).",
          "",
          "**Conclusión:** aunque la función renal cayó 50 %, el aclaramiento total solo bajó 20 % porque el 60 % de la eliminación es no renal. Un fármaco con f_e alta (p. ej. 0,9) sería mucho más sensible a la insuficiencia renal y exigiría reducir la dosis. Por eso el químico farmacéutico mira siempre **f_e** al ajustar dosis en el paciente renal.",
        ].join("\n"),
      },
      {
        question: [
          "**Volumen de distribución y dosis de carga.** Un antibiótico tiene **Vd = 0,70 L/kg**. Para un paciente de **80 kg** se desea alcanzar de inmediato una concentración de **10 mg/L** con un bolo IV. (a) ¿Cuál es el Vd del paciente en litros? (b) ¿Qué dosis de carga se necesita? (c) Compara el Vd con el volumen plasmático (≈ 3 L) e interpreta.",
        ].join("\n"),
        solution: [
          "**(a) Vd en litros.** 0,70 L/kg × 80 kg = **56 L** (kg se cancela con kg).",
          "",
          "**(b) Dosis de carga.**",
          "",
          "*Interpretación:* de Vd = A/C se despeja A = Vd · C: la cantidad de fármaco que hay que tener en el cuerpo para lograr esa concentración.",
          "",
          "Dosis de carga = Vd × C = 56 L × 10 mg/L = **560 mg** (L se cancela con L).",
          "",
          "**Conclusión:** un bolo IV de 560 mg produce una concentración inicial de 10 mg/L (si se distribuye rápido y el modelo de un compartimento es válido).",
          "",
          "**(c) Comparar con el plasma.**",
          "",
          "56 L ÷ 3 L ≈ **19 veces** el volumen plasmático.",
          "",
          "**Conclusión:** el fármaco no se queda en la sangre: se distribuye a un espacio equivalente a casi 19 veces el plasma (≈ agua corporal total), lo que explica por qué se necesita una dosis alta para lograr una concentración plasmática modesta. En un paciente con edema o ascitis el Vd crece y la dosis de carga calculada con Vd normal quedaría corta.",
        ].join("\n"),
      },
      {
        question: [
          "**Opción múltiple.** Dos fármacos A y B tienen la misma vida media de 6 h. A tiene Vd = 20 L y B tiene Vd = 200 L. ¿Cuál afirmación es correcta?",
          "",
          "A) Tienen el mismo aclaramiento porque tienen la misma t1/2.",
          "B) B tiene un aclaramiento 10 veces mayor que A.",
          "C) A tiene un aclaramiento 10 veces mayor que B.",
          "D) No se puede comparar el aclaramiento sin conocer la dosis.",
        ].join("\n"),
        solution: [
          "**Respuesta: B.**",
          "",
          "**Interpretación:** t1/2 = 0,693·Vd/Cl → Cl = 0,693·Vd/t1/2. Con la misma t1/2, Cl es **proporcional a Vd**.",
          "",
          "Cl_A = 0,693 × 20 / 6 = **2,31 L/h**. Cl_B = 0,693 × 200 / 6 = **23,1 L/h** → B tiene un Cl 10 veces mayor.",
          "",
          "**Conclusión:** la vida media es una consecuencia de **dos** parámetros (Cl y Vd). B parece eliminarse igual de rápido, pero lo hace porque **limpia 10 veces más plasma por hora** mientras se reparte en un espacio 10 veces más grande. Mirar solo la t1/2 oculta esta diferencia. (D es falsa: Cl no depende de la dosis cuando la cinética es lineal.)",
        ].join("\n"),
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "modelos-pk-bolus-iv": {
    chapter: `#### Para qué sirve un modelo

El cuerpo es un sistema inmensamente complejo; un **modelo farmacocinético** lo reemplaza por una **simplificación matemática** que sea lo bastante buena para **predecir** concentraciones y **diseñar** dosis. No pretende ser la verdad anatómica: «un modelo es un mapa, no el territorio». Los modelos más usados son los **compartimentales**.

* **Compartimento:** conjunto de tejidos en los que el fármaco se distribuye de forma **rápida y uniforme** (cinéticamente homogéneos). No es un órgano; es un «cajón matemático».
* **Modelo mamilar:** un compartimento central (plasma y tejidos de equilibrio rápido) conectado a compartimentos periféricos; la eliminación sale del central.
* **Modelo no compartimental:** no asume forma; calcula ABC, Cl y tiempo medio de residencia directamente de los datos (la base de los estudios de bioequivalencia).

#### Cinética de orden cero y de primer orden

* **Orden cero:** el cuerpo elimina una **cantidad fija por hora**, sin importar cuánto haya (como un cajero que atiende 10 personas por hora aunque haya 100 en la fila). Ocurre cuando los procesos se saturan (alcohol a dosis altas).
* **Primer orden:** el cuerpo elimina una **fracción fija por hora** (como una fila donde cada hora se va el 30 % de los presentes). Es la cinética de la gran mayoría de fármacos a dosis terapéuticas.

#### Modelo de un compartimento, bolo IV: derivación completa

*Supuestos:* el fármaco se distribuye **instantáneamente** y de forma uniforme en un volumen Vd; la eliminación es de **primer orden**.

**Paso 1 — Ecuación diferencial.** La velocidad de cambio de la cantidad A en el cuerpo es proporcional a lo que hay:

${fx(
  "#{dA|dt} = − K · A",
)}

El signo menos indica que A disminuye; K es la constante de eliminación (h⁻¹).

**Paso 2 — Separar variables e integrar.** Pasamos dA/A a un lado y dt al otro e integramos desde A₀ (a t = 0) hasta A (a t):

${fx(
  "∫ #{dA|A} = − K ∫ dt   ⇒   ln A − ln A_{0} = − K · t   ⇒   A = A_{0} · e^{−K · t}",
)}

**Paso 3 — De cantidad a concentración.** Como A = Vd · C (y A₀ = Dosis):

${fx(
  "C = C_{0} · e^{−K · t}      con  C_{0} = #{Dosis|Vd}",
  "ln C = ln C_{0} − K · t",
)}

La segunda forma es una **recta** en un gráfico semilogarítmico (ln C contra t), de pendiente **−K** e intercepto ln C₀. Por eso la farmacocinética usa papel semilogarítmico: **convierte la curva en recta** y permite leer K con una regla.

**Paso 4 — Parámetros derivados** (ya los demostraste en el Módulo 5): t1/2 = 0,693/K, Cl = K·Vd, ABC = Dosis/Cl.

#### Cuando un compartimento no basta: modelo bicompartimental

Muchos fármacos muestran en la curva semilogarítmica **dos rectas**: una caída **rápida** inicial y luego una caída más **lenta**. Esto indica que el fármaco primero se **distribuye** del compartimento central al periférico (fase α) y después se **elimina** (fase β) con el sistema ya en equilibrio.

${fx(
  "C = A · e^{−α · t} + B · e^{−β · t}",
)}

* **α:** constante de la fase de distribución (rápida), **β:** constante de la fase de eliminación (lenta); α > β.
* **A y B:** interceptos de cada fase; A + B = C₀.
* Constantes de microvelocidad: **k₁₀** (eliminación desde el central), **k₁₂** (central → periférico) y **k₂₁** (periférico → central). Se relacionan así:

${fx(
  "k_{21} = #{A · β + B · α|A + B}",
  "k_{10} = #{α · β|k_{21}}",
  "k_{12} = α + β − k_{21} − k_{10}",
  "V_{c} = #{Dosis|A + B}      V_{ss} = V_{c} · (1 + #{k_{12}|k_{21}})",
)}

**Método de los residuales (pelado de la curva):** (1) Con los puntos **tardíos** (solo queda la fase β) se traza una recta en escala semilog; su pendiente da β y su intercepto da B. (2) Se **extrapola** esa recta a los tiempos tempranos y se **resta** de los datos observados: la diferencia (los residuales) pertenece solo a la fase α. (3) Se traza una recta con los residuales: pendiente = α, intercepto = A.

#### Farmacocinética lineal y no lineal

Una cinética es **lineal** cuando los parámetros (Cl, Vd, K) **no cambian con la dosis**: duplicar la dosis duplica la concentración y el ABC. Es la base de casi toda la teoría de este curso. Se **comprueba** dosis proporcionalidad: **ABC/Dosis constante** al subir la dosis.

La no linealidad aparece cuando se **satura** un proceso:

* **Metabolismo saturable** (fenitoína, etanol, ácido acetilsalicílico a dosis altas).
* **Unión saturable a proteínas** (valproato).
* **Transporte saturable** en absorción (levodopa, gabapentina) o secreción renal (penicilina).
* **Autoinducción** (carbamazepina): el fármaco aumenta su propia eliminación con el tiempo.

El modelo clásico es el de **Michaelis–Menten** (Wagner, 1973):

${fx(
  "velocidad de eliminación = #{V_{máx} · C|K_{m} + C}",
)}

* **V_máx:** velocidad máxima de eliminación (mg/h o mg/día) — la «capacidad» de la enzima.
* **K_m:** concentración a la que la velocidad es **la mitad** de V_máx (mg/L). No es una constante de eliminación.

*Los dos extremos:* si C ≪ K_m, el denominador ≈ K_m y la velocidad ≈ (V_máx/K_m)·C: **primer orden**, con K = V_máx/K_m (cinética lineal a concentraciones bajas). Si C ≫ K_m, el denominador ≈ C y la velocidad ≈ V_máx: **orden cero**. En medio, la cinética es **mixta** y **los parámetros dependen de la concentración**.

> Analogía: una caja con una sola fila de atención. Con pocos clientes, mientras más llegan más se atienden (proporcional). Cuando la fila llega a la capacidad máxima del cajero, no importa cuánta gente llegue: se atienden siempre los mismos por hora, y la fila crece.

**Consecuencia clínica en estado estable.** Si el fármaco se da a una velocidad R (mg/día), en estado estable lo que entra iguala lo que sale: R = V_máx·C_ss/(K_m + C_ss). Despejando:

${fx(
  "C_{ss} = #{K_{m} · R|V_{máx} − R}",
)}

Observa que cuando R **se acerca a V_máx** el denominador tiende a cero y C_ss **se dispara**; y si R ≥ V_máx, **no existe estado estable** (el fármaco se acumula sin límite). Por eso en la fenitoína un aumento pequeño de dosis puede causar toxicidad: la relación dosis–concentración no es una recta sino una curva que sube cada vez más rápido. Otra consecuencia: la **vida media aparente** crece con la concentración (t1/2,ap = 0,693·Vd·(K_m + C)/V_máx).

#### En resumen

* **Un compartimento, bolo IV:** C = C₀·e^(−Kt); ln C es una recta de pendiente −K; C₀ = Dosis/Vd.
* **Bicompartimental:** C = A·e^(−αt) + B·e^(−βt); se separan las fases con el **método de residuales**.
* **Lineal:** ABC/Dosis constante. **No lineal:** parámetros cambian con la dosis (saturación).
* **Michaelis–Menten:** C_ss = K_m·R/(V_máx − R); la dosis y la concentración **no son proporcionales**.

#### Para profundizar

* Wagner JG. Properties of the Michaelis-Menten equation and its integrated form which are useful in pharmacokinetics. *J Pharmacokinet Biopharm* 1973;1:103-121. DOI 10.1007/BF01059625.
* Ludden TM. Nonlinear pharmacokinetics: clinical implications. *Clin Pharmacokinet* 1991;20:429-446. DOI 10.2165/00003088-199120060-00001.
* Gibaldi M, Perrier D. *Pharmacokinetics*, 2.ª ed. Marcel Dekker, 1982.
* Hedaya MA. *Basic Pharmacokinetics*. CRC Press, 2007.`,
    exercises: [
      {
        question: [
          "**Predicciones con un compartimento.** Se administra un bolo IV de **300 mg** a un paciente con **Vd = 30 L** y **t1/2 = 4,0 h**. Calcula (a) C₀, (b) K, (c) la concentración a las 6 h, (d) el tiempo en el que la concentración baja a la mínima efectiva de **2,5 mg/L**, (e) Cl y (f) ABC.",
        ].join("\n"),
        solution: [
          "**(a) C₀.** C₀ = Dosis/Vd = 300 mg ÷ 30 L = **10 mg/L**.",
          "",
          "**(b) K.** K = 0,693 / t1/2 = 0,693 / 4,0 h = **0,1733 h⁻¹**.",
          "",
          "**(c) C a las 6 h.**",
          "",
          "*Interpretación:* aplicamos C = C₀·e^(−K·t).",
          "",
          "C(6) = 10 × e^(−0,1733 × 6) = 10 × e^(−1,040) = 10 × 0,3535 = **3,54 mg/L**.",
          "",
          "**Conclusión:** a las 6 h queda el 35 % de la concentración inicial.",
          "",
          "**(d) Tiempo hasta 2,5 mg/L.**",
          "",
          "*Interpretación:* despejamos t de C = C₀·e^(−Kt): t = ln(C₀/C) / K.",
          "",
          "t = ln(10 / 2,5) / 0,1733 = ln 4 / 0,1733 = 1,3863 / 0,1733 = **8,0 h**.",
          "",
          "**Conclusión:** la concentración baja de la CME a las 8 h (exactamente 2 vidas medias: 10 → 5 → 2,5); si el efecto debe mantenerse, la siguiente dosis debe darse **antes de las 8 h**.",
          "",
          "**(e) Cl.** Cl = K · Vd = 0,1733 × 30 = **5,20 L/h**.",
          "",
          "**(f) ABC.** ABC = Dosis/Cl = 300 mg ÷ 5,20 L/h = **57,7 mg·h/L** (= C₀/K = 10/0,1733 = 57,7 ✓).",
          "",
          "**Conclusión:** exposición total de 57,7 mg·h/L.",
        ].join("\n"),
      },
      {
        question: [
          "**Estimar K por regresión semilogarítmica.** Tras un bolo IV se obtuvieron estos datos: (t en h; C en mg/L): (1; 8,0), (2; 6,6), (4; 4,4), (6; 3,0), (8; 2,0). Calcula por mínimos cuadrados la pendiente de ln C contra t, y de ahí K, t1/2 y C₀.",
        ].join("\n"),
        solution: [
          "**Interpretación:** como ln C = ln C₀ − K·t es una recta, ajustamos y = ln C contra x = t y la pendiente es −K.",
          "",
          "**Paso 1 — Tabla de ln C.**",
          "",
          "| t (h) | C (mg/L) | y = ln C |",
          "|---|---|---|",
          "| 1 | 8,0 | 2,0794 |",
          "| 2 | 6,6 | 1,8871 |",
          "| 4 | 4,4 | 1,4816 |",
          "| 6 | 3,0 | 1,0986 |",
          "| 8 | 2,0 | 0,6931 |",
          "",
          "**Paso 2 — Promedios.** x̄ = (1+2+4+6+8)/5 = 4,2 h; ȳ = (2,0794+1,8871+1,4816+1,0986+0,6931)/5 = 7,2398/5 = 1,4480.",
          "",
          "**Paso 3 — Sumas de cuadrados.**",
          "",
          "Sxx = Σ(x − x̄)² = (−3,2)² + (−2,2)² + (−0,2)² + (1,8)² + (3,8)² = 10,24 + 4,84 + 0,04 + 3,24 + 14,44 = **32,80**.",
          "",
          "Sxy = Σ(x − x̄)(y − ȳ) = (−3,2)(0,6314) + (−2,2)(0,4391) + (−0,2)(0,0336) + (1,8)(−0,3494) + (3,8)(−0,7549) = −2,0205 − 0,9660 − 0,0067 − 0,6289 − 2,8686 = **−6,4907**.",
          "",
          "**Paso 4 — Pendiente e intercepto.** b = Sxy/Sxx = −6,4907/32,80 = **−0,1979 h⁻¹**; a = ȳ − b·x̄ = 1,4480 + 0,1979 × 4,2 = **2,2791**.",
          "",
          "**Conclusión:** K = 0,198 h⁻¹; t1/2 = 0,693/0,1979 = **3,50 h**; C₀ = e^2,2791 = **9,77 mg/L**.",
          "",
          "*Por qué se prefiere la regresión a dos puntos:* usa **todos** los datos y promedia el error de medición; con solo dos puntos, un error en cualquiera de ellos mueve la pendiente.",
        ].join("\n"),
      },
      {
        question: [
          "**Método de residuales (bicompartimental).** Tras un bolo IV de **560 mg** se midieron: (t, C): (0,25; 21,55), (0,5; 17,06), (1; 11,70), (2; 7,55), (3; 6,15), (4; 5,41), (6; 4,39), (8; 3,60), (10; 2,94), (12; 2,41) (h; mg/L). Determina β, B, α, A y después k₂₁, k₁₀, k₁₂, V_c, V_ss, Cl y ABC.",
        ].join("\n"),
        solution: [
          "**Paso 1 — Fase terminal (β y B).**",
          "",
          "*Interpretación:* a tiempos tardíos (≥ 6 h) la fase α ya se extinguió y la caída es de una sola exponencial.",
          "",
          "β = ln(3,60/2,41)/(12 − 8) = ln(1,4938)/4 = 0,4015/4 = **0,100 h⁻¹**. B = C(8)·e^(β·8) = 3,60 × e^0,8 = 3,60 × 2,2255 = **8,0 mg/L**.",
          "",
          "**Paso 2 — Residuales.** Extrapolamos la fase terminal a los tiempos tempranos (C_ext = 8,0·e^(−0,1·t)) y restamos del dato observado:",
          "",
          "| t (h) | C observada | C_ext (fase β) | Residual = C − C_ext | ln residual |",
          "|---|---|---|---|---|",
          "| 0,25 | 21,55 | 7,80 | 13,75 | 2,621 |",
          "| 0,5 | 17,06 | 7,61 | 9,45 | 2,246 |",
          "| 1 | 11,70 | 7,24 | 4,46 | 1,495 |",
          "| 2 | 7,55 | 6,55 | 1,00 | ≈ 0 |",
          "",
          "**Paso 3 — Fase α y A.** Con los 3 primeros residuales: α = (2,621 − 1,495)/(1 − 0,25) = 1,126/0,75 = **1,50 h⁻¹**; A = 13,75 × e^(1,5 × 0,25) = 13,75 × 1,455 = **20,0 mg/L**.",
          "",
          "**Conclusión:** C = 20·e^(−1,5t) + 8·e^(−0,1t). La fase α tiene t1/2 = 0,46 h (distribución rápida) y la β t1/2 = 6,9 h (eliminación).",
          "",
          "**Paso 4 — Constantes de microvelocidad.**",
          "",
          "k₂₁ = (A·β + B·α)/(A + B) = (20 × 0,1 + 8 × 1,5)/28 = 14/28 = **0,5 h⁻¹**.",
          "",
          "k₁₀ = α·β/k₂₁ = 1,5 × 0,1/0,5 = **0,3 h⁻¹**.",
          "",
          "k₁₂ = α + β − k₂₁ − k₁₀ = 1,6 − 0,5 − 0,3 = **0,8 h⁻¹**.",
          "",
          "**Paso 5 — Volúmenes y aclaramiento.**",
          "",
          "C₀ = A + B = 28 mg/L → V_c = 560/28 = **20 L**.",
          "",
          "V_ss = V_c·(1 + k₁₂/k₂₁) = 20 × (1 + 0,8/0,5) = 20 × 2,6 = **52 L**.",
          "",
          "Cl = k₁₀·V_c = 0,3 × 20 = **6,0 L/h**.",
          "",
          "ABC = A/α + B/β = 20/1,5 + 8/0,1 = 13,33 + 80,0 = **93,3 mg·h/L** (comprobación: Dosis/Cl = 560/6 = 93,3 ✓).",
          "",
          "**Conclusión:** el fármaco ocupa un volumen central de 20 L, pero en equilibrio se distribuye en 52 L; casi toda la exposición (80 de 93 mg·h/L) corresponde a la fase de eliminación lenta, lo que importa para los regímenes de dosificación.",
        ].join("\n"),
      },
      {
        question: [
          "**Fenitoína — cinética de Michaelis–Menten.** Para un paciente, V_máx = **500 mg/día** y K_m = **4 mg/L**. (a) Calcula la C_ss para velocidades de administración R = 300, 350, 400 y 450 mg/día. (b) ¿Cuántas veces sube la dosis y cuántas la concentración entre 300 y 450 mg/día? (c) ¿Qué R da C_ss = 10 mg/L? (d) ¿Qué pasa si R = 500 mg/día? (e) Vida media aparente a C = 1 y 20 mg/L con Vd = 50 L.",
        ].join("\n"),
        solution: [
          "**Interpretación:** en estado estable, lo que entra (R) iguala lo que sale (V_máx·C/(K_m + C)); de ahí C_ss = K_m·R/(V_máx − R).",
          "",
          "**(a)** Cálculos:",
          "",
          "| R (mg/día) | V_máx − R | C_ss = 4·R/(500 − R) |",
          "|---|---|---|",
          "| 300 | 200 | 4 × 300 / 200 = **6,0 mg/L** |",
          "| 350 | 150 | 4 × 350 / 150 = **9,3 mg/L** |",
          "| 400 | 100 | 4 × 400 / 100 = **16,0 mg/L** |",
          "| 450 | 50 | 4 × 450 / 50 = **36,0 mg/L** |",
          "",
          "**(b)** La dosis sube 450/300 = **1,5 veces (+50 %)**; la concentración sube 36/6 = **6 veces (+500 %)**.",
          "",
          "**Conclusión:** un aumento de dosis de 50 % multiplica por 6 la concentración: de un valor terapéutico (6 mg/L) a uno tóxico (36 mg/L). Con cinética lineal el mismo aumento solo habría dado 9 mg/L.",
          "",
          "**(c) R para C_ss = 10 mg/L.** De R = V_máx·C/(K_m + C) = 500 × 10/(4 + 10) = 5000/14 = **357 mg/día**.",
          "",
          "**(d) R = 500 mg/día.** C_ss = 4·500/(500 − 500) → división por cero: **no existe estado estable**; el fármaco se acumula indefinidamente porque se administra a la velocidad máxima de eliminación.",
          "",
          "**(e) Vida media aparente.** t1/2,ap = 0,693·Vd·(K_m + C)/V_máx.",
          "",
          "* C = 1 mg/L: 0,693 × 50 × (4 + 1)/500 = 0,3465 día = **8,3 h**.",
          "* C = 20 mg/L: 0,693 × 50 × (4 + 20)/500 = 1,663 día = **39,9 h**.",
          "",
          "**Conclusión:** la vida media se multiplica casi por 5 cuando la concentración sube: señal clásica de saturación. Por eso la fenitoína se ajusta con incrementos **pequeños** y con monitoreo de niveles.",
        ].join("\n"),
      },
      {
        question: [
          "**¿Lineal o no lineal?** Un estudio administró tres dosis orales a los mismos voluntarios y obtuvo los ABC: **Fármaco X:** 100 mg → 10 mg·h/L; 200 mg → 20 mg·h/L; 400 mg → 40 mg·h/L. **Fármaco Y:** 100 mg → 10; 200 mg → 28; 400 mg → 90 mg·h/L. Determina cuál es lineal y propón una causa para el comportamiento del otro.",
        ].join("\n"),
        solution: [
          "**Interpretación:** en cinética lineal el ABC es proporcional a la dosis; por tanto **ABC/Dosis es constante**.",
          "",
          "| Dosis (mg) | ABC X | ABC/Dosis X | ABC Y | ABC/Dosis Y |",
          "|---|---|---|---|---|",
          "| 100 | 10 | 0,100 | 10 | 0,100 |",
          "| 200 | 20 | 0,100 | 28 | 0,140 |",
          "| 400 | 40 | 0,100 | 90 | 0,225 |",
          "",
          "**Fármaco X:** ABC/Dosis constante (0,100) → **lineal**.",
          "",
          "**Fármaco Y:** ABC/Dosis **crece** (0,100 → 0,225): al duplicar la dosis la exposición **más que se duplica** → **no lineal**.",
          "",
          "**Causa probable:** como el ABC/Dosis aumenta, la eliminación (aclaramiento) **disminuye** al subir la concentración; es lo esperable de una **saturación del metabolismo o de la secreción renal** (Michaelis–Menten). (Si el ABC/Dosis disminuyera, habría que pensar en saturación de la absorción o del transporte de entrada.)",
          "",
          "**Conclusión:** el fármaco Y exige ajustes de dosis con mucho más cuidado; su ABC a 400 mg es 9 veces el de 100 mg con solo 4 veces la dosis.",
        ].join("\n"),
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "iv-multidosis-infusion": {
    chapter: `#### La pregunta clínica

Un bolo único es un caso de laboratorio; en la clínica casi siempre se **repite** la administración o se **mantiene** una infusión. Entonces la pregunta cambia: *¿qué concentración voy a tener cuando el tratamiento lleve horas o días, cuánto tiempo tarda en estabilizarse y cómo la ajusto?* La respuesta usa los parámetros del Módulo 5 y las ecuaciones de este.

#### Infusión intravenosa continua

El fármaco entra a velocidad **constante** k₀ (mg/h, de **orden cero**) y sale por eliminación de **primer orden**.

${fx(
  "#{dA|dt} = k_{0} − K · A",
)}

Entra una cantidad fija por hora (k₀) y sale una fracción de lo acumulado (K·A). Al principio entra más de lo que sale (A sube); al acumularse, sale cada vez más, hasta que **entrada = salida** y A se estabiliza.

**Estado estable (C_ss):** cuando dA/dt = 0 → k₀ = K·A_ss = K·Vd·C_ss = Cl·C_ss:

${fx(
  "C_{ss} = #{k_{0}|Cl} = #{k_{0}|K · Vd}",
)}

**Cómo sube hacia el estado estable.** La solución completa de la ecuación diferencial es:

${fx(
  "C(t) = #{k_{0}|Cl} · (1 − e^{−K · t}) = C_{ss} · (1 − e^{−K · t})",
)}

*Comprobación (sin integrar):* en t = 0 da C = 0 (partimos sin fármaco); cuando t → ∞, e^(−Kt) → 0 y C → C_ss ✓; y si derivas, dC/dt = C_ss·K·e^(−Kt), que es positiva y decrece hacia cero (la concentración sube cada vez más despacio) ✓.

**Cuánto tarda en llegar.** La fracción del estado estable alcanzada es **1 − e^(−K·t)**; como e^(−K·t) = (½)^(t/t1/2), tras n vidas medias es 1 − (½)ⁿ:

| Vidas medias | % del estado estable |
|---|---|
| 1 | 50 % |
| 2 | 75 % |
| 3 | 87,5 % |
| 3,32 | 90 % |
| 4 | 93,75 % |
| 5 | 96,9 % |

**Dato clave:** el tiempo para llegar al estado estable **depende solo de la vida media**, no de la velocidad de infusión. Duplicar k₀ duplica C_ss pero **no lo acelera**.

**Dosis de carga.** Si se esperan 5 vidas medias para llegar al nivel útil y la vida media es larga (horas o días), puede ser demasiado. Se da entonces un bolo inicial que «llena» de una vez el volumen de distribución hasta la concentración objetivo y se continúa con la infusión:

${fx(
  "Dosis de carga = C_{ss} · Vd",
  "C(t) = #{Dosis de carga|Vd} · e^{−K · t} + #{k_{0}|Cl} · (1 − e^{−K · t})",
)}

Si la dosis de carga es exactamente C_ss·Vd = k₀/K, los dos términos se **compensan** y C permanece **constante** en C_ss desde el primer instante: el bolo que decae y la infusión que sube se suman a un nivel plano.

**Al terminar la infusión.** Si se detiene en estado estable, la concentración **decae** como un bolo desde C_ss: C(t') = C_ss·e^(−K·t'), con t' el tiempo transcurrido desde el final.

#### Dosis IV múltiples (bolos repetidos)

Se administra la misma dosis D cada τ horas. Tras la primera dosis la concentración inicial es D/Vd, y decae como e^(−K·t). La segunda dosis llega cuando **todavía queda** fármaco de la primera; las concentraciones **se suman** (principio de superposición, válido en cinética lineal).

Después de la dosis n, justo antes de la siguiente, el remanente es la suma de las contribuciones decaídas de todas las dosis anteriores:

${fx(
  "C_{máx,n} = #{D|Vd} · (1 + e^{−K·τ} + e^{−2K·τ} + … + e^{−(n−1)K·τ}) = #{D|Vd} · #{1 − e^{−n·K·τ}|1 − e^{−K·τ}}",
)}

*De dónde sale:* es la suma de una **serie geométrica** de razón r = e^(−Kτ): 1 + r + r² + … + r^(n−1) = (1 − rⁿ)/(1 − r). Cuando n → ∞, rⁿ → 0, y la serie converge a **1/(1 − r)**:

${fx(
  "R = #{1|1 − e^{−K·τ}}                         (factor de acumulación)",
  "C_{máx,ss} = #{D|Vd} · R = #{D|Vd · (1 − e^{−K·τ})}",
  "C_{mín,ss} = C_{máx,ss} · e^{−K·τ}",
  "C_{ss,prom} = #{D|Cl · τ}",
)}

* **R** indica cuántas veces mayor es el nivel de estado estable que el de la primera dosis. Si **τ = t1/2**, R = 2; si **τ ≪ t1/2**, R es grande (mucha acumulación); si **τ ≫ t1/2**, R ≈ 1 (casi no se acumula).
* **C_ss,prom:** en estado estable el ABC durante un intervalo es igual al ABC₀→∞ de **una** dosis (D/Cl); dividido entre τ da el promedio. Es la misma relación **entrada = salida** de la infusión (D/τ = velocidad media de entrada).
* **Fluctuación:** C_máx,ss − C_mín,ss. Se reduce con τ más corto (dosis más pequeñas y más frecuentes) y es el compromiso entre comodidad y estabilidad.

**Tiempo al estado estable:** igual que en la infusión, depende solo de t1/2: ≈ 4–5 vidas medias, **sin importar la dosis ni el intervalo**.

**Dosis de carga en dosis múltiples:** para alcanzar el pico del estado estable desde la primera dosis, la carga debe producir D_carga/Vd = C_máx,ss, es decir:

${fx(
  "D_{carga} = D · R = #{D|1 − e^{−K·τ}}",
)}

Con τ = t1/2, R = 2: la carga es el **doble** de la dosis de mantenimiento (regla práctica muy usada).

**Diseñar un régimen:** para una concentración promedio objetivo, la **velocidad de mantenimiento** necesaria es C_objetivo·Cl; se reparte en dosis D = C_objetivo·Cl·τ. Se escoge τ para que C_mín,ss ≥ CME y C_máx,ss ≤ CMT.

**Terapia combinada bolo + infusión:** la concentración total es la **suma** de los dos aportes (superposición): un bolo que decae más una infusión que sube; se diseña para que se compensen y quede plana.

**Una advertencia moderna:** para formas de liberación modificada la acumulación depende no solo de la eliminación sino también de la absorción; Sahin y Benet (2008) propusieron la **vida media operacional de dosis múltiples** como el parámetro correcto para predecir la acumulación en esos casos.

#### En resumen

* **Infusión:** C_ss = k₀/Cl; C(t) = C_ss(1 − e^(−Kt)); ≈ 5 t1/2 para 97 %; la dosis de carga = C_ss·Vd.
* **Multidosis IV:** R = 1/(1 − e^(−Kτ)); C_máx,ss = D/(Vd(1 − e^(−Kτ))); C_mín,ss = C_máx,ss·e^(−Kτ); **C_ss,prom = D/(Cl·τ)**.
* El estado estable llega en ≈ 4–5 t1/2 **independiente** de dosis e intervalo.
* La carga en dosis múltiples = D·R; con τ = t1/2, R = 2.

#### Para profundizar

* Sahin S, Benet LZ. The operational multiple dosing half-life: a key to defining drug accumulation in patients and to designing extended release dosage forms. *Pharm Res* 2008;25:2869-2877. DOI 10.1007/s11095-008-9787-9.
* Shargel L, Yu ABC. *Applied Biopharmaceutics and Pharmacokinetics*, 7.ª ed., 2016 (caps. de infusión IV y dosis múltiples).
* Aguilar RA. *Biofarmacia y farmacocinética. Ejercicios y problemas resueltos*, 2.ª ed., 2014.`,
    exercises: [
      {
        question: [
          "**Infusión continua.** Un fármaco tiene **K = 0,10 h⁻¹** y **Vd = 75 L** (Cl = 7,5 L/h). Se infunde a **k₀ = 40 mg/h**. Calcula (a) C_ss, (b) la concentración a las 12 h, (c) el tiempo para alcanzar el 90 % de C_ss, (d) la dosis de carga para estar de inmediato en C_ss.",
        ].join("\n"),
        solution: [
          "**(a) C_ss.**",
          "",
          "*Interpretación:* en estado estable lo que entra (k₀) iguala lo que sale (Cl·C_ss).",
          "",
          "C_ss = k₀/Cl = 40 mg/h ÷ 7,5 L/h = **5,33 mg/L** (h se cancela con h).",
          "",
          "**(b) C a las 12 h.**",
          "",
          "C(12) = C_ss·(1 − e^(−K·t)) = 5,33 × (1 − e^(−0,10 × 12)) = 5,33 × (1 − e^(−1,2)) = 5,33 × (1 − 0,3012) = 5,33 × 0,6988 = **3,73 mg/L**.",
          "",
          "**Conclusión:** a las 12 h se ha alcanzado el 70 % del estado estable (12 h ≈ 1,7 vidas medias, con t1/2 = 6,93 h).",
          "",
          "**(c) Tiempo al 90 %.**",
          "",
          "1 − e^(−K·t) = 0,90 → e^(−K·t) = 0,10 → t = ln(10)/K = 2,3026/0,10 = **23,0 h**.",
          "",
          "**Conclusión:** son 3,32 vidas medias (3,32 × 6,93 h = 23 h). Si el efecto se necesita antes, hay que dar una carga.",
          "",
          "**(d) Dosis de carga.**",
          "",
          "*Interpretación:* para estar de entrada en C_ss hay que «llenar» el volumen de distribución hasta esa concentración: carga = C_ss × Vd.",
          "",
          "Carga = 5,33 mg/L × 75 L = **400 mg**. (Comprobación: k₀/K = 40/0,10 = 400 mg ✓.)",
          "",
          "**Conclusión:** un bolo de 400 mg seguido de la infusión de 40 mg/h mantiene 5,33 mg/L desde el primer minuto: el bolo que se elimina se compensa exactamente con el aporte creciente de la infusión.",
        ].join("\n"),
      },
      {
        question: [
          "**Diseñar una infusión y suspenderla.** Un antiarrítmico tiene **Cl = 6 L/h** y **Vd = 50 L**. Se desea una **C_ss = 12 mg/L**. Calcula (a) K y t1/2, (b) la velocidad de infusión, (c) la dosis de carga, (d) el tiempo hasta el 95 % de C_ss sin carga, (e) cuánto tarda la concentración en caer a **4 mg/L** si se suspende la infusión en estado estable.",
        ].join("\n"),
        solution: [
          "**(a)** K = Cl/Vd = 6/50 = **0,12 h⁻¹**; t1/2 = 0,693/0,12 = **5,78 h**.",
          "",
          "**(b) Velocidad de infusión.** De C_ss = k₀/Cl → k₀ = C_ss × Cl = 12 mg/L × 6 L/h = **72 mg/h**.",
          "",
          "**(c) Dosis de carga.** Carga = C_ss × Vd = 12 × 50 = **600 mg**.",
          "",
          "**(d) Tiempo al 95 % sin carga.** 1 − e^(−Kt) = 0,95 → t = ln(20)/0,12 = 2,9957/0,12 = **25,0 h**.",
          "",
          "**Conclusión:** sin carga se tardaría un día entero en llegar a casi el nivel objetivo: clínicamente inaceptable para una arritmia; de ahí la carga.",
          "",
          "**(e) Caída tras suspender.** C(t') = C_ss·e^(−K·t') → t' = ln(C_ss/C)/K = ln(12/4)/0,12 = ln 3/0,12 = 1,0986/0,12 = **9,16 h**.",
          "",
          "**Conclusión:** tras detener la infusión, el nivel baja de 12 a 4 mg/L en ≈ 9,2 h (1,58 vidas medias). Esto indica cuánto esperar antes de cambiar de tratamiento.",
        ].join("\n"),
      },
      {
        question: [
          "**IV multidosis.** Un paciente recibe **200 mg IV** cada **8 h**. El fármaco tiene **Vd = 40 L** y **t1/2 = 6,0 h**. Calcula (a) K, (b) la concentración tras la primera dosis y su valor justo antes de la segunda, (c) R, (d) C_máx,ss y C_mín,ss, (e) C_ss,prom, (f) la dosis de carga para estar de inmediato en C_máx,ss.",
        ].join("\n"),
        solution: [
          "**(a) K.** K = 0,693/6,0 = **0,1155 h⁻¹**; Cl = K·Vd = 0,1155 × 40 = 4,62 L/h.",
          "",
          "**(b) Primera dosis.**",
          "",
          "C inicial = D/Vd = 200/40 = **5,0 mg/L**. A las 8 h: 5,0 × e^(−0,1155 × 8) = 5,0 × e^(−0,924) = 5,0 × 0,3969 = **1,98 mg/L** justo antes de la segunda dosis.",
          "",
          "**Conclusión:** con τ = 8 h queda un residuo de 1,98 mg/L que se **suma** al pico siguiente; por eso hay acumulación.",
          "",
          "**(c) R.** R = 1/(1 − e^(−K·τ)) = 1/(1 − 0,3969) = 1/0,6031 = **1,66**.",
          "",
          "**(d) Estado estable.** C_máx,ss = (D/Vd)·R = 5,0 × 1,658 = **8,29 mg/L**. C_mín,ss = 8,29 × e^(−0,924) = 8,29 × 0,3969 = **3,29 mg/L**.",
          "",
          "**(e) C_ss,prom.** D/(Cl·τ) = 200 mg ÷ (4,62 L/h × 8 h) = 200/36,96 = **5,41 mg/L** (h se cancela; mg/L).",
          "",
          "**Conclusión:** en estado estable la concentración oscila entre 3,29 y 8,29 mg/L, con promedio 5,41 mg/L. La concentración del estado estable es 1,66 veces la de la primera dosis.",
          "",
          "**(f) Carga.** D_carga = D × R = 200 × 1,658 = **332 mg** (da un pico inicial de 332/40 = 8,29 mg/L ✓).",
        ].join("\n"),
      },
      {
        question: [
          "**Ajustar el intervalo y la dosis.** Con el mismo fármaco del ejercicio anterior (Vd = 40 L, K = 0,1155 h⁻¹): (a) ¿qué ocurre si se cambia a **200 mg cada 12 h** (calcula R, C_máx,ss, C_mín,ss, C_prom)? (b) ¿Qué dosis cada 8 h da una **C_ss,prom = 8 mg/L**?",
        ].join("\n"),
        solution: [
          "**(a) τ = 12 h.**",
          "",
          "e^(−K·τ) = e^(−0,1155 × 12) = e^(−1,386) = **0,2500** (exactamente 2 vidas medias).",
          "",
          "R = 1/(1 − 0,25) = **1,333**. C_máx,ss = 5,0 × 1,333 = **6,67 mg/L**. C_mín,ss = 6,67 × 0,25 = **1,67 mg/L**. C_ss,prom = 200 ÷ (4,62 × 12) = 200/55,44 = **3,61 mg/L**.",
          "",
          "**Conclusión:** al espaciar la dosis se reduce la acumulación (R de 1,66 a 1,33), el promedio baja (5,41 → 3,61 mg/L) y **la fluctuación relativa aumenta** (el valle cae a 1,67 mg/L, que puede estar bajo la CME). Más tiempo entre dosis = valles más bajos.",
          "",
          "**(b) Dosis para C_ss,prom = 8 mg/L, cada 8 h.**",
          "",
          "*Interpretación:* de C_ss,prom = D/(Cl·τ) se despeja D = C_ss,prom × Cl × τ.",
          "",
          "D = 8 mg/L × 4,62 L/h × 8 h = **295,7 mg ≈ 300 mg** (L y h se cancelan).",
          "",
          "**Conclusión:** una dosis práctica de 300 mg cada 8 h daría C_ss,prom = 300/(4,62 × 8) = 8,1 mg/L. En la práctica se redondea a una presentación disponible y se verifican valle y pico con la ventana terapéutica.",
        ].join("\n"),
      },
      {
        question: [
          "**Opción múltiple.** Un paciente recibe una infusión continua que alcanza una concentración estable de 4 mg/L. Un médico duplica la velocidad de infusión. ¿Qué ocurre?",
          "",
          "A) El nuevo estado estable (8 mg/L) se alcanza en la mitad del tiempo.",
          "B) El nuevo estado estable es 8 mg/L y se alcanza en el mismo tiempo (≈ 5 vidas medias).",
          "C) El nuevo estado estable es 8 mg/L y tarda el doble.",
          "D) La concentración no cambia: el aclaramiento compensa.",
        ].join("\n"),
        solution: [
          "**Respuesta: B.**",
          "",
          "**Interpretación:** C_ss = k₀/Cl: es **proporcional** a la velocidad de infusión; duplicar k₀ duplica C_ss (4 → 8 mg/L), si la cinética es lineal.",
          "",
          "El **tiempo** para llegar a una fracción del nuevo estado estable depende solo de la fracción (1 − e^(−Kt)), es decir, de la **vida media**, no de k₀: de 4 a 8 mg/L se tarda ≈ 5 t1/2 igual que de 0 a 4. A y C son falsas; D es falsa en cinética lineal.",
          "",
          "**Conclusión:** subir la velocidad **no acelera** la llegada al estado estable; para llegar antes al nuevo nivel hay que dar un bolo adicional (la diferencia de nivel × Vd). Y si el fármaco fuera de cinética no lineal (fenitoína), duplicar la velocidad **más que duplicaría** la concentración.",
        ].join("\n"),
      },
    ],
  },
};
