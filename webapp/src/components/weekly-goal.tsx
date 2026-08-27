"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { setWeeklyGoal } from "@/lib/actions/semester";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCanEdit } from "@/components/access-context";

export function WeeklyGoal({ subjectId, goal }: { subjectId: string; goal: string | null }) {
  const canEdit = useCanEdit();
  const [editing, setEditing] = useState(false);

  if (editing && canEdit) {
    return (
      <form
        action={async (fd) => {
          await setWeeklyGoal(subjectId, fd);
          setEditing(false);
        }}
        className="flex flex-col gap-2"
      >
        <Textarea name="weeklyGoal" defaultValue={goal ?? ""} rows={2} placeholder="¿Qué quieres lograr esta semana en esta materia?" autoFocus />
        <div className="flex gap-2">
          <Button type="submit" size="sm">Guardar</Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancelar</Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-start justify-between gap-2">
      <p className="text-sm">
        {goal ? goal : <span className="text-muted-foreground">Sin meta esta semana.</span>}
      </p>
      {canEdit && (
        <button type="button" onClick={() => setEditing(true)} className="shrink-0 rounded p-1 text-muted-foreground hover:bg-accent" aria-label="Editar meta">
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
