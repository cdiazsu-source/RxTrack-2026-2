import type { SubjectContent } from "./_schema";

/**
 * Salud Pública y Farmacia (UNAL) — desde el programa oficial 2026-II, Grupo 2
 * (Prof. Claudia Marcela Vargas Peláez). Código 2015677. Área: Farmacia
 * Asistencial. Sin laboratorio.
 *
 * Estructura: 6 módulos temáticos que cubren el "DISTRIBUCIÓN DE TEMAS" semanal.
 * Los 6 talleres grupales + el seminario final van como `keyDates` (la fecha la
 * pone la persona) y como `evaluation` (pesos que suman 100).
 */
export const spf: SubjectContent = {
  code: "SPF",
  slug: "spf",
  name: "Salud Pública y Farmacia",
  credits: "2",
  professors: ["Claudia Marcela Vargas Peláez"],
  scheduleTheory: "Lunes 16:00–19:00 · Salón 301, Edif. Aulas de Ciencias Gloria Galeano",
  scheduleLab: "",
  hasLab: false,
  // Clase única semanal (16 semanas, con 2–3 festivos). Asistencia mínima 95 %.
  totalClasses: 16,
  descriptionSummary:
    "Panorama amplio de la **problemática en salud** y de los **métodos cualitativos y cuantitativos** para analizarla, con énfasis en asuntos relacionados con **medicamentos**: determinantes de la salud, sistemas de salud y protección social, farmacia social, epidemiología y bioestadística, diseños de estudios, y políticas públicas y de medicamentos. Clases magistrales y seminarios de discusión de artículos.",
  objectiveGeneral:
    "Conocer de forma amplia la problemática en salud y los métodos y herramientas cualitativas y cuantitativas de análisis para resolverla, con énfasis en asuntos relacionados con medicamentos.",
  objectivesSpecific: [
    "Conocer los **determinantes en salud** y entender los asuntos políticos, sociales y económicos que determinan el contexto nacional e internacional de la salud, en especial en relación con el uso y las consecuencias del uso de los medicamentos.",
    "Conocer y aplicar los **principios y herramientas de la epidemiología y la bioestadística**, con ejemplos aplicados en farmacoterapia.",
    "Conocer los principios, conceptos y tendencias de los **sistemas de protección social y de los sistemas de salud**, y el lugar de los servicios farmacéuticos y los planes de beneficios.",
    "Conocer los elementos básicos de la **gestión de la salud pública**.",
    "Conocer y entender los procesos de **gestión de políticas públicas** y los principios de **economía de la salud**.",
    "Conocer los principios de **salud internacional** y las principales tendencias de la **salud global**, con énfasis en asuntos relacionados con el sector farmacéutico.",
  ],

  // Asignatura cualitativa + epidemiología (con algunas fórmulas: medidas de
  // frecuencia y de asociación). Sin laboratorio.
  sections: ["modulos", "proyectos", "fechas", "glosario", "formulas", "bibliografia", "insumos", "prompt-ia"],

  modules: [
    {
      slug: "intro-salud-publica",
      title: "Módulo 1: Introducción a la salud pública",
      description:
        "Presentación del curso e **introducción a la salud pública**. Conceptos y definición de salud; **determinantes** políticos, sociales y económicos de la salud (y su **determinación social**, Breilh); **modelos de atención en salud**. Marco para entender el contexto nacional e internacional del uso de medicamentos.\n\n*Semanas 1–2 · Taller 1 (13 %).*",
    },
    {
      slug: "sistemas-salud-proteccion-social",
      title: "Módulo 2: Sistemas de salud y protección social",
      description:
        "Principios, conceptos y tendencias de los **sistemas de protección social** y de los **sistemas de salud**. Análisis comparativo internacional (financiamiento, aseguramiento, prestación). El lugar de los **servicios farmacéuticos** y de los **planes de beneficios** dentro del sistema.\n\n*Semanas 3–4 · Taller 2 (13 %).*",
    },
    {
      slug: "farmacia-social",
      title: "Módulo 3: Farmacia social",
      description:
        "La farmacia como **práctica social**: uso y consecuencias del uso de los medicamentos en su contexto social, económico y político. **Acceso a medicamentos**, inequidades y **judicialización del acceso** (análisis comparativo latinoamericano).\n\n*Semana 5 · aporta al Taller 2 (13 %).*",
    },
    {
      slug: "epidemiologia-bioestadistica",
      title: "Módulo 4: Fundamentos de epidemiología y bioestadística",
      description:
        "Introducción a la **epidemiología**: conceptos básicos e **historia natural de la enfermedad** (niveles de prevención). **Medidas de frecuencia** (incidencia, prevalencia) y **medidas de asociación** (RR, OR). Estadística descriptiva e inferencial aplicada a **farmacoterapia**.\n\n*Semanas 7–8 y 10 · Taller 3 (14 %).*",
      exercises: [
        {
          question:
            "En una cohorte de **500 pacientes** libres de úlcera gástrica al inicio, seguidos 1 año, **40** desarrollaron úlcera mientras tomaban un AINE. Calcula la **incidencia acumulada** a 1 año.",
          solution:
            "Incidencia acumulada = casos nuevos ÷ población en riesgo al inicio = **40 / 500 = 0,08 = 8 %** en 1 año.\n\nInterpretación: 8 de cada 100 pacientes que empiezan el AINE desarrollan úlcera en el primer año (riesgo, no tasa).",
        },
        {
          question:
            "Un estudio reporta: incidencia de sangrado GI = **6 %** con el AINE y **2 %** con placebo. Calcula el **riesgo relativo (RR)**, la **reducción absoluta del riesgo (RAR)** que implicaría evitar el AINE y el **NNT** (número necesario a tratar para dañar).",
          solution:
            "RR = 0,06 / 0,02 = **3,0** → el AINE triplica el riesgo de sangrado.\n\nRAR (exceso de riesgo) = 0,06 − 0,02 = 0,04 = **4 %**.\n\nNND (número necesario para dañar) = 1 / RAR = 1 / 0,04 = **25**: por cada 25 pacientes tratados con el AINE (frente a placebo) se produce 1 sangrado GI adicional.",
        },
      ],
    },
    {
      slug: "disenos-estudios",
      title: "Módulo 5: Diseños de estudios epidemiológicos",
      description:
        "**Formulación de la pregunta** de investigación y clasificación de **diseños**. Estudios **descriptivos**; estudios **analíticos observacionales** (transversales, casos y controles, cohortes); estudios de **intervención** (ensayos clínicos). Introducción a la **investigación cualitativa** en salud y a la combinación de enfoques.\n\n*Semanas 9 y 12–15 · Talleres 4 (14 %), 5 (13 %) y 6 (13 %).*",
      exercises: [
        {
          question:
            "En un **estudio de casos y controles** sobre un evento adverso raro: entre **120 casos**, 90 habían usado el fármaco; entre **240 controles**, 60 lo habían usado. Calcula el **odds ratio (OR)** e interprétalo.",
          solution:
            "Tabla 2×2 — expuestos/no expuestos:\n\n| | Casos | Controles |\n|---|---|---|\n| Usó fármaco | a = 90 | b = 60 |\n| No usó | c = 30 | d = 180 |\n\nOR = (a·d) / (b·c) = (90 × 180) / (60 × 30) = 16 200 / 1 800 = **9,0**.\n\nInterpretación: la odds de haber usado el fármaco es **9 veces mayor** en los casos que en los controles; sugiere una asociación fuerte. En eventos raros el OR aproxima al RR.",
        },
        {
          question:
            "¿Qué diseño elegirías para estudiar la asociación entre un medicamento de **uso muy frecuente** y una malformación congénita **muy rara**, y por qué?",
          solution:
            "**Casos y controles.** Ventajas para este escenario: eficiente para desenlaces **raros** (se parte de los casos ya ocurridos), rápido y de bajo costo, permite estudiar varias exposiciones. Un estudio de cohortes exigiría seguir a un número enorme de embarazos para acumular pocos casos. Limitaciones a controlar: **sesgo de memoria** (recall) y selección adecuada de los controles.",
        },
      ],
    },
    {
      slug: "politicas-publicas-medicamentos",
      title: "Módulo 6: Políticas públicas y política farmacéutica",
      description:
        "Introducción a las **políticas públicas** y al **ciclo de la política** (agenda, formulación, decisión, implementación, evaluación). Principios de **economía de la salud**. **Política de medicamentos**: instrumentos, regulación de precios, selección y financiamiento. **Políticas de medicamentos en Colombia** y comparación internacional. Tendencias de la **salud global**. Cierre con la **presentación final** (seminario).\n\n*Semana 16 · Seminario final (20 %).*",
    },
  ],

  glossary: [
    { term: "Salud pública", moduleSlug: "intro-salud-publica", definition: "Conjunto organizado de acciones colectivas —del Estado y la sociedad— para promover la salud, prevenir la enfermedad y prolongar la vida de las poblaciones. Su objeto es la salud como fenómeno colectivo, no individual." },
    { term: "Determinantes sociales de la salud", moduleSlug: "intro-salud-publica", definition: "Circunstancias en que las personas nacen, crecen, viven, trabajan y envejecen (ingreso, educación, vivienda, empleo, entorno), y los sistemas que las moldean. Explican la mayor parte de las inequidades en salud." },
    { term: "Determinación social de la salud", moduleSlug: "intro-salud-publica", definition: "Enfoque (Breilh, salud colectiva) que va más allá de los 'factores': entiende la salud-enfermedad como producto de los modos de vida impuestos por la organización social y económica; herramienta de transformación." },
    { term: "Historia natural de la enfermedad", moduleSlug: "epidemiologia-bioestadistica", definition: "Curso de una enfermedad sin intervención, desde la exposición y el periodo prepatogénico hasta el desenlace. Fundamenta los niveles de prevención (primaria, secundaria, terciaria)." },
    { term: "Modelo de atención en salud", moduleSlug: "intro-salud-publica", definition: "Forma en que un sistema organiza la respuesta a las necesidades de salud: puerta de entrada, redes de servicios, rol de la atención primaria y de la especializada, y articulación con la comunidad." },
    { term: "Sistema de salud", moduleSlug: "sistemas-salud-proteccion-social", definition: "Conjunto de instituciones, recursos y personas cuya finalidad principal es mejorar la salud. Funciones: rectoría, financiamiento, generación de recursos y prestación de servicios." },
    { term: "Plan de beneficios", moduleSlug: "sistemas-salud-proteccion-social", definition: "Listado explícito de tecnologías y servicios (incluidos medicamentos) que un sistema garantiza a sus afiliados con cargo a los recursos públicos o del aseguramiento." },
    { term: "Protección social", moduleSlug: "sistemas-salud-proteccion-social", definition: "Políticas y programas para reducir la pobreza y la vulnerabilidad frente a riesgos (enfermedad, vejez, desempleo). La salud es uno de sus pilares junto con pensiones y riesgos laborales." },
    { term: "Farmacia social", moduleSlug: "farmacia-social", definition: "Campo que estudia el medicamento y la práctica farmacéutica en su contexto social, económico y político: acceso, uso, políticas, relación con pacientes y sistemas." },
    { term: "Judicialización del acceso a medicamentos", moduleSlug: "farmacia-social", definition: "Uso de acciones judiciales (en Colombia, la tutela) para obtener medicamentos no cubiertos o no entregados. Refleja fallas del sistema y plantea tensiones de equidad y sostenibilidad." },
    { term: "Epidemiología", moduleSlug: "epidemiologia-bioestadistica", definition: "Estudio de la distribución y los determinantes de los estados de salud en poblaciones, y aplicación de ese conocimiento al control de los problemas de salud." },
    { term: "Incidencia", moduleSlug: "epidemiologia-bioestadistica", definition: "Frecuencia de casos NUEVOS de una enfermedad en una población en riesgo durante un periodo. Mide el riesgo de enfermar (incidencia acumulada) o la velocidad de aparición (densidad de incidencia)." },
    { term: "Prevalencia", moduleSlug: "epidemiologia-bioestadistica", definition: "Proporción de una población que tiene la enfermedad en un momento (puntual) o periodo dado. Depende de la incidencia y de la duración de la enfermedad. No mide riesgo." },
    { term: "Riesgo relativo (RR)", moduleSlug: "epidemiologia-bioestadistica", definition: "Cociente entre la incidencia en los expuestos y la incidencia en los no expuestos. RR > 1: factor de riesgo; RR < 1: factor protector; RR = 1: sin asociación. Propio de cohortes y ensayos." },
    { term: "Odds ratio (OR)", moduleSlug: "disenos-estudios", definition: "Cociente de odds de exposición entre casos y controles (o de odds de enfermar entre expuestos y no expuestos). Medida de asociación de los estudios de casos y controles; aproxima al RR cuando la enfermedad es rara." },
    { term: "Sesgo", moduleSlug: "disenos-estudios", definition: "Error sistemático en el diseño, la conducción o el análisis que aleja la estimación del valor verdadero. Tipos frecuentes: de selección, de información (memoria, entrevistador) y de confusión." },
    { term: "Confusión (confounding)", moduleSlug: "disenos-estudios", definition: "Distorsión de la asociación entre exposición y desenlace por una tercera variable asociada a ambos y que no es un paso intermedio. Se controla por diseño (emparejamiento, aleatorización) o análisis (estratificación, modelos)." },
    { term: "Ensayo clínico aleatorizado (ECA)", moduleSlug: "disenos-estudios", definition: "Estudio experimental en el que la asignación a la intervención se hace al azar. La aleatorización y el enmascaramiento controlan confusión y sesgos; es el diseño de mayor validez interna para evaluar eficacia." },
    { term: "Investigación cualitativa", moduleSlug: "disenos-estudios", definition: "Estrategia para comprender significados, experiencias y procesos sociales (entrevistas, grupos focales, etnografía, análisis documental). Responde 'cómo' y 'por qué', no 'cuánto'." },
    { term: "Política pública", moduleSlug: "politicas-publicas-medicamentos", definition: "Curso de acción (o inacción) del Estado frente a un problema socialmente relevante, con objetivos, instrumentos y recursos. Se analiza por etapas: agenda, formulación, decisión, implementación y evaluación." },
    { term: "Política farmacéutica / de medicamentos", moduleSlug: "politicas-publicas-medicamentos", definition: "Marco de objetivos e instrumentos del Estado para garantizar acceso equitativo a medicamentos eficaces, seguros y de calidad, y su uso racional: selección, financiamiento, regulación de precios, calidad y farmacovigilancia." },
    { term: "Economía de la salud", moduleSlug: "politicas-publicas-medicamentos", definition: "Aplicación de la teoría económica a la salud y la atención sanitaria: escasez y asignación de recursos, evaluación económica (costo-efectividad, costo-utilidad) y financiamiento." },
    { term: "Salud global", moduleSlug: "politicas-publicas-medicamentos", definition: "Área de estudio, investigación y práctica que prioriza la mejora de la salud y la equidad en salud para todas las personas a escala mundial, trascendiendo fronteras nacionales." },
  ],

  formulas: [
    {
      name: "Incidencia acumulada (riesgo)",
      expression: "IA = #{casos nuevos en el periodo|población en riesgo al inicio}",
      variables: "IA = incidencia acumulada (proporción, 0–1 o %) · periodo de seguimiento fijo",
      description: "Probabilidad de que un individuo **libre de la enfermedad** la desarrolle durante un periodo definido. Es un **riesgo**: adimensional, entre 0 y 1.",
      moduleSlug: "epidemiologia-bioestadistica",
      derivation:
        "Se calcula sobre una **cohorte cerrada** seguida durante todo el periodo. Supone que todos los individuos en riesgo son seguidos el tiempo completo (o que las pérdidas son despreciables); si hay pérdidas o tiempos de seguimiento distintos, se prefiere la densidad de incidencia.\ncasos nuevos = personas que pasan de sanas a enfermas en el periodo.\npoblación en riesgo al inicio = personas susceptibles al comienzo (se excluye a quienes ya tienen la enfermedad).",
    },
    {
      name: "Densidad de incidencia (tasa)",
      expression: "DI = #{casos nuevos|Σ tiempo-persona en riesgo}",
      variables: "DI = tasa de incidencia (casos por persona-tiempo, p. ej. por 1 000 personas-año) · tiempo-persona = suma de los tiempos que cada individuo permanece en riesgo",
      description: "Velocidad de aparición de casos nuevos por unidad de **tiempo-persona**. Útil cuando el seguimiento es variable o hay entradas y salidas.",
      moduleSlug: "epidemiologia-bioestadistica",
      derivation:
        "Cada individuo aporta tiempo-persona solo mientras está en riesgo (hasta enfermar, morir, perderse o terminar el estudio). No está acotada entre 0 y 1: tiene unidades (1/tiempo).\ncasos nuevos = numerador, igual que en la incidencia acumulada.\nΣ tiempo-persona = denominador; 100 personas seguidas 2 años = 200 personas-año.",
    },
    {
      name: "Prevalencia puntual",
      expression: "P = #{casos existentes en el momento t|población total en el momento t}",
      variables: "P = prevalencia (proporción, 0–1 o %) · incluye casos nuevos y antiguos",
      description: "Proporción de la población que **tiene** la enfermedad en un instante dado. No mide riesgo; sirve para planear servicios y recursos.",
      moduleSlug: "epidemiologia-bioestadistica",
      derivation:
        "Relación aproximada en estado estacionario: **P ≈ Incidencia × duración media** de la enfermedad. Por eso una enfermedad muy incidente pero de curso corto (p. ej. una infección aguda) puede tener baja prevalencia, y una poco incidente pero crónica, alta prevalencia.\ncasos existentes = todos los enfermos en t (prevalentes).\npoblación total = todos los individuos evaluados en t.",
    },
    {
      name: "Riesgo relativo (RR) y reducción del riesgo",
      expression: "RR = #{I_{expuestos}|I_{no expuestos}}\nRAR = I_{control} − I_{tratado}\nRRR = #{RAR|I_{control}}",
      variables: "I = incidencia (riesgo) en cada grupo · RAR = reducción absoluta del riesgo · RRR = reducción relativa del riesgo",
      description: "**RR** compara el riesgo entre expuestos y no expuestos (cohortes, ensayos). En un ensayo de una intervención protectora, la **RAR** y la **RRR** resumen el beneficio.",
      moduleSlug: "epidemiologia-bioestadistica",
      derivation:
        "RR > 1: la exposición aumenta el riesgo; RR < 1: lo disminuye; RR = 1: sin efecto. La **RRR** (p. ej. 'reduce el riesgo un 30 %') impresiona más que la **RAR** pero puede ser engañosa si el riesgo basal es bajo; por eso se reporta también el NNT.\nI_{expuestos}, I_{no expuestos} = incidencias en cada grupo.\nI_{control}, I_{tratado} = incidencias del evento en el grupo control y en el intervenido.",
    },
    {
      name: "Odds ratio (OR) — tabla 2×2",
      expression: "OR = #{a·d|b·c}",
      variables: "a = casos expuestos · b = controles expuestos · c = casos no expuestos · d = controles no expuestos",
      description: "Medida de asociación de los **estudios de casos y controles**, donde no se puede calcular incidencia. Cuando la enfermedad es **rara**, OR ≈ RR.",
      moduleSlug: "disenos-estudios",
      derivation:
        "Se organiza la información en una tabla 2×2 (exposición en filas, condición caso/control en columnas). OR = odds de exposición en casos ÷ odds de exposición en controles = (a/c)/(b/d) = a·d / (b·c). Un intervalo de confianza del 95 % que **no incluye el 1** indica asociación estadísticamente significativa.\na, b, c, d = frecuencias de cada celda de la tabla 2×2.",
    },
    {
      name: "Número necesario a tratar (NNT) / para dañar (NND)",
      expression: "NNT = #{1|RAR}",
      variables: "RAR = |I_{control} − I_{tratado}| = reducción (o aumento) absoluto del riesgo, en proporción",
      description: "Número de pacientes que hay que tratar durante el periodo del estudio para **evitar un evento** (NNT) o para **causar uno adicional** (NND, si la intervención es dañina). Traduce el efecto a términos clínicos.",
      moduleSlug: "epidemiologia-bioestadistica",
      derivation:
        "Es el inverso de la reducción absoluta del riesgo. Se redondea siempre hacia arriba. Depende del **riesgo basal**: la misma RRR da un NNT bajo (mejor) en pacientes de alto riesgo y alto (peor) en pacientes de bajo riesgo. Debe acompañarse del horizonte temporal ('NNT = 25 a 1 año').\nRAR = diferencia absoluta de incidencias entre los dos grupos (en proporción, no en %).",
    },
  ],

  evaluation: [
    { name: "Taller 1 — Introducción a la salud pública / sistemas de salud", weight: 13 },
    { name: "Taller 2 — Sistemas comparados / farmacia social", weight: 13 },
    { name: "Taller 3 — Introducción a la epidemiología", weight: 14 },
    { name: "Taller 4 — Diseños de estudios / medidas de frecuencia", weight: 14 },
    { name: "Taller 5 — Diseños analíticos / estudios observacionales", weight: 13 },
    { name: "Taller 6 — Estudios de intervención / cualitativos", weight: 13 },
    { name: "Seminario final (oral)", weight: 20 },
  ],

  keyDates: [
    { name: "Taller 1 (escrito)", weight: "13%", note: "18 de septiembre" },
    { name: "Taller 2 (escrito)", weight: "13%", note: "2 de octubre" },
    { name: "Festivo — sin clase", weight: null, note: "5 de octubre (semana 6)" },
    { name: "Taller 3 (escrito)", weight: "14%", note: "16 de octubre" },
    { name: "Taller 4 (escrito)", weight: "14%", note: "6 de noviembre" },
    { name: "Festivo — sin clase", weight: null, note: "9 de noviembre (semana 11)" },
    { name: "Taller 5 (escrito)", weight: "13%", note: "20 de noviembre" },
    { name: "Taller 6 (escrito)", weight: "13%", note: "4 de diciembre" },
    { name: "Festivo — sin clase", weight: null, note: "cerca del 7–8 de diciembre (semana 15)" },
    { name: "Seminario final (oral) + presentación final", weight: "20%", note: "14 de diciembre" },
  ],

  projects: [
    { title: "Talleres grupales", category: "Taller" },
    { title: "Seminario final", category: "Seminario" },
  ],

  bibliography: [
    { kind: "libro", moduleSlug: "intro-salud-publica", reference: "Durán Romero M., Trujillo Trujillo J., Blanco Becerra L., Bernal Parra L., Sabogal C., Torres M. (2025). Manual práctico de salud pública. Conceptos esenciales. Sello Editorial UNAD. — Capítulo 1: Salud Pública y Definiciones Clave.", url: "https://doi.org/10.22490/UNAD.9786287786424" },
    { kind: "revista", moduleSlug: "intro-salud-publica", reference: "Breilh J. La determinación social de la salud como herramienta de transformación hacia una nueva salud pública (salud colectiva). Rev. Fac. Nac. Salud Pública. 2013;31(supl 1):S13–S27." },
    { kind: "libro", moduleSlug: "sistemas-salud-proteccion-social", reference: "Artaza Barrios et al. Reformas y Financiamiento de Sistemas y Servicios de Salud en la Subregión Andina. Lima: Organismo Andino en Salud–Convenio Hipólito Unanue; set. 2004. pp. 80–99." },
    { kind: "revista", moduleSlug: "farmacia-social", reference: "Vargas-Peláez C.M., Rover M.R.M., Soares L., Blatt C.R., Mantel-Teeuwisse A.K., Rossi F.A. et al. Judicialization of access to medicines in four Latin American countries: a comparative qualitative analysis. Int J Equity Health. 2019;18(1):68." },
    { kind: "revista", moduleSlug: "epidemiologia-bioestadistica", reference: "Ferrer F., Enrique M., del Prado González N. Medidas de frecuencia y de asociación en epidemiología clínica. An Pediatr Contin. 2013;11(6):346–9." },
    { kind: "revista", moduleSlug: "epidemiologia-bioestadistica", reference: "Loboa N.J., Morales D.F. Perfil de orientación al suicidio en adolescentes escolarizados, Villahermosa – Tolima, 2013. Rev Fac Nac Salud Pública. 2015;34(1).", url: "http://aprendeenlinea.udea.edu.co/revistas/index.php/fnsp/article/view/19885" },
    { kind: "revista", moduleSlug: "disenos-estudios", reference: "Martín J.L.R., Seoane T., Martín-Sánchez E., Alonso Moreno F.J., Sainz-Pardo M. Capítulo 1: Formulación de la pregunta de investigación. SEMERGEN. 2007;33(3):149–53." },
    { kind: "revista", moduleSlug: "disenos-estudios", reference: "Martínez García L. Tipos de diseño de investigación. Curso de introducción a la metodología de la investigación (II); 2011. Centro Cochrane Iberoamericano.", url: "http://www.cochrane.es/files/TipoDisenInvestigacion_0.pdf" },
    { kind: "libro", moduleSlug: "disenos-estudios", reference: "Minayo M.C. de S. O Desafio Do Conhecimento: Pesquisa Qualitativa Em Saúde. 2ª ed. São Paulo: Hucitec; 1993." },
    { kind: "revista", moduleSlug: "epidemiologia-bioestadistica", reference: "Mondin T.C., Cardoso T. de A., Jansen K., Konradt C.E., Zaltron R.F., Behenck M. de O. et al. Sexual violence, mood disorders and suicide risk: a population-based study. Ciênc Saúde Coletiva. 2016;21(3):853–60." },
    { kind: "revista", moduleSlug: "disenos-estudios", reference: "Pita Fernández S., Pértegas Díaz S. Investigación cuantitativa y cualitativa. Cad Aten Primaria. 2002;9:76–8." },
    { kind: "revista", moduleSlug: "disenos-estudios", reference: "Seoane T., Martín-Sánchez E., Martín J.L.R., Lurueña-Segovia S., Alonso Moreno F.J. Capítulo 3: La investigación a partir de la observación. Estudios descriptivos. Estudios analíticos. SEMERGEN. 2007;33(5):250–6." },
    { kind: "revista", moduleSlug: "epidemiologia-bioestadistica", reference: "Seoane T., Martín J.L.R., Martín-Sánchez E., Lurueña-Segovia S., Alonso Moreno F.J. Capítulo 7: Estadística: Estadística Descriptiva y Estadística Inferencial. SEMERGEN. 2007;33(9):466–71." },
    { kind: "libro", moduleSlug: "disenos-estudios", reference: "Universitat de València. Diseño de la investigación. Investigación en salud infantil. 2005.", url: "http://www.uv.es/invsalud/invsalud/disenyo-principal.htm" },
    { kind: "libro", moduleSlug: "politicas-publicas-medicamentos", reference: "Torres D., Torres H. Entre políticas gubernamentales y políticas públicas: análisis del ciclo de las políticas de desarrollo del gobierno del Estado de Michoacán, México, 2003–2010. INAP; 2012. Capítulo II." },
    { kind: "revista", moduleSlug: "politicas-publicas-medicamentos", reference: "Salm M., Ali M., Minihane M., Conrad P. Defining global health: findings from a systematic review and thematic analysis of the literature. BMJ Glob Health. 2021;6(6):e005292.", url: "https://doi.org/10.1136/bmjgh-2021-005292" },
  ],
};
