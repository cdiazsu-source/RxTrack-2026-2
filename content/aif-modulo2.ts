import type { LabModuleContent, LabPracticeContent } from "./_schema";
import { aifModulo2PracticasA } from "./aif-modulo2-a";
import { aifModulo2PracticasB } from "./aif-modulo2-b";
import { aifModulo2PracticasC } from "./aif-modulo2-c";

/**
 * AIF — Laboratorio del Módulo II (Prof. Nicolás Mateo González): métodos
 * físicos (refractometría, polarimetría) y espectrofotometría UV-Visible.
 * Subgrupo J5 del grupo de los jueves: Karen Lizeth Pachón Cañón + César Díaz
 * Suárez. Fuentes: «Guías Practicas de laboratorio - Módulo II» (docx) y el
 * cronograma/muestras del grupo (J5). Este archivo NO es una asignatura: lo
 * importa `aif.ts` (por eso no está en `content/index.ts`).
 *
 * Numeración (por agrupación): sigue el cronograma del grupo, no los títulos
 * de la guía (que fusiona «Práctica 1 y 2» y «Práctica 3 y 4»):
 *   1 Refractometría · 2 Polarimetría · 3 Cuantificación UV · 4 Cuantificación Vis
 *   (+ constante de equilibrio/isosbéstico) · 5 Determinación del pKa · 6 Aditividad.
 */
export const aifLabModuloII: LabModuleContent = {
  name: "Módulo II",
  subtitle:
    "Semanas 6–10 · Prof. Nicolás Mateo González · métodos físicos (refractometría, polarimetría) y espectrofotometría UV-Visible (cuantificación, pKa, aditividad de absorbancias). Subgrupo **J5**, grupo de los jueves.",
  team: ["Karen Lizeth Pachón Cañón", "César Díaz Suárez"],
  rules: [
    "**Dónde y cuándo:** Laboratorio 120, Edificio 500 (Facultad de Ciencias Agrarias), grupo de los **jueves, 8:00–13:00** (mismo espacio y reglas de seguridad/EPP que el Módulo I: bata, zapatos cerrados, gafas y guantes según el riesgo; no comer ni beber; residuos según el Sistema de Gestión Ambiental).",
    "**Trabajo en parejas — subgrupo J5:** Karen Lizeth Pachón Cañón y César Díaz Suárez. La guía pide que **cada integrante prepare su muestra por el mismo procedimiento**, para obtener un **duplicado independiente** de cada medida.",
    "**Muestras asignadas al subgrupo J5:** Refractometría → **etanol + agua** · Polarimetría → **sacarosa + ácido ascórbico** · Cuantificación UV → **ibuprofeno (IBU)** · Cuantificación Vis → **verde de bromocresol** · Aditividad de absorbancias → **AC + CAF** (cafeína; «AC» sin definir en el cronograma: confirmar si es acetaminofén o ácido acetilsalicílico) · Determinación del pKa → **ácido gálico**.",
    "**Cronograma del J5 — semanas 1 y 2 del módulo:** extracción del activo para UV · preparación de la **solución de NaOH (250 mL)** · cuantificación UV · cuantificación Vis · polarimetría · refractometría.  **Semanas 3 y 4:** aditividad de absorbancias · determinación del pKa · **prácticas restantes**.",
    "**Cómo se numera aquí:** Práctica 1 = refractometría, 2 = polarimetría, 3 = cuantificación UV, 4 = cuantificación Vis (incluye constante de equilibrio y punto isosbéstico), 5 = determinación del pKa, 6 = aditividad. La **guía oficial** agrupa «Práctica 1 y 2» (métodos no espectroscópicos), «Práctica 3 y 4» (UV-Vis), «Práctica 5» (pKa) y «Práctica 6» (aditividad): cada informe lleva los nombres de los integrantes.",
    "**Tratamiento estadístico común (curvas de calibración):** gráfica de calibración, **regresión lineal por mínimos cuadrados** (pendiente, intercepto, R²), **ANOVA** de la regresión, **incertidumbre** de pendiente e intercepto, **análisis de residuos** (¿modelo homocedástico o heterocedástico?) y **%RSD de cada nivel**. En espectrofotometría, trabajar en el rango de absorbancia **0,17–0,85 UA**, con 5 niveles y 2 réplicas, y volúmenes de madre calculados con **C₁V₁ = C₂V₂**.",
    "**Equipo UV-Vis:** verificar que esté calibrado y operativo; blanco con el mismo disolvente; celda de **1 cm** sin burbujas y con caras limpias (papel sin pelusa); **cuarzo** para UV (< ≈ 340 nm); de ser posible, tomar todos los valores del barrido para graficar en Excel o, si no, **foto de los resultados** del equipo.",
    "**Evaluación:** según el programa, el **parcial práctico** del Módulo II cubre las prácticas 1 a 4 y se discuten y evalúan los informes. Confirma con el docente fecha, alcance y formato de entrega.",
    "**Pendientes por aclarar con el docente:** (1) qué es «AC» en AC + CAF; (2) el juego exacto de pH en la Práctica 5 (la guía menciona «2–10» y «2–12», y las dos tablas listan valores distintos); (3) a qué corresponden las soluciones A2 y B2 de la Práctica 4; (4) qué espera exactamente como «método de las pendientes» para el pKa.",
  ],
};

export const aifLabPracticesModuloII: LabPracticeContent[] = [
  ...aifModulo2PracticasA,
  ...aifModulo2PracticasB,
  ...aifModulo2PracticasC,
];
