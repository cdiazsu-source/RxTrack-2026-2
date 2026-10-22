"use server";

import { prisma } from "@/lib/prisma";
import { developerModeOn } from "@/lib/session";
import { getSubjectBySlug } from "@/lib/subjects";
import { DEV_SECTION_KEYS, type DevSectionKey } from "@/lib/dev-section";
import { buildDevPrompt } from "@/lib/dev-context";
import { formatDate } from "@/lib/utils";

const MAX_LIST = 25;
const clip = (s: string, n = 70) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const list = (items: string[]) => (items.length > MAX_LIST ? [...items.slice(0, MAX_LIST), `… y ${items.length - MAX_LIST} más`] : items).join("; ");
const countBy = <T,>(rows: T[], f: (r: T) => string) => {
  const m = new Map<string, number>();
  for (const r of rows) m.set(f(r), (m.get(f(r)) ?? 0) + 1);
  return [...m.entries()].map(([k, n]) => `${k}: ${n}`).join(", ") || "ninguno";
};

/** Datos reales (solo conteos y títulos, nada sensible) de la sección que se está viendo. */
async function liveLines(key: DevSectionKey, subjectId: string, entityId: string | null): Promise<string[]> {
  const where = { subjectId };
  const lines: string[] = [];

  switch (key) {
    case "panel": {
      const [modules, sessions, items, dates] = await Promise.all([
        prisma.module.findMany({ where, select: { status: true } }),
        prisma.session.count({ where: { module: where } }),
        prisma.evaluationItem.findMany({ where, select: { name: true, weight: true, owner: true } }),
        prisma.keyDate.count({ where: { ...where, date: { not: null } } }),
      ]);
      lines.push(`Módulos: ${modules.length} (${countBy(modules, (m) => m.status)}).`);
      lines.push(`Apuntes (sesiones) guardados: ${sessions}. Fechas con día puesto: ${dates}.`);
      lines.push(`Componentes de evaluación (todos los dueños): ${items.length}.`);
      break;
    }
    case "modulos": {
      const mods = await prisma.module.findMany({
        where,
        orderBy: { order: "asc" },
        select: { title: true, status: true, hasLab: true, fromContent: true, _count: { select: { sessions: true, checklistItems: true } } },
      });
      lines.push(`${mods.length} módulos: ${list(mods.map((m) => `«${clip(m.title)}» [${m.status}, ${m._count.sessions} apuntes, ${m._count.checklistItems} subtareas${m.hasLab ? ", con lab" : ""}${m.fromContent ? "" : ", creado en la app"}]`))}.`);
      break;
    }
    case "modulo-detalle": {
      if (!entityId) break;
      const m = await prisma.module.findFirst({
        where: { id: entityId, subjectId },
        select: {
          title: true,
          status: true,
          hasLab: true,
          labReportStatus: true,
          chapter: true,
          sessions: { select: { status: true } },
          checklistItems: { select: { done: true } },
          _count: { select: { exercises: true, resources: true, labMaterials: true } },
        },
      });
      if (!m) break;
      const [g, f] = await Promise.all([prisma.glossaryTerm.count({ where: { moduleId: entityId } }), prisma.formula.count({ where: { moduleId: entityId } })]);
      lines.push(`Módulo abierto: «${m.title}» (estado ${m.status}${m.hasLab ? `, con laboratorio, informe ${m.labReportStatus ?? "sin estado"}` : ", sin laboratorio"}).`);
      lines.push(`Apuntes: ${m.sessions.length} (${countBy(m.sessions, (s) => s.status)}). Checklist: ${m.checklistItems.filter((c) => c.done).length}/${m.checklistItems.length}.`);
      lines.push(`Ejercicios: ${m._count.exercises}. Recursos: ${m._count.resources}. Materiales de lab: ${m._count.labMaterials}. Glosario ligado: ${g}. Fórmulas ligadas: ${f}.`);
      lines.push(`Desarrollo del módulo (chapter): ${m.chapter ? `${m.chapter.length} caracteres` : "no tiene"}.`);
      break;
    }
    case "laboratorio": {
      const [reports, links, logCount] = await Promise.all([
        prisma.labReport.findMany({ where, select: { title: true, status: true } }),
        prisma.labModuleLink.count({ where }),
        prisma.labPracticeNote.count({ where }),
      ]);
      lines.push(`Informes de laboratorio creados: ${reports.length} (${countBy(reports, (r) => r.status)}). Enlaces por agrupación: ${links}. Entradas de bitácora de prácticas: ${logCount}.`);
      if (reports.length) lines.push(`Informes: ${list(reports.map((r) => `«${clip(r.title)}»`))}.`);
      break;
    }
    case "proyectos": {
      const ps = await prisma.project.findMany({
        where,
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        select: { title: true, status: true, isManual: true, _count: { select: { checklistItems: true, notes: true } } },
      });
      lines.push(`${ps.length} proyectos: ${list(ps.map((p) => `«${clip(p.title)}» [${p.status}, ${p._count.checklistItems} subtareas, ${p._count.notes} notas${p.isManual ? ", propio" : ""}]`))}.`);
      break;
    }
    case "proyecto-detalle": {
      if (!entityId) break;
      const p = await prisma.project.findFirst({
        where: { id: entityId, subjectId },
        select: {
          title: true,
          category: true,
          status: true,
          focusMinutes: true,
          description: true,
          checklistItems: { select: { done: true } },
          _count: { select: { notes: true, links: true, members: true } },
        },
      });
      if (!p) break;
      lines.push(`Proyecto abierto: «${p.title}»${p.category ? ` (${p.category})` : ""}, estado ${p.status}.`);
      lines.push(`Subtareas: ${p.checklistItems.filter((c) => c.done).length}/${p.checklistItems.length}. Notas de bitácora: ${p._count.notes}. Enlaces: ${p._count.links}. Integrantes: ${p._count.members}. Minutos de enfoque acumulados: ${p.focusMinutes}.`);
      lines.push(`Descripción de contexto: ${p.description ? `${p.description.length} caracteres` : "no tiene"}.`);
      break;
    }
    case "fechas": {
      const ds = await prisma.keyDate.findMany({ where, orderBy: { date: "asc" } });
      lines.push(`${ds.length} fechas: ${list(ds.map((d) => `«${clip(d.name)}»${d.weight ? ` (${d.weight})` : ""} — ${d.date ? formatDate(d.date) : "sin día"}${d.moduleIds.length ? `, cubre ${d.moduleIds.length} módulo(s)` : ""}`))}.`);
      break;
    }
    case "preparar-parcial": {
      if (!entityId) break;
      const d = await prisma.keyDate.findFirst({ where: { id: entityId, subjectId } });
      if (!d) break;
      const [past, mods] = await Promise.all([prisma.pastMaterial.count({ where }), prisma.module.count({ where })]);
      lines.push(`Parcial abierto: «${d.name}»${d.weight ? ` (${d.weight})` : ""}, ${d.date ? formatDate(d.date) : "sin día puesto"}.`);
      lines.push(`Módulos marcados como parte del parcial: ${d.moduleIds.length} de ${mods}${d.moduleIds.length ? "" : " (ninguno: se muestra todo el temario)"}.`);
      lines.push(`Insumos de la asignatura: ${past}.`);
      break;
    }
    case "repaso": {
      const now = new Date();
      const [cards, due] = await Promise.all([
        prisma.flashcard.findMany({ where, select: { source: true, suspended: true, reps: true } }),
        prisma.flashcard.count({ where: { ...where, suspended: false, reps: { gt: 0 }, dueDate: { lte: now } } }),
      ]);
      lines.push(`Tarjetas: ${cards.length} (${countBy(cards, (c) => c.source)}). Nuevas sin repasar: ${cards.filter((c) => c.reps === 0 && !c.suspended).length}. Vencidas hoy: ${due}. Suspendidas: ${cards.filter((c) => c.suspended).length}.`);
      break;
    }
    case "glosario": {
      const gs = await prisma.glossaryTerm.findMany({ where, select: { moduleId: true, fromContent: true, definition: true } });
      lines.push(`Términos: ${gs.length} (${gs.filter((g) => g.fromContent).length} del archivo de contenido, ${gs.filter((g) => !g.fromContent).length} creados en la app). Sin módulo ligado: ${gs.filter((g) => !g.moduleId).length}.`);
      break;
    }
    case "formulas": {
      const fs = await prisma.formula.findMany({ where, select: { moduleId: true, fromContent: true, derivation: true, examples: true } });
      lines.push(`Fórmulas: ${fs.length} (${fs.filter((f) => f.fromContent).length} del contenido). Sin módulo: ${fs.filter((f) => !f.moduleId).length}. Con desarrollo: ${fs.filter((f) => f.derivation).length}. Con ejemplos resueltos: ${fs.filter((f) => f.examples.length).length}.`);
      break;
    }
    case "bibliografia": {
      const bs = await prisma.bibliographyItem.findMany({ where, select: { kind: true, url: true, moduleId: true } });
      lines.push(`Referencias: ${bs.length} (${countBy(bs, (b) => b.kind)}). Con enlace propio: ${bs.filter((b) => b.url).length}. Ligadas a un módulo: ${bs.filter((b) => b.moduleId).length}.`);
      break;
    }
    case "insumos": {
      const ps = await prisma.pastMaterial.findMany({ where, orderBy: { createdAt: "desc" }, select: { title: true, kind: true, semester: true, patterns: true, url: true, moduleId: true } });
      lines.push(`Insumos: ${ps.length} (${countBy(ps, (p) => p.kind)}). Con «patrones» escritos: ${ps.filter((p) => p.patterns).length}. Con enlace: ${ps.filter((p) => p.url).length}. Ligados a un módulo: ${ps.filter((p) => p.moduleId).length}.`);
      if (ps.length) lines.push(`Títulos: ${list(ps.map((p) => `«${clip(p.title)}»${p.semester ? ` (${p.semester})` : ""}`))}.`);
      break;
    }
    case "prompt-ia": {
      const n = await prisma.module.count({ where });
      lines.push(`El prompt se arma con ${n} módulo(s) (título y descripción).`);
      break;
    }
  }
  return lines;
}

/**
 * Prompt del modo desarrollador para la sección indicada. Devuelve null si no hay modo
 * desarrollador activo (solo Cesar, sin «Ver como») o si la sección no existe.
 */
export async function getDevPrompt(slug: string, key: string, entityId: string | null): Promise<string | null> {
  if (!(await developerModeOn())) return null;
  if (!(DEV_SECTION_KEYS as readonly string[]).includes(key)) return null;
  const subject = await getSubjectBySlug(slug);
  if (!subject) return null;

  const live = await liveLines(key as DevSectionKey, subject.id, entityId);
  return buildDevPrompt({
    key: key as DevSectionKey,
    subject: { id: subject.id, code: subject.code, name: subject.name, sections: subject.sections },
    live,
    today: formatDate(new Date()),
  });
}
