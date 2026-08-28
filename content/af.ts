import type { SubjectContent } from "./_schema";

/**
 * Administración Farmacéutica (UNAL) — desde el programa oficial
 * (Prof. Zoraya Camelo Barreto y Jesús Becerra Camargo). Código 2015672.
 * Curso crítico-social, sin laboratorio ni fórmulas: la pestaña "Fórmulas"
 * se oculta (ver `sections`).
 */
export const af: SubjectContent = {
  code: "AF",
  slug: "af",
  name: "Administración Farmacéutica",
  credits: "2",
  professors: ["Zoraya Camelo Barreto", "Jesús Becerra Camargo"],
  scheduleTheory: "Jueves 14:00–16:00 (Salón 307)",
  scheduleLab: "",
  totalClasses: 16,
  hasLab: false,
  descriptionSummary:
    "La administración como **práctica social, ética y política** —no como un conjunto de técnicas de eficiencia—. Mirada crítica sobre las organizaciones farmacéuticas públicas y privadas, sus **relaciones de poder** y su impacto en la sociedad y el territorio, orientadas al **bien común, la equidad y la sostenibilidad**.",
  objectiveGeneral:
    "Comprender la administración como una **práctica social, ética y política**, desarrollando una mirada crítica sobre las organizaciones farmacéuticas públicas y privadas y sus impactos en la sociedad, que deben estar orientados al bien común, la equidad y la sostenibilidad. El curso no enseña a administrar, sino a **administrar con comprensión, responsabilidad y sentido social**.",
  objectivesSpecific: [
    "Introducir los conceptos básicos de **economía, administración y teoría económica** necesarios para comprender las organizaciones.",
    "Comprender el **proceso administrativo clásico** (planeación, organización, dirección y control) y sus aplicaciones.",
    "Analizar el **circuito económico** y las relaciones entre producción, distribución, intercambio y consumo.",
    "Identificar **dilemas éticos** asociados a las decisiones administrativas en los entornos farmacéuticos.",
  ],

  // Curso crítico-social: sin fórmulas y sin laboratorio.
  sections: ["modulos", "proyectos", "fechas", "glosario", "bibliografia", "insumos", "prompt-ia"],

  modules: [
    {
      slug: "economia-teoria-economica",
      title: "Módulo 1: Economía y teoría económica",
      description:
        "Objeto de estudio de la administración y la economía. **Agentes y circuito económico**; bienes y servicios. **Sistemas económicos**: capitalista, planificada, mixta, tradicional, keynesiana; liberalismo radical. Enfoques de la administración: **Taylor, Fayol, Weber** y sus críticas.",
    },
    {
      slug: "planeacion",
      title: "Módulo 2: Planeación",
      description:
        "Concepto, importancia y proceso de la **planeación**. Tipos de planes. **Análisis FODA**. Planeación **estratégica** y planeación **social**.",
    },
    {
      slug: "organizacion",
      title: "Módulo 3: Organización",
      description:
        "Concepto y principios. **Estructuras organizacionales**, división del trabajo y coordinación. **Poder y distribución de autoridad**, delegación. Administración en un mundo globalizado. Componentes de la **gestión de Recursos Humanos**: selección, diseño del puesto, entrevistas, pruebas.",
    },
    {
      slug: "direccion",
      title: "Módulo 4: Dirección",
      description:
        "Concepto de dirección y **habilidades de un director**: liderar, comunicar, motivar y trabajar en equipo.",
    },
    {
      slug: "control",
      title: "Módulo 5: Control",
      description:
        "Importancia del **control** en la organización. **Ciclo del control**. El control para los farmacéuticos.",
    },
    {
      slug: "mercado-estado-bienestar",
      title: "Módulo 6: Economía del bienestar, mercado y Estado",
      description:
        "**Economía del bienestar**. Mercado, Estado y organizaciones. **Fallas del mercado** y acción colectiva. El papel de los medicamentos en la producción, el mercado y el consumo: desigualdades y oportunidades.",
    },
    {
      slug: "trabajo-valor-limites",
      title: "Módulo 7: Trabajo, valor y límites del crecimiento",
      description:
        "**Trabajo, salario y recompensas**; productividad y valor. **Crecimiento económico y sus límites**: impactos sociales y ambientales. El control y el poder. Reflexión sobre lo humano y la conciencia en las decisiones organizacionales.",
    },
  ],

  glossary: [
    { term: "Circuito económico", moduleSlug: "economia-teoria-economica", definition: "Representación del flujo de bienes, servicios, factores productivos y dinero entre los **agentes económicos** (hogares, empresas, Estado, sector externo)." },
    { term: "Sistemas económicos", moduleSlug: "economia-teoria-economica", definition: "Formas de organizar la producción y distribución de recursos: **capitalista** (mercado), **planificada** (Estado), **mixta**, **tradicional**. Difieren en quién decide qué, cómo y para quién producir." },
    { term: "Proceso administrativo", moduleSlug: "planeacion", definition: "Secuencia clásica de funciones de la administración: **planeación, organización, dirección y control**." },
    { term: "Análisis FODA", moduleSlug: "planeacion", definition: "Herramienta de diagnóstico que cruza factores internos (**F**ortalezas y **D**ebilidades) con externos (**O**portunidades y **A**menazas) para orientar la estrategia." },
    { term: "Planeación estratégica", moduleSlug: "planeacion", definition: "Proceso de definir la misión, los objetivos de largo plazo y las acciones para alcanzarlos, considerando el entorno. La **planeación social** añade el enfoque en el bien común y la participación." },
    { term: "Estructura organizacional", moduleSlug: "organizacion", definition: "Forma en que se divide, agrupa y coordina el trabajo: define jerarquías, áreas funcionales, líneas de autoridad y comunicación." },
    { term: "Delegación de autoridad", moduleSlug: "organizacion", definition: "Transferencia de autoridad formal y responsabilidad de un superior a un subordinado para ejecutar tareas específicas, conservando el superior la responsabilidad última." },
    { term: "Ciclo del control", moduleSlug: "control", definition: "Establecer estándares → medir el desempeño → comparar con el estándar → tomar acciones correctivas. Retroalimenta la planeación." },
    { term: "Fallas del mercado", moduleSlug: "mercado-estado-bienestar", definition: "Situaciones en que el mercado no asigna eficientemente los recursos: externalidades, bienes públicos, información asimétrica, poder de mercado. Justifican la intervención del Estado." },
    { term: "Economía del bienestar", moduleSlug: "mercado-estado-bienestar", definition: "Rama que evalúa las asignaciones económicas según su efecto en el bienestar social, la equidad y la eficiencia (óptimo de Pareto, funciones de bienestar social)." },
    { term: "Acción colectiva", moduleSlug: "mercado-estado-bienestar", definition: "Acción coordinada de un grupo para lograr un objetivo común; enfrenta el problema del **free-rider** cuando el beneficio es un bien público." },
  ],

  evaluation: [
    { name: "Examen final", weight: 40 },
    { name: "Talleres individuales", weight: 20 },
    { name: "Talleres grupales", weight: 20 },
    { name: "Quices", weight: 20 },
  ],

  keyDates: [
    { name: "Examen final", weight: "40%" },
    { name: "Entrega talleres grupales", weight: "20%" },
  ],

  projects: [
    { title: "Análisis de casos (grupal)", category: "Caso" },
    { title: "Talleres de aplicación conceptual", category: "Taller" },
  ],

  bibliography: [
    { kind: "libro", reference: "Chiavenato I. Introducción a la teoría general de la administración. 7ª ed. McGraw-Hill Interamericana. 2004." },
    { kind: "libro", reference: "Stoner J.F., Freeman R.E., Gilbert D.R. Administración. 6ª ed. Pearson Educación. 1996." },
    { kind: "libro", reference: "Hitt M., Black J.S., Porter L.W. Administración. 6ª ed. Pearson Educación. 2006." },
    { kind: "libro", reference: "Koontz H., Weihrich H., Cannice M. Administración: una perspectiva global y empresarial. 14ª ed. McGraw-Hill Interamericana. 2012." },
    { kind: "libro", reference: "Robbins S.P., Coulter M. Administración. 10ª ed. Pearson Educación. 2010." },
    { kind: "libro", reference: "D. Mura J. Administración: una aproximación íntegra al diseño organizacional. 2015." },
    { kind: "libro", reference: "Castillo Clavero A. y col. Casos prácticos de Administración y Dirección de Empresas. Ed. Pirámide. 2007." },
  ],
};
