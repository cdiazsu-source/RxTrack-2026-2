"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { addKeyDate, deleteKeyDate, setKeyDate } from "@/lib/actions/dates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useCanEdit } from "@/components/access-context";
import { formatDate } from "@/lib/utils";
import { relativeDays, urgencyOf } from "@/lib/relative-time";
import { cn } from "@/lib/utils";

export type KeyDateView = {
  id: string;
  name: string;
  date: string | null;
  weight: string | null;
  note: string | null;
  fromContent: boolean;
};

const URGENCY_CLASS: Record<string, string> = {
  past: "text-warning font-semibold",
  today: "text-warning font-semibold",
  soon: "text-foreground font-medium",
  upcoming: "text-muted-foreground",
  far: "text-muted-foreground",
  none: "text-muted-foreground",
};

export function DatesSection({ subjectId, items }: { subjectId: string; items: KeyDateView[] }) {
  const canEdit = useCanEdit();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const sorted = [...items].sort((a, b) => {
    if (a.date && b.date) return +new Date(a.date) - +new Date(b.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex flex-col gap-4">
      {canEdit && (
        <div>
          <Button size="sm" variant="outline" onClick={() => setAdding((s) => !s)}>
            <Plus className="h-3.5 w-3.5" />
            Agregar fecha
          </Button>
        </div>
      )}
      {canEdit && adding && (
        <Card>
          <CardContent className="pt-5">
            <form
              action={async (fd) => {
                await addKeyDate(subjectId, fd);
                setAdding(false);
              }}
              className="flex flex-wrap items-end gap-2"
            >
              <Input name="name" placeholder="Nombre (ej. 1er Parcial)" required className="w-56" />
              <Input name="weight" placeholder="Peso (ej. 15%)" className="w-28" />
              <Input name="date" type="date" className="w-40" />
              <Button type="submit" size="sm">Guardar</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancelar</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <ul className="flex flex-col divide-y divide-border rounded-md border border-border">
        {sorted.map((d) => (
          <li key={d.id} className="group flex flex-wrap items-center gap-x-3 gap-y-1 p-3">
            <span className="text-sm font-medium">{d.name}</span>
            {d.weight && <span className="text-xs text-muted-foreground">{d.weight}</span>}
            <span className="ml-auto flex items-center gap-2">
              {editingId === d.id && canEdit ? (
                <form
                  action={async (fd) => {
                    await setKeyDate(d.id, fd);
                    setEditingId(null);
                  }}
                  className="flex items-center gap-2"
                >
                  <Input name="date" type="date" defaultValue={d.date ? d.date.slice(0, 10) : ""} className="w-40" />
                  <Button type="submit" size="sm">OK</Button>
                </form>
              ) : (
                <>
                  {d.date ? (
                    <span className="text-sm">
                      {formatDate(d.date)}{" "}
                      <span className={cn("text-xs", URGENCY_CLASS[urgencyOf(d.date)])}>
                        ({relativeDays(d.date)})
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">sin fecha</span>
                  )}
                  {canEdit && (
                    <button type="button" onClick={() => setEditingId(d.id)} className="text-xs text-primary hover:underline">
                      {d.date ? "cambiar" : "poner fecha"}
                    </button>
                  )}
                  {canEdit && !d.fromContent && (
                    <button type="button" onClick={() => deleteKeyDate(d.id)} className="text-muted-foreground hover-reveal hover:text-destructive" aria-label="Eliminar">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
