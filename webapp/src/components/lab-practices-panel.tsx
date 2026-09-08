"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpHint } from "@/components/help-hint";
import { PromptBox } from "@/components/prompt-box";
import { labPracticePrompt } from "@/lib/prompts";
import { inlineLite, renderCornell } from "@/lib/markdown-lite";
import { renderFormula } from "@/lib/formula-markup";
import type { LabPracticeContent } from "@/lib/subject-content";

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
  subjectSlug,
  moduleTitle,
}: {
  p: LabPracticeContent;
  subjectName: string;
  subjectSlug: string;
  moduleTitle: string | null;
}) {
  const [showPrompt, setShowPrompt] = useState(false);
  const equationLines = (p.equations ?? []).map((e) =>
    [e.name, e.expression?.replace(/\n/g, " "), e.variables?.replace(/\n/g, " · ")].filter(Boolean).join("  —  "),
  );

  return (
    <details className="group rounded-lg border border-border bg-card [&_summary]:list-none">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4">
        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          Práctica {p.number} — {p.title}
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

        <SectionLabel>Lo que necesitas saber</SectionLabel>
        <div className="mt-1">
          <Bullets items={p.keyPoints} />
        </div>

        <SectionLabel>Procedimiento</SectionLabel>
        <div className="cornell mt-1 text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(p.procedure) }} />

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

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowPrompt((s) => !s)}
            className="press inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {showPrompt ? "Ocultar prompt" : "Copiar prompt para IA"}
          </button>
          {showPrompt && (
            <div className="mt-2">
              <PromptBox
                rows={12}
                text={labPracticePrompt({
                  subjectName,
                  moduleTitle,
                  practice: {
                    number: p.number,
                    title: p.title,
                    fundamento: p.fundamento,
                    keyPoints: p.keyPoints,
                    procedure: p.procedure,
                    equations: equationLines,
                    dataRequested: p.dataRequested,
                  },
                })}
              />
            </div>
          )}
        </div>
      </div>
    </details>
  );
}

export function LabPracticesPanel({
  labRules,
  practices,
  subjectName,
  subjectSlug,
  moduleTitleBySlug,
}: {
  labRules: string[];
  practices: LabPracticeContent[];
  subjectName: string;
  subjectSlug: string;
  moduleTitleBySlug: Record<string, string>;
}) {
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

      {practices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Prácticas de laboratorio</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {practices.map((p) => (
              <PracticeItem
                key={p.number}
                p={p}
                subjectName={subjectName}
                subjectSlug={subjectSlug}
                moduleTitle={p.moduleSlug ? moduleTitleBySlug[p.moduleSlug] ?? null : null}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
