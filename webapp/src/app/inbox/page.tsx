import { prisma } from "@/lib/prisma";
import { listSubjects } from "@/lib/subjects";
import { InboxList, type InboxItemView, type SubjectRef } from "@/components/inbox-list";
import { HelpHint } from "@/components/help-hint";

export const dynamic = "force-dynamic";

export default async function InboxPage() {
  const [rows, subjects] = await Promise.all([
    prisma.inboxItem.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
    listSubjects(),
  ]);

  const modulesBySubject = await prisma.module.findMany({
    orderBy: { order: "asc" },
    select: { id: true, title: true, subjectId: true },
  });

  const items: InboxItemView[] = rows.map((r) => ({
    id: r.id,
    text: r.text,
    url: r.url,
    subjectId: r.subjectId,
    triagedAt: r.triagedAt ? r.triagedAt.toISOString() : null,
    createdAt: r.createdAt.toISOString(),
  }));

  const subjectRefs: SubjectRef[] = subjects.map((s) => ({
    id: s.id,
    code: s.code,
    name: s.name,
    modules: modulesBySubject.filter((m) => m.subjectId === s.id).map((m) => ({ id: m.id, title: m.title })),
  }));

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="flex items-center gap-1.5 text-2xl font-bold">
          Bandeja de captura
          <HelpHint text="Todo lo que capturas con + o Ctrl+Shift+K cae aquí. Clasifícalo a una asignatura, conviértelo en subtarea de un módulo, o márcalo como listo." />
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Vaciar la bandeja = nada se te pierde y nada te distrae mientras estudias.</p>
      </div>
      <InboxList items={items} subjects={subjectRefs} />
    </div>
  );
}
