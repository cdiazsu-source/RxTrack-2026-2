import { prisma } from "@/lib/prisma";
import type { FeedItem } from "@/components/updates-feed";

/**
 * "Últimas actualizaciones": mezcla notas de bitácora + subtareas completadas
 * (de proyectos Y de módulos), ordenadas por fecha. Para cada subtarea
 * completada calcula la barra del padre y la siguiente pendiente ("lo que sigue").
 *
 * Si `subjectId` se pasa, filtra a esa asignatura; si no, es el feed cruzado.
 */
export async function buildFeed(opts: { subjectId?: string; limit?: number }): Promise<FeedItem[]> {
  const limit = opts.limit ?? 18;
  const sid = opts.subjectId;

  const noteWhere = sid ? { project: { subjectId: sid } } : {};
  const doneWhere = sid
    ? { done: true, OR: [{ project: { subjectId: sid } }, { module: { subjectId: sid } }] }
    : { done: true };

  const [notes, doneItems, subjects] = await Promise.all([
    prisma.projectNote.findMany({
      where: noteWhere,
      orderBy: { createdAt: "desc" },
      take: 25,
      select: {
        id: true,
        body: true,
        author: true,
        createdAt: true,
        project: { select: { id: true, title: true, subject: { select: { id: true } } } },
      },
    }),
    prisma.checklistItem.findMany({
      where: doneWhere,
      orderBy: { updatedAt: "desc" },
      take: 25,
      select: {
        id: true,
        text: true,
        updatedAt: true,
        moduleId: true,
        projectId: true,
        module: { select: { id: true, title: true, subjectId: true } },
        project: { select: { id: true, title: true, subjectId: true } },
      },
    }),
    prisma.subject.findMany({ select: { id: true, code: true } }),
  ]);

  const codeOf = new Map(subjects.map((s) => [s.id, s.code]));

  // Contadores de checklist por padre (para la barra) + siguiente pendiente.
  const parentKeys = new Set<string>();
  for (const it of doneItems) {
    parentKeys.add(it.moduleId ? `m:${it.moduleId}` : `p:${it.projectId}`);
  }
  const parentStats = new Map<string, { done: number; total: number; next: string | null }>();
  await Promise.all(
    [...parentKeys].map(async (key) => {
      const [type, id] = key.split(":");
      const items = await prisma.checklistItem.findMany({
        where: type === "m" ? { moduleId: id } : { projectId: id },
        orderBy: { order: "asc" },
        select: { done: true, text: true },
      });
      const done = items.filter((i) => i.done).length;
      const next = items.find((i) => !i.done)?.text ?? null;
      parentStats.set(key, { done, total: items.length, next });
    }),
  );

  const noteItems: FeedItem[] = notes.map((n) => ({
    kind: "note" as const,
    id: n.id,
    body: n.body,
    author: n.author,
    at: n.createdAt.toISOString(),
    parentKey: `p:${n.project.id}`,
    parentLabel: `${codeOf.get(n.project.subject.id) ?? ""} · ${n.project.title}`,
    parentHref: `/${n.project.subject.id}/proyectos/${n.project.id}`,
  }));

  const checkItems: FeedItem[] = doneItems.map((it) => {
    const isModule = !!it.moduleId;
    const parentKey = isModule ? `m:${it.moduleId}` : `p:${it.projectId}`;
    const stats = parentStats.get(parentKey) ?? { done: 0, total: 0, next: null };
    const subjectId = isModule ? it.module!.subjectId : it.project!.subjectId;
    const title = isModule ? it.module!.title : it.project!.title;
    const href = isModule
      ? `/${subjectId}/modulos/${it.moduleId}`
      : `/${subjectId}/proyectos/${it.projectId}`;
    return {
      kind: "check" as const,
      id: it.id,
      text: it.text,
      at: it.updatedAt.toISOString(),
      parentKey,
      parentLabel: `${codeOf.get(subjectId) ?? ""} · ${title}`,
      parentHref: href,
      nextText: stats.next,
      allDone: stats.total > 0 && stats.done === stats.total,
      done: stats.done,
      total: stats.total,
    };
  });

  return [...noteItems, ...checkItems]
    .sort((a, b) => +new Date(b.at) - +new Date(a.at))
    .slice(0, limit);
}
