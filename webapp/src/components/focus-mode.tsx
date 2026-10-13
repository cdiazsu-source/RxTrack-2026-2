"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowRight,
  Check,
  ClipboardCopy,
  ExternalLink,
  LifeBuoy,
  Pause,
  Play,
  Plus,
  Target,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import { addChecklistItem, toggleChecklistItem } from "@/lib/actions/checklist";
import { addFocusMinutes, deferChecklistItem, setFocusNote, splitChecklistItem } from "@/lib/actions/focus";
import { addInboxItem } from "@/lib/actions/inbox";
import { focusSplitPrompt } from "@/lib/prompts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HelpHint } from "@/components/help-hint";
import { toast } from "@/components/ui/toast";
import { useCanContribute } from "@/components/access-context";
import { cn } from "@/lib/utils";

/**
 * Modo Enfoque de un proyecto: una pantalla limpia con UNA cosa a la vez.
 *
 * Decisiones de diseño (todas pensadas para una atención que se escapa):
 *  - Arranque diminuto: «empezar solo 2 minutos» baja la barrera de iniciar; al
 *    terminar se ofrece seguir, nunca se obliga.
 *  - El tiempo se ve (anillo que se vacía + cuenta en la pestaña): no hay que
 *    «sentirlo». Aviso suave antes del final para cerrar el hilo sin cortones.
 *  - Un solo paso en pantalla y el siguiente en una línea. Marcarlo da respuesta
 *    inmediata (y la frase cambia, para que no se vuelva ruido).
 *  - «Se me complicó»: dividir el paso, pedirle a una IA que lo divida, o
 *    dejarlo para después. Atascarse tiene salida.
 *  - Estacionamiento de ideas: lo que se cruza se anota sin salir y va a la
 *    bandeja, ligado a la asignatura.
 *  - Pausas reales tras cada bloque y aviso tras varios bloques seguidos.
 *  - «Para retomar»: al cerrar un bloque se deja escrito dónde quedaste; es lo
 *    primero que se ve al volver.
 *  - Todo sobrevive a recargar la pestaña (el temporizador guarda su hora final).
 *  - Nada punitivo: pausar, salir o parar antes no cuesta nada.
 */

export type FocusStep = { id: string; text: string; done: boolean };

type Timer = {
  kind: "work" | "break";
  /** Bloque de arranque de 2 min. */
  starter: boolean;
  totalSec: number;
  /** ms epoch en que termina; null = en pausa. */
  endsAt: number | null;
  pausedLeftSec: number | null;
  /** Ya terminó (o se cortó) y espera decisión. */
  finished: boolean;
  /** Segundos realmente trabajados (solo válido si finished). */
  workedSec: number;
  /** Los minutos de este bloque ya se sumaron al proyecto. */
  recorded: boolean;
  warned: boolean;
  doneInBlock: number;
  startedAt: number;
};
type Saved = { t: Timer | null; chain: number };

const PHRASES = [
  "Listo. Un paso menos.",
  "Eso cuenta. Sigue así.",
  "Avance real: ya está hecho.",
  "Bien. Respira y sigue.",
  "Un paso más cerca.",
  "Hecho, y no se deshace.",
  "Así se avanza: paso a paso.",
  "Ese ya no hay que volver a hacerlo.",
];
const BREAK_IDEAS = [
  "Toma un vaso de agua.",
  "Párate y estira hombros y cuello.",
  "Mira algo lejano durante 20 segundos.",
  "Camina hasta otra habitación y vuelve.",
  "Respira lento: 4 segundos entrando, 6 saliendo.",
  "Come algo pequeño si tienes hambre.",
];

const storageKey = (projectId: string) => `rxtrack:focus:${projectId}`;
const SOUND_KEY = "rxtrack:focus:sound";

function loadSaved(projectId: string): Saved {
  try {
    const raw = localStorage.getItem(storageKey(projectId));
    if (raw) {
      const s = JSON.parse(raw);
      if (s && typeof s.chain === "number") return { t: s.t ?? null, chain: s.chain };
    }
  } catch {
    /* sin almacenamiento: arranca limpio */
  }
  return { t: null, chain: 0 };
}
function persist(projectId: string, s: Saved) {
  try {
    if (!s.t && s.chain === 0) localStorage.removeItem(storageKey(projectId));
    else localStorage.setItem(storageKey(projectId), JSON.stringify(s));
  } catch {
    /* ignorar */
  }
}

