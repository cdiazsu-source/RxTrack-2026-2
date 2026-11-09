"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ClipboardPaste, FlaskConical, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";

import {
  addProjectExercise,
  deleteProjectExercise,
  importProjectExercises,
  updateProjectExercise,
} from "@/lib/actions/project-exercises";
import { parseProjectExercises } from "@/lib/project-exercise-format";
import { projectExercisePrompt } from "@/lib/prompts";
import { renderCornell } from "@/lib/markdown-lite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PromptBox } from "@/components/prompt-box";
import { toast } from "@/components/ui/toast";
import { useCanContribute } from "@/components/access-context";

export type ProjectExerciseView = {
  id: string;
  workshop: string | null;
  title: string;
  question: string;
  solution: string;
  order: number;
};

/** Datos del proyecto que alimentan el prompt para la IA externa. */
export type ProjectExercisePromptContext = {
  subjectName: string;
  subjectCode: string;
  projectTitle: string;
  category: string | null;
  description: string | null;
};

const MD_HINT = "Markdown: #### subtítulo · **negrita** · tablas con | | · listas · ```formula para ecuaciones.";

function ExerciseForm({
  projectId,
  exercise,
  workshops,
  onDone,
}: {
  projectId: string;
  exercise?: ProjectExerciseView;
  workshops: string[];
  onDone: () => void;
}) {
  const listId = `workshops-${exercise?.id ?? "new"}`;
  return (
    <form
      action={async (fd) => {
        if (exercise) await updateProjectExercise(exercise.id, fd);
        else await addProjectExercise(projectId, fd);
        toast(exercise ? "Ejercicio actualizado" : "Ejercicio agregado");
        onDone();
      }}
      className="flex flex-col gap-2 rounded-md border border-dashed border-input p-3"
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Taller (opcional)
          <Input
            name="workshop"
            list={listId}
            defaultValue={exercise?.workshop ?? ""}
            maxLength={120}
            placeholder="Taller 2 — Cinética"
            className="font-normal text-foreground"
          />
          <datalist id={listId}>
            {workshops.map((w) => (
              <option key={w} value={w} />
            ))}
          </datalist>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Título del ejercicio
          <Input
            name="title"
            required
            defaultValue={exercise?.title ?? ""}
            maxLength={160}
            placeholder="Problema 3 — Vida media"
            className="font-normal text-foreground"
          />
        </label>
      </div>
      <label className="text-xs font-medium text-muted-foreground">Enunciado</label>
      <Textarea
        name="question"
        defaultValue={exercise?.question ?? ""}
        rows={4}
        required
        placeholder="El problema, tal cual, con sus datos y unidades."
        className="font-mono text-xs"
      />
      <label className="text-xs font-medium text-muted-foreground">Solución paso a paso</label>
      <Textarea
        name="solution"
        defaultValue={exercise?.solution ?? ""}
        rows={9}
        required
        placeholder={"#### Paso 1 — …\n**Qué está pasando.** …\n**Interpretación.** …\n**Factor de conversión:** …\n**Conclusión:** …"}
        className="font-mono text-xs"
      />
      <p className="text-[11px] text-muted-foreground">{MD_HINT}</p>
      <div className="flex gap-2">
        <Button type="submit" size="sm">{exercise ? "Guardar cambios" : "Agregar"}</Button>
        <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}

/** Pegar la respuesta de la IA (formato @@…): vista previa de lo detectado y agregar todo de una vez. */
function ImportSection({ projectId, onDone }: { projectId: string; onDone: () => void }) {
  const router = useRouter();
  const [raw, setRaw] = useState("");
  const [busy, setBusy] = useState(false);
  const parsed = useMemo(() => (raw.trim() ? parseProjectExercises(raw) : null), [raw]);

  return (
    <div className="flex flex-col gap-3 rounded-md border border-dashed border-input p-3">
      <p className="text-xs text-muted-foreground">
        Pega aquí la respuesta completa de tu IA (la que empieza con <code>@@EJERCICIO</code>). Verás qué detecté antes
        de agregarlo.
      </p>
      <Textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={7}
        placeholder={"@@TALLER: Taller 1\n@@EJERCICIO: Problema 1 — …\n@@ENUNCIADO\n…\n@@SOLUCION\n…\n@@FIN"}
        className="font-mono text-xs"
      />
      {parsed && (
        <div className="flex flex-col gap-1 text-xs">
          {parsed.items.length > 0 && (
            <ul className="flex flex-col gap-0.5">
              {parsed.items.map((it, i) => (
                <li key={i} className="flex flex-wrap gap-x-1.5">
                  <span className="font-medium text-foreground">{it.title}</span>
                  <span className="text-muted-foreground">
                    {it.workshop ? `· ${it.workshop}` : "· suelto"} · enunciado {it.question.length} car. · solución{" "}
                    {it.solution.length} car.
                  </span>
                </li>
              ))}
            </ul>
          )}
          {parsed.problems.map((p, i) => (
            <p key={i} className="text-destructive">⚠ {p}</p>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          disabled={busy || !parsed || parsed.items.length === 0}
          onClick={async () => {
            setBusy(true);
            const r = await importProjectExercises(projectId, raw);
            setBusy(false);
            if (r.added > 0) {
              toast(r.added === 1 ? "1 ejercicio agregado" : `${r.added} ejercicios agregados`);
              setRaw("");
              router.refresh();
              onDone();
            } else {
              toast(r.problems[0] ?? "No se agregó nada", "info");
            }
          }}
        >
          {parsed && parsed.items.length > 0
            ? `Agregar ${parsed.items.length} ${parsed.items.length === 1 ? "ejercicio" : "ejercicios"}`
            : "Agregar"}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onDone}>Cancelar</Button>
      </div>
    </div>
  );
}

/** Prompt para la IA en la que ya se trabaja el proyecto: le dice qué salida entregar. */
function PromptSection({ ctx, workshops }: { ctx: ProjectExercisePromptContext; workshops: string[] }) {
  const [workshop, setWorkshop] = useState("");
  const [statements, setStatements] = useState("");
  const text = useMemo(
    () => projectExercisePrompt({ ...ctx, workshop, statements }),
    [ctx, workshop, statements],
  );
  return (
    <div className="flex flex-col gap-3 rounded-md border border-dashed border-input p-3">
      <ol className="list-decimal space-y-0.5 pl-5 text-xs text-muted-foreground">
        <li>Copia el prompt y pégalo en la IA donde ya estás trabajando este proyecto (o en una nueva).</li>
        <li>Ella te responde con UN bloque en un formato fijo (talleres y ejercicios resueltos, con unidades).</li>
        <li>Copia ese bloque y úsalo en «Pegar respuesta de la IA» (aquí) o pégalo en el chat de desarrollo.</li>
      </ol>
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Nombre del taller (opcional)
        <Input
          value={workshop}
          onChange={(e) => setWorkshop(e.target.value)}
          list="prompt-workshops"
          maxLength={120}
          placeholder="Taller 2 — Cinética"
          className="font-normal text-foreground"
        />
        <datalist id="prompt-workshops">
          {workshops.map((w) => (
            <option key={w} value={w} />
          ))}
        </datalist>
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        Enunciados nuevos (opcional — si los dejas vacíos, la IA usa lo que ya trabajaron en esa conversación)
        <Textarea
          value={statements}
          onChange={(e) => setStatements(e.target.value)}
          rows={3}
          placeholder="Pega aquí los enunciados del taller, tal cual."
          className="text-sm font-normal text-foreground"
        />
      </label>
      <PromptBox text={text} rows={10} />
    </div>
  );
}

function ExerciseCard({
  ex,
  canEdit,
  editing,
  workshops,
  projectId,
  onEdit,
  onDone,
}: {
  ex: ProjectExerciseView;
  canEdit: boolean;
  editing: boolean;
  workshops: string[];
  projectId: string;
  onEdit: () => void;
  onDone: () => void;
}) {
  const router = useRouter();
  if (editing) {
    return <ExerciseForm projectId={projectId} exercise={ex} workshops={workshops} onDone={onDone} />;
  }
  return (
    <details className="group rounded-lg border border-border bg-card [&_summary]:list-none">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-3 text-sm font-medium">
        <span className="min-w-0">{ex.title}</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
      </summary>
      <div className="flex flex-col gap-3 border-t border-border p-3">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-primary">Enunciado</p>
          <div className="cornell text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(ex.question) }} />
        </div>
        <div className="border-t border-border pt-3">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Paso a paso: qué se hace y por qué
          </p>
          <div className="cornell text-sm" dangerouslySetInnerHTML={{ __html: renderCornell(ex.solution) }} />
        </div>
        {canEdit && (
          <div className="flex gap-1 border-t border-border pt-2">
            <button
              type="button"
              onClick={onEdit}
              className="tap rounded-md text-muted-foreground hover:bg-accent"
              aria-label={`Editar ${ex.title}`}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!window.confirm(`¿Eliminar «${ex.title}»?`)) return;
                await deleteProjectExercise(ex.id);
                router.refresh();
                toast("Ejercicio eliminado", "info");
              }}
              className="tap rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              aria-label={`Eliminar ${ex.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </details>
  );
}

/** Talleres y ejercicios del proyecto, resueltos paso a paso (qué se hace, por qué y con qué unidades). */
export function ProjectExercises({
  projectId,
  exercises,
  promptContext,
}: {
  projectId: string;
  exercises: ProjectExerciseView[];
  promptContext: ProjectExercisePromptContext;
}) {
  const canEdit = useCanContribute();
  const [panel, setPanel] = useState<"prompt" | "import" | "add" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const sorted = useMemo(() => [...exercises].sort((a, b) => a.order - b.order), [exercises]);
  const workshops = useMemo(
    () => Array.from(new Set(sorted.map((e) => e.workshop).filter((w): w is string => !!w))),
    [sorted],
  );
  const groups = useMemo(() => {
    const out: { name: string | null; items: ProjectExerciseView[] }[] = workshops.map((w) => ({
      name: w,
      items: sorted.filter((e) => e.workshop === w),
    }));
    const loose = sorted.filter((e) => !e.workshop);
    if (loose.length) out.push({ name: null, items: loose });
    return out;
  }, [sorted, workshops]);

  const toggle = (p: "prompt" | "import" | "add") => setPanel((cur) => (cur === p ? null : p));

  return (
    <Card>
      <CardHeader className="flex-row flex-wrap items-center justify-between gap-2 p-4 pb-2">
        <CardTitle className="flex items-center gap-1.5 text-sm">
          <FlaskConical className="h-4 w-4" aria-hidden />
          Talleres y ejercicios
          {sorted.length > 0 && <span className="font-normal text-muted-foreground">({sorted.length})</span>}
        </CardTitle>
        <div className="flex flex-wrap items-center gap-1.5">
          <Button size="sm" variant="ghost" onClick={() => toggle("prompt")} aria-expanded={panel === "prompt"}>
            <Sparkles className="h-3.5 w-3.5" />
            Prompt para IA
          </Button>
          {canEdit && (
            <>
              <Button size="sm" variant="ghost" onClick={() => toggle("import")} aria-expanded={panel === "import"}>
                <ClipboardPaste className="h-3.5 w-3.5" />
                Pegar respuesta de la IA
              </Button>
              <Button size="sm" variant="outline" onClick={() => toggle("add")} aria-expanded={panel === "add"}>
                <Plus className="h-3.5 w-3.5" />
                Agregar
              </Button>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 p-4 pt-2">
        {panel === "prompt" && <PromptSection ctx={promptContext} workshops={workshops} />}
        {canEdit && panel === "import" && <ImportSection projectId={projectId} onDone={() => setPanel(null)} />}
        {canEdit && panel === "add" && (
          <ExerciseForm projectId={projectId} workshops={workshops} onDone={() => setPanel(null)} />
        )}

        {sorted.length === 0 && panel === null && (
          <p className="text-sm text-muted-foreground">
            Aún no hay talleres ni ejercicios. Copia el «Prompt para IA», pégalo en la IA donde trabajas el proyecto y
            trae de vuelta su respuesta con «Pegar respuesta de la IA»; o usa «Agregar» para escribirlos a mano.
          </p>
        )}

        {groups.map((g) => (
          <div key={g.name ?? "__suelto"} className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {g.name ?? (workshops.length ? "Ejercicios sueltos" : "Ejercicios")}
              <span className="ml-1.5 font-normal normal-case">({g.items.length})</span>
            </p>
            {g.items.map((ex) => (
              <ExerciseCard
                key={ex.id}
                ex={ex}
                canEdit={canEdit}
                editing={editingId === ex.id}
                workshops={workshops}
                projectId={projectId}
                onEdit={() => setEditingId(ex.id)}
                onDone={() => setEditingId(null)}
              />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
