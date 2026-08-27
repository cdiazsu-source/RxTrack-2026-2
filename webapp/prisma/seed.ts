/**
 * Sincroniza el temario de `content/<code>.ts` hacia la base de datos.
 *
 * Es IDEMPOTENTE: se puede correr las veces que haga falta. Actualiza los campos
 * de contenido y AGREGA lo que falte, pero nunca borra ni sobrescribe el avance
 * de la persona:
 *   - Subject:  no toca attendanceMissed, weeklyGoal, driveUrl.
 *   - Module:   no toca status, driveUrl, notesUrl, labReportStatus. Solo módulos
 *               con fromContent=true.
 *   - KeyDate:  no toca `date`.  EvaluationItem: no toca `grade`.
 *   - Project:  no toca status, driveUrl, bitácora ni checklist. Solo isManual=false.
 *   - Glosario/Fórmula/Bibliografía: se emparejan por texto; si renombras algo en
 *     el content se crea una fila nueva y la vieja se queda (seguro: solo agrega).
 *   - Nada con fromContent=false / isManual=true (creado dentro de la app).
 */
import { PrismaClient } from "@prisma/client";
import { ALL_SUBJECTS } from "../../content";

const prisma = new PrismaClient();

async function seedSubject(content: (typeof ALL_SUBJECTS)[number], order: number) {
  const subjectData = {
    code: content.code,
    name: content.name,
    credits: content.credits ?? null,
    professors: content.professors ?? [],
    scheduleTheory: content.scheduleTheory ?? null,
    scheduleLab: content.scheduleLab ?? null,
    descriptionSummary: content.descriptionSummary ?? null,
    objectiveGeneral: content.objectiveGeneral ?? null,
    objectivesSpecific: content.objectivesSpecific ?? [],
    hasLab: content.hasLab ?? false,
    totalClasses: content.totalClasses ?? 32,
    order,
    syncedAt: new Date(),
  };

  const subject = await prisma.subject.upsert({
    where: { id: content.slug },
    create: { id: content.slug, ...subjectData },
    update: subjectData,
  });

  // --- Módulos: emparejar por (subjectId, slug) ---
  const moduleIdBySlug = new Map<string, string>();
  const modules = content.modules ?? [];
  for (let i = 0; i < modules.length; i++) {
    const m = modules[i];
    const row = await prisma.module.upsert({
      where: { subjectId_slug: { subjectId: subject.id, slug: m.slug } },
      create: {
        subjectId: subject.id,
        slug: m.slug,
        title: m.title,
        description: m.description,
        order: i,
        hasLab: m.hasLab ?? false,
        labProtocol: m.labProtocol ?? null,
        fromContent: true,
      },
      update: {
        title: m.title,
        description: m.description,
        order: i,
        hasLab: m.hasLab ?? false,
        labProtocol: m.labProtocol ?? null,
      },
    });
    moduleIdBySlug.set(m.slug, row.id);
  }
  const modId = (slug?: string | null) => (slug ? moduleIdBySlug.get(slug) ?? null : null);

  // --- Glosario: emparejar por (subjectId, term), solo fromContent ---
  for (const g of content.glossary ?? []) {
    const existing = await prisma.glossaryTerm.findFirst({
      where: { subjectId: subject.id, term: g.term, fromContent: true },
      select: { id: true },
    });
    const data = { definition: g.definition, moduleId: modId(g.moduleSlug) };
    if (existing) {
      await prisma.glossaryTerm.update({ where: { id: existing.id }, data });
    } else {
      await prisma.glossaryTerm.create({
        data: { subjectId: subject.id, term: g.term, fromContent: true, ...data },
      });
    }
  }

  // --- Fórmulas: emparejar por (subjectId, name), solo fromContent ---
  for (const f of content.formulas ?? []) {
    const existing = await prisma.formula.findFirst({
      where: { subjectId: subject.id, name: f.name, fromContent: true },
      select: { id: true },
    });
    const data = {
      expression: f.expression,
      variables: f.variables ?? "",
      description: f.description ?? "",
      derivation: f.derivation ?? "",
      moduleId: modId(f.moduleSlug),
    };
    if (existing) {
      await prisma.formula.update({ where: { id: existing.id }, data });
    } else {
      await prisma.formula.create({
        data: { subjectId: subject.id, name: f.name, fromContent: true, ...data },
      });
    }
  }

  // --- Fechas clave: emparejar por (subjectId, name). NUNCA se toca `date`. ---
  for (const d of content.keyDates ?? []) {
    const existing = await prisma.keyDate.findFirst({
      where: { subjectId: subject.id, name: d.name, fromContent: true },
      select: { id: true },
    });
    const data = { weight: d.weight ?? null, note: d.note ?? null };
    if (existing) {
      await prisma.keyDate.update({ where: { id: existing.id }, data });
    } else {
      await prisma.keyDate.create({
        data: { subjectId: subject.id, name: d.name, fromContent: true, ...data },
      });
    }
  }

  // --- Evaluación: emparejar por (subjectId, name). NUNCA se toca `grade`. ---
  const evals = content.evaluation ?? [];
  for (let i = 0; i < evals.length; i++) {
    const e = evals[i];
    const existing = await prisma.evaluationItem.findFirst({
      where: { subjectId: subject.id, name: e.name },
      select: { id: true },
    });
    const data = { weight: e.weight, order: i };
    if (existing) {
      await prisma.evaluationItem.update({ where: { id: existing.id }, data });
    } else {
      await prisma.evaluationItem.create({ data: { subjectId: subject.id, name: e.name, ...data } });
    }
  }

  // --- Bibliografía: emparejar por (subjectId, reference), solo fromContent ---
  for (const b of content.bibliography ?? []) {
    const existing = await prisma.bibliographyItem.findFirst({
      where: { subjectId: subject.id, reference: b.reference, fromContent: true },
      select: { id: true },
    });
    const data = { kind: b.kind, url: b.url ?? null, moduleId: modId(b.moduleSlug) };
    if (existing) {
      await prisma.bibliographyItem.update({ where: { id: existing.id }, data });
    } else {
      await prisma.bibliographyItem.create({
        data: { subjectId: subject.id, reference: b.reference, fromContent: true, ...data },
      });
    }
  }

  // --- Proyectos fijos de la asignatura: emparejar por (subjectId, title), solo isManual=false ---
  const projects = content.projects ?? [];
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const existing = await prisma.project.findFirst({
      where: { subjectId: subject.id, title: p.title, isManual: false },
      select: { id: true },
    });
    const data = { category: p.category ?? null, order: i };
    if (existing) {
      await prisma.project.update({ where: { id: existing.id }, data });
    } else {
      await prisma.project.create({
        data: { subjectId: subject.id, title: p.title, isManual: false, ...data },
      });
    }
  }

  const modCount = modules.length;
  console.log(`  ${content.code.padEnd(4)} ${content.name} — ${modCount} módulo(s)`);
}

async function main() {
  console.log("Sincronizando temario desde content/ …");
  for (let i = 0; i < ALL_SUBJECTS.length; i++) {
    await seedSubject(ALL_SUBJECTS[i], i);
  }

  await prisma.semesterMeta.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });

  console.log("Listo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
