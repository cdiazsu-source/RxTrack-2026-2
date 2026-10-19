import type { BibliographyContent, FormulaContent, GlossaryContent } from "./_schema";

/**
 * BFC — glosario, fórmulas y bibliografía ADICIONALES a los de `bfc.ts` (que quedan
 * como núcleo). `bfc.ts` los concatena. Cada fórmula lleva ejemplos resueltos; los
 * números coinciden con los de los ejercicios de los capítulos (calculados con script).
 * Cada referencia con DOI fue verificada en Crossref; las normas se leyeron en su texto.
 */

export const bfcGlossaryExtra: GlossaryContent[] = [
  // Módulo 1
  { term: "Ventana terapéutica", moduleSlug: "introduccion-biofarmacia", definition: "Intervalo de concentraciones plasmáticas entre la **concentración mínima efectiva** (por debajo no hay efecto) y la **mínima tóxica** (por encima hay efectos adversos importantes). Cuanto más estrecha, más control exige el fármaco." },
  { term: "Farmacodinamia", moduleSlug: "introduccion-biofarmacia", definition: "Estudia **qué le hace el fármaco al organismo**: la relación entre su concentración y el efecto. La PK dice cuánto fármaco hay; la PD, qué hace eso." },
  { term: "Acción local vs. sistémica", moduleSlug: "introduccion-biofarmacia", definition: "**Local:** el efecto ocurre donde se aplica (crema, colirio). **Sistémica:** el fármaco debe absorberse, entrar a la circulación y llegar al sitio de acción; solo entonces la concentración plasmática es una medida válida del desempeño." },
  // Módulo 2
  { term: "Tiempo de latencia (tlag)", moduleSlug: "parametros-bioequivalencia", definition: "Retraso entre la administración y la aparición de fármaco en sangre (disolución, vaciamiento gástrico, cubiertas entéricas). Se nota porque la curva no parte de cero en t = 0." },
  { term: "Biodisponibilidad absoluta (F)", moduleSlug: "parametros-bioequivalencia", definition: "Fracción de la dosis que llega inalterada a la circulación sistémica comparada con la **vía IV** (100 % por definición): F = (ABC_oral/Dosis_oral)/(ABC_IV/Dosis_IV)." },
  { term: "Biodisponibilidad relativa", moduleSlug: "parametros-bioequivalencia", definition: "Compara dos productos por la **misma vía** (prueba vs. referencia), normalizando el ABC por la dosis. Es la base de la bioequivalencia." },
  { term: "Regla de los trapecios", moduleSlug: "parametros-bioequivalencia", definition: "Método para calcular el ABC con datos discretos: se suma el área de trapecios entre muestras, (C₁ + C₂)/2 × Δt. Se completa con la cola extrapolada C_última/K." },
  { term: "Equivalencia terapéutica", moduleSlug: "bioequivalencia-scb", definition: "Dos productos tienen los **mismos efectos de eficacia y seguridad** en los pacientes. En los genéricos se sustenta con la bioequivalencia." },
  { term: "Producto de referencia", moduleSlug: "bioequivalencia-scb", definition: "Producto contra el que se compara el de prueba; normalmente el **innovador**, con eficacia, seguridad y calidad establecidas (en Colombia, los comparadores están en el Anexo Técnico 2 de la Resolución 1124)." },
  // Módulo 3
  { term: "Metabolismo de primer paso", moduleSlug: "vias-dosis-regimen", definition: "Pérdida de fármaco por metabolismo en la pared intestinal y en el **hígado** antes de llegar a la circulación sistémica tras una dosis oral. F = Fa · Fg · Fh." },
  { term: "Razón de extracción hepática (E_H)", moduleSlug: "vias-dosis-regimen", definition: "Fracción del fármaco que el hígado retira en **una pasada**: E_H = Cl_H/Q_H. La fracción que escapa es Fh = 1 − E_H." },
  { term: "Hipótesis de partición por pH", moduleSlug: "vias-dosis-regimen", definition: "Las membranas se atraviesan sobre todo en forma **no ionizada**; la fracción no ionizada depende del pH y del pKa (Henderson–Hasselbalch). Explica la tendencia, no el sitio real de absorción (que también depende de superficie y tiempo)." },
  { term: "Dosis de carga", moduleSlug: "vias-dosis-regimen", definition: "Dosis inicial mayor para alcanzar de inmediato la concentración objetivo: **Dosis de carga = C_objetivo · Vd**. En multidosis IV, D · R." },
  { term: "Dosis de mantenimiento", moduleSlug: "vias-dosis-regimen", definition: "Dosis que repone lo eliminado durante cada intervalo para **mantener** la concentración en la ventana terapéutica." },
  { term: "Régimen de dosificación", moduleSlug: "vias-dosis-regimen", definition: "Plan completo: **dosis + intervalo (τ) + vía + duración** del tratamiento." },
  // Módulo 4
  { term: "Disolución", moduleSlug: "senf-liberacion-disolucion", definition: "Proceso por el cual el sólido pasa a solución. Es la etapa de la liberación que condiciona la absorción de los fármacos poco solubles (Clase II del SCB)." },
  { term: "Condiciones sink (sumidero)", moduleSlug: "senf-liberacion-disolucion", definition: "Condición en la que la concentración del medio es una fracción pequeña de la solubilidad (< 10–15 %; volumen ≥ 3 veces el de saturación), de modo que la disolución no se frena por saturación." },
  { term: "Ecuación de Noyes–Whitney", moduleSlug: "senf-liberacion-disolucion", definition: "dM/dt = D·A·(C_s − C)/h: la velocidad de disolución crece con el área, el coeficiente de difusión y la fuerza impulsora, y baja con el espesor de la capa de difusión." },
  { term: "Polimorfismo", moduleSlug: "senf-liberacion-disolucion", definition: "Capacidad de una sustancia de cristalizar en más de una forma sólida. Las formas metaestables y las **amorfas** suelen ser más solubles que la estable; los hidratos suelen serlo menos." },
  { term: "Liberación modificada", moduleSlug: "senf-liberacion-disolucion", definition: "Formas diseñadas para liberar el fármaco más despacio o en otro sitio (prolongada, retardada). Para ellas la bioexención por SCB no aplica y los estudios de bioequivalencia se hacen en ayuno y con alimentos." },
  { term: "IVIVC", moduleSlug: "senf-liberacion-disolucion", definition: "Correlación in vitro–in vivo: relación predictiva entre la disolución en laboratorio y la curva de concentración plasmática. Es el mejor uso del ensayo de disolución." },
  // Módulo 5
  { term: "Fracción excretada inalterada (f_e)", moduleSlug: "intro-farmacocinetica-ladme", definition: "Fracción de la dosis que se excreta por orina como fármaco sin cambios. Cl_renal = f_e · Cl_total: indica cuán sensible es el fármaco a la insuficiencia renal." },
  { term: "Unión a proteínas plasmáticas", moduleSlug: "intro-farmacocinetica-ladme", definition: "Solo el fármaco **libre** cruza membranas, se metaboliza y actúa. Los ácidos se unen sobre todo a albúmina; las bases, a α₁-glicoproteína ácida." },
  { term: "Inducción / inhibición enzimática", moduleSlug: "intro-farmacocinetica-ladme", definition: "La **inducción** (rifampicina, carbamazepina) aumenta la actividad enzimática y baja la concentración de los sustratos; la **inhibición** (ketoconazol, ritonavir, jugo de toronja) la reduce y sube la concentración." },
  { term: "Glicoproteína P (P-gp)", moduleSlug: "intro-farmacocinetica-ladme", definition: "Bomba de eflujo que devuelve fármacos al lumen intestinal (y los saca de otras células), limitando su absorción o penetración en tejidos; la digoxina es un sustrato." },
  // Módulo 6
  { term: "Cinética de orden cero / primer orden", moduleSlug: "modelos-pk-bolus-iv", definition: "**Orden cero:** se elimina una **cantidad fija** por hora. **Primer orden:** se elimina una **fracción fija** por hora (la de casi todos los fármacos a dosis terapéuticas)." },
  { term: "Modelo bicompartimental", moduleSlug: "modelos-pk-bolus-iv", definition: "Un compartimento central y uno periférico: la curva IV tiene fase de distribución rápida (α) y de eliminación lenta (β): C = A·e^(−αt) + B·e^(−βt)." },
  { term: "Método de residuales", moduleSlug: "modelos-pk-bolus-iv", definition: "'Pelado' de la curva: se traza la recta terminal, se extrapola y se resta de los datos tempranos; los residuales dan la fase rápida (α en el IV bicompartimental; ka en la absorción oral)." },
  { term: "Michaelis–Menten (V_máx, K_m)", moduleSlug: "modelos-pk-bolus-iv", definition: "Modelo de eliminación saturable: velocidad = V_máx·C/(K_m + C). **V_máx:** capacidad máxima de eliminación; **K_m:** concentración a la que se alcanza la mitad de V_máx." },
  { term: "Dosis proporcionalidad", moduleSlug: "modelos-pk-bolus-iv", definition: "En cinética lineal ABC y Cmax son proporcionales a la dosis: **ABC/Dosis es constante**. Si cambia con la dosis, hay no linealidad." },
  { term: "Autoinducción", moduleSlug: "modelos-pk-bolus-iv", definition: "El fármaco (p. ej. carbamazepina) induce las enzimas que lo eliminan: su aclaramiento aumenta con el tiempo de tratamiento." },
  // Módulo 7
  { term: "Infusión intravenosa continua", moduleSlug: "iv-multidosis-infusion", definition: "Entrada a velocidad constante k₀ (orden cero) con eliminación de primer orden: C(t) = (k₀/Cl)(1 − e^(−Kt)); C_ss = k₀/Cl." },
  { term: "Principio de superposición", moduleSlug: "iv-multidosis-infusion", definition: "En cinética lineal, la concentración producida por varias dosis es la **suma** de las producidas por cada una por separado; permite predecir multidosis y terapias combinadas." },
  { term: "Fluctuación (pico–valle)", moduleSlug: "iv-multidosis-infusion", definition: "Diferencia entre C_máx,ss y C_mín,ss en un intervalo de dosis; se reduce con intervalos más cortos y dosis más pequeñas." },
  { term: "Vida media operacional de dosis múltiples", moduleSlug: "iv-multidosis-infusion", definition: "Parámetro propuesto por Sahin y Benet (2008) para predecir la acumulación real con dosis repetidas, sobre todo en formas de liberación extendida donde la absorción también influye." },
  // Módulo 8
  { term: "Ecuación de Bateman", moduleSlug: "absorcion-un-compartimento", definition: "Curva de concentración de un fármaco con absorción y eliminación de primer orden: diferencia de dos exponenciales, C = [ka·F·D/(Vd(ka−K))]·(e^(−Kt) − e^(−ka·t))." },
  { term: "Método de Wagner–Nelson", moduleSlug: "absorcion-un-compartimento", definition: "Estima la **fracción absorbida** en el tiempo, FA = (C + K·ABC₀→t)/(K·ABC₀→∞), sin suponer un orden de absorción." },
  { term: "Flip-flop", moduleSlug: "absorcion-un-compartimento", definition: "Cuando ka < K, la pendiente terminal refleja la **absorción** y no la eliminación. Interpretarla como K da una vida media falsamente larga; se detecta con datos IV." },
  { term: "Vd/F y Cl/F (aparentes)", moduleSlug: "absorcion-un-compartimento", definition: "Con datos solo orales no se separa F de Vd ni de Cl: se estiman Vd/F y Cl/F. Con datos IV se resuelve F." },
  // Módulo 9
  { term: "Diseño cruzado 2×2", moduleSlug: "bioequivalencia-scb", definition: "Cada voluntario recibe prueba y referencia en dos periodos, en orden aleatorio (TR o RT), con un lavado entre ellos. Cada sujeto es su propio control." },
  { term: "Período de lavado", moduleSlug: "bioequivalencia-scb", definition: "Intervalo entre periodos de un estudio cruzado: > 5 vidas medias y mínimo 7 días (Res. 1124); la concentración predosis del segundo periodo debe ser < 5 % de Cmax." },
  { term: "Intervalo de confianza del 90 %", moduleSlug: "bioequivalencia-scb", definition: "Intervalo para la razón de medias geométricas T/R de Cmax y ABC; equivale a dos pruebas unilaterales al 5 % (TOST). Debe quedar dentro de 80,00–125,00 %." },
  { term: "Fármaco de margen terapéutico estrecho (NTI)", moduleSlug: "bioequivalencia-scb", definition: "Fármaco con ventana terapéutica estrecha: el intervalo de aceptación se estrecha a 90,00–111,11 % y no se conceden bioexenciones por SCB." },
  { term: "Fármaco altamente variable (HVD)", moduleSlug: "bioequivalencia-scb", definition: "CV intraindividual > 30 %. Con diseño replicado, el intervalo de Cmax puede ampliarse con k = 0,760 hasta 69,84–143,19 %; el ABC nunca se amplía." },
  { term: "Factor de similitud f2", moduleSlug: "bioequivalencia-scb", definition: "Mide la similitud de dos perfiles de disolución; f2 entre 50 y 100 = perfiles similares (≈ diferencia media ≤ 10 puntos porcentuales)." },
  { term: "Disolución muy rápida / rápida", moduleSlug: "bioequivalencia-scb", definition: "≥ 85 % disuelto en **15 min** (muy rápida) o en **30 min** (rápida) en pH 1,2; 4,5 y 6,8. Condición para la bioexención por SCB." },
  { term: "BDDCS", moduleSlug: "bioequivalencia-scb", definition: "Sistema de clasificación de Wu y Benet (2005) que cambia la permeabilidad por la extensión del metabolismo; predice la vía de eliminación, el efecto de los alimentos y el papel de los transportadores." },
  { term: "Producto multifuente", moduleSlug: "bioequivalencia-scb", definition: "Producto que es equivalente o alternativa farmacéutica de otro y que puede o no ser terapéuticamente equivalente (genéricos)." },
  // Módulo 10
  { term: "BPBD/BE", moduleSlug: "normativa-talleres-finales", definition: "Buenas Prácticas de Biodisponibilidad y Bioequivalencia: certificado que el INVIMA otorga a las instituciones que realizan estudios (vigencia de 3 años; Anexo Técnico 3 de la Res. 1124)." },
  { term: "Anexo Técnico 2 (Res. 1124)", moduleSlug: "normativa-talleres-finales", definition: "Lista de medicamentos de síntesis química que deben presentar estudios de bioequivalencia, con su producto de referencia; el INVIMA la actualiza gradualmente según el riesgo sanitario." },
  { term: "Validación bioanalítica", moduleSlug: "normativa-talleres-finales", definition: "Demostración de que el método de medición es confiable: selectividad, límite de cuantificación, curva de 6–8 puntos, exactitud, precisión, estabilidad, efecto matriz y reanálisis de muestras incurridas." },
];

