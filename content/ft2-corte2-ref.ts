import type { FormulaContent, GlossaryContent } from "./_schema";

/**
 * Farmacotecnia 2 — SEGUNDO CORTE: glosario y fórmulas nuevos (Módulos 3 y 4).
 * Se mezclan con los de ft2.ts. Ojo: aquí se corrige la definición de F (= Vu/V₀) y se separa β (= F/F∞),
 * tal como la usó el profesor en clase.
 */

export const corte2Glossary: GlossaryContent[] = [
  // ───────── Módulo 3: coloides y reología ─────────
  { term: "Efecto Tyndall", moduleSlug: "coloides-reologia", definition: "Dispersión de la luz por partículas coloidales: un haz que atraviesa un coloide **se ve** de lado, y en una solución verdadera no. Como el rayo de sol visible por el polvo en el aire." },
  { term: "Movimiento browniano", moduleSlug: "coloides-reologia", definition: "Zigzag **aleatorio** de una partícula coloidal producido por los choques desiguales de las moléculas del medio. Ayuda a mantener a los coloides pequeños dispersos." },
  { term: "Diálisis / ultrafiltración", moduleSlug: "coloides-reologia", definition: "Purificación de un coloide con una **membrana semipermeable** que retiene las partículas coloidales y deja pasar iones y moléculas pequeñas." },
  { term: "Salting-out (desalado)", moduleSlug: "coloides-reologia", definition: "Pérdida de estabilidad de un coloide liofílico a **concentraciones muy altas de sal**, que le quitan el agua de solvatación." },
  { term: "Coloide protector", moduleSlug: "coloides-reologia", definition: "Coloide liofílico (p. ej. CMC, gelatina) que se **adsorbe** sobre partículas liofóbicas y las estabiliza por **carga y barrera estérica**, evitando su agregación irreversible." },
  { term: "Potencial de Nernst (ψ₀)", moduleSlug: "coloides-reologia", definition: "Potencial en la **superficie** de la partícula. **No se puede medir**, porque la partícula siempre está rodeada de iones." },
  { term: "Potencial de Stern", moduleSlug: "coloides-reologia", definition: "Potencial en el borde de la **capa fija** de contraiones fuertemente adsorbidos. En coloides liofóbicos coincide con el zeta." },
  { term: "Potencial zeta (ζ)", moduleSlug: "coloides-reologia", definition: "Potencial en el **plano de deslizamiento** de la doble capa; es el que **sí se mide** (electroforesis). Con |ζ| > 30 mV hay repulsión suficiente para un sistema estable." },
  { term: "Longitud de Debye (κ⁻¹)", moduleSlug: "coloides-reologia", definition: "**Espesor efectivo** de la doble capa difusa. Disminuye al subir la fuerza iónica: para un electrolito 1:1 a 25 °C, κ⁻¹ ≈ 0,304/√I nm." },
  { term: "Teoría DLVO", moduleSlug: "coloides-reologia", definition: "Teoría de Derjaguin–Landau–Verwey–Overbeek: la estabilidad de un coloide resulta de la suma de **atracción de van der Waals (V_A)** y **repulsión de las dobles capas (V_R)**; V_T = V_R + V_A." },
  { term: "Constante de Hamaker (A)", moduleSlug: "coloides-reologia", definition: "Constante que mide la **intensidad de la atracción de van der Waals** entre partículas; depende de la naturaleza química de las partículas y del medio." },
  { term: "Mínimo secundario (V_t)", moduleSlug: "coloides-reologia", definition: "Hoyo poco profundo de la curva DLVO a distancias intermedias: atracción **débil y reversible**. Corresponde a la **floculación controlada**, estado ideal de una suspensión." },
  { term: "Máximo de repulsión (V_m)", moduleSlug: "coloides-reologia", definition: "**Barrera de energía** de la curva DLVO; mientras sea alta, las partículas no se juntan (sistema defloculado). Baja al subir la sal o al bajar el potencial." },
  { term: "Mínimo primario (V_p)", moduleSlug: "coloides-reologia", definition: "Pozo profundo de la curva DLVO a distancia muy corta: atracción **irreversible** y contacto íntimo. Produce coagulación y **cementación (caking)**." },
  { term: "Regla de Schulze–Hardy", moduleSlug: "coloides-reologia", definition: "Regla empírica: la concentración de electrolito que coagula un coloide **disminuye muy rápido con la valencia** del contraión (≈ 1/z⁶): 1 : 1/64 : 1/729 para z = 1 : 2 : 3." },
  { term: "Viscosidad", moduleSlug: "coloides-reologia", definition: "**Resistencia interna** de un fluido a fluir. En un fluido newtoniano es la constante entre el esfuerzo y la velocidad de cizalla (τ = η·γ̇); unidades Pa·s (1 mPa·s = 1 cP)." },
  { term: "Fluido newtoniano / no newtoniano", moduleSlug: "coloides-reologia", definition: "**Newtoniano:** viscosidad constante sin importar la cizalla (agua, aceites). **No newtoniano:** la viscosidad cambia con la cizalla (pseudoplástico, dilatante, plástico)." },
  { term: "Pseudoplástico", moduleSlug: "coloides-reologia", definition: "Fluido cuya viscosidad **baja** al aumentar la cizalla (*shear-thinning*), como el kétchup. Muy útil en suspensiones: espesas en reposo, fluidas al agitar." },
  { term: "Dilatante", moduleSlug: "coloides-reologia", definition: "Fluido cuya viscosidad **sube** al aumentar la cizalla (*shear-thickening*), como la maicena con agua." },
  { term: "Plástico (Bingham) y esfuerzo de cedencia", moduleSlug: "coloides-reologia", definition: "Material que **no fluye hasta superar un esfuerzo mínimo (cedencia, τ₀)**; después fluye. Pasta dental, pomadas, geles." },
  { term: "Viscosidad aparente", moduleSlug: "coloides-reologia", definition: "Cociente τ/γ̇ en un punto de la curva de flujo de un fluido no newtoniano; **cambia** según la cizalla." },
  { term: "Viscoelasticidad", moduleSlug: "coloides-reologia", definition: "Comportamiento **mitad sólido (elástico) y mitad líquido (viscoso)**: según el tiempo de la fuerza se comporta de una u otra forma (plastilina, geles)." },
  { term: "Ecuación de Einstein", moduleSlug: "coloides-reologia", definition: "η = η₀(1 + 2,5φ): viscosidad de una suspensión **diluida** de esferas rígidas según la fracción de volumen φ de sólido." },

  // ───────── Módulo 4: suspensiones ─────────
  { term: "Suspensión farmacéutica", moduleSlug: "suspensiones", definition: "Sistema heterodisperso en el que un **sólido insoluble** (típicamente 1–50 µm) está disperso en un líquido, para administrar una dosis líquida de un fármaco poco soluble." },
  { term: "Humectante", moduleSlug: "suspensiones", definition: "Tensioactivo (HLB aprox. 7–9, p. ej. **Span 20**) que **baja el ángulo de contacto** entre el sólido y el líquido, para que el polvo hidrófobo se moje sin flotar ni formar grumos." },
  { term: "Agente suspensor / viscosizante", moduleSlug: "suspensiones", definition: "Excipiente que **aumenta la viscosidad o estructura** el medio para frenar la sedimentación: CMC, goma xantana, **Veegum**, bentonita." },
  { term: "Silicato de aluminio y magnesio (Veegum®)", moduleSlug: "suspensiones", definition: "Arcilla en láminas (caras −, bordes +) que en reposo forma un **castillo de naipes**; imparte **tixotropía y pseudoplasticidad** y actúa en sinergia con la CMC." },
  { term: "Carboximetilcelulosa sódica (CMC)", moduleSlug: "suspensiones", definition: "Polímero hidrófilo **aniónico** que sube la viscosidad de la fase continua y actúa como **coloide protector** contra el caking." },
  { term: "Span 20 (monolaurato de sorbitán)", moduleSlug: "suspensiones", definition: "Tensioactivo **no iónico** de HLB ≈ 8,6, usado como humectante de sólidos hidrófobos." },
  { term: "Micronización", moduleSlug: "suspensiones", definition: "Reducción del tamaño de partícula (típicamente 1–50 µm). **Frena la sedimentación (Stokes ∝ r²)**, mejora la disolución y quita la sensación arenosa." },
  { term: "Preformulación", moduleSlug: "suspensiones", definition: "Estudio del fármaco **antes de formular**: tamaño y forma de partícula, densidad, ángulo de contacto, polimorfismo, solubilidad, pKa, estabilidad, compatibilidad con excipientes y sabor." },
  { term: "Polimorfismo", moduleSlug: "suspensiones", definition: "Existencia de un mismo compuesto en **varias formas cristalinas** con distinta solubilidad y estabilidad; puede causar crecimiento de cristales en una suspensión." },
  { term: "Crecimiento de cristales (maduración de Ostwald)", moduleSlug: "suspensiones", definition: "Las partículas pequeñas se disuelven (son más solubles) y el soluto **recristaliza sobre las grandes**; la suspensión «se hace gruesa» con el tiempo, sobre todo con cambios de temperatura." },
  { term: "Floculación controlada", moduleSlug: "suspensiones", definition: "Formación deliberada de **flóculos laxos** (mínimo secundario de DLVO), p. ej. con una dosis medida de electrolito; da un sedimento voluminoso, no cementado y redispersable." },
  { term: "Defloculación (sistema no floculado)", moduleSlug: "suspensiones", definition: "Partículas **individuales y separadas** por repulsión (|ζ| alto): sedimentan lento pero forman un sedimento compacto con riesgo de caking." },
  { term: "Volumen de sedimentación (F)", moduleSlug: "suspensiones", definition: "F = Vu / V₀: **volumen del sedimento ÷ volumen original**. F = 1 no hay interfase visible; F > 1 el sedimento supera el volumen original." },
  { term: "Altura relativa del sedimento (R)", moduleSlug: "suspensiones", definition: "R = h∞ / h₀: altura final del sedimento ÷ altura inicial. En un recipiente de sección uniforme coincide con F." },
  { term: "Grado de floculación (β)", moduleSlug: "suspensiones", definition: "β = F / F∞: relaciona el volumen de sedimentación de la suspensión **floculada** con el de la **no floculada**. Mayor β = floculante más eficaz; β = 1 equivale al sistema defloculado." },
  { term: "Redispersabilidad", moduleSlug: "suspensiones", definition: "Capacidad de un sedimento de volver a una dispersión uniforme con una **agitación suave**. Es la característica clave de una buena suspensión." },
  { term: "Inversión de carga", moduleSlug: "suspensiones", definition: "Con **exceso de electrolito** el ion se sigue adsorbiendo y el zeta cambia de signo; reaparece la repulsión y el sistema vuelve a defloculado (y a caking)." },
  { term: "Conservantes: metil y propilparabeno", moduleSlug: "suspensiones", definition: "El **metilparabeno** actúa mejor contra bacterias y el **propilparabeno** (más lipófilo) contra hongos; se usan juntos (3:1 a 4:1). Actúan como especie no ionizada, por eso dependen del pH." },
  { term: "Catálisis ácido-base específica y general", moduleSlug: "suspensiones", definition: "**Específica:** la degradación depende solo del pH (H⁺/OH⁻). **General:** también la catalizan las especies del tampón (fosfato, citrato…), así que depende de **cuánto tampón** hay." },
  { term: "Cap locking", moduleSlug: "suspensiones", definition: "Cristalización del azúcar (sacarosa) en la rosca de la tapa al evaporarse el vehículo, que **pega la tapa** al frasco. Se evita limitando la concentración de sacarosa." },
  { term: "Estabilidad física, química y microbiológica", moduleSlug: "suspensiones", definition: "**Física:** sedimentación, caking, crecimiento de cristales. **Química:** hidrólisis, oxidación, fotólisis. **Microbiológica:** crecimiento de bacterias y hongos; se controla con conservantes, pH y calidad del agua." },
];

