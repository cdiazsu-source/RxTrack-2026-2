"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  Check,
  CheckCheck,
  ChevronDown,
  ChevronsDownUp,
  ChevronsUpDown,
  CircleDashed,
  ExternalLink,
  Lock,
  Pencil,
  Plus,
  Timer,
  Trash2,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  MALLA_STATUSES,
  MALLA_STATUS_LABEL,
  buildGraph,
  isAvailable,
  mallaTotals,
  missingFor,
  relatedRows,
  requirementsOf,
  type MallaGraph,
  type MallaRow,
  type MallaStatus,
} from "@/lib/malla";
import { MALLA_AREA_LABEL } from "@/lib/malla-plan";
import { addMallaSubject, deleteMallaSubject, markSemesterPassed, setMallaStatus, updateMallaSubject } from "@/lib/actions/malla";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LABEL = "flex flex-col gap-1 text-xs font-medium text-muted-foreground";
const SELECT = "h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground";

const COLLAPSE_KEY = "rxtrack:malla:collapsed";

/** all = todo · unseen = lo que no está visto (por ver + en curso) · available = por ver con prerrequisitos cumplidos. */
type Filter = "all" | "unseen" | "available";

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

/** Cómo se relaciona una tarjeta con la materia seleccionada. */
type Relation = "self" | "needs" | "unlocks" | null;

const RELATION_RING: Record<Exclude<Relation, null>, string> = {
  self: "ring-2 ring-primary",
  needs: "ring-2 ring-warning",
  unlocks: "ring-2 ring-success",
};