export const bfcFormulasExtra: FormulaContent[] = [
  {
    name: "Área bajo la curva por trapecios",
    expression: "ABC_{t₁→t₂} = #{C₁ + C₂|2} · (t₂ − t₁)\nABC_{0→∞} = ABC_{0→t} + #{C_{última}|K}",
    variables: "C₁, C₂ = concentraciones en t₁ y t₂ · C_última = último dato medible · K = constante de eliminación",
    description: "Calcula la **exposición total** con datos discretos: suma de trapecios más la cola extrapolada.",
    derivation:
      "Entre dos muestras se supone una recta; el área bajo una recta es el promedio de las dos alturas por el ancho.\nLa cola más allá del último dato es una exponencial C_última·e^(−K·t'), cuya integral de 0 a ∞ es C_última/K.\nLa guía EMA pide que ABC₀→t cubra al menos el 80 % del ABC₀→∞.\nABC = área bajo la curva — mg·h/L (concentración × tiempo).\nC = concentración plasmática — mg/L.\nt = tiempo — h.",
    examples: [
      "**Datos:** (t; C) = (0; 0), (0,5; 3,9), (1; 6,1), (2; 7,6), (4; 6,0), (6; 3,8), (8; 2,4), (12; 0,95).\n\n**Trapecios:** 0,975 + 2,500 + 6,850 + 13,600 + 9,800 + 6,200 + 6,700 = **46,6 mg·h/L**.\n\n**K:** ln(2,4/0,95)/4 = 0,2317 h⁻¹ → **cola** = 0,95/0,2317 = 4,10 → **ABC₀→∞ = 50,7 mg·h/L**; cobertura = 46,6/50,7 = **91,9 %** ✓.",
    ],
    moduleSlug: "parametros-bioequivalencia",
  },
  {
    name: "Biodisponibilidad absoluta",
    expression: "F = #{ABC_{oral} / Dosis_{oral}|ABC_{IV} / Dosis_{IV}}",
    variables: "F = biodisponibilidad absoluta (0 a 1) · ABC = área bajo la curva de cada vía · Dosis = dosis de cada vía",
    description: "Fracción de la dosis oral que llega inalterada a la circulación, comparada con la IV (100 %).",
    derivation:
      "El ABC es proporcional a la cantidad que llega a la sangre; dividirlo entre la dosis da el ABC 'por mg administrado', que permite comparar vías con dosis distintas.\nPor definición, la IV tiene F = 1.\nF = biodisponibilidad absoluta — sin unidades (o %).\nABC_oral, ABC_IV = áreas de cada vía — mg·h/L.\nDosis_oral, Dosis_IV = dosis de cada vía — mg.",
    examples: [
      "**IV 100 mg:** ABC = 20,0 mg·h/L. **Oral 250 mg:** ABC = 30,0 mg·h/L.\n\n**ABC por mg:** oral = 30,0/250 = 0,120; IV = 20,0/100 = 0,200.\n\n**F** = 0,120/0,200 = **0,60** (60 %). Para igualar 100 mg IV se necesitarían 100/0,60 ≈ **167 mg** orales.",
    ],
    moduleSlug: "parametros-bioequivalencia",
  },
  {
    name: "Biodisponibilidad oral y metabolismo de primer paso",
    expression: "F = Fa · Fg · Fh\nFh = 1 − E_{H}\nE_{H} = #{Cl_{H}|Q_{H}}",
    variables: "Fa = fracción absorbida · Fg = fracción que escapa al metabolismo intestinal · Fh = fracción que escapa al hígado · E_H = razón de extracción hepática · Cl_H = aclaramiento hepático · Q_H = flujo sanguíneo hepático (≈ 90 L/h)",
    description: "Descompone la biodisponibilidad oral en las tres 'aduanas' que debe pasar el fármaco.",
    derivation:
      "Cada etapa deja pasar una fracción de lo que le llega; lo que sobrevive a la segunda es una fracción de la fracción de la primera, por eso se **multiplican**.\nE_H es la fracción retirada por el hígado en una sola pasada; lo que escapa es 1 − E_H.\nCl_H = E_H · Q_H.\nFa, Fg, Fh = fracciones — sin unidades (0 a 1).\nCl_H, Q_H — L/h.",
    examples: [
      "**Datos:** Fa = 0,90; Fg = 0,80; E_H = 0,60; Q_H = 90 L/h.\n\n**Fh** = 1 − 0,60 = 0,40. **F** = 0,90 × 0,80 × 0,40 = **0,288**.\n\n**Cl_H** = 0,60 × 90 = **54 L/h**. **Dosis oral** para igualar 100 mg IV = 100/0,288 = **347 mg**.\n\nSi un inhibidor baja E_H a 0,30: Fh = 0,70 y F = 0,504 → la exposición casi se duplica.",
    ],
    moduleSlug: "vias-dosis-regimen",
  },
  {
    name: "Fracción no ionizada (Henderson–Hasselbalch)",
    expression: "Ácido:  f_{no ion} = #{1|1 + 10^{(pH − pKa)}}\nBase:  f_{no ion} = #{1|1 + 10^{(pKa − pH)}}",
    variables: "f_no ion = fracción no ionizada · pH = del medio · pKa = del fármaco",
    description: "Fracción del fármaco sin carga (la que atraviesa membranas por difusión) a un pH dado.",
    derivation:
      "Para un ácido HA ⇌ H⁺ + A⁻: pH = pKa + log([A⁻]/[HA]) → [A⁻]/[HA] = 10^(pH − pKa); la fracción no ionizada es [HA]/([HA] + [A⁻]).\nCuando pH = pKa, 50 % está ionizado y 50 % no.\nPara una base se invierte el signo de (pH − pKa).\nLa absorción real depende además de superficie, tiempo y solubilidad.\npKa — sin unidades.",
    examples: [
      "**Aspirina (ácido, pKa 3,5):** estómago pH 1,5 → 1/(1 + 10^(−2)) = **99,0 %**; intestino pH 6,5 → 1/(1 + 10³) = **0,0999 %**; plasma pH 7,4 → **0,0126 %**.\n\n**Base débil (pKa 8,0):** estómago → **0,00003 %**; intestino → **3,07 %**; plasma → **20,1 %**.",
    ],
    moduleSlug: "vias-dosis-regimen",
  },
  {
    name: "Ecuación de Noyes–Whitney (velocidad de disolución)",
    expression: "#{dM|dt} = #{D · A · (C_{s} − C)|h}",
    variables: "dM/dt = velocidad de disolución · D = coeficiente de difusión · A = área superficial · C_s = solubilidad de saturación · C = concentración en el medio · h = espesor de la capa de difusión",
    description: "La velocidad de disolución de un sólido crece con el área y la solubilidad y baja con el espesor de la capa de difusión.",
    derivation:
      "Se obtiene de la primera ley de Fick aplicada a la capa estancada de espesor h que rodea al sólido: flujo = D · (diferencia de concentración)/h, multiplicado por el área.\nEn condiciones sink (C ≪ C_s) se simplifica a D·A·C_s/h.\nSupone A constante; en una tableta las partículas se encogen (ver Hixson–Crowell).\ndM/dt — mg/s o mg/min.\nD — cm²/s. A — cm². C_s, C — mg/mL (= mg/cm³). h — cm.",
    examples: [
      "**Datos:** D = 6,0 × 10⁻⁶ cm²/s; A = 2,0 cm²; h = 30 µm = 3,0 × 10⁻³ cm; C_s = 1,5 mg/mL; C ≈ 0.\n\n**dM/dt** = (6,0 × 10⁻⁶ × 2,0 × 1,5)/(3,0 × 10⁻³) = **6,0 × 10⁻³ mg/s = 0,36 mg/min**.\n\nSi la micronización multiplica A por 10 → **3,6 mg/min**.",
    ],
    moduleSlug: "senf-liberacion-disolucion",
  },
  {
    name: "Solubilidad en función del pH",
    expression: "Ácido débil:  S = S_{0} · (1 + 10^{(pH − pKa)})\nBase débil:  S = S_{0} · (1 + 10^{(pKa − pH)})",
    variables: "S = solubilidad total · S₀ = solubilidad intrínseca (forma no ionizada) · pH = del medio · pKa = del fármaco",
    description: "Solubilidad total de un ácido o una base débil a un pH determinado.",
    derivation:
      "La solubilidad total es la suma de la forma no ionizada (S₀, constante) y de la ionizada, que crece con el pH para un ácido y decrece para una base.\nSe usa para aplicar el criterio de alta solubilidad del SCB: dosis/250 mL ≤ menor solubilidad en pH 1,2–6,8.\nS, S₀ — mg/mL.",
    examples: [
      "**Ibuprofeno** (pKa ≈ 4,4; S₀ ≈ 0,021 mg/mL, valores aproximados): pH 1,2 → **0,021**; pH 4,5 → **0,047**; pH 6,8 → **5,30 mg/mL**.\n\n**Alta solubilidad** exigiría 800 mg/250 mL = **3,2 mg/mL** en todo el intervalo: con 0,021 mg/mL a pH 1,2 **no se cumple** → baja solubilidad (Clase II).",
    ],
    moduleSlug: "senf-liberacion-disolucion",
  },
  {
    name: "Ley de la raíz cúbica (Hixson–Crowell)",
    expression: "W_{0}^{1/3} − W^{1/3} = k · t",
    variables: "W₀ = masa inicial · W = masa sin disolver en t · k = constante · t = tiempo",
    description: "Disolución de partículas que conservan su forma y se encogen (el área disminuye).",
    derivation:
      "El área de una partícula es proporcional a su masa elevada a 2/3; al integrar la velocidad de disolución resulta que la raíz cúbica de la masa baja linealmente con el tiempo.\nSi graficas W^(1/3) contra t obtienes una recta de pendiente −k.\nW — mg. k — mg^(1/3)/min.",
    examples: [
      "**Datos:** 100 mg; quedan 60 mg a los 10 min. Raíces cúbicas: 4,6416 y 3,9149 → **k** = (4,6416 − 3,9149)/10 = **0,0727 mg^(1/3)/min**.\n\nA los 20 min: W^(1/3) = 4,6416 − 1,4534 = 3,1882 → **W = 32,4 mg**. Tiempo total = 4,6416/0,0727 = **63,9 min**.",
    ],
    moduleSlug: "senf-liberacion-disolucion",
  },
  {
    name: "Vida media según aclaramiento y volumen; aclaramiento renal",
    expression: "t_{1/2} = #{0,693 · Vd|Cl}\nCl_{renal} = f_{e} · Cl_{total}\nCl_{total} = Cl_{renal} + Cl_{no renal}",
    variables: "t1/2 = vida media · Vd = volumen de distribución · Cl = aclaramiento · f_e = fracción excretada inalterada en orina",
    description: "La vida media depende de **dos** parámetros independientes (Cl y Vd); f_e separa la parte renal del aclaramiento.",
    derivation:
      "De t1/2 = 0,693/K y K = Cl/Vd se obtiene t1/2 = 0,693·Vd/Cl.\nUna vida media larga puede deberse a un Cl bajo o a un Vd muy grande: no son lo mismo clínicamente.\nLos aclaramientos de órganos se suman; f_e indica cuán sensible es el fármaco a la insuficiencia renal.\nt1/2 — h. Vd — L. Cl — L/h. f_e — sin unidades (0 a 1).",
    examples: [
      "**Datos:** Cl = 15,32 L/h; Vd = 44,2 L; f_e = 0,40.\n\n**t1/2** = 0,693 × 44,2/15,32 = **2,00 h**. **Cl_renal** = 6,13 L/h; **Cl_no renal** = 9,19 L/h.\n\nCon función renal a la mitad: Cl = 3,06 + 9,19 = **12,26 L/h** (−20 %); **t1/2 = 2,50 h**.",
    ],
    moduleSlug: "intro-farmacocinetica-ladme",
  },
  {
    name: "Dosis de carga",
    expression: "Dosis de carga = C_{objetivo} · Vd",
    variables: "C_objetivo = concentración que se quiere alcanzar de inmediato · Vd = volumen de distribución",
    description: "Cantidad de fármaco que hay que tener en el cuerpo para lograr la concentración objetivo.",
    derivation:
      "Se despeja de Vd = A/C: A = Vd · C.\nSupone distribución rápida (modelo de un compartimento).\nEn infusión, la carga que da C_ss de inmediato es k₀/K; en multidosis IV, D · R.\nCarga — mg. C_objetivo — mg/L. Vd — L.",
    examples: [
      "**Vd = 0,70 L/kg, paciente de 80 kg:** Vd = 56 L. Para C = 10 mg/L: **carga = 56 × 10 = 560 mg**.",
    ],
    moduleSlug: "intro-farmacocinetica-ladme",
  },
  {
    name: "Concentración bicompartimental (IV bolo)",
    expression: "C = A · e^{−α·t} + B · e^{−β·t}\nk_{21} = #{A·β + B·α|A + B}\nk_{10} = #{α·β|k_{21}}\nk_{12} = α + β − k_{21} − k_{10}\nV_{c} = #{Dosis|A + B}\nV_{ss} = V_{c} · (1 + #{k_{12}|k_{21}})",
    variables: "A, B = interceptos de la fase de distribución y de eliminación · α, β = constantes de cada fase (α > β) · k₁₀, k₁₂, k₂₁ = microconstantes · V_c = volumen central · V_ss = volumen en estado estable",
    description: "Describe la caída rápida inicial (distribución) y la caída lenta posterior (eliminación) de un fármaco con modelo de dos compartimentos.",
    derivation:
      "La solución de las ecuaciones diferenciales de dos compartimentos es una suma de dos exponenciales.\nSe separan con el método de residuales: la recta terminal da β y B; los residuales dan α y A.\nAl terminar, se despejan las microconstantes y los volúmenes.\nCl = k₁₀·V_c; ABC = A/α + B/β = Dosis/Cl.\nA, B — mg/L. α, β, k — h⁻¹. V — L.",
    examples: [
      "**Dosis 560 mg;** A = 20 mg/L, α = 1,5 h⁻¹; B = 8 mg/L, β = 0,1 h⁻¹.\n\n**k₂₁** = (20 × 0,1 + 8 × 1,5)/28 = **0,5**; **k₁₀** = 1,5 × 0,1/0,5 = **0,3**; **k₁₂** = 1,6 − 0,5 − 0,3 = **0,8** h⁻¹.\n\n**V_c** = 560/28 = **20 L**; **V_ss** = 20 × (1 + 0,8/0,5) = **52 L**; **Cl** = 0,3 × 20 = **6 L/h**; **ABC** = 20/1,5 + 8/0,1 = **93,3 mg·h/L** (= 560/6 ✓).",
    ],
    moduleSlug: "modelos-pk-bolus-iv",
  },
  {
    name: "Estado estable con eliminación de Michaelis–Menten",
    expression: "velocidad de eliminación = #{V_{máx} · C|K_{m} + C}\nC_{ss} = #{K_{m} · R|V_{máx} − R}\nR = #{V_{máx} · C_{ss}|K_{m} + C_{ss}}",
    variables: "V_máx = velocidad máxima de eliminación · K_m = concentración a la mitad de V_máx · R = velocidad de administración · C_ss = concentración en estado estable",
    description: "Para fármacos con eliminación saturable (fenitoína), la dosis y la concentración **no son proporcionales**.",
    derivation:
      "En estado estable, lo que entra (R) iguala lo que sale: R = V_máx·C_ss/(K_m + C_ss).\nDespejando: R·K_m = C_ss·(V_máx − R) → C_ss = K_m·R/(V_máx − R).\nSi R se acerca a V_máx, C_ss se dispara; si R ≥ V_máx no hay estado estable.\nLa vida media aparente crece con la concentración: t1/2,ap = 0,693·Vd·(K_m + C)/V_máx.\nV_máx, R — mg/día. K_m, C — mg/L.",
    examples: [
      "**V_máx = 500 mg/día; K_m = 4 mg/L.**\n\n| R (mg/día) | C_ss (mg/L) |\n|---|---|\n| 300 | 6,0 |\n| 350 | 9,3 |\n| 400 | 16,0 |\n| 450 | 36,0 |\n\nSubir la dosis 50 % (300 → 450) multiplica la concentración **6 veces**. Para C_ss = 10 mg/L: R = 500 × 10/14 = **357 mg/día**. Con R = 500 no hay estado estable.",
    ],
    moduleSlug: "modelos-pk-bolus-iv",
  },
  {
    name: "Infusión continua: concentración en el tiempo",
    expression: "C(t) = #{k_{0}|Cl} · (1 − e^{−K·t}) = C_{ss} · (1 − e^{−K·t})",
    variables: "C(t) = concentración en t · k₀ = velocidad de infusión · Cl = aclaramiento · K = constante de eliminación · C_ss = concentración en estado estable",
    description: "Cómo sube la concentración hacia el estado estable durante una infusión IV a velocidad constante.",
    derivation:
      "Se resuelve dA/dt = k₀ − K·A; comprobación: en t = 0 da C = 0, en t → ∞ da C_ss = k₀/Cl, y la derivada es positiva y decreciente.\nLa fracción alcanzada es 1 − e^(−Kt) = 1 − (½)^(t/t1/2): 50 % a 1 t1/2, 90 % a 3,32, 97 % a 5.\nEl tiempo para llegar depende solo de t1/2, no de k₀.\nC — mg/L. k₀ — mg/h. K — h⁻¹. t — h.",
    examples: [
      "**K = 0,10 h⁻¹; Vd = 75 L; k₀ = 40 mg/h** (Cl = 7,5 L/h).\n\n**C_ss** = 40/7,5 = **5,33 mg/L**; **C(12 h)** = 5,33 × (1 − e^(−1,2)) = **3,73 mg/L**; **t al 90 %** = ln 10/0,10 = **23,0 h**; **carga** = 5,33 × 75 = **400 mg** (= k₀/K).",
    ],
    moduleSlug: "iv-multidosis-infusion",
  },
  {
    name: "Estado estable con dosis IV múltiples",
    expression: "C_{máx,ss} = #{D|Vd · (1 − e^{−K·τ})}\nC_{mín,ss} = C_{máx,ss} · e^{−K·τ}\nC_{ss,prom} = #{D|Cl · τ}\nD_{carga} = D · R",
    variables: "D = dosis · Vd = volumen de distribución · K = constante de eliminación · τ = intervalo · Cl = aclaramiento · R = factor de acumulación",
    description: "Valores de pico, valle y promedio en estado estable cuando se repite la misma dosis IV cada τ horas.",
    derivation:
      "Cada dosis se suma a lo que queda de las anteriores (superposición): serie geométrica de razón e^(−Kτ), que converge a R = 1/(1 − e^(−Kτ)).\nEn estado estable el ABC de un intervalo iguala el ABC₀→∞ de una dosis (D/Cl); dividido entre τ da C_ss,prom.\nLa carga D·R produce desde el inicio el pico del estado estable; con τ = t1/2, R = 2.\nC — mg/L. D — mg. τ — h.",
    examples: [
      "**D = 200 mg c/8 h; Vd = 40 L; t1/2 = 6 h** (K = 0,1155 h⁻¹; Cl = 4,62 L/h).\n\n**R** = 1/(1 − e^(−0,924)) = **1,66**. **C_máx,ss** = (200/40) × 1,658 = **8,29 mg/L**; **C_mín,ss** = 8,29 × 0,3969 = **3,29 mg/L**; **C_ss,prom** = 200/(4,62 × 8) = **5,41 mg/L**; **carga** = 200 × 1,658 = **332 mg**.\n\nCon τ = 12 h: R = 1,33; pico 6,67; valle 1,67; promedio 3,61 mg/L.",
    ],
    moduleSlug: "iv-multidosis-infusion",
  },
  {
    name: "Parámetros de la curva oral de un compartimento",
    expression: "t_{max} = #{ln(ka/K)|ka − K}\nC_{max} = #{F · D|Vd} · e^{−K · t_{max}}\nABC = #{F · D|Vd · K} = #{F · D|Cl}",
    variables: "ka = constante de absorción · K = constante de eliminación · F = biodisponibilidad · D = dosis · Vd = volumen de distribución · Cl = aclaramiento",
    description: "Pico, tiempo del pico y área de un fármaco con absorción y eliminación de primer orden. **ka cambia la forma (Cmax, tmax) pero no el ABC.**",
    derivation:
      "tmax sale de dC/dt = 0 (absorción = eliminación); Cmax se obtiene sustituyendo tmax y cancelando factores.\nEl ABC se obtiene integrando la ecuación de Bateman y no contiene a ka: la magnitud de la absorción es F, la velocidad es ka.\nF solo escala el perfil (Cmax y ABC), no mueve el tmax.\nt — h. C — mg/L. ABC — mg·h/L.",
    examples: [
      "**D = 500 mg; F = 0,80; Vd = 40 L; ka = 1,5 h⁻¹; K = 0,20 h⁻¹.**\n\n**tmax** = ln 7,5/1,3 = **1,55 h**; **Cmax** = 10 × e^(−0,31) = **7,33 mg/L**; **ABC** = 400/(40 × 0,2) = **50 mg·h/L**.\n\nSi ka = 3,0: tmax 0,97 h; Cmax 8,24 mg/L; ABC sigue en 50. Si F = 0,40: Cmax 3,67; ABC 25; tmax 1,55 h.",
    ],
    moduleSlug: "absorcion-un-compartimento",
  },
  {
    name: "Fracción absorbida (Wagner–Nelson)",
    expression: "FA(t) = #{C(t) + K · ABC_{0→t}|K · ABC_{0→∞}}",
    variables: "FA = fracción absorbida acumulada · C(t) = concentración en t · K = constante de eliminación · ABC = área bajo la curva",
    description: "Estima cuánto fármaco se ha absorbido en cada momento sin suponer un orden de absorción.",
    derivation:
      "Lo absorbido hasta t es lo que está en el cuerpo (Vd·C) más lo ya eliminado (Cl·ABC₀→t = K·Vd·ABC₀→t); el total absorbible es K·Vd·ABC₀→∞.\nAl dividir, Vd se cancela.\nSi la absorción es de primer orden, ln(1 − FA) contra t es una recta de pendiente −ka.\nFA — sin unidades (0 a 1).",
    examples: [
      "**Datos del ejercicio (K = 0,20; ABC₀→∞ = 50,8):**\n\nt = 0,5 h: (4,99 + 0,20 × 1,39)/10,16 = **0,518**. t = 1 h: (6,87 + 0,20 × 4,35)/10,16 = **0,762**. t = 2 h: (7,16 + 0,20 × 11,52)/10,16 = **0,932**.\n\nPendiente de ln(1 − FA) entre 0,5 y 2 h: **−1,31** → ka ≈ **1,3 h⁻¹** (real 1,5; los trapecios subestiman el área en el ascenso).",
    ],
    moduleSlug: "absorcion-un-compartimento",
  },
  {
    name: "IC 90 % de la razón T/R y CV intraindividual",
    expression: "SE = √( #{MSE|2} · ( #{1|n₁} + #{1|n₂} ) )\nIC_{90%} = ( e^{d − t·SE} , e^{d + t·SE} ) · 100\nCV_{intra} = √( e^{MSE} − 1 )",
    variables: "d = diferencia de medias de ln(parámetro) (T − R) · MSE = cuadrado medio del error del ANOVA · n₁, n₂ = sujetos por secuencia · t = valor t de Student 0,95 con n₁ + n₂ − 2 gl",
    description: "Intervalo de confianza del 90 % para el cociente de medias geométricas en un cruzado 2×2; debe quedar dentro de 80,00–125,00 %.",
    derivation:
      "Se trabaja en escala logarítmica porque Cmax y ABC son log-normales y la razón T/R se vuelve una diferencia.\nIC 90 % equivale a dos pruebas unilaterales al 5 % (TOST).\nSe revierte con la exponencial; los límites 80–125 % son simétricos en log: ln 0,80 = −0,2231; ln 1,25 = +0,2231.\nNTI: 90,00–111,11 % (±0,1054 en log).\nd, MSE — sin unidades (escala log). CV — %.",
    examples: [
      "**Datos:** n₁ = n₂ = 6; d = −0,0513; MSE = 0,0320; t₀,₉₅ (10 gl) = 1,8125.\n\n**GMR** = e^(−0,0513) = **95,0 %**. **CV** = √(e^0,032 − 1) = **18,0 %**. **SE** = √(0,0160 × 0,3333) = **0,07303**; t·SE = **0,1324**.\n\n**IC** = (e^(−0,1837), e^(0,0811)) = **83,2 % – 108,4 %** ⊂ 80–125 % → **bioequivalente** en ese parámetro.",
    ],
    moduleSlug: "bioequivalencia-scb",
  },
  {
    name: "Factor de similitud f2",
    expression: "f₂ = 50 · log₁₀ { [ 1 + #{1|n} · Σ (R_{t} − T_{t})² ]^{−0,5} · 100 }",
    variables: "n = número de tiempos · R_t, T_t = % disuelto medio de la referencia y de la prueba en el tiempo t",
    description: "Compara dos perfiles de disolución: f2 entre 50 y 100 → similares.",
    derivation:
      "Equivale a una transformación logarítmica de la diferencia cuadrática media entre perfiles; f2 = 50 corresponde a una diferencia promedio de ≈ 10 puntos porcentuales.\nCondiciones: ≥ 3 tiempos (sin cero), los mismos en ambos productos, un solo punto ≥ 85 %, CV ≤ 20 % hasta 10 min y ≤ 10 % después, ≥ 12 unidades.\nSi ambos productos disuelven ≥ 85 % en 15 min no se calcula f2.\nf₂ — sin unidades.",
    examples: [
      "**Referencia:** 38, 61, 79, 88 (15, 30, 45, 60 min). **Prueba:** 32, 55, 74, 85.\n\nDiferencias: 6, 6, 5, 3 → cuadrados 36 + 36 + 25 + 9 = 106 → /4 = 26,5 → f2 = 50 × log₁₀(100/√27,5) = 50 × log₁₀(19,07) = **64,0** → **similares**.\n\nCon una prueba de 15, 30, 45, 62 frente a 30, 52, 70, 85: Σ = 1863 → f2 = **33,3** → no similares.",
    ],
    moduleSlug: "bioequivalencia-scb",
  },
  {
    name: "Límites ampliados para fármacos altamente variables (EMA)",
    expression: "s_{WR} = √ln(CV² + 1)\n[ L , U ] = e^{±k · s_{WR}}      con k = 0,760",
    variables: "CV = coeficiente de variación intraindividual de Cmax del referente (fracción) · s_WR = desviación estándar intrasujeto de ln Cmax del referente · k = constante regulatoria 0,760",
    description: "Amplía el intervalo de aceptación de **Cmax** (no del ABC) cuando el CV intraindividual del referente supera el 30 %, hasta un máximo de 69,84–143,19 %.",
    derivation:
      "Aplica a diseños replicados definidos en el protocolo; la razón T/R de Cmax debe seguir dentro de 80–125 %.\nEl ABC se evalúa siempre con 80,00–125,00 % sin escalar.\nEl CV se acota en 50 % para el cálculo (límite superior de 143,19 %).\nCV — fracción (0,38 = 38 %). s_WR — sin unidades.",
    examples: [
      "**CV = 38 %:** s_WR = √ln(1,1444) = **0,3673**; k·s_WR = 0,2791; **límites** = e^(−0,2791) y e^(0,2791) = **75,6 % – 132,2 %**.\n\n**CV = 42 %:** s_WR = 0,4031; k·s_WR = 0,3064 → **73,6 % – 135,8 %**.\n\nTabla EMA: 35 % → 77,23–129,48; 40 % → 74,62–134,02; 45 % → 72,15–138,59; ≥ 50 % → 69,84–143,19.",
    ],
    moduleSlug: "bioequivalencia-scb",
  },
];

