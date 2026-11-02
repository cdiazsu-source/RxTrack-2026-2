"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Check, CheckCheck, CircleDashed, ExternalLink, Pencil, Plus, Timer, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  MALLA_STATUSES,
  MALLA_STATUS_LABEL,
  mallaTotals,
  type MallaRow,
  type MallaStatus,
} from "@/lib/malla";
import { MALLA_AREA_LABEL } from "@/lib/malla-plan";
import { addMallaSubject, deleteMallaSubject, markSemesterPassed, setMallaStatus, updateMallaSubject } from "@/lib/actions/malla";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LABEL = "flex flex-col gap-1 text-xs font-medium text-muted-foreground";
const SELECT = "h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"];

const NEXT_STATUS: Record<MallaStatus, MallaStatus> = { PENDIENTE: "EN_CURSO", EN_CURSO: "APROBADA", APROBADA: "PENDIENTE" };

const CARD_TONE: Record<MallaStatus, string> = {
  PENDIENTE: "border-dashed border-border bg-card",
  EN_CURSO: "border-primary/50 bg-primary/10",
  APROBADA: "border-success/40 bg-success/10",
};

const STATUS_ICON: Record<MallaStatus, typeof Check> = { PENDIENTE: CircleDashed, EN_CURSO: Timer, APROBADA: Check };
const ICON_TONE: Record<MallaStatus, string> = {
  PENDIENTE: "text-muted-foreground",
  EN_CURSO: "text-primary",
  APROBADA: "text-success",
};

