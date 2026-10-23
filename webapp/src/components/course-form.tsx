"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  COURSE_MODALITIES,
  COURSE_MODALITY_LABEL,
  COURSE_STATUSES,
  COURSE_STATUS_LABEL,
} from "@/lib/courses";
import { dateInputValue } from "@/lib/utils";

export type CourseFormValues = {
  title: string;
  provider: string | null;
  modality: string | null;
  status: string;
  goal: string | null;
  instructor: string | null;
  schedule: string | null;
  location: string | null;
  startDate: string | null; // ISO
  endDate: string | null; // ISO
  totalSessions: number | null;
};

const LABEL = "flex flex-col gap-1 text-xs font-medium text-muted-foreground";
const SELECT = "h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground";

/** Alta y edición de un curso: lo esencial arriba, el detalle plegado. */
export function CourseForm({
  course,
  action,
  onDone,
  submitLabel,
}: {
  course?: CourseFormValues;
  action: (fd: FormData) => Promise<void>;
  onDone?: () => void;
  submitLabel: string;
}) {
  const day = (iso: string | null | undefined) => (iso ? dateInputValue(new Date(iso)) : "");
  return (
    <form
      action={async (fd) => {
        await action(fd);
        onDone?.();
      }}
      className="flex flex-col gap-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={`${LABEL} sm:col-span-2`}>
          Nombre del curso
          <Input name="title" required maxLength={140} defaultValue={course?.title ?? ""} placeholder="SAP — módulo de finanzas" autoFocus={!course} />
        </label>
        <label className={LABEL}>
          Modalidad
          <select name="modality" defaultValue={course?.modality ?? ""} className={SELECT}>
            <option value="">Sin definir</option>
            {COURSE_MODALITIES.map((m) => (
              <option key={m} value={m}>
                {COURSE_MODALITY_LABEL[m]}
              </option>
            ))}
          </select>
        </label>
        <label className={LABEL}>
          Estado
          <select name="status" defaultValue={course?.status ?? "EN_CURSO"} className={SELECT}>
            {COURSE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {COURSE_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
        <label className={`${LABEL} sm:col-span-2`}>
          ¿Para qué lo tomo?
          <Textarea name="goal" rows={2} maxLength={2000} defaultValue={course?.goal ?? ""} placeholder="Lo que quiero poder hacer al terminar" />
        </label>
      </div>

      <details className="rounded-md border border-border" open={!!course}>
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">Más detalles (institución, horario, fechas…)</summary>
        <div className="grid gap-3 border-t border-border p-3 sm:grid-cols-2">
          <label className={LABEL}>
            Institución o plataforma
            <Input name="provider" maxLength={140} defaultValue={course?.provider ?? ""} placeholder="SENA, Coursera, instituto…" />
          </label>
          <label className={LABEL}>
            Docente
            <Input name="instructor" maxLength={140} defaultValue={course?.instructor ?? ""} />
          </label>
          <label className={LABEL}>
            Horario
            <Input name="schedule" maxLength={200} defaultValue={course?.schedule ?? ""} placeholder="Sábados 8:00–12:00" />
          </label>
          <label className={LABEL}>
            Lugar o enlace de conexión
            <Input name="location" maxLength={300} defaultValue={course?.location ?? ""} placeholder="Aula 204 / enlace de Teams" />
          </label>
          <label className={LABEL}>
            Inicio
            <Input name="startDate" type="date" defaultValue={day(course?.startDate)} />
          </label>
          <label className={LABEL}>
            Fin
            <Input name="endDate" type="date" defaultValue={day(course?.endDate)} />
          </label>
          <label className={LABEL}>
            Número total de clases (para el avance)
            <Input name="totalSessions" type="number" min={1} max={999} defaultValue={course?.totalSessions ?? ""} placeholder="12" />
          </label>
        </div>
      </details>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" size="sm">{submitLabel}</Button>
        {onDone && (
          <Button type="button" variant="ghost" size="sm" onClick={onDone}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
