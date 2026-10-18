"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUp,
  BookOpen,
  CalendarDays,
  Dumbbell,
  FlaskConical,
  FolderOpen,
  Gauge,
  GraduationCap,
  History,
  Info,
  LayoutGrid,
  LayoutList,
  Link2,
  ListChecks,
  MessageSquare,
  NotebookPen,
  StickyNote,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/** Íconos disponibles por nombre (una página de servidor no puede pasar componentes al cliente). */
const ICONS = {
  info: Info,
  book: BookOpen,
  notes: NotebookPen,
  checks: ListChecks,
  practice: Dumbbell,
  folder: FolderOpen,
  lab: FlaskConical,
  gauge: Gauge,
  grad: GraduationCap,
  calendar: CalendarDays,
  grid: LayoutGrid,
  history: History,
  note: StickyNote,
  target: Target,
  link: Link2,
  chat: MessageSquare,
} satisfies Record<string, LucideIcon>;

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

export type RailIcon = keyof typeof ICONS;
export type RailItem = { id: string; label: string; icon: RailIcon };

/**
 * Menú rápido al costado de la página: un botón con ícono por sección importante, para saltar
 * a ella en un clic sin desplazarse. Marca la sección en la que estás, abre las secciones
 * plegadas (<details>) al llegar y trae un botón "Arriba". En pantallas chicas se recoge en un
 * botón flotante. Cada `id` debe existir en la página (con `scroll-mt-24`).
 */
export function SectionRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  const [open, setOpen] = useState(false); // solo cuenta en pantallas chicas
  // Se dibuja en <body> (portal): así queda fijo a la ventana aunque la página tenga una
  // animación de entrada con transform, que volvería "fixed" relativo al contenido.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Tras un clic, la sección elegida queda marcada aunque otra corta quede también arriba.
  const lock = useRef<{ id: string; until: number } | null>(null);

  // Sección actual: la última cuyo borde superior ya pasó la línea de lectura (justo bajo el
  // margen de salto, scroll-mt-24 = 96 px).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (lock.current && Date.now() < lock.current.until) {
        setActive(lock.current.id);
        return;
      }
      const line = 130;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = items[0]?.id ?? null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      if (atBottom && items.length > 0) current = items[items.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const details = el.closest("details");
    if (details) details.open = true;
    el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    lock.current = { id, until: Date.now() + 1500 };
    setActive(id);
    setOpen(false);
  }, []);

  const btn =
    "press group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring max-lg:h-10 max-lg:w-10";
  const tip =
    "pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-100";

  if (!mounted) return null;

  return createPortal(
    <nav
      aria-label="Ir a una sección de esta página"
      className="fixed bottom-4 right-3 z-30 flex flex-col items-end gap-2 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
    >
      <ul
        className={cn(
          "flex-col gap-1.5 rounded-2xl border border-border bg-card/95 p-1.5 shadow-card backdrop-blur supports-[backdrop-filter]:bg-card/80 lg:flex",
          open ? "flex" : "hidden",
        )}
      >
        {items.map((it) => {
          const Icon = ICONS[it.icon];
          const on = active === it.id;
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => goTo(it.id)}
                aria-label={it.label}
                aria-current={on ? "true" : undefined}
                className={cn(
                  btn,
                  on ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                <span className={tip}>{it.label}</span>
              </button>
            </li>
          );
        })}
        <li className="mt-0.5 border-t border-border pt-1.5">
          <button
            type="button"
            onClick={() => {
              lock.current = null;
              window.scrollTo({ top: 0, behavior: scrollBehavior() });
              setOpen(false);
            }}
            aria-label="Subir al inicio"
            className={cn(btn, "text-muted-foreground hover:bg-accent hover:text-accent-foreground")}
          >
            <ArrowUp className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            <span className={tip}>Arriba</span>
          </button>
        </li>
      </ul>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar el menú de secciones" : "Abrir el menú de secciones"}
        aria-expanded={open}
        className="press flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
      >
        {open ? <X className="h-5 w-5" strokeWidth={1.75} aria-hidden /> : <LayoutList className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
      </button>
    </nav>,
    document.body,
  );
}
