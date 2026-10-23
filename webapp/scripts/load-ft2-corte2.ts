/**
 * Carga en la base el material de sesiones del SEGUNDO CORTE de Farmacotecnia 2.
 * Uso (desde webapp/):  npx tsx scripts/load-ft2-corte2.ts [--dry]
 *
 * Reglas (nunca pisa tu trabajo):
 *  - «complete»: solo rellena el apunte de una sesión existente si su `content` está VACÍO.
 *  - «add»: crea la sesión de refuerzo solo si no existe otra con el mismo tema en ese módulo.
 *  - Checklist de estudio: agrega ítems nuevos por texto (no toca los existentes ni su estado).
 *  - «2do Parcial»: si no tiene módulos asignados, le pone los Módulos 3 y 4.
 */
import { prisma } from "../src/lib/prisma";
import { sesionesM3, type SesionSpec } from "../../content/ft2-corte2-sesiones-m3";
import { sesionesM4 } from "../../content/ft2-corte2-sesiones-m4";

const DRY = process.argv.includes("--dry");
const SUBJECT = "ft2";
const AUTHOR = "Refuerzo didáctico";

const CHECKLIST: Record<string, string[]> = {
  "coloides-reologia": [
    "Dibujar de memoria la curva DLVO y rotular V_t, V_m y V_p",
    "Explicar qué le pasa a V_m al subir la sal y al subir la valencia (Schulze–Hardy)",
    "Calcular una velocidad de Stokes con unidades y decir qué palanca pesa más",
    "Clasificar 5 fluidos como newtoniano, pseudoplástico, dilatante o plástico",
    "Hacer los ejercicios resueltos del módulo sin ver la solución",
    "Repasar las tarjetas de glosario y fórmulas del módulo",
  ],
  suspensiones: [
    "Decir la función de cada uno de los 10 ingredientes de la suspensión de sulfametazina",
    "Reproducir la tabla floculado vs defloculado (8 filas)",
    "Calcular F y β e interpretarlos",
    "Explicar las 3 zonas de la floculación controlada con electrolito",
    "Hacer el cálculo de pesadas de una suspensión de 120 mL",
    "Hacer el simulacro del módulo sin ver las soluciones",
  ],
};

async function main() {
  const modules = await prisma.module.findMany({ where: { subjectId: SUBJECT }, select: { id: true, slug: true } });
  const idOf = (slug: string) => modules.find((m) => m.slug === slug)?.id;
  const log: string[] = [];

  for (const spec of [...sesionesM3, ...sesionesM4] as SesionSpec[]) {
    const moduleId = idOf(spec.moduleSlug);
    if (!moduleId) {
      log.push(`✗ módulo no encontrado: ${spec.moduleSlug}`);
      continue;
    }
    if (spec.kind === "complete") {
      const found = await prisma.session.findFirst({ where: { moduleId, topic: { startsWith: spec.topic } } });
      if (!found) log.push(`✗ no existe la sesión a completar: «${spec.topic.slice(0, 50)}…»`);
      else if (found.content.trim()) log.push(`= ya tiene apuntes, no se toca: «${found.topic.slice(0, 50)}…»`);
      else {
        if (!DRY) {
          await prisma.session.update({
            where: { id: found.id },
            data: { content: spec.content, status: found.status === "REVISADA" ? "REVISADA" : "CORNELL_IA" },
          });
        }
        log.push(`✔ completada: «${found.topic.slice(0, 50)}…» (${spec.content.length} car.)`);
      }
    } else {
      const exists = await prisma.session.findFirst({ where: { moduleId, topic: spec.topic } });
      if (exists) log.push(`= ya existe: «${spec.topic.slice(0, 60)}…»`);
      else {
        if (!DRY) {
          await prisma.session.create({
            data: { moduleId, topic: spec.topic, content: spec.content, author: AUTHOR, status: "CORNELL_IA" },
          });
        }
        log.push(`＋ creada: «${spec.topic.slice(0, 60)}…» (${spec.content.length} car.)`);
      }
    }
  }

  for (const [slug, items] of Object.entries(CHECKLIST)) {
    const moduleId = idOf(slug);
    if (!moduleId) continue;
    const have = await prisma.checklistItem.findMany({ where: { moduleId }, select: { text: true, order: true } });
    let order = Math.max(-1, ...have.map((h) => h.order)) + 1;
    let added = 0;
    for (const text of items) {
      if (have.some((h) => h.text === text)) continue;
      if (!DRY) await prisma.checklistItem.create({ data: { moduleId, text, order: order++ } });
      added++;
    }
    log.push(`☑ checklist ${slug}: +${added}`);
  }

  const m3 = idOf("coloides-reologia");
  const m4 = idOf("suspensiones");
  const kd = await prisma.keyDate.findFirst({ where: { subjectId: SUBJECT, name: "2do Parcial" } });
  if (kd && m3 && m4) {
    if (kd.moduleIds.length === 0) {
      if (!DRY) await prisma.keyDate.update({ where: { id: kd.id }, data: { moduleIds: [m3, m4] } });
      log.push("📅 «2do Parcial» → Módulos 3 y 4");
    } else log.push("= «2do Parcial» ya tenía módulos asignados");
  }

  console.log(DRY ? "— SIMULACRO (no se escribió nada) —" : "— HECHO —");
  console.log(log.join("\n"));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(() => process.exit(0));
