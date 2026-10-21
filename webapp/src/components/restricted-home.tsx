import Link from "next/link";
import { Lock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Greeting } from "@/components/greeting";

export const NO_ACCESS_MESSAGE = "Pídele a Cesar Diaz que te brinde acceso a esta asignatura.";

type SubjectRow = { id: string; code: string; name: string; allowed: boolean };

/**
 * Portada para sesiones acotadas con vista de portada (Profe): saludo y la lista de
 * asignaturas. Solo las de su alcance se abren; las demás se ven deshabilitadas con
 * el aviso. No lee avance, tareas, actividad ni notas.
 */
export function RestrictedHome({ name, subjects }: { name: string; subjects: SubjectRow[] }) {
  return (
    <div className="flex flex-col gap-6">
      <Greeting name={name} />

      <section className="flex flex-col gap-3" aria-label="Asignaturas">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Asignaturas</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) =>
            s.allowed ? (
              <Link key={s.id} href={`/${s.id}`} className="press-card block">
                <Card className="flex h-full flex-col justify-center gap-0.5 p-4 transition-shadow hover:shadow-card-hover">
                  <p className="text-xs font-semibold text-primary">{s.code}</p>
                  <p className="text-sm font-medium leading-snug">{s.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Abrir asignatura</p>
                </Card>
              </Link>
            ) : (
              <div key={s.id} aria-disabled="true" className="cursor-not-allowed select-none">
                <Card className="flex h-full flex-col justify-center gap-0.5 border-dashed bg-muted/40 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Lock className="h-3 w-3" aria-hidden />
                    {s.code}
                  </p>
                  <p className="text-sm font-medium leading-snug text-muted-foreground">{s.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{NO_ACCESS_MESSAGE}</p>
                </Card>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
