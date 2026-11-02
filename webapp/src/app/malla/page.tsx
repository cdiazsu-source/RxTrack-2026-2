import { redirect } from "next/navigation";
import { Network } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { MALLA_STATUS_LABEL, asMallaStatus, canUseMalla, componentProgress, mallaTotals, type ComponentProgress, type MallaRow } from "@/lib/malla";
import { MALLA_GRADE_THRESHOLD, MALLA_PLAN_CREDITS } from "@/lib/malla-plan";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressRing } from "@/components/progress-ring";
import { ProgressBar } from "@/components/ui/progress";
import { MallaBoard } from "@/components/malla-board";
import { LoadPlanButton, MallaImport } from "@/components/malla-import";

export const dynamic = "force-dynamic";

export default async function MallaPage() {
  const session = await getSession();
  if (!canUseMalla(session)) redirect("/");

  const found = await prisma.mallaSubject.findMany({ orderBy: [{ semester: "asc" }, { order: "asc" }, { createdAt: "asc" }] });
  const rows: MallaRow[] = found.map((r) => ({
    id: r.id,
    semester: r.semester,
    name: r.name,
    credits: r.credits,
    area: r.area,
    status: asMallaStatus(r.status),
    grade: r.grade,
    subjectSlug: r.subjectSlug,
  }));
  const t = mallaTotals(rows);
  const total = t.totalCredits || MALLA_PLAN_CREDITS;
  const missing = t.credits.PENDIENTE;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Network className="h-6 w-6 text-primary" aria-hidden />
          Malla académica
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tu carrera semestre a semestre: lo que ya viste, lo que cursas y lo que falta. Toca el círculo de una asignatura para cambiar su estado.
        </p>
      </div>

      {rows.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-start gap-3 pt-5">
            <p className="text-sm">
              Carga el plan de estudios de Farmacia (UNAL, Acuerdo 511 de 2023: 10 semestres, {MALLA_PLAN_CREDITS} créditos). Lo que cursas ahora queda «en
              curso» y enlazado a su asignatura; lo demás, «por ver», y después marcas lo que ya viste.
            </p>
            <LoadPlanButton primary />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-5">
            <ProgressRing value={(t.credits.APROBADA / total) * 100} size={88} sublabel="créditos vistos" />
            <div className="grid min-w-[14rem] flex-1 gap-3 sm:grid-cols-3">
              <Stat label={MALLA_STATUS_LABEL.APROBADA} value={t.credits.APROBADA} unit="cr" sub={`${t.counts.APROBADA} asignaturas`} tone="text-success" />
              <Stat label={MALLA_STATUS_LABEL.EN_CURSO} value={t.credits.EN_CURSO} unit="cr" sub={`${t.counts.EN_CURSO} asignaturas`} tone="text-primary" />
              <Stat label="Faltan" value={missing} unit="cr" sub={`${t.counts.PENDIENTE} asignaturas`} />
            </div>
            <div className="flex min-w-[14rem] flex-1 flex-col gap-2">
              <ProgressBar
                value={(t.credits.APROBADA / MALLA_GRADE_THRESHOLD) * 100}
                label={`${Math.min(t.credits.APROBADA, MALLA_GRADE_THRESHOLD)}/${MALLA_GRADE_THRESHOLD} para el trabajo de grado`}
              />
              <p className="text-xs text-muted-foreground">
                {t.credits.APROBADA >= MALLA_GRADE_THRESHOLD
                  ? "Ya tienes los créditos (80 % del plan) que exige el trabajo de grado."
                  : `Te faltan ${MALLA_GRADE_THRESHOLD - t.credits.APROBADA} créditos para el 80 % que exige el trabajo de grado.`}
                {t.average != null && ` · Promedio ponderado: ${t.average.toFixed(2)}`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {rows.length > 0 && (
        <>
          <Card>
            <CardContent className="grid gap-x-8 gap-y-3 pt-5 sm:grid-cols-2 lg:grid-cols-3">
              {componentProgress(rows).map((c) => (
                <ComponentBar key={c.key} c={c} />
              ))}
            </CardContent>
          </Card>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground" aria-label="Leyenda">
            <li>○ Por ver</li>
            <li className="text-primary">◔ En curso</li>
            <li className="text-success">✓ Vista</li>
            <li>Créditos: barra verde = vistos, magenta = en curso</li>
            <li>Toca el nombre de una materia para ver qué necesita y qué desbloquea</li>
          </ul>
          <MallaBoard rows={rows} canEdit />
          <div className="flex flex-wrap items-start gap-3">
            <LoadPlanButton />
            <span className="text-xs text-muted-foreground">Vuelve a pulsarlo si quieres recuperar filas del plan que borraste.</span>
          </div>
        </>
      )}

      <MallaImport />
    </div>
  );
}

/** Avance de un componente del plan: créditos vistos (verde) y en curso (magenta) sobre los exigidos. */
function ComponentBar({ c }: { c: ComponentProgress }) {
  const shown = Math.min(c.done, c.required);
  const surplus = c.done - c.required;
  const nowPct = Math.min(c.inProgress, Math.max(0, c.required - shown));
  const complete = c.done >= c.required;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-medium">{c.label}</span>
        <span className={complete ? "font-semibold text-success" : "text-muted-foreground"}>
          {shown}/{c.required} cr{surplus > 0 && ` (+${surplus})`}
          {c.inProgress > 0 && !complete && ` · ${c.inProgress} en curso`}
        </span>
      </div>
      <div
        className="flex h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-label={c.label}
        aria-valuenow={Math.round((shown / c.required) * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full bg-success" style={{ width: `${(shown / c.required) * 100}%` }} />
        <div className="h-full bg-primary/60" style={{ width: `${(nowPct / c.required) * 100}%` }} />
      </div>
    </div>
  );
}

function Stat({ label, value, unit, sub, tone }: { label: string; value: number; unit: string; sub: string; tone?: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold leading-tight ${tone ?? ""}`}>
        {value}
        <span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span>
      </p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
