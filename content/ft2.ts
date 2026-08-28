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
  sections: ["modulos", "proyectos", "fechas", "glosario", "formulas", "bibliografia", "insumos", "prompt-ia"],
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
};
