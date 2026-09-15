import type { SubjectContent } from "./_schema";

/**
 * Biofarmacia y Farmacocinética (UNAL) — desde el programa oficial 2-2026
 * (Código 2015647. Prof. Helber Barbosa y Yolima Baena).
 *
 * El curso se dicta en DOS BLOQUES con profesor y tema propios:
 *  - Biofarmacia (semanas 1–8, 27 ago–15 oct) — prof. Helber Barbosa. El
 *    programa solo trae el temario general (sin calendario semana a semana),
 *    así que los módulos 1–4 agrupan esos temas sin inventar fechas de clase.
 *  - Farmacocinética (semanas 9–16, 19 oct–14 dic) — prof. Yolima Baena. El
 *    programa SÍ trae el calendario clase por clase; los módulos 5–10 siguen
 *    ese calendario casi 1:1.
 * Requisitos: Fisioanatomía y Farmacotecnia I. Curso validable. Sin laboratorio.
 */
export const bfc: SubjectContent = {
  code: "BFC",
  slug: "bfc",
  name: "Biofarmacia y Farmacocinética",
  credits: "2",
  professors: ["Helber Barbosa", "Yolima Baena"],
  scheduleTheory: "Lunes y jueves · 4 h de trabajo presencial + 2 h de trabajo autónomo por semana",
  scheduleLab: "",
  totalClasses: 32,
  hasLab: false,

  // Curso teórico sin laboratorio, pero con fórmulas (farmacocinética):
  // se ocultan solo la pestaña de laboratorio.
  sections: ["modulos", "proyectos", "fechas", "glosario", "formulas", "bibliografia", "insumos", "prompt-ia"],

  descriptionSummary:
    "El curso suministra las **bases fundamentales en biofarmacéutica** y las **herramientas básicas en farmacocinética** para aplicarlas después en la clínica. Se dicta en **dos bloques**: Biofarmacia (27 ago–15 oct, prof. Helber Barbosa) y Farmacocinética (19 oct–14 dic, prof. Yolima Baena); la nota final pesa **50 % cada bloque**. Requisitos: **Fisioanatomía** y **Farmacotecnia I**. Asistencia mínima 90 %.",
  objectiveGeneral:
    "Al finalizar el curso el estudiante estará en capacidad de analizar la influencia del **ingrediente farmacéutico activo**, de los **excipientes**, de la **forma farmacéutica** y de la **vía de administración** en el proceso relacionado con el **LADME** (Liberación-Absorción-Distribución-Metabolismo-Eliminación), aplicándolo en la interpretación de los estudios relacionados con el desempeño del sistema *in vivo* en los campos biofarmacéuticos y farmacocinéticos, incluyendo los estudios de **bioequivalencia**.",
  objectivesSpecific: [
    "Ser capaz de interpretar de forma correcta la influencia que tiene el **sistema de entrega del activo** en la respuesta terapéutica, involucrando las etapas de la biofarmacéutica y la farmacocinética en el monitoreo clínico, las preparaciones extemporáneas y magistrales, y el diseño de medicamentos en general.",
    "Tener la capacidad de participar en el diseño de un **estudio de biodisponibilidad y bioequivalencia** e interpretar correctamente la información que de allí se derive.",
    "Estar en capacidad de hacer una correcta **selección y suministro de medicamentos** a nivel hospitalario.",
  ],

  modules: [
    // ── BLOQUE BIOFARMACIA (semanas 1–8) — Prof. Helber Barbosa ─────────────
    {
      slug: "introduccion-biofarmacia",
      title: "Módulo 1: Introducción a la Biofarmacia y Farmacocinética",
      description:
        "Competencias y responsabilidades del **químico farmacéutico** en el manejo, control y uso racional de los medicamentos. Conceptos y aspectos **históricos** de la Biofarmacia y la Farmacocinética y su campo de aplicación. Clasificación de los eventos que le ocurren al fármaco desde su administración hasta su acción (**LADME**: Liberación, Absorción, Distribución, Metabolismo, Eliminación).",
    },
    {
      slug: "parametros-bioequivalencia",
      title: "Módulo 2: Parámetros biofarmacéuticos y farmacocinéticos; bioequivalencia",
      description:
        "Parámetros **biofarmacéuticos, farmacocinéticos y farmacodinámicos**, y su importancia. Concepto de **bioequivalencia** y **biodisponibilidad**, y su relación con la eficacia del medicamento.",
    },
    {
      slug: "vias-dosis-regimen",
      title: "Módulo 3: Vías de administración, dosis y régimen de dosificación",
      description:
        "Clasificación de los **factores de entrada** que modifican la respuesta del fármaco. **Vías y métodos de administración** de los medicamentos. Importancia de la **dosis** y el **régimen de dosificación**.",
    },
    {
      slug: "senf-liberacion-disolucion",
      title: "Módulo 4: El SENF — liberación, disolución y disponibilidad del fármaco",
      description:
        "Clasificación de los factores que dependen de la **forma farmacéutica**. Factores que modifican la **liberación del fármaco a partir del SENF** (Sistema de Entrega del Fármaco) y que modifican la **solubilidad** y la **velocidad de disolución**. Efecto del SENF, los **auxiliares de formulación** y el **proceso de manufactura** sobre la disponibilidad del fármaco; posibles **interacciones con alimentos**.",
    },

    // ── BLOQUE FARMACOCINÉTICA (semanas 9–16) — Prof. Yolima Baena ──────────
    // Sigue el calendario clase por clase del programa oficial.
    {
      slug: "intro-farmacocinetica-ladme",
      title: "Módulo 5: Introducción a la farmacocinética — LADME y biodisponibilidad",
      description:
        "**Semana 9 (19 de octubre, lun).** Presentación del contenido general del curso, la modalidad en dos segmentos (Biofarmacia y Farmacocinética) y su interrelación. Detalle de cada etapa del **LADME**. Acción **local vs. sistémica**. **Biodisponibilidad**.\n\n**Semana 9 (22 de octubre, jue).** Parámetros biofarmacéuticos y farmacocinéticos; importancia de cada uno. Conceptos de **vida media (t1/2)**, **volumen de distribución**, **depuración (aclaramiento)** y **ABC** (área bajo la curva). Desarrollo de ejercicios.",
    },
    {
      slug: "modelos-pk-bolus-iv",
      title: "Módulo 6: Modelos farmacocinéticos y administración IV en bolus",
      description:
        "**Semana 10 (26 de octubre, lun).** Alcances de la farmacocinética; concepto de **modelo farmacocinético**, tipos de modelos e interpretación. Farmacocinética **lineal y no lineal**.\n\n**Semana 10 (29 de octubre, jue).** Estudio de los modelos de administración **IV en bolus único**. Desarrollo de ejercicios.",
    },
    {
      slug: "iv-multidosis-infusion",
      title: "Módulo 7: Administración IV multidosis e infusión continua",
      description:
        "**Semana 11 (5 de noviembre, jue).** Aclaración de dudas de los ejercicios de administración IV. Modelo de administración **IV multidosis**. Desarrollo de ejercicios.\n\n**Semana 12 (9 de noviembre, lun).** Aclaración de dudas. Administración **IV por infusión continua**: ventajas de este método y precauciones.\n\n**Semana 12 (12 de noviembre, jue).** Manejo de terapias combinando **bolus IV con infusión continua IV**. Ejercicios de aplicación.",
    },
    {
      slug: "absorcion-un-compartimento",
      title: "Módulo 8: Absorción extravascular — modelo de un compartimento",
      description:
        "**Semana 14 (23 de noviembre, lun).** Manejo de datos de niveles sanguíneos provenientes de vías de administración que requieren **absorción**. Desarrollo del modelo farmacocinético y matemático para un fármaco de **un solo compartimento**. Obtención de **K**, **Cmax**, **tmax** y **ABC**. Ejercicios de aplicación.\n\n**Semana 14 (26 de noviembre, jue).** Aclaración de dudas del tema anterior.\n\n*(Semana 13, 19 de noviembre: primera evaluación parcial — ver Fechas clave.)*",
    },
    {
      slug: "bioequivalencia-scb",
      title: "Módulo 9: Bioequivalencia, biodisponibilidad y clasificación biofarmacéutica",
      description:
        "**Semana 15 (30 de noviembre, lun).** Conceptos de **bioequivalencia**, medicamentos **equivalentes químicos**, **equivalentes farmacéuticos** y **alternativas farmacéuticas**. Biodisponibilidad y bioequivalencia: importancia, requisitos y tipos de estudio. Alternativas a los estudios *in vivo*: **bioexenciones** y el **Sistema de Clasificación Biofarmacéutica (SCB)**.\n\n**Semana 15 (3 de diciembre, jue).** Continuación del tema anterior.",
    },
    {
      slug: "normativa-talleres-finales",
      title: "Módulo 10: Normativa de bioequivalencia y talleres de aplicación",
      description:
        "**Semana 16 (7 de diciembre, lun).** **Normativa** de los estudios de biodisponibilidad y bioequivalencia.\n\n**Semana 16 (10 de diciembre, jue).** Talleres de aplicación.\n\n*(Semana 16, 14 de diciembre: segunda evaluación, acumulativa — ver Fechas clave.)*",
    },
  ],

  glossary: [
    { term: "LADME", moduleSlug: "introduccion-biofarmacia", definition: "Las cinco etapas por las que pasa un fármaco tras su administración: **L**iberación (desde la forma farmacéutica), **A**bsorción, **D**istribución, **M**etabolismo y **E**liminación." },
    { term: "Biofarmacia", moduleSlug: "introduccion-biofarmacia", definition: "Disciplina que estudia la relación entre las **propiedades fisicoquímicas** del fármaco y la forma farmacéutica, y su efecto sobre la **velocidad y magnitud** de la absorción sistémica." },
    { term: "Farmacocinética", moduleSlug: "introduccion-biofarmacia", definition: "Disciplina que estudia y cuantifica, en función del tiempo, los procesos de **absorción, distribución, metabolismo y eliminación** de un fármaco en el organismo." },
    { term: "Biodisponibilidad", moduleSlug: "parametros-bioequivalencia", definition: "**Velocidad y magnitud** con que el fármaco inalterado llega a la circulación sistémica y queda disponible en el sitio de acción." },
    { term: "Bioequivalencia", moduleSlug: "bioequivalencia-scb", definition: "Dos medicamentos son bioequivalentes cuando son **equivalentes farmacéuticos** (misma forma, dosis y vía) y sus biodisponibilidades, tras administrarlos en la misma dosis, son **similares en un grado tal** que sus efectos son esencialmente los mismos." },
    { term: "Equivalente farmacéutico", moduleSlug: "bioequivalencia-scb", definition: "Medicamentos con el **mismo principio activo, forma farmacéutica y dosis**, aunque puedan diferir en excipientes." },
    { term: "Alternativa farmacéutica", moduleSlug: "bioequivalencia-scb", definition: "Medicamentos con el **mismo principio activo** pero distinta forma farmacéutica, sal, éster o dosis." },
    { term: "SENF", moduleSlug: "senf-liberacion-disolucion", definition: "Sistema de Entrega del Fármaco: la forma farmacéutica y sus excipientes, en tanto **condicionan la liberación** del fármaco antes de que pueda absorberse." },
    { term: "Vida media de eliminación (t1/2)", moduleSlug: "intro-farmacocinetica-ladme", definition: "**Tiempo** que tarda la concentración plasmática del fármaco en reducirse a la **mitad**, una vez alcanzada la fase de eliminación." },
    { term: "Volumen de distribución (Vd)", moduleSlug: "intro-farmacocinetica-ladme", definition: "Volumen **aparente** en el que tendría que disolverse la dosis administrada para alcanzar la misma concentración que se observa en plasma. No corresponde a un volumen fisiológico real." },
    { term: "Aclaramiento / depuración (Cl)", moduleSlug: "intro-farmacocinetica-ladme", definition: "**Volumen de plasma** que queda completamente libre de fármaco por unidad de tiempo; mide la capacidad del organismo para eliminarlo." },
    { term: "Área bajo la curva (ABC / AUC)", moduleSlug: "intro-farmacocinetica-ladme", definition: "Integral de la curva de concentración plasmática vs. tiempo; proporcional a la **cantidad total de fármaco** que llega a la circulación sistémica." },
    { term: "Modelo compartimental", moduleSlug: "modelos-pk-bolus-iv", definition: "Simplificación matemática del organismo en uno o más **compartimentos homogéneos** donde el fármaco se distribuye instantáneamente, usada para describir su cinética." },
    { term: "Farmacocinética no lineal", moduleSlug: "modelos-pk-bolus-iv", definition: "Cinética en la que los parámetros (p. ej. el aclaramiento) **cambian con la dosis o la concentración**, típicamente porque algún proceso (metabolismo, transporte) se satura." },
    { term: "Estado estable (Css)", moduleSlug: "iv-multidosis-infusion", definition: "Condición en la que la **velocidad de entrada** del fármaco iguala a su **velocidad de eliminación**, y la concentración plasmática se mantiene constante (infusión) o sigue el mismo patrón cada dosis (multidosis)." },
    { term: "Factor de acumulación (R)", moduleSlug: "iv-multidosis-infusion", definition: "Cociente entre la concentración en estado estable y la concentración tras la **primera dosis**; indica cuánto se acumula el fármaco con dosis repetidas." },
    { term: "Constante de absorción (Ka)", moduleSlug: "absorcion-un-compartimento", definition: "Constante de velocidad de **primer orden** que describe qué tan rápido el fármaco pasa del sitio de administración a la circulación sistémica." },
    { term: "Cmax / tmax", moduleSlug: "absorcion-un-compartimento", definition: "**Cmax**: concentración plasmática máxima alcanzada tras una dosis extravascular. **tmax**: tiempo al que ocurre." },
    { term: "Sistema de Clasificación Biofarmacéutica (SCB)", moduleSlug: "bioequivalencia-scb", definition: "Clasifica los fármacos en 4 clases según su **solubilidad acuosa** y su **permeabilidad intestinal**; base científica para otorgar **bioexenciones** (eximir del estudio in vivo de bioequivalencia)." },
    { term: "Bioexención", moduleSlug: "bioequivalencia-scb", definition: "Autorización regulatoria para **no exigir** un estudio de bioequivalencia in vivo, sustentada en criterios biofarmacéuticos (p. ej. SCB) que predicen equivalencia." },
  ],

  formulas: [
    {
      name: "Concentración plasmática — IV bolus, un compartimento",
      expression: "C = C_{0} · e^{-K·t}",
      variables: "C = concentración en el tiempo t · C_{0} = concentración inicial (t = 0) · K = constante de eliminación · t = tiempo",
      description: "Describe el **decaimiento exponencial** de la concentración plasmática tras un bolus intravenoso, en un modelo de un compartimento.",
      moduleSlug: "modelos-pk-bolus-iv",
      derivation:
        "Se obtiene al integrar una ecuación de eliminación de **primer orden** (dC/dt = −K·C), donde la velocidad de eliminación es proporcional a la concentración presente. Es la base de todo el análisis de un fármaco IV que se comporta como un solo compartimento: si se grafica ln(C) vs. t se obtiene una recta de pendiente −K.\nC = concentración plasmática en el tiempo t — mg/L o µg/mL.\nC_{0} = concentración plasmática inmediatamente después del bolus (t = 0) — mg/L o µg/mL.\nK = constante de velocidad de eliminación de primer orden — h⁻¹ o min⁻¹.\nt = tiempo transcurrido desde la administración — h o min.",
    },
    {
      name: "Vida media de eliminación",
      expression: "t_{1/2} = #{0.693|K}",
      variables: "t_{1/2} = vida media de eliminación · K = constante de eliminación",
      description: "Tiempo que tarda la concentración plasmática en **reducirse a la mitad**.",
      moduleSlug: "intro-farmacocinetica-ladme",
      derivation:
        "Se despeja de C = C_{0}·e^{-Kt} imponiendo C = C_{0}/2: 0.693 es ln(2), la constante que resulta de ese despeje. Permite estimar en cuánto tiempo se elimina la mitad del fármaco, y por convención se asume que tras ~5 vidas medias el fármaco está prácticamente eliminado (o en estado estable, si se está infundiendo).\nt_{1/2} = vida media de eliminación — h o min.\nK = constante de velocidad de eliminación de primer orden — h⁻¹ o min⁻¹.",
    },
    {
      name: "Volumen de distribución (IV bolus)",
      expression: "Vd = #{Dosis|C_{0}}",
      variables: "Vd = volumen de distribución · Dosis = dosis administrada por vía IV · C_{0} = concentración plasmática inicial (t = 0)",
      description: "Volumen **aparente** en el que se distribuiría la dosis para producir la concentración inicial observada.",
      moduleSlug: "intro-farmacocinetica-ladme",
      derivation:
        "Es una relación de **proporcionalidad directa**: relaciona la cantidad total de fármaco administrado con la concentración que efectivamente se mide en plasma justo después del bolus. Un Vd grande (mayor que el volumen plasmático real) indica que el fármaco se distribuye ampliamente en tejidos; un Vd pequeño sugiere que se mantiene sobre todo en el compartimento vascular.\nVd = volumen de distribución — L o L/kg.\nDosis = cantidad de fármaco administrada por vía intravenosa — mg.\nC_{0} = concentración plasmática obtenida por extrapolación a t = 0 — mg/L.",
    },
    {
      name: "Aclaramiento (depuración) corporal total",
      expression: "Cl = K · Vd",
      variables: "Cl = aclaramiento (depuración) · K = constante de eliminación · Vd = volumen de distribución",
      description: "Volumen de plasma **depurado de fármaco por unidad de tiempo**; combina qué tan rápido se elimina (K) con en cuánto volumen se distribuye (Vd).",
      moduleSlug: "intro-farmacocinetica-ladme",
      derivation:
        "El aclaramiento resume, en un solo parámetro, la **capacidad eliminadora** del organismo (hepática + renal + otras vías), independiente de la dosis administrada. A diferencia de K y Vd —que dependen del modelo asumido— el aclaramiento es el parámetro farmacocinético más directamente relacionado con la fisiología del paciente, y el que más se usa para ajustar regímenes de dosificación.\nCl = aclaramiento corporal total — L/h o mL/min.\nK = constante de velocidad de eliminación de primer orden — h⁻¹.\nVd = volumen de distribución — L.",
    },
    {
      name: "Área bajo la curva (ABC) — IV bolus",
      expression: "ABC = #{Dosis|Cl}",
      variables: "ABC = área bajo la curva concentración-tiempo · Dosis = dosis administrada · Cl = aclaramiento",
      description: "Cuantifica la **exposición total** del organismo al fármaco tras una dosis IV; es proporcional a la cantidad de fármaco que llega a la circulación sistémica.",
      moduleSlug: "modelos-pk-bolus-iv",
      derivation:
        "Se deriva de integrar C = C_{0}·e^{-Kt} entre 0 e infinito, lo que da ABC = C_{0}/K; sustituyendo C_{0} = Dosis/Vd y Cl = K·Vd se llega a ABC = Dosis/Cl. Es la forma más directa de comparar la exposición sistémica entre formulaciones o vías —la base de los estudios de biodisponibilidad y bioequivalencia—.\nABC = área bajo la curva de concentración plasmática vs. tiempo — mg·h/L.\nDosis = dosis administrada por vía intravenosa — mg.\nCl = aclaramiento corporal total — L/h.",
    },
    {
      name: "Concentración en estado estable — infusión continua",
      expression: "C_{ss} = #{K_{0}|Cl}",
      variables: "C_{ss} = concentración en estado estable · K_{0} = velocidad de infusión (masa/tiempo) · Cl = aclaramiento",
      description: "Concentración plasmática constante que se alcanza cuando la **velocidad de entrada** del fármaco (infusión) iguala a su **velocidad de eliminación**.",
      moduleSlug: "iv-multidosis-infusion",
      derivation:
        "En estado estable, dC/dt = 0: la velocidad de infusión K_{0} (masa/tiempo) se iguala a la velocidad de eliminación (Cl·C_{ss}), y al despejar C_{ss} se obtiene esta relación. Se alcanza, en la práctica, tras aproximadamente 4–5 vidas medias de iniciada la infusión — de ahí la importancia de valorar si conviene usar una **dosis de carga** para alcanzarla antes.\nC_{ss} = concentración plasmática en estado estable — mg/L.\nK_{0} = velocidad de infusión (masa de fármaco por unidad de tiempo) — mg/h.\nCl = aclaramiento corporal total — L/h.",
    },
    {
      name: "Factor de acumulación — dosis múltiple IV",
      expression: "R = #{1|1 − e^{-K·τ}}",
      variables: "R = factor de acumulación · K = constante de eliminación · τ = intervalo entre dosis",
      description: "Indica **cuánto se acumula** el fármaco en estado estable respecto a la concentración lograda tras la primera dosis, en un esquema de dosis múltiple.",
      moduleSlug: "iv-multidosis-infusion",
      derivation:
        "Surge de sumar una serie geométrica: cada dosis se superpone al remanente de las anteriores (que decae como e^{-Kτ} en cada intervalo), y la suma de esa serie infinita converge a 1/(1 − e^{-Kτ}). Un τ pequeño frente a t_{1/2} da un R grande (mucha acumulación); un τ grande frente a t_{1/2} da un R cercano a 1 (poca acumulación).\nR = factor de acumulación — sin unidades.\nK = constante de velocidad de eliminación de primer orden — h⁻¹.\nτ = intervalo de tiempo entre dosis — h.",
    },
    {
      name: "Concentración plasmática — modelo de un compartimento extravascular",
      expression: "C = #{K_{a}·F·Dosis|Vd·(K_{a} − K)} · (e^{-K·t} − e^{-K_{a}·t})",
      variables: "C = concentración en el tiempo t · K_{a} = constante de absorción · F = biodisponibilidad (fracción absorbida) · Dosis = dosis administrada · Vd = volumen de distribución · K = constante de eliminación",
      description: "Describe la curva de concentración plasmática (subida y caída) de un fármaco administrado por una **vía que requiere absorción** (p. ej. oral), en un modelo de un compartimento.",
      moduleSlug: "absorcion-un-compartimento",
      derivation:
        "Combina dos procesos de primer orden que ocurren en paralelo: la **absorción** hacia la circulación (a velocidad K_{a}) y la **eliminación** desde ella (a velocidad K). El resultado es la diferencia de dos exponenciales: mientras predomina la absorción, la concentración sube; cuando la absorción se agota, predomina la eliminación y la concentración cae. Solo es válida cuando K_{a} ≠ K.\nC = concentración plasmática en el tiempo t — mg/L.\nK_{a} = constante de velocidad de absorción de primer orden — h⁻¹.\nF = fracción de la dosis que llega a la circulación sistémica sin alterar (biodisponibilidad) — sin unidades (0 a 1).\nDosis = dosis administrada — mg.\nVd = volumen de distribución — L.\nK = constante de velocidad de eliminación de primer orden — h⁻¹.",
    },
    {
      name: "Tiempo al pico (tmax) — extravascular",
      expression: "t_{max} = #{ln(K_{a}/K)|K_{a} − K}",
      variables: "t_{max} = tiempo al que ocurre la concentración máxima · K_{a} = constante de absorción · K = constante de eliminación",
      description: "Momento en que la concentración plasmática alcanza su **máximo** (Cmax), tras una dosis por una vía que requiere absorción.",
      moduleSlug: "absorcion-un-compartimento",
      derivation:
        "Se obtiene derivando la ecuación de C respecto a t e igualando a cero (el punto donde la velocidad de absorción iguala a la de eliminación, dC/dt = 0). Sustituir t_{max} de vuelta en la ecuación de C da el valor de C_{max}. Cuanto más rápida es la absorción frente a la eliminación (K_{a} ≫ K), más temprano ocurre t_{max}.\nt_{max} = tiempo al que se alcanza la concentración plasmática máxima — h.\nK_{a} = constante de velocidad de absorción de primer orden — h⁻¹.\nK = constante de velocidad de eliminación de primer orden — h⁻¹.",
    },
    {
      name: "Biodisponibilidad relativa",
      expression: "F(%) = #{ABC_{test}|ABC_{ref}} × #{Dosis_{ref}|Dosis_{test}} × 100",
      variables: "F = biodisponibilidad relativa (%) · ABC_{test}, ABC_{ref} = área bajo la curva del producto en estudio y del de referencia · Dosis_{test}, Dosis_{ref} = dosis administrada de cada uno",
      description: "Compara la **exposición sistémica** de un producto en estudio (p. ej. un genérico) frente a un producto de referencia; es el cálculo central de un estudio de **bioequivalencia**.",
      moduleSlug: "bioequivalencia-scb",
      derivation:
        "Como el ABC es proporcional a la cantidad de fármaco absorbido, comparar el ABC del producto en estudio frente al de referencia —corrigiendo por si las dosis administradas no fueron idénticas— da directamente la fracción relativa absorbida. Los estudios de bioequivalencia comparan además C_{max} y t_{max}, y exigen que los intervalos de confianza de estos cocientes caigan dentro de los márgenes regulatorios (típicamente 80–125 %) para declarar bioequivalencia.\nF = biodisponibilidad relativa del producto en estudio frente al de referencia — %.\nABC_{test} = área bajo la curva del producto en estudio — mg·h/L.\nABC_{ref} = área bajo la curva del producto de referencia — mg·h/L.\nDosis_{test}, Dosis_{ref} = dosis administrada de cada producto — mg.",
    },
  ],

  evaluation: [
    { name: "Primera evaluación — Biofarmacia (semana 4)", weight: 18 },
    { name: "Segunda evaluación — Biofarmacia (semana 8)", weight: 18 },
    { name: "Quices de control de lectura — Biofarmacia", weight: 14 },
    { name: "Primera evaluación — Farmacocinética (19 nov)", weight: 25 },
    { name: "Segunda evaluación — Farmacocinética, acumulativa (14 dic)", weight: 25 },
  ],

  keyDates: [
    { name: "Primera evaluación — Biofarmacia", weight: "18%", note: "Escrita. Semana 4 del bloque de Biofarmacia (prof. Helber Barbosa)." },
    { name: "Segunda evaluación — Biofarmacia", weight: "18%", note: "Escrita. Semana 8 del bloque de Biofarmacia." },
    { name: "Primera evaluación — Farmacocinética", weight: "25%", note: "Parcial. 19 de noviembre de 2026." },
    { name: "Segunda evaluación — Farmacocinética", weight: "25%", note: "Acumulativa. 14 de diciembre de 2026. Si se cumplen todos los talleres asignados y la asistencia completa (salvo excusa verificable), se suman +0,3 a la nota final de este bloque." },
  ],

  projects: [
    { title: "Quices de control de lectura de artículos — Biofarmacia", category: "Quiz" },
    { title: "Talleres de farmacocinética (uno por tema, retroalimentados en clase)", category: "Taller" },
  ],

  bibliography: [
    { kind: "libro", reference: "Shargel L. and Yu A.B.C. Applied Biopharmaceutics and Pharmacokinetics. Appleton & Lange. Seventh Edition, U.S.A. 2016." },
    { kind: "libro", reference: "Aguilar R. A. Biofarmacia y farmacocinética. Ejercicios y problemas resueltos. Segunda edición. Barcelona, España, 2014." },
    { kind: "libro", reference: "Edman P. Biopharmaceutical of Ocular Drugs Delivery. CRC Press. Boca Raton, 1993." },
    { kind: "libro", reference: "Bermejo M. y Amidon G.L. Modern Biopharmaceutics. 6th version, TSRL Inc., Michigan, U.S.A., 2003." },
    { kind: "libro", reference: "Dressman J. and Krämer J. Pharmaceutical Dissolution Testing. Taylor & Francis Group, USA, 2005." },
    { kind: "libro", reference: "Carcamo E. C. Introducción a la Farmacocinética. O.E.A. 1982." },
    { kind: "libro", reference: "Birkett D. J. Farmacocinética Fácil. Edición en español revisada por Alfonso Domínguez-Gil y María José García, Mc Graw-Hill-Interamericana, España, 2005." },
    { kind: "libro", reference: "Hedaya M. A. Basic Pharmacokinetics. CRC Press, Taylor and Francis Group. Boca Ratón, USA. 2007." },
    { kind: "libro", reference: "Hauschke D., Steinijans V. and Pigeot I. Bioequivalence Studies in Drug Development. Methods and Applications. John Wiley & Sons Ltd, The Atrium, England, 2007." },
    { kind: "libro", reference: "Ahmed T. A. Basic Pharmacokinetic: Concepts and Some Clinical Applications. IntechOpen, 2015." },
    { kind: "libro", reference: "Loftsson T. Essential Pharmacokinetics: A Primer for Pharmaceutical Scientists. Academic Press, USA, 2015." },
    { kind: "libro", reference: "Resolución 1124 de 2016, Ministerio de Salud. República de Colombia." },
    { kind: "revista", reference: "Barbosa H. y Zambrano P. Revisión crítica de las vías de administración de medicamentos desde un enfoque farmacéutico. Universidad Nacional de Colombia, Bogotá, D.C., Colombia, 2024.", url: "https://repositorio.unal.edu.co/handle/unal/87111" },
  ],
};
