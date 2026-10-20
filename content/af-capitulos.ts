/**
 * Administración Farmacéutica — desarrollo de los módulos 1 a 4.
 *
 * Fuente: sistematización de las diapositivas de las sesiones 1 a 7 del curso.
 * Cada capítulo cierra con "Vacíos por completar": lo que las diapositivas
 * todavía no cubren, para llenarlo con la clase, el libro o la IA.
 * Los módulos 5 a 7 aún no se han visto: no tienen capítulo.
 */
export const afCapitulos: Record<string, string> = {
  "economia-teoria-economica": `#### Qué es administrar
La **administración** es el proceso de **planificar, organizar, dirigir y controlar** recursos para lograr objetivos de manera **eficiente y efectiva**. Es una **ciencia con principios sistemáticos**: no se improvisa, se aplica con método.

#### La meta: generar superávit
La meta fundamental de administrar es generar un **superávit**: que lo obtenido supere lo invertido. Eso se mide con la **productividad**.

* **Productividad** = relación entre las **salidas** (productos o servicios) y los **insumos** empleados, **considerando la calidad**.
* Más salidas con los mismos insumos, o los mismos productos con menos insumos, significa más productividad.

#### Efectividad vs. eficiencia
| Concepto | Qué significa | Pregunta que responde |
| --- | --- | --- |
| **Efectividad** | Lograr los objetivos | ¿Se cumplió lo propuesto? |
| **Eficiencia** | Alcanzarlos con el **mínimo de recursos** | ¿A qué costo se cumplió? |

> Se puede ser efectivo sin ser eficiente (se cumple la meta, pero gastando de más) y eficiente sin ser efectivo (se gasta poco, pero no se cumple la meta). Administrar bien busca **las dos a la vez**.

#### La organización y su entorno
Una organización **transforma insumos en productos**:

* **Insumos:** recursos **humanos**, **capital** y **tecnológicos**.
* **Productos:** bienes o servicios.

Esa transformación ocurre dentro de un **ambiente externo** al que la organización responde: **económico, tecnológico, social, político y ético**.

#### Vacíos por completar (Nota de estado)
Las diapositivas de las sesiones 1 a 7 **no desarrollan** estos temas, que sí están en el programa del curso:

* **Agentes económicos** (hogares, empresas, Estado, sector externo) y el circuito económico.
* **Sistemas económicos** (capitalista, planificada, mixta, tradicional, keynesiana).
* **Escuelas teóricas clásicas** de la administración: **Taylor, Fayol y Weber**.

Pendiente: completarlos con la clase y con Koontz, Weihrich y Cannice o Chiavenato (ver Bibliografía).`,

  planeacion: `#### Qué es planear
La **planeación** es la función básica de **seleccionar objetivos y definir las acciones** para lograrlos. Su papel es **cerrar la brecha** entre la situación actual y la situación futura deseada.

#### Tipos de planes
* **Propósitos** (misión)
* **Metas**
* **Estrategias**
* **Políticas**
* **Procedimientos**
* **Reglas**
* **Programas**
* **Presupuestos**

#### Proceso de planeación
1. **Diagnóstico** de la situación.
2. **Establecimiento de objetivos.**
3. **Desarrollo de premisas** (supuestos sobre el futuro en que se apoya el plan).
4. **Evaluación de alternativas.**
5. **Formulación de planes** y de sus **presupuestos**.

#### Objetivos: jerárquicos y verificables
Los objetivos se ordenan en **jerarquía** (de los generales de la organización a los de cada área) y deben poder **verificarse**. El enfoque **SMART** lo garantiza:

| Letra | Significa | Qué exige |
| --- | --- | --- |
| **S** | Específicos | Dicen con claridad qué se quiere lograr |
| **M** | Medibles | Tienen un indicador o cifra |
| **A** | Alcanzables | Son posibles con los recursos disponibles |
| **R** | Relevantes | Aportan a la misión y a los demás objetivos |
| **T** | con Límite de Tiempo | Tienen fecha |

#### APO: Administración por Objetivos
La **APO** es un sistema que **orienta las actividades hacia las metas de la organización**. Se asocia con **Peter Drucker**.

#### Misión
La **misión** es el **propósito fundamental** de la organización: qué hace, para quién y cómo. Define a los **clientes**, el **mercado** y la **tecnología**. Se asocia con **Peter Drucker**.

#### Estrategia y análisis DOFA (FODA)
La estrategia parte de dos miradas:

* **Entorno** (fuerzas externas): **Oportunidades** y **Amenazas**.
* **Capacidad interna**: **Fortalezas** y **Debilidades**.

Al cruzar los cuatro factores en la **matriz DOFA** salen cuatro tipos de estrategia:

| Estrategia | Cruza | Idea |
| --- | --- | --- |
| **FO** | Fortalezas + Oportunidades | Usar lo que somos para aprovechar el entorno |
| **DO** | Debilidades + Oportunidades | Corregir debilidades para aprovechar oportunidades |
| **FA** | Fortalezas + Amenazas | Usar fortalezas para enfrentar las amenazas |
| **DA** | Debilidades + Amenazas | Reducir debilidades y evitar las amenazas |

Autores de referencia para estrategia: **Joel Ross y Michael Kami**, y **Fred R. David** (administración estratégica).

#### Aplicación farmacéutica
Las diapositivas aplican la planeación a los servicios farmacéuticos:

* **Análisis normativo:** **Ley 100 de 1993** y **Decreto 780 de 2016**.
* **Complejidad hospitalaria:** el nivel de complejidad condiciona qué servicio se planea.
* **Distribución física:** sistema de **dosis unitaria**.
* **Procesos:** definir los procesos del servicio farmacéutico.

#### Vacíos por completar (Nota de estado)
El módulo es **exhaustivo** en las diapositivas. Solo falta la **planeación social**, que el programa del curso sí incluye.`,

  organizacion: `#### Qué es organizar
**Organizar** es crear una **estructura intencional de funciones**: quién hace qué y quién responde ante quién.

Principios:

* **Jerarquía**
* **Unidad de mando** (cada persona responde a un solo jefe)
* **División del trabajo**
* **Amplitud de control**
* **Flexibilidad**

#### Organización formal e informal
* **Formal:** la que está definida y se dibuja en el **organigrama**.
* **Informal:** la que surge **espontáneamente** de las relaciones entre las personas.

#### Amplitud de control
Cuántas personas dependen directamente de un jefe determina la forma de la estructura:

| Estructura | Rasgos |
| --- | --- |
| **Alta** (muchos niveles, poca gente por jefe) | **Costosa**; la comunicación se **filtra** al pasar por muchos niveles |
| **Plana** (pocos niveles, mucha gente por jefe) | Exige **delegación** y personas **competentes** |

#### Departamentalización
Es la forma de agrupar las actividades:

* **Funcional**
* **Geográfica**
* **Por clientes**
* **Por productos**
* **Matricial**
* **Unidades Estratégicas de Negocio (UEN)**

#### Autoridad, poder, delegación y empowerment
* **Autoridad:** el **derecho que da el puesto** a decidir y mandar.
* **Poder:** la **capacidad de influir** en otros, venga o no del puesto.
* **Delegación:** **transferir autoridad** a un subordinado.
* **Empowerment:** permite **decidir sin autorización previa**.

#### Relaciones de línea y de staff
* **Línea:** áreas **operativas**, ligadas a la misión de la organización.
* **Staff:** áreas de **asesoría** y apoyo.

#### Cultura organizacional
Son los **valores compartidos** de la organización. Los entornos pueden ser **autocráticos** (decide el jefe) o **participativos** (se involucra al equipo).

#### Vacíos por completar (Nota de estado)
El desarrollo del módulo es **detallado**. Faltan los **procesos técnicos de selección de Recursos Humanos**: **pruebas**, **entrevistas** y **diseño del puesto**, que el programa del curso sí incluye.`,

  direccion: `#### Qué es dirigir
La **dirección** es la **tercera función** del proceso administrativo cíclico (planeación → organización → **dirección** → control). Consiste en **influir en las personas** para que contribuyan a las metas de la organización.

#### Liderazgo y comunicación
* **Liderazgo:** se contrasta el liderazgo **directivo o autocrático** con el liderazgo **participativo**.
* **Comunicación:** se contrasta la comunicación **descendente** (de arriba hacia abajo) con la **multidireccional**.

#### Vacíos por completar (Nota de estado)
El desarrollo en el material recibido es **incipiente**. Faltan:

* **Teorías de motivación.**
* **Trabajo en equipo.**

El programa del curso incluye las habilidades de un director: **liderar, comunicar, motivar y trabajar en equipo**. Pendiente: completarlas con la clase y con Koontz, Weihrich y Cannice o Robbins y Coulter (ver Bibliografía).

> Los módulos 5 a 7 todavía no se han visto en clase, por eso no tienen desarrollo.`,
};
