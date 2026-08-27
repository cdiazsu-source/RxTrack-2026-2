"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { createProject } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useCanEdit } from "@/components/access-context";

export function NewProjectForm({ subjectId, subjectSlug }: { subjectId: string; subjectSlug: string }) {
  const canEdit = useCanEdit();
  const [open, setOpen] = useState(false);
  if (!canEdit) return null;

  return (
    <div className="flex flex-col gap-3">
      {!open ? (
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          <Plus className="h-3.5 w-3.5" />
          Nuevo proyecto
        </Button>
      ) : (
        <Card>
          <CardContent className="pt-5">
            <form action={createProject.bind(null, subjectId, subjectSlug)} className="flex flex-wrap items-end gap-2">
              <Input name="title" placeholder="Título del proyecto" required autoFocus className="flex-1" />
              <Input name="category" placeholder="Categoría (opcional)" className="w-44" />
              <Button type="submit" size="sm">Crear</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancelar</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