export const bfcBibliographyExtra: BibliographyContent[] = [
  // Libros
  { kind: "libro", reference: "Rowland M. y Tozer T.N. Clinical Pharmacokinetics and Pharmacodynamics: Concepts and Applications. 4th edition. Lippincott Williams & Wilkins, Philadelphia, U.S.A., 2011." },
  { kind: "libro", reference: "Gibaldi M. y Perrier D. Pharmacokinetics. 2nd edition. Marcel Dekker, New York, U.S.A., 1982.", moduleSlug: "modelos-pk-bolus-iv" },
  // Normativa y guías
  { kind: "libro", reference: "INVIMA. Bioequivalencia (medicamentos y productos biológicos): información sobre estudios, instituciones certificadas y listado de medicamentos.", url: "https://www.invima.gov.co/productos-vigilados/medicamentos-y-productos-biologicos/bioequivalencia", moduleSlug: "normativa-talleres-finales" },
  { kind: "libro", reference: "European Medicines Agency. Guideline on the investigation of bioequivalence. CPMP/EWP/QWP/1401/98 Rev. 1/Corr. London, 20 January 2010.", url: "https://www.ema.europa.eu/en/documents/scientific-guideline/guideline-investigation-bioequivalence-rev1_en.pdf", moduleSlug: "bioequivalencia-scb" },
  { kind: "libro", reference: "ICH. M9 Biopharmaceutics Classification System-based biowaivers. EMA/CHMP/ICH/493213/2018. Step 5, 10 February 2020.", url: "https://www.ema.europa.eu/en/documents/scientific-guideline/ich-m9-biopharmaceutics-classification-system-based-biowaivers-step-5_en.pdf", moduleSlug: "bioequivalencia-scb" },
  { kind: "libro", reference: "U.S. Food and Drug Administration. Bioavailability Studies Submitted in NDAs or INDs — General Considerations. Guidance for Industry, April 2022.", url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/bioavailability-studies-submitted-ndas-or-inds-general-considerations", moduleSlug: "parametros-bioequivalencia" },
  { kind: "libro", reference: "U.S. Food and Drug Administration. Assessing the Effects of Food on Drugs in INDs and NDAs — Clinical Pharmacology Considerations. Guidance for Industry, June 2022.", moduleSlug: "senf-liberacion-disolucion" },
  // Artículos (DOI verificado en Crossref)
  { kind: "revista", reference: "Lindenbaum J., Mellow M.H., Blackstone M.O., Butler V.P. Variation in biologic availability of digoxin from four preparations. N Engl J Med 1971;285:1344-1347.", url: "https://doi.org/10.1056/NEJM197112092852403", moduleSlug: "introduccion-biofarmacia" },
  { kind: "revista", reference: "Benet L.Z. y Zia-Amirhosseini P. Basic principles of pharmacokinetics. Toxicol Pathol 1995;23:115-123.", url: "https://doi.org/10.1177/019262339502300203", moduleSlug: "intro-farmacocinetica-ladme" },
  { kind: "revista", reference: "Shore P.A., Brodie B.B., Hogben C.A.M. The gastric secretion of drugs: a pH partition hypothesis. J Pharmacol Exp Ther 1957;119:361-369.", url: "https://doi.org/10.1016/S0022-3565(25)11878-8", moduleSlug: "vias-dosis-regimen" },
  { kind: "revista", reference: "Lennernäs H. Intestinal permeability and its relevance for absorption and elimination. Xenobiotica 2007;37:1015-1051.", url: "https://doi.org/10.1080/00498250701704819", moduleSlug: "vias-dosis-regimen" },
  { kind: "revista", reference: "Lipinski C.A., Lombardo F., Dominy B.W., Feeney P.J. Experimental and computational approaches to estimate solubility and permeability in drug discovery and development settings. Adv Drug Deliv Rev 1997;23:3-25.", url: "https://doi.org/10.1016/S0169-409X(96)00423-1", moduleSlug: "intro-farmacocinetica-ladme" },
  { kind: "revista", reference: "Noyes A.A. y Whitney W.R. The rate of solution of solid substances in their own solutions. J Am Chem Soc 1897;19:930-934.", url: "https://doi.org/10.1021/ja02086a003", moduleSlug: "senf-liberacion-disolucion" },
  { kind: "revista", reference: "Hixson A.W. y Crowell J.H. Dependence of reaction velocity upon surface and agitation. Ind Eng Chem 1931;23:923-931.", url: "https://doi.org/10.1021/ie50260a018", moduleSlug: "senf-liberacion-disolucion" },
  { kind: "revista", reference: "Higuchi T. Rate of release of medicaments from ointment bases containing drugs in suspension. J Pharm Sci 1961;50:874-875.", url: "https://doi.org/10.1002/jps.2600501018", moduleSlug: "senf-liberacion-disolucion" },
  { kind: "revista", reference: "Gibaldi M. y Feldman S. Establishment of sink conditions in dissolution rate determinations. Theoretical considerations and application to nondisintegrating dosage forms. J Pharm Sci 1967;56:1238-1242.", url: "https://doi.org/10.1002/jps.2600561005", moduleSlug: "senf-liberacion-disolucion" },
  { kind: "revista", reference: "Dressman J.B., Amidon G.L., Reppas C., Shah V.P. Dissolution testing as a prognostic tool for oral drug absorption: immediate release dosage forms. Pharm Res 1998;15:11-22.", url: "https://doi.org/10.1023/A:1011984216775", moduleSlug: "senf-liberacion-disolucion" },
  { kind: "revista", reference: "Welling P.G. Effects of food on drug absorption. Annu Rev Nutr 1996;16:383-415.", url: "https://doi.org/10.1146/annurev.nutr.16.1.383", moduleSlug: "senf-liberacion-disolucion" },
  { kind: "revista", reference: "Wagner J.G. Properties of the Michaelis-Menten equation and its integrated form which are useful in pharmacokinetics. J Pharmacokinet Biopharm 1973;1:103-121.", url: "https://doi.org/10.1007/BF01059625", moduleSlug: "modelos-pk-bolus-iv" },
  { kind: "revista", reference: "Ludden T.M. Nonlinear pharmacokinetics: clinical implications. Clin Pharmacokinet 1991;20:429-446.", url: "https://doi.org/10.2165/00003088-199120060-00001", moduleSlug: "modelos-pk-bolus-iv" },
  { kind: "revista", reference: "Sahin S. y Benet L.Z. The operational multiple dosing half-life: a key to defining drug accumulation in patients and to designing extended release dosage forms. Pharm Res 2008;25:2869-2877.", url: "https://doi.org/10.1007/s11095-008-9787-9", moduleSlug: "iv-multidosis-infusion" },
  { kind: "revista", reference: "Wagner J.G. y Nelson E. Per cent absorbed time plots derived from blood level and/or urinary excretion data. J Pharm Sci 1963;52:610-611.", url: "https://doi.org/10.1002/jps.2600520629", moduleSlug: "absorcion-un-compartimento" },
  { kind: "revista", reference: "Wagner J.G. y Nelson E. Kinetic analysis of blood levels and urinary excretion in the absorptive phase after single doses of drug. J Pharm Sci 1964;53:1392-1403.", url: "https://doi.org/10.1002/jps.2600531126", moduleSlug: "absorcion-un-compartimento" },
  { kind: "revista", reference: "Loo J.C.K. y Riegelman S. New method for calculating the intrinsic absorption rate of drugs. J Pharm Sci 1968;57:918-928.", url: "https://doi.org/10.1002/jps.2600570602", moduleSlug: "absorcion-un-compartimento" },
  { kind: "revista", reference: "Boxenbaum H. Pharmacokinetic tricks and traps: flip-flop models. J Pharm Pharm Sci 1998;1(3):90-91.", url: "https://sites.ualberta.ca/~csps/JPPS1%283%29/H.Boxenbaum/flip-boxenbaum.pdf", moduleSlug: "absorcion-un-compartimento" },
  { kind: "revista", reference: "Amidon G.L., Lennernäs H., Shah V.P., Crison J.R. A theoretical basis for a biopharmaceutic drug classification: the correlation of in vitro drug product dissolution and in vivo bioavailability. Pharm Res 1995;12:413-420.", url: "https://doi.org/10.1023/A:1016212804288", moduleSlug: "bioequivalencia-scb" },
  { kind: "revista", reference: "Yu L.X., Amidon G.L., Polli J.E., et al. Biopharmaceutics classification system: the scientific basis for biowaiver extensions. Pharm Res 2002;19:921-925.", url: "https://doi.org/10.1023/A:1016473601633", moduleSlug: "bioequivalencia-scb" },
  { kind: "revista", reference: "Wu C.Y. y Benet L.Z. Predicting drug disposition via application of BCS: transport/absorption/elimination interplay and development of a biopharmaceutics drug disposition classification system. Pharm Res 2005;22:11-23.", url: "https://doi.org/10.1007/s11095-004-9004-4", moduleSlug: "bioequivalencia-scb" },
  { kind: "revista", reference: "Benet L.Z. The role of BCS (Biopharmaceutics Classification System) and BDDCS (Biopharmaceutics Drug Disposition Classification System) in drug development. J Pharm Sci 2013;102:34-42.", url: "https://doi.org/10.1002/jps.23359", moduleSlug: "bioequivalencia-scb" },
  { kind: "revista", reference: "Schuirmann D.J. A comparison of the two one-sided tests procedure and the power approach for assessing the equivalence of average bioavailability. J Pharmacokinet Biopharm 1987;15:657-680.", url: "https://doi.org/10.1007/BF01068419", moduleSlug: "bioequivalencia-scb" },
  { kind: "revista", reference: "Westlake W.J. Symmetrical confidence intervals for bioequivalence trials. Biometrics 1976;32:741-744.", url: "https://doi.org/10.2307/2529259", moduleSlug: "bioequivalencia-scb" },
  { kind: "revista", reference: "Davit B.M., Nwakama P.E., Buehler G.J., et al. Comparing generic and innovator drugs: a review of 12 years of bioequivalence data from the United States Food and Drug Administration. Ann Pharmacother 2009;43:1583-1597.", url: "https://doi.org/10.1345/aph.1M141", moduleSlug: "bioequivalencia-scb" },
  { kind: "revista", reference: "Davit B.M., Conner D.P., Fabian-Fritsch B., et al. Highly variable drugs: observations from bioequivalence data submitted to the FDA for new generic drug applications. AAPS J 2008;10:148-156.", url: "https://doi.org/10.1208/s12248-008-9015-x", moduleSlug: "bioequivalencia-scb" },
];

/** Descripción (Markdown de renderCornell) de los dos proyectos de BFC, con plan de lectura y de trabajo. */
export const bfcProjectDescriptions = {
  quices: [
    "#### Qué es",
    "Quices cortos de **control de lectura** de artículos científicos durante el bloque de **Biofarmacia** (prof. Helber Barbosa). Pesan el **14 %** de la nota final y verifican que leíste el artículo asignado *antes* de la clase.",
    "",
    "#### Cómo leer un artículo para un quiz (10 minutos, en este orden)",
    "1. **Título y resumen:** ¿qué pregunta responde?",
    "2. **Introducción (último párrafo):** el objetivo exacto.",
    "3. **Métodos:** ¿qué fármaco, qué forma farmacéutica, qué diseño, cuántos sujetos o unidades, qué ensayo de disolución o qué parámetros se midieron?",
    "4. **Resultados:** mira las **tablas y figuras** primero; anota 2–3 números clave (Cmax, ABC, % disuelto, f2…).",
    "5. **Discusión:** ¿qué concluyen? ¿qué limitaciones reconocen?",
    "6. **Una frase propia:** «Este artículo muestra que… porque…».",
    "",
    "#### Plantilla de apuntes (cópiala por artículo)",
    "* **Pregunta:** …",
    "* **Fármaco / producto / vía:** …",
    "* **Diseño y método:** …",
    "* **Resultado principal (con números):** …",
    "* **Conclusión de los autores:** …",
    "* **Limitaciones:** …",
    "* **Con qué módulo se conecta:** …",
    "",
    "#### Artículos de la literatura que conectan con el temario (para practicar antes de que asignen los suyos)",
    "| Módulo | Artículo | Por qué sirve |",
    "|---|---|---|",
    "| 1 | Lindenbaum et al. 1971, *N Engl J Med* (digoxina, 4 preparaciones) | El caso que mostró que «mismo contenido» no es «misma biodisponibilidad» |",
    "| 3 | Lennernäs 2007, *Xenobiotica* | Permeabilidad intestinal, absorción y eliminación |",
    "| 4 | Dressman et al. 1998, *Pharm Res* | Cómo la disolución predice la absorción oral |",
    "| 4 | Welling 1996, *Annu Rev Nutr* | Efecto de los alimentos sobre la absorción |",
    "| 9 | Amidon et al. 1995, *Pharm Res* | Origen del Sistema de Clasificación Biofarmacéutica |",
    "| 9 | Davit et al. 2009, *Ann Pharmacother* | Qué tan diferentes son realmente los genéricos aprobados |",
    "",
    "Los DOI están en **Bibliografía**. Si el artículo asignado no aparece aquí, aplica la plantilla.",
    "",
    "#### Para el quiz",
    "* Ten a mano **una cifra y un concepto** por artículo: los quices suelen preguntar por el diseño y por el resultado principal.",
    "* Si tu comprensión del método es débil, vuelve al capítulo del módulo correspondiente y haz los ejercicios.",
  ].join("\n"),
  talleres: [
    "#### Qué es",
    "**Talleres de farmacocinética** (prof. Yolima Baena): uno por tema, retroalimentados en clase. Si se **cumplen todos los talleres asignados** y la asistencia es completa (salvo excusa verificable), se suman **+0,3** a la nota final del bloque de Farmacocinética.",
    "",
    "#### Método de trabajo para cada taller (siempre el mismo)",
    "1. **Lee todo el enunciado** y subraya los datos con su unidad.",
    "2. **Identifica el modelo:** ¿IV o extravascular? ¿bolo, infusión o multidosis? ¿un compartimento o dos? ¿lineal o no?",
    "3. **Escribe qué pide** y qué parámetros necesitas (K, Vd, Cl, F, ka…).",
    "4. **Despeja** en símbolos antes de reemplazar números.",
    "5. **Reemplaza con unidades** y verifica que se cancelen hasta la unidad que pide.",
    "6. **Comprueba el orden de magnitud** (¿una vida media de 3 años para un analgésico? Algo salió mal).",
    "7. **Escribe una frase de conclusión** con el significado clínico.",
    "",
    "#### Qué practicar para cada tema del bloque",
    "| Tema (semana) | Qué dominar | Dónde practicarlo |",
    "|---|---|---|",
    "| LADME, parámetros (sem. 9) | Vd, Cl, K, t1/2, ABC; fe | Módulo 5: ejercicios 1–5 |",
    "| Modelos, IV bolo (sem. 10) | C = C₀e^(−Kt); regresión semilog; bicompartimental; lineal vs no lineal | Módulo 6 |",
    "| IV multidosis e infusión (sem. 11–12) | R, C_máx,ss, C_mín,ss, C_prom; carga; terapia bolo + infusión | Módulo 7 |",
    "| Absorción, un compartimento (sem. 14) | Bateman, tmax, Cmax, ABC; residuales; Wagner–Nelson; flip-flop | Módulo 8 |",
    "| Bioequivalencia, SCB (sem. 15) | IC 90 %, f2, clasificación SCB, HVD | Módulo 9 |",
    "| Normativa y talleres (sem. 16) | Resolución 1124; diseño de estudio; decisión | Módulo 10 |",
    "",
    "#### Errores que más se repiten",
    "* Mezclar **mg/L** con **µg/mL** (son iguales) o con **ng/mL** (×1000).",
    "* Olvidar que **K** está en h⁻¹ y el tiempo debe estar en **horas**.",
    "* Usar **t1/2 = 0,693/K** con K en minutos pero el tiempo en horas.",
    "* Calcular R con e^(−K·τ) sin multiplicar **K·τ** primero.",
    "* Confundir el **intervalo (τ)** con el **tiempo desde la última dosis**.",
    "* Interpretar la pendiente terminal oral como K cuando puede haber **flip-flop**.",
    "",
    "En la página de este proyecto, el botón **Copiar contexto para IA** arma un texto con el avance y los datos para pegar en tu asistente y pedir ayuda con un taller.",
  ].join("\n"),
};
