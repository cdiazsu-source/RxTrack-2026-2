"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { createCourse } from "@/lib/actions/courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CourseForm } from "@/components/course-form";

/** Botón + formulario plegable para registrar un curso nuevo (al guardar, abre el curso). */
export function NewCourse({ primary = false }: { primary?: boolean }) {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <Button type="button" size="sm" variant={primary ? "default" : "outline"} onClick={() => setOpen(true)}>
        <Plus className="h-3.5 w-3.5" />
        Nuevo curso
      </Button>
    );
  }
  return (
    <Card className="w-full">
      <CardContent className="pt-5">
        <CourseForm action={createCourse} onDone={() => setOpen(false)} submitLabel="Crear curso" />
      </CardContent>
    </Card>
  );
}
