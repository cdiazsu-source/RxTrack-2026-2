import type { SubjectContent } from "./_schema";

/**
 * Farmacología General (UNAL) — desde el programa oficial (Prof. Luis Fernando
 * Ospina Giraldo). Código 2015683. Sin componente de laboratorio.
 * Las fechas de parciales van en la app.
 */
export const fg: SubjectContent = {
  code: "FG",
  slug: "fg",
  name: "Farmacología General",
  credits: "3",
  professors: ["Luis Fernando Ospina Giraldo"],
  scheduleTheory: "Lunes 7:00–9:00, Miércoles 14:00–16:00",
  scheduleLab: "",
  totalClasses: 32,
  hasLab: false,
  descriptionSummary:
    "Conceptos **farmacológicos básicos** —farmacodinamia, farmacocinética y farmacología clínica— para el manejo y **uso racional** de las sustancias con actividad biológica, con aplicación a la farmacoterapia de los trastornos del **sistema nervioso central**.",
  objectiveGeneral:
    "Que el estudiante desarrolle habilidades para **aplicar de manera crítica y analítica** los conceptos farmacológicos básicos indispensables en el manejo y uso racional de las sustancias con actividad biológica, e integrarlos con las demás disciplinas del campo profesional.",
  objectivesSpecific: [
    "Comprender e integrar los aspectos farmacológicos básicos para **inferir y corregir interacciones** farmacológicas de importancia clínica.",
    "Caracterizar las sustancias según su **estructura química, sitio y mecanismo de acción y actividad farmacológica**, para participar en el diseño, la valoración biológica y la aplicación de nuevas moléculas activas.",
  ],

  // Curso teórico (clases magistrales, talleres, seminarios). Sin laboratorio.
  sections: ["modulos", "proyectos", "fechas", "glosario", "formulas", "bibliografia", "insumos", "prompt-ia"],

  modules: [
    {
      slug: "generalidades",
      title: "Módulo 1: Generalidades",
      description:
        "Contexto de la Farmacología en las Ciencias Biomédicas. **Definiciones y conceptos básicos** (fármaco, medicamento, principio activo, dosis). **Fuentes de información** sobre medicamentos. **Denominación** de los fármacos (DCI/INN, nombre químico, comercial).",
    },
    {
      slug: "farmacodinamia",
      title: "Módulo 2: Farmacodinamia",
      description:
        "Tipos de acción farmacológica. **Curvas dosis-respuesta** (concentración–efecto), potencia y eficacia. Dianas y mecanismos: **familias de receptores**, transducción de señales y **segundos mensajeros**, regulación de receptores. Mecanismos inespecíficos. **Interacciones** farmacológicas: incompatibilidades, interacciones farmacocinéticas y farmacodinámicas (sinergismo y antagonismo).",
    },
    {
      slug: "farmacocinetica-adme",
      title: "Módulo 3: Farmacocinética — procesos ADME",
      description:
        "Formas farmacéuticas y **vías de administración**. Procesos de **absorción y distribución** (barreras, unión a proteínas, volumen de distribución). Procesos de **biotransformación** (fases I y II, citocromo P450) y **eliminación** (renal, biliar). Factores que afectan los procesos ADME.",
    },
    {
      slug: "farmacologia-clinica",
      title: "Módulo 4: Principios de farmacología clínica",
      description:
        "**Variabilidad en la respuesta** farmacológica: distribución poblacional, factores genéticos, edad, idiosincrasias, estados fisiológicos y patológicos. **Reacciones adversas a los medicamentos (RAM)**: clasificación y concepto de **farmacovigilancia**. **Monitorización terapéutica** de fármacos y nociones de farmacoepidemiología.",
    },
    {
      slug: "investigacion-farmacologia",
      title: "Módulo 5: Introducción a la investigación en farmacología",
      description:
        "Proceso de **investigación de los medicamentos**: investigación preclínica (principios y métodos), el animal de experimentación como reactivo biológico, ética y **alternativas** en experimentación animal, ensayos de **screening**. **Ensayos clínicos**: fases de la evaluación clínica y principios éticos (**Declaración de Helsinki**).",
    },
    {
      slug: "snc-introduccion",
      title: "Módulo 6: Introducción a la farmacología del SNC",
      description:
        "La **neurotransmisión como diana farmacológica**. Mediadores químicos en el SNC (glutamato, GABA, dopamina, serotonina, noradrenalina, acetilcolina). **Clasificación** de los fármacos con acción central.",
    },
    {
      slug: "snc-farmacoterapia",
      title: "Módulo 7: Farmacología del SNC — farmacoterapia",
      description:
        "**Anestesia balanceada**. Tratamiento farmacológico del **dolor y la inflamación**. **Sedantes, hipnóticos y ansiolíticos**. **Antidepresivos** y **neurolépticos**. **Antiparkinsonianos**, **antiepilépticos** y tratamiento del **Alzheimer**. **Farmacodependencias** y abuso de fármacos.",
    },
    {
      slug: "aspectos-legales",
      title: "Módulo 8: Aspectos legales y comerciales del uso de medicamentos",
      description:
        "Evaluación farmacológica en el proceso de **registro sanitario**. **Productos fitoterapéuticos**: marco regulatorio y evidencia.",
    },
  ],

  glossary: [
    { term: "Farmacodinamia", moduleSlug: "farmacodinamia", definition: "Estudio de **qué le hace el fármaco al organismo**: sus efectos bioquímicos y fisiológicos y su mecanismo de acción." },
    { term: "Farmacocinética", moduleSlug: "farmacocinetica-adme", definition: "Estudio de **qué le hace el organismo al fármaco**: absorción, distribución, metabolismo y excreción (ADME) en función del tiempo." },
    { term: "Curva dosis-respuesta", moduleSlug: "farmacodinamia", definition: "Relación entre la dosis (o concentración) y la magnitud del efecto. Define la **potencia** (posición, DE₅₀) y la **eficacia** (efecto máximo)." },
    { term: "Agonista / antagonista", moduleSlug: "farmacodinamia", definition: "**Agonista**: se une al receptor y produce respuesta. **Antagonista**: se une pero no activa; bloquea la acción del agonista (competitivo o no competitivo)." },
    { term: "Segundos mensajeros", moduleSlug: "farmacodinamia", definition: "Moléculas intracelulares (AMPc, GMPc, IP₃, Ca²⁺, DAG) que amplifican y transmiten la señal iniciada por un receptor de membrana." },
    { term: "Sinergismo / antagonismo", moduleSlug: "farmacodinamia", definition: "**Sinergismo**: el efecto combinado supera la suma (potenciación). **Antagonismo**: un fármaco reduce o anula el efecto de otro." },
    { term: "Biotransformación (fases I y II)", moduleSlug: "farmacocinetica-adme", definition: "**Fase I**: reacciones de funcionalización (oxidación por citocromo P450, reducción, hidrólisis). **Fase II**: conjugación (glucuronidación, sulfatación) que aumenta la hidrosolubilidad para la excreción." },
    { term: "Volumen de distribución (Vd)", moduleSlug: "farmacocinetica-adme", definition: "Volumen aparente en el que se distribuiría el fármaco para alcanzar la concentración plasmática medida: Vd = dosis / C₀." },
    { term: "Reacción adversa (RAM)", moduleSlug: "farmacologia-clinica", definition: "Respuesta nociva y no intencionada a un medicamento en dosis usadas para profilaxis, diagnóstico o tratamiento. Se clasifican en tipo A (dosis-dependientes) y tipo B (idiosincrásicas), entre otras." },
    { term: "Farmacovigilancia", moduleSlug: "farmacologia-clinica", definition: "Actividades de detección, evaluación, comprensión y prevención de las RAM y otros problemas relacionados con medicamentos." },
    { term: "Índice terapéutico", moduleSlug: "farmacologia-clinica", definition: "Relación entre la dosis que produce toxicidad y la dosis eficaz (p. ej. DL₅₀/DE₅₀). Cuanto mayor, más seguro el margen del fármaco." },
    { term: "Ensayo clínico — fases", moduleSlug: "investigacion-farmacologia", definition: "**Fase I** (seguridad, voluntarios sanos), **Fase II** (eficacia y dosis, pacientes), **Fase III** (confirmación frente a estándar), **Fase IV** (farmacovigilancia poscomercialización)." },
  ],

  formulas: [
    {
      name: "Índice terapéutico",
      expression: "IT = #{DL_{50}|DE_{50}}",
      variables: "DL_{50} = dosis letal 50 · DE_{50} = dosis efectiva 50",
      description: "Estima el **margen de seguridad** de un fármaco: cuánto separa la dosis eficaz de la dosis tóxica.",
      moduleSlug: "farmacologia-clinica",
      derivation:
        "Se obtiene de dos curvas dosis-respuesta cuantales: una para el efecto terapéutico y otra para la toxicidad (o letalidad). El cociente de sus valores medianos indica cuántas veces hay que aumentar la dosis eficaz para llegar a la tóxica. Un IT alto (> 10) da un margen amplio; fármacos como digoxina o litio tienen IT bajo y requieren monitorización.\nIT = índice terapéutico — adimensional.\nDL_{50} = dosis que produce el efecto tóxico/letal en el 50 % de la población — mg/kg.\nDE_{50} = dosis que produce el efecto terapéutico en el 50 % — mg/kg.",
    },
    {
      name: "Volumen de distribución",
      expression: "V_{d} = #{Dosis|C_{0}}",
      variables: "C_{0} = concentración plasmática extrapolada a tiempo cero",
      description: "Parámetro que relaciona la cantidad de fármaco en el cuerpo con su concentración plasmática; orienta sobre su **distribución tisular**.",
      moduleSlug: "farmacocinetica-adme",
      derivation:
        "Es un volumen **aparente**, no fisiológico: el que haría falta para que toda la dosis administrada estuviera a la concentración plasmática medida. Valores bajos (~5 L) indican fármaco confinado al plasma; valores muy altos (cientos de L) indican gran fijación a tejidos.\nV_{d} = volumen aparente de distribución — L o L/kg.\nDosis = cantidad de fármaco en el organismo (dosis IV) — mg.\nC_{0} = concentración plasmática a tiempo cero — mg/L.",
    },
    {
      name: "Vida media de eliminación",
      expression: "t_{1/2} = #{0,693 · V_{d}|CL}",
      variables: "CL = aclaramiento (clearance) · V_{d} = volumen de distribución",
      description: "Tiempo que tarda la concentración plasmática en reducirse a la mitad; determina la **frecuencia de dosificación** y el tiempo hasta el estado estacionario (~4–5 t½).",
      moduleSlug: "farmacocinetica-adme",
      derivation:
        "Para una cinética de primer orden, la constante de eliminación es k = CL/V_{d}, y el tiempo para que C caiga a la mitad es ln(2)/k = 0,693·V_{d}/CL. Depende por igual del aclaramiento y del volumen de distribución.\nt_{1/2} = vida media de eliminación — h.\nV_{d} = volumen de distribución — L.\nCL = aclaramiento plasmático — L/h.",
    },
  ],

  evaluation: [
    { name: "1er Parcial (semana 4)", weight: 20 },
    { name: "2do Parcial (semana 8)", weight: 20 },
    { name: "3er Parcial (semana 12)", weight: 20 },
    { name: "Evaluación final (semana 16)", weight: 20 },
    { name: "Participación, talleres, quices y tareas", weight: 20 },
  ],

  keyDates: [
    { name: "1er Parcial", weight: "20%" },
    { name: "2do Parcial", weight: "20%" },
    { name: "3er Parcial", weight: "20%" },
    { name: "Evaluación final", weight: "20%" },
  ],

  projects: [
    { title: "Talleres de discusión", category: "Taller" },
    { title: "Seminario / exposición", category: "Seminario" },
  ],

  bibliography: [
    { kind: "libro", reference: "Brunton L., Chabner B.A., Knollmann B.C. (Ed.). Goodman & Gilman. Las Bases Farmacológicas de la Terapéutica. Vol. I y II. McGraw-Hill Interamericana. México. 2012." },
    { kind: "libro", reference: "Hilal-Dandan R., Brunton L. (Ed.). Goodman & Gilman Manual de Farmacología y Terapéutica. 2ª ed. McGraw-Hill Education. México. 2015." },
    { kind: "libro", reference: "Katzung B.G. (Ed.). Farmacología Básica y Clínica. 12ª ed. McGraw-Hill Interamericana. México. 2013. (y Katzung's Basic & Clinical Pharmacology, T.W. Vanderah, 2024)." },
    { kind: "libro", reference: "Flórez J., Armijo J.A., Mediavilla A. Farmacología Humana. 6ª ed. Elsevier Masson. Barcelona. 2014." },
    { kind: "libro", reference: "Rang & Dale. Farmacología. M. Dale. 9ª ed. Elsevier. 2020." },
    { kind: "libro", reference: "Isaza C.A., Machado J.E., Machado M.E. y col. Fundamentos de Farmacología en Terapéutica. 7ª ed. Celsus. Colombia. 2020." },
    { kind: "libro", reference: "Golan D.E. (Ed.). Principios de Farmacología: Bases Fisiopatológicas del Tratamiento Farmacológico. Lippincott Williams & Wilkins. España. 2012." },
    { kind: "libro", reference: "Declaración de Helsinki de la AMM. Res. 008430 de 1993 (Min. Salud, Colombia). Ley 84 de 1989 (protección animal)." },
    { kind: "revista", reference: "British Journal of Pharmacology" },
    { kind: "revista", reference: "European Journal of Pharmacology" },
    { kind: "revista", reference: "Trends in Pharmacological Sciences" },
    { kind: "revista", reference: "Annual Review of Pharmacology and Toxicology" },
  ],
};
