/**
 * Exporta todas las tablas a webapp/backups/backup-<fecha>.json.
 * Útil antes de una migración grande o para archivar el cierre de semestre.
 * La restauración desde ese JSON es manual (script ad-hoc de reinserción).
 */
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dump = {
    exportedAt: new Date().toISOString(),
    subjects: await prisma.subject.findMany(),
    modules: await prisma.module.findMany(),
    sessions: await prisma.session.findMany(),
    checklistItems: await prisma.checklistItem.findMany(),
    resources: await prisma.resource.findMany(),
    labMaterials: await prisma.labMaterial.findMany(),
    projects: await prisma.project.findMany(),
    projectNotes: await prisma.projectNote.findMany(),
    glossaryTerms: await prisma.glossaryTerm.findMany(),
    formulas: await prisma.formula.findMany(),
    keyDates: await prisma.keyDate.findMany(),
    evaluationItems: await prisma.evaluationItem.findMany(),
    bibliographyItems: await prisma.bibliographyItem.findMany(),
    pastMaterials: await prisma.pastMaterial.findMany(),
    semesterMeta: await prisma.semesterMeta.findMany(),
    inboxItems: await prisma.inboxItem.findMany(),
  };

  const dir = path.resolve(__dirname, "../backups");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `backup-${new Date().toISOString().slice(0, 10)}.json`);
  fs.writeFileSync(file, JSON.stringify(dump, null, 2), "utf-8");
  console.log(`Respaldo escrito en ${file}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