function SubjectForm({
  row,
  semester,
  action,
  onDone,
  submitLabel,
}: {
  row?: MallaRow;
  semester: number;
  action: (fd: FormData) => Promise<void>;
  onDone: () => void;
  submitLabel: string;
}) {
  const [status, setStatus] = useState<MallaStatus>(row?.status ?? "PENDIENTE");
  return (
    <form
      action={async (fd) => {
        await action(fd);
        onDone();
      }}
      className="flex flex-col gap-2 rounded-md border border-border bg-background p-2.5"
    >
      <input type="hidden" name="semester" value={semester} />
      <label className={LABEL}>
        Asignatura
        <Input name="name" required maxLength={140} defaultValue={row?.name ?? ""} autoFocus placeholder="Nombre" />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className={LABEL}>
          Créditos
          <Input name="credits" type="number" min={1} max={99} defaultValue={row?.credits ?? ""} />
        </label>
        <label className={LABEL}>
          Estado
          <select name="status" value={status} onChange={(e) => setStatus(e.target.value as MallaStatus)} className={SELECT}>
            {MALLA_STATUSES.map((s) => (
              <option key={s} value={s}>
                {MALLA_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
        {status === "APROBADA" && (
          <label className={LABEL}>
            Nota (0–5)
            <Input name="grade" inputMode="decimal" defaultValue={row?.grade ?? ""} placeholder="4.2" />
          </label>
        )}
        <label className={cn(LABEL, status !== "APROBADA" && "col-span-2")}>
          Área
          <Input name="area" maxLength={60} defaultValue={row?.area ?? ""} placeholder="F, BM, LE…" list="malla-areas" />
        </label>
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm">
          {submitLabel}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onDone}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

function SubjectCard({ row, semester, canEdit }: { row: MallaRow; semester: number; canEdit: boolean }) {
  const [editing, setEditing] = useState(false);
  const [pending, start] = useTransition();
  const Icon = STATUS_ICON[row.status];

  if (editing) {
    return (
      <SubjectForm
        row={row}
        semester={semester}
        action={(fd) => updateMallaSubject(row.id, fd)}
        onDone={() => setEditing(false)}
        submitLabel="Guardar"
      />
    );
  }

  return (
    <div className={cn("group flex items-start gap-2 rounded-lg border p-2 transition-colors", CARD_TONE[row.status], pending && "opacity-60")}>
      {canEdit ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => setMallaStatus(row.id, NEXT_STATUS[row.status]))}
          title={`${MALLA_STATUS_LABEL[row.status]} — clic para pasar a «${MALLA_STATUS_LABEL[NEXT_STATUS[row.status]]}»`}
          aria-label={`${row.name}: ${MALLA_STATUS_LABEL[row.status]}. Cambiar a ${MALLA_STATUS_LABEL[NEXT_STATUS[row.status]]}`}
          className="press mt-0.5 shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Icon className={cn("h-[18px] w-[18px]", ICON_TONE[row.status])} aria-hidden />
        </button>
      ) : (
        <Icon className={cn("mt-0.5 h-[18px] w-[18px] shrink-0", ICON_TONE[row.status])} aria-label={MALLA_STATUS_LABEL[row.status]} />
      )}
      <div className="min-w-0 flex-1">
        <p className={cn("text-[13px] font-medium leading-snug", row.status === "PENDIENTE" && "text-muted-foreground")}>{row.name}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-muted-foreground">
          {row.credits != null && <span>{row.credits} cr</span>}
          {row.area && <span title={MALLA_AREA_LABEL[row.area] ?? row.area}>· {row.area}</span>}
          {row.grade != null && <span className="font-semibold text-success">· {row.grade.toFixed(1)}</span>}
        </p>
        {row.subjectSlug && (
          <Link href={`/${row.subjectSlug}`} className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline">
            <ExternalLink className="h-3 w-3" aria-hidden />
            Abrir en la app
          </Link>
        )}
      </div>
      {canEdit && (
        <div className="flex shrink-0 gap-0.5 opacity-100 lg:opacity-0 lg:transition-opacity lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label={`Editar ${row.name}`}
            className="press rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (confirm(`¿Quitar «${row.name}» de la malla?`)) start(() => deleteMallaSubject(row.id));
            }}
            aria-label={`Quitar ${row.name}`}
            className="press rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

function SemesterColumn({ semester, rows, canEdit, current }: { semester: number; rows: MallaRow[]; canEdit: boolean; current: boolean }) {
  const [adding, setAdding] = useState(false);
  const [pending, start] = useTransition();
  const t = mallaTotals(rows);
  const done = t.credits.APROBADA;
  const pendingCount = t.counts.PENDIENTE;
  const pctDone = t.totalCredits > 0 ? (done / t.totalCredits) * 100 : t.count > 0 ? (t.counts.APROBADA / t.count) * 100 : 0;
  const pctNow = t.totalCredits > 0 ? (t.credits.EN_CURSO / t.totalCredits) * 100 : t.count > 0 ? (t.counts.EN_CURSO / t.count) * 100 : 0;

  return (
    <section
      aria-label={`Semestre ${ROMAN[semester - 1] ?? semester}`}
      className={cn("flex flex-col gap-2 rounded-xl border bg-card p-2.5", current ? "border-primary ring-1 ring-primary/40" : "border-border")}
    >
      <header className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-base font-semibold">
            Semestre {ROMAN[semester - 1] ?? semester}
            {current && <span className="ml-1.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-primary">actual</span>}
          </h2>
          <span className="text-xs text-muted-foreground">
            {done}/{t.totalCredits} cr
          </span>
        </div>
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={Math.round(pctDone)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-success transition-[width] duration-300" style={{ width: `${pctDone}%` }} />
          <div className="h-full bg-primary/60 transition-[width] duration-300" style={{ width: `${pctNow}%` }} />
        </div>
      </header>

      <div className="flex flex-col gap-1.5">
        {rows.map((r) => (
          <SubjectCard key={r.id} row={r} semester={semester} canEdit={canEdit} />
        ))}
        {rows.length === 0 && <p className="px-1 py-2 text-xs text-muted-foreground">Sin asignaturas todavía.</p>}
      </div>

      {canEdit &&
        (adding ? (
          <SubjectForm semester={semester} action={addMallaSubject} onDone={() => setAdding(false)} submitLabel="Añadir" />
        ) : (
          <div className="flex flex-wrap gap-1">
            <Button type="button" size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setAdding(true)}>
              <Plus className="h-3 w-3" aria-hidden />
              Añadir
            </Button>
            {pendingCount > 0 && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                disabled={pending}
                onClick={() => {
                  if (confirm(`¿Marcar como vistas las ${pendingCount} asignaturas «por ver» del semestre ${ROMAN[semester - 1] ?? semester}?`))
                    start(() => markSemesterPassed(semester));
                }}
                title="Marca como vistas todas las que siguen «por ver» (las que están en curso no se tocan)"
              >
                <CheckCheck className="h-3 w-3" aria-hidden />
                Todo visto
              </Button>
            )}
          </div>
        ))}
    </section>
  );
}

/** Tablero de la malla: una columna por semestre, tarjetas que cambian de estado con un clic. */
export function MallaBoard({ rows, canEdit }: { rows: MallaRow[]; canEdit: boolean }) {
  const maxSemester = Math.max(10, ...rows.map((r) => r.semester));
  const semesters = Array.from({ length: maxSemester }, (_, i) => i + 1);
  // «Actual»: el semestre con más asignaturas en curso (el del plan que se está cursando).
  const nowCount = (s: number) => rows.filter((r) => r.semester === s && r.status === "EN_CURSO").length;
  const currentSemester = semesters.reduce((best, s) => (nowCount(s) > nowCount(best) ? s : best), 1);
  const hasCurrent = nowCount(currentSemester) > 0;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <datalist id="malla-areas">
        {Object.entries(MALLA_AREA_LABEL).map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </datalist>
      {semesters.map((s) => (
        <SemesterColumn key={s} semester={s} rows={rows.filter((r) => r.semester === s)} canEdit={canEdit} current={hasCurrent && s === currentSemester} />
      ))}
    </div>
  );
}
