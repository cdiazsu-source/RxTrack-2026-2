"use client";

import { useRef, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { addCourseTask, deleteCourseTask, setCourseTaskDone, updateCourseTask } from "@/lib/actions/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress";
import { toast } from "@/components/ui/toast";
import { cn, dateInputValue, formatDate } from "@/lib/utils";
import { relativeDays, urgencyOf } from "@/lib/relative-time";

export type CourseTaskView = {
  id: string;
  text: string;
  description: string | null;
  dueDate: string | null; // ISO
  done: boolean;
};

function DueChip({ iso, done }: { iso: string | null; done: boolean }) {
  if (!iso) return null;
  const u = urgencyOf(iso);
  const hot = !done && (u === "past" || u === "today");
  return (
    <span className={cn("shrink-0 text-xs", hot ? "font-semibold text-warning" : "text-muted-foreground")}>
      {formatDate(iso)} · {relativeDays(iso)}
    </span>
  );
}

function TaskRow({ t }: { t: CourseTaskView }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="rounded-md border border-border p-2.5">
        <form
          action={async (fd) => {
            await updateCourseTask(t.id, fd);
            setEditing(false);
          }}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-wrap gap-2">
            <Input name="text" required maxLength={300} defaultValue={t.text} className="min-w-0 flex-1 basis-60" aria-label="Tarea" />
            <Input name="dueDate" type="date" defaultValue={t.dueDate ? dateInputValue(new Date(t.dueDate)) : ""} className="w-40" aria-label="Fecha de entrega" />
          </div>
          <Input name="description" maxLength={600} defaultValue={t.description ?? ""} placeholder="Detalle (opcional)" aria-label="Detalle" />
          <div className="flex gap-2">
            <Button type="submit" size="sm">Guardar</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="group flex items-start gap-2.5 rounded-md px-1 py-1.5 hover:bg-muted/40">
      <input
        type="checkbox"
        checked={t.done}
        onChange={(e) => setCourseTaskDone(t.id, e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-input accent-[hsl(var(--primary))]"
        aria-label={`Marcar «${t.text}» como ${t.done ? "pendiente" : "hecha"}`}
      />
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm", t.done && "text-muted-foreground line-through")}>{t.text}</p>
        {t.description && <p className="text-xs text-muted-foreground">{t.description}</p>}
      </div>
      <DueChip iso={t.dueDate} done={t.done} />
      <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
        <button type="button" onClick={() => setEditing(true)} className="hover-reveal hover:text-foreground" aria-label="Editar tarea">
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={async () => {
            await deleteCourseTask(t.id);
            toast("Tarea eliminada", "info");
          }}
          className="hover-reveal hover:text-destructive"
          aria-label="Eliminar tarea"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </span>
    </li>
  );
}

/** Tareas del curso: captura rápida con Enter, pendientes por fecha de entrega y hechas plegadas. */
export function CourseTasks({ courseId, tasks }: { courseId: string; tasks: CourseTaskView[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const pending = tasks
    .filter((t) => !t.done)
    .sort((a, b) => (a.dueDate ? +new Date(a.dueDate) : Infinity) - (b.dueDate ? +new Date(b.dueDate) : Infinity));
  const done = tasks.filter((t) => t.done);

  return (
    <div className="flex flex-col gap-3">
      {tasks.length > 0 && <ProgressBar value={(done.length / tasks.length) * 100} label={`${done.length}/${tasks.length}`} inline />}

      <form
        ref={formRef}
        action={async (fd) => {
          await addCourseTask(courseId, fd);
          formRef.current?.reset();
        }}
        className="flex flex-wrap items-center gap-2"
      >
        <Input name="text" required maxLength={300} placeholder="Nueva tarea y Enter" className="min-w-0 flex-1 basis-60" aria-label="Nueva tarea" />
        <Input name="dueDate" type="date" className="w-40" aria-label="Fecha de entrega (opcional)" />
        <Button type="submit" size="sm">
          <Plus className="h-3.5 w-3.5" />
          Agregar
        </Button>
      </form>

      {pending.length === 0 && done.length === 0 && (
        <p className="text-sm text-muted-foreground">Sin tareas. Anota aquí lo que te dejen: ejercicios, entregas, lecturas.</p>
      )}
      {pending.length === 0 && done.length > 0 && <p className="text-sm text-success">Todo al día. No tienes tareas pendientes.</p>}

      <ul className="flex flex-col">
        {pending.map((t) => (
          <TaskRow key={t.id} t={t} />
        ))}
      </ul>

      {done.length > 0 && (
        <details className="rounded-md border border-border">
          <summary className="cursor-pointer px-3 py-2 text-sm text-muted-foreground">Hechas ({done.length})</summary>
          <ul className="flex flex-col border-t border-border p-1.5">
            {done.map((t) => (
              <TaskRow key={t.id} t={t} />
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