function leftOf(t: Timer, now: number): number {
  if (t.finished) return 0;
  if (t.endsAt === null) return t.pausedLeftSec ?? 0;
  return Math.max(0, Math.ceil((t.endsAt - now) / 1000));
}
function fmt(sec: number): string {
  const s = Math.max(0, sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(r).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function newTimer(kind: Timer["kind"], minutes: number, starter = false): Timer {
  const totalSec = Math.round(minutes * 60);
  const now = Date.now();
  return {
    kind,
    starter,
    totalSec,
    endsAt: now + totalSec * 1000,
    pausedLeftSec: null,
    finished: false,
    workedSec: 0,
    recorded: false,
    warned: false,
    doneInBlock: 0,
    startedAt: now,
  };
}

function Ring({
  left,
  total,
  tone,
  children,
}: {
  left: number;
  total: number;
  tone: "work" | "break";
  children: React.ReactNode;
}) {
  const size = 232;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const frac = total > 0 ? Math.min(1, Math.max(0, left / total)) : 0;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - frac)}
          className={cn(
            "transition-[stroke-dashoffset] duration-500 ease-linear",
            tone === "work" ? "stroke-primary" : "stroke-success",
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

export function FocusMode({
  projectId,
  projectTitle,
  subjectId,
  subjectName,
  driveUrl,
  items,
  focusNote,
  focusMinutes,
  autoOpen = false,
}: {
  projectId: string;
  projectTitle: string;
  subjectId: string;
  subjectName: string;
  driveUrl: string | null;
  items: FocusStep[];
  focusNote: string | null;
  focusMinutes: number;
  autoOpen?: boolean;
}) {
  const canContribute = useCanContribute();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [t, setT] = useState<Timer | null>(null);
  const [chain, setChain] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [sound, setSound] = useState(true);
  const [localDone, setLocalDone] = useState<Set<string>>(new Set());
  const [deferred, setDeferred] = useState<string[]>([]);
  const [flash, setFlash] = useState<string | null>(null);
  const [stuckOpen, setStuckOpen] = useState(false);
  const [splitText, setSplitText] = useState("");
  const [ready, setReady] = useState({
    water: false,
    phone: false,
    material: false,
  });
  const [noteDraft, setNoteDraft] = useState("");
  const [parking, setParking] = useState("");
  const [newStep, setNewStep] = useState("");
  const [, startAction] = useTransition();
  const audioRef = useRef<AudioContext | null>(null);
  const lastPhrase = useRef(-1);
  const finishedFor = useRef<number | null>(null);

  // ---- Carga / guardado del temporizador (sobrevive a recargas) ----
  useEffect(() => {
    const s = loadSaved(projectId);
    // Un bloque que terminó hace rato (pestaña cerrada) se cierra sin acreditar minutos.
    if (s.t && !s.t.finished && s.t.endsAt !== null && Date.now() - s.t.endsAt > 5 * 60 * 1000) {
      finishedFor.current = s.t.startedAt;
      s.t = {
        ...s.t,
        finished: true,
        endsAt: null,
        pausedLeftSec: 0,
        workedSec: 0,
        recorded: true,
      };
    }
    setT(s.t);
    setChain(s.chain);
    try {
      setSound(localStorage.getItem(SOUND_KEY) !== "off");
    } catch {
      /* ignorar */
    }
    setLoaded(true);
    if (autoOpen) setOpen(true);
  }, [projectId, autoOpen]);

  useEffect(() => {
    if (loaded) persist(projectId, { t, chain });
  }, [loaded, projectId, t, chain]);

  useEffect(() => {
    setNoteDraft(focusNote ?? "");
  }, [focusNote]);

  // ---- Reloj: solo corre mientras hay un bloque en marcha ----
  const running = !!t && !t.finished && t.endsAt !== null;
  useEffect(() => {
    if (!running) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, [running]);

  const left = t ? leftOf(t, now) : 0;

  // ---- Sonido / vibración (con permiso del gesto del clic de «Empezar») ----
  const unlockAudio = useCallback(() => {
    try {
      if (!audioRef.current) {
        const Ctx =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (Ctx) audioRef.current = new Ctx();
      }
      void audioRef.current?.resume();
    } catch {
      /* sin audio */
    }
  }, []);
  const chime = useCallback(
    (kind: "soft" | "end") => {
      if (sound) {
        try {
          const ctx = audioRef.current;
          if (ctx) {
            const notes = kind === "end" ? [660, 880, 660] : [520];
            notes.forEach((f, i) => {
              const o = ctx.createOscillator();
              const g = ctx.createGain();
              o.type = "sine";
              o.frequency.value = f;
              const at = ctx.currentTime + i * 0.28;
              g.gain.setValueAtTime(0.0001, at);
              g.gain.exponentialRampToValueAtTime(0.18, at + 0.03);
              g.gain.exponentialRampToValueAtTime(0.0001, at + 0.25);
              o.connect(g).connect(ctx.destination);
              o.start(at);
              o.stop(at + 0.27);
            });
          }
        } catch {
          /* ignorar */
        }
      }
      try {
        navigator.vibrate?.(kind === "end" ? [180, 90, 180] : 80);
      } catch {
        /* ignorar */
      }
    },
    [sound],
  );

  // ---- Fin de bloque ----
  const finish = useCallback(
    (cur: Timer, natural: boolean) => {
      const nowMs = Date.now();
      const workedSec = natural ? cur.totalSec : Math.max(0, cur.totalSec - leftOf(cur, nowMs));
      const next: Timer = {
        ...cur,
        finished: true,
        endsAt: null,
        pausedLeftSec: 0,
        workedSec,
        recorded: true,
      };
      if (cur.kind === "work" && !cur.recorded) {
        const minutes = Math.round(workedSec / 60);
        if (minutes >= 1) startAction(async () => addFocusMinutes(projectId, minutes));
      }
      setT(next);
      return next;
    },
    [projectId],
  );

  useEffect(() => {
    if (!t || t.finished || t.endsAt === null) return;
    // Aviso suave antes del final (solo bloques largos): cierra el hilo.
    if (t.kind === "work" && !t.warned && t.totalSec >= 600 && left <= 120 && left > 0) {
      setT({ ...t, warned: true });
      chime("soft");
      return;
    }
    if (left <= 0 && finishedFor.current !== t.startedAt) {
      finishedFor.current = t.startedAt;
      chime("end");
      finish(t, true);
      if (!open) toast(t.kind === "work" ? "Bloque terminado — vuelve al Modo Enfoque" : "Pausa terminada", "info");
    }
  }, [t, left, chime, finish, open]);

  // ---- Título de la pestaña con la cuenta atrás ----
  useEffect(() => {
    if (!running || !t) return;
    const original = document.title;
    document.title = `${fmt(left)} · ${t.kind === "work" ? "Enfoque" : "Pausa"}`;
    return () => {
      document.title = original;
    };
  }, [running, left, t]);

  // ---- Pantalla encendida mientras trabajas ----
  useEffect(() => {
    if (!open || !running) return;
    let lock: { release: () => Promise<void> } | null = null;
    const nav = navigator as unknown as {
      wakeLock?: {
        request: (t: "screen") => Promise<{ release: () => Promise<void> }>;
      };
    };
    nav.wakeLock
      ?.request("screen")
      .then((l) => (lock = l))
      .catch(() => {});
    return () => {
      void lock?.release().catch(() => {});
    };
  }, [open, running]);

  // ---- Overlay: sin scroll de fondo, Esc para salir (el bloque sigue) ----
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "Escape" && tag !== "INPUT" && tag !== "TEXTAREA") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // ---- Pasos ----
  const pending = useMemo(() => {
    const undone = items.filter((i) => !i.done && !localDone.has(i.id));
    const normal = undone.filter((i) => !deferred.includes(i.id));
    const later = deferred.map((id) => undone.find((i) => i.id === id)).filter((i): i is FocusStep => !!i);
    return [...normal, ...later];
  }, [items, localDone, deferred]);
  const current = pending[0] ?? null;
  const upcoming = pending[1] ?? null;
  const total = items.length;
  const doneCount = items.filter((i) => i.done || localDone.has(i.id)).length;

  function completeStep(id: string) {
    setLocalDone((s) => new Set(s).add(id));
    let i = Math.floor(Math.random() * PHRASES.length);
    if (i === lastPhrase.current) i = (i + 1) % PHRASES.length;
    lastPhrase.current = i;
    setFlash(PHRASES[i]);
    window.setTimeout(() => setFlash(null), 1200);
    setT((cur) => (cur ? { ...cur, doneInBlock: cur.doneInBlock + 1 } : cur));
    setStuckOpen(false);
    startAction(async () => toggleChecklistItem(id, true));
  }

  function startWork(minutes: number, starter = false) {
    unlockAudio();
    finishedFor.current = null;
    setT(newTimer("work", minutes, starter));
    setChain((c) => c + 1);
    setStuckOpen(false);
  }
  function startBreak(minutes: number) {
    unlockAudio();
    finishedFor.current = null;
    setT(newTimer("break", minutes));
    setChain(0);
  }
  function clearAll() {
    setT(null);
    setChain(0);
    setLocalDone(new Set());
    setDeferred([]);
  }
  function togglePause() {
    setT((cur) => {
      if (!cur || cur.finished) return cur;
      if (cur.endsAt !== null) return { ...cur, endsAt: null, pausedLeftSec: leftOf(cur, Date.now()) };
      return {
        ...cur,
        endsAt: Date.now() + (cur.pausedLeftSec ?? 0) * 1000,
        pausedLeftSec: null,
      };
    });
  }
  function extend(min: number) {
    setT((cur) => {
      if (!cur || cur.finished) return cur;
      const add = min * 60;
      return cur.endsAt !== null
        ? {
            ...cur,
            totalSec: cur.totalSec + add,
            endsAt: cur.endsAt + add * 1000,
            warned: false,
          }
        : {
            ...cur,
            totalSec: cur.totalSec + add,
            pausedLeftSec: (cur.pausedLeftSec ?? 0) + add,
            warned: false,
          };
    });
  }
  function saveNote() {
    const v = noteDraft;
    startAction(async () => setFocusNote(projectId, v));
    toast(v.trim() ? "Anotado para retomar" : "Nota para retomar borrada", "info");
  }
  function park(e: React.FormEvent) {
    e.preventDefault();
    const text = parking.trim();
    if (!text) return;
    const fd = new FormData();
    fd.set("text", text);
    fd.set("subjectId", subjectId);
    setParking("");
    startAction(async () => addInboxItem(fd));
    toast("Anotado. Vuelve a lo tuyo.");
  }
  function addStep(e: React.FormEvent) {
    e.preventDefault();
    const text = newStep.trim();
    if (!text) return;
    const fd = new FormData();
    fd.set("text", text);
    setNewStep("");
    startAction(async () => addChecklistItem({ type: "project", id: projectId }, fd));
    toast("Paso agregado");
  }

  if (!canContribute) return null;

  const active = !!t && !t.finished;
  const launcherLabel = !t
    ? "Entrar en Modo Enfoque"
    : t.finished
      ? "Volver al Modo Enfoque"
      : `Volver al enfoque · ${fmt(left)}`;

  // ============================ Vista del overlay ============================
  const chainWarn = chain >= 3;
  const breakIdea = t ? BREAK_IDEAS[Math.abs(Math.floor(t.startedAt / 1000)) % BREAK_IDEAS.length] : BREAK_IDEAS[0];
  const breakIdea2 = t
    ? BREAK_IDEAS[(Math.abs(Math.floor(t.startedAt / 1000)) + 3) % BREAK_IDEAS.length]
    : BREAK_IDEAS[1];

  const stepCard = (
    <div className="flex flex-col gap-3">
      {current ? (
        <div className="relative rounded-2xl border-2 border-primary/30 bg-primary/[0.05] p-5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-primary">Tu paso ahora</p>
          <p className="font-display text-xl font-semibold leading-snug">{current.text}</p>
          {upcoming && (
            <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
              <ArrowRight className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
              <span>Después: {upcoming.text}</span>
            </p>
          )}
          {flash && (
            <div className="rx-pop absolute inset-0 flex items-center justify-center gap-2 rounded-2xl bg-card/95 text-center text-base font-semibold text-success">
              <Check className="h-6 w-6" aria-hidden />
              {flash}
            </div>
          )}
        </div>
      ) : flash ? (
        <div className="rx-pop flex items-center justify-center gap-2 rounded-2xl border-2 border-success/40 bg-success/10 p-5 text-center text-base font-semibold text-success">
          <Check className="h-6 w-6" aria-hidden />
          {flash}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-input p-5 text-center">
          <p className="text-sm font-medium">
            {total === 0 ? "Este proyecto aún no tiene pasos." : "Ya no quedan pasos pendientes."}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {total === 0
              ? "Escribe el primero: pequeño y concreto, algo que se pueda empezar con las manos."
              : "Si falta algo, agrega el siguiente paso aquí abajo."}
          </p>
        </div>
      )}

      {current && (
        <div className="flex flex-wrap gap-2">
          <Button size="lg" className="h-12 flex-1 text-base" onClick={() => completeStep(current.id)}>
            <Check className="h-5 w-5" />
            Hecho
          </Button>
          <Button size="lg" variant="outline" className="h-12" onClick={() => setStuckOpen((s) => !s)}>
            <LifeBuoy className="h-4 w-4" />
            Se me complicó
          </Button>
        </div>
      )}

      {current && stuckOpen && (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-medium">Está bien. Hagámoslo más fácil de empezar:</p>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" htmlFor="split">
              1. Divídelo en pasos pequeños (uno por línea)
            </label>
            <Textarea
              id="split"
              rows={3}
              value={splitText}
              onChange={(e) => setSplitText(e.target.value)}
              placeholder={"Abrir el archivo\nEscribir el título\nCopiar los datos de la tabla"}
            />
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                disabled={!splitText.trim()}
                onClick={() => {
                  const steps = splitText.split("\n");
                  startAction(async () => splitChecklistItem(current.id, steps));
                  setSplitText("");
                  setStuckOpen(false);
                  toast("Paso dividido");
                }}
              >
                Reemplazar por estos pasos
              </Button>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                onClick={async () => {
                  const text = focusSplitPrompt({
                    subjectName,
                    projectTitle,
                    step: current.text,
                    otherSteps: pending.slice(1, 8).map((p) => p.text),
                  });
                  try {
                    await navigator.clipboard.writeText(text);
                    toast("Prompt copiado: pégalo en tu IA y trae los pasos aquí");
                  } catch {
                    toast("No se pudo copiar", "error");
                  }
                }}
              >
                <ClipboardCopy className="h-3.5 w-3.5" />
                Copiar prompt para que una IA lo divida
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 border-t border-border pt-3">
            <p className="text-xs font-semibold">2. O déjalo para después y sigue con el siguiente</p>
            <div>
              <Button
                size="sm"
                variant="outline"
                disabled={!upcoming}
                onClick={() => {
                  setDeferred((d) => [...d.filter((x) => x !== current.id), current.id]);
                  startAction(async () => deferChecklistItem(current.id));
                  setStuckOpen(false);
                  toast("Lo dejé para después", "info");
                }}
              >
                Dejar para después
              </Button>
            </div>
          </div>
        </div>
      )}

      {(total === 0 || !current) && (
        <form onSubmit={addStep} className="flex gap-2">
          <Input
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="Un paso pequeño y concreto…"
            aria-label="Nuevo paso"
          />
          <Button type="submit" size="sm" disabled={!newStep.trim()}>
            <Plus className="h-3.5 w-3.5" />
            Agregar
          </Button>
        </form>
      )}
    </div>
  );

  const parkingLot = (
    <form onSubmit={park} className="flex flex-col gap-1">
      <label htmlFor="parking" className="text-xs font-medium text-muted-foreground">
        ¿Se te cruzó algo? Anótalo aquí y vuelve a lo tuyo
      </label>
      <div className="flex gap-2">
        <Input
          id="parking"
          value={parking}
          onChange={(e) => setParking(e.target.value)}
          placeholder="Una idea, algo por hacer, una duda…"
        />
        <Button type="submit" size="sm" variant="outline" disabled={!parking.trim()}>
          Anotar
        </Button>
      </div>
    </form>
  );

  let body: React.ReactNode;

  if (t && !t.finished && t.kind === "work") {
    // ---- Trabajando ----
    const warnSoon = t.totalSec >= 600 && left <= 120;
    body = (
      <>
        <Ring left={left} total={t.totalSec} tone="work">
          <span className="font-display text-5xl font-semibold tabular-nums">{fmt(left)}</span>
          <span className="mt-1 text-xs text-muted-foreground">
            {t.endsAt === null
              ? "en pausa"
              : t.starter
                ? "arranque de 2 min"
                : `bloque de ${Math.round(t.totalSec / 60)} min`}
          </span>
        </Ring>
        {warnSoon && t.endsAt !== null && (
          <p className="rounded-lg bg-warning/15 px-3 py-2 text-center text-sm font-medium">
            Quedan {Math.max(1, Math.ceil(left / 60))} min: ve cerrando el hilo y deja anotado dónde te quedas.
          </p>
        )}
        {stepCard}
        {parkingLot}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="sm" variant="outline" onClick={togglePause}>
            {t.endsAt === null ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {t.endsAt === null ? "Seguir" : "Pausar"}
          </Button>
          <Button size="sm" variant="outline" onClick={() => extend(5)}>
            <Plus className="h-3.5 w-3.5" />5 min
          </Button>
          <Button size="sm" variant="ghost" onClick={() => finish(t, false)}>
            Terminar este bloque
          </Button>
        </div>
        {t.doneInBlock > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            En este bloque: {t.doneInBlock} paso{t.doneInBlock === 1 ? "" : "s"} hecho{t.doneInBlock === 1 ? "" : "s"}.
          </p>
        )}
      </>
    );
  } else if (t && !t.finished && t.kind === "break") {
    // ---- Pausa ----
    body = (
      <>
        <Ring left={left} total={t.totalSec} tone="break">
          <span className="font-display text-5xl font-semibold tabular-nums">{fmt(left)}</span>
          <span className="mt-1 text-xs text-muted-foreground">{t.endsAt === null ? "en pausa" : "pausa"}</span>
        </Ring>
        <div className="rounded-2xl border border-success/30 bg-success/[0.06] p-5 text-center">
          <p className="font-display text-lg font-semibold">Levántate de la silla.</p>
          <p className="mt-2 text-sm">{breakIdea}</p>
          <p className="text-sm">{breakIdea2}</p>
          <p className="mt-3 text-xs text-muted-foreground">Esta pausa también es parte del trabajo.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="sm" variant="outline" onClick={togglePause}>
            {t.endsAt === null ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {t.endsAt === null ? "Seguir" : "Pausar"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setT(null)}>
            Ya estoy listo
          </Button>
        </div>
        {parkingLot}
      </>
    );
  } else if (t && t.finished && t.kind === "work") {
    // ---- Terminó un bloque de trabajo ----
    const minutes = Math.max(0, Math.round(t.workedSec / 60));
    body = (
      <>
        <div className="rounded-2xl border border-primary/30 bg-primary/[0.05] p-5 text-center">
          <p className="font-display text-xl font-semibold">{t.starter ? "Ya arrancaste." : "Bloque terminado."}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {minutes} min de trabajo
            {t.doneInBlock > 0
              ? ` · ${t.doneInBlock} paso${t.doneInBlock === 1 ? "" : "s"} hecho${t.doneInBlock === 1 ? "" : "s"}`
              : ""}
            .
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="resume-note" className="text-sm font-medium">
            Para retomar: ¿dónde te quedas y cuál es el primer paso al volver?
          </label>
          <Textarea
            id="resume-note"
            rows={2}
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            placeholder="Ej.: Quedé en la tabla 2; lo primero es calcular la media."
          />
          <div>
            <Button
              size="sm"
              variant="outline"
              onClick={saveNote}
              disabled={noteDraft.trim() === (focusNote ?? "").trim()}
            >
              Guardar nota
            </Button>
          </div>
        </div>

        {chainWarn && (
          <p className="rounded-lg bg-warning/15 px-3 py-2 text-sm font-medium">
            Ya van {chain} bloques seguidos. Haz una pausa de verdad: tu cabeza rinde más si descansa.
          </p>
        )}

        <div className="flex flex-col gap-2">
          <Button size="lg" className="h-12 text-base" onClick={() => startBreak(chain >= 4 ? 15 : 5)}>
            Pausa de {chain >= 4 ? 15 : 5} min
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Otro bloque:</span>
            {[10, 15, 25].map((m) => (
              <Button key={m} size="sm" variant="outline" onClick={() => startWork(m)}>
                {m} min
              </Button>
            ))}
            <Button size="sm" variant="ghost" className="ml-auto" onClick={clearAll}>
              Terminar por hoy
            </Button>
          </div>
        </div>
      </>
    );
  } else if (t && t.finished && t.kind === "break") {
    // ---- Terminó la pausa ----
    body = (
      <>
        <div className="rounded-2xl border border-success/30 bg-success/[0.06] p-5 text-center">
          <p className="font-display text-xl font-semibold">Pausa terminada.</p>
          <p className="mt-1 text-sm text-muted-foreground">Cuando quieras, el siguiente paso te espera.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="lg" className="h-12 flex-1 text-base" onClick={() => startWork(2, true)}>
            Empezar solo 2 minutos
          </Button>
          {[10, 25].map((m) => (
            <Button key={m} size="sm" variant="outline" onClick={() => startWork(m)}>
              {m} min
            </Button>
          ))}
        </div>
        <div className="text-center">
          <Button size="sm" variant="ghost" onClick={clearAll}>
            Terminar por hoy
          </Button>
        </div>
      </>
    );
  } else {
    // ---- Inicio ----
    body = (
      <>
        {focusNote && (
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Para retomar</p>
            <p className="mt-1 whitespace-pre-line text-sm leading-snug">{focusNote}</p>
          </div>
        )}

        {stepCard}

        <div className="flex flex-col gap-2">
          <Button size="lg" className="h-14 text-base" onClick={() => startWork(2, true)}>
            <Play className="h-5 w-5" />
            Empezar solo 2 minutos
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Solo 2. Al terminar decides si sigues; no estás obligado.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">O un bloque de:</span>
            {[10, 15, 25, 45].map((m) => (
              <Button key={m} size="sm" variant="outline" onClick={() => startWork(m)}>
                {m} min
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground">Prepara el terreno (opcional, 30 segundos)</p>
          {(
            [
              ["water", "Agua a la mano"],
              ["phone", "Celular en silencio y lejos"],
              ["material", "Material abierto y a la vista"],
            ] as const
          ).map(([k, label]) => (
            <label key={k} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={ready[k]}
                onChange={(e) => setReady((r) => ({ ...r, [k]: e.target.checked }))}
                className="h-4 w-4 rounded border-input accent-[hsl(var(--primary))]"
              />
              <span className={cn(ready[k] && "text-muted-foreground line-through")}>{label}</span>
            </label>
          ))}
          {driveUrl && (
            <a
              href={driveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Abrir el material del proyecto
            </a>
          )}
        </div>

        {parkingLot}

        {focusMinutes > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            Llevas {focusMinutes} min de trabajo enfocado en este proyecto.
          </p>
        )}
      </>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 py-4">
          <Button
            onClick={() => setOpen(true)}
            className={cn(active && "ring-2 ring-primary/40 ring-offset-2 ring-offset-background")}
          >
            <Target className="h-4 w-4" />
            {launcherLabel}
          </Button>
          <div className="min-w-0 text-xs text-muted-foreground">
            {pending.length > 0 ? (
              <span>
                Siguiente paso: <span className="font-medium text-foreground">{pending[0].text}</span>
              </span>
            ) : (
              <span>{total === 0 ? "Aún sin pasos." : "Sin pasos pendientes."}</span>
            )}
            {focusMinutes > 0 && <span> · {focusMinutes} min enfocado</span>}
          </div>
          <HelpHint k="modo-enfoque" className="ml-auto" />
        </CardContent>
      </Card>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Modo Enfoque"
            className="fixed inset-0 z-[55] overflow-y-auto bg-background"
          >
            <div className="mx-auto flex min-h-full w-full max-w-xl flex-col gap-5 px-4 py-5">
              <header className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{subjectName}</p>
                  <h2 className="font-display text-base font-semibold leading-snug">{projectTitle}</h2>
                  {total > 0 && (
                    <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                      {doneCount} de {total} pasos
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const v = !sound;
                    setSound(v);
                    try {
                      localStorage.setItem(SOUND_KEY, v ? "on" : "off");
                    } catch {
                      /* ignorar */
                    }
                  }}
                  className="tap rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                  aria-label={sound ? "Silenciar avisos" : "Activar avisos sonoros"}
                  title={sound ? "Sonido activado" : "Sonido silenciado"}
                >
                  {sound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="tap rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                  aria-label="Salir del Modo Enfoque (el bloque sigue corriendo)"
                  title={active ? "Salir (el bloque sigue corriendo)" : "Salir"}
                >
                  <X className="h-5 w-5" />
                </button>
              </header>
              {body}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