export const corte2Formulas: FormulaContent[] = [
  {
    name: "Ley de Newton de la viscosidad",
    moduleSlug: "coloides-reologia",
    expression: "τ = η · γ̇          η = #{τ|γ̇}",
    variables: "τ = esfuerzo de cizalla (Pa) · η = viscosidad (Pa·s) · γ̇ = velocidad de cizalla (s^{−1})",
    description: "En un fluido **newtoniano**, el esfuerzo es proporcional a la velocidad de cizalla; la constante es la viscosidad.",
    derivation:
      "Imagina un mazo de cartas: si deslizas la carta de arriba, el esfuerzo (τ) es la fuerza por área para arrastrarla y γ̇ es qué tan rápido se desliza una capa respecto a la de abajo.\nSi el fluido es newtoniano, **duplicar la velocidad duplica el esfuerzo**: la gráfica τ vs γ̇ es una recta por el origen y η es su pendiente.\nUnidades: Pa ÷ s^{−1} = Pa·s. 1 Pa·s = 1000 mPa·s = 1000 cP.",
    examples: [
      "**Ejemplo.** τ = 12 Pa a γ̇ = 60 s⁻¹. η = 12 Pa ÷ 60 s⁻¹ = **0,20 Pa·s**. Conversión: 0,20 Pa·s × (1000 mPa·s / 1 Pa·s) = **200 mPa·s (200 cP)**. Si fuera newtoniano y γ̇ = 120 s⁻¹, τ = 0,20 × 120 = **24 Pa**.",
    ],
  },
  {
    name: "Viscosidad aparente",
    moduleSlug: "coloides-reologia",
    expression: "η_{ap} = #{τ|γ̇}",
    variables: "η_{ap} = viscosidad aparente (Pa·s) · τ = esfuerzo (Pa) · γ̇ = velocidad de cizalla (s^{−1})",
    description: "Cociente τ/γ̇ en **un punto** de la curva de flujo; en fluidos **no newtonianos** cambia con la cizalla.",
    derivation:
      "En un newtoniano η_ap es constante. En un no newtoniano se calcula punto por punto y su tendencia **clasifica** el fluido: si baja al subir γ̇ → **pseudoplástico**; si sube → **dilatante**; en un **plástico** es infinita a cizalla cero (no fluye) y decrece después de superar la cedencia.\nPor eso se informa siempre con la cizalla a la que se midió.",
    examples: [
      "**Ejemplo.** γ̇ = 10, 20, 40, 80 s⁻¹ con τ = 5, 8, 13, 21 Pa → η_ap = 0,500; 0,400; 0,325; 0,263 Pa·s. **Baja** al aumentar γ̇: **pseudoplástico**.",
    ],
  },
  {
    name: "Plástico de Bingham",
    moduleSlug: "coloides-reologia",
    expression: "τ = τ_{0} + η_{pl} · γ̇          (solo si τ > τ_{0})",
    variables: "τ_{0} = esfuerzo de cedencia (Pa) · η_{pl} = viscosidad plástica (Pa·s) · γ̇ = cizalla (s^{−1})",
    description: "Material que **no fluye** hasta superar un esfuerzo umbral; después fluye de forma lineal.",
    derivation:
      "Por debajo de τ₀ se comporta como un sólido (se deforma elásticamente, no fluye). Por encima, la recta tiene pendiente η_pl y **no pasa por el origen**: corta el eje del esfuerzo en τ₀.\nEs el modelo de la pasta dental, las pomadas y los geles: mantienen la forma hasta que los untas (superas τ₀).",
    examples: [
      "**Ejemplo.** τ₀ = 20 Pa, η_pl = 0,5 Pa·s. ¿Fluye con 15 Pa? **No** (15 < 20). Para γ̇ = 40 s⁻¹: τ = 20 + 0,5 × 40 = **40 Pa**.",
    ],
  },
  {
    name: "Energía de atracción de Hamaker (van der Waals)",
    moduleSlug: "coloides-reologia",
    expression: "V_{A} = − #{A · a|12 · H}",
    variables: "V_{A} = energía de atracción (J; el signo − = atracción) · A = constante de Hamaker (J) · a = radio de las esferas (m) · H = distancia entre superficies (m)",
    description: "Energía de atracción entre **dos esferas iguales** a distancias cortas (aproximación de Hamaker); es la V_A de la teoría DLVO.",
    derivation:
      "Lee la fórmula como una historia: la atracción es **más fuerte cuanto más grandes** son las partículas (a) y **mucho más fuerte cuanto más cerca** están (1/H).\nA contiene la química: qué material son las partículas y qué medio hay entre ellas.\nPor eso se micronizan las partículas (a pequeño) y se busca una repulsión V_R que compense la atracción cuando H se acorta: si no, caen al mínimo primario y hay caking.",
    examples: [
      "**Ejemplo de proporciones.** Si H baja de 10 nm a 1 nm (÷10), |V_A| sube **10 veces**. Si el radio a pasa de 0,25 µm a 2,5 µm (×10), |V_A| también sube **10 veces** (a la misma H).",
    ],
  },
  {
    name: "Energía total DLVO",
    moduleSlug: "coloides-reologia",
    expression: "V_{T} = V_{R} + V_{A}",
    variables: "V_{T} = energía total de interacción · V_{R} = repulsión de las dobles capas (+) · V_{A} = atracción de van der Waals (−)",
    description: "Suma de repulsión y atracción en función de la distancia entre partículas: determina si el sistema está defloculado, floculado o coagulado.",
    derivation:
      "V_R es positiva y cae de forma exponencial con la distancia; V_A es negativa y cae como 1/H. Su suma produce la curva con **tres zonas**: máximo V_m (barrera), mínimo secundario V_t (atracción débil, reversible → floculación controlada) y mínimo primario V_p (atracción irreversible → caking).\nBajar el potencial superficial o subir la sal **baja V_m**.",
    examples: [
      "**Lectura.** V_m = +45 kT (a 2 nm), V_t = −6 kT (a 20 nm), V_p muy profundo (a 0,3 nm): partículas separadas por la barrera; las que queden en V_t forman flóculos reversibles; las que crucen a V_p quedan pegadas para siempre.",
    ],
  },
  {
    name: "Longitud de Debye (espesor de la doble capa)",
    moduleSlug: "coloides-reologia",
    expression: "κ^{−1} ≈ #{0,304|√I}   nm",
    variables: "κ^{−1} = espesor de la doble capa (nm) · I = fuerza iónica (mol/L); válida para un electrolito 1:1 en agua a 25 °C",
    description: "Estima **qué tan lejos se extiende** la nube de contraiones; baja al subir la concentración de sal.",
    derivation:
      "Al subir la sal, hay más iones disponibles para apantallar la carga de la partícula, así que la nube de contraiones se **comprime**. Para un 1:1, 10 veces más sal reduce κ⁻¹ unas √10 ≈ 3,2 veces; 100 veces más sal, 10 veces.\nEs una aproximación (para otros electrolitos entra la valencia: κ⁻¹ decrece con z).",
    examples: [
      "**Ejemplo.** I = 10⁻³ M: κ⁻¹ = 0,304/√0,001 = **9,6 nm**. I = 10⁻¹ M: κ⁻¹ = 0,304/√0,1 = **0,96 nm**. La capa se hace 10 veces más delgada con 100 veces más sal.",
    ],
  },
  {
    name: "Regla de Schulze–Hardy",
    moduleSlug: "coloides-reologia",
    expression: "c_{crit} ∝ #{1|z^{6}}",
    variables: "c_{crit} = concentración crítica de coagulación · z = valencia del contraión (ion de carga opuesta a la partícula)",
    description: "Regla empírica: iones de mayor carga coagulan con concentraciones mucho menores.",
    derivation:
      "Si z pasa de 1 a 2, la concentración necesaria cae un factor 2⁶ = 64; a z = 3, 3⁶ = 729. Es aproximada, pero explica por qué un poquito de Al³⁺ o Ca²⁺ puede pasar de floculación controlada a coagulación irreversible.",
    examples: [
      "**Ejemplo.** Si con Na⁺ (z = 1) coagula a 100 mmol/L: con z = 2 → 100/64 ≈ **1,56 mmol/L**; con z = 3 → 100/729 ≈ **0,14 mmol/L**.",
    ],
  },
  {
    name: "Volumen de sedimentación (F)",
    moduleSlug: "suspensiones",
    expression: "F = #{V_{u}|V_{0}}          R = #{h_{∞}|h_{0}}",
    variables: "F = volumen de sedimentación (sin unidades) · V_{u} = volumen final del sedimento (mL) · V_{0} = volumen original de la suspensión (mL) · h_{∞}, h_{0} = alturas final e inicial del sedimento",
    description: "Fracción del volumen total que ocupa el sedimento; mide **qué tan voluminoso** es y, con ello, qué tan floculada está la suspensión.",
    derivation:
      "F cerca de 0 → sedimento muy compacto (defloculada, riesgo de caking). F = 1 → el sedimento ocupa todo el volumen: no hay interfase visible, la suspensión se mantiene uniforme (equilibrio de sedimentación). F > 1 → red floculada tan voluminosa que sobrepasa el volumen original.\nEn un recipiente de sección uniforme, R = h∞/h₀ es igual a F.\nOjo: los mL se cancelan; F no tiene unidades.",
    examples: [
      "**Ejemplo.** 100 mL de suspensión; sedimento final de 54 mL: F = 54/100 = **0,54**. Sin floculante el sedimento fue de 18 mL: F = 18/100 = **0,18**.",
    ],
  },
  {
    name: "Grado de floculación (β)",
    moduleSlug: "suspensiones",
    expression: "β = #{F|F_{∞}}",
    variables: "β = grado de floculación (sin unidades) · F = volumen de sedimentación de la suspensión floculada · F_{∞} = volumen de sedimentación de la misma suspensión defloculada",
    description: "Cuántas veces **aumenta el volumen del sedimento** gracias al agente floculante; mide su eficacia.",
    derivation:
      "Compara dos F: el del sistema floculado (arriba) y el del defloculado (referencia, abajo). Si β = 1, el floculante no hizo nada (o el sistema es el defloculado). Si β = 3, el sedimento es 3 veces más voluminoso.\nA mayor β, más esponjoso el sedimento y menor el riesgo de cementación. No confundir con F: F describe **un** sistema; β **compara** dos.",
    examples: [
      "**Ejemplo.** F (floculada) = 0,54; F∞ (defloculada) = 0,18. β = 0,54 / 0,18 = **3,0**.",
    ],
  },
];
