"use client";

import { useState } from "react";
import { Check, ListTodo, Pencil, Play, Plus, Trash2 } from "lucide-react";

import type { TaskStatus } from "@prisma/client";
import {
  createAssignedTask,
  deleteAssignedTask,
  setAssignedTaskStatus,
  updateAssignedTask,
} from "@/lib/actions/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpHint } from "@/components/help-hint";
import { cn } from "@/lib/utils";

export type TaskView = {
  id: string;
  title: string;
  detail: string | null;
  status: TaskStatus;
  subjectId: string | null;
  moduleId: string | null;
};

export type TaskSubjectRef = {
  id: string;
  code: string;
  name: string;
  modules: { id: string; title: string }[];
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  PENDIENTE: "Pendiente",
  EN_CURSO: "En curso",
  HECHA: "Hecha",
};

function SubjectModuleFields({
  subjects,
  subjectId,
  moduleId,
}: {
  subjects: TaskSubjectRef[];
  subjectId?: string | null;
  moduleId?: string | null;
}) {
  const [sid, setSid] = useState(subjectId ?? "");
  const mods = subjects.find((s) => s.id === sid)?.modules ?? [];
  return (
    <div className="flex flex-wrap gap-2">
      <select
        name="subjectId"
        value={sid}
        onChange={(e) => setSid(e.target.value)}
        className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
      >
        <option value="">— sin asignatura —</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.code}
          </option>
        ))}
      </select>
      <select
        name="moduleId"
        defaultValue={moduleId ?? ""}
        disabled={!sid}
        className="rounded-md border border-input bg-background px-2 py-1.5 text-sm disabled:opacity-50"
      >
        <option value="">— sin módulo —</option>
        {mods.map((m) => (
          <option key={m.id} value={m.id}>
            {m.title}
          </option>
        ))}
      </select>
    </div>
  );
}

function Chip({ task, subjects }: { task: TaskView; subjects: TaskSubjectRef[] }) {
  const s = subjects.find((x) => x.id === task.subjectId);
  if (!s) return null;
  const m = s.modules.find((x) => x.id === task.moduleId);
  return (
    <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">
      {s.code}
      {m ? ` · ${m.title}` : ""}
    </span>
  );
}

function DianaRow({ task }: { task: TaskView }) {
  return (
    <li className="rounded-md border border-border p-3">
      <p className="text-sm font-medium leading-snug">{task.title}</p>
      {task.detail && <p className="mt-1 whitespace-pre-line text-xs text-muted-foreground">{task.detail}</p>}
      <div className="mt-2 flex gap-2">
        {task.status === "PENDIENTE" && (
          <form action={setAssignedTaskStatus.bind(null, task.id, "EN_CURSO")}>
            <Button type="submit" size="sm" variant="outline">
              <Play className="h-3.5 w-3.5" />
              Empezar
            </Button>
          </form>
        )}
        <form action={setAssignedTaskStatus.bind(null, task.id, "HECHA")}>
          <Button type="submit" size="sm">
            <Check className="h-3.5 w-3.5" />
            Marcar hecha
          </Button>
        </form>
        {task.status === "EN_CURSO" && (
          <form action={setAssignedTaskStatus.bind(null, task.id, "PENDIENTE")}>
            <Button type="submit" size="sm" variant="ghost">
              Pausar
            </Button>
          </form>
        )}
      </div>
    </li>
  );
}

