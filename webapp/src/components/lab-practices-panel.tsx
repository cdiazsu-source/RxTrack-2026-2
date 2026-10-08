"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Eye, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpHint } from "@/components/help-hint";
import { PromptBox } from "@/components/prompt-box";
import { labPracticePrompt } from "@/lib/prompts";
import { inlineLite, renderCornell } from "@/lib/markdown-lite";
import { renderFormula } from "@/lib/formula-markup";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { LabModuleLinkButton } from "@/components/lab-module-link-button";
import type { ExerciseContent, LabModuleContent, LabPracticeContent } from "@/lib/subject-content";

/** Preparación para el quiz de la práctica: de una pregunta en una, con
 *  respuesta oculta hasta pulsar "Ver respuesta". Solo lectura — el quiz vive
 *  en el content, no en la base de datos. */
function QuizPreview({ questions }: { questions: ExerciseContent[] }) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const total = questions.length;
  const current = questions[idx];
  if (!current) return null;

  const go = (next: number) => {
    setIdx(next);
    setRevealed(false);
  };

  return (
    <div className="mt-1 rounded-lg border border-border bg-muted/20 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
        Pregunta {idx + 1}/{total}
      </p>
      <div className="cornell mt-1 text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(current.question) }} />

      {revealed ? (
        <div className="mt-2 border-t border-border pt-2">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Respuesta</p>
          <div className="cornell text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(current.solution) }} />
        </div>
      ) : (
        <Button variant="outline" size="sm" className="mt-2" onClick={() => setRevealed(true)}>
          <Eye className="h-3.5 w-3.5" />
          Ver respuesta
        </Button>
      )}

      {total > 1 && (
        <div className="mt-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" disabled={idx === 0} onClick={() => go(idx - 1)}>
            Anterior
          </Button>
          <Button variant="ghost" size="sm" disabled={idx >= total - 1} onClick={() => go(idx + 1)}>
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}

/** Lista COMPLETA de ejercicios (patrón de examen del profesor): todos
 *  visibles a la vez, cada uno numerado, con la solución oculta tras un
 *  botón propio. A diferencia de QuizPreview, no pagina de uno en uno —
 *  así se ve de entrada cuántos ejercicios hay. */
function ExamExerciseItem({ index, exercise }: { index: number; exercise: ExerciseContent }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/[0.03] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Ejercicio {index + 1}</p>
      <div className="cornell mt-1 text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(exercise.question) }} />
      {revealed ? (
        <div className="mt-2 border-t border-primary/20 pt-2">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Solución completa
          </p>
          <div className="cornell text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(exercise.solution) }} />
        </div>
      ) : (
        <Button variant="outline" size="sm" className="mt-2" onClick={() => setRevealed(true)}>
          <Eye className="h-3.5 w-3.5" />
          Ver solución
        </Button>
      )}
    </div>
  );
}

function ExamExercises({ exercises }: { exercises: ExerciseContent[] }) {
  return (
    <div className="mt-1 flex flex-col gap-3">
      {exercises.map((ex, i) => (
        <ExamExerciseItem key={i} index={i} exercise={ex} />
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed marker:text-primary">
      {items.map((t, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: inlineLite(t) }} />
      ))}
    </ul>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{children}</p>
  );
}

function PracticeItem({
  p,
  subjectName,
  subjectSummary,
  subjectObjective,
  subjectSlug,
  moduleTitle,
  labModule,
}: {
  p: LabPracticeContent;
  subjectName: string;
  subjectSummary: string | null;
  subjectObjective: string | null;
  subjectSlug: string;
  moduleTitle: string | null;
  labModule: LabModuleContent | null;
}) {
  // El markup de fórmulas (#{a|b}, _{x}, ^{x}) no es legible para una IA: se pasa a texto plano.
  const plain = (s: string) =>
    s
      .replace(/#\{([^|{}]+)\|([^{}]+)\}/g, "($1)/($2)")
      .replace(/_\{([^{}]+)\}/g, "_$1")
      .replace(/\^\{([^{}]+)\}/g, "^$1");
  const equationLines = (p.equations ?? []).map((e) =>
    plain(
      [e.name, e.expression?.replace(/\n/g, " ; "), e.variables?.replace(/\n/g, " · ")].filter(Boolean).join("  —  "),
    ),
  );

  return (
    <details className="group rounded-lg border border-border bg-card [&_summary]:list-none">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4">
        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          {labModule ? `${labModule.name} · ` : ""}Práctica {p.number} — {p.title}
          {p.moduleSlug && moduleTitle && (
            <Link
              href={`/${subjectSlug}/modulos`}
              onClick={(e) => e.stopPropagation()}
              className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground hover:underline"
            >
              {moduleTitle}
            </Link>
          )}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
      </summary>

      <div className="border-t border-border p-4 pt-3">
        <SectionLabel>Fundamento</SectionLabel>
        <p className="mt-1 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: inlineLite(p.fundamento) }} />

        {p.desarrollo && (
          <details className="group/dev mt-3 rounded-lg border border-primary/30 bg-primary/[0.03]">
            <summary className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
              Desarrollo pedagógico de la práctica (contexto, analogías y resultado esperado)
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open/dev:rotate-90" aria-hidden />
            </summary>
            <div
              className="cornell border-t border-primary/20 p-3 pt-2 text-sm"
              dangerouslySetInnerHTML={{ __html: renderCornell(p.desarrollo) }}
            />
          </details>
        )}

        <SectionLabel>Lo que necesitas saber</SectionLabel>
        <div className="mt-1">
          <Bullets items={p.keyPoints} />
        </div>

        <SectionLabel>Procedimiento</SectionLabel>
        <div className="cornell mt-1 text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(p.procedure) }} />

        {p.flowcharts && p.flowcharts.length > 0 && (
          <>
            <SectionLabel>Diagrama de flujo</SectionLabel>
            <div className="mt-1 flex flex-col gap-3">
              {p.flowcharts.map((f, i) => (
                <MermaidDiagram key={i} title={f.title} definition={f.definition} />
              ))}
            </div>
          </>
        )}

        {p.equations && p.equations.length > 0 && (
          <>
            <SectionLabel>Ecuaciones</SectionLabel>
            <ul className="mt-1 flex flex-col gap-3">
              {p.equations.map((e, i) => (
                <li key={i} className="rounded-md border border-border p-3">
                  <p className="text-sm font-medium">{e.name}</p>
                  <div className="formula mt-1" dangerouslySetInnerHTML={{ __html: renderFormula(e.expression) }} />
                  {e.variables && (
                    <div
                      className="formula mt-1 text-xs text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: renderFormula(e.variables) }}
                    />
                  )}
                  {e.description && (
                    <p
                      className="mt-1 text-xs text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: inlineLite(e.description) }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        <SectionLabel>Datos que te piden</SectionLabel>
        <div className="mt-1">
          <Bullets items={p.dataRequested} />
        </div>

        {p.studyTopics && p.studyTopics.length > 0 && (
          <>
            <SectionLabel>Temas de consulta</SectionLabel>
            <div className="mt-1">
              <Bullets items={p.studyTopics} />
            </div>
          </>
        )}

        {p.examExercises && p.examExercises.length > 0 && (
          <>
            <SectionLabel>
              Simulacros de examen — patrón del profesor ({p.examExercises.length}{" "}
              {p.examExercises.length === 1 ? "ejercicio" : "ejercicios"})
            </SectionLabel>
            <ExamExercises exercises={p.examExercises} />
          </>
        )}

        {p.quizQuestions && p.quizQuestions.length > 0 && (
          <>
            <SectionLabel>Quiz de preparación ({p.quizQuestions.length} preguntas)</SectionLabel>
            <QuizPreview questions={p.quizQuestions} />
          </>
        )}

        <SectionLabel>Prompt de contexto</SectionLabel>
        <details className="group/prompt mt-1 rounded-lg border border-primary/30 bg-primary/[0.03]">
          <summary className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Copiar para preguntarle a cualquier IA sobre esta práctica
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open/prompt:rotate-90" aria-hidden />
          </summary>
          <div className="border-t border-primary/20 p-3 pt-2">
            <p className="mb-2 text-xs text-muted-foreground">
              Incluye la asignatura, el laboratorio{labModule?.team?.length ? " y el equipo" : ""}, y la práctica completa
              (fundamento, desarrollo, procedimiento, ecuaciones y datos a registrar). Pégalo en una IA y luego haz tu pregunta.
            </p>
            <PromptBox
              rows={12}
              text={labPracticePrompt({
                subjectName,
                subjectSummary,
                subjectObjective,
                moduleTitle,
                labModule,
                practice: {
                  number: p.number,
                  title: p.title,
                  fundamento: p.fundamento,
                  desarrollo: p.desarrollo,
                  keyPoints: p.keyPoints,
                  procedure: p.procedure,
                  equations: equationLines,
                  dataRequested: p.dataRequested,
                  studyTopics: p.studyTopics,
                },
              })}
            />
          </div>
        </details>
      </div>
    </details>
  );
}

export function LabPracticesPanel({
  labRules,
  labModules,
  moduleLinks,
  practices,
  subjectName,
  subjectSummary,
  subjectObjective,
  subjectSlug,
  moduleTitleBySlug,
}: {
  labRules: string[];
  labModules: LabModuleContent[];
  /** Enlace al Excel de cada agrupación, por nombre ("Módulo I" → url). */
  moduleLinks: Record<string, string | null>;
  practices: LabPracticeContent[];
  subjectName: string;
  subjectSummary: string | null;
  subjectObjective: string | null;
  subjectSlug: string;
  moduleTitleBySlug: Record<string, string>;
}) {
  const renderPractice = (p: LabPracticeContent, labModule: LabModuleContent | null) => (
    <PracticeItem
      key={`${labModule?.name ?? ""}-${p.number}`}
      p={p}
      subjectName={subjectName}
      subjectSummary={subjectSummary}
      subjectObjective={subjectObjective}
      subjectSlug={subjectSlug}
      moduleTitle={p.moduleSlug ? moduleTitleBySlug[p.moduleSlug] ?? null : null}
      labModule={labModule}
    />
  );

  // Prácticas sin agrupación (o con una que no existe en labModules) van en la lista general.
  const known = new Set(labModules.map((m) => m.name));
  const ungrouped = practices.filter((p) => !p.labModule || !known.has(p.labModule));

  return (
    <div className="flex flex-col gap-5">
      {labRules.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-1.5">
              Reglas del laboratorio
              <HelpHint k="lab-reglas" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Bullets items={labRules} />
          </CardContent>
        </Card>
      )}

      {labModules.map((lm) => {
        const list = practices.filter((p) => p.labModule === lm.name);
        return (
          <Card key={lm.name}>
            <CardHeader>
              <CardTitle>{lm.name} — prácticas de laboratorio</CardTitle>
              {lm.subtitle && (
                <p className="mt-1 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: inlineLite(lm.subtitle) }} />
              )}
              {lm.team && lm.team.length > 0 && (
                <p className="mt-1 text-xs font-medium text-primary">Equipo: {lm.team.join(" · ")}</p>
              )}
              <div className="mt-2">
                <LabModuleLinkButton subjectId={subjectSlug} name={lm.name} url={moduleLinks[lm.name] ?? null} />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {lm.rules && lm.rules.length > 0 && (
                <details className="group/rules mb-1 rounded-lg border border-border bg-muted/20 [&_summary]:list-none">
                  <summary className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm font-medium">
                    Reglas y cronograma — {lm.name}
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open/rules:rotate-90" aria-hidden />
                  </summary>
                  <div className="border-t border-border p-3">
                    <Bullets items={lm.rules} />
                  </div>
                </details>
              )}
              {list.map((p) => renderPractice(p, lm))}
              {list.length === 0 && <p className="text-sm text-muted-foreground">Aún no hay prácticas cargadas en este módulo.</p>}
            </CardContent>
          </Card>
        );
      })}

      {ungrouped.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Prácticas de laboratorio</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">{ungrouped.map((p) => renderPractice(p, null))}</CardContent>
        </Card>
      )}
    </div>
  );
}
