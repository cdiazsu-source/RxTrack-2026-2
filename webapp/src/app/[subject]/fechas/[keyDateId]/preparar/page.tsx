import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSubjectBySlug } from "@/lib/subjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { KeyDateModulesEditor } from "@/components/keydate-modules-editor";
import { PromptBox } from "@/components/prompt-box";
import { quizPrompt } from "@/lib/prompts";
import { formatDate } from "@/lib/utils";
import { relativeDays, urgencyOf } from "@/lib/relative-time";
import { renderFormula } from "@/lib/formula-markup";
import { inlineLite } from "@/lib/markdown-lite";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PrepararParcialPage({
  params,
}: {
  params: { subject: string; keyDateId: string };
}) {
  const subject = await getSubjectBySlug(params.subject);
  if (!subject) notFound();

  const keyDate = await prisma.keyDate.findFirst({
    where: { id: params.keyDateId, subjectId: subject.id },
  });
  if (!keyDate) notFound();

  const allModules = await prisma.module.findMany({
    where: { subjectId: subject.id },
    orderBy: { order: "asc" },
    select: { id: true, title: true },
  });

  const covered = keyDate.moduleIds.length ? keyDate.moduleIds : [];
  const inScope = (mid: string | null) => covered.length === 0 || (mid ? covered.includes(mid) : false);

  const [sessions, checklist, formulas, glossary, past] = await Promise.all([
    prisma.session.findMany({
      where: { module: { subjectId: subject.id } },
      orderBy: { number: "asc" },
      select: { id: true, number: true, topic: true, moduleId: true, module: { select: { title: true } } },
    }),
    prisma.checklistItem.findMany({
      where: { module: { subjectId: subject.id } },
      orderBy: { order: "asc" },
      select: { id: true, text: true, done: true, moduleId: true },
    }),
    prisma.formula.findMany({
      where: { subjectId: subject.id },
      select: { id: true, name: true, expression: true, description: true, moduleId: true },
    }),
    prisma.glossaryTerm.findMany({
      where: { subjectId: subject.id },
      orderBy: { term: "asc" },
      select: { id: true, term: true, definition: true, moduleId: true },
    }),
    prisma.pastMaterial.findMany({
      where: { subjectId: subject.id },
      select: { id: true, title: true, kind: true, semester: true, patterns: true, moduleId: true },
    }),
  ]);

  const s = sessions.filter((x) => inScope(x.moduleId));
  const c = checklist.filter((x) => inScope(x.moduleId));
  const f = formulas.filter((x) => inScope(x.moduleId));
  const g = glossary.filter((x) => inScope(x.moduleId));
  const p = past.filter((x) => inScope(x.moduleId));

  const doneC = c.filter((x) => x.done).length;
  const u = urgencyOf(keyDate.date);

  const prompt = quizPrompt({
    subjectName: subject.name,
    moduleTitle: keyDate.name,
    sessions: s.map((x) => x.topic),
    checklist: c.map((x) => x.text),
    formulas: f.map((x) => `${x.name}: ${x.expression.replace(/\n/g, " ")}`),
    glossary: g.map((x) => x.term),
  });

  return (
    <div className="flex flex-col gap-5">
      <Link href={`/${subject.id}/fechas`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver a fechas
      </Link>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Preparar</p>
        <h2 className="text-xl font-bold leading-tight">{keyDate.name}</h2>
        <p className={cn("mt-1 text-sm", ["past", "today", "soon"].includes(u) ? "font-semibold text-warning" : "text-muted-foreground")}>
          {keyDate.date ? `${formatDate(keyDate.date)} — ${relativeDays(keyDate.date)}` : "sin fecha puesta"}
          {keyDate.weight ? ` · ${keyDate.weight}` : ""}
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 pt-5">
          <KeyDateModulesEditor keyDateId={keyDate.id} modules={allModules} selected={keyDate.moduleIds} />
          {covered.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Sin módulos marcados: se muestra todo el temario de la asignatura. Marca arriba los que entran para acotar.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Checklist en alcance</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-2">
            <ProgressBar value={c.length ? (doneC / c.length) * 100 : 0} label={`${doneC}/${c.length}`} inline />
            <ul className="flex flex-col gap-1 text-sm">
              {c.slice(0, 12).map((x) => (
                <li key={x.id} className={x.done ? "text-muted-foreground line-through" : ""}>• {x.text}</li>
              ))}
              {c.length === 0 && <li className="text-muted-foreground">Sin ítems.</li>}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Clases y apuntes ({s.length})</CardTitle></CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-1 text-sm">
              {s.map((x) => (
                <li key={x.id}>
                  {x.number ? `S${x.number} · ` : ""}{x.topic}{" "}
                  <span className="text-xs text-muted-foreground">— {x.module.title}</span>
                </li>
              ))}
              {s.length === 0 && <li className="text-muted-foreground">Sin apuntes guardados en estos módulos.</li>}
            </ul>
          </CardContent>
        </Card>
      </div>

      {f.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Fórmulas ({f.length})</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-2">
            {f.map((x) => (
              <div key={x.id}>
                <p className="text-sm font-semibold">{x.name}</p>
                <div className="formula" dangerouslySetInnerHTML={{ __html: renderFormula(x.expression) }} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {g.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Glosario ({g.length})</CardTitle></CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-1.5 text-sm">
              {g.map((x) => (
                <li key={x.id}>
                  <span className="font-semibold">{x.term}:</span>{" "}
                  <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: inlineLite(x.definition) }} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {p.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Insumos de semestres previos ({p.length})</CardTitle></CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-1.5 text-sm">
              {p.map((x) => (
                <li key={x.id}>
                  <span className="font-semibold">{x.title}</span> <span className="text-xs text-muted-foreground">{x.kind} · {x.semester}</span>
                  {x.patterns && <p className="whitespace-pre-line text-xs text-muted-foreground">{x.patterns}</p>}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold">Prompt: quiz de práctica</h3>
          <Link href={`/${subject.id}/repaso`} className="text-xs text-primary hover:underline">o repasa las tarjetas →</Link>
        </div>
        <PromptBox text={prompt} rows={10} />
      </div>
    </div>
  );
}
