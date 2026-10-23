"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Pencil, Sparkles, Trash2, User } from "lucide-react";

import { deleteCourse, setCourseStatus, updateCourse } from "@/lib/actions/courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { ProgressRing } from "@/components/progress-ring";
import { PromptBox } from "@/components/prompt-box";
import { CourseForm, type CourseFormValues } from "@/components/course-form";
import { courseContextPrompt, type CoursePromptData } from "@/lib/course-prompt";
import {
  COURSE_MODALITY_LABEL,
  COURSE_STATUSES,
  COURSE_STATUS_LABEL,
  type CourseModality,
  type CourseStatus,
} from "@/lib/courses";
import { formatDate } from "@/lib/utils";
import { relativeDays } from "@/lib/relative-time";

const STATUS_VARIANT: Record<CourseStatus, "default" | "secondary" | "success" | "warning"> = {
  POR_INICIAR: "secondary",
  EN_CURSO: "default",
  PAUSADO: "warning",
  COMPLETADO: "success",
};

/** Cabecera del curso: datos, estado, avance y el prompt de contexto para una IA. */
export function CourseHeader({
  courseId,
  course,
  progress,
  stats,
  promptData,
}: {
  courseId: string;
  course: CourseFormValues;
  /** 0..100 */
  progress: number;
  stats: { attended: number; sessions: number; tasksDone: number; tasksTotal: number };
  promptData: CoursePromptData;
}) {
  const [editing, setEditing] = useState(false);
  const [ask, setAsk] = useState("");
  const status = course.status as CourseStatus;

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 pt-5">
        {editing ? (
          <CourseForm
            course={course}
            action={updateCourse.bind(null, courseId)}
            onDone={() => {
              setEditing(false);
              toast("Curso actualizado");
            }}
            submitLabel="Guardar cambios"
          />
        ) : (
          <div className="flex flex-wrap items-start gap-4">
            <ProgressRing value={progress} size={72} sublabel="avance" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold leading-tight">{course.title}</h1>
                {course.modality && (
                  <Badge variant="outline">{COURSE_MODALITY_LABEL[course.modality as CourseModality] ?? course.modality}</Badge>
                )}
                <Badge variant={STATUS_VARIANT[status] ?? "secondary"}>{COURSE_STATUS_LABEL[status] ?? course.status}</Badge>
              </div>
              {course.provider && <p className="text-sm text-muted-foreground">{course.provider}</p>}
              {course.goal && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{course.goal}</p>}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {course.instructor && (
                  <span className="inline-flex items-center gap-1">
                    <User className="h-3.5 w-3.5" aria-hidden />
                    {course.instructor}
                  </span>
                )}
                {course.schedule && (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {course.schedule}
                  </span>
                )}
                {course.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {/^https?:\/\//.test(course.location) ? (
                      <a href={course.location} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        Conectarme
                      </a>
                    ) : (
                      course.location
                    )}
                  </span>
                )}
                {(course.startDate || course.endDate) && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" aria-hidden />
                    {course.startDate ? formatDate(course.startDate) : "?"} → {course.endDate ? formatDate(course.endDate) : "?"}
                    {course.endDate && ` (${relativeDays(course.endDate)})`}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {stats.attended}
                {course.totalSessions ? `/${course.totalSessions}` : ""} clases asistidas · {stats.tasksDone}/{stats.tasksTotal} tareas
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={course.status}
                onChange={async (e) => {
                  await setCourseStatus(courseId, e.target.value);
                  toast("Estado actualizado");
                }}
                aria-label="Estado del curso"
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              >
                {COURSE_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {COURSE_STATUS_LABEL[s]}
                  </option>
                ))}
              </select>
              <Button type="button" size="sm" variant="outline" onClick={() => setEditing(true)}>
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={async () => {
                  if (window.confirm(`¿Eliminar «${course.title}» con todos sus apuntes, tareas y enlaces? No se puede deshacer.`)) {
                    await deleteCourse(courseId);
                  }
                }}
                aria-label="Eliminar curso"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}

        <details className="rounded-md border border-primary/30 bg-primary/[0.03]">
          <summary className="flex cursor-pointer items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
            <Sparkles className="h-3.5 w-3.5" />
            Copiar contexto del curso para una IA
          </summary>
          <div className="flex flex-col gap-2 border-t border-primary/20 p-3">
            <p className="text-xs text-muted-foreground">
              Junta tus apuntes por clase, tareas, lo guardado «para el futuro» y los enlaces. Dile qué quieres (o déjalo vacío para un resumen y un
              plan de repaso) y pega el texto en tu IA. La app no llama a ninguna IA.
            </p>
            <Textarea
              rows={2}
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
              placeholder="Ej.: hazme 10 preguntas de repaso de las clases 3 y 4 · explícame lo que no entendí del módulo FI"
            />
            <PromptBox text={courseContextPrompt(promptData, ask)} rows={8} />
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
