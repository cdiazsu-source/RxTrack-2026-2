import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type CalEvent = {
  id: string;
  day: number; // día del mes (1..31)
  title: string;
  subjectCode: string | null;
  kind: "parcial" | "clase" | "evento";
  href: string | null;
};

const KIND_DOT: Record<CalEvent["kind"], string> = {
  parcial: "bg-warning",
  clase: "bg-primary",
  evento: "bg-muted-foreground",
};

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const WEEKDAYS = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

export function CalendarMonth({
  year,
  month, // 0-indexed
  events,
  prevHref,
  nextHref,
  todayDay,
}: {
  year: number;
  month: number;
  events: CalEvent[];
  prevHref: string;
  nextHref: string;
  todayDay: number | null; // día del mes si el mes mostrado es el actual, si no null
}) {
  const first = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  // getUTCDay: 0=domingo. Queremos lunes primero.
  const startOffset = (first.getUTCDay() + 6) % 7;

  const byDay = new Map<number, CalEvent[]>();
  for (const e of events) {
    const arr = byDay.get(e.day) ?? [];
    arr.push(e);
    byDay.set(e.day, arr);
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <Link href={prevHref} className="press rounded-md p-1 text-muted-foreground hover:bg-accent" aria-label="Mes anterior">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <p className="text-sm font-semibold capitalize">{MONTHS[month]} {year}</p>
        <Link href={nextHref} className="press rounded-md p-1 text-muted-foreground hover:bg-accent" aria-label="Mes siguiente">
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-7 border-b border-border text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-2">{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((d, i) => (
          <div
            key={i}
            className={cn(
              "min-h-[92px] border-b border-r border-border p-1.5 last:border-r-0",
              i % 7 === 6 && "border-r-0",
              d === null && "bg-muted/30",
            )}
          >
            {d !== null && (
              <>
                <span
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs tabular-nums",
                    d === todayDay ? "bg-primary font-semibold text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  {d}
                </span>
                <div className="mt-1 flex flex-col gap-0.5">
                  {(byDay.get(d) ?? []).slice(0, 4).map((e) => {
                    const inner = (
                      <span className="flex items-center gap-1 truncate">
                        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", KIND_DOT[e.kind])} />
                        {e.subjectCode && <span className="font-medium">{e.subjectCode}</span>}
                        <span className="truncate">{e.title}</span>
                      </span>
                    );
                    return e.href ? (
                      <Link key={e.id} href={e.href} className="rounded px-1 py-0.5 text-[11px] leading-tight hover:bg-accent">
                        {inner}
                      </Link>
                    ) : (
                      <span key={e.id} className="px-1 py-0.5 text-[11px] leading-tight">{inner}</span>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