function SubjectCard({
  row,
  semester,
  canEdit,
  relation,
  missing,
  available,
  onSelect,
}: {
  row: MallaRow;
  semester: number;
  canEdit: boolean;
  relation: Relation;
  /** Prerrequisitos que faltan (solo para las que siguen «por ver» y cuyos requisitos se conocen). */
  missing: string[] | null;
  available: boolean;
  onSelect: () => void;
}) {
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
    <div
      className={cn(
        "group flex items-start gap-2 rounded-lg border p-2 transition-colors",
        CARD_TONE[row.status],
        relation && RELATION_RING[relation],
        pending && "opacity-60",
      )}
    >
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
        <button
          type="button"
          onClick={onSelect}
          aria-pressed={relation === "self"}
          title="Ver qué necesita y qué desbloquea"
          className={cn(
            "block text-left text-[13px] font-medium leading-snug outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring",
            row.status === "PENDIENTE" && "text-muted-foreground",
          )}
        >
          {row.name}
        </button>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-muted-foreground">
          {row.credits != null && <span>{row.credits} cr</span>}
          {row.area && <span title={MALLA_AREA_LABEL[row.area] ?? row.area}>· {row.area}</span>}
          {row.grade != null && <span className="font-semibold text-success">· {row.grade.toFixed(1)}</span>}
        </p>
        {available && <p className="mt-1 text-[11px] font-semibold text-success">Disponible: ya puedes verla</p>}
        {missing && missing.length > 0 && (
          <p className="mt-1 flex items-start gap-1 text-[11px] text-muted-foreground" title={`Falta: ${missing.join(", ")}`}>
            <Lock className="mt-px h-3 w-3 shrink-0" aria-hidden />
            <span>
              Falta: {missing[0]}
              {missing.length > 1 && ` y ${missing.length - 1} más`}
            </span>
          </p>
        )}
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

function SemesterColumn({
  semester,
  rows,
  shown,
  renderCard,
  canEdit,
  current,
  collapsed,
  onToggle,
}: {
  semester: number;
  /** Todas las del semestre (los totales no cambian con el filtro). */
  rows: MallaRow[];
  /** Las que pasan el filtro activo. */
  shown: MallaRow[];
  renderCard: (row: MallaRow) => React.ReactNode;
  canEdit: boolean;
  current: boolean;
  collapsed: boolean;
  onToggle: () => void;
}) {
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
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-controls={`malla-sem-${semester}`}
          title={collapsed ? "Expandir el semestre" : "Contraer el semestre"}
          className="press flex items-center justify-between gap-2 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <h2 className="flex min-w-0 items-center gap-1 font-display text-base font-semibold">
            <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", collapsed && "-rotate-90")} aria-hidden />
            <span className="truncate">Semestre {ROMAN[semester - 1] ?? semester}</span>
            {current && <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-primary">actual</span>}
          </h2>
          <span className="shrink-0 text-xs text-muted-foreground">
            {done}/{t.totalCredits} cr
          </span>
        </button>
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={Math.round(pctDone)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-success transition-[width] duration-300" style={{ width: `${pctDone}%` }} />
          <div className="h-full bg-primary/60 transition-[width] duration-300" style={{ width: `${pctNow}%` }} />
        </div>
      </header>

      <div id={`malla-sem-${semester}`} className={cn("flex flex-col gap-1.5", collapsed && "hidden")}>
        {shown.map((r) => renderCard(r))}
        {rows.length === 0 && <p className="px-1 py-2 text-xs text-muted-foreground">Sin asignaturas todavía.</p>}
        {rows.length > 0 && shown.length === 0 && <p className="px-1 py-2 text-xs text-muted-foreground">Nada que mostrar con este filtro.</p>}
      </div>

      {canEdit && !collapsed &&
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

  // Semestres contraídos: se recuerdan en este navegador (si el almacenamiento no está disponible, no pasa nada).
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(COLLAPSE_KEY) ?? "[]");
      if (Array.isArray(saved)) setCollapsed(new Set(saved.filter((n): n is number => Number.isInteger(n))));
    } catch {
      /* sin almacenamiento: arranca todo expandido */
    }
  }, []);
  const update = (next: Set<number>) => {
    setCollapsed(next);
    try {
      localStorage.setItem(COLLAPSE_KEY, JSON.stringify([...next]));
    } catch {
      /* ignorar */
    }
  };
  const toggle = (s: number) => {
    const next = new Set(collapsed);
    if (!next.delete(s)) next.add(s);
    update(next);
  };
  const isDone = (s: number) => {
    const sem = rows.filter((r) => r.semester === s);
    return sem.length > 0 && sem.every((r) => r.status === "APROBADA");
  };
  const doneSemesters = semesters.filter(isDone);
  const allCollapsed = collapsed.size >= semesters.length;

  // Requisitos: qué necesita y qué desbloquea la materia elegida, y cuáles están disponibles ahora.
  const graph: MallaGraph = buildGraph(rows);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = rows.find((r) => r.id === selectedId) ?? null;
  const related = selected ? relatedRows(selected, graph) : null;
  const relationOf = (r: MallaRow): Relation =>
    !selected ? null : r.id === selected.id ? "self" : related!.needs.some((n) => n.id === r.id) ? "needs" : related!.unlocks.some((u) => u.id === r.id) ? "unlocks" : null;
  const selectedReq = selected ? requirementsOf(selected.name) : null;

  const [filter, setFilter] = useState<Filter>("all");
  const passes = (r: MallaRow) =>
    filter === "all" ? true : filter === "unseen" ? r.status !== "APROBADA" : isAvailable(r, graph);
  const availableCount = rows.filter((r) => isAvailable(r, graph)).length;
  const unseenCount = rows.filter((r) => r.status !== "APROBADA").length;
  const visibleSemesters = semesters.filter((s) => filter === "all" || rows.some((r) => r.semester === s && passes(r)));

  return (
    <div className="flex flex-col gap-3">
      <div role="group" aria-label="Qué asignaturas mostrar" className="flex flex-wrap items-center gap-1.5">
        {(
          [
            ["all", "Todas", rows.length],
            ["unseen", "Solo lo pendiente", unseenCount],
            ["available", "Disponibles ahora", availableCount],
          ] as [Filter, string, number][]
        ).map(([key, label, n]) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={cn(
              "press rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              filter === key ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {label} <span className="opacity-75">({n})</span>
          </button>
        ))}
      </div>

      {selected && related && (
        <div role="status" className="flex items-start gap-3 rounded-lg border border-primary/40 bg-primary/5 p-3 text-sm">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-semibold">{selected.name}</p>
            {selectedReq ? (
              <>
                <p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-warning">Necesita: </span>
                  {related.needs.length > 0 || selectedReq.minCredits != null ? (
                    <>
                      {related.needs.map((n, i) => (
                        <span key={n.id}>
                          {i > 0 && ", "}
                          {n.name}
                          <span className={n.status === "APROBADA" ? "text-success" : "text-muted-foreground"}>
                            {" "}
                            ({n.status === "APROBADA" ? "vista" : MALLA_STATUS_LABEL[n.status].toLowerCase()})
                          </span>
                        </span>
                      ))}
                      {selectedReq.minCredits != null && (
                        <span>
                          {related.needs.length > 0 && ", "}
                          {selectedReq.minCredits} créditos vistos
                          <span className={graph.viewedCredits >= selectedReq.minCredits ? "text-success" : "text-muted-foreground"}>
                            {" "}
                            (llevas {graph.viewedCredits})
                          </span>
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-muted-foreground">nada, se puede ver desde el inicio</span>
                  )}
                </p>
                {selectedReq.coreq.length > 0 && (
                  <p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Se cursa junto con: </span>
                    {selectedReq.coreq.join(", ")}
                  </p>
                )}
                <p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-success">Desbloquea: </span>
                  {related.unlocks.length > 0 ? (
                    related.unlocks.map((u) => u.name).join(", ")
                  ) : (
                    <span className="text-muted-foreground">ninguna materia del plan</span>
                  )}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Esta fila (optativa, libre elección o materia propia) no tiene prerrequisitos registrados en el plan.</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            aria-label="Cerrar"
            className="press rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" variant="outline" onClick={() => update(allCollapsed ? new Set() : new Set(semesters))}>
          {allCollapsed ? <ChevronsUpDown className="h-3.5 w-3.5" aria-hidden /> : <ChevronsDownUp className="h-3.5 w-3.5" aria-hidden />}
          {allCollapsed ? "Expandir todo" : "Contraer todo"}
        </Button>
        {doneSemesters.length > 0 && (
          <Button type="button" size="sm" variant="ghost" onClick={() => update(new Set([...collapsed, ...doneSemesters]))}>
            Contraer los ya vistos ({doneSemesters.length})
          </Button>
        )}
        <span className="text-xs text-muted-foreground">
          {semesters.length - collapsed.size} de {semesters.length} semestres abiertos
        </span>
      </div>
      <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <datalist id="malla-areas">
        {Object.entries(MALLA_AREA_LABEL).map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </datalist>
      {visibleSemesters.map((s) => (
        <SemesterColumn
          key={s}
          semester={s}
          rows={rows.filter((r) => r.semester === s)}
          shown={rows.filter((r) => r.semester === s && passes(r))}
          renderCard={(r) => (
            <SubjectCard
              key={r.id}
              row={r}
              semester={s}
              canEdit={canEdit}
              relation={relationOf(r)}
              missing={r.status === "PENDIENTE" ? missingFor(r, graph) : null}
              available={isAvailable(r, graph)}
              onSelect={() => setSelectedId(selectedId === r.id ? null : r.id)}
            />
          )}
          canEdit={canEdit}
          current={hasCurrent && s === currentSemester}
          collapsed={collapsed.has(s)}
          onToggle={() => toggle(s)}
        />
      ))}
      </div>
    </div>
  );
}
