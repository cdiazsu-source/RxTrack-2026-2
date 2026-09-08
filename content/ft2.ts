import type { SubjectContent } from "./_schema";

/**
 * Farmacotecnia 2 (UNAL) — portado 1:1 desde el borrador
 * `github.com/cdiazsu-source/Farmacotecnia2` (`js/content.js`).
 * Es la fuente de verdad del temario: solo datos, sin lógica.
 */
export const ft2: SubjectContent = {
  code: "FT2",
  slug: "ft2",
  name: "Farmacotecnia 2",
  credits: "4",
  professors: ["Yolima Baena Aristizábal", "Marcela Aragón Novoa"],
  scheduleTheory: "Lunes y Martes 14:00–16:00",
  scheduleLab: "Martes 9:00–13:00, Jueves 9:00–13:00, Viernes 14:00–18:00",
  totalClasses: 32,

  // Asignatura teórico-práctica con laboratorio y componente cuantitativo:
  // se muestran todas las secciones.
  sections: ["modulos", "laboratorio", "proyectos", "fechas", "glosario", "formulas", "bibliografia", "insumos", "prompt-ia"],
  descriptionSummary:
    "Farmacotecnia II es la asignatura del programa de Farmacia enfocada en el diseño y desarrollo de **productos farmacéuticos heterodispersos** — suspensiones, emulsiones y sistemas semisólidos — desde sus fundamentos fisicoquímicos y biofarmacéuticos hasta su **manufactura a escala de laboratorio**.",
  objectiveGeneral:
    "Al finalizar esta asignatura estarás en capacidad de reconocer y manejar los **factores críticos fisicoquímicos y biofarmacéuticos** requeridos para el correcto diseño y desarrollo de un producto farmacéutico presentado en forma de sistema heterodisperso, además de desarrollar las habilidades para su manufactura a escala de laboratorio.",
  objectivesSpecific: [
    "Desarrollar las **bases conceptuales de tipo fisicoquímico** e integrarlas con los conceptos biofarmacéuticos para la formulación de productos en forma de suspensión y/o emulsión, de aspecto fluido, semisólido o sólido.",
    "Reconocer **problemas de inestabilidad física y química** de estos productos, diseñar estudios de estabilidad sencillos e interpretar sus datos para estimar vida útil y condiciones óptimas de almacenamiento.",
    "Desarrollar un alto sentido de **responsabilidad ética y de seguridad** sobre la inadecuada utilización de estos conceptos y habilidades.",
  ],
  hasLab: true,

  modules: [
    {
      slug: "introduccion",
      title: "Módulo 1: Sistemas heterodispersos",
      description:
        "Presentación del curso y metodología de evaluación. Características de los **sistemas polifásicos** y su importancia en la industria farmacéutica. Clasificación de los **sistemas heterodispersos** y generalidades de su desarrollo.",
      hasLab: true,
      labProtocol:
        "Reglamento del laboratorio, normas para el desarrollo de las prácticas, formato de presentación de informes y asignación de los productos que se abordarán durante el semestre.",
    },
    {
      slug: "tensioactivos-hlb",
      title: "Módulo 2: Tensioactivos y sistema HLB",
      description:
        "Tensioactivos y su aplicación en sistemas heterodispersos: clasificación general, **sistema HLB**, propiedades interfaciales de sistemas líquido-líquido, **tensión interfacial**, extensión, cohesión y adhesión. **Ángulo de contacto**, fenómenos de mojado y repelencia, adsorción sólido-líquido. Cálculo del HLB de un tensioactivo y de mezclas. Introducción a sistemas coloidales.",
      hasLab: true,
      labProtocol:
        "Determinación de propiedades de tensioactivos (poder emulsificante, humectante, gelificante, solubilizante y efecto de electrolitos). Comportamiento de interfases sólido-líquido: mojado, flotación y extensión frente a distintos sólidos.",
    },
    {
      slug: "coloides-reologia",
      title: "Módulo 3: Sistemas coloidales y reología",
      description:
        "Sistemas dispersos coloidales: forma y tamaño de partículas, aplicación farmacéutica, coloides liofílicos, liofóbicos y de asociación. Propiedades eléctricas (**doble capa eléctrica**), ópticas, cinéticas y de sedimentación. Viscosidad y propiedades reológicas: sistemas newtonianos y no newtonianos, **tixotropía**, reopexia y viscoelasticidad.",
      hasLab: true,
      labProtocol:
        "Comportamiento de dispersiones de sólidos y efecto de electrolitos, tamaño de partícula y densidad sobre la velocidad de sedimentación. Comportamiento reológico y capacidad suspensora de distintos materiales, individuales y en mezcla.",
    },
    {
      slug: "suspensiones",
      title: "Módulo 4: Formulación y estabilidad de suspensiones",
      description:
        "Formulación de **suspensiones** y su aplicación farmacéutica. Efecto de los excipientes sobre la estabilidad: **viscosamiento**, **apastelamiento** y efecto del tamaño de partícula sobre el aspecto y consistencia del producto.",
      hasLab: true,
      labProtocol:
        "Evaluación de la incidencia de los excipientes sobre la estabilidad de una suspensión (viscosamiento y apastelamiento).",
    },
    {
      slug: "emulsiones",
      title: "Módulo 5: Emulsiones — teoría, formulación y estabilidad",
      description:
        "Definiciones y teorías de formación de **emulsiones**. Composición general, tipos de agentes emulsificantes y propiedades de las interfases formadas. Estabilidad física: **cremado**, sedimentación, **coalescencia**, ruptura e **inversión de fases**. Emulsiones clásicas: ungüento hidrófilo, tensioactivos no iónicos y formación de jabón in-situ (vanishing cream y cold cream).",
      hasLab: true,
      labProtocol:
        "Preparación de emulsiones aplicando el concepto de HLB requerido. Formulación de bases tipo emulsión (cold cream, vanishing cream, ungüento hidrófilo). Técnicas para identificar el tipo de emulsión e inversión de fases.",
    },
    {
      slug: "semisolidos-geles",
      title: "Módulo 6: Sistemas semisólidos y geles",
      description:
        "Clasificación de los **sistemas semisólidos**. Los geles: fenómenos de **sinéresis** e hinchamiento. Propiedades hidrofílicas y reológicas de los semisólidos.",
      hasLab: true,
      labProtocol:
        "Bases para ungüentos: oleaginosas, de absorción, emulsionadas, hidrosolubles y soportes tipo hidrogel. Entrega de la propuesta escrita para el producto final.",
    },
    {
      slug: "producto-final",
      title: "Módulo 7: Producto final — preparación magistral",
      description:
        "Aplicación integrada de los sistemas heterodispersos al desarrollo de productos de **preparación magistral**. Retroalimentación y ajuste de la propuesta del producto final.",
      hasLab: true,
      labProtocol:
        "Desarrollo, entrega y socialización del producto final de laboratorio ante los grupos del curso.",
    },
  ],

  glossary: [
    { term: "Sistema heterodisperso", moduleSlug: "introduccion", definition: "Sistema formado por **dos o más fases**, en el que una fase (dispersa) se encuentra distribuida dentro de otra (dispersante o continua); incluye suspensiones, emulsiones y sistemas semisólidos." },
    { term: "Sistema polifásico", moduleSlug: "introduccion", definition: "Sistema compuesto por **más de una fase** físicamente distinguible (sólida, líquida o gaseosa)." },
    { term: "Tensioactivo", moduleSlug: "tensioactivos-hlb", definition: "Sustancia que **reduce la tensión superficial o interfacial** entre dos fases, favoreciendo procesos como la emulsificación, humectación o solubilización." },
    { term: "HLB (Balance Hidrófilo-Lipófilo)", moduleSlug: "tensioactivos-hlb", definition: "Valor numérico (0-20) que indica la **afinidad relativa** de un tensioactivo por la fase acuosa u oleosa; valores bajos favorecen emulsiones A/O y valores altos O/A." },
    { term: "Tensión interfacial", moduleSlug: "tensioactivos-hlb", definition: "**Fuerza por unidad de longitud** que actúa en la interfase entre dos fases inmiscibles, tendiendo a minimizar el área de contacto entre ellas." },
    { term: "Ángulo de contacto", moduleSlug: "tensioactivos-hlb", definition: "Ángulo formado entre la superficie de un sólido y la tangente a la superficie de un líquido en el punto de contacto; indica el **grado de mojado**." },
    { term: "Adsorción sólido-líquido", moduleSlug: "tensioactivos-hlb", definition: "**Acumulación de moléculas** (p. ej. un tensioactivo) en la interfase entre un sólido y un líquido." },
    { term: "Sistema coloidal", moduleSlug: "coloides-reologia", definition: "Sistema disperso en el que el **tamaño de partícula** de la fase dispersa está aproximadamente entre 1 nm y 1 µm." },
    { term: "Coloide liofílico / liofóbico", moduleSlug: "coloides-reologia", definition: "**Liofílico**: coloide con afinidad por el medio de dispersión, se dispersa espontáneamente. **Liofóbico**: coloide sin afinidad por el medio, requiere estabilización externa." },
    { term: "Doble capa eléctrica", moduleSlug: "coloides-reologia", definition: "Distribución de cargas eléctricas alrededor de una partícula coloidal cargada, formada por una **capa fija** y una **capa difusa** de iones de signo contrario." },
    { term: "Tixotropía", moduleSlug: "coloides-reologia", definition: "Propiedad reológica de ciertos sistemas no newtonianos en la que la **viscosidad disminuye** con el esfuerzo de cizalla en el tiempo y se recupera en reposo." },
    { term: "Reopexia", moduleSlug: "coloides-reologia", definition: "Comportamiento reológico opuesto a la tixotropía: la **viscosidad aumenta** con el tiempo bajo un esfuerzo de cizalla constante." },
    { term: "Floculación / agente floculante", moduleSlug: "suspensiones", definition: "**Agregación reversible** de partículas en flóculos laxos, usada para controlar la sedimentación y facilitar la resuspensión de una suspensión." },
    { term: "Apastelamiento (caking)", moduleSlug: "suspensiones", definition: "Formación de un **sedimento compacto** y difícil de resuspender en una suspensión, típico de sistemas deficientemente floculados." },
    { term: "Emulsión", moduleSlug: "emulsiones", definition: "Sistema heterogéneo de dos líquidos inmiscibles, uno **disperso en forma de gotas** dentro del otro, estabilizado por un agente emulsificante." },
    { term: "Cremado (creaming)", moduleSlug: "emulsiones", definition: "Separación **reversible** de una emulsión en dos capas de distinta concentración de fase dispersa, sin ruptura de las gotas, por diferencia de densidades." },
    { term: "Coalescencia", moduleSlug: "emulsiones", definition: "Unión **irreversible** de gotas de la fase dispersa de una emulsión, que conduce a la ruptura del sistema." },
    { term: "Inversión de fases", moduleSlug: "emulsiones", definition: "Fenómeno en el que una emulsión **cambia de tipo** (de aceite en agua a agua en aceite, o viceversa) por cambios en composición, temperatura o proporción de fases." },
    { term: "Gel", moduleSlug: "semisolidos-geles", definition: "Sistema semisólido formado por una **red tridimensional** de partículas o macromoléculas que inmoviliza un líquido en su interior." },
    { term: "Sinéresis", moduleSlug: "semisolidos-geles", definition: "**Exudación espontánea** de líquido desde un gel, causada por la contracción de su red estructural." },
  ],

  formulas: [
    {
      name: "HLB requerido de una mezcla de tensioactivos",
      expression: "HLB_{mezcla} = #{HLB_{A} × %A + HLB_{B} × %B|100}",
      variables: "HLB_{A}, HLB_{B} = HLB de cada tensioactivo · %A, %B = porcentaje en peso de cada uno (suman 100)",
      description: "Calcula el HLB resultante de **combinar dos o más tensioactivos**, o la proporción necesaria para alcanzar un HLB requerido dado.",
      moduleSlug: "tensioactivos-hlb",
      derivation:
        "Es un **promedio ponderado** de los valores de HLB individuales de cada tensioactivo, usando su proporción en la mezcla como peso. Se apoya en el supuesto —razonablemente válido en la práctica— de que el HLB de una mezcla se comporta de forma **aditiva** respecto a la fracción de cada componente. Se usa para ajustar el HLB de una mezcla de tensioactivos al HLB requerido por la fase oleosa de una emulsión.\nHLB_{mezcla} = HLB resultante de la mezcla — sin unidades (escala adimensional de 0 a 20).\nHLB_{A}, HLB_{B} = HLB de cada tensioactivo puro — sin unidades (escala adimensional de 0 a 20).\n%A, %B = porcentaje en peso de cada tensioactivo **dentro de la mezcla de tensioactivos** (no de la formulación total) — % p/p, deben sumar 100.",
    },
    {
      name: "HLB de un tensioactivo no iónico (método de Griffin)",
      expression: "HLB = 20 × #{M_{h}|M}",
      variables: "M_{h} = masa molecular de la porción hidrófila · M = masa molecular total de la molécula",
      description: "Estima el HLB de un tensioactivo **no iónico** a partir de su estructura química.",
      moduleSlug: "tensioactivos-hlb",
      derivation:
        "Estima el HLB a partir de la **estructura molecular** del tensioactivo: compara qué fracción de la masa total de la molécula corresponde a la porción hidrófila (polar, p. ej. una cadena de polietilenglicol) frente a la masa total. El factor 20 es una constante empírica de Griffin que normaliza la escala, de modo que un tensioactivo teóricamente 100% hidrófilo (M_{h} = M) obtenga HLB = 20, el máximo de la escala.\nHLB = índice resultante — sin unidades (escala adimensional de 0 a 20).\nM_{h} = masa molecular de la porción hidrófila de la molécula — g/mol.\nM = masa molecular total de la molécula del tensioactivo — g/mol.",
    },
    {
      name: "Ley de Stokes (velocidad de sedimentación)",
      expression: "v = #{2r^{2}(ρ_{s} − ρ_{l})g|9η}",
      variables: "v = velocidad de sedimentación · r = radio de partícula · ρ_{s} = densidad del sólido · ρ_{l} = densidad del líquido · g = gravedad · η = viscosidad del medio",
      description: "**Predice la velocidad de sedimentación** de partículas esféricas en una suspensión diluida; explica el efecto del tamaño de partícula y la viscosidad en la estabilidad física.",
      moduleSlug: "coloides-reologia",
      derivation:
        "Se obtiene igualando la **fuerza gravitacional neta** que actúa sobre una partícula esférica (su peso menos el empuje del líquido) con la **fuerza de fricción viscosa** que se opone a su caída; al despejar la velocidad terminal de ese equilibrio se llega a esta ecuación. Muestra que la sedimentación es muy sensible al tamaño de partícula (depende de r²) y que puede frenarse aumentando la viscosidad del vehículo o reduciendo la diferencia de densidades entre las fases. Solo es válida para **suspensiones diluidas**, con flujo laminar y partículas esféricas no floculadas.\nv = velocidad de sedimentación (velocidad terminal) — m/s (SI) o cm/s (cgs).\nr = radio de la partícula, asumida esférica — m (SI) o cm (cgs).\nρ_{s} = densidad del sólido (fase dispersa) — kg/m³ (SI) o g/cm³ (cgs).\nρ_{l} = densidad del líquido (fase dispersante) — kg/m³ (SI) o g/cm³ (cgs).\ng = aceleración de la gravedad — 9.8 m/s² (SI) o 981 cm/s² (cgs).\nη = viscosidad del medio dispersante — Pa·s (SI) o poise (cgs).",
    },
    {
      name: "Ecuación de Einstein (viscosidad de suspensiones diluidas)",
      expression: "η = η_{0}(1 + 2.5φ)",
      variables: "η = viscosidad de la suspensión · η_{0} = viscosidad del medio dispersante · φ = fracción de volumen de partículas dispersas",
      description: "Relaciona la **viscosidad de una suspensión diluida** de partículas esféricas rígidas con la concentración de la fase dispersa.",
      moduleSlug: "coloides-reologia",
      derivation:
        "Describe cómo la presencia de partículas sólidas rígidas y esféricas **aumenta la viscosidad** de un líquido en el que están dispersas, incluso sin que haya interacción entre ellas. El coeficiente 2.5 proviene del análisis hidrodinámico de Einstein sobre cómo una esfera rígida perturba las líneas de flujo del líquido que la rodea. Solo aplica a **suspensiones muy diluidas** (φ menor a ~0.02–0.05); a concentraciones mayores las partículas empiezan a interactuar entre sí y la relación deja de ser lineal.\nη = viscosidad de la suspensión — Pa·s (SI) o poise (cgs).\nη_{0} = viscosidad del medio dispersante puro, sin partículas — Pa·s (SI) o poise (cgs).\nφ = fracción de volumen ocupada por las partículas dispersas respecto al volumen total de la suspensión — sin unidades (0 a 1).",
    },
    {
      name: "Relación de sedimentación (índice de floculación)",
      expression: "F = #{V_{u}|V_{o}}",
      variables: "V_{u} = volumen final del sedimento floculado · V_{o} = volumen final del sedimento no floculado (referencia)",
      description: "Compara el volumen de sedimentación de una suspensión floculada frente a una no floculada; valores de F cercanos o mayores a 1 indican **buena floculación**.",
      moduleSlug: "suspensiones",
      derivation:
        "Compara qué tan voluminoso queda el sedimento de una suspensión **floculada** frente al de la misma suspensión en estado **no floculado** (de referencia), una vez que ambas terminan de sedimentar. Un valor de F cercano a 1 (o mayor) indica un sedimento voluminoso y fácil de resuspender —señal de buena floculación—; valores bajos indican un sedimento compacto y difícil de resuspender (apastelamiento).\nF = índice de floculación — sin unidades.\nV_{u} = volumen final (de equilibrio) del sedimento en la suspensión floculada — mL o cm³.\nV_{o} = volumen final (de equilibrio) del sedimento en la suspensión no floculada, usada como referencia — mL o cm³.",
    },
    {
      name: "Dilución",
      expression: "C_{1}V_{1} = C_{2}V_{2}",
      variables: "C_{1}, V_{1} = concentración y volumen inicial · C_{2}, V_{2} = concentración y volumen final",
      description: "Calcula volúmenes o concentraciones al **diluir una formulación** (tensioactivo, principio activo) a una concentración de trabajo.",
      derivation:
        "Expresa la **conservación de la masa de soluto** al diluir una solución: la cantidad total de soluto (concentración × volumen) antes de diluir es igual a la cantidad total después, porque diluir solo agrega solvente sin agregar ni quitar soluto. Permite calcular el volumen de una solución concentrada (stock) necesario para preparar un volumen dado a una concentración de trabajo.\nC_{1} = concentración de la solución inicial (concentrada, stock) — cualquier unidad de concentración (mg/mL, %, mol/L...), consistente con C_{2}.\nV_{1} = volumen de la solución inicial que se debe tomar — mL o L, consistente con V_{2}.\nC_{2} = concentración deseada de la solución final (diluida) — misma unidad que C_{1}.\nV_{2} = volumen final de la solución diluida que se desea preparar — misma unidad que V_{1}.",
    },
    {
      name: "Ecuación de Young (equilibrio del mojado)",
      expression: "γ_{SV} = γ_{SL} + γ_{LV} cos θ",
      variables: "γ_{SV} = tensión sólido-vapor · γ_{SL} = tensión interfacial sólido-líquido · γ_{LV} = tensión superficial líquido-vapor · θ = ángulo de contacto",
      description: "Describe el equilibrio de fuerzas en el punto de contacto entre un líquido y un sólido; a **menor ángulo de contacto, mejor mojado** del sólido por el vehículo.",
      moduleSlug: "tensioactivos-hlb",
      derivation:
        "Describe el **equilibrio de tensiones superficiales e interfaciales** en el punto donde se encuentran las tres fases (sólido, líquido y vapor) cuando una gota de líquido reposa sobre una superficie sólida. Al despejar cos θ se obtiene una medida cuantitativa de qué tan bien moja el líquido al sólido: cuanto **menor el ángulo de contacto** (cos θ más cercano a 1), mejor es el mojado del sólido por el vehículo — relevante para dispersar polvos hidrófobos en un vehículo acuoso.\nγ_{SV} = tensión interfacial sólido-vapor (energía superficial del sólido seco) — mN/m (SI) o dyn/cm (cgs).\nγ_{SL} = tensión interfacial sólido-líquido — mN/m (SI) o dyn/cm (cgs).\nγ_{LV} = tensión superficial líquido-vapor (del líquido frente al aire) — mN/m (SI) o dyn/cm (cgs).\nθ = ángulo de contacto, medido entre la superficie sólida y la tangente a la gota en el punto de contacto — grados (°) o radianes; su coseno es adimensional.",
    },
    {
      name: "Concentración porcentual (p/v, p/p, v/v)",
      expression: "%p/v = #{g soluto|100 mL} × 100\n%p/p = #{g soluto|100 g} × 100\n%v/v = #{mL soluto|100 mL} × 100",
      variables: "g = gramos de soluto · mL = mililitros de solución/solvente",
      description: "Formas habituales de expresar la **concentración** de un componente (tensioactivo, conservante, principio activo) en una formulación.",
      derivation:
        "Son tres formas equivalentes de expresar **cuánto soluto hay por cada 100 unidades de solución o solvente**; la que corresponde usar depende de si el soluto y la solución se miden en masa o en volumen. %p/v se usa cuando el soluto es sólido y la solución es líquida (lo más común en formulaciones farmacéuticas); %p/p cuando ambos se expresan en masa (típico en semisólidos); %v/v cuando ambos son líquidos.\n%p/v = gramos de soluto por cada 100 mL de solución — % (equivale a g/100 mL).\n%p/p = gramos de soluto por cada 100 g de la mezcla total (solución o semisólido) — % (equivale a g/100 g).\n%v/v = mililitros de soluto líquido por cada 100 mL de solución — % (equivale a mL/100 mL).\ng = masa del soluto — gramos.\nmL = volumen del soluto o de la solución — mililitros.",
    },
  ],

  evaluation: [
    { name: "1er Parcial", weight: 15 },
    { name: "2do Parcial", weight: 15 },
    { name: "3er Parcial (Laboratorio)", weight: 15 },
    { name: "4to Parcial", weight: 15 },
    { name: "Seminario", weight: 5 },
    { name: "Quices de laboratorio", weight: 15 },
    { name: "Informes de laboratorio", weight: 10 },
    { name: "Producto final", weight: 10 },
  ],

  keyDates: [
    { name: "1er Parcial", weight: "15%" },
    { name: "2do Parcial", weight: "15%" },
    { name: "3er Parcial (Laboratorio)", weight: "15%" },
    { name: "4to Parcial", weight: "15%" },
    { name: "Seminario", weight: "5%" },
    { name: "Entrega Producto Final", weight: "10%" },
  ],

  projects: [
    { title: "Seminario", category: "Seminario" },
    { title: "Producto final de laboratorio", category: "Producto final" },
    { title: "Informes de laboratorio", category: "Laboratorio" },
    { title: "Propuesta escrita del producto final", category: "Producto final" },
  ],

  bibliography: [
    { kind: "libro", reference: "Aulton, M. Pharmaceutics, the science of dosage form design. Second edition. 2002." },
    { kind: "libro", reference: "Banker G., Rhodes C., Editores. Modern Pharmaceutics. Marcel Dekker Inc., New York. 1990." },
    { kind: "libro", reference: "Becher, P. Emulsiones, Teoría y Práctica. Editorial Blume, España. 1972." },
    { kind: "libro", reference: "Connors K.A., Amidon G.L., Kennon L.I. Chemical Stability of Pharmaceuticals. 2nd Ed., John Wiley and Sons, New York. 1986." },
    { kind: "libro", reference: "Florence, A.T. and D. Attwood. Physicochemical Principles of Pharmacy. 3rd edition, MacMillan Press Ltd., London. 1998." },
    { kind: "libro", reference: "Handbook of Pharmaceutical Excipients. American Pharmaceutical Assoc. N.Y. Washington, D.C. USA." },
    { kind: "libro", reference: "Jeannin C.; Mangeot A.; Verain A. Ingeniería Farmacéutica. Editorial El Manual Moderno, México. 1986." },
    { kind: "libro", reference: "Lachman L.; Lieberman H.A.; Kanig J.L. The Theory and Practice of Industrial Pharmacy. 3rd Edition. Lea & Febiger. Philadelphia. 1986." },
    { kind: "libro", reference: "Lieberman H.A.; Rieger M.M.; Banker G.S. Pharmaceutical Dosage Forms: Disperse Systems. Vol. 1, 2. Marcel Dekker, New York. 1989." },
    { kind: "libro", reference: "Martin A. Physical Pharmacy. Physical Chemical Principles in the Pharmaceutical Sciences. 4th Ed., Lea & Febiger. Philadelphia. 1993." },
    { kind: "libro", reference: "Martindale. The Extra Pharmacopoeia. 30th ed. J.E.F. Reynolds, editor. The Pharmaceutical Press. London. 1993." },
    { kind: "libro", reference: "OMS. Comité de Expertos en Especificaciones para las Preparaciones Farmacéuticas. Buenas Prácticas de Manufactura para la Fabricación de Productos Farmacéuticos. Serie de Informes Técnicos de la OMS, 32 Informe. Ginebra." },
    { kind: "libro", reference: "Swarbrick, J. y Boylan, J. Encyclopedia of Pharmaceutical Technology. Marcel Dekker, Inc. 1996." },
    { kind: "libro", reference: "The United States Pharmacopeia USP. The National Formulary NF. United States Pharmacopeial Convention, Inc. Rockville." },
    { kind: "libro", reference: "Voigt R., Bornschein M. Tratado de Tecnología Farmacéutica. Editorial Acribia. Zaragoza, España. 1979." },
    { kind: "libro", reference: "Wells, J. Pharmaceutical Preformulation, the physicochemical properties of drug substances. Ellis Horwood Limited. 1993." },
    { kind: "revista", reference: "Journal of Controlled Release" },
    { kind: "revista", reference: "Pharmaceutical Research" },
    { kind: "revista", reference: "Biomaterials" },
    { kind: "revista", reference: "International Journal of Pharmaceutical Sciences" },
  ],

  // ------------------------------------------------------------------
  //  LABORATORIO — reglas + prácticas (Laboratorio de Farmacotecnia 450-110)
  //  Fuente: Reglamento Interno del Laboratorio + Guías de Farmacotecnia II.
  // ------------------------------------------------------------------
  labRules: [
    "**Presentación personal para toda práctica:** bata blanca abotonada, zapatos cerrados sin tacón, cabello bien recogido (hombre o mujer), sin uñas largas ni esmalte, sin aretes/aros grandes ni joyas.",
    "**Elementos de protección personal (EPP):** usar los que exija el riesgo de la práctica (gafas de seguridad, guantes, mascarilla). Es obligación del estudiante y el docente lo verifica al ingresar.",
    "**En la zona de trabajo NO se puede:** comer, beber ni fumar; aplicarse cosméticos; manipular lentes de contacto.",
    "**Acceso restringido:** solo personal autorizado. Prohibido el ingreso con licor o bajo sus efectos; no se permite el ingreso de niños ni de animales.",
    "**Orden e higiene:** mesas ordenadas y sin materiales ajenos a la práctica. Limpiar y descontaminar la superficie después de cualquier derrame y al terminar la jornada.",
    "**Nunca** guardar alimentos, medicamentos de uso personal ni bebidas en neveras/muebles destinados a reactivos, suministros o herramientas.",
    "**Rutas de seguridad:** puertas de emergencia, salidas y duchas de seguridad deben quedar siempre despejadas durante la práctica.",
    "**Equipos:** usarlos solo para lo previsto y según las instrucciones del docente; pedir la explicación ANTES de operar un equipo nuevo (p. ej. viscosímetros, Mastersizer). Reponer o reparar el material roto por el grupo.",
    "**Residuos:** los materiales, muestras y cultivos contaminados se esterilizan o neutralizan; los residuos químicos se disponen según el Sistema de Gestión Ambiental de la Sede — no verter al desagüe sin autorización.",
    "**Programación:** cumplir el horario y la programación de la práctica; verificar con antelación reactivos y material. Trabajar fuera de la jornada requiere autorización del coordinador.",
    "**Deberes generales de quien ingresa:** acatar este reglamento, respetar las buenas prácticas de laboratorio, cuidar la infraestructura y los elementos, dar trato respetuoso y no perturbar el trabajo de los demás, cumplir las normas de seguridad para prevenir accidentes.",
    "**Referencia:** Manual de Seguridad para Laboratorios (División Nacional de Salud Ocupacional, UNAL): http://www.laboratorios.bogota.unal.edu.co/userfiles/files/MANUAL%20DE%20SEGURIDAD%20LABORATORIOS%2031-10-2012_final(1).pdf",
  ],

  labPractices: [
    {
      number: 1,
      title: "Propiedades y aplicaciones tecnológicas de un agente tensioactivo",
      moduleSlug: "tensioactivos-hlb",
      fundamento:
        "Un mismo agente tensioactivo puede cumplir varias funciones tecnológicas según su concentración y el sistema en que se use. La práctica verifica **cinco propiedades** de forma directa: efecto **viscosante** (y su modulación por electrolitos), efecto **gelificante** (jabón formado in situ en distintos vehículos), poder **humectante**, poder **solubilizante** (solubilización micelar) y poder **emulsificante**.",
      keyPoints: [
        "Lauril éter sulfato de sodio (LESS) comercial ≈ 28 %: para trabajar al 5 % hay que diluir. Agitar **suave** para no generar espuma.",
        "El NaCl aumenta la viscosidad de las soluciones de sulfato de alquilo hasta un máximo y luego la baja (salting-out): por eso se adiciona en incrementos de 3,0 g hasta 15,0 g acumulados.",
        "Viscosidad **por triplicado** en viscosímetro rotacional, en cada punto.",
        "Efecto gelificante: se forma **estearato de sodio** (ácido esteárico + NaOH) en etanol, propilenglicol o glicerina; adicionar la solución de NaOH cuando ambas fases estén a la **misma temperatura**.",
        "Poder humectante: comparar la sedimentación del azufre pulverizado en agua vs. con ARLACEL®/SPAN 20® (mide velocidad de sedimentación, volumen y aspecto del sedimento y del sobrenadante).",
        "Poder solubilizante: adicionar Polisorbato 80/20 gota a gota (0,1 mL) sobre salicilato de metilo o aceite de eucalipto + agua, hasta obtener un sistema **monofásico transparente** (máx. 1,0 mL de tensioactivo). Comparar con el orden de adición inverso (tensioactivo sobre aceite y luego agua).",
        "Poder emulsificante: identificar fase oleosa y acuosa, calentar ambas al baño maría a la misma temperatura y adicionar la **acuosa sobre la oleosa** agitando de forma constante.",
        "Todo el trabajo con espuma/agitación: usar espátula de plástico y agitación suave para no introducir aire.",
      ],
      procedure:
        "#### Efecto viscosante\n" +
        "1. Preparar una dispersión de lauril éter sulfato de sodio al **5 %** en agua (partiendo del comercial al 28 %).\n" +
        "2. Determinar la viscosidad con viscosímetro rotacional, **por triplicado**.\n" +
        "3. Adicionar **3,0 g de NaCl**, disolver con agitación suave (sin espuma) y volver a medir la viscosidad por triplicado.\n" +
        "4. Repetir la adición de 3,0 g de NaCl y la medición, hasta **15,0 g acumulados**.\n" +
        "5. Graficar viscosidad vs. NaCl adicionado y analizar el fenómeno.\n\n" +
        "#### Efecto gelificante (formulaciones EG1 etanol · EG2 glicerina · EG3 agua)\n" +
        "| Componente (g) | EG1 | EG2 | EG3 |\n| --- | --- | --- | --- |\n| Ácido esteárico | 2,0 | 2,0 | 2,0 |\n| Hidróxido de sodio | 0,35 | 0,35 | 0,35 |\n| Etanol | 43,0 | – | – |\n| Glicerina | – | 43,0 | – |\n| Agua csp | – | – | 50,0 |\n\n" +
        "1. Colocar el ácido esteárico en un erlenmeyer y adicionar el vehículo (etanol / glicerina / agua csp).\n" +
        "2. Calentar suave al baño maría hasta fusión/disolución completa (sistema translúcido).\n" +
        "3. Disolver el NaOH en 5,0 mL de agua, calentar al baño maría a la **misma temperatura** y adicionarlo lentamente sobre la dispersión de ácido esteárico.\n" +
        "4. Continuar el calentamiento 2 min agitando suave; verter en un molde plástico.\n" +
        "5. Dejar solidificar; observar y describir los geles obtenidos.\n\n" +
        "#### Poder humectante\n" +
        "1. Pulverizar 1,0 g de azufre en mortero de porcelana; adicionar 25 mL de agua y homogenizar con el pistilo.\n" +
        "2. Pasar a probeta de 50 mL y completar a volumen con las aguas de lavado del mortero.\n" +
        "3. Repetir con 1,0 g de ARLACEL®/SPAN 20® en lugar de agua para la homogenización.\n" +
        "4. En cada suspensión: medir **velocidad de sedimentación**, **volumen** y **aspecto** del sedimento y del sobrenadante. Comparar.\n\n" +
        "#### Poder solubilizante\n" +
        "*Primera parte:* 0,1 mL de salicilato de metilo o aceite de eucalipto + 5 mL de agua en vidrio de reloj → ¿bifásico? Adicionar Polisorbato 80/20 de **0,1 en 0,1 mL** homogenizando, hasta sistema monofásico transparente (máx. 1,0 mL).\n" +
        "*Segunda parte:* 0,1 mL del material oleoso + 1,0 mL de Polisorbato, homogenizar; luego adicionar agua con bureta en porciones de 0,5 mL hasta 5,0 mL, homogenizando y observando después de cada adición. Comparar ambos procedimientos y explicar la diferencia.\n\n" +
        "#### Poder emulsificante\n" +
        "1. Identificar los componentes de la fase oleosa y de la acuosa de la Tabla 2.\n" +
        "2. Fase oleosa en cápsula de porcelana, al baño maría hasta fusión completa.\n" +
        "3. Fase acuosa en vaso de precipitados, al baño maría a la misma temperatura; adicionarla sobre la oleosa agitando constante con espátula de plástico.\n" +
        "4. Mantener el calentamiento 2 min agitando; retirar y enfriar hasta temperatura ambiente sin dejar de agitar.\n" +
        "5. Evaluar aspecto y características de las emulsiones.",
      equations: [
        {
          name: "Velocidad de sedimentación",
          expression: "v_{sed} = #{1|t}",
          variables: "t = tiempo (s) que tarda la fase dispersa en sedimentar",
          description: "Se usa para comparar el poder humectante/estabilizante entre sistemas.",
        },
      ],
      dataRequested: [
        "Viscosidad de la dispersión al 5 % (triplicado) y en cada punto de NaCl acumulado (3–15 g); gráfica viscosidad vs. NaCl.",
        "Descripción de los tres geles EG1/EG2/EG3 (aspecto, consistencia, transparencia).",
        "Poder humectante: velocidad de sedimentación, volumen y aspecto del sedimento y del sobrenadante — azufre en agua vs. con ARLACEL®/SPAN 20®.",
        "Poder solubilizante: volumen de tensioactivo para llegar a sistema transparente (1.ª parte) y observaciones al añadir agua (2.ª parte).",
        "Poder emulsificante: aspecto y características de cada emulsión de la Tabla 2.",
      ],
      studyTopics: [
        "Comportamiento de la interfase líquido–líquido (fenómenos y coeficiente de extensión).",
        "Aspectos generales, propiedades y aplicaciones tecnológicas de los agentes tensioactivos.",
        "Propiedades de los tensioactivos: poder emulsificante, humectante, solubilizante, viscosante, gelificante; interacción por cargas; número de agua; punto de enturbiamiento.",
      ],
    },

    {
      number: 2,
      title: "Humectación de un sólido: punto de mojado y efecto de aditivos",
      moduleSlug: "tensioactivos-hlb",
      fundamento:
        "La **humectación** es el primer paso para dispersar un sólido en un líquido. Se cuantifica con el **punto de mojado** (mL de agua para humectar 100 g de sólido) y se evalúa el efecto de **agentes humectantes** (tensioactivos, polioles, hidrocoloides) tanto añadidos al sólido como a la fase líquida. También se observa cualitativamente el comportamiento del sólido al espolvorearlo sobre agua (flotación / penetración).",
      keyPoints: [
        "Sólidos de trabajo: hidróxido de aluminio, sulfadiazina, azufre — de polaridad y mojabilidad distintas.",
        "Actividad 2A: adicionar agua **gota a gota** desde bureta y mezclar con espátula; el punto de mojado se alcanza cuando el sólido forma una masa blanda **sin flujo** sobre el vidrio.",
        "Agentes humectantes de 2A: propilenglicol (0,4 g), Span 20 (0,4 g), goma acacia (0,4 g de dispersión al 20 %).",
        "El punto de mojado se **normaliza a 100 g** de sólido para poder comparar.",
        "Actividad 2B: **homogenizar el tamaño de partícula** por maceración; pesar 250 mg; espolvorear **lento y suave** sobre 50 mL de agua (o de solución de aditivo al 0,4 %); no golpear la probeta.",
        "Clasificación 0–4 según el tiempo que tarda el sólido en penetrar (0 = no penetra en 15 min … 4 = 2–3 min).",
        "Además anotar si el sólido queda en **dispersión (D)**, se va al **fondo (S)** o queda en **flotación (F)**.",
        "Comparar el efecto según se añada el aditivo **al sólido** (2A) o **al agua** (2B).",
      ],
      procedure:
        "#### Actividad 2A — Punto de mojado\n" +
        "*Primera parte (sólido solo):*\n" +
        "1. Investigar y reportar las propiedades de la Tabla 5 (estructura, polaridad, solubilidad en agua, tensión superficial, fuerzas de unión, ángulo de contacto, porosidad).\n" +
        "2. Pesar 2,0 g del sólido en vidrio de reloj; cargar la bureta con agua destilada.\n" +
        "3. Dejar caer 2 gotas de agua sobre el sólido y observar (¿la rechaza? ¿la absorbe?).\n" +
        "4. Incorporar el agua con espátula; seguir adicionando **poco a poco**, mezclando, verificando que se absorba antes de añadir más.\n" +
        "5. Detenerse en el **punto de mojado** (masa blanda sin flujo). Anotar el volumen de agua (Tabla 6).\n" +
        "*Segunda parte (con agente humectante):* repetir 2–5 tras mezclar el sólido con el agente humectante indicado. Hacerlo para cada sólido.\n\n" +
        "#### Actividad 2B — Espolvoreo sobre líquido\n" +
        "*Primera parte (sobre agua):*\n" +
        "1. Macerar el sólido para homogenizar tamaño de partícula; pesar 250 mg.\n" +
        "2. Poner ~50 mL de agua destilada en una probeta.\n" +
        "3. Espolvorear el sólido **lenta y suavemente** sobre la superficie.\n" +
        "4. Clasificar el comportamiento (0–4) según el tiempo de penetración y anotar en la Tabla 8.\n" +
        "5. Anotar además D / S / F.\n" +
        "*Segunda parte (sobre solución de aditivo):* repetir usando 50 mL de solución al **0,4 %** de cada aditivo (propilenglicol, Tween 80, goma acacia). Reportar en la Tabla 10.\n\n" +
        "**Guía de resultados:** calcular el punto de mojado (mL/100 g), clasificar los agentes humectantes (Tabla 7), graficar comparativos con y sin agente y entre sólidos, y calcular el **% de reducción del punto de mojado**.",
      equations: [
        {
          name: "Punto de mojado",
          expression: "PM = #{mL de agua para humectar el sólido|masa de sólido (g)} × 100",
          variables: "PM = mL de agua que humectan por completo 100 g de sólido",
          description: "Menor PM = sólido más fácil de humectar.",
        },
        {
          name: "% de reducción del punto de mojado",
          expression: "%Red PM = #{PM_{sin AH} − PM_{con AH}|PM_{sin AH}} × 100",
          variables: "AH = agente humectante · PM = punto de mojado (mL/100 g)",
          description: "Cuánto mejora la humectación al añadir el agente humectante.",
        },
      ],
      dataRequested: [
        "Tabla 5 — propiedades de hidróxido de aluminio, sulfadiazina y azufre.",
        "Tabla 6 — volumen de agua, punto de mojado y % de reducción del PM, por sólido y por agente humectante.",
        "Tabla 7 — clasificación (tipo y mecanismo) de propilenglicol, Span 20 y goma acacia.",
        "Tabla 8 — observación y clasificación (0–4 y D/S/F) al espolvorear sobre agua.",
        "Tabla 9 — propiedades de propilenglicol, Tween 80 y goma acacia (¿reducen la tensión superficial?).",
        "Tabla 10 — clasificación al espolvorear sobre solución de aditivo al 0,4 %.",
      ],
      studyTopics: [
        "Comportamiento de la interfase sólido–líquido.",
        "Factores que afectan la humectación de un sólido.",
        "Capacidad humectante de tensioactivos, polioles e hidrocoloides; mecanismo de cada tipo.",
      ],
    },

    {
      number: 3,
      title: "Carga del sólido disperso: electrolitos floculantes y dispersantes",
      moduleSlug: "coloides-reologia",
      fundamento:
        "La estabilidad de una suspensión depende de las **fuerzas de repulsión eléctrica** entre partículas (potencial zeta). Adicionar electrolitos de **carga opuesta** a la del sólido reduce esa repulsión y produce **floculación** (sedimento voluminoso, suelto y fácil de redispersar); electrolitos de la **misma carga** actúan como **dispersantes**. La actividad 3B además comunica carga a un sólido neutro usando un tensioactivo cargado.",
      keyPoints: [
        "3A — sólido: subnitrato de bismuto (III); electrolitos: NaCl 0,3 %, AlCl₃ 0,1 %, Na₂HPO₄ 0,1 %, en volúmenes crecientes (2–10 mL).",
        "Humectar el sólido en mortero con 2 mL de propilenglicol antes de dispersar en agua desionizada; arrastrar TODO el material a la probeta con lavados sucesivos.",
        "Blanco (BL) = muestra sin electrolito: es el patrón de referencia para F y β.",
        "Reposo **15 min** antes de leer; medir sin agitar: volumen de sedimento, aspecto del sobrenadante (turbio→translúcido), sedimento compacto/suelto.",
        "Redispersión: contar **número de vueltas de 180°** para redispersar todo el sólido.",
        "Tiempo de sedimentación: medir cuánto tarda en sedimentar **5 mL** de sólido.",
        "3B — sólido neutro (azufre) + humectante cargado: Aerosol OT (aniónico) o cloruro de benzalconio (catiónico); electrolitos CaCl₂ 2 % y Na₂HPO₄ 2 %.",
        "Concentración final del electrolito en **mM** para las gráficas (v_sed vs. mM, β vs. mM, vueltas vs. mM).",
      ],
      procedure:
        "#### Actividad 3A — Efecto de la carga del sólido disperso\n" +
        "1. Pesar 3,0 g del sólido (subnitrato de bismuto III) → mortero de porcelana.\n" +
        "2. Adicionar 2 mL de propilenglicol y mezclar hasta distribución completa.\n" +
        "3. Adicionar 5 mL de agua desionizada; homogenizar hasta papilla homogénea.\n" +
        "4. Adicionar 10 mL de agua desionizada, dispersar y transvasar a probeta de 50 mL; lavar el mortero con porciones pequeñas y arrastrar todo el material.\n" +
        "5. Repetir 1–4 para cada sistema de la Tabla 11.\n" +
        "6. Adicionar a cada probeta el volumen de electrolito indicado (Tabla 11); mezclar y completar a volumen con agua desionizada.\n" +
        "7. Marcar, agitar y dejar en **reposo 15 min**.\n" +
        "8. A los 15 min: medir volumen de sedimento; anotar aspecto del sobrenadante y si el sedimento es compacto o suelto (Tabla 12).\n" +
        "9. Contar el número de vueltas de 180° para redispersar (Tabla 12).\n" +
        "10. Agitar de nuevo y medir el tiempo para sedimentar 5 mL.\n\n" +
        "#### Actividad 3B — Comunicación de carga con un humectante cargado\n" +
        "1. Pesar 2,5 g de azufre → mortero.\n" +
        "2. Adicionar 1 mL del agente humectante A (Aerosol OT); mezclar bien.\n" +
        "3. Adicionar 5 mL de agua desionizada → papilla; luego 10 mL, dispersar y transvasar a probeta de 50 mL; lavar y llevar a 40 mL.\n" +
        "4. Marcar A1. Repetir por triplicado (A2, A3) y luego con el humectante B (cloruro de benzalconio): B1, B2, B3.\n" +
        "5. Completar A1 y B1 a 50 mL con agua desionizada.\n" +
        "6. A A2/B2 adicionar 5 mL de electrolito 1 (CaCl₂ 2 %), agitar y observar; repetir con otros 5 mL.\n" +
        "7. A A3/B3 adicionar 5 mL de electrolito 2 (Na₂HPO₄ 2 %), agitar y observar; repetir con otros 5 mL.\n" +
        "8. Agitar y dejar en reposo 15 min.\n" +
        "9. Medir volumen de sedimento, aspecto del sobrenadante y del sedimento (Tablas 16–17), vueltas para redispersar y tiempo para sedimentar 5 mL.",
      equations: [
        {
          name: "Velocidad de sedimentación",
          expression: "v_{sed} = #{1|t}",
          variables: "t = tiempo (s) para que el sólido sedimente un volumen fijo (5 mL)",
        },
        {
          name: "Volumen de sedimentación (F)",
          expression: "F = #{V_{u}|V_{0}}",
          variables: "V_{u} = volumen del sedimento (mL) · V_{0} = volumen total del sistema (mL)",
          description: "F cercano a 1 → sistema floculado (sedimento voluminoso).",
        },
        {
          name: "Grado de floculación (β)",
          expression: "β = #{F|F_{s}}",
          variables: "F = volumen de sedimentación de la muestra · F_{s} = el del patrón sin electrolito (BL)",
          description: "β > 1 → la muestra está más floculada que el blanco.",
        },
      ],
      dataRequested: [
        "Tabla 11 — composición de cada sistema (sólido, g, electrolito y volumen de solución).",
        "Tabla 12 — apariencia del sobrenadante, aspecto del sedimento, volumen de sedimento (mL), vueltas para redispersar, tiempo de sedimentación (s).",
        "Tabla 13 — datos procesados: concentración final del electrolito (mM), Vu, V0, F y β.",
        "Tabla 14 — comparación sistema no floculado / floculado / desfloculado.",
        "3B: Tablas 16–18 — caracterización y datos procesados (v_sed en s⁻¹, F, β) para A1–A3 y B1–B3.",
        "Gráficas: v_sed vs. mM, β vs. mM y vueltas para redispersar vs. mM (una gráfica por juego de electrolitos).",
      ],
      studyTopics: [
        "Propiedades eléctricas de las interfaces. Potencial zeta.",
        "Efecto de los electrolitos sobre las fuerzas de repulsión eléctrica en una interfase sólido–líquido.",
        "Floculación, velocidad de sedimentación y volumen de sedimentación.",
      ],
    },

    {
      number: 4,
      title: "Tamaño de partícula: vía de administración y velocidad de sedimentación",
      moduleSlug: "coloides-reologia",
      fundamento:
        "El **tamaño de partícula** de la fase dispersa condiciona la vía de administración de una suspensión (oftálmica, parenteral, oral, tópica, industrial) y su **estabilidad física**. Según la ley de Stokes, la velocidad de sedimentación crece con el **cuadrado del diámetro** y con la diferencia de densidades, y disminuye al aumentar la viscosidad del medio.",
      keyPoints: [
        "Actividad 4A: medir el tamaño de partícula de productos comerciales con **Mastersizer 3000** o **microscopio óptico** (diámetro de proyección de 50 partículas + la más pequeña y la más grande).",
        "Factor de conversión del microscopio: 100× → 1 división = 1 µm · 40× → 2,5 µm · 10× → 10 µm · 4× → 25 µm.",
        "Tratamiento estadístico (micromerítica, *Physical Pharmacy*) → **diámetro medio de volumen/superficie (dvs)** y distribución de tamaño.",
        "Actividad 4B: arena tamizada en 3–4 rangos de tamaño; 5,0 g por probeta con 10 mL de agua, completar a 50 mL.",
        "Medir el **tiempo de sedimentación por triplicado** en agua; luego reemplazar 20 mL por dispersión de **CMC al 1 %** y repetir.",
        "Analizar las gráficas v_sed vs. tamaño de partícula (agua y CMC) a la luz de la **ley de Stokes**.",
      ],
      procedure:
        "#### Actividad 4A — Tamaño de partícula y vía de administración\n" +
        "1. Solicitar los productos; anotar nombre, principio(s) activo(s)/compuesto(s) suspendido(s), vía de administración y tipo (medicamento/cosmético/industrial) — Tabla 25.\n" +
        "2. Determinar el tamaño de partícula con Mastersizer 3000 **o** microscopio óptico.\n" +
        "3. Microscopio: homogenizar por agitación, colocar una gota en portaobjetos limpio, diluir con poca agua, medir el diámetro de proyección de **50 partículas**; anotar la más pequeña y la más grande (Tabla 26).\n" +
        "4. Consultar en la literatura el tamaño de partícula requerido según la vía y comparar (Tabla 27).\n\n" +
        "#### Actividad 4B — Tamaño de partícula y velocidad de sedimentación\n" +
        "1. Reportar las características de las muestras de arena asignadas (Tabla 28).\n" +
        "2. Pesar 5,0 g de arena de cada tamaño.\n" +
        "3. En probetas de 50 mL con 10 mL de agua destilada, incorporar la arena y completar a 50 mL.\n" +
        "4. Agitar hasta dispersar; mantener invertida y tapada, voltear y medir el **tiempo de sedimentación** (triplicado). Repetir con cada muestra (Tabla 29).\n" +
        "5. Retirar por decantación 20 mL y reemplazarlos por 20 mL de dispersión de **CMC al 1 %**; mezclar.\n" +
        "6. Volver a medir el tiempo de sedimentación de cada muestra (Tabla 29).\n" +
        "7. Calcular v_sed = 1/t promedio; graficar v_sed vs. tamaño de partícula (agua y CMC) y analizar según Stokes.",
      equations: [
        {
          name: "Ley de Stokes (velocidad de sedimentación)",
          expression: "v = #{d^{2}(ρ_{s} − ρ_{l})·g|18·η}",
          variables:
            "d = diámetro de partícula · ρ_{s}, ρ_{l} = densidad del sólido y del líquido · g = gravedad · η = viscosidad del medio",
          description: "Válida para partículas esféricas, sistema diluido y flujo laminar.",
        },
        {
          name: "Diámetro medio de volumen/superficie (dvs)",
          expression: "d_{vs} = #{Σ n·d^{3}|Σ n·d^{2}}",
          variables: "n = número de partículas de diámetro d",
          description: "Diámetro representativo para fenómenos de superficie (disolución, sedimentación).",
        },
        {
          name: "Velocidad de sedimentación (experimental)",
          expression: "v_{sed} = #{1|t}",
          variables: "t = tiempo de sedimentación promedio (s)",
        },
      ],
      dataRequested: [
        "Tabla 25 — nombre, tipo, compuesto suspendido y vía de administración de cada producto.",
        "Tabla 26 — diámetros observados (50 partículas) por producto; distribución de tamaño y dvs.",
        "Tabla 27 — tamaño de partícula según vía (literatura) vs. obtenido.",
        "Tabla 28 — rango y tamaño promedio de las muestras de arena.",
        "Tabla 29 — tiempo de sedimentación (triplicado) en agua y en CMC 1 %.",
        "Tabla 30 — tiempo promedio y velocidad de sedimentación (s⁻¹) en agua y CMC; gráfica v_sed vs. tamaño.",
      ],
      studyTopics: [
        "Relación del tamaño de partícula con la vía de administración y la naturaleza del producto.",
        "Influencia del tamaño de partícula y de la densidad en la estabilidad química y física de una suspensión.",
        "Ley de Stokes: aplicaciones y restricciones.",
      ],
    },

    {
      number: 5,
      title: "Capacidad suspensora de vehículos suspensores",
      moduleSlug: "suspensiones",
      fundamento:
        "Un **agente suspensor** aumenta la viscosidad del vehículo y/o forma una red estructurada que frena la sedimentación y facilita la redispersión. La práctica compara la capacidad suspensora de agentes **solos**, en **mezcla** y a distinta **concentración**, y evalúa cómo la **concentración de la fase dispersa** modifica la viscosidad de la suspensión.",
      keyPoints: [
        "Modelo estándar: suspensión de **arena, 4 g por cada 50 mL**.",
        "Para cada sistema: tiempo de sedimentación (por duplicado), número de inversiones para redispersar y **facilidad de vertido (1 = muy difícil … 5 = muy fácil)** tras 5 min de reposo.",
        "5C: preparar las concentraciones del agente suspensor **por dilución** partiendo de la más concentrada.",
        "5D: fase dispersa = óxido de zinc; fase dispersante = metilcelulosa 0,5 %. Humectar el ZnO en mortero con 2,5 mL de propilenglicol antes de dispersar.",
        "5D: medir viscosidad con **viscosímetro de vástago**; pedir las instrucciones del equipo ANTES de empezar.",
        "5D: partir de una suspensión al 5 % (150 g) y añadir fase dispersa en incrementos (10, 15, 20, 25 g), midiendo viscosidad en cada punto.",
        "La velocidad de sedimentación es siempre el **inverso del tiempo**.",
      ],
      procedure:
        "#### Actividad 5A — Agentes suspensores solos\n" +
        "1. Reportar los 6 agentes suspensores (Tabla 34).\n" +
        "2. Con cada uno preparar una suspensión de arena 4 g / 50 mL.\n" +
        "3. Agitar hasta dispersar; mantener invertida y tapada, voltear y **cronometrar** la sedimentación (duplicado) — Tabla 35.\n" +
        "4. A los 5 min: contar inversiones de 180° para redispersar y calificar la facilidad de vertido (1–5).\n\n" +
        "#### Actividad 5B — Mezclas de agentes suspensores\n" +
        "Igual que 5A pero con **mezclas** de dos agentes (Tabla 36); resultados en la Tabla 37. Explicar el concepto de *vehículo estructurado*.\n\n" +
        "#### Actividad 5C — Efecto de la concentración del agente suspensor\n" +
        "1. Preparar las concentraciones del agente (Tabla 38) por **dilución** desde la más concentrada.\n" +
        "2. Con cada una, suspensión de arena 4 g / 50 mL; medir tiempo de sedimentación (duplicado), inversiones y vertido (Tabla 39).\n" +
        "3. Graficar v_sed vs. concentración del agente suspensor.\n\n" +
        "#### Actividad 5D — Concentración de la fase dispersa vs. viscosidad\n" +
        "1. Medir la viscosidad de la metilcelulosa 0,5 % con viscosímetro de vástago (Tabla 40).\n" +
        "2. Preparar 150 g de suspensión de ZnO al **5 %**: humectar en mortero con 2,5 mL de propilenglicol, incorporar 25 mL de fase dispersante, mezclar y completar a 150 g.\n" +
        "3. Medir la viscosidad de la suspensión.\n" +
        "4. Añadir 10 g más de ZnO, mezclar y medir viscosidad; repetir con 15, 20 y 25 g.\n" +
        "5. Graficar viscosidad vs. % de sólido disperso.",
      equations: [
        {
          name: "Velocidad de sedimentación",
          expression: "v_{sed} = #{1|t}",
          variables: "t = tiempo promedio de sedimentación (s)",
        },
        {
          name: "Porcentaje de sólidos (5D)",
          expression: "%Sólidos = #{peso de sólido (g)|peso total de la muestra (g)} × 100",
          variables: "Se calcula en cada punto tras añadir fase dispersa",
        },
      ],
      dataRequested: [
        "Tabla 34 / 36 / 38 — agentes suspensores (solos, mezclas, concentraciones).",
        "Tablas 35 / 37 / 39 — tiempo de sedimentación (duplicado), tiempo promedio, velocidad de sedimentación (s⁻¹), inversiones para redispersar y facilidad de vertido (1–5).",
        "Tabla 40 — viscosidad de la fase dispersante y de la suspensión a % de sólido creciente (5, +10, +15, +20, +25 g).",
        "Gráficas: v_sed vs. tipo de agente, v_sed vs. concentración del agente, y viscosidad vs. % de sólido disperso.",
      ],
      studyTopics: [
        "Aspectos reológicos de los agentes suspensores.",
        "Fluidos pseudoplásticos, plásticos, dilatantes, reopécticos, tixotrópicos (definición y gráfica).",
        "Concepto de «vehículo estructurado».",
        "Agentes suspensores más usados y su clasificación reológica.",
      ],
    },

    {
      number: 6,
      title: "Auxiliares de formulación en suspensiones y factor de desplazamiento (supositorios)",
      moduleSlug: "suspensiones",
      fundamento:
        "La actividad **6A** evalúa cómo cada auxiliar de formulación (humectante, electrolito floculante, agente suspensor) incide en el aspecto, la velocidad de sedimentación, la consistencia del sedimento y la redispersabilidad de una suspensión, y cuáles combinaciones sirven o no para diseñar un producto. La actividad **6B** mide el **factor de desplazamiento** de un sólido en una base semisólida (supositorios) y su dependencia del tamaño de partícula.",
      keyPoints: [
        "6A — 10 suspensiones (S1–S10) con fármaco 2 g, Aerosol OT 1 %, AlCl₃ 2 %, NaH₂PO₄ 2 %, CMC 1 % y metilcelulosa 1 % en distintas combinaciones; agua csp 50 mL.",
        "Orden de elaboración: humectar el sólido → dispersar y transferir (completar a 25 mL) → añadir electrolito → añadir agente suspensor → completar a 50 mL.",
        "Medir a **t = 0** y a **t = 30 min**: volumen de sedimento, tiempo/velocidad de sedimentación, aspecto de sedimento y sobrenadante, número de inversiones para redispersar.",
        "6B — moldes para supositorios limpios y lubricados con aceite mineral; consultar la temperatura de fusión de la base.",
        "6B — pesar en balanza analítica **100, 200, 300, 400 y 500 mg** del sólido, por **duplicado**; usar cristales **gruesos** y **finos** (dos dvs).",
        "6B — llenar el molde hasta la mitad, incorporar el sólido a la base fundida, completar con exceso, enrasar en frío con espátula caliente.",
        "6B — pesar cada supositorio y evaluar aspecto y consistencia; calcular la base desplazada y referirla a 1,0 g de sólido.",
      ],
      procedure:
        "#### Actividad 6A — Auxiliares de formulación en una suspensión\n" +
        "Formulación (fármaco en g, resto en mL; agua csp 50):\n" +
        "| Componente | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 | S10 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Fármaco (g) | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | – | – |\n| Aerosol OT 1 % | – | 1 | 1 | 1 | 1 | 1 | 1 | 1 | – | – |\n| AlCl₃ 2 % | – | – | 5 | 5 | 5 | – | – | – | 5 | – |\n| NaH₂PO₄ 2 % | – | – | – | – | – | 5 | 5 | 5 | – | 5 |\n| CMC 1 % | – | – | – | 15 | – | – | 15 | – | 15 | 15 |\n| Metilcelulosa 1 % | – | – | – | – | 15 | – | – | 15 | – | – |\n\n" +
        "1. Para cada muestra: humectar el sólido en mortero con la solución de tensioactivo o agua.\n" +
        "2. Dispersar con agua y transferir todo a la probeta; completar a 25 mL.\n" +
        "3. Añadir la cantidad indicada de electrolito y homogenizar.\n" +
        "4. Añadir el agente suspensor y homogenizar.\n" +
        "5. Completar a 50 mL con agua y homogenizar.\n" +
        "6. Redispersar y medir a **t = 0** (Tabla 42): volumen de sedimento, tiempo y velocidad de sedimentación, aspecto de sedimento y sobrenadante.\n" +
        "7. Dejar 30 min en reposo y repetir las medidas + número de inversiones para redispersar (Tabla 43).\n\n" +
        "#### Actividad 6B — Factor de desplazamiento (supositorios)\n" +
        "1. Anotar base, sólido a suspender y tamaño de partícula seleccionado.\n" +
        "2. Limpiar y lubricar los moldes con aceite mineral; consultar la temperatura de fusión de la base.\n" +
        "3. Fundir la base y verter en dos compartimentos como referencia.\n" +
        "4. Pesar por duplicado 100, 200, 300, 400 y 500 mg de cada sólido (gruesos y finos), en balanza analítica.\n" +
        "5. Llenar otro compartimento hasta la mitad con base fundida; incorporar los 100 mg de sólido, mezclar hasta dispersar; completar con base dejando exceso. Repetir para el duplicado.\n" +
        "6. Igual con 200–500 mg. Dejar solidificar y enrasar con espátula ancha caliente.\n" +
        "7. Identificar (Mi), pesar cada supositorio, describir aspecto y consistencia (Tabla 44).\n" +
        "8. Calcular la base desplazada por el sólido y referirla a 1,0 g de sólido (Tabla 45).\n" +
        "9. Graficar base desplazada vs. peso de sólido (cristales gruesos y finos); hallar la ecuación de cada recta.",
      equations: [
        {
          name: "Velocidad de sedimentación",
          expression: "v_{sed} = #{1|t}",
          variables: "t = tiempo de sedimentación (s)",
        },
        {
          name: "Factor de desplazamiento",
          expression: "f = #{base desplazada por el sólido (g)|masa de sólido (g)}",
          variables:
            "base desplazada = (masa de base del supositorio de referencia) − (masa de base en el supositorio con sólido)",
          description: "Gramos de base que desplaza 1 g del sólido; corrige la formulación para no exceder el peso del molde.",
        },
      ],
      dataRequested: [
        "Tabla 41 — formulación de S1–S10.",
        "Tabla 42 (t = 0) — volumen de sedimento (mL), tiempo y velocidad de sedimentación (s⁻¹), aspecto del sedimento y del sobrenadante.",
        "Tabla 43 (t = 30 min) — volumen de sedimento, aspecto y número de inversiones para redispersar.",
        "Tabla 44 — peso del supositorio y consistencia/textura para cada masa de sólido (gruesos y finos).",
        "Tabla 45 — base por supositorio, base desplazada y desplazamiento por gramo de sólido; desplazamiento promedio.",
      ],
      studyTopics: [
        "Excipientes de formas suspendidas semisólidas tipo supositorio.",
        "Factor de desplazamiento en una base semisólida: definición y cálculo.",
        "Aspectos a considerar en el diseño de suspensiones farmacéuticas.",
      ],
    },

    {
      number: 7,
      title: "Agentes emulsificantes y determinación del HLB requerido",
      moduleSlug: "emulsiones",
      fundamento:
        "Una emulsión estable necesita un **emulsificante** adecuado para la fase oleosa. La práctica compara **hidrocoloides / sólidos finamente divididos** (estabilización por barrera mecánica y viscosidad) frente a **tensioactivos** (reducción de tensión interfacial), evalúa el efecto de la **homogenización** y determina el **HLB requerido** por una fase oleosa mediante una serie de mezclas Tween 80 / Span 80 de HLB creciente.",
      keyPoints: [
        "7A — sistemas 1–6: aceite mineral 10 % + dispersión al 5 % de CMC / alginato de sodio / goma acacia / Veegum / bentonita / atapulgita; volumen final 50 mL.",
        "Homogenizar según indique el docente; describir número de fases, inestabilidad y color.",
        "Tamaño de gota: diámetro de **50 gotas** al azar por microscopía óptica → dvs y distribución de frecuencias (micromerítica, *Physical Pharmacy*).",
        "Velocidad de flujo por el **método de la pipeta**: tiempo para recorrer **4 mL**.",
        "Al sistema 3 aplicarle un 2.º y un 3.er ciclo de homogenización y repetir flujo, tamaño de gota y aspecto.",
        "7B — sistemas A/B/C con tensioactivos: A = ácido esteárico + NaOH (neutralizar el 20 % del ácido) ; B = Span 80 / Tween 80 ; C = alcohol cetílico + lauril sulfato de sodio.",
        "Emulsificar en caliente: fase acuosa **2 °C por encima** de la oleosa; adicionar acuosa sobre oleosa agitando 5 min, luego enfriar agitando.",
        "7C — 7 sistemas con aceite mineral 30 % + 5 % de mezcla emulsificante Tween 80 / Span 80 de HLB 4,3 · 6 · 8 · 10 · 12 · 15 y un control sin emulsificante. El **mejor** sistema define el HLB requerido de la fase oleosa.",
      ],
      procedure:
        "#### Actividad 7A — Hidrocoloides y sólidos finamente divididos\n" +
        "| Sistema | Aceite mineral (%) | Estabilizante 5 % (%) |\n| --- | --- | --- |\n| 1 | 10 | CMC 40 |\n| 2 | 10 | Alginato de sodio 40 |\n| 3 | 10 | Goma acacia 40 |\n| 4 | 10 | Veegum 40 |\n| 5 | 10 | Bentonita 40 |\n| 6 | 10 | Atapulgita 40 |\n\n" +
        "1. Mezclar en vaso de precipitados los volúmenes de aceite mineral y de dispersión de hidrocoloide (Tabla 46).\n" +
        "2. Homogenizar hasta emulsión de apariencia aceptable.\n" +
        "3. Describir cada emulsión: número de fases, inestabilidad, color (Tabla 47).\n" +
        "4. Microscopía óptica: diámetro de 50 gotas al azar por sistema (Tabla 48).\n" +
        "5. Velocidad de flujo (método de la pipeta): tiempo para 4 mL (Tabla 49).\n" +
        "6. Al sistema 3: 2.º y 3.er ciclo de homogenización; repetir flujo, tamaño de gota y aspecto.\n" +
        "7. Evaluar aspecto, textura, sensación al aplicar (1–3) y lavabilidad (Tabla 50).\n\n" +
        "#### Actividad 7B — Tensioactivos como estabilizadores\n" +
        "| Componente | A (g) | B (g) | C (g) |\n| --- | --- | --- | --- |\n| Aceite mineral | 5 | 10 | 5 |\n| Ácido esteárico | 5 | – | – |\n| NaOH | csp neutralizar 20 % del ácido | – | – |\n| Span 80 | – | 1 | – |\n| Tween 80 | – | 1 | – |\n| Alcohol cetílico | – | – | 5 |\n| Lauril sulfato de sodio | – | – | 1 |\n| Agua csp | 50 | 50 | 50 |\n\n" +
        "1. Pesar los componentes oleosos (fundir si es necesario) y los acuosos por separado.\n" +
        "2. Si hay sólidos/semisólidos en la fase oleosa: fundir a 2 °C sobre su punto de fusión; calentar la acuosa a 2 °C por encima de la oleosa.\n" +
        "3. Adicionar la fase acuosa sobre la oleosa agitando con espátula plástica 5 min; retirar del calor y agitar hasta temperatura ambiente.\n" +
        "4. Describir cada emulsión (Tabla 52) y medir el diámetro de 50 gotas (Tabla 53).\n\n" +
        "#### Actividad 7C — HLB requerido\n" +
        "| Emulsión | 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| Span 80 (%) | 2,5 | 2,1 | 1,6 | 1,2 | 0,7 | 0 | 0 |\n| Tween 80 (%) | 0 | 0,4 | 0,9 | 1,3 | 1,8 | 2,5 | 0 |\n| HLB mezcla | 4,3 | 6 | 8 | 10 | 12 | 15 | – |\n\n" +
        "Composición base: aceite mineral 30 %, emulsificante 5 %, agua csp 100 %.\n" +
        "1. Describir cada sistema: aspecto, homogeneidad, número de fases, aspecto de cada fase.\n" +
        "2. Elegir el mejor sistema → su HLB es el **HLB requerido** por la fase oleosa.\n" +
        "3. Comparar con el HLB requerido reportado en la literatura y explicar.",
      equations: [
        {
          name: "HLB de una mezcla de emulsificantes",
          expression: "HLB_{mezcla} = f_{A}·HLB_{A} + f_{B}·HLB_{B}",
          variables: "f_{A}, f_{B} = fracción en peso de cada emulsificante en la mezcla (f_{A} + f_{B} = 1)",
          description: "Permite ajustar la mezcla Tween/Span al HLB requerido por la fase oleosa.",
        },
        {
          name: "Diámetro medio de volumen/superficie de las gotas",
          expression: "d_{vs} = #{Σ n·d^{3}|Σ n·d^{2}}",
          variables: "n = número de gotas de diámetro d (50 gotas medidas)",
        },
        {
          name: "Velocidad de flujo (método de la pipeta)",
          expression: "v_{flujo} = #{4 mL|t (s)}",
          variables: "t = tiempo que tarda el sistema en recorrer 4 mL en la pipeta",
          description: "Indicador simple de la consistencia/viscosidad relativa de la emulsión.",
        },
      ],
      dataRequested: [
        "Tabla 46 — composición de los sistemas 1–6 (%v/v).",
        "Tabla 47 — número de fases, inestabilidad y color de cada emulsión.",
        "Tabla 48 — diámetros de 50 gotas por sistema (y por ciclo de homogenización para el sistema 3); dvs y distribución.",
        "Tabla 49 — velocidad de flujo (s) de cada sistema.",
        "Tabla 50 — aspecto, textura, sensación al aplicar (1–3) y lavabilidad.",
        "Tablas 51–53 — composición, descripción y tamaño de gota de los sistemas A/B/C con tensioactivos.",
        "Tabla 53 (agentes) — tipo, mecanismo, iónico/no iónico y orientación O/W o W/O de cada emulsificante.",
        "7C — descripción de los 7 sistemas y valor propuesto de HLB requerido; comparación con la literatura.",
      ],
      studyTopics: [
        "Métodos tradicionales de emulsificación con gomas (vía seca y vía húmeda).",
        "Elementos constitutivos de un sistema heterodisperso líquido–líquido.",
        "Mecanismo de acción de tensioactivos, hidrocoloides y sólidos finamente divididos como estabilizadores.",
        "Fenómenos físicos de inestabilidad de una emulsión.",
        "Determinación del HLB requerido.",
      ],
    },

    {
      number: 8,
      title: "Vanishing cream y cold cream: diseño, tipo de emulsión, extensibilidad y adherencia",
      moduleSlug: "emulsiones",
      fundamento:
        "Las **vanishing cream** (O/W, jabón formado in situ por neutralización parcial del ácido esteárico) y las **cold cream** (W/O, cera de abejas + bórax) son emulsiones semisólidas clásicas. La práctica evalúa el efecto del tipo y % de neutralizante y del % de fase oleosa sobre sus propiedades sensoriales, aplica un conjunto de **pruebas cualitativas** para determinar la orientación (O/W vs. W/O) y mide **extensibilidad** y **adherencia**.",
      keyPoints: [
        "Vanishing cream: neutralizar el **20 %** del ácido esteárico (30 % en el sistema 4); variar el neutralizante (NaOH / KOH / TEA) y el % de fase oleosa. Preparar 50 g de cada sistema.",
        "Cold cream: variar el % de cera de abejas y de fase oleosa; sistema 5 con Span 60. Preparar 50 g.",
        "Emulsificar en caliente: fase acuosa 2 °C por encima de la oleosa, adicionar acuosa sobre oleosa agitando 1 min, enfriar agitando; incorporar el propilenglicol en el enfriamiento.",
        "Propiedades sensoriales (1–5): fluidez, color (opaco/brillante), textura, facilidad de extensión, sensación posterior, rubbing (blanqueo al frotar), pick-up (formación de fibra entre los dedos), lavabilidad.",
        "8B — pruebas de orientación: dilución con agua, dilución con aceite, conductividad eléctrica (puente de Wheatstone), difusión de azul de metileno (hidrosoluble) y Sudán III (liposoluble), difusión en papel, lavabilidad. La fase **externa** define el tipo (O/W conduce y se diluye en agua).",
        "8C — extensibilidad: 1 min bajo placa de vidrio (80 g), leer el diámetro; adherencia: peso de arrastre necesario para despegar dos discos (empezar en 200 g y duplicar).",
      ],
      procedure:
        "#### Actividad 8A — Diseño de vanishing cream y cold cream\n" +
        "1. Identificar componentes de fase oleosa y acuosa de las Tablas 54 (VC) y 55 (CC).\n" +
        "2. Disolver la fase acuosa en el agua indicada.\n" +
        "3. Fundir la fase oleosa al baño maría; llevar la acuosa a ~2 °C por encima.\n" +
        "4. Adicionar lentamente la acuosa sobre la oleosa agitando 1 min con espátula plástica; retirar del calor y agitar hasta temperatura ambiente.\n" +
        "5. En el enfriamiento, sin dejar de agitar, incorporar el propilenglicol si corresponde.\n" +
        "6. Caracterizar cada sistema (Tablas 56 VC y 57 CC).\n" +
        "   - Comparaciones VC: neutralizante (1-2-3) · % de neutralización (1 y 4) · % de fase oleosa (1 y 5).\n" +
        "   - Comparaciones CC: % de cera de abejas (1-2-3) · % de fase oleosa (1 y 4) · tensioactivo no iónico orientador W/O (1 y 5).\n\n" +
        "#### Actividad 8B — Determinación del tipo de emulsión\n" +
        "Seleccionar 2 sistemas de cada tipo y aplicar (Tabla 58):\n" +
        "1. **Dilución con agua:** 4 g de emulsión + 1 mL de agua, mezclar y observar.\n" +
        "2. **Dilución con aceite:** 4 g de emulsión + 1 mL de aceite, mezclar y observar.\n" +
        "3. **Conductividad:** unir los bornes del puente de Wheatstone con la emulsión y ver si enciende el bombillo.\n" +
        "4. **Difusión de colorantes:** cristal de azul de metileno sobre 4 g de emulsión, observar 2 min; repetir con Sudán III.\n" +
        "5. **Difusión en papel:** pequeña cantidad sobre papel, ver difusión y halo.\n" +
        "6. **Lavabilidad:** aplicar en las manos y lavar con agua; ¿queda residuo graso?\n\n" +
        "#### Actividad 8C — Extensibilidad y adherencia\n" +
        "Con los sistemas 1, 2 y 3 de cada tipo:\n" +
        "- **Extensibilidad:** colocar la muestra en el anillo de teflón sobre la placa de vidrio, retirar el anillo, poner la placa superior (80 g), esperar 1 min y leer el diámetro (Tabla 59).\n" +
        "- **Adherencia:** muestra entre los dos discos, reposo 1 min, peso de arrastre de 200 g; si no se separan en 1 min, duplicar el peso y repetir hasta la separación (Tabla 60).",
      equations: [
        {
          name: "Extensibilidad",
          expression: "E = área o diámetro de la muestra tras 1 min bajo la placa (80 g)",
          variables: "Se compara el diámetro (cm) entre sistemas; a mayor diámetro, mayor extensibilidad",
        },
      ],
      dataRequested: [
        "Tablas 54–55 — composición de los sistemas VC y CC (completar los csp / % de neutralización).",
        "Tablas 56–57 — aspecto, color, textura, sensación al aplicar y después, rubbing, pick-up y lavabilidad de cada sistema.",
        "Tabla 58 — resultado de cada prueba de orientación y conclusión del tipo de emulsión (fase externa).",
        "Tabla 59 — diámetro de extensibilidad de VC1–3 y CC1–3.",
        "Tabla 60 — peso de arrastre requerido para la adherencia de VC1–3 y CC1–3.",
        "Gráficos comparativos de extensibilidad y adherencia.",
      ],
      studyTopics: [
        "Diseño y formulación de vanishing cream y cold cream: composición, función de cada componente, preparación y estabilidad.",
        "Índice de saponificación e índice de acidez de un material graso; jabones como tensioactivos.",
        "Composición química de la cera de abejas y su índice de acidez.",
        "Pruebas para identificar el tipo de emulsión.",
      ],
    },

    {
      number: 9,
      title: "Ungüento hidrófilo USP y modificado; estabilidad e inversión de fases",
      moduleSlug: "emulsiones",
      fundamento:
        "El **ungüento hidrófilo USP** es una emulsión O/W estabilizada por lauril sulfato de sodio + alcohol cetílico. La práctica evalúa el efecto del % y la composición de la fase oleosa (y de sales, en la versión modificada), prueba la **estabilidad y compatibilidad** de emulsiones O/W y W/O frente a ácidos, bases, alcohol y tensioactivos, y provoca la **inversión de fases** de una emulsión por adición de un electrolito divalente.",
      keyPoints: [
        "Ungüento hidrófilo USP (sistemas 1–4): alcohol cetílico, vaselina, propilenglicol, lauril sulfato de sodio, solución de parabenos, agua csp; preparar 50 g.",
        "Modificado (sistemas 1–4): igual pero con **lauril éter sulfato de sodio**; a la formulación 2 incorporar NaCl 1 g y 3 g y observar el efecto.",
        "Materiales especiales (Salcare SC91®): dispersar el sistema emulsificante en la fase oleosa y luego adicionar la acuosa.",
        "Emulsificación en caliente: acuosa 2 °C por encima de la oleosa; incorporar el propilenglicol en el enfriamiento.",
        "9B — estabilidad: sobre 5 g de cada emulsión (O/W = VC, W/O = CC) calentada a 45–50 °C, adicionar 1 mL de NaOH 1 N / HCl 1 N / alcohol USP / LSS 5 % / cloruro de benzalconio 5 %; enfriar agitando y observar inversión, ruptura o grumos (Tabla 67).",
        "9C — inversión de fases: aceite mineral/Sudán III + ácido oleico + agua, luego amoníaco (forma jabón in situ → O/W); adicionar CaCl₂ 10 % en porciones de 0,5 mL hasta invertir a W/O (conductividad, espuma, intensidad de color).",
      ],
      procedure:
        "#### Actividad 9A — Ungüento hidrófilo USP y modificado\n" +
        "*USP (Tabla 61):*\n" +
        "| Componente (%) | 1 | 2 | 3 | 4 |\n| --- | --- | --- | --- | --- |\n| Alcohol cetílico | 10 | 5 | 20 | 7 |\n| Vaselina | 7 | 3,5 | 14 | 10 |\n| Propilenglicol | 10 | 10 | 10 | 10 |\n| Lauril sulfato de sodio | 2 | 2 | 2 | 2 |\n| Solución parabenos | 1 | 1 | 1 | 1 |\n| Agua csp | 100 | 100 | 100 | 100 |\n\n" +
        "1. Identificar fase oleosa y acuosa; disolver la acuosa en el agua indicada.\n" +
        "2. Fundir la fase oleosa al baño maría; llevar la acuosa a ~2 °C por encima.\n" +
        "3. Adicionar la acuosa sobre la oleosa agitando 1 min; retirar del calor y agitar hasta temperatura ambiente.\n" +
        "4. Incorporar el propilenglicol en el enfriamiento.\n" +
        "5. Repetir con el **ungüento modificado** (Tabla 62, con lauril éter sulfato de sodio); a la formulación 2 añadir NaCl 1 g y 3 g.\n" +
        "6. Sistemas con materiales especiales (Tabla 63): dispersar el emulsificante en la fase oleosa y luego adicionar la acuosa en vaso de precipitados.\n" +
        "7. Caracterizar todas (Tablas 64–66): fluidez (1–5), color, textura, sensación al aplicar y después, rubbing, pick-up, lavabilidad.\n\n" +
        "#### Actividad 9B — Estabilidad frente a agentes químicos\n" +
        "1. Usar un sistema O/W y uno W/O ya preparados (VC y CC).\n" +
        "2. Pesar 5 g en vidrio de reloj y calentar al baño maría (máx. 45–50 °C).\n" +
        "3. Adicionar 1 mL de la solución a ensayar (NaOH 1 N, HCl 1 N, alcohol USP, LSS 5 %, cloruro de benzalconio 5 %); mezclar y calentar 30 s más.\n" +
        "4. Enfriar agitando; observar inversión de fases, ruptura, grumos o aumento de estabilidad (Tabla 67).\n\n" +
        "#### Actividad 9C — Inversión de fases\n" +
        "Sistema: aceite mineral/Sudán III 25 g · ácido oleico 5 g · amoníaco 1 g · agua 20 g.\n" +
        "1. En frasco de tapa esmerilada: aceite mineral + ácido oleico + Sudán III; agitar suave y observar el color de la fase oleosa.\n" +
        "2. Adicionar el agua; observar la separación de fases.\n" +
        "3. Adicionar el amoníaco lentamente, agitar suave; observar la interfase y las características finales (¿cambia la intensidad del color?).\n" +
        "4. Agitar vigoroso; observar espuma, homogeneidad e intensidad del color. Prueba de conductividad.\n" +
        "5. Adicionar 0,5 mL de CaCl₂ 10 %, mezclar y observar espuma, conductividad e intensidad del color.\n" +
        "6. Continuar con adiciones de 0,5 mL de CaCl₂ hasta la **inversión neta** de los resultados de las pruebas.",
      equations: [],
      dataRequested: [
        "Tablas 61–63 — composición de los sistemas USP, modificado y con materiales especiales.",
        "Tablas 64–66 — fluidez (1–5), color, textura, sensación al aplicar y después, rubbing, pick-up, lavabilidad.",
        "Tabla 67 — resultado de la emulsión O/W y W/O frente a cada agente (estabilidad / inestabilidad y proceso ocurrido).",
        "9C — observaciones de color, espuma y conductividad en cada etapa y volumen de CaCl₂ 10 % necesario para la inversión.",
      ],
      studyTopics: [
        "Ungüento hidrófilo USP y modificado: composición, función de cada componente, preparación y estabilidad.",
        "Estabilidad y compatibilidad de una emulsión frente a agentes químicos.",
        "Factores que inducen la inversión de fases en una emulsión.",
      ],
    },

    {
      number: 10,
      title: "Bases para ungüentos: oleaginosas, de absorción, hidromiscibles, hidrogel y organogel",
      moduleSlug: "semisolidos-geles",
      fundamento:
        "Las **bases para ungüentos** se clasifican por su afinidad con el agua y su comportamiento reológico. La práctica prepara y caracteriza los cinco grandes grupos —**oleaginosas**, **de absorción**, **hidromiscibles**, **hidrogel** y **organogel**— comparando consistencia, extensibilidad, untuosidad y, cuando aplica, el **número de agua** (mL de agua que incorporan 100 g de base).",
      keyPoints: [
        "Método general (salvo hidrogeles): pesar los materiales en cápsula de porcelana, calentar al baño maría a ~50 °C, suspender el calor y agitar de forma continua hasta temperatura ambiente. Preparar **25 g** de cada sistema.",
        "Oleaginosas (A1–A3): aceite mineral, vaselina, parafina en distintas proporciones — hidrófobas, no incorporan agua fácilmente pero se les calcula número de agua.",
        "De absorción (B1–B3): base oleaginosa + alcohol cetílico + (lanolina / miristato de isopropilo) — absorben agua formando emulsión W/O.",
        "Hidromiscibles (C1–C3): mezclas de PEG 200 / 1500 / 4000 — se lavan con agua; no se calcula número de agua sino la facilidad para incorporar agua.",
        "Hidrogel (D1–D2): carbómero 934 o CMC + propilenglicol + agua; el sistema D1 se evalúa **con y sin trietanolamina** (la TEA neutraliza el carbómero y gelifica).",
        "Organogel (E1–E3): vaselina + estearato de aluminio 5/10/15 %.",
        "Número de agua: pesar 5 g de base, adicionar agua **gota a gota** desde bureta e incorporar con espátula; anotar el volumen máximo que retiene y llevarlo a 100 g.",
        "Calificaciones 1–3 para consistencia, extensibilidad y untuosidad.",
      ],
      procedure:
        "#### Bases oleaginosas (Tabla 69)\n" +
        "| Sistema (%) | A1 | A2 | A3 |\n| --- | --- | --- | --- |\n| Aceite mineral | 50 | 50 | 40 |\n| Vaselina | – | 50 | 50 |\n| Parafina | 50 | – | 10 |\n\n" +
        "1. Pesar en cápsula de porcelana; calentar al baño maría a ~50 °C.\n" +
        "2. Suspender el calor y agitar hasta temperatura ambiente.\n" +
        "3. Evaluar aspecto, consistencia (1–3), extensibilidad (1–3), untuosidad (1–3) y **número de agua** (Tabla 70).\n\n" +
        "#### Bases de absorción (Tabla 71)\n" +
        "| Sistema (%) | B1 | B2 | B3 |\n| --- | --- | --- | --- |\n| Aceite mineral | 35 | 35 | 35 |\n| Vaselina | 50 | 50 | 50 |\n| Parafina | 10 | 10 | 10 |\n| Alcohol cetílico | 5 | – | – |\n| Lanolina | – | 5 | – |\n| Miristato de isopropilo | – | – | 5 |\n\n" +
        "Mismo método y caracterización que las oleaginosas (Tabla 72).\n\n" +
        "#### Bases hidromiscibles (Tabla 73)\n" +
        "| Sistema (%) | C1 | C2 | C3 |\n| --- | --- | --- | --- |\n| PEG 200 | 60 | 60 | 34 |\n| PEG 1500 | 40 | – | 33 |\n| PEG 4000 | – | 40 | 33 |\n\n" +
        "Mismo método; en la caracterización, en vez de número de agua evaluar la **facilidad para incorporar agua** (Tabla 74).\n\n" +
        "#### Bases tipo hidrogel (Tabla 75)\n" +
        "| Sistema | D1 | D2 |\n| --- | --- | --- |\n| Carbómero 934 | 0,5 | – |\n| Carboximetilcelulosa | – | 5 |\n| Propilenglicol | 10 | 10 |\n| Agua csp | 100 | 100 |\n\n" +
        "Sistemas ya elaborados. Para D1 hay dos versiones: **sin** y **con** trietanolamina. Evaluar aspecto, consistencia, extensibilidad y untuosidad (Tabla 76).\n\n" +
        "#### Bases tipo organogel (Tabla 77)\n" +
        "| Sistema (%) | E1 | E2 | E3 |\n| --- | --- | --- | --- |\n| Vaselina | 95 | 90 | 85 |\n| Estearato de aluminio | 5 | 10 | 15 |\n\n" +
        "Mismo método que las oleaginosas; caracterizar aspecto, consistencia, extensibilidad y untuosidad.\n\n" +
        "**Guía de resultados:** gráficas comparativas de número de agua, consistencia, extensibilidad y untuosidad por tipo de base; analizar el efecto del cambio de composición.",
      equations: [
        {
          name: "Número de agua",
          expression: "N_{agua} = #{mL de agua incorporados|masa de base (g)} × 100",
          variables: "N_{agua} = mL de agua que puede incorporar 100 g de la base",
          description: "Mayor número de agua = base con más capacidad de absorber fase acuosa (bases de absorción).",
        },
      ],
      dataRequested: [
        "Tablas 69, 71, 73, 75, 77 — composición de cada sistema por tipo de base.",
        "Tabla 70 — bases oleaginosas: aspecto, consistencia (1–3), extensibilidad (1–3), untuosidad (1–3), volumen de agua (mL) y número de agua.",
        "Tabla 72 — bases de absorción: mismos parámetros.",
        "Tabla 74 — bases hidromiscibles: aspecto, consistencia, extensibilidad, untuosidad y facilidad para incorporar agua.",
        "Tabla 76 — bases hidrogel (D1 con y sin TEA, D2): aspecto, consistencia, extensibilidad, untuosidad.",
        "Tabla 77 (organogel) — mismos parámetros para E1–E3.",
        "Gráficas comparativas de número de agua, consistencia, extensibilidad y untuosidad.",
      ],
      studyTopics: [
        "Composición, clasificación y propiedades de las bases para ungüentos.",
        "Características de las bases oleaginosas, de absorción, hidromiscibles, hidrogel y organogel.",
        "Aplicaciones de cada tipo de base en medicamentos (humanos y veterinarios) y cosméticos.",
      ],
    },
  ],
};
