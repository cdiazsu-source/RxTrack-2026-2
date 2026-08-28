import type { SubjectContent } from "./_schema";

/**
 * Farmacia Química II (UNAL) — desde el programa oficial (Prof. Maritza Rojas
 * Cardozo, Norma Valencia Islas, Edward Suesca). Código 2015658.
 * Química farmacéutica / relación estructura–actividad. Sin laboratorio.
 */
export const fq2: SubjectContent = {
  code: "FQ2",
  slug: "fq2",
  name: "Farmacia Química 2",
  credits: "2",
  professors: ["Maritza Adelina Rojas Cardozo", "Norma Angélica Valencia Islas", "Edward Suesca"],
  scheduleTheory: "3 horas semanales",
  scheduleLab: "",
  totalClasses: 32,
  hasLab: false,
  descriptionSummary:
    "Análisis y explicación, **a nivel molecular**, del comportamiento de varios grupos de fármacos en los sistemas biológicos humanos, con foco en la relación entre **estructura química, mecanismo de acción y efecto farmacológico** y su aplicación terapéutica.",
  objectiveGeneral:
    "Al finalizar el curso el estudiante estará en capacidad de **analizar y explicar, a nivel molecular**, el comportamiento de algunos grupos de fármacos en los sistemas biológicos humanos donde ejercen su acción, enfocándose en la relación que existe entre la estructura química, el mecanismo de acción y el efecto farmacológico que conlleva a su aplicación terapéutica.",
  objectivesSpecific: [
    "Explicar las **características estructurales farmacofóricas** de cada grupo de fármacos (grupos funcionales, distancias, configuración, requerimientos estéreo-electrónicos).",
    "Explicar el **mecanismo de acción**: estructura y función de la diana, acción del fármaco sobre ella, transducción o inhibición, efecto y uso terapéutico, interacciones moleculares.",
    "Relacionar la estructura química con la **farmacodinamia y la farmacocinética** de cada grupo, incluyendo compuestos líder y análogos.",
  ],

  // Química farmacéutica: mayormente cualitativa/estructural, con algo de
  // fisicoquímica (pKa, logP). Sin laboratorio.
  sections: ["modulos", "proyectos", "fechas", "glosario", "formulas", "bibliografia", "insumos", "prompt-ia"],

  modules: [
    {
      slug: "sistema-hormonal",
      title: "Módulo 1: Sistema hormonal",
      description:
        "Introducción a la química farmacéutica de los fármacos que actúan sobre el **sistema hormonal**: estructura de las hormonas y sus análogos, receptores nucleares y de membrana, relación estructura–actividad y aplicaciones terapéuticas.",
    },
    {
      slug: "betalactamicos",
      title: "Módulo 2: Quimioterapéuticos — antibióticos β-lactámicos",
      description:
        "**Penicilinas y cefalosporinas**: el anillo β-lactámico como farmacóforo. Mecanismo de acción (inhibición de la transpeptidasa / PBP). **Resistencia** (β-lactamasas) y estrategias de diseño (inhibidores de β-lactamasa, modificaciones de cadena lateral).",
    },
    {
      slug: "opioides",
      title: "Módulo 3: SNC — opioides",
      description:
        "Química farmacéutica de los **analgésicos opioides**: morfina y análogos, requisitos estructurales para la afinidad por los receptores μ, κ y δ; agonistas, agonistas parciales y antagonistas; relación estructura–actividad y potencial de abuso.",
    },
    {
      slug: "adrenergicos",
      title: "Módulo 4: SNA — fármacos adrenérgicos",
      description:
        "**Agonistas y antagonistas adrenérgicos**: la feniletilamina como núcleo, sustituciones que determinan selectividad α/β, actividad directa vs. indirecta, y su repercusión farmacocinética (metabolismo por MAO/COMT).",
    },
    {
      slug: "antihistaminicos",
      title: "Módulo 5: SNA — antihistamínicos H1",
      description:
        "**Antagonistas H1** de primera y segunda generación: farmacóforo común, relación entre lipofilia y paso de la barrera hematoencefálica (sedación), y modificaciones que mejoran la selectividad periférica.",
    },
    {
      slug: "antiarritmicos",
      title: "Módulo 6: Sistema cardiovascular — antiarrítmicos",
      description:
        "**Antiarrítmicos** y su clasificación (Vaughan Williams I–IV): bloqueadores de canales de Na⁺, β-bloqueadores, bloqueadores de canales de K⁺ y de Ca²⁺; relación estructura–actividad y ventana terapéutica estrecha.",
    },
    {
      slug: "antihipertensivos",
      title: "Módulo 7: Sistema cardiovascular — antihipertensivos",
      description:
        "**IECA** (captopril y análogos, el grupo sulfhidrilo/carboxilo y el Zn²⁺ de la ECA), **ARA-II** (sartanes), **antagonistas de canales de calcio** (dihidropiridinas y no dihidropiridinas) y otros antihipertensivos.",
    },
    {
      slug: "hipolipemiantes",
      title: "Módulo 8: Hipolipemiantes",
      description:
        "**Estatinas** (inhibidores de la HMG-CoA reductasa): farmacóforo tipo mevalonato y análogos. Nuevos hipolipemiantes: **ácido bempedoico**, inhibidores de la proteína de transferencia de ésteres de colesterol (CETP) e inhibidores de PCSK9.",
    },
  ],

  glossary: [
    { term: "Relación estructura–actividad (REA/SAR)", moduleSlug: "sistema-hormonal", definition: "Estudio sistemático de cómo los cambios en la estructura química de una molécula modifican su actividad biológica; base racional del diseño de fármacos." },
    { term: "Grupo farmacofórico (farmacóforo)", moduleSlug: "sistema-hormonal", definition: "Conjunto mínimo de características estéreo-electrónicas (grupos funcionales, cargas, hidrofobicidad, distancias) necesarias para que una molécula reconozca su diana y produzca el efecto." },
    { term: "Bioisóstero", moduleSlug: "betalactamicos", definition: "Grupo o átomo que se puede sustituir por otro conservando propiedades biológicas similares; se usa para mejorar potencia, selectividad, metabolismo o toxicidad." },
    { term: "Profármaco", moduleSlug: "antihipertensivos", definition: "Compuesto inactivo o poco activo que se convierte in vivo en el fármaco activo (p. ej. enalapril → enalaprilato). Mejora absorción, duración o tolerancia." },
    { term: "Anillo β-lactámico", moduleSlug: "betalactamicos", definition: "Amida cíclica de 4 miembros tensionada; es el farmacóforo de penicilinas y cefalosporinas y el sitio de ataque de las β-lactamasas." },
    { term: "β-lactamasa", moduleSlug: "betalactamicos", definition: "Enzima bacteriana que hidroliza el anillo β-lactámico e inactiva el antibiótico; principal mecanismo de resistencia. Se contrarresta con inhibidores (ácido clavulánico, sulbactam, tazobactam)." },
    { term: "Receptores adrenérgicos", moduleSlug: "adrenergicos", definition: "Receptores acoplados a proteína G para adrenalina/noradrenalina: subtipos α₁, α₂, β₁, β₂, β₃, con distinta distribución tisular y respuesta." },
    { term: "Clasificación de Vaughan Williams", moduleSlug: "antiarritmicos", definition: "Agrupa los antiarrítmicos por mecanismo: **I** bloqueadores de Na⁺ (Ia/Ib/Ic), **II** β-bloqueadores, **III** bloqueadores de K⁺, **IV** bloqueadores de Ca²⁺." },
    { term: "IECA", moduleSlug: "antihipertensivos", definition: "Inhibidores de la enzima convertidora de angiotensina: bloquean la conversión de angiotensina I en II; su estructura coordina el Zn²⁺ del sitio activo de la ECA." },
    { term: "ARA-II (sartanes)", moduleSlug: "antihipertensivos", definition: "Antagonistas del receptor AT₁ de angiotensina II; bloquean el efecto vasoconstrictor sin afectar la degradación de bradicinina (menos tos que los IECA)." },
    { term: "Estatina", moduleSlug: "hipolipemiantes", definition: "Inhibidor competitivo de la HMG-CoA reductasa; su fragmento tipo dihidroxiácido mimetiza el intermediario mevalonato y reduce la síntesis hepática de colesterol." },
  ],

  formulas: [
    {
      name: "Ecuación de Henderson-Hasselbalch",
      expression: "pH = pKa + log #{[A^{−}]|[HA]}",
      variables: "pKa = constante de disociación ácida · [A⁻] = forma ionizada · [HA] = forma no ionizada",
      description: "Predice la **fracción ionizada** de un fármaco ácido o básico a un pH dado; explica su absorción, distribución y solubilidad.",
      moduleSlug: "opioides",
      derivation:
        "Se obtiene tomando logaritmos en la expresión de la constante de equilibrio de un ácido débil. La forma **no ionizada** atraviesa membranas por difusión pasiva; la **ionizada** es más hidrosoluble y queda 'atrapada' donde el pH la favorece (trampa iónica). Para una base débil el término del log se invierte ([BH⁺]/[B]).\npH = pH del medio.\npKa = −log de la constante de disociación ácida del grupo ionizable.\n[A⁻], [HA] = concentraciones de las formas ionizada y no ionizada.",
    },
    {
      name: "Coeficiente de reparto (log P) y log D",
      expression: "log P = log #{[fármaco]_{octanol}|[fármaco]_{agua}}",
      variables: "P = coeficiente de reparto octanol/agua de la especie neutra · D = coeficiente de distribución aparente a un pH dado",
      description: "Mide la **lipofilia**: gobierna permeabilidad de membrana, unión a proteínas, distribución al SNC y metabolismo. Valores óptimos suelen estar entre 1 y 3 (regla de Lipinski: log P ≤ 5).",
      moduleSlug: "antihistaminicos",
      derivation:
        "P es la razón de concentraciones de la forma **neutra** entre una fase orgánica (octanol) y agua en equilibrio. Para moléculas ionizables se usa log D, que promedia todas las especies presentes al pH fisiológico: log D = log P − log(1 + 10^{pH−pKa}) para un ácido. En antihistamínicos, bajar log D reduce el paso al SNC y por tanto la sedación.\nlog P = logaritmo del coeficiente de reparto (especie neutra) — adimensional.\nlog D = logaritmo del coeficiente de distribución aparente a un pH dado.",
    },
    {
      name: "Relación de Hansch (QSAR clásico)",
      expression: "log #{1|C} = k_{1}·π + k_{2}·σ + k_{3}·E_{s} + k_{4}",
      variables: "C = concentración para un efecto fijo · π = parámetro hidrofóbico · σ = parámetro electrónico de Hammett · E_{s} = parámetro estérico de Taft",
      description: "Modelo **cuantitativo** que relaciona la potencia de una serie de análogos con descriptores hidrofóbicos, electrónicos y estéricos de sus sustituyentes.",
      moduleSlug: "sistema-hormonal",
      derivation:
        "Hansch propuso que la actividad biológica de una serie congénere puede ajustarse por regresión lineal múltiple frente a propiedades fisicoquímicas de los sustituyentes: transporte y unión hidrofóbica (π, o log P), efectos electrónicos sobre la reactividad o la ionización (σ) y el volumen o impedimento estérico (E_{s}). Los coeficientes k_{i} y el signo de cada término orientan qué modificación estructural mejora la potencia.\nC = concentración (o dosis) que produce un efecto biológico fijo.\nπ, σ, E_{s} = parámetros de sustituyente (hidrofóbico, electrónico, estérico).",
    },
  ],

  evaluation: [
    { name: "1er Parcial (Sistema hormonal y β-lactámicos)", weight: 15 },
    { name: "2do Parcial (SNC y SNA)", weight: 15 },
    { name: "3er Parcial (Sistema cardiovascular)", weight: 15 },
    { name: "Trabajo en clase (talleres y quices)", weight: 20 },
    { name: "Trabajo de revisión — Folleto", weight: 10 },
    { name: "Trabajo de revisión — Presentación oral", weight: 25 },
  ],

  keyDates: [
    { name: "1er Parcial (Sistema hormonal y β-lactámicos)", weight: "15%" },
    { name: "2do Parcial (SNC y SNA)", weight: "15%" },
    { name: "3er Parcial (Sistema cardiovascular)", weight: "15%" },
    { name: "Entrega folleto del trabajo de revisión", weight: "10%" },
    { name: "Presentación oral del trabajo de revisión", weight: "25%" },
  ],

  projects: [
    { title: "Trabajo de revisión — folleto", category: "Trabajo de revisión" },
    { title: "Trabajo de revisión — presentación oral", category: "Trabajo de revisión" },
  ],

  bibliography: [
    { kind: "libro", reference: "Avendaño C. Introducción a la Química Farmacéutica. 2ª ed. Interamericana–McGraw-Hill. España. 2001." },
    { kind: "libro", reference: "Patrick G.L. An Introduction to Medicinal Chemistry. 7th ed. Oxford University Press. 2023." },
    { kind: "libro", reference: "Silverman R.B. The Organic Chemistry of Drug Design and Drug Action. 3rd ed. Academic Press. 2014." },
    { kind: "libro", reference: "Delgado C., Minguillón C. & Joglar J. Introducción a la Química Terapéutica. 2ª ed. Díaz de Santos. España. 2004." },
    { kind: "libro", reference: "Wermuth C.G. The Practice of Medicinal Chemistry. 4th ed. Academic Press. 2015." },
    { kind: "libro", reference: "Williams D.A. Foye's Principles of Medicinal Chemistry. 9th ed. Wolters Kluwer. 2020." },
    { kind: "libro", reference: "Abraham D.J., Rotella D.P. Burger's Medicinal Chemistry, Drug Discovery and Development. 7th ed. Wiley. 2010." },
    { kind: "libro", reference: "Beale J.M., Block J. Wilson and Gisvold's Textbook of Organic Medicinal and Pharmaceutical Chemistry. 12th ed. Lippincott Williams & Wilkins. 2010." },
    { kind: "revista", reference: "Journal of Medicinal Chemistry" },
    { kind: "revista", reference: "European Journal of Medicinal Chemistry" },
    { kind: "revista", reference: "Bioorganic & Medicinal Chemistry" },
    { kind: "revista", reference: "Nature Reviews Drug Discovery" },
  ],
};
