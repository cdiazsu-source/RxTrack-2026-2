"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export type SearchHit = {
  kind: "modulo" | "apunte" | "glosario" | "formula" | "nota" | "recurso" | "fecha" | "proyecto" | "flashcard";
  title: string;
  snippet: string;
  href: string;
  subjectCode: string;
};

const KIND_LABEL: Record<SearchHit["kind"], string> = {
  modulo: "Módulo",
  apunte: "Apunte",
  glosario: "Glosario",
  formula: "Fórmula",
  nota: "Bitácora",
  recurso: "Recurso",
  fecha: "Fecha",
  proyecto: "Proyecto",
  flashcard: "Tarjeta",
};

export { KIND_LABEL };

function clip(s: string, q: string): string {
  const flat = s.replace(/\s+/g, " ").trim();
  const i = flat.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return flat.slice(0, 120);
  const start = Math.max(0, i - 40);
  return (start > 0 ? "… " : "") + flat.slice(start, start + 140) + (flat.length > start + 140 ? " …" : "");
}

/** Búsqueda global (Ctrl+K) sobre todo el contenido de las 7 asignaturas. */
export async function search(query: string): Promise<SearchHit[]> {
  if (!(await getSession()).authed) return [];
  const q = query.trim();
  if (q.length < 2) return [];
  const contains = { contains: q, mode: "insensitive" as const };

  const subjects = await prisma.subject.findMany({ select: { id: true, code: true } });
  const code = new Map(subjects.map((s) => [s.id, s.code]));

  const [modules, sessions, glossary, formulas, notes, resources, dates, projects, cards] = await Promise.all([
    prisma.module.findMany({
      where: { OR: [{ title: contains }, { description: contains }] },
      select: { id: true, title: true, description: true, subjectId: true },
      take: 8,
    }),
    prisma.session.findMany({
      where: { OR: [{ topic: contains }, { content: contains }, { transcript: contains }] },
      select: { id: true, topic: true, content: true, moduleId: true, module: { select: { subjectId: true } } },
      take: 10,
    }),
    prisma.glossaryTerm.findMany({
      where: { OR: [{ term: contains }, { definition: contains }] },
      select: { id: true, term: true, definition: true, subjectId: true },
      take: 10,
    }),
    prisma.formula.findMany({
      where: { OR: [{ name: contains }, { description: contains }, { derivation: contains }] },
      select: { id: true, name: true, description: true, subjectId: true },
      take: 8,
    }),
    prisma.projectNote.findMany({
      where: { body: contains },
      select: { id: true, body: true, project: { select: { id: true, title: true, subjectId: true } } },
      take: 8,
    }),
    prisma.resource.findMany({
      where: { name: contains },
      select: { id: true, name: true, url: true, module: { select: { id: true, subjectId: true } } },
      take: 6,
    }),
    prisma.keyDate.findMany({
      where: { OR: [{ name: contains }, { note: contains }] },
      select: { id: true, name: true, note: true, subjectId: true },
      take: 6,
    }),
    prisma.project.findMany({
      where: { title: contains },
      select: { id: true, title: true, subjectId: true },
      take: 6,
    }),
    prisma.flashcard.findMany({
      where: { OR: [{ front: contains }, { back: contains }] },
      select: { id: true, front: true, back: true, subjectId: true },
      take: 6,
    }),
  ]);

  const hits: SearchHit[] = [];
  for (const m of modules)
    hits.push({ kind: "modulo", title: m.title, snippet: clip(m.description, q), href: `/${m.subjectId}/modulos/${m.id}`, subjectCode: code.get(m.subjectId) ?? "" });
  for (const s of sessions)
    hits.push({ kind: "apunte", title: s.topic, snippet: clip(s.content || "", q), href: `/${s.module.subjectId}/modulos/${s.moduleId}`, subjectCode: code.get(s.module.subjectId) ?? "" });
  for (const g of glossary)
    hits.push({ kind: "glosario", title: g.term, snippet: clip(g.definition, q), href: `/${g.subjectId}/glosario`, subjectCode: code.get(g.subjectId) ?? "" });
  for (const f of formulas)
    hits.push({ kind: "formula", title: f.name, snippet: clip(f.description || "", q), href: `/${f.subjectId}/formulas`, subjectCode: code.get(f.subjectId) ?? "" });
  for (const n of notes)
    hits.push({ kind: "nota", title: n.project.title, snippet: clip(n.body, q), href: `/${n.project.subjectId}/proyectos/${n.project.id}`, subjectCode: code.get(n.project.subjectId) ?? "" });
  for (const r of resources)
    hits.push({ kind: "recurso", title: r.name, snippet: r.url, href: `/${r.module.subjectId}/modulos/${r.module.id}`, subjectCode: code.get(r.module.subjectId) ?? "" });
  for (const d of dates)
    hits.push({ kind: "fecha", title: d.name, snippet: clip(d.note || "", q), href: `/${d.subjectId}/fechas`, subjectCode: code.get(d.subjectId) ?? "" });
  for (const p of projects)
    hits.push({ kind: "proyecto", title: p.title, snippet: "", href: `/${p.subjectId}/proyectos/${p.id}`, subjectCode: code.get(p.subjectId) ?? "" });
  for (const c of cards)
    hits.push({ kind: "flashcard", title: clip(c.front, q).slice(0, 80), snippet: clip(c.back, q), href: `/${c.subjectId}/repaso`, subjectCode: code.get(c.subjectId) ?? "" });

  return hits.slice(0, 40);
}
