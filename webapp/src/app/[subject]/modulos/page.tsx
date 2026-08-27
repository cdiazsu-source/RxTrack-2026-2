import Link from "next/link";
import { notFound } from "next/navigation";

import { getSubjectBySlug } from "@/lib/subjects";
import { getModulesWithProgress } from "@/lib/queries";
import { pct } from "@/lib/progress";
import { MODULE_STATUS_LABEL } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/progress-ring";
import { HelpHint } from "@/components/help-hint";
import { inlineLite } from "@/lib/markdown-lite";

export const dynamic = "force-dynamic";

export default async function ModulesPage({ params }: { params: { subject: string } }) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();
  const modules = await getModulesWithProgress(subject.id);

  return (
    <div className="flex flex-col gap-4">
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        Temas del curso: apuntes, checklist, recursos y laboratorio.
        <HelpHint k="modulos-general" />
      </p>

      {modules.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Esta asignatura todavía no tiene temario. Cárgalo en <code>content/{subject.code.toLowerCase()}.ts</code> y corre <code>npm run db:seed</code>.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((m) => (
            <Link key={m.id} href={`/${subject.id}/modulos/${m.id}`}>
              <Card className="h-full p-4 transition-shadow hover:shadow-card-hover">
                <div className="flex items-start gap-3">
                  <ProgressRing value={pct(m.progress)} size={46} stroke={5} />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-snug">{m.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {MODULE_STATUS_LABEL[m.status]} · {m.checklistDone}/{m.checklistTotal} checklist · {m.sessionCount} apunte(s)
                    </p>
                  </div>
                </div>
                <p
                  className="mt-2 line-clamp-3 text-xs text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: inlineLite(m.description) }}
                />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
