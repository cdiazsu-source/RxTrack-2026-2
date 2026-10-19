import type { ExerciseContent } from "./_schema";
import { fx } from "./bfc-helpers";

/**
 * BFC — Bloque Farmacocinética, parte B (Módulos 8–10, prof. Yolima Baena):
 * absorción extravascular (un compartimento), bioequivalencia/SCB, normativa y
 * talleres. Capítulo de lectura + ejercicios resueltos. NO es una asignatura: lo
 * importa `bfc.ts`.
 *
 * Fuentes normativas leídas en su texto: Resolución 1124 de 2016 (Anexo Técnico 1; el
 * Anexo 2, la lista de medicamentos, solo se menciona por ejemplos), ICH M9
 * (EMA/CHMP/ICH/493213/2018, 2020) y la guía EMA de bioequivalencia
 * (CPMP/EWP/QWP/1401/98 Rev. 1, 2010). Donde dos fuentes difieren se dice. Los números
 * de los ejercicios son didácticos, calculados y revisados con un script.
 */
export const bfcFarmacocineticaB: Record<string, { chapter: string; exercises: ExerciseContent[] }> = {
  // ─────────────────────────────────────────────────────────────────────────
  "absorcion-un-compartimento": {
    chapter: `#### Por qué hace falta un modelo nuevo

En el bolo IV, el fármaco entra de golpe: la concentración es máxima en t = 0 y solo baja. Por cualquier otra vía (oral, IM, SC, transdérmica) el fármaco debe **absorberse**: la concentración **sube**, llega a un pico y luego **baja**. El modelo de un compartimento con absorción de primer orden describe esa curva con solo tres constantes que ya conoces o casi: **ka** (absorción), **K** (eliminación) y **Vd** (distribución), más **F**, la biodisponibilidad.

> Analogía de la tina (otra vez): ahora la llave **no abre de golpe** sino que gotea más fuerte al principio y se va cerrando. Mientras la llave aporta más agua de la que el desagüe saca, el nivel sube; cuando la llave casi se cierra, manda el desagüe y el nivel baja. El **pico** ocurre en el instante en que lo que entra iguala a lo que sale.

#### Derivación completa (paso a paso)

**Supuestos:** (1) el fármaco se absorbe desde el sitio de administración por un proceso de **primer orden** (constante ka); (2) en el cuerpo se comporta como **un compartimento** (Vd); (3) se elimina por **primer orden** (K); (4) una fracción F de la dosis llega a la circulación.

**Paso 1 — Fármaco que queda por absorber.** Sea A_ab la cantidad en el sitio de absorción. Como se absorbe una fracción constante por hora:

${fx(
  "#{dA_{ab}|dt} = − ka · A_{ab}      ⇒      A_{ab}(t) = F · D · e^{−ka · t}",
)}

(Se escribe F·D porque solo esa parte de la dosis llegará a la sangre.)

**Paso 2 — Balance en el cuerpo.** La cantidad en el cuerpo A cambia por lo que entra (la velocidad de absorción, ka·A_ab) menos lo que sale (K·A):

${fx(
  "#{dA|dt} = ka · F · D · e^{−ka · t} − K · A",
)}

**Paso 3 — Solución.** Resolviendo esta ecuación diferencial lineal (con la técnica del factor integrante, que se vio en cálculo) se obtiene:

${fx(
  "A(t) = #{ka · F · D|ka − K} · (e^{−K·t} − e^{−ka·t})",
  "C(t) = #{ka · F · D|Vd · (ka − K)} · (e^{−K·t} − e^{−ka·t})            (ecuación de Bateman)",
)}

*Comprobación sin integrar:* en t = 0, e⁰ − e⁰ = 0 → C = 0 ✓ (no hay fármaco). Derivando en t = 0 se obtiene dA/dt = ka·F·D, que es la velocidad de absorción inicial ✓. Cuando t → ∞ ambas exponenciales → 0 y C → 0 ✓. La curva es una **diferencia de dos exponenciales**: la de ka domina al principio (sube) y la de K al final (baja).

**Paso 4 — El pico (tmax y Cmax).** El pico ocurre cuando dC/dt = 0, es decir, cuando la velocidad de absorción iguala la de eliminación:

${fx(
  "dC/dt = 0  ⇒  K · e^{−K·t} = ka · e^{−ka·t}  ⇒  e^{(ka − K)·t} = #{ka|K}",
  "t_{max} = #{ln(ka/K)|ka − K}",
  "C_{max} = #{F · D|Vd} · e^{−K · t_{max}}",
)}

(Para llegar a la última forma: en tmax se cumple ka·e^(−ka·tmax) = K·e^(−K·tmax); al sustituir en C, los factores (ka−K) se cancelan y queda solo la exponencial de eliminación.)

**Paso 5 — El ABC.** Integrando C desde 0 hasta ∞:

${fx(
  "ABC = #{ka · F · D|Vd · (ka − K)} · (#{1|K} − #{1|ka}) = #{F · D|Vd · K} = #{F · D|Cl}",
)}

**Resultado importante:** el ABC **no depende de ka**. La velocidad de absorción cambia **la forma** de la curva (Cmax y tmax) pero **no el área**: la magnitud de la absorción es F; la velocidad es ka. Por eso la bioequivalencia exige comparar ABC *y* Cmax: son dos parámetros que miden cosas distintas.

#### Qué le pasa a la curva si cambia un parámetro (K = 0,2 h⁻¹, F·D/Vd = 10 mg/L)

| ka (h⁻¹) | tmax (h) | Cmax (mg/L) |
|---|---|---|
| 0,5 | 3,05 | 5,43 |
| 1,0 | 2,01 | 6,69 |
| 1,5 | 1,55 | 7,33 |
| 3,0 | 0,97 | 8,24 |
| 6,0 | 0,59 | 8,89 |

A mayor ka, el pico **se adelanta y sube**, con el **mismo ABC** (= F·D/(Vd·K) = 50 mg·h/L). Y si F baja a la mitad, **Cmax y ABC se reducen a la mitad**, pero **tmax no cambia** (porque tmax solo depende de ka y K).

#### Tiempo de latencia (tlag)

Si existe un retraso antes de que empiece la absorción (disolución, vaciamiento gástrico, cubiertas entéricas), se reemplaza t por (t − tlag) en todas las ecuaciones. Se nota porque la curva **no parte de cero en t = 0** sino un rato después.

#### Cómo se obtienen ka, K y los demás parámetros de los datos

**1) Constante de eliminación K.** La fase terminal es una recta en semilog (cuando ya terminó la absorción): su pendiente es −K, igual que antes.

**2) Método de los residuales (feathering) para ka.**

1. Con los puntos tardíos, traza la recta terminal: da **K** y su intercepto **B₀ = ka·F·D/(Vd·(ka−K))**.
2. Extrapola esa recta a los tiempos tempranos y calcula, para cada tiempo temprano, **C_extrapolada − C_observada** (el residual).
3. En semilog, el residual es una recta de pendiente **−ka**.
4. Con B₀, K y ka puedes despejar **Vd/F = D·(ka−K)/(ka·B₀)** — por vía oral solo se identifican **Vd/F** y **Cl/F** (no por separado), porque F es desconocida si no hay dato IV.

**3) Método de Wagner–Nelson** (modelo-independiente para la absorción; Wagner y Nelson, 1963): estima la **fracción absorbida** a cada tiempo sin asumir un orden de absorción:

${fx(
  "FA(t) = #{C(t) + K · ABC_{0→t}|K · ABC_{0→∞}}",
  "fracción por absorber = 1 − FA(t)",
)}

*Por qué funciona:* lo absorbido hasta t es lo que está en el cuerpo (Vd·C) **más** lo ya eliminado (Cl·ABC₀→t = K·Vd·ABC₀→t); la absorción total se alcanza cuando C → 0 y el ABC llega a ABC₀→∞. Dividiendo y simplificando Vd se obtiene la fórmula. Si la absorción es de primer orden, **ln(1 − FA)** contra t da una recta de pendiente **−ka**. Otra opción más general (para modelos de dos compartimentos) es el método de **Loo–Riegelman** (1968).

**4) Biodisponibilidad absoluta.** Si se tiene el ABC IV: F = (ABC_oral/Dosis_oral)/(ABC_IV/Dosis_IV).

#### Flip-flop: cuando la absorción es más lenta que la eliminación

Normalmente ka > K, y la pendiente terminal es −K. Pero en algunas formas de **liberación sostenida** (o con absorción muy lenta) puede ocurrir ka < K: entonces el paso lento que gobierna la cola es la **absorción**, y la pendiente terminal es −ka. Los papeles de ka y K se **intercambian** («flip-flop»; Boxenbaum, 1998). La trampa: si interpretas la pendiente terminal como K, obtienes una vida media **falsamente larga**. La única forma segura de saberlo es tener **datos IV** (o de una solución oral rápida) del mismo fármaco, que dan el K verdadero.

#### Lo que no debes olvidar de este modelo

* Describe bien fármacos que se distribuyen rápido y se eliminan por primer orden.
* No explica fármacos con distribución lenta (biexponencial) ni absorción por transporte saturable.
* Para fármacos de bioequivalencia se usan métodos **no compartimentales** (ABC por trapecios, Cmax y tmax directamente de los datos), que no necesitan este modelo.

#### En resumen

* **C = [ka·F·D/(Vd(ka−K))]·(e^(−Kt) − e^(−ka·t))**; **tmax = ln(ka/K)/(ka−K)**; **Cmax = (F·D/Vd)·e^(−K·tmax)**; **ABC = F·D/Cl**.
* ka cambia la **forma** (Cmax, tmax), no el ABC; F cambia el **tamaño** (Cmax y ABC), no el tmax.
* Métodos: **residuales** (ka), **Wagner–Nelson** (fracción absorbida), pendiente terminal (K), **IV** para F.
* **Flip-flop:** ka < K → la pendiente terminal es ka.

#### Para profundizar

* Wagner JG, Nelson E. Per cent absorbed time plots derived from blood level and/or urinary excretion data. *J Pharm Sci* 1963;52:610-611. DOI 10.1002/jps.2600520629.
* Wagner JG, Nelson E. Kinetic analysis of blood levels and urinary excretion in the absorptive phase after single doses of drug. *J Pharm Sci* 1964;53:1392-1403. DOI 10.1002/jps.2600531126.
* Loo JCK, Riegelman S. New method for calculating the intrinsic absorption rate of drugs. *J Pharm Sci* 1968;57:918-928. DOI 10.1002/jps.2600570602.
* Shargel L, Yu ABC. *Applied Biopharmaceutics and Pharmacokinetics*, 7.ª ed., 2016 (cap. de absorción oral).
* Boxenbaum H. Pharmacokinetic tricks and traps: flip-flop models. *J Pharm Pharm Sci* 1998;1(3):90-91.`,
    exercises: [
      {
        question: [
          "**Parámetros del modelo con absorción.** Una dosis oral de **500 mg** con **F = 0,80**, **Vd = 40 L**, **ka = 1,5 h⁻¹** y **K = 0,20 h⁻¹**. Calcula (a) tmax, (b) Cmax, (c) ABC₀→∞ y (d) verifica Cmax con la ecuación completa.",
        ].join("\n"),
        solution: [
          "**Interpretación previa:** F·D = 0,80 × 500 = 400 mg llegan a la sangre; F·D/Vd = 400/40 = 10 mg/L es la «concentración máxima posible» si todo estuviera en el compartimento a la vez.",
          "",
          "**(a) tmax.**",
          "",
          "tmax = ln(ka/K)/(ka − K) = ln(1,5/0,20)/(1,5 − 0,20) = ln(7,5)/1,30 = 2,0149/1,30 = **1,55 h**.",
          "",
          "**Conclusión:** el pico ocurre ≈ 1 h 33 min después de la dosis.",
          "",
          "**(b) Cmax.**",
          "",
          "Cmax = (F·D/Vd)·e^(−K·tmax) = 10 × e^(−0,20 × 1,55) = 10 × e^(−0,310) = 10 × 0,7334 = **7,33 mg/L**.",
          "",
          "**(c) ABC.**",
          "",
          "ABC = F·D/(Vd·K) = 400/(40 × 0,20) = 400/8,0 = **50,0 mg·h/L** (Cl = K·Vd = 8 L/h; ABC = F·D/Cl = 400/8 ✓).",
          "",
          "**(d) Verificación.** C(1,55) = [ka·F·D/(Vd(ka−K))]·(e^(−K·t) − e^(−ka·t)) = [1,5 × 10/1,3] × (e^(−0,31) − e^(−2,325)) = 11,538 × (0,7334 − 0,0978) = 11,538 × 0,6356 = **7,33 mg/L** ✓.",
          "",
          "**Conclusión:** las dos formas coinciden. Cmax = 7,33 mg/L a 1,55 h; exposición total 50 mg·h/L.",
        ].join("\n"),
      },
      {
        question: [
          "**Método de residuales.** Tras una dosis oral de **500 mg** se midieron (t en h; C en mg/L): (0,25; 3,05), (0,5; 4,99), (1; 6,87), (1,5; 7,33), (2; 7,16), (3; 6,20), (4; 5,16), (6; 3,47), (8; 2,33), (12; 1,05), (16; 0,47), (24; 0,09). Calcula K, ka y el volumen aparente Vd/F.",
        ].join("\n"),
        solution: [
          "**Paso 1 — K de la fase terminal.**",
          "",
          "*Interpretación:* a t ≥ 6 h la absorción ya terminó; los puntos caen en una recta semilog de pendiente −K.",
          "",
          "K = ln(3,47/0,47)/(16 − 6) = ln(7,383)/10 = 1,9992/10 = **0,200 h⁻¹**. Intercepto: B₀ = 3,47 × e^(0,2 × 6) = 3,47 × 3,3201 = **11,52 mg/L**.",
          "",
          "**Paso 2 — Residuales (fase de absorción).**",
          "",
          "| t (h) | C_extrapolada = 11,52·e^(−0,2t) | C_observada | Residual | ln residual |",
          "|---|---|---|---|---|",
          "| 0,25 | 10,96 | 3,05 | 7,91 | 2,068 |",
          "| 0,5 | 10,42 | 4,99 | 5,43 | 1,693 |",
          "| 1 | 9,43 | 6,87 | 2,56 | 0,941 |",
          "| 1,5 | 8,54 | 7,33 | 1,21 | 0,186 |",
          "",
          "**Paso 3 — ka.** Pendiente de ln residual contra t: (0,186 − 2,068)/(1,5 − 0,25) = −1,882/1,25 = −1,505 → **ka = 1,50 h⁻¹**.",
          "",
          "**Conclusión:** la absorción es 7,5 veces más rápida que la eliminación (ka/K = 7,5), por eso la fase terminal es la de eliminación (no hay flip-flop).",
          "",
          "**Paso 4 — Vd/F.**",
          "",
          "*Interpretación:* el intercepto de la fase terminal es B₀ = ka·F·D/(Vd·(ka − K)); despejando F·D/Vd = B₀·(ka − K)/ka = 11,52 × 1,3/1,5 = 9,98 mg/L.",
          "",
          "Vd/F = D ÷ 9,98 mg/L = 500 mg ÷ 9,98 mg/L = **50,1 L**.",
          "",
          "**Conclusión:** con datos orales solo se conoce Vd/F = 50 L (con F = 0,8 el Vd real es 40 L, el valor de partida). El aclaramiento aparente es Cl/F = K·(Vd/F) = 0,20 × 50,1 = 10,0 L/h, y ABC = Dosis/(Cl/F) = 500/10,0 = 50 mg·h/L ✓. Para separar F de Vd se necesita el dato IV.",
        ].join("\n"),
      },
      {
        question: [
          "**Wagner–Nelson.** Con los datos del ejercicio anterior, y K = 0,20 h⁻¹, ABC₀→∞ = 50,8 mg·h/L (trapecios + extrapolación), calcula la fracción absorbida a las 0,5, 1 y 2 h, y estima ka con ln(1 − FA).",
        ].join("\n"),
        solution: [
          "**Interpretación:** FA(t) = [C(t) + K·ABC₀→t] / [K·ABC₀→∞]: lo que está en el cuerpo más lo ya eliminado, sobre el total que se absorberá. El denominador es K·ABC∞ = 0,20 × 50,8 = **10,16 mg/L**.",
          "",
          "**Paso 1 — ABC₀→t por trapecios.**",
          "",
          "* 0 → 0,25: (0 + 3,05)/2 × 0,25 = 0,381. 0,25 → 0,5: (3,05 + 4,99)/2 × 0,25 = 1,005. **ABC₀→0,5 = 1,39.**",
          "* 0,5 → 1: (4,99 + 6,87)/2 × 0,5 = 2,965. **ABC₀→1 = 4,35.**",
          "* 1 → 1,5: (6,87 + 7,33)/2 × 0,5 = 3,550; 1,5 → 2: (7,33 + 7,16)/2 × 0,5 = 3,623. **ABC₀→2 = 11,52.**",
          "",
          "**Paso 2 — FA.**",
          "",
          "| t (h) | C(t) | K·ABC₀→t | Suma | FA = Suma/10,16 | 1 − FA | ln(1 − FA) |",
          "|---|---|---|---|---|---|---|",
          "| 0,5 | 4,99 | 0,278 | 5,268 | 0,518 | 0,482 | −0,730 |",
          "| 1 | 6,87 | 0,870 | 7,740 | 0,762 | 0,238 | −1,435 |",
          "| 2 | 7,16 | 2,304 | 9,464 | 0,932 | 0,068 | −2,688 |",
          "",
          "**Paso 3 — ka.** Pendiente entre 0,5 y 2 h: (−2,688 − (−0,730))/(2 − 0,5) = −1,958/1,5 = −1,31 → ka ≈ **1,3 h⁻¹** (entre 0,5 y 1 h: ka ≈ 1,4).",
          "",
          "**Conclusión:** el valor (≈ 1,3–1,4 h⁻¹) es algo menor que el real 1,5 porque la regla del trapecio **subestima** el área en la fase de ascenso curvo; aun así confirma el orden de magnitud sin haber supuesto un modelo. En el tiempo de 2 h ya se absorbió ≈ 93 % de la dosis biodisponible, aunque la curva aún está cerca del pico: la **absorción termina antes que la eliminación**.",
        ].join("\n"),
      },
      {
        question: [
          "**Flip-flop.** Un fármaco tiene, tras un bolo IV, **K = 0,50 h⁻¹** (t1/2 = 1,39 h). Una tableta de liberación sostenida (100 mg, Vd = 20 L) dio estas concentraciones (h; mg/L): (1; 0,302), (2; 0,461), (4; 0,563), (8; 0,485), (12; 0,362), (24; 0,140), (36; 0,053), (48; 0,020), (72; 0,003). (a) Calcula la pendiente terminal y la t1/2 aparente. (b) ¿Qué representa? (c) ¿Cuál es el error de usarla como t1/2 de eliminación?",
        ].join("\n"),
        solution: [
          "**(a) Pendiente terminal.**",
          "",
          "Entre 24 y 48 h: λ = ln(0,140/0,020)/(48 − 24) = ln 7/24 = 1,9459/24 = **0,0811 h⁻¹**; t1/2,ap = 0,693/0,0811 = **8,5 h**.",
          "",
          "**(b) Qué representa.**",
          "",
          "La t1/2 aparente (8,5 h) es **6 veces mayor** que la de eliminación real obtenida del dato IV (1,39 h). La pendiente de la cola (≈ 0,08 h⁻¹) es **menor que K (0,50 h⁻¹)**, así que no puede ser la eliminación (si lo fuera, el fármaco se eliminaría más lento que por IV, lo cual no es posible con el mismo fármaco y mismo cuerpo). Es la **constante de absorción** ka: absorción lenta, eliminación rápida → **flip-flop** (ka = 0,08 h⁻¹ < K = 0,50 h⁻¹).",
          "",
          "**(c) Error.**",
          "",
          "Usar 8,5 h como vida media de eliminación llevaría a: (1) predecir un tiempo al estado estable de ≈ 5 × 8,5 = 42 h cuando el real (con esta forma) también depende de la absorción; (2) estimar un aclaramiento falso, Cl = 0,693·Vd/t1/2 = 0,693 × 20/8,5 = 1,6 L/h frente al real 0,5 × 20 = **10 L/h** (6 veces menor); (3) proponer intervalos de dosificación equivocados para otra formulación del mismo fármaco.",
          "",
          "**Conclusión:** en formas de liberación sostenida hay que confirmar con datos IV o de una solución oral qué constante está gobernando la fase terminal. Es una de las trampas clásicas de la farmacocinética oral.",
        ].join("\n"),
      },
      {
        question: [
          "**Efecto de ka y de F.** Para K = 0,20 h⁻¹ y F·D/Vd = 10 mg/L: (a) compara tmax y Cmax para ka = 0,5 y ka = 3,0 h⁻¹; ¿cambia el ABC? (b) Si una segunda formulación tiene la misma ka = 1,5 h⁻¹ pero F = 0,40 en lugar de 0,80, ¿qué pasa con Cmax, tmax y ABC? (c) ¿Qué parámetro de bioequivalencia detecta cada diferencia?",
        ].join("\n"),
        solution: [
          "**(a) Cambiar ka (con el mismo F).**",
          "",
          "* ka = 0,5: tmax = ln(0,5/0,2)/(0,5 − 0,2) = ln 2,5/0,3 = 0,9163/0,3 = **3,05 h**; Cmax = 10 × e^(−0,2 × 3,05) = **5,43 mg/L**.",
          "* ka = 3,0: tmax = ln 15/2,8 = 2,708/2,8 = **0,97 h**; Cmax = 10 × e^(−0,2 × 0,97) = **8,24 mg/L**.",
          "",
          "El ABC = F·D/(Vd·K) = 10/0,2 = **50 mg·h/L** en ambos casos (no depende de ka).",
          "",
          "**Conclusión:** una absorción 6 veces más rápida adelanta el pico de 3,05 a 0,97 h y lo sube de 5,43 a 8,24 mg/L (+52 %), sin cambiar el área.",
          "",
          "**(b) Cambiar F (misma ka).** Con F = 0,40 la cantidad F·D/Vd baja a 5 mg/L; tmax no cambia (1,55 h, porque solo depende de ka y K); Cmax = 5 × e^(−0,31) = **3,67 mg/L** (la mitad de 7,33); ABC = 5/0,2 = **25 mg·h/L** (la mitad).",
          "",
          "**Conclusión:** F escala todo el perfil (Cmax y ABC), pero no mueve el tmax.",
          "",
          "**(c) Qué detecta cada parámetro.**",
          "",
          "* Un cambio de **ka** (velocidad) se detecta en **Cmax y tmax**, pero **no en el ABC**.",
          "* Un cambio de **F** (magnitud) se detecta en **ABC y Cmax**.",
          "",
          "**Conclusión:** por eso la bioequivalencia exige que **ABC y Cmax** estén ambos dentro de 80–125 %: cada uno vigila un aspecto distinto, y solo con los dos queda cubierta la velocidad y la magnitud.",
        ].join("\n"),
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "bioequivalencia-scb": {
    chapter: `#### La pregunta que resuelve la bioequivalencia

Un medicamento innovador demostró **eficacia y seguridad** en ensayos clínicos largos y costosos. Un genérico (o una nueva formulación del mismo laboratorio) no repite esos ensayos: demuestra que **entrega el fármaco al organismo igual** que el de referencia. Si la exposición (Cmax y ABC) es la misma, se **extrapola** que el efecto (eficacia y seguridad) también lo es. La bioequivalencia es, entonces, **un puente de evidencia**: sustituye un ensayo clínico por un estudio farmacocinético corto.

#### Definiciones (Resolución 1124/2016, EMA, ICH M9)

* **Equivalentes farmacéuticos:** mismo principio activo, misma **cantidad molar**, misma forma farmacéutica y misma vía. Pueden diferir en excipientes.
* **Alternativas farmacéuticas:** mismo principio activo (o fracción activa) pero distinta **forma, concentración o especie química** (sal, éster).
* **Bioequivalentes:** equivalentes o alternativas farmacéuticas cuyas biodisponibilidades (**velocidad y magnitud**) tras la misma dosis molar están dentro de **límites predefinidos aceptables**, fijados para asegurar desempeño in vivo comparable (similitud en seguridad y eficacia).
* **Equivalencia terapéutica:** mismos efectos de eficacia y seguridad. Es lo que el médico y el paciente necesitan; la bioequivalencia es la evidencia que la sustenta en los genéricos. (La FDA publica en el *Orange Book* códigos de equivalencia terapéutica.)
* **Producto de referencia:** normalmente el innovador. En Colombia los comparadores están en el Anexo Técnico 2 de la Resolución 1124.

> Ejemplo para recordar: la digoxina de Lindenbaum (1971) fue el caso que mostró que «mismo contenido» no basta. Davit y colaboradores (2009) revisaron **12 años de estudios de bioequivalencia** presentados a la FDA y encontraron que los genéricos aprobados difieren, en promedio, solo unos pocos puntos porcentuales del innovador en Cmax y ABC (del orden de 3–4 %), mucho menos que los límites del 80–125 %.

#### Diseño del estudio (según Resolución 1124 y la guía EMA)

* **Diseño estándar:** **cruzado de 2 periodos y 2 secuencias**, dosis única, aleatorizado, en **voluntarios sanos**. Cada voluntario recibe prueba (T) y referencia (R), en orden aleatorio (TR o RT), de modo que **cada uno es su propio control** (elimina la variabilidad entre personas).
* **Lavado:** periodo entre tratamientos suficiente para eliminar el fármaco: normalmente **más de 5 vidas medias** y mínimo **7 días** (Res. 1124, 7.4.4); la concentración predosis del segundo periodo debe ser **< 5 % de la Cmax**.
* **Sujetos:** **mínimo 12 evaluables** (Res. 1124, 7.2.1; EMA 4.1.3); en la práctica el tamaño sale de un cálculo según la variabilidad. Habitualmente 18–55 años, IMC 18–30 kg/m².
* **Ayuno:** en general el estudio se hace **en ayunas** (≥ 10 h de ayuno nocturno) porque es la condición más sensible para detectar diferencias; con alimentos si la etiqueta del referente lo exige o la forma es de liberación modificada (comida alta en grasa ≈ 50 % de calorías, 800–1000 kcal).
* **Dosis:** la misma **dosis molar**; si hay series proporcionales, la **dosis más alta**.
* **Muestreo:** al menos **7 puntos** (uno predosis, 1–2 antes de Cmax, 2 alrededor de Cmax, 3–4 en eliminación); debe cubrir ≥ 80 % del ABC₀→∞ (EMA); no se necesita más de 72 h en liberación inmediata.
* **Matriz:** plasma, suero o sangre; orina solo en casos justificados.
* **Parámetros:** **Cmax** y **ABC₀→t** (primarios), **ABC₀→∞**, tmax y t1/2 (complementarios), con métodos no compartimentales.
* **Principio activo** (no el metabolito) en general.
* **Método analítico validado** (selectividad, límite de cuantificación, curva de 6–8 puntos, exactitud y precisión, estabilidad, efecto matriz, reanálisis de muestras incurridas).

#### El análisis estadístico, explicado

**¿Por qué logaritmos?** Cmax y ABC tienen distribución **log-normal** (sesgada a la derecha, con efectos multiplicativos: una formulación no «suma» sino que «multiplica» la absorción). Al tomar logaritmos se vuelven normales y, además, la **razón** T/R se convierte en una **diferencia**: ln(T/R) = ln T − ln R.

**Paso 1.** Calcular, con ANOVA (efectos: formulación, periodo, secuencia, sujeto dentro de secuencia), la diferencia de medias en escala logarítmica **d = media(ln T) − media(ln R)** y el error estándar.

**Paso 2.** Construir el **intervalo de confianza del 90 %** de esa diferencia y transformarlo (exponencial) en un intervalo para el cociente de medias geométricas **T/R**:

${fx(
  "IC_{90%} (en log) = d ± t_{0,95; gl} · SE",
  "SE = √( #{MSE|2} · ( #{1|n₁} + #{1|n₂} ) )",
  "IC_{90%} (T/R) = ( e^{d − t·SE} , e^{d + t·SE} ) · 100",
  "CV_{intra} = √( e^{MSE} − 1 )",
)}

(MSE es el cuadrado medio del error del ANOVA; n₁ y n₂ son los sujetos de cada secuencia; gl = n₁ + n₂ − 2.)

**Paso 3.** Decidir: el IC 90 % debe quedar **completamente dentro de 80,00–125,00 %** para Cmax y ABC.

**¿Por qué IC del 90 % y no del 95 %?** Porque equivale a hacer **dos pruebas unilaterales al 5 %** (TOST: *two one-sided tests*, Schuirmann, 1987): una para demostrar que T/R > 0,80 y otra para demostrar que T/R < 1,25. Se rechaza «son diferentes» solo si ambas se cumplen. Westlake (1976) fue el primero en proponer los intervalos para la bioequivalencia.

**¿Por qué 80–125 %?** El criterio clínico original fue que una diferencia de ±20 % se considera clínicamente irrelevante. En escala logarítmica los límites son **simétricos**: ln(0,80) = −0,2231 y ln(1,25) = +0,2231. Por eso el límite superior no es 120 % sino 125 % (1/0,80).

**Casos especiales** (Res. 1124 y guía EMA):

* **Margen terapéutico estrecho (NTI):** el intervalo se **estrecha** a **90,00–111,11 %** (en log: ±0,1054) para ABC y, si la Cmax es importante para seguridad o eficacia, también para Cmax. No se pueden otorgar bioexenciones BCS.
* **Fármacos altamente variables (HVD):** variabilidad intraindividual **> 30 %**. La Cmax puede evaluarse con límites **ampliados**: [U, L] = exp(±k·s_WR), con **k = 0,760** y s_WR la desviación estándar intrasujeto de ln Cmax del **referente**, hasta un máximo de **69,84–143,19 %** (CV ≥ 50 %). Exige un **diseño replicado** (el referente se administra dos veces), la ampliación debe estar **especificada en el protocolo**, la razón T/R de Cmax debe seguir dentro de 80–125 %, y el **ABC no se amplía** nunca.
* **Combinaciones en dosis fija:** cada principio activo debe cumplir.

#### Alternativas al estudio in vivo: las bioexenciones y el SCB

**Sistema de Clasificación Biofarmacéutica (SCB / BCS).** Propuesto por Amidon y colaboradores (1995), clasifica el principio activo por dos propiedades: **solubilidad** y **permeabilidad**:

| Clase | Solubilidad | Permeabilidad | Qué limita la absorción | Ejemplos (de la literatura) |
|---|---|---|---|---|
| **I** | alta | alta | casi nada: se absorbe bien | metoprolol, propranolol |
| **II** | baja | alta | la **disolución** | carbamazepina, glibenclamida, ketoconazol |
| **III** | alta | baja | la **permeabilidad** | atenolol, ranitidina, aciclovir |
| **IV** | baja | baja | ambas | furosemida, hidroclorotiazida |

(La asignación de un fármaco a una clase depende de la dosis y de los datos usados; las listas varían entre fuentes: **verifica siempre con datos del principio activo y la dosis concreta**.)

**Criterios cuantitativos (ICH M9, 2020; la Resolución 1124 es coherente en lo esencial):**

* **Alta solubilidad:** la **dosis más alta** (de un solo uso) se disuelve en **≤ 250 mL** de medio acuoso en todo el intervalo **pH 1,2–6,8 a 37 ± 1 °C** (mínimo 3 pH: 1,2, 4,5 y 6,8, y el de mínima solubilidad; ≥ 3 réplicas). Se clasifica por la **menor** solubilidad medida.
* **Alta permeabilidad:** **≥ 85 %** de absorción en humanos (biodisponibilidad absoluta o balance de masa); el Caco-2 es un método de apoyo con condiciones estrictas.
* **Disolución muy rápida:** ≥ 85 % en **15 min**; **rápida:** ≥ 85 % en **30 min**, en los tres pH (1,2; 4,5; 6,8), con paleta (50 rpm en ICH M9) o canastilla (100 rpm), ≤ 900 mL, 37 ± 1 °C, **≥ 12 unidades**, **sin tensioactivos ni solventes orgánicos**.
* **Elegibles para bioexención:** Clases **I y III**, solo para formas **orales sólidas de liberación inmediata** (o suspensiones) de acción sistémica, **sin índice terapéutico estrecho**, mismo forma y concentración que el referente.
  * **Clase I:** ambos productos con disolución **muy rápida**, o **rápida y similar** (f2 ≥ 50) en los tres pH.
  * **Clase III:** ambos con disolución **muy rápida**.
* **Excipientes:** en Clase I se permiten diferencias salvo en excipientes que afectan la absorción (manitol, sorbitol, tensioactivos como laurilsulfato), que deben ser cualitativamente iguales y cuantitativamente similares (± 10 %); en Clase III **todos** los excipientes deben ser cualitativamente iguales y cuantitativamente similares (con tolerancias según el tipo).

*Nota de lectura de las fuentes:* la Resolución 1124 (10.1.2.1) menciona la paleta a 75 rpm para la disolución muy rápida, mientras que ICH M9 establece paleta a 50 rpm o canastilla a 100 rpm. **Si preparas un expediente, aplica la versión vigente del texto normativo que corresponda**, porque estos detalles cambian.

**Factor de similitud f2 (comparación de perfiles de disolución).** Compara el porcentaje disuelto medio de la referencia (Rt) y de la prueba (Tt) en n tiempos:

${fx(
  "f₂ = 50 · log₁₀ { [ 1 + #{1|n} · Σ (R_{t} − T_{t})² ]^{−0,5} · 100 }",
)}

* **f2 entre 50 y 100 → perfiles similares** (equivale a una diferencia promedio de ≤ 10 puntos porcentuales).
* Condiciones: ≥ 3 puntos (sin el tiempo cero), los mismos para ambos, **un solo punto ≥ 85 %**, CV ≤ 20 % en los primeros 10 min y ≤ 10 % después; ≥ 12 unidades.
* Si **ambos** productos liberan ≥ 85 % en 15 min, los perfiles se consideran similares y **no se calcula f2**.

**Sistema BDDCS (Wu y Benet, 2005).** Cambia el eje de permeabilidad por la **extensión del metabolismo**: los fármacos altamente permeables (Clases 1 y 2) se eliminan sobre todo por metabolismo; los poco permeables (3 y 4) se excretan sobre todo inalterados por riñón o bilis. Sirve para predecir cómo se eliminará el fármaco, el efecto de los alimentos y el papel de los transportadores (Benet, 2013).

#### En resumen

* **Bioequivalencia** = misma exposición (Cmax y ABC) entre T y R → se **extrapola** eficacia y seguridad.
* Diseño: **cruzado 2×2**, ≥ 12 sujetos, lavado > 5 t1/2 y ≥ 7 días, ayuno ≥ 10 h.
* Estadística: **logaritmos**, **IC 90 %** de T/R dentro de **80,00–125,00 %**; NTI **90,00–111,11 %**; HVD con **k = 0,760** y Cmax hasta 69,84–143,19 %.
* **SCB**: solubilidad (dosis en ≤ 250 mL, pH 1,2–6,8) y permeabilidad (≥ 85 %); **bioexención** para Clases I y III en formas orales sólidas de liberación inmediata, sin NTI.
* **f2 ≥ 50** = perfiles similares; si ambos disuelven ≥ 85 % en 15 min no se calcula.

#### Para profundizar

* Amidon GL, Lennernäs H, Shah VP, Crison JR. A theoretical basis for a biopharmaceutic drug classification: the correlation of in vitro drug product dissolution and in vivo bioavailability. *Pharm Res* 1995;12:413-420. DOI 10.1023/A:1016212804288.
* Yu LX, Amidon GL, Polli JE, et al. Biopharmaceutics classification system: the scientific basis for biowaiver extensions. *Pharm Res* 2002;19:921-925. DOI 10.1023/A:1016473601633.
* Wu CY, Benet LZ. Predicting drug disposition via application of BCS: transport/absorption/elimination interplay and development of a biopharmaceutics drug disposition classification system. *Pharm Res* 2005;22:11-23. DOI 10.1007/s11095-004-9004-4.
* Benet LZ. The role of BCS and BDDCS in drug development. *J Pharm Sci* 2013;102:34-42. DOI 10.1002/jps.23359.
* Schuirmann DJ. A comparison of the two one-sided tests procedure and the power approach for assessing the equivalence of average bioavailability. *J Pharmacokinet Biopharm* 1987;15:657-680. DOI 10.1007/BF01068419.
* Davit BM, et al. Comparing generic and innovator drugs: a review of 12 years of bioequivalence data from the United States FDA. *Ann Pharmacother* 2009;43:1583-1597. DOI 10.1345/aph.1M141.
* Davit BM, et al. Highly variable drugs: observations from bioequivalence data submitted to the FDA for new generic drug applications. *AAPS J* 2008;10:148-156. DOI 10.1208/s12248-008-9015-x.
* ICH M9. Biopharmaceutics classification system-based biowaivers. EMA/CHMP/ICH/493213/2018 (2020).
* EMA. Guideline on the investigation of bioequivalence. CPMP/EWP/QWP/1401/98 Rev. 1 (2010).`,
    exercises: [
      {
        question: [
          "**Evaluar un estudio de bioequivalencia.** En un cruzado 2×2 con 12 sujetos (6 por secuencia), el análisis de ANOVA del ln(ABC) dio: diferencia de medias (T − R) **d = −0,0513**, **MSE = 0,0320**. Calcula (a) la razón de medias geométricas, (b) el CV intraindividual, (c) el IC 90 % de T/R y (d) la conclusión. Usa t₀,₉₅ con 10 gl = 1,8125.",
        ].join("\n"),
        solution: [
          "**(a) Razón de medias geométricas (GMR).**",
          "",
          "*Interpretación:* d está en escala logarítmica; se revierte con la exponencial.",
          "",
          "GMR = e^(−0,0513) = **0,950** → **95,0 %**.",
          "",
          "**Conclusión:** en promedio el producto de prueba tiene el 95 % de la exposición del de referencia.",
          "",
          "**(b) CV intraindividual.** CV = √(e^MSE − 1) = √(e^0,0320 − 1) = √0,03252 = 0,1803 → **18,0 %**.",
          "",
          "**Conclusión:** variabilidad moderada, por debajo del 30 % que marca los fármacos 'altamente variables'.",
          "",
          "**(c) IC del 90 %.**",
          "",
          "Error estándar: SE = √[(MSE/2)·(1/n₁ + 1/n₂)] = √[(0,0320/2) × (1/6 + 1/6)] = √(0,0160 × 0,3333) = √0,005333 = **0,07303**.",
          "",
          "t·SE = 1,8125 × 0,07303 = **0,1324**.",
          "",
          "En log: −0,0513 ± 0,1324 → de **−0,1837** a **+0,0811**.",
          "",
          "En T/R: e^(−0,1837) = 0,8322 y e^(0,0811) = 1,0845 → **83,2 % – 108,4 %**.",
          "",
          "**(d) Decisión.** El intervalo (83,2–108,4 %) está **completamente dentro de 80,00–125,00 %**.",
          "",
          "**Conclusión:** para el ABC los productos son **bioequivalentes**. (Falta evaluar la Cmax, que debe cumplir también.) Si el MSE hubiera sido 0,15 (CV = 40 %), el mismo d daría un intervalo mucho más ancho (≈ 71,3–126,5 %), cuyo límite superior **excede** 125 %, y no pasaría: la variabilidad y el tamaño de muestra determinan cuán estrecho es el IC.",
        ].join("\n"),
      },
      {
        question: [
          "**Factor de similitud f2.** Se compararon perfiles de disolución (% disuelto promedio) a 15, 30, 45 y 60 min. **Referencia:** 38, 61, 79, 88. **Prueba A:** 32, 55, 74, 85. **Prueba B:** 15, 30, 45, 62 (para estos, la referencia fue 30, 52, 70, 85). Calcula f2 de cada caso y concluye. ¿Se cumplen las condiciones de aplicación?",
        ].join("\n"),
        solution: [
          "**Interpretación:** f2 = 50·log₁₀{[1 + (1/n)·Σ(Rt − Tt)²]^(−0,5) × 100}.",
          "",
          "**Prueba A (referencia 38, 61, 79, 88).**",
          "",
          "Diferencias R − T: 38 − 32 = 6; 61 − 55 = 6; 79 − 74 = 5; 88 − 85 = 3.",
          "",
          "Cuadrados: 36 + 36 + 25 + 9 = **106**. Promedio (n = 4): 106/4 = **26,5**.",
          "",
          "1 + 26,5 = 27,5. Luego 27,5^(−0,5) = 1/√27,5 = 1/5,244 = 0,1907, y × 100 = 19,07. Finalmente f2 = 50 × log₁₀(19,07) = 50 × 1,2803 = **64,0**.",
          "",
          "**Conclusión:** f2 = 64 ≥ 50 → perfiles **similares**. Condiciones: hay 4 tiempos (≥ 3 ✓), solo **un** punto ≥ 85 % por producto (referencia 88; prueba 85 ✓), así que es válido.",
          "",
          "**Prueba B (referencia 30, 52, 70, 85; prueba 15, 30, 45, 62).**",
          "",
          "Diferencias: 15, 22, 25, 23 → cuadrados: 225 + 484 + 625 + 529 = 1863 → /4 = **465,75**.",
          "",
          "1 + 465,75 = 466,75 → 100/√466,75 = 100/21,60 = 4,629 → f2 = 50 × log₁₀(4,629) = 50 × 0,6655 = **33,3**.",
          "",
          "**Conclusión:** f2 = 33 < 50 → perfiles **no similares**: la prueba B se disuelve mucho más lento; no puede aceptarse sin un estudio in vivo.",
          "",
          "**Regla de bolsillo:** f2 = 50 corresponde a una diferencia media de ≈ 10 puntos porcentuales; f2 = 64 equivale a ≈ 5 puntos; f2 = 33, a ≈ 22 puntos.",
        ].join("\n"),
      },
      {
        question: [
          "**Clasificar según el SCB (ICH M9).** Tres principios activos orales de liberación inmediata, sin índice terapéutico estrecho: **Z** (dosis máxima 100 mg; solubilidad 2,0 / 1,5 / 0,9 mg/mL a pH 1,2 / 4,5 / 6,8; biodisponibilidad absoluta 92 %); **W** (dosis máxima 400 mg; solubilidad mínima 0,20 mg/mL; biodisponibilidad 90 %); **V** (dosis 50 mg; solubilidad mínima 5 mg/mL; biodisponibilidad absoluta 40 % y sin metabolismo que explique la pérdida). Clasifica cada uno y di si podrían optar a bioexención.",
        ].join("\n"),
        solution: [
          "**Interpretación:** para cada fármaco se verifican (1) solubilidad (Dosis/250 mL ≤ menor solubilidad), (2) permeabilidad (≥ 85 %), y luego la elegibilidad (Clases I o III).",
          "",
          "**Fármaco Z.**",
          "",
          "* Solubilidad requerida = 100 mg ÷ 250 mL = **0,40 mg/mL**. La menor medida = **0,9 mg/mL** ≥ 0,40 → **alta solubilidad**.",
          "* Permeabilidad: 92 % ≥ 85 % → **alta permeabilidad**.",
          "* **Clase I.** Podría optar a bioexención si ambos productos disuelven muy rápido (≥ 85 % en 15 min) o rápido y similar (f2 ≥ 50) en pH 1,2, 4,5 y 6,8, con excipientes aceptables.",
          "",
          "**Fármaco W.**",
          "",
          "* Solubilidad requerida = 400 mg ÷ 250 mL = **1,6 mg/mL**. La menor medida es 0,20 mg/mL < 1,6 → **baja solubilidad**.",
          "* Permeabilidad: 90 % → alta.",
          "* **Clase II.** **No es elegible** para bioexención BCS (solo I y III): se requiere estudio in vivo.",
          "",
          "**Fármaco V.**",
          "",
          "* Solubilidad requerida = 50 mg ÷ 250 mL = **0,20 mg/mL**. Menor medida 5 mg/mL ≥ 0,20 → **alta solubilidad**.",
          "* Permeabilidad: 40 % < 85 % → **baja permeabilidad** (según ICH M9, si no se demuestra alta, se considera baja).",
          "* **Clase III.** **Es elegible**, pero con requisitos más estrictos: disolución **muy rápida** (≥ 85 % en 15 min) en ambos productos y **todos los excipientes cualitativamente iguales y cuantitativamente similares**, con riesgo-beneficio favorable (la baja absorción lo hace más sensible a excipientes que alteren la permeabilidad o el tránsito).",
          "",
          "**Conclusión:** Z y V podrían eximirse del estudio in vivo si cumplen las condiciones de disolución y excipientes; W, no. La clave está en que la bioexención solo es razonable cuando la absorción **no está limitada por la disolución** (clase II) y el producto **no es sensible a pequeñas diferencias de formulación**.",
        ].join("\n"),
      },
      {
        question: [
          "**Límites ampliados para un fármaco altamente variable.** En un estudio replicado de un fármaco, el CV intraindividual de la Cmax del referente fue de **38 %**. (a) Calcula s_WR. (b) Calcula los límites ampliados con k = 0,760. (c) Compara con la tabla de la guía. (d) ¿Qué otras condiciones deben cumplirse?",
        ].join("\n"),
        solution: [
          "**(a) s_WR.**",
          "",
          "*Interpretación:* el CV (en %) se relaciona con la desviación estándar en escala logarítmica por CV = √(e^(s²) − 1); despejamos s = √ln(CV² + 1).",
          "",
          "s_WR = √ln(0,38² + 1) = √ln(1,1444) = √0,13489 = **0,3673**.",
          "",
          "**(b) Límites.**",
          "",
          "k·s_WR = 0,760 × 0,3673 = **0,2791**.",
          "",
          "Límite superior = e^(+0,2791) = **132,2 %**; límite inferior = e^(−0,2791) = **75,6 %**.",
          "",
          "**(c) Comparación.** La tabla da 77,23–129,48 % para CV = 35 % y 74,62–134,02 % para 40 %: el valor de 38 % (75,6–132,2 %) cae **entre ambos** ✓. El máximo es 69,84–143,19 % (CV ≥ 50 %).",
          "",
          "**(d) Otras condiciones.**",
          "",
          "* El diseño debe ser **replicado** (referente dos veces) y el método **definido en el protocolo antes del estudio**.",
          "* La **razón T/R de Cmax** debe seguir dentro de **80–125 %**.",
          "* La ampliación **solo aplica a Cmax**; el **ABC** se evalúa con 80–125 % **sin escalar**.",
          "* El solicitante debe justificar que el CV estimado es **fiable** y no producto de valores extremos.",
          "",
          "**Conclusión:** la ampliación reconoce que, cuando el propio referente varía mucho de una vez a otra, exigir 80–125 % haría fracasar incluso a un producto idéntico a sí mismo; pero la cláusula de GMR y el ABC sin escalar protegen frente a diferencias reales.",
        ].join("\n"),
      },
      {
        question: [
          "**Clasificar pares de productos.** Para cada par indica si son (i) equivalentes farmacéuticos, (ii) alternativas farmacéuticas, o (iii) ninguno de los dos: (a) tabletas de 500 mg de paracetamol de los laboratorios A y B, con distintos excipientes; (b) tabletas de 500 mg y cápsulas de 500 mg del mismo principio activo; (c) clorhidrato de un fármaco 100 mg frente al succinato del mismo fármaco con la misma cantidad molar activa; (d) tabletas de 250 mg frente a tabletas de 500 mg del mismo fármaco; (e) tableta oral frente a supositorio del mismo principio activo y dosis.",
        ].join("\n"),
        solution: [
          "**Interpretación:** equivalente farmacéutico = **mismo principio activo, cantidad molar, forma y vía**; alternativa farmacéutica = mismo principio activo con **distinta forma, concentración o especie química**.",
          "",
          "| Par | Clasificación | Razón |",
          "|---|---|---|",
          "| (a) tabletas 500 mg A vs B | **(i) Equivalentes farmacéuticos** | Mismo principio activo, cantidad, forma y vía; solo cambian los excipientes (permitido) |",
          "| (b) tableta vs cápsula | **(ii) Alternativas farmacéuticas** | Distinta forma farmacéutica |",
          "| (c) clorhidrato vs succinato (misma cantidad molar) | **(ii) Alternativas farmacéuticas** | Distinta especie química (sal distinta) |",
          "| (d) 250 mg vs 500 mg | **(ii) Alternativas farmacéuticas** (por distinta concentración/dosis) | No se comparan como equivalentes: la cantidad de principio activo difiere |",
          "| (e) tableta oral vs supositorio | **(iii) Ninguno** | Distinta forma y **distinta vía**: no se pueden sustituir como equivalentes ni como alternativas en el mismo sentido de la norma |",
          "",
          "**Conclusión:** **solo (a)** son equivalentes farmacéuticos y podrían demostrarse bioequivalentes con un estudio. Las alternativas farmacéuticas pueden ser bioequivalentes también, pero deben demostrarlo y no son intercambiables automáticamente. Ser equivalente farmacéutico **no garantiza** equivalencia terapéutica.",
        ].join("\n"),
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  "normativa-talleres-finales": {
    chapter: `#### Por qué existe una norma

Un estudio de bioequivalencia involucra **voluntarios humanos**, **datos que sustentan un registro sanitario** y **decisiones de salud pública** (qué genéricos se pueden sustituir). Por eso las reglas cubren tres cosas: la **seguridad y ética** de los voluntarios, la **calidad científica** del estudio y la **capacidad técnica** de quienes lo hacen. En Colombia el marco central es la **Resolución 1124 de 2016** del Ministerio de Salud y Protección Social (con modificaciones, entre ellas la Resolución 662 de 2022), que se aplica por intermedio del **INVIMA**.

#### Estructura de la Resolución 1124 de 2016

| Parte | Contenido |
|---|---|
| **Artículos 1–2** | Objeto y ámbito: la guía de presentación de estudios de biodisponibilidad/bioequivalencia, los requisitos de las instituciones que los realizan y la lista de medicamentos que deben presentarlos. Aplica a **medicamentos de síntesis química**; **excluye** los de origen biológico (vacunas, sueros, hemoderivados, biotecnológicos). |
| **Artículo 3** | Definiciones (biodisponibilidad, bioequivalencia, equivalente y alternativa farmacéutica, producto de referencia, bioexención…). |
| **Artículos 5–9** | Reconocimiento de certificados extranjeros; **aprobación del INVIMA** previa de cada estudio in vivo en Colombia, con concepto del **comité de ética**; comunicación de resultados; suspensión; responsabilidad del patrocinador. |
| **Artículos 10–12** | Medicamentos obligados: el **Anexo Técnico 2** lista los principios activos (≈ 90 registros) con su producto de referencia; el INVIMA actualiza gradualmente la lista según el riesgo sanitario. |
| **Artículos 13–15** | Certificado de **Buenas Prácticas de Biodisponibilidad y Bioequivalencia (BPBD/BE)** de las instituciones: Anexo Técnico 3, vigencia de **3 años**, renovación con **3 meses** de antelación. |
| **Artículos 16–18** | Sanciones (Decreto 677 de 1995), régimen transitorio y vigencia (derogó las Resoluciones 1400 y 1890 de 2001). |
| **Anexo Técnico 1** | La **guía técnica**: cuándo no se requiere, diseño, sujetos, condiciones, parámetros, validación bioanalítica, estadística, informe, bioexenciones, perfiles de disolución. |

#### Los puntos que más se preguntan

* **Qué debe presentar quién:** solicitantes de **registro sanitario** nuevo, **renovación** o **modificaciones que puedan afectar la farmacocinética** de medicamentos de síntesis química incluidos en el Anexo 2 (y otros casos de liberación programada o nuevas formas). Una vez aprobados, **no se vuelven a presentar** en la siguiente renovación.
* **Cuándo no hace falta estudio** (Anexo 1, sección 4): soluciones acuosas parenterales, orales, óticas, oftálmicas o tópicas con el mismo principio activo y concentración molar, y soluciones para nebulizar, siempre que los excipientes no afecten la absorción.
* **Quién puede hacer los estudios:** instituciones con certificado del INVIMA, o certificados/reconocimientos equivalentes de EMA y sus miembros, FDA, Health Canada, PMDA, Swissmedic, TGA, MHRA, la OMS o agencias consideradas de referencia por la OPS (art. 5, modificado por la Res. 662 de 2022).
* **Quién autoriza:** todo estudio in vivo en Colombia requiere **aprobación del INVIMA** previa, con **concepto de comité de ética**; las enmiendas también (art. 6). Los resultados se comunican al INVIMA **dentro de los 30 días** de terminado o abandonado el estudio (art. 8).
* **Ética de investigación:** el patrocinador responde por la seguridad de los voluntarios y se aplica la **Resolución 8430 de 1993** (art. 9).

#### Cómo se desarrolla un estudio, de punta a punta

${fx(
  "Protocolo → comité de ética → aprobación INVIMA → selección y consentimiento de voluntarios",
  "→ periodo 1 (dosis, muestreo) → LAVADO (> 5 t½; ≥ 7 días) → periodo 2 (dosis cruzada, muestreo)",
  "→ análisis bioanalítico validado → parámetros PK (no compartimental) → estadística (ANOVA, IC 90%)",
  "→ informe final (sección 7.8) → INVIMA (≤ 30 días) → dictamen",
)}

**Validación bioanalítica (sección 7.5):** selectividad; límite inferior de cuantificación; curva de calibración con **6 a 8 puntos**; exactitud y precisión con **≥ 3 niveles de control de calidad**; estabilidad; efecto matriz (espectrometría de masas); y **reanálisis de muestras incurridas** en cada estudio. Sin un método validado, los resultados del estudio no sirven.

**Informe (sección 7.8):** protocolo y ejecución; nombres y lotes de los productos; composición del producto de prueba; **perfiles de disolución a pH 1,2, 4,5 y 6,8**; declaración firmada de que el producto de prueba **es idéntico al que se registrará**; validación bioanalítica; concentraciones **por sujeto y tiempo**; gráficos individuales (lineal/lineal y log/lineal); eventos adversos; parámetros por sujeto y formulación.

#### Armonización internacional

La Resolución 1124 se parece, a propósito, a los textos de otras agencias: la **guía EMA** (2010), la guía **ICH M9** (2020) para bioexenciones BCS y las guías de la FDA. Esto facilita aceptar estudios hechos en el exterior. Cuando tu trabajo requiera citarla, usa la **versión vigente**: las agencias actualizan sus guías (la FDA, por ejemplo, publicó en 2022 versiones finales de sus guías de biodisponibilidad y de efecto de los alimentos).

#### El papel del químico farmacéutico

* **Hospitalario:** seleccionar medicamentos con evidencia de equivalencia terapéutica, vigilar la sustitución en fármacos de ventana estrecha (tacrolimus, levotiroxina, anticonvulsivos), interpretar niveles plasmáticos.
* **Industria:** diseñar la formulación y la estrategia de bioequivalencia (¿bioexención o estudio?), preparar el expediente, validar el método analítico.
* **Regulatorio:** evaluar expedientes, certificar instituciones.
* **Magistral y preparaciones extemporáneas:** entender cómo cambia la biodisponibilidad al modificar la formulación o al triturar una forma de liberación modificada.

#### Los talleres de aplicación

Los ejercicios de este módulo son **talleres integradores**: combinan lo de los módulos 5–9 con la norma. Para cada uno, pregúntate en orden: *¿qué producto y qué población?, ¿qué diseño?, ¿qué parámetros?, ¿qué estadística?, ¿qué decisión regulatoria?*

#### En resumen

* **Resolución 1124 de 2016:** guía de estudios de BD/BE, requisitos de las instituciones y lista de medicamentos (Anexo 2); aplica a **síntesis química**.
* **INVIMA aprueba** cada estudio in vivo (con comité de ética) y recibe los resultados en **30 días**.
* Estudio: **cruzado 2×2, ≥ 12 sujetos, lavado ≥ 7 días y > 5 t1/2, ≥ 7 muestras**.
* Criterios: **80,00–125,00 %**; NTI **90,00–111,11 %**; HVD con ampliación de Cmax (k = 0,760).
* Bioexenciones **BCS I y III** (ICH M9), no NTI, orales sólidos de liberación inmediata.

#### Para profundizar

* Ministerio de Salud y Protección Social. Resolución 1124 de 2016 (con las modificaciones de la Resolución 662 de 2022). Texto en el normograma del INVIMA: https://normograma.invima.gov.co/compilacion/docs/resolucion_minsaludps_1124_2016.htm
* INVIMA. Bioequivalencia: https://www.invima.gov.co/productos-vigilados/medicamentos-y-productos-biologicos/bioequivalencia
* EMA. Guideline on the investigation of bioequivalence (2010).
* ICH M9 (2020). BCS-based biowaivers.
* FDA. Bioavailability studies submitted in NDAs or INDs: general considerations (2022).
* Hauschke D, Steinijans V, Pigeot I. *Bioequivalence Studies in Drug Development: Methods and Applications*. Wiley, 2007.`,
    exercises: [
      {
        question: [
          "**Taller 1 — Evaluar un estudio completo.** En un cruzado de 12 voluntarios se obtuvo el **ABC (mg·h/L)** de cada uno con la referencia (R) y la prueba (T):",
          "",
          "| Sujeto | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |",
          "|---|---|---|---|---|---|---|---|---|---|---|---|---|",
          "| R | 48,2 | 52,7 | 61,3 | 44,9 | 55,0 | 49,6 | 58,4 | 42,8 | 66,1 | 51,3 | 47,5 | 56,2 |",
          "| T | 42,4 | 61,7 | 58,2 | 55,7 | 50,1 | 52,6 | 49,1 | 47,9 | 65,4 | 47,7 | 56,5 | 57,3 |",
          "",
          "Calcula la razón de medias geométricas y el IC 90 % de T/R (método simplificado de diferencias por sujeto, t₀,₉₅ con 11 gl = 1,7959), y decide si el producto es bioequivalente en ABC.",
        ].join("\n"),
        solution: [
          "**Interpretación:** en un cruzado cada sujeto es su propio control: trabajamos con la diferencia **dᵢ = ln Tᵢ − ln Rᵢ** de cada voluntario (es la razón T/R en escala log).",
          "",
          "**Paso 1 — Diferencias logarítmicas.**",
          "",
          "| Sujeto | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |",
          "|---|---|---|---|---|---|---|---|---|---|---|---|---|",
          "| T/R × 100 | 88,0 | 117,1 | 94,9 | 124,1 | 91,1 | 106,0 | 84,1 | 111,9 | 98,9 | 93,0 | 118,9 | 102,0 |",
          "| dᵢ = ln(T/R) | −0,1282 | 0,1577 | −0,0519 | 0,2155 | −0,0933 | 0,0587 | −0,1735 | 0,1126 | −0,0106 | −0,0728 | 0,1735 | 0,0194 |",
          "",
          "**Paso 2 — Media y desviación estándar.** d̄ = Σdᵢ/12 = **0,01726**. Suma de cuadrados Σ(dᵢ − d̄)² = 0,17768 → SD = √(0,17768/11) = **0,1271**.",
          "",
          "**Paso 3 — Error estándar.** SE = SD/√n = 0,1271/√12 = **0,03669**.",
          "",
          "**Paso 4 — Intervalo en escala log.** d̄ ± t·SE = 0,01726 ± 1,7959 × 0,03669 = 0,01726 ± 0,06589 → de **−0,04863** a **+0,08315**.",
          "",
          "**Paso 5 — Volver a T/R.** GMR = e^0,01726 = **101,7 %**. IC 90 % = (e^(−0,04863), e^(0,08315)) = **95,3 % – 108,7 %**.",
          "",
          "**Paso 6 — Decisión.** 95,3 % ≥ 80,00 % y 108,7 % ≤ 125,00 % → el IC 90 % está **dentro** del intervalo de aceptación. **El producto de prueba es bioequivalente en ABC.**",
          "",
          "**Conclusión:** el producto de prueba entrega en promedio el 101,7 % de la exposición del referente, con un intervalo estrecho (95–109 %). El CV intraindividual (≈ √(e^(SD²/2) − 1) = **9,0 %**) es bajo. *Nota metodológica:* el análisis oficial usa ANOVA con formulación, periodo, secuencia y sujeto dentro de secuencia (10 gl); el método de diferencias aquí empleado supone que no hay efecto de periodo y da un resultado casi idéntico. Falta evaluar Cmax con el mismo procedimiento.",
        ].join("\n"),
      },
      {
        question: [
          "**Taller 2 — Planear lavado y muestreo.** Un fármaco tiene **t1/2 = 14 h** y **tmax ≈ 2 h**. (a) ¿Cuál es el lavado mínimo según la Resolución 1124? (b) ¿Y si la t1/2 fuera 50 h? (c) Propón un cronograma de muestreo que cumpla las exigencias (≥ 7 puntos, antes y alrededor de Cmax, 3–4 en eliminación, ABC₀→t ≥ 80 % del ABC₀→∞). (d) ¿Cuántas vidas medias cubre un muestreo de 48 h?",
        ].join("\n"),
        solution: [
          "**(a) Lavado con t1/2 = 14 h.**",
          "",
          "*Interpretación:* el lavado debe ser **más de 5 vidas medias** y **al menos 7 días**.",
          "",
          "5 × 14 h = 70 h = 2,9 días. Como el mínimo normativo es 7 días, el lavado será de **7 días**.",
          "",
          "**Conclusión:** manda el mínimo de 7 días. Se verifica en el periodo 2 que la concentración predosis sea **< 5 % de Cmax**.",
          "",
          "**(b) Con t1/2 = 50 h.**",
          "",
          "5 × 50 h = 250 h = **10,4 días**. Como supera 7 días, el lavado debe ser de **≥ 11 días** (aquí manda la regla de 5 vidas medias).",
          "",
          "**Conclusión:** para vidas medias largas el lavado se alarga, y puede ser tan largo que se considere un diseño de grupos paralelos (la guía EMA lo admite para sustancias de vida media muy larga).",
          "",
          "**(c) Cronograma propuesto (t1/2 = 14 h, tmax ≈ 2 h).**",
          "",
          "| Fase | Muestras (h) | Cuántas |",
          "|---|---|---|",
          "| Predosis | 0 | 1 |",
          "| Antes de Cmax | 0,5; 1; 1,5 | 3 |",
          "| Alrededor de Cmax | 2; 2,5; 3 | 3 |",
          "| Eliminación | 4; 6; 8; 12; 24; 36; 48 | 7 (4 en la fase terminal) |",
          "| **Total** | | **14 puntos** |",
          "",
          "Cumple: ≥ 7 puntos ✓; ≥ 3–4 en la fase terminal ✓; el primer punto posdosis no es la Cmax ✓.",
          "",
          "**(d) Cobertura.** 48 h ÷ 14 h = **3,4 vidas medias**; tras 3 vidas medias queda 12,5 % de la concentración y por tanto ≈ 12,5 % del área en la cola → ABC₀→t cubre ≈ **87 %** ≥ 80 % ✓. (Si se alargara a 72 h, 5,1 vidas medias, cubriría > 97 %. La guía EMA no exige muestrear más de 72 h en liberación inmediata, sin importar la vida media.)",
          "",
          "**Conclusión:** el muestreo hasta 48 h es suficiente. Un muestreo de solo 12 h (0,86 vidas medias) habría cubierto menos de la mitad del área y obligaría a extrapolar demasiado.",
        ].join("\n"),
      },
      {
        question: [
          "**Taller 3 — ¿Debe presentar estudio de bioequivalencia?** Según la Resolución 1124, indica en cada caso si, en principio, se requiere estudio in vivo, se puede eximir o queda fuera del alcance: (a) renovación del registro de tabletas de carbamazepina (principio activo del Anexo 2); (b) solución oral acuosa de un fármaco, misma concentración molar y excipientes que no afectan la absorción; (c) una vacuna; (d) cambio de sitio de fabricación de un producto del Anexo 2 que puede afectar su comportamiento farmacocinético; (e) solución acuosa para inyección intravenosa con el mismo activo y concentración.",
        ].join("\n"),
        solution: [
          "| Caso | Decisión | Razón |",
          "|---|---|---|",
          "| (a) carbamazepina en renovación | **Se requiere** (salvo que ya se haya presentado y aprobado antes) | Está en el Anexo 2 y es un medicamento de síntesis química; los estudios aprobados no se repiten en renovaciones posteriores |",
          "| (b) solución oral acuosa | **Puede eximirse** | Sección 4 del Anexo 1: se consideran equivalentes sin estudio adicional si los excipientes no afectan la absorción |",
          "| (c) vacuna | **Fuera del alcance** | Los productos de origen biológico están excluidos (art. 2, parágrafo 2) |",
          "| (d) cambio de sitio de fabricación | **Se evalúa; puede requerir estudio** | Las modificaciones que puedan afectar el comportamiento farmacocinético están dentro del ámbito; se justifica con disolución comparativa y, si no basta, con estudio in vivo |",
          "| (e) inyectable IV acuoso | **Puede eximirse** | Solución parenteral acuosa con igual activo y concentración molar: la biodisponibilidad es 100 % por definición |",
          "",
          "**Conclusión:** la norma pide estudio cuando hay **riesgo de que la forma farmacéutica cambie la exposición** (sólidos orales, liberación modificada, vías con efecto sistémico) y exime cuando el fármaco ya está en solución acuosa o entra directo a sangre.",
        ].join("\n"),
      },
      {
        question: [
          "**Taller 4 — Decidir con los resultados.** Un estudio estándar dio estos IC 90 % de T/R: **ABC 88,5–109,0 %; Cmax 84,0–117,0 %**. (a) ¿Es bioequivalente para un fármaco no NTI? (b) ¿Y si es un fármaco de margen terapéutico estrecho? (c) Otro estudio con un fármaco altamente variable (CV intra de Cmax del referente = 42 %) dio Cmax 76,0–129,0 % con GMR 98 % y ABC 85,0–112,0 %. ¿Es bioequivalente si el diseño era replicado y se especificó en el protocolo?",
        ].join("\n"),
        solution: [
          "**(a) Fármaco no NTI (límites 80,00–125,00 %).**",
          "",
          "* ABC: 88,5–109,0 % ⊂ 80–125 % ✓.",
          "* Cmax: 84,0–117,0 % ⊂ 80–125 % ✓.",
          "",
          "**Conclusión:** **bioequivalente** (ambos intervalos dentro).",
          "",
          "**(b) Fármaco NTI (límites 90,00–111,11 %).**",
          "",
          "* ABC: el límite inferior 88,5 % **< 90,00 %** ✗.",
          "* Cmax (si es relevante para seguridad/eficacia): 84,0–117,0 % ✗.",
          "",
          "**Conclusión:** **NO bioequivalente** para un NTI. El mismo resultado aprueba un fármaco ordinario y reprueba uno de ventana estrecha, porque el margen que el producto puede 'perder' se reduce de ±20 % a ±10 %.",
          "",
          "**(c) Fármaco altamente variable (CV Cmax = 42 %).**",
          "",
          "*Interpretación:* los límites de Cmax se amplían: s_WR = √ln(0,42² + 1) = √0,16258 = 0,4031 → k·s_WR = 0,760 × 0,4031 = 0,3064 → límites e^(±0,3064) = **73,6 % – 135,8 %**.",
          "",
          "* Cmax: 76,0–129,0 % ⊂ 73,6–135,8 % ✓, y GMR = 98 % ∈ 80–125 % ✓.",
          "* ABC: 85,0–112,0 % ⊂ 80–125 % ✓ (**sin ampliación**).",
          "",
          "**Conclusión:** **bioequivalente** (con diseño replicado y ampliación especificada en el protocolo). Con límites convencionales (80–125 %), el Cmax 76,0–129,0 % habría **fallado**; la ampliación evita rechazar un producto solo por la variabilidad del referente.",
        ].join("\n"),
      },
      {
        question: [
          "**Taller 5 — ¿Bioexención posible?** Un genérico de un fármaco **Clase III** (50 mg, tableta de liberación inmediata, sin NTI) tiene en su formulación **150 mg de sorbitol** mientras que el producto de referencia tiene **120 mg**. Los dos disuelven ≥ 85 % en 15 min en los tres pH. ¿Puede optar a bioexención? ¿Qué hacer?",
        ].join("\n"),
        solution: [
          "**Interpretación:** para Clase III, ICH M9 exige (1) disolución muy rápida en ambos productos, (2) excipientes cualitativamente iguales y cuantitativamente similares y (3) en particular, los **excipientes que pueden afectar la absorción** (sorbitol es uno de los ejemplos que cita la guía) deben estar dentro de **± 10 %** de la cantidad del referente.",
          "",
          "**Paso 1 — Disolución.** ≥ 85 % en 15 min en los tres pH → **muy rápida** ✓.",
          "",
          "**Paso 2 — Sorbitol.** Diferencia relativa = (150 − 120)/120 = 30/120 = **+25 %**. El límite es ± 10 % → **no cumple**.",
          "",
          "**Conclusión:** **no** puede optar a la bioexención tal como está. El sorbitol, un alcohol de azúcar, puede acelerar el tránsito intestinal y afectar la absorción de un fármaco de baja permeabilidad (Clase III); por eso la tolerancia es estricta.",
          "",
          "**Qué hacer:** (a) **reformular** para que el sorbitol quede entre 108 y 132 mg (± 10 % de 120 mg); (b) demostrar con datos que, para este fármaco, la cantidad de sorbitol usada no afecta la absorción (umbral de efecto documentado); o (c) hacer el **estudio de bioequivalencia in vivo**.",
          "",
          "**Conclusión:** la bioexención ahorra un estudio humano, pero **exige disciplina de formulación**: el 'mismo' genérico puede quedar fuera por una diferencia de excipiente que parece pequeña.",
        ].join("\n"),
      },
    ],
  },
};