function ManageRow({ task, subjects }: { task: TaskView; subjects: TaskSubjectRef[] }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="rounded-md border border-border p-3">
        <form
          action={async (fd) => {
            await updateAssignedTask(task.id, fd);
            setEditing(false);
          }}
          className="flex flex-col gap-2"
        >
          <Input name="title" defaultValue={task.title} required />
          <Textarea name="detail" defaultValue={task.detail ?? ""} placeholder="Instrucciones…" />
          <SubjectModuleFields subjects={subjects} subjectId={task.subjectId} moduleId={task.moduleId} />
          <div className="flex gap-2">
            <Button type="submit" size="sm">Guardar</Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={cn("group rounded-md border border-border p-3", task.status === "HECHA" && "opacity-60")}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={cn("text-sm font-medium leading-snug", task.status === "HECHA" && "line-through")}>
            {task.title}
          </p>
          {task.detail && (
            <p className="mt-1 whitespace-pre-line text-xs text-muted-foreground">{task.detail}</p>
          )}
          <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="rounded bg-muted px-1.5 py-0.5 font-medium">{STATUS_LABEL[task.status]}</span>
            <Chip task={task} subjects={subjects} />
          </p>
        </div>
        <span className="hover-reveal flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => setEditing(true)} className="tap rounded text-muted-foreground hover:bg-accent" aria-label="Editar">
            <Pencil className="h-4 w-4" />
          </button>
          <form action={deleteAssignedTask.bind(null, task.id)}>
            <button type="submit" className="tap rounded text-muted-foreground hover:text-destructive" aria-label="Eliminar">
              <Trash2 className="h-4 w-4" />
            </button>
          </form>
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {(["PENDIENTE", "EN_CURSO", "HECHA"] as TaskStatus[])
          .filter((st) => st !== task.status)
          .map((st) => (
            <form key={st} action={setAssignedTaskStatus.bind(null, task.id, st)}>
              <Button type="submit" size="sm" variant="ghost" className="h-7 px-2 text-xs">
                → {STATUS_LABEL[st]}
              </Button>
            </form>
          ))}
      </div>
    </li>
  );
}

export function TasksPanel({
  tasks,
  canManage,
  subjects,
}: {
  tasks: TaskView[];
  canManage: boolean;
  subjects: TaskSubjectRef[];
}) {
  const [adding, setAdding] = useState(false);
  const open = tasks.filter((t) => t.status !== "HECHA");
  const done = tasks.filter((t) => t.status === "HECHA");

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          <ListTodo className="h-4 w-4 text-primary" />
          Tareas de Diana
          <span className="font-normal text-muted-foreground">({open.length})</span>
          <HelpHint k="tareas" />
        </CardTitle>
        {canManage && (
          <Button size="sm" variant="outline" onClick={() => setAdding((v) => !v)}>
            <Plus className="h-3.5 w-3.5" />
            Nueva tarea
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {canManage && adding && (
          <form
            action={async (fd) => {
              await createAssignedTask(fd);
              setAdding(false);
            }}
            className="flex flex-col gap-2 rounded-md border border-dashed border-input p-3"
          >
            <Input name="title" placeholder="Ej.: Extraer el texto de las diapositivas de la clase 3" required autoFocus />
            <Textarea name="detail" placeholder="Instrucciones o contexto (opcional)…" />
            <SubjectModuleFields subjects={subjects} />
            <div>
              <Button type="submit" size="sm">Asignar</Button>
            </div>
          </form>
        )}

        {open.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {canManage ? "Sin tareas abiertas. Crea una con «Nueva tarea»." : "No tienes tareas pendientes. 🎉"}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {open.map((t) =>
              canManage ? (
                <ManageRow key={t.id} task={t} subjects={subjects} />
              ) : (
                <DianaRow key={t.id} task={t} />
              ),
            )}
          </ul>
        )}

        {done.length > 0 && (
          <details className="text-sm">
            <summary className="cursor-pointer text-muted-foreground">Hechas ({done.length})</summary>
            <ul className="mt-2 flex flex-col gap-2">
              {done.slice(0, 20).map((t) =>
                canManage ? (
                  <ManageRow key={t.id} task={t} subjects={subjects} />
                ) : (
                  <li key={t.id} className="rounded-md border border-border p-2 text-xs text-muted-foreground line-through">
                    {t.title}
                  </li>
                ),
              )}
            </ul>
          </details>
        )}
      </CardContent>
    </Card>
  );
}
