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
      exercises: [
        {
          question: [
            "**Opción múltiple.** Una dispersión coloidal se caracteriza por:",
            "",
            "A) No presentar superficies limitantes",
            "B) Separarse por diálisis o ultrafiltración",
            "C) Tener tamaño de partícula menor a 1 nm",
            "D) Ser invisible a cualquier microscopio",
          ].join("\n"),
          solution: [
            "**Respuesta: B.**",
            "",
            "Las dispersiones coloidales **sí tienen superficies limitantes** (a diferencia de las dispersiones moleculares/soluciones verdaderas, que no las tienen) y su rango de tamaño es 1 nm – 1 µm, visible por microscopía electrónica (SEM) y separable por diálisis o ultrafiltración.",
            "",
            "A es la trampa clásica: es al revés, las coloidales sí presentan superficies limitantes. C describe a la dispersión molecular. D es falso: son visibles por SEM.",
          ].join("\n"),
        },
        {
          question: [
            "**Aplicación.** Clasifique cada uno de estos sistemas farmacéuticos según su combinación de fase dispersa / fase dispersante (S = sólido, L = líquido, G = gas):",
            "",
            "1. Supositorio",
            "2. Loción de calamina",
            "3. Aerosol de un inhalador",
            "4. Aceite de hígado de bacalao emulsionado en agua",
            "5. Icopor (poliestireno expandido)",
          ].join("\n"),
          solution: [
            "1. **Supositorio → S/S** (partículas sólidas de fármaco dispersas en una base sólida).",
            "2. **Calamina → S/L** (óxido de zinc, sólido, disperso en un vehículo líquido: suspensión).",
            "3. **Aerosol de inhalador → S/G o L/G** (partículas sólidas o gotas líquidas de fármaco dispersas en un gas propelente).",
            "4. **Aceite de hígado de bacalao en agua → L/L** (emulsión: una fase líquida dispersa en otra líquida inmiscible).",
            "5. **Icopor → G/S** (espuma sólida: gas atrapado en una matriz sólida continua).",
          ].join("\n"),
        },
        {
          question: [
            "**Definición — diferenciación.** Diferencie los pares de términos **monodisperso / polidisperso** e **incoherente / coherente**, y dé un ejemplo farmacéutico de cada categoría del segundo par.",
          ].join("\n"),
          solution: [
            "**Monodisperso**: las partículas de la fase dispersa tienen un tamaño prácticamente uniforme. **Polidisperso**: el tamaño varía dentro de la misma muestra; a menor índice de polidispersidad, más uniforme (y más predecible) es el sistema.",
            "",
            "**Incoherente**: no hay una red estructural entre las partículas — cada una se mueve de forma relativamente independiente. Ejemplo: una **suspensión** o una **emulsión** sin gelificante.",
            "",
            "**Coherente**: existe una red tridimensional que da estructura y consistencia al sistema. Ejemplo: un **gel** o una **base para ungüento**.",
            "",
            "Los dos pares son ejes de clasificación **independientes**: un sistema puede ser, por ejemplo, polidisperso e incoherente a la vez (una suspensión mal controlada), o monodisperso y coherente (un gel con partículas uniformes).",
          ].join("\n"),
        },
      ],
      chapter: [
        "#### Por qué este módulo va primero",
        "",
        "Antes de mezclar nada en un laboratorio, hay una pregunta que hay que saber responder: **¿qué tipo de sistema tengo entre manos?** Casi todo lo que vas a formular en Farmacotecnia 2 — una suspensión de amoxicilina, una crema, un gel, una emulsión de aceite de hígado de bacalao — es, en el fondo, la misma idea repetida una y otra vez: **más de una fase conviviendo en el mismo frasco**. Este módulo no enseña todavía a formular nada; enseña el vocabulario y los ejes de clasificación que vas a usar el resto del semestre para nombrar, con precisión, lo que tienes delante. Sin este vocabulario, cualquier discusión sobre estabilidad, viscosidad o vía de administración se vuelve imprecisa.",
        "",
        "#### Una fase, dos fases: el primer eje",
        "",
        "Una **fase** es una porción de materia física y químicamente uniforme, separada del resto por una superficie (interfase) claramente identificable. Cuando disuelves una cucharada de azúcar en agua y se disuelve por completo, tienes **una sola fase**: no hay ningún punto del vaso donde puedas señalar \"aquí termina el azúcar y empieza el agua\" — las moléculas de sacarosa están completamente rodeadas e integradas en la red de agua. Eso es un **sistema monofásico** (una solución verdadera).",
        "",
        "Ahora compara eso con echar arena en el mismo vaso de agua. Por más que agites, siempre vas a poder señalar dónde está cada grano de arena y dónde está el agua: hay una **frontera física real** entre ambas. Eso es un **sistema polifásico**: dos o más fases distinguibles, cada una con su propia superficie límite. Un **sistema heterodisperso** es, precisamente, un sistema polifásico en el que una de esas fases está fraccionada en partículas pequeñas dispersas dentro de la otra.",
        "",
        "> Analogía: piensa en la diferencia entre disolver sal en agua (una fase, invisible, sin fronteras) y echar arena en agua (dos fases, cada grano con su propia \"piel\" que lo separa del agua). Farmacotecnia 2 es, en gran parte, el estudio de esa \"arena\" farmacéutica: cómo se comporta, cómo se mantiene distribuida y cómo se estabiliza.",
        "",
        "#### El molde y lo moldeado: fase dispersa y fase dispersante",
        "",
        "Dentro de un sistema polifásico, a las dos fases no las tratamos igual. Una de ellas es **continua**: rodea, envuelve y conecta todo el sistema de punta a punta. Es la **fase dispersante** (o fase externa/continua). La otra está **fraccionada** en unidades discretas — partículas, gotas o burbujas — repartidas dentro de la primera. Es la **fase dispersa** (o fase interna/discontinua).",
        "",
        "> Analogía: imagina una plaza llena de gente en un evento. La plaza misma —el espacio que conecta todo, por donde te puedes mover de un punto a otro sin salir del sistema— es la fase dispersante. Cada persona, en cambio, es una unidad discreta, separada de las demás: son la fase dispersa. Puedes tener pocas personas muy separadas (sistema diluido) o una plaza abarrotada donde casi no cabe nadie más (sistema concentrado) — la lógica es la misma en una suspensión o una emulsión farmacéutica.",
        "",
        "En una suspensión de calamina, el óxido de zinc sólido es la fase dispersa y el vehículo acuoso es la fase dispersante. En una emulsión de aceite de hígado de bacalao, las gotas de aceite son la fase dispersa y el agua es la fase dispersante (o al revés, si la emulsión es agua-en-aceite).",
        "",
        "#### El eje del tamaño: de la molécula a la arena de playa",
        "",
        "No todas las \"fases dispersas\" son iguales en tamaño, y el tamaño de partícula es probablemente **el eje de clasificación más importante** de todo el módulo, porque determina casi todo lo demás: si el sistema es visible a simple vista, si sedimenta, si se puede separar por diálisis, si dispersa la luz, si es estable termodinámicamente.",
        "",
        "* **Dispersión molecular (solución verdadera)** — partículas/moléculas menores a **1 nm**. No hay superficie límite real entre soluto y solvente: el sistema es termodinámicamente estable, transparente, no sedimenta nunca y no se puede separar por diálisis. El azúcar disuelto en agua vive aquí.",
        "* **Dispersión coloidal** — partículas entre **1 nm y 1 µm**. Aquí sí existe una superficie límite real (por eso hablamos de \"interfase\" desde este tamaño hacia arriba), pero las partículas son demasiado pequeñas para verse con un microscopio óptico normal; se necesita microscopía electrónica (SEM) para visualizarlas. Sí se pueden separar del solvente por **diálisis o ultrafiltración**, precisamente porque son partículas discretas y no moléculas de solvente disueltas.",
        "* **Dispersión gruesa** — partículas mayores a **1 µm**. Es el territorio de las suspensiones y emulsiones farmacéuticas típicas: partículas visibles al microscopio óptico o incluso a simple vista, que sedimentan o cremean con el tiempo por efecto de la gravedad si no se controlan.",
        "",
        "> Analogía: piensa en tres formas de tener \"algo\" en un vaso de agua. Sal disuelta = invisible, no se puede filtrar aparte, se queda disuelta para siempre (dispersión molecular). Leche entera = no ves las gotas de grasa individuales a simple vista, pero un aparato de laboratorio sí las detecta, y si usas una membrana muy fina las puedes separar del suero (dispersión coloidal). Arena = la ves, la sientes, y si dejas el vaso quieto un rato se va al fondo (dispersión gruesa).",
        "",
        "Un detalle que suele generar trampa en examen: la dispersión coloidal **sí tiene interfase** (a diferencia de la dispersión molecular), y precisamente por eso se comporta de forma físicamente distinta al solvente puro — es la base de casi toda la fisicoquímica de interfases que vas a ver en el Módulo 2.",
        "",
        "#### Nombrando combinaciones: fase dispersa / fase dispersante",
        "",
        "Como tanto la fase dispersa como la dispersante pueden ser sólida (S), líquida (L) o gaseosa (G), existen varias combinaciones posibles — y cada una tiene nombre y ejemplos farmacéuticos propios que vas a usar todo el semestre:",
        "",
        "| Combinación | Nombre típico | Ejemplo farmacéutico |",
        "| --- | --- | --- |",
        "| S/S | Sólido disperso en sólido | Supositorio (fármaco sólido en una base sólida) |",
        "| S/L | Suspensión | Loción de calamina (óxido de zinc en un vehículo acuoso) |",
        "| S/G o L/G | Aerosol | Inhalador (partículas sólidas o gotas de fármaco en un gas propelente) |",
        "| L/L | Emulsión | Aceite de hígado de bacalao emulsionado en agua |",
        "| G/S | Espuma sólida | Icopor (poliestireno expandido: gas atrapado en una matriz sólida) |",
        "| G/L | Espuma líquida | Espuma de afeitar, clara de huevo batida |",
        "",
        "No existe la combinación **G/G**: los gases siempre se mezclan entre sí de forma homogénea (no forman interfase), así que \"gas disperso en gas\" no es un sistema heterodisperso — es, simplemente, una mezcla de gases.",
        "",
        "#### Dos ejes más: qué tan parejo y qué tan trabado",
        "",
        "Además del tamaño y la combinación de fases, hay dos ejes de clasificación adicionales que son **independientes entre sí** (uno no determina al otro) y que también son independientes de los dos anteriores.",
        "",
        "**Monodisperso vs. polidisperso** — describe qué tan uniforme es el tamaño de partícula dentro de una misma muestra.",
        "",
        "> Analogía: una bolsa de canicas todas exactamente del mismo diámetro es monodispersa; una bolsa donde hay canicas grandes, medianas y diminutas revueltas es polidispersa. A menor índice de polidispersidad, más uniforme (y más predecible en su comportamiento: sedimentación, viscosidad, disolución) es el sistema.",
        "",
        "**Incoherente vs. coherente** — describe si existe o no una red estructural tridimensional que conecte a las partículas entre sí.",
        "",
        "> Analogía: en una plaza donde cada persona camina libremente, sin tomarse de la mano con nadie, el sistema es incoherente — así se comporta una suspensión o una emulsión sin gelificante, donde las partículas se mueven de forma relativamente independiente. Ahora imagina que todos esos mismos asistentes se toman de la mano formando una red que cubre toda la plaza: ya no pueden moverse libremente, el conjunto tiene una estructura fija que le da consistencia. Así se comporta un gel o una base para ungüento: una red tridimensional (de polímero, de jabón, de partículas floculadas) que **atrapa** al líquido en su interior y le da cuerpo a todo el sistema — es coherente.",
        "",
        "Estos dos ejes se combinan libremente con los anteriores: puedes tener un sistema polidisperso e incoherente (una suspensión mal controlada, con partículas de tamaños muy distintos moviéndose libremente) o uno monodisperso y coherente (un gel con partículas uniformes atrapadas en su red). No asumas que \"coherente\" implica \"monodisperso\" ni viceversa: son preguntas distintas sobre el mismo sistema.",
        "",
        "#### Por qué esto importa en la industria farmacéutica",
        "",
        "Casi ningún principio activo se administra puro. La mayoría necesita un **vehículo**, y ese vehículo casi siempre termina siendo un sistema heterodisperso: una suspensión para un fármaco insoluble en agua, una emulsión para transportar un aceite o un fármaco lipofílico de forma agradable al paladar o a la piel, un semisólido para aplicación tópica localizada. Entender en qué categoría cae tu producto —tamaño de partícula, combinación de fases, coherencia— no es un ejercicio académico: determina directamente **cómo se va a fabricar, cómo se va a estabilizar y cómo se va a comportar** una vez esté en el frasco del paciente. Los módulos siguientes (tensioactivos, coloides, suspensiones, emulsiones, semisólidos) son, cada uno, un caso particular de las clasificaciones que acabas de aprender aquí.",
        "",
        "#### En resumen",
        "",
        "* Un **sistema heterodisperso** es un sistema polifásico con una fase fraccionada (dispersa) dentro de otra continua (dispersante).",
        "* El **tamaño de partícula** define tres categorías: molecular (<1 nm, sin interfase), coloidal (1 nm–1 µm, con interfase pero invisible al microscopio óptico) y gruesa (>1 µm, visible y sedimentable).",
        "* La **combinación de fases** (S/L/G × S/L/G, salvo G/G) da nombre a cada tipo de sistema: suspensión, emulsión, aerosol, espuma, sólido disperso en sólido.",
        "* **Monodisperso/polidisperso** y **coherente/incoherente** son dos ejes adicionales, independientes entre sí y de los anteriores.",
        "* Todo esto es el vocabulario base que vas a usar en el resto de la asignatura — el Módulo 2 empieza a aplicarlo a un caso muy concreto: las interfases líquido-líquido y líquido-sólido, y las moléculas que las controlan, los **tensioactivos**.",
      ].join("\n"),
    },
    {
      slug: "tensioactivos-hlb",
      title: "Módulo 2: Tensioactivos y sistema HLB",
      description:
        "Tensioactivos y su aplicación en sistemas heterodispersos: clasificación general, **sistema HLB**, propiedades interfaciales de sistemas líquido-líquido, **tensión interfacial**, extensión, cohesión y adhesión. **Ángulo de contacto**, fenómenos de mojado y repelencia, adsorción sólido-líquido. Cálculo del HLB de un tensioactivo y de mezclas. Introducción a sistemas coloidales.",
      hasLab: true,
      labProtocol:
        "Determinación de propiedades de tensioactivos (poder emulsificante, humectante, gelificante, solubilizante y efecto de electrolitos). Comportamiento de interfases sólido-líquido: mojado, flotación y extensión frente a distintos sólidos.",
      exercises: [
        {
          question: [
            "**Opción múltiple.** Según la interfase en la que actúa, un tensioactivo ejerce respectivamente su poder en las interfases L-L, L-S y L-G como:",
            "",
            "A) Afrógeno, emulsificante, espumante",
            "B) Humectante, antiespumante, detergente",
            "C) Emulsificante, humectante, afrógeno",
            "D) Solubilizante, antiespumante, humectante",
          ].join("\n"),
          solution: [
            "**Respuesta: C.**",
            "",
            "L-L → **emulsificante** (O/W o W/O) y solubilizante/microemulsificante.",
            "L-S → **humectante**.",
            "L-G → **afrógeno** (forma espuma), antiespumante y detergente.",
            "",
            "Memoriza la relación interfase→poder directamente, no solo la lista de nombres: es la trampa más repetida en el parcial.",
          ].join("\n"),
        },
        {
          question: [
            "**Cálculo — HLB de mezcla.** Necesitas un HLB de 12 para emulsionar una fase oleosa. Dispones de Span 80 (HLB 4.3) y Tween 80 (HLB 15). ¿Qué porcentaje de cada uno debes usar?",
          ].join("\n"),
          solution: [
            "#### Planteamiento",
            "HLB_mezcla = (HLB_A × %A + HLB_B × %B) / 100, con %A + %B = 100.",
            "",
            "#### Despeje",
            "%Tween80 = (HLB_mezcla − HLB_Span80) / (HLB_Tween80 − HLB_Span80) × 100",
            "%Tween80 = (12 − 4.3) / (15 − 4.3) × 100 ≈ **72 %**",
            "%Span80 = 100 − 72 = **28 %**",
            "",
            "#### Verificación",
            "(4.3 × 0.28) + (15 × 0.72) = 1.20 + 10.8 = **12.0** ✓",
          ].join("\n"),
        },
        {
          question: [
            "**Aplicación — formulación.** Vas a formular una emulsión O/W (aceite en agua). ¿Qué rango de HLB debe tener el tensioactivo (o la mezcla) y qué tipo de tensioactivo evitarías si necesitas compatibilidad amplia de pH?",
          ].join("\n"),
          solution: [
            "Rango de HLB: **8–16** (emulsificante O/W según la escala de Griffin).",
            "",
            "Evitarías los tensioactivos **iónicos** (aniónicos o catiónicos): su carga los hace sensibles al pH y a los electrolitos del medio, lo que puede desestabilizar la emulsión. Los tensioactivos **no iónicos** son más compatibles en un rango amplio de pH.",
          ].join("\n"),
        },
        {
          question: [
            "**Cálculo — coeficiente de extensión.** La tensión superficial del agua es 72.0 din/cm; la de una loción oleosa con tensioactivo al 5 % es 35.2 din/cm; la tensión interfacial loción-agua es 4.2 din/cm. Calcule el coeficiente de extensión S de la loción sobre el agua e interprete el signo.",
          ].join("\n"),
          solution: [
            "#### Fórmula",
            "S = γ_agua − (γ_loción + γ_interfacial)",
            "",
            "#### Cálculo",
            "S = 72.0 − (35.2 + 4.2) = 72.0 − 39.4 = **32.6 din/cm**",
            "",
            "#### Interpretación",
            "**S > 0**: la loción se extiende espontáneamente sobre el agua — la adhesión (loción-agua) predomina sobre la cohesión interna de la loción.",
          ].join("\n"),
        },
        {
          question: [
            "**Aplicación.** Dos excipientes de tableteo frente al agua: estearato de magnesio (ángulo de contacto 121°) y lactosa (ángulo de contacto 30°). ¿Cuál se moja mejor y por qué se usa el estearato de magnesio como lubricante y no como agente humectante?",
          ].join("\n"),
          solution: [
            "La **lactosa** se moja mejor: su ángulo de contacto es pequeño (30°), muy por debajo de 90°, lo que indica buena afinidad por el agua (hidrofilia).",
            "",
            "El **estearato de magnesio** tiene un ángulo de contacto mayor a 90° (121°), lo que lo clasifica como **hidrofóbico**: repele el agua en vez de dejarse mojar por ella. Por eso se usa como **lubricante** (evita que el polvo se adhiera a los punzones/matrices) y no como humectante, que requeriría justo lo contrario.",
          ].join("\n"),
        },
        {
          question: [
            "**V/F con justificación.** La CMC de un tensioactivo no iónico es mayor que la de uno iónico con la misma longitud de cadena hidrofóbica.",
          ].join("\n"),
          solution: [
            "**Falso.**",
            "",
            "Es **menor**. El tensioactivo no iónico no tiene carga en su grupo hidrofílico, por lo que no sufre la repulsión electrostática que dificulta el acercamiento de las cabezas polares en el iónico. Esto facilita la micelización a una concentración más baja (menor CMC) y además permite micelas de mayor tamaño.",
          ].join("\n"),
        },
        {
          question: [
            "**V/F con justificación.** Un liposoma es una monocapa formada por autoensamblaje de moléculas anfifílicas, igual que una micela.",
          ].join("\n"),
          solution: [
            "**Falso.**",
            "",
            "Los liposomas están formados por **bicapas** lipídicas (como la membrana celular), no por monocapas. Las micelas sí son estructuras de **monocapa** (las colas hidrofóbicas apuntan hacia el centro, lejos del agua). No confundir ambas estructuras aunque las dos se autoensamblen a partir de moléculas anfifílicas.",
          ].join("\n"),
        },
        {
          question: [
            "**Definición — diferenciación.** Diferencie el soluto tipo I y el soluto tipo IIA en términos de exceso de concentración superficial (Γ₂) y efecto sobre la tensión superficial.",
          ].join("\n"),
          solution: [
            "**Soluto tipo I**: exceso de concentración superficial **negativo** (Γ₂ < 0) — el soluto evita la interfase y prefiere el seno de la solución. **Aumenta** la tensión superficial. Ejemplo: electrolitos, sales inorgánicas.",
            "",
            "**Soluto tipo IIA**: exceso **positivo** (Γ₂ > 0) — se concentra fuertemente en la interfase. **Disminuye** mucho la tensión superficial, con un efecto más marcado que el tipo II. Son los tensioactivos.",
            "",
            "El signo de Γ₂ se deduce del signo de dγ/dc en la isoterma de Gibbs: dγ/dc > 0 → Γ₂ < 0 (tipo I); dγ/dc < 0 → Γ₂ > 0 (tipo II/IIA).",
          ].join("\n"),
        },
        {
          question: [
            "**Definición.** Defina brevemente el **parámetro de empaquetamiento** de un tensioactivo y explique qué predice.",
          ].join("\n"),
          solution: [
            "Es una relación geométrica, P = v / (a₀ · lc), entre el volumen de la cola hidrofóbica (v), el área óptima de la cabeza polar (a₀) y la longitud de la cadena hidrofóbica extendida (lc).",
            "",
            "**Predice el tipo de agregado** que formará el tensioactivo en solución: valores bajos (P ≤ 1/3) dan micelas esféricas; valores intermedios, micelas cilíndricas o bicapas curvas (vesículas); P ≈ 1, bicapas planas; P > 1, micelas invertidas (estructuras W/O) — es decir, también predice si el tensioactivo favorece emulsiones O/W (cabeza grande, P pequeño) o W/O (cola dominante, P grande).",
          ].join("\n"),
        },
      ],
      chapter: [
        "#### El problema que resuelven los tensioactivos",
        "",
        "Bate aceite y vinagre en un frasco: por un instante tienes gotas pequeñas repartidas, pero en segundos el sistema se separa de nuevo en dos capas. El agua y el aceite \"no se llevan bien\" — cada uno prefiere rodearse de sus propias moléculas antes que de las del otro. Y sin embargo, buena parte de lo que vas a formular en esta asignatura (cremas, lociones, jarabes con aceites esenciales, emulsiones) exige justamente lo contrario: mantener mezclados, de forma estable, dos líquidos que preferirían separarse. La familia de moléculas que hace posible esa convivencia forzada son los **tensioactivos**, y el objetivo de este módulo es entender, con la profundidad suficiente para formular con criterio, cómo funcionan.",
        "",
        "> Analogía que vas a usar todo el módulo: un tensioactivo es una molécula \"bilingüe\". Tiene una cabeza que habla el idioma del agua (polar, hidrófila) y una cola que habla el idioma del aceite (apolar, lipófila) — al mismo tiempo, en la misma molécula. Esa doble identidad (anfifilia) es la raíz de absolutamente todo lo que vas a ver en este capítulo: por qué bajan la tensión superficial, por qué forman micelas, por qué tienen un HLB, por qué humectan sólidos.",
        "",
        "#### Por qué el agua y el aceite se separan: la tensión superficial",
        "",
        "Para entender qué hace un tensioactivo, primero hay que entender el problema físico que resuelve. Dentro del seno de un líquido, cada molécula de agua está rodeada por vecinas en todas direcciones y las fuerzas de atracción (puentes de hidrógeno) se cancelan entre sí. Pero una molécula justo en la superficie, en contacto con el aire (o con otro líquido inmiscible), solo tiene vecinas hacia adentro: siente una fuerza neta que la jala hacia el interior del líquido. El resultado macroscópico de ese desbalance es la **tensión superficial** (cuando la interfase es líquido-gas) o **tensión interfacial** (cuando es entre dos fases condensadas, como líquido-líquido o líquido-sólido): la superficie se comporta como si fuera una membrana elástica en tensión, que siempre busca **minimizar su propia área**. Por eso una gota libre, sin nada más que la deforme, tiende a la forma esférica: es la forma geométrica con menor área superficial para un volumen dado.",
        "",
        "> Analogía: piensa en la tensión superficial como el \"malestar\" que siente una molécula de agua al estar expuesta en la frontera, sin poder rodearse completamente de sus iguales. Cuanto más grande es esa frontera (más área de interfase), más molestas colectivamente están las moléculas ahí — por eso el sistema, de forma espontánea, intenta reducir esa área al mínimo posible.",
        "",
        "Este \"malestar\" en la interfase tiene una consecuencia medible y formalizada por la **isoterma de adsorción de Gibbs**: si añades un soluto que, en vez de evitar la interfase, se acumula ahí, la tensión superficial cambia con la concentración de una manera predecible.",
        "",
        "```formula",
        "Γ_{2} = −#{c|RT} × (dγ/dc)",
        "```",
        "",
        "Cuando la tensión superficial **baja** al aumentar la concentración del soluto (dγ/dc negativo), la ecuación de Gibbs predice que ese soluto se está **concentrando en la interfase** más que en el seno de la solución (Γ₂ positivo) — a esto se le llama **soluto tipo II o IIA**, y los tensioactivos son el ejemplo por excelencia de tipo IIA, con un efecto especialmente marcado. En el sentido contrario, un soluto que **aumenta** la tensión superficial al añadirse (como un electrolito inorgánico simple) es un **soluto tipo I**: prefiere el seno de la solución y evita la interfase (Γ₂ negativo).",
        "",
        "> Analogía: imagina que la interfase es la frontera entre dos países, incómoda para casi todo el mundo. Un tensioactivo es como una persona bilingüe que, en vez de evitar la frontera, se instala justo ahí — porque puede \"hablar\" con los dos lados a la vez sin ningún costo. Cuantos más tensioactivos se instalan en esa frontera, menos \"tensa\" se vuelve — literalmente baja la tensión interfacial.",
        "",
        "#### Cómo actúa el tensioactivo: adsorción y orientación",
        "",
        "Un tensioactivo baja la tensión superficial/interfacial porque se **adsorbe** espontáneamente en cualquier interfase disponible (aire-agua, aceite-agua, sólido-líquido) y se orienta de forma consistente: la cabeza polar queda sumergida en la fase acuosa y la cola apolar se proyecta hacia la fase no polar (aire o aceite). Esa orientación ordenada forma una **monocapa** en la interfase que reduce directamente la energía necesaria para mantener esa superficie de contacto — por eso, al añadir un tensioactivo, es mucho más fácil formar y mantener gotas pequeñas (emulsificar), burbujas (formar espuma) o extender un líquido sobre un sólido (humectar).",
        "",
        "#### Clasificación de los tensioactivos",
        "",
        "Los tensioactivos se clasifican según la carga (o ausencia de carga) de su cabeza polar:",
        "",
        "* **Aniónicos** — cabeza con carga negativa (p. ej. lauril sulfato de sodio). Son sensibles al pH y a electrolitos.",
        "* **Catiónicos** — cabeza con carga positiva. Suelen tener además actividad antiséptica/desinfectante.",
        "* **Anfóteros (zwitteriónicos)** — pueden comportarse como aniónicos o catiónicos según el pH del medio.",
        "* **No iónicos** — sin carga; la parte hidrófila suele ser una cadena de polioxietileno (POE). Son los más tolerantes a cambios de pH y a la presencia de electrolitos, por eso son la primera opción cuando necesitas compatibilidad amplia de pH en una formulación.",
        "",
        "Según la interfase en la que actúan, reciben además un nombre funcional específico — y esta relación interfase → función es una de las que más se pregunta en examen:",
        "",
        "* Interfase **líquido-líquido (L-L)** → **emulsificante** (favorece y estabiliza emulsiones O/A o A/O) o **solubilizante/microemulsificante**.",
        "* Interfase **líquido-sólido (L-S)** → **humectante** (permite que un líquido moje un sólido que de otra forma repelería).",
        "* Interfase **líquido-gas (L-G)** → **afrógeno** (forma espuma), **antiespumante** o **detergente**, según el caso.",
        "",
        "Aplicado a la industria: en el campo farmacéutico, los tensioactivos se usan para solubilizar fármacos lipofílicos, estabilizar emulsiones y suspensiones, dar acción antiséptica/conservante, construir sistemas de liberación dirigida y favorecer la humectación y la permeabilidad. En cosmética, para detergencia y limpieza corporal, acondicionamiento capilar, como emulsionantes de cuidado cutáneo y para generar y estabilizar espuma.",
        "",
        "#### El balance hidrófilo-lipófilo: el sistema HLB",
        "",
        "No todos los tensioactivos son igual de \"acuosos\" o \"oleosos\" en su comportamiento. El **HLB** (Hydrophile-Lipophile Balance) es una escala numérica de 0 a 20 que cuantifica hacia qué lado se inclina más una molécula de tensioactivo: hacia el agua (HLB alto) o hacia el aceite (HLB bajo).",
        "",
        "> Analogía: piensa en el HLB como una brújula que apunta hacia el lado con el que el tensioactivo \"se siente más cómodo\". Un HLB bajo es una brújula que apunta al aceite: esa molécula se disuelve mejor en la fase oleosa y favorece que el aceite sea la fase continua (emulsiones A/O) o actúa como antiespumante. Un HLB alto apunta al agua: favorece que el agua sea la fase continua (emulsiones O/A), y en el extremo más alto de la escala favorece la detergencia y la solubilización.",
        "",
        "Para un tensioactivo no iónico, el **método de Griffin** estima el HLB directamente a partir de qué fracción de la masa molecular total corresponde a la parte hidrófila:",
        "",
        "```formula",
        "HLB = 20 × #{M_{h}|M}",
        "```",
        "",
        "El factor 20 es una constante empírica que normaliza la escala: una molécula teóricamente 100 % hidrófila (M_h = M) obtendría el HLB máximo de la escala, 20.",
        "",
        "En la práctica casi nunca usas un solo tensioactivo puro, sino **mezclas** de dos o más, precisamente porque combinarlos te permite alcanzar cualquier HLB intermedio que necesites. El HLB de una mezcla se comporta, con buena aproximación, como un **promedio ponderado** por la proporción de cada componente:",
        "",
        "```formula",
        "HLB_{mezcla} = #{HLB_{A} × %A + HLB_{B} × %B|100}",
        "```",
        "",
        "Por ejemplo: si necesitas un HLB de 12 para emulsionar una fase oleosa y tienes Span 80 (HLB 4.3) y Tween 80 (HLB 15), despejando la ecuación anterior obtienes que necesitas aproximadamente 72 % de Tween 80 y 28 % de Span 80 — el mismo tipo de cálculo que vas a practicar en los ejercicios de este módulo.",
        "",
        "Cada rango de HLB tiene una aplicación típica en la escala de Griffin: valores bajos (≈3–6) favorecen emulsiones A/O; valores intermedios-altos (≈8–16) favorecen emulsiones O/A; valores muy altos (≈15–18) funcionan como detergentes, y valores intermedios (≈7–9) como humectantes. Si vas a formular una emulsión O/A y necesitas compatibilidad amplia de pH, la elección natural son tensioactivos **no iónicos** en ese rango de HLB — los iónicos, al tener carga, son sensibles al pH y a los electrolitos del medio, lo que puede desestabilizar la emulsión.",
        "",
        "#### Cohesión, adhesión y el coeficiente de extensión",
        "",
        "Cuando dos líquidos entran en contacto (o un líquido con un sólido), lo que determina si se extienden espontáneamente uno sobre el otro o si prefieren mantenerse separados es una competencia entre dos tipos de energía:",
        "",
        "* **Trabajo de cohesión (Wc)** — la energía necesaria para separar una columna de un mismo líquido en dos partes. Es una medida de qué tan fuerte se atraen las moléculas **iguales** entre sí.",
        "* **Trabajo de adhesión (Wa)** — la energía necesaria para separar la interfase entre dos fases **distintas**. Mide qué tan fuerte se atraen moléculas de naturaleza química diferente.",
        "",
        "> Analogía: la cohesión es como el abrazo entre dos amigos de toda la vida — fuerte, cómodo, entre iguales. La adhesión es como el apretón de manos entre dos desconocidos de países distintos: puede ser fuerte también, pero es una atracción entre diferentes. Que un líquido se extienda sobre otro depende de cuál de los dos \"abrazos\" gana.",
        "",
        "El **coeficiente de extensión (S)**, formalizado por Harkins, compara directamente ambas energías:",
        "",
        "```formula",
        "S = W_{a} − W_{c} = γ_{w} − (γ_{o} + γ_{ow})",
        "```",
        "",
        "Si **S > 0**, la adhesión gana: el líquido se extiende espontáneamente formando una película sobre el otro. Si **S < 0**, la cohesión gana: el líquido prefiere replegarse sobre sí mismo formando una gota, en vez de extenderse (de-wetting). Por ejemplo, si la tensión superficial del agua es 72.0 din/cm, la de una loción oleosa con tensioactivo es 35.2 din/cm y la tensión interfacial entre ambas es 4.2 din/cm, el coeficiente de extensión resulta S = 72.0 − (35.2 + 4.2) = 32.6 din/cm: positivo, así que la loción se extiende espontáneamente sobre el agua.",
        "",
        "#### El ángulo de contacto y el mojado de sólidos",
        "",
        "La misma lógica de cohesión/adhesión aplica cuando el \"otro\" no es un líquido sino un sólido: eso es el **mojado**. La forma más directa de cuantificarlo es el **ángulo de contacto (θ)**: el ángulo que forma una gota de líquido con la superficie del sólido, medido en el punto donde se encuentran las tres fases (sólido, líquido y vapor).",
        "",
        "> Analogía: piensa en una gota de agua sobre una hoja de loto (o sobre una superficie recién encerada) — se queda como una esfera casi perfecta, con un ángulo de contacto grande: el sólido es hidrófobo, \"repele\" el agua. Ahora piensa en la misma gota sobre un vidrio limpio: se aplana y se extiende casi por completo, con un ángulo de contacto pequeño: el sólido es hidrófilo, \"acepta\" el agua.",
        "",
        "El equilibrio de tensiones en ese punto de contacto lo describe la **ecuación de Young**:",
        "",
        "```formula",
        "γ_{SV} = γ_{SL} + γ_{LV} cos θ",
        "```",
        "",
        "A menor ángulo de contacto (cos θ más cercano a 1), mejor es el mojado del sólido por el líquido. Combinando esta ecuación con la definición de trabajo de adhesión se obtiene la **ecuación de Young-Dupré**, que relaciona directamente el ángulo de contacto con la energía de mojado:",
        "",
        "```formula",
        "W_{a} = γ_{LV}(1 + cos θ)",
        "```",
        "",
        "Con θ = 0° (mojado total) el trabajo de adhesión es máximo (2γ_LV); con θ = 180° (sin mojado en absoluto) el trabajo de adhesión es cero. Un ejemplo farmacéutico muy concreto: el estearato de magnesio tiene un ángulo de contacto de 121° frente al agua (hidrofóbico), mientras que la lactosa tiene solo 30° (hidrofílica). Por eso el estearato de magnesio se usa como **lubricante** de tableteo (su hidrofobicidad evita que el polvo se adhiera a los punzones) y nunca como agente humectante, que necesitaría exactamente la propiedad contraria.",
        "",
        "El **mecanismo de humectación** de un sólido por un tensioactivo ocurre en varias etapas encadenadas: primero el tensioactivo se adsorbe en la superficie del sólido, orientando su parte más afín hacia él; eso hace bajar la tensión interfacial sólido-líquido, lo que permite que el líquido se extienda sobre el sólido en vez de quedarse como gotas separadas; al extenderse, el líquido va desplazando el aire que cubría la superficie, hasta que el sólido queda completamente \"mojado\"; ya mojado, el líquido penetra mejor en los poros e irregularidades del sólido. Todo el proceso es, en el fondo, adsorción sólido-líquido seguida de una reducción progresiva de la tensión interfacial.",
        "",
        "Existe además un valor característico de cada sólido, la **tensión superficial crítica (γc)**, que se determina con el método gráfico de Zisman: se mide el ángulo de contacto de varios líquidos de prueba distintos sobre ese sólido, se grafica el coseno de ese ángulo contra la tensión superficial de cada líquido, y se extrapola la recta resultante hasta el punto donde cos θ = 1 (mojado total, θ = 0°). El valor de tensión superficial en ese punto de corte es γc: solo los líquidos con una tensión superficial igual o menor a γc lograrán mojar espontánea y completamente esa superficie sólida.",
        "",
        "#### Cuando hay muchos tensioactivos juntos: la micela",
        "",
        "Hasta ahora hemos hablado de tensioactivos como moléculas individuales adsorbidas en una interfase. Pero, ¿qué pasa cuando añades tensioactivo más allá de lo que cabe en esa interfase?",
        "",
        "A concentraciones bajas, el tensioactivo existe sobre todo como monómeros libres, migrando hacia la interfase aire-agua disponible. A medida que sigues añadiendo, esa interfase se satura: ya no hay espacio para más moléculas ahí. Las moléculas adicionales tienen que quedarse en el seno del agua — y ahí sus colas hidrocarbonadas, no polares, perturban la red de puentes de hidrógeno del agua entre sí, lo cual es energéticamente desfavorable. El sistema resuelve esa incomodidad agrupando esas colas en un núcleo hidrófobo, protegido del agua, con las cabezas polares hacia afuera: eso es una **micela**. La concentración a partir de la cual este fenómeno empieza a ocurrir de forma masiva y espontánea es la **concentración micelar crítica (CMC)**.",
        "",
        "> Analogía: imagina una fiesta pequeña donde la \"interfase\" (la pista de baile, junto a la puerta, donde todos quieren estar) ya está completamente llena. Los invitados que siguen llegando ya no caben ahí, así que forman su propio corrillo en el centro del salón — de espaldas a la incomodidad del resto de la fiesta, protegidos entre ellos. Eso es exactamente lo que hace una micela: un grupo de tensioactivos que, al no caber más en la interfase, se refugian juntos en el seno de la solución.",
        "",
        "Por encima de la CMC, seguir añadiendo tensioactivo no aumenta la concentración de monómero libre (que permanece constante, en equilibrio dinámico con las micelas) sino que aumenta el número, tamaño o forma de las micelas — y, coherentemente, **la tensión superficial deja de bajar una vez superada la CMC**: la cantidad de tensioactivo en la superficie ya no cambia, solo cambia lo que pasa en el seno de la solución. En un disolvente orgánico (en vez de agua) el fenómeno se invierte: se forman **micelas inversas**, con las colas apolares hacia el exterior (en contacto con el disolvente orgánico) y las cabezas polares agrupadas en el centro.",
        "",
        "Un detalle relevante para comparar tensioactivos: un tensioactivo **no iónico** tiene una CMC **menor** que uno iónico de cadena hidrofóbica equivalente, porque el iónico sufre repulsión electrostática entre sus cabezas cargadas, lo que dificulta que se acerquen para formar la micela; el no iónico no tiene esa barrera, así que micela a una concentración más baja. Y una precisión importante que suele confundirse: una micela es una estructura de **monocapa** (las colas apuntan hacia el centro, lejos del agua), mientras que un **liposoma** está formado por una **bicapa** lipídica, como la membrana celular — ambas se autoensamblan a partir de moléculas anfifílicas, pero no son la misma estructura.",
        "",
        "#### La forma de las micelas: el parámetro de empaquetamiento",
        "",
        "Las micelas no siempre son esféricas. La forma que adopta el agregado depende de la **geometría efectiva** de la molécula de tensioactivo, que se puede predecir con el **parámetro de empaquetamiento crítico (P)**:",
        "",
        "```formula",
        "P = #{v|a_{0} × l_{c}}",
        "```",
        "",
        "> Analogía: piensa en cada molécula de tensioactivo como una pieza geométrica. Si la cabeza polar es grande comparada con la cola (como un cono con base ancha), esas piezas solo pueden apilarse formando una superficie muy curva: una esfera pequeña. Si la cabeza se \"encoge\" relativamente (porque hay más concentración de tensioactivo compitiendo por espacio, o porque una sal apantalla su repulsión eléctrica), la pieza se parece más a un cilindro, y los cilindros se apilan mejor formando estructuras más alargadas o más planas.",
        "",
        "Concretamente: con P ≤ 1/3 (cabeza grande, cola delgada) se forman **micelas esféricas**; entre 1/3 y 1/2, **micelas cilíndricas o \"gusaniformes\"** (worm-like), que a diferencia de las esferas se entrelazan entre sí formando una red que aumenta mucho la viscosidad del sistema; entre 1/2 y 1, **vesículas o bicapas curvas**; con P ≈ 1 (geometría casi cilíndrica perfecta), **bicapas planas** con comportamiento cristalino-líquido; y con P > 1 (cola voluminosa dominando sobre una cabeza pequeña, típico de tensioactivos de HLB bajo), **micelas invertidas**.",
        "",
        "Este no es un fenómeno solo teórico: es exactamente lo que vas a observar (o ya observaste) en la práctica del efecto viscosante con lauril éter sulfato de sodio (SLES) y NaCl. Sin sal, la fuerte repulsión electrostática entre las cabezas del SLES mantiene un área efectiva por cabeza grande y P < 1/3: micelas esféricas pequeñas, poca resistencia al flujo, viscosidad baja. Al añadir NaCl gradualmente, los cationes Na⁺ apantallan esa repulsión, el área efectiva por cabeza baja, P sube hacia 1/3–1/2, y las micelas se alargan hasta volverse cilíndricas y entrelazarse en una red tipo gel: la viscosidad sube drásticamente. Si sigues añadiendo sal en exceso, el apantallamiento se vuelve tan fuerte que las cabezas pierden su agua de solvatación, la red se rompe (*salting-out*) y la viscosidad vuelve a caer — de ahí la forma característica de \"curva de sal\" (sube y luego baja) que obtuviste al graficar viscosidad contra NaCl añadido.",
        "",
        "Compuestos que no son tensioactivos por sí mismos, como los **cotensioactivos** (alcoholes de cadena corta), pueden ajustar el parámetro P hacia valores cercanos a 1 modificando el área de la cabeza o el volumen de la cola, favoreciendo la formación de microemulsiones. Y al seguir subiendo la concentración de tensioactivo más allá de la CMC, antes de llegar a la bicapa completa, pueden aparecer fases intermedias ordenadas llamadas **cristales líquidos liotrópicos** (hexagonales, laminares).",
        "",
        "#### Temperatura y solubilidad: Krafft, cloud point y PIT",
        "",
        "La solubilidad de un tensioactivo no es constante: depende fuertemente de la temperatura, y de una forma distinta según si el tensioactivo es iónico o no iónico.",
        "",
        "Un tensioactivo **aniónico**, a baja temperatura, existe mayoritariamente como un sólido cristalino hidratado, con muy poco monómero libre en solución. Al subir la temperatura, aumenta la fracción de monómero libre hasta que se alcanza la CMC; por encima de ese punto, el tensioactivo adicional se incorpora fácilmente formando nuevas micelas, así que la solubilidad total aparente sube con la temperatura. La temperatura mínima a la que esto ocurre —a la que finalmente se alcanza la CMC— es la **temperatura de Krafft**: por debajo de ella, el tensioactivo se mantiene \"atrapado\" en forma cristalina, prácticamente insoluble.",
        "",
        "Un tensioactivo **no iónico**, en cambio, no depende de una cabeza cargada sino de que su cadena de polioxietileno (POE) esté hidratada por puentes de hidrógeno. Al subir la temperatura, esos puentes de hidrógeno se rompen, la cadena se deshidrata y la molécula se vuelve más lipofílica — así que su solubilidad **baja** con la temperatura, justo al revés que el aniónico. La temperatura a la que esa deshidratación provoca que el tensioactivo se agregue y la solución se enturbie es el **punto de enturbiamiento (cloud point)**.",
        "",
        "> Analogía: la temperatura de Krafft es como un punto de \"descongelamiento\" mínimo — por debajo, el tensioactivo iónico sigue \"congelado\" en forma cristalina y no puede hacer su trabajo. El cloud point es casi lo contrario: un punto de \"sobrecalentamiento\" para el no iónico — por encima, pierde el agua que lo mantenía disuelto y se agrega, enturbiando la solución.",
        "",
        "Cuando el tensioactivo no iónico forma parte de una **emulsión** (no de una solución simple), ese mismo mecanismo de deshidratación tiene una consecuencia distinta: en vez de solo enturbiar, cambia la curvatura preferida del emulsificante en la interfase, y la emulsión puede invertirse abruptamente de O/A a A/O. La temperatura a la que ocurre esa inversión es la **temperatura de inversión de fases (PIT)**, y suele quedar cerca del cloud point del emulsificante usado, porque comparten el mismo mecanismo físico. Este fenómeno tiene aplicaciones prácticas: formular o procesar cerca de la PIT y enfriar rápidamente permite obtener emulsiones de gota muy fina y monodispersa (la tensión interfacial cae casi a cero justo en ese punto); por eso la PIT de un producto terminado debe quedar bien por encima de su temperatura máxima de almacenamiento, para evitar que se rompa por coalescencia durante su vida útil.",
        "",
        "#### Otra interfase, el mismo principio: la espuma",
        "",
        "Todo lo que hemos visto sobre interfases líquido-líquido y líquido-sólido aplica también a la interfase líquido-gas, y de ahí sale la formación de **espuma**. El agua pura no puede formar espuma estable: su tensión superficial es tan alta que la presión que genera favorece que las burbujas colapsen casi al instante. Un tensioactivo (actuando aquí como **afrógeno**) se adsorbe en la interfase líquido-aire de cada burbuja, con las colas hacia el gas y las cabezas hacia el agua, bajando notablemente la tensión superficial y facilitando que se formen y se mantengan burbujas.",
        "",
        "La estabilidad de esa película delgada (lamela) frente a perturbaciones se explica por el **efecto Gibbs-Marangoni**: si la lamela se adelgaza localmente, baja ahí la concentración de tensioactivo, lo que hace subir la tensión superficial local — y ese gradiente de tensión arrastra líquido y tensioactivo desde las zonas vecinas más gruesas hacia la zona adelgazada, restaurando el grosor antes de que la película colapse.",
        "",
        "#### El puente hacia los sistemas coloidales",
        "",
        "Micelas, vesículas y cristales líquidos liotrópicos no son solo curiosidades de la fisicoquímica de tensioactivos: son, en realidad, **sistemas coloidales de asociación**, porque su tamaño cae justo dentro del rango coloidal (1 nm–1 µm) que definiste en el Módulo 1. El Módulo 3 retoma exactamente este punto para ampliar el estudio de los sistemas coloidales en general: su forma y tamaño de partícula, la diferencia entre coloides liofílicos y liofóbicos, sus propiedades eléctricas (doble capa eléctrica), ópticas y de sedimentación, y el comportamiento reológico (viscosidad, tixotropía) de sistemas donde estas estructuras están presentes.",
        "",
        "#### En resumen",
        "",
        "* Un tensioactivo es una molécula **anfifílica** que se adsorbe en interfases y baja la tensión superficial/interfacial, orientando su cabeza polar hacia el agua y su cola apolar hacia la otra fase.",
        "* Se clasifica por carga (aniónico, catiónico, anfótero, no iónico) y por la interfase donde actúa (L-L emulsificante, L-S humectante, L-G afrógeno/antiespumante/detergente).",
        "* El **HLB** cuantifica su afinidad relativa por agua u aceite; se calcula por el método de Griffin para no iónicos y se combina como promedio ponderado en mezclas.",
        "* La **cohesión, adhesión y el coeficiente de extensión (S)** predicen si un líquido se extiende espontáneamente sobre otro o sobre un sólido; el **ángulo de contacto** y la **ecuación de Young** cuantifican el mojado.",
        "* Por encima de la **CMC** se forman **micelas**, cuya forma (esférica, cilíndrica, laminar, invertida) predice el **parámetro de empaquetamiento (P)**.",
        "* La **temperatura** afecta la solubilidad de forma opuesta en iónicos (temperatura de Krafft) y no iónicos (cloud point/PIT).",
        "* Todo esto — micelas, vesículas, cristales líquidos — son sistemas coloidales de asociación: el puente directo hacia el Módulo 3.",
      ].join("\n"),
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
    { term: "Fase dispersa", moduleSlug: "introduccion", definition: "Sustancia fraccionada en pequeñas partículas dentro de un sistema heterodisperso; también llamada **fase interna o discontinua**." },
    { term: "Fase dispersante", moduleSlug: "introduccion", definition: "Medio **homogéneo y continuo** en el que se distribuyen las partículas de la fase dispersa; también llamada fase externa." },
    { term: "Monodisperso / polidisperso", moduleSlug: "introduccion", definition: "**Monodisperso**: partículas de tamaño prácticamente uniforme. **Polidisperso**: partículas de tamaños variados; a menor índice de polidispersidad, mayor homogeneidad del sistema." },
    { term: "Incoherente / coherente", moduleSlug: "introduccion", definition: "**Incoherente**: sistema sin red estructural entre partículas (suspensiones, emulsiones). **Coherente**: con una red tridimensional que le da estructura (geles, bases para ungüento)." },
    { term: "Tensioactivo", moduleSlug: "tensioactivos-hlb", definition: "Sustancia que **reduce la tensión superficial o interfacial** entre dos fases, favoreciendo procesos como la emulsificación, humectación o solubilización." },
    { term: "HLB (Balance Hidrófilo-Lipófilo)", moduleSlug: "tensioactivos-hlb", definition: "Valor numérico (0-20) que indica la **afinidad relativa** de un tensioactivo por la fase acuosa u oleosa; valores bajos favorecen emulsiones A/O y valores altos O/A." },
    { term: "Tensión interfacial", moduleSlug: "tensioactivos-hlb", definition: "**Fuerza por unidad de longitud** que actúa en la interfase entre dos fases inmiscibles, tendiendo a minimizar el área de contacto entre ellas." },
    { term: "Ángulo de contacto", moduleSlug: "tensioactivos-hlb", definition: "Ángulo formado entre la superficie de un sólido y la tangente a la superficie de un líquido en el punto de contacto; indica el **grado de mojado**." },
    { term: "Adsorción sólido-líquido", moduleSlug: "tensioactivos-hlb", definition: "**Acumulación de moléculas** (p. ej. un tensioactivo) en la interfase entre un sólido y un líquido; es la base física del punto de mojado." },
    { term: "Trabajo de adhesión (Wa)", moduleSlug: "tensioactivos-hlb", definition: "Energía necesaria para **separar 1 cm² de la interfase** entre dos líquidos inmiscibles (o un líquido y un sólido); ocurre entre moléculas de naturaleza química diferente." },
    { term: "Trabajo de cohesión (Wc)", moduleSlug: "tensioactivos-hlb", definition: "Energía necesaria para **separar 1 cm² de una columna** de un único líquido homogéneo; ocurre entre moléculas de la misma naturaleza." },
    { term: "Coeficiente de extensión (S)", moduleSlug: "tensioactivos-hlb", definition: "S = Wa − Wc. Si **S>0** el líquido se extiende espontáneamente sobre el sustrato; si **S<0** se repliega en gota (de-wetting)." },
    { term: "Isoterma de adsorción de Gibbs", moduleSlug: "tensioactivos-hlb", definition: "Relaciona el **exceso de concentración superficial** de un soluto con la variación de la tensión superficial respecto a su concentración (dγ/dc)." },
    { term: "Soluto tipo I", moduleSlug: "tensioactivos-hlb", definition: "Soluto **excluido de la interfase** (exceso de concentración superficial negativo); **aumenta** la tensión superficial. Ejemplo: electrolitos inorgánicos." },
    { term: "Soluto tipo II / IIA", moduleSlug: "tensioactivos-hlb", definition: "Soluto que **se concentra en la interfase** (exceso positivo) y **disminuye** la tensión superficial; el tipo IIA (tensioactivos) tiene un efecto mucho más fuerte que el tipo II." },
    { term: "CMC (concentración micelar crítica)", moduleSlug: "tensioactivos-hlb", definition: "Concentración mínima de tensioactivo a partir de la cual **empiezan a formarse micelas** en solución." },
    { term: "Micela", moduleSlug: "tensioactivos-hlb", definition: "Estructura **autoensamblada** de moléculas de tensioactivo en solución acuosa, formada por encima de la CMC (esférica, cilíndrica, laminar)." },
    { term: "Temperatura de Krafft", moduleSlug: "tensioactivos-hlb", definition: "Temperatura **mínima** a la que la solubilidad de un tensioactivo iónico alcanza la CMC y pueden formarse micelas; por debajo permanece en forma cristalina no disuelta." },
    { term: "Punto de enturbiamiento (cloud point)", moduleSlug: "tensioactivos-hlb", definition: "Análogo al de Krafft pero para tensioactivos **no iónicos**: al subir la temperatura por encima de este punto, las cadenas de óxido de etileno se deshidratan y la solución se enturbia." },
    { term: "Parámetro de empaquetamiento (P)", moduleSlug: "tensioactivos-hlb", definition: "Relación geométrica (v / a₀·lc) que **predice el tipo de agregado** que forma un tensioactivo: micela esférica, cilíndrica, bicapa o micela invertida." },
    { term: "Cotensioactivo", moduleSlug: "tensioactivos-hlb", definition: "Compuesto con cierto carácter tensioactivo (p. ej. alcoholes de cadena corta) que **no es tensioactivo por sí mismo** pero ajusta el parámetro de empaquetamiento y estabiliza interfases." },
    { term: "Cristales líquidos liotrópicos", moduleSlug: "tensioactivos-hlb", definition: "Fases ordenadas (hexagonales, laminares) que forman los tensioactivos a **concentración alta**, como paso intermedio entre la micela esférica y la bicapa completa." },
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
      name: "Coeficiente de extensión de Harkins",
      expression: "S = W_{a} − W_{c} = γ_{w} − (γ_{o} + γ_{ow})",
      variables: "W_{a} = trabajo de adhesión · W_{c} = trabajo de cohesión · γ_{w} = tensión superficial del agua · γ_{o} = tensión superficial del aceite/loción · γ_{ow} = tensión interfacial aceite-agua",
      description: "Predice si un líquido se **extiende espontáneamente** sobre otro (o sobre un sólido) comparando el trabajo de adhesión con el de cohesión.",
      moduleSlug: "tensioactivos-hlb",
      derivation:
        "Compara la energía que favorece que el líquido se **adhiera** a un sustrato distinto (Wa) frente a la que lo mantiene **cohesionado** consigo mismo (Wc). Si Wa > Wc, la adhesión gana y S resulta positivo: el líquido se extiende espontáneamente formando una película. Si Wc > Wa, S es negativo y el líquido prefiere replegarse en una gota (de-wetting) antes que extenderse.\nS = coeficiente de extensión — din/cm (cgs) o mN/m (SI).\nW_{a} = trabajo de adhesión entre las dos fases — din/cm o mN/m.\nW_{c} = trabajo de cohesión del líquido que se extiende — din/cm o mN/m.\nγ_{w} = tensión superficial de la fase acuosa — din/cm o mN/m.\nγ_{o} = tensión superficial de la fase oleosa/loción — din/cm o mN/m.\nγ_{ow} = tensión interfacial entre ambas fases — din/cm o mN/m.\n**S>0**: se extiende espontáneamente. **S≈0**: forma una lente plana. **S<0**: se repliega en gota.",
    },
    {
      name: "Ecuación de Young-Dupré (trabajo de adhesión)",
      expression: "W_{a} = γ_{LV}(1 + cos θ)",
      variables: "W_{a} = trabajo de adhesión sólido-líquido · γ_{LV} = tensión superficial líquido-vapor · θ = ángulo de contacto",
      description: "Combina la ecuación de Young con la definición de trabajo de adhesión para relacionar el **ángulo de contacto** directamente con la energía de mojado.",
      moduleSlug: "tensioactivos-hlb",
      derivation:
        "Se obtiene sustituyendo la ecuación de Young (γ_{SV} = γ_{SL} + γ_{LV} cos θ) en la definición de trabajo de adhesión sólido-líquido (W_{a} = γ_{SV} + γ_{LV} − γ_{SL}). El resultado deja el trabajo de adhesión en función solo de γ_{LV} y θ, ambos medibles directamente.\nθ = 0° (**mojado total**) → W_{a} máximo = 2γ_{LV}.\nθ = 180° (**sin mojado**) → W_{a} = 0.\nA **menor ángulo de contacto, mayor trabajo de adhesión** y mejor mojado del sólido por el vehículo.",
    },
    {
      name: "Isoterma de adsorción de Gibbs (solución diluida)",
      expression: "Γ_{2} = −#{c|RT} × (dγ/dc)",
      variables: "Γ_{2} = concentración superficial en exceso del soluto · c = concentración del soluto · R = constante de los gases · T = temperatura absoluta · dγ/dc = variación de la tensión superficial con la concentración",
      description: "Predice si un soluto se **concentra en la interfase** (adsorción positiva) o la **evita** (adsorción negativa) según cómo cambia la tensión superficial con su concentración.",
      moduleSlug: "tensioactivos-hlb",
      derivation:
        "Relaciona el exceso de concentración de un soluto en la interfase (respecto al seno de la solución) con la pendiente de la tensión superficial frente a la concentración. Si dγ/dc es **negativo** (la tensión superficial baja al subir la concentración), Γ_{2} resulta **positivo**: el soluto se concentra en la interfase — así se comportan los solutos tipo II y IIA (tensioactivos). Si dγ/dc es **positivo**, Γ_{2} es **negativo**: el soluto evita la interfase y prefiere el seno de la solución — así se comportan los solutos tipo I (electrolitos).\nΓ_{2} = concentración superficial en exceso — mol/área.\nc = concentración del soluto en el seno de la solución — mol/L.\nR = constante de los gases — 8.314 J/(mol·K).\nT = temperatura absoluta — K.\ndγ/dc = pendiente de la tensión superficial respecto a la concentración — (din/cm)/(mol/L).",
    },
    {
      name: "Parámetro de empaquetamiento",
      expression: "P = #{v|a_{0} × l_{c}}",
      variables: "v = volumen de la cola hidrofóbica · a_{0} = área óptima del grupo hidrofílico (cabeza polar) · l_{c} = longitud de la cadena hidrofóbica extendida",
      description: "Predice, a partir de la **geometría molecular** del tensioactivo, qué tipo de agregado formará (micela esférica, cilíndrica, bicapa o micela invertida).",
      moduleSlug: "tensioactivos-hlb",
      derivation:
        "Compara el volumen que ocupa la cola hidrofóbica con el volumen de un cono definido por el área de la cabeza polar y la longitud de la cadena extendida. Cuanto más pequeño P, más se parece la molécula a un cono con base ancha (cabeza grande frente a cola) y forma agregados muy curvados (micelas esféricas); cuanto más cerca de 1, más cilíndrica es la forma efectiva y forma bicapas planas; por encima de 1 la cola domina y se favorecen micelas invertidas (estructuras A/O).\nP ≤ 1/3 → **micelas esféricas**. 1/3–1/2 → **micelas cilíndricas**. 1/2–1 → **vesículas / bicapas curvas**. ≈1 → **bicapas planas**. >1 → **micelas invertidas** (W/O).\nLos **cotensioactivos** (p. ej. alcoholes de cadena corta) no son tensioactivos por sí mismos, pero modifican a_{0} o v y ajustan P hacia valores cercanos a 1, favoreciendo microemulsiones. Al seguir subiendo la concentración de tensioactivo aparecen los **cristales líquidos liotrópicos** (hexagonales, laminares) como paso intermedio hacia la bicapa completa.",
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
      quizQuestions: [
        {
          question: "¿Cuáles son las cinco propiedades tecnológicas del tensioactivo que evalúa esta práctica?",
          solution: "Efecto **viscosante**, efecto **gelificante**, poder **humectante**, poder **solubilizante** y poder **emulsificante**.",
        },
        {
          question: "El lauril éter sulfato de sodio (LESS) comercial viene al 28 %. ¿Cuántos mL del comercial se necesitan para preparar 100 mL de una dispersión al 5 %? (usa C₁V₁ = C₂V₂)",
          solution: "V₁ = (C₂×V₂)/C₁ = (5×100)/28 ≈ **17.9 mL** del comercial, llevados a 100 mL con agua.",
        },
        {
          question: "¿Por qué se debe agitar suavemente al preparar/disolver la dispersión de LESS y al añadir el NaCl?",
          solution: "Para **no generar espuma**, que interferiría con la medición de viscosidad y con la apariencia del sistema.",
        },
        {
          question: "Describe el patrón esperado de viscosidad al ir añadiendo NaCl en incrementos de 3,0 g hasta 15,0 g acumulados.",
          solution: "La viscosidad **sube hasta un máximo** (crecimiento de micelas cilíndricas/gusaniformes que se entrelazan) y luego **cae** (salting-out: deshidratación y ruptura de la red micelar) — la clásica \"curva de sal\".",
        },
        {
          question: "¿Por qué se mide la viscosidad por triplicado en cada punto de la curva de NaCl?",
          solution: "Para tener una medida más confiable (reduce el error/variabilidad de la lectura) en cada concentración de sal antes de graficar.",
        },
        {
          question: "En el efecto gelificante, ¿qué reacción química forma el gel, y con qué reactivos?",
          solution: "Una **saponificación**: ácido esteárico + hidróxido de sodio (NaOH) forman **estearato de sodio** (un jabón), que gelifica el vehículo.",
        },
        {
          question: "¿Por qué la solución de NaOH debe estar a la misma temperatura que la dispersión de ácido esteárico antes de mezclarlas?",
          solution: "Para evitar que el ácido esteárico se solidifique/precipite bruscamente por choque térmico, y para que la saponificación y la gelificación ocurran de forma homogénea en todo el sistema.",
        },
        {
          question: "Nombra los tres vehículos usados en las formulaciones EG1, EG2 y EG3 del efecto gelificante.",
          solution: "EG1 = **etanol**, EG2 = **glicerina**, EG3 = **agua**.",
        },
        {
          question: "En el efecto gelificante, ¿cuántos gramos de ácido esteárico y de NaOH se usan en cada formulación (EG1/EG2/EG3)?",
          solution: "**2,0 g** de ácido esteárico y **0,35 g** de NaOH en cada una — solo cambia el vehículo.",
        },
        {
          question: "¿Qué variables se comparan entre el sistema de azufre pulverizado en agua sola y en ARLACEL®/SPAN 20® para evaluar el poder humectante?",
          solution: "**Velocidad de sedimentación**, **volumen del sedimento** y **aspecto** del sedimento y del sobrenadante.",
        },
        {
          question: "¿Qué resultado esperarías si el ARLACEL®/SPAN 20® mejora la humectación del azufre frente al agua sola?",
          solution: "El azufre humectado se dispersaría mejor y **sedimentaría más lento** (menor velocidad de sedimentación), con un sedimento más uniforme — en vez de flotar o formar grumos que no se mojan.",
        },
        {
          question: "En el poder solubilizante (primera parte), ¿qué se adiciona gota a gota y hasta qué volumen máximo, y qué se busca observar como punto final?",
          solution: "Se adiciona **Polisorbato 80/20** en porciones de **0,1 mL** (máximo 1,0 mL) hasta que el sistema bifásico (aceite + agua) se vuelve **monofásico y transparente**.",
        },
        {
          question: "¿Cuál es la diferencia entre la primera y la segunda parte del ensayo de poder solubilizante, y qué compara?",
          solution: "En la primera parte el tensioactivo se añade sobre la mezcla aceite+agua ya formada; en la segunda, primero se mezcla el aceite con el tensioactivo y luego se añade el agua en porciones. Compara el efecto del **orden de adición** sobre la solubilización.",
        },
        {
          question: "En el poder emulsificante, ¿qué fase se adiciona sobre cuál, y en qué estado (agitando o no)?",
          solution: "Se adiciona la **fase acuosa sobre la fase oleosa**, agitando de forma **constante**.",
        },
        {
          question: "¿Por qué ambas fases (oleosa y acuosa) se calientan al baño maría a la misma temperatura antes de mezclarlas en el poder emulsificante?",
          solution: "Para evitar la **solidificación prematura** de los componentes de la fase oleosa (ceras, ácidos grasos) al entrar en contacto con una fase más fría, lo que daría una emulsión mal formada.",
        },
        {
          question: "¿Por qué se usa espátula de plástico y agitación suave en los pasos donde puede generarse espuma?",
          solution: "Para **minimizar la introducción de aire/espuma** en el sistema, que alteraría la apariencia y las mediciones.",
        },
        {
          question: "Escribe la fórmula de la velocidad de sedimentación usada en esta práctica y qué representa cada término.",
          solution: "v_sed = 1/t, donde **t** es el tiempo (s) que tarda la fase dispersa en sedimentar; a mayor tiempo, **menor** velocidad de sedimentación.",
        },
        {
          question: "Si en esta práctica el tensioactivo emulsiona dos fases líquidas, ¿en qué interfase y con qué \"poder\" está actuando?",
          solution: "Interfase **líquido-líquido (L-L)**, actuando como **emulsificante**.",
        },
        {
          question: "V/F con justificación: en el ensayo de efecto viscosante, entre más NaCl se añada, siempre mayor será la viscosidad.",
          solution: "**Falso.** La viscosidad sube solo hasta un máximo; superado cierto punto (cerca de los 15,0 g acumulados), el exceso de sal produce *salting-out* y la viscosidad cae.",
        },
        {
          question: "¿Qué instrumento se usa para medir la viscosidad en el efecto viscosante, y con qué frecuencia de medición?",
          solution: "**Viscosímetro rotacional**, midiendo **por triplicado** en cada punto de NaCl.",
        },
        {
          question: "En el poder solubilizante, ¿qué significa que el sistema pase de \"bifásico\" a \"monofásico transparente\"?",
          solution: "Que el aceite (salicilato de metilo o aceite de eucalipto), antes visible como fase separada en el agua, quedó completamente **solubilizado dentro de micelas** del tensioactivo — ya no hay dos fases visibles.",
        },
        {
          question: "¿Qué relación tiene el estearato de sodio formado en el efecto gelificante con la clasificación de tensioactivos del Módulo 2?",
          solution: "Es un **tensioactivo aniónico** (jabón) formado *in situ*; su capacidad de gelificar el vehículo (red que atrapa el líquido, sistema coherente) es una aplicación directa de cómo un tensioactivo puede modificar la estructura física de una formulación.",
        },
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
      quizQuestions: [
        {
          question: "¿Cuáles son los tres sólidos de trabajo en esta práctica y qué los diferencia entre sí?",
          solution: "**Hidróxido de aluminio, sulfadiazina y azufre** — tienen polaridad y mojabilidad (afinidad por el agua) distintas.",
        },
        {
          question: "Define, en tus propias palabras, qué es el \"punto de mojado\" de un sólido.",
          solution: "El volumen de agua necesario para humectar completamente un sólido, alcanzado cuando forma una **masa blanda sin flujo** (no líquida) sobre el vidrio.",
        },
        {
          question: "En la actividad 2A, ¿cómo se adiciona el agua y con qué se mezcla?",
          solution: "**Gota a gota desde una bureta**, mezclando con espátula tras cada adición, verificando que se absorba antes de seguir añadiendo.",
        },
        {
          question: "¿Por qué el punto de mojado se normaliza a 100 g de sólido en vez de reportarse directamente para la masa pesada (2,0 g)?",
          solution: "Para poder **comparar** el punto de mojado entre distintos sólidos y agentes humectantes de forma estandarizada, sin importar la masa exacta usada.",
        },
        {
          question: "¿Cuáles son los tres agentes humectantes de la actividad 2A, y cuánto se usa de cada uno?",
          solution: "**Propilenglicol** (0,4 g), **Span 20** (0,4 g) y **goma acacia** (0,4 g de una dispersión al 20 %).",
        },
        {
          question: "Escribe la fórmula del punto de mojado (PM) e indica qué representa.",
          solution: "PM = (mL de agua para humectar el sólido / masa de sólido en g) × 100 — **mL de agua que humectarían por completo 100 g** de ese sólido.",
        },
        {
          question: "Escribe la fórmula del % de reducción del punto de mojado y explica qué mide.",
          solution: "%Red PM = [(PM sin agente humectante − PM con agente humectante) / PM sin agente humectante] × 100. Mide **cuánto mejora** (reduce) el punto de mojado el agente — a mayor %, más efectivo.",
        },
        {
          question: "Si el punto de mojado del azufre solo es de 150 mL/100 g y con Span 20 baja a 90 mL/100 g, calcula el % de reducción del punto de mojado.",
          solution: "%Red PM = (150−90)/150 × 100 = **40 %**.",
        },
        {
          question: "En la actividad 2B, ¿qué se hace antes de pesar los 250 mg de sólido, y por qué?",
          solution: "Se **macera el sólido para homogenizar el tamaño de partícula** — así todas las muestras espolvoreadas tienen una distribución de tamaño comparable.",
        },
        {
          question: "¿Cómo se espolvorea el sólido sobre el líquido en la actividad 2B, y qué cuidado hay que tener con la probeta?",
          solution: "**Lenta y suavemente** sobre la superficie; **no golpear la probeta** (evita perturbar el proceso de penetración/flotación que se quiere observar).",
        },
        {
          question: "Explica la escala de clasificación 0–4 de la actividad 2B.",
          solution: "Clasifica según el **tiempo de penetración**: 0 = no penetra en 15 minutos, hasta 4 = penetra en 2–3 minutos (mayor número = penetración más rápida = mejor humectación).",
        },
        {
          question: "¿Qué significan las letras D, S y F al describir el comportamiento del sólido espolvoreado?",
          solution: "**D** = queda en dispersión (dentro del líquido). **S** = se va al fondo (sedimenta, se moja). **F** = queda en flotación (no se moja, permanece en superficie).",
        },
        {
          question: "Si un sólido espolvoreado sobre agua queda clasificado como \"F\" con puntaje 0, ¿qué indica sobre su humectabilidad?",
          solution: "Que es **muy hidrofóbico**: no logra ser mojado por el agua en absoluto durante los 15 minutos de observación, y permanece flotando.",
        },
        {
          question: "¿Cuál es la diferencia central entre lo que evalúa la actividad 2A y lo que evalúa la 2B?",
          solution: "2A cuantifica el **punto de mojado** añadiendo agua/aditivo AL sólido; 2B evalúa cualitativamente (0-4 + D/S/F) el comportamiento al espolvorear el sólido SOBRE el líquido (agua o solución de aditivo).",
        },
        {
          question: "En la actividad 2B, segunda parte, ¿a qué concentración se preparan las soluciones de aditivo (propilenglicol, Tween 80, goma acacia)?",
          solution: "Al **0,4 %**.",
        },
        {
          question: "¿Por qué en la 2B se usa Tween 80 como aditivo en vez de Span 20 (que sí se usa en la 2A)?",
          solution: "Porque en la 2B el aditivo se disuelve en la **fase acuosa**, y Tween 80 es hidrófilo (HLB alto, soluble en agua); Span 20 es más lipófilo (HLB bajo) y no serviría para preparar una solución acuosa de trabajo.",
        },
        {
          question: "¿Qué comparación permite hacer esta práctica sobre \"dónde\" se coloca el agente humectante (en el sólido vs. en el líquido)?",
          solution: "Si es más efectivo añadir el humectante **directamente al sólido** (2A) o **disolverlo en el líquido** en el que se dispersa el sólido (2B), para lograr mejor/más rápida humectación.",
        },
        {
          question: "Menciona el mecanismo de acción de cada tipo de agente usado: un tensioactivo (Span 20/Tween 80), un poliol (propilenglicol) y un hidrocoloide (goma acacia).",
          solution: "El **tensioactivo** reduce la tensión interfacial sólido-líquido (adsorción en la interfase). El **poliol** favorece la humectación por afinidad, sin actuar principalmente por reducción de tensión superficial. El **hidrocoloide** forma una película/dispersión viscosa alrededor de las partículas que facilita su incorporación al medio acuoso.",
        },
        {
          question: "¿Qué tabla de esta práctica recoge las propiedades fisicoquímicas de los tres sólidos (estructura, polaridad, solubilidad, ángulo de contacto…) que hay que investigar antes del ensayo?",
          solution: "La **Tabla 5**.",
        },
        {
          question: "Un sólido con ángulo de contacto pequeño frente al agua, ¿tendría un punto de mojado (PM) esperado alto o bajo, comparado con uno de ángulo de contacto grande?",
          solution: "**Bajo** (mejor humectación, se moja con menos agua) — ángulo de contacto pequeño indica buena afinidad por el agua, consistente con necesitar menos volumen para alcanzar el punto de mojado.",
        },
        {
          question: "¿Cuál es el fundamento fisicoquímico común detrás de las actividades 2A y 2B?",
          solution: "El comportamiento en la **interfase sólido-líquido**: qué tan fácil un líquido reemplaza al aire en la superficie de un sólido y se extiende sobre/dentro de él, gobernado por la tensión interfacial sólido-líquido y el efecto de agentes que la modifican.",
        },
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
      quizQuestions: [
        {
          question: "¿Qué mide el \"volumen de sedimentación\" (F) y cómo se calcula?",
          solution: "F = V_u / V_0, donde **V_u** es el volumen del sedimento (mL) y **V_0** es el volumen total del sistema (mL). Un F cercano a 1 (o mayor) indica un sedimento voluminoso, típico de un sistema bien floculado.",
        },
        {
          question: "¿Qué mide el \"grado de floculación\" (β) y cómo se calcula?",
          solution: "β = F / F_s, donde **F_s** es el volumen de sedimentación del patrón sin electrolito (blanco, BL). β > 1 indica que la muestra está más floculada que el blanco.",
        },
        {
          question: "¿Cuál es el sólido de trabajo de la actividad 3A, y por qué es relevante que tenga carga superficial?",
          solution: "**Subnitrato de bismuto (III)**. Su carga superficial determina cómo interactúa con electrolitos de distinta carga (floculación vs. dispersión), que es justo lo que evalúa la práctica.",
        },
        {
          question: "Nombra los tres electrolitos usados en la actividad 3A y sus concentraciones de trabajo.",
          solution: "**NaCl 0,3 %**, **AlCl₃ 0,1 %** y **Na₂HPO₄ 0,1 %**.",
        },
        {
          question: "¿Por qué antes de dispersar el sólido en agua se le añaden 2 mL de propilenglicol en el mortero?",
          solution: "Para **humectar previamente** el sólido (evitar que flote o forme grumos al contacto directo con el agua) antes de dispersarlo, facilitando una dispersión homogénea.",
        },
        {
          question: "¿Por qué es importante \"arrastrar TODO el material\" del mortero a la probeta con lavados sucesivos de agua desionizada?",
          solution: "Para **no perder sólido** en el mortero, lo cual alteraría la cantidad real de sólido disperso en cada muestra y falsearía los resultados entre muestras.",
        },
        {
          question: "¿Cuál es la muestra \"BL\" en la actividad 3A, y qué papel cumple en los cálculos?",
          solution: "Es el **blanco**: la muestra sin electrolito añadido. Sirve como patrón de referencia para calcular β de cada muestra (F_s = F del blanco).",
        },
        {
          question: "¿Qué tres cosas se observan y registran a los 15 minutos de reposo, en la Tabla 12?",
          solution: "El **volumen del sedimento** (mL), el **aspecto del sobrenadante** (turbio a translúcido) y si el sedimento es **compacto o suelto**.",
        },
        {
          question: "¿Cómo se evalúa la facilidad de redispersión del sedimento, paso a paso?",
          solution: "Se tapa la probeta con la mano, se invierte con un giro de **180°** y se regresa a su posición original; se repite las veces necesarias hasta redispersar todo el material, contando el **número de vueltas**.",
        },
        {
          question: "¿Cómo se mide el \"tiempo de sedimentación\" en esta práctica, y cómo se convierte en velocidad de sedimentación?",
          solution: "Se agita la muestra y se mide el tiempo que tarda el sólido en sedimentar un volumen fijo de **5 mL**; la velocidad de sedimentación es el inverso de ese tiempo (v_sed = 1/t).",
        },
        {
          question: "¿Qué tipo de electrolito (respecto a la carga del sólido) produce floculación, y por qué?",
          solution: "Uno de **carga opuesta** a la del sólido disperso. Reduce la repulsión electrostática entre partículas (baja el potencial zeta), permitiendo que se agreguen en flóculos laxos.",
        },
        {
          question: "¿Qué tipo de electrolito actúa como dispersante, y qué efecto tiene sobre el sedimento?",
          solution: "Uno de la **misma carga** que el sólido. Mantiene/refuerza la repulsión electrostática entre partículas, dando un sedimento **compacto y difícil de redispersar** (no floculado).",
        },
        {
          question: "En la actividad 3A, ¿en qué unidad se expresa el eje X de las gráficas de velocidad de sedimentación y de β, y por qué no en \"mL de electrolito añadido\"?",
          solution: "En **concentración final del electrolito en milimolar (mM)** — permite comparar electrolitos distintos (NaCl, AlCl₃, Na₂HPO₄) en una base común, ya que tienen distinta masa molar y valencia.",
        },
        {
          question: "¿Cuál es el sólido y el humectante A usados en la actividad 3B?",
          solution: "**Azufre** (sólido neutro, sin carga) humectado con **Aerosol OT** (tensioactivo aniónico).",
        },
        {
          question: "¿Cuál es el humectante B de la actividad 3B, y qué tipo de carga aporta?",
          solution: "**Cloruro de benzalconio**, un tensioactivo **catiónico**.",
        },
        {
          question: "¿Cuál es el propósito conceptual de la actividad 3B?",
          solution: "Demostrar que un sólido **neutro** puede adquirir carga superficial efectiva al humectarse con un tensioactivo cargado adsorbido en su superficie — \"**comunicación de carga**\" — y que esa carga adquirida determina su respuesta a los electrolitos, igual que un sólido con carga intrínseca.",
        },
        {
          question: "En la actividad 3B, ¿qué electrolitos se usan y a qué concentración?",
          solution: "**CaCl₂ al 2 %** y **Na₂HPO₄ al 2 %**.",
        },
        {
          question: "En la actividad 3B, las muestras A1 y B1 no reciben electrolito. ¿Qué función cumplen?",
          solution: "Son los **blancos de referencia** para cada humectante (A1 para Aerosol OT, B1 para cloruro de benzalconio), usados como patrón para calcular F y β de las muestras con electrolito del mismo grupo.",
        },
        {
          question: "Si el azufre humectado con Aerosol OT (aniónico) se trata con Na₂HPO₄ (anión fosfato, misma carga que el sólido \"cargado\"), ¿esperarías floculación o dispersión? ¿Por qué?",
          solution: "**Dispersión** — el electrolito tiene la misma carga (negativa) que la superficie comunicada por el Aerosol OT, así que refuerza la repulsión entre partículas en vez de neutralizarla.",
        },
        {
          question: "Y si ese mismo azufre (carga negativa comunicada por Aerosol OT) se trata con CaCl₂ (catión divalente Ca²⁺), ¿esperarías floculación o dispersión? ¿Por qué?",
          solution: "**Floculación** — el catión Ca²⁺, de carga opuesta a la superficie cargada negativamente, neutraliza/reduce la repulsión electrostática entre partículas, permitiendo que se agreguen.",
        },
        {
          question: "¿Qué ventaja práctica tiene \"comunicar carga\" a un sólido neutro usando un agente humectante con carga, al formular una suspensión?",
          solution: "Permite **controlar deliberadamente** el comportamiento de floculación/dispersión de un sólido que de otro modo no respondería a electrolitos (por no tener carga propia), dando control sobre la estabilidad física y la resuspendibilidad.",
        },
        {
          question: "¿Qué compara la Tabla 14 de esta práctica, y qué variables incluye?",
          solution: "Compara un sistema **no floculado**, uno **floculado** y uno **desfloculado**, en: apariencia del sobrenadante, aspecto del sedimento, velocidad de sedimentación, volumen de sedimento y facilidad para redispersar.",
        },
        {
          question: "Explica la diferencia entre un sistema \"floculado\" y uno \"desfloculado\" en velocidad de sedimentación y volumen de sedimento.",
          solution: "El **floculado** sedimenta rápido (partículas agregadas en flóculos grandes) pero deja un sedimento **voluminoso y suelto**, fácil de redispersar. El **desfloculado** sedimenta lento (partículas individuales), pero forma un sedimento **compacto y pequeño**, difícil de redispersar (apastelamiento).",
        },
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
