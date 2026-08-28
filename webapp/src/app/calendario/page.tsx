import { prisma } from "@/lib/prisma";
import { listSubjects } from "@/lib/subjects";
import { CalendarMonth, type CalEvent } from "@/components/calendar-month";
import { AddEventForm } from "@/components/add-event-form";
import { HelpHint } from "@/components/help-hint";
import { deletePersonalEvent } from "@/lib/actions/events";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

function bogotaNow(): Date {
  return new Date(Date.now() - 5 * 60 * 60 * 1000);
}

export default async function CalendarioPage({ searchParams }: { searchParams: { m?: string } }) {
  const now = bogotaNow();
  let year = now.getUTCFullYear();
  let month = now.getUTCMonth();
  if (searchParams.m && /^\d{4}-\d{2}$/.test(searchParams.m)) {
    const [y, mo] = searchParams.m.split("-").map(Number);
    year = y;
    month = mo - 1;
  }

  const monthStart = new Date(Date.UTC(year, month, 1));
  const monthEnd = new Date(Date.UTC(year, month + 1, 1));

  const [subjects, keyDates, sessions, events] = await Promise.all([
    listSubjects(),
    prisma.keyDate.findMany({
      where: { date: { gte: monthStart, lt: monthEnd } },
      select: { id: true, name: true, date: true, subject: { select: { id: true, code: true } } },
    }),
    prisma.session.findMany({
      where: { date: { gte: monthStart, lt: monthEnd } },
      select: { id: true, topic: true, date: true, moduleId: true, module: { select: { subjectId: true, subject: { select: { code: true } } } } },
    }),
    prisma.personalEvent.findMany({
      where: { date: { gte: monthStart, lt: monthEnd } },
      orderBy: { date: "asc" },
    }),
  ]);

  const codeById = new Map(subjects.map((s) => [s.id, s.code]));

  const calEvents: CalEvent[] = [
    ...keyDates.map((d): CalEvent => ({
      id: `k-${d.id}`,
      day: new Date(d.date as Date).getUTCDate(),
      title: d.name,
      subjectCode: d.subject.code,
      kind: "parcial",
      href: `/${d.subject.id}/fechas/${d.id}/preparar`,
    })),
    ...sessions.map((s): CalEvent => ({
      id: `s-${s.id}`,
      day: new Date(s.date as Date).getUTCDate(),
      title: s.topic,
      subjectCode: s.module.subject.code,
      kind: "clase",
      href: `/${s.module.subjectId}/modulos/${s.moduleId}`,
    })),
    ...events.map((e): CalEvent => ({
      id: `e-${e.id}`,
      day: new Date(e.date).getUTCDate(),
      title: e.title,
      subjectCode: e.subjectId ? codeById.get(e.subjectId) ?? null : null,
      kind: "evento",
      href: null,
    })),
  ];

  const prevM = month === 0 ? `${year - 1}-12` : `${year}-${String(month).padStart(2, "0")}`;
  const nextM = month === 11 ? `${year + 1}-01` : `${year}-${String(month + 2).padStart(2, "0")}`;
  const todayDay = now.getUTCFullYear() === year && now.getUTCMonth() === month ? now.getUTCDate() : null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="flex items-center gap-1.5 text-2xl font-bold">
          Calendario
          <HelpHint text="Todas las fechas de las 7 asignaturas + fechas de clase + tus eventos personales, en un solo mes. Los parciales enlazan a 'preparar'." />
        </h1>
        <AddEventForm subjects={subjects.map((s) => ({ id: s.id, code: s.code }))} />
      </div>

      <CalendarMonth
        year={year}
        month={month}
        events={calEvents}
        prevHref={`/calendario?m=${prevM}`}
        nextHref={`/calendario?m=${nextM}`}
        todayDay={todayDay}
      />

      {events.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Eventos personales este mes</h2>
          <ul className="flex flex-col divide-y divide-border rounded-md border border-border">
            {events.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-2 p-3 text-sm">
                <span>
                  <span className="font-medium">{e.title}</span>
                  {e.subjectId && <span className="ml-2 text-xs text-primary">{codeById.get(e.subjectId)}</span>}
                  {e.note && <span className="ml-2 text-xs text-muted-foreground">{e.note}</span>}
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{formatDate(e.date)}</span>
                  <form action={deletePersonalEvent.bind(null, e.id)}>
                    <button type="submit" className="text-xs text-muted-foreground hover:text-destructive">quitar</button>
                  </form>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
