"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { addPersonalEvent } from "@/lib/actions/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCanEdit } from "@/components/access-context";

export function AddEventForm({ subjects }: { subjects: { id: string; code: string }[] }) {
  const canEdit = useCanEdit();
  const [open, setOpen] = useState(false);
  if (!canEdit) return null;

  if (!open) {
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Plus className="h-3.5 w-3.5" />
        Evento personal
      </Button>
    );
  }

  return (
    <form
      action={async (fd) => {
        await addPersonalEvent(fd);
        setOpen(false);
      }}
      className="flex flex-wrap items-end gap-2 rounded-md border border-dashed border-input p-3"
    >
      <Input name="title" placeholder="Título (entrega, tutoría…)" required className="w-56" />
      <Input name="date" type="date" required className="w-40" />
      <Select name="subjectId" defaultValue="" className="w-28">
        <option value="">Sin asignatura</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>{s.code}</option>
        ))}
      </Select>
      <Button type="submit" size="sm">Agregar</Button>
      <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    </form>
  );
}
