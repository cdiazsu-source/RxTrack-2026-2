"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Eye, Inbox, Layers, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SubjectScope } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";
import { startViewAs, stopViewAs } from "@/lib/actions/view-as";
import { SubjectSwitcher, type SwitcherSubject } from "@/components/subject-switcher";
import { SearchDialog } from "@/components/search-dialog";
import { QuickCapture } from "@/components/quick-capture";

/** Fecha del último cambio a la app. Actualízala a mano al publicar cambios. */
const LAST_MODIFIED = "10 sep 2026";

export function SiteNav({
  canEdit,
  subjects,
  inboxCount,
  realFull = false,
  viewingAs = false,
  scope = null,
}: {
  canEdit: boolean;
  subjects: SwitcherSubject[];
  inboxCount: number;
  /** Nivel real "full" (Cesar), aunque esté viendo como Diana. */
  realFull?: boolean;
  /** Cesar está en modo "ver como Diana". */
  viewingAs?: boolean;
  /** Sesión con acceso acotado (JOSE, Paula): solo marca + sus asignaturas + salir. */
  scope?: SubjectScope[] | null;
}) {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  if (scope && scope.length > 0) {
    return (
      <header className="site-nav sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <span className="font-display text-xl font-semibold tracking-tight text-primary">RxTrack</span>
          <div className="flex items-center gap-3">
            {scope.length > 1 && (
              <nav className="flex items-center gap-1.5">
                {scope.map((s) => {
                  const href = s.section ? `/${s.subject}/${s.section}` : `/${s.subject}`;
                  const label = subjects.find((sub) => sub.id === s.subject)?.code ?? s.subject.toUpperCase();
                  const active = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "press rounded-md px-2.5 py-1 text-sm font-medium transition-colors",
                        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
            )}
            <form action={logout}>
              <button
                type="submit"
                className="press inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </form>
          </div>
        </div>
      </header>
    );
  }

  const link = (href: string, label: string, Icon: typeof Inbox, badge?: number) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={cn(
          "press relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium transition-colors",
          active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <Icon className="h-3.5 w-3.5" />
        <span className="hidden md:inline">{label}</span>
        {badge ? (
          <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-warning px-1 text-[10px] font-semibold text-warning-foreground">
            {badge}
          </span>
        ) : null}
      </Link>
    );
  };

  return (
    <header className="site-nav sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-primary">
          RxTrack
        </Link>

        {link("/", "Semestre", Layers)}
        {link("/calendario", "Calendario", CalendarDays)}
        {link("/repaso", "Repaso", Layers)}
        {link("/inbox", "Bandeja", Inbox, inboxCount)}

        <div className="hidden lg:block">
          <SubjectSwitcher subjects={subjects} />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden whitespace-nowrap text-xs text-muted-foreground md:inline">
            Última modificación: {LAST_MODIFIED}
          </span>
          <SearchDialog />
          <QuickCapture />

          {viewingAs ? (
            <form action={stopViewAs}>
              <button
                type="submit"
                className="press inline-flex items-center gap-1.5 rounded-full bg-warning px-2.5 py-1 text-xs font-semibold text-warning-foreground"
                title="Volver a tu vista de Cesar"
              >
                <Eye className="h-3.5 w-3.5" />
                Viendo como Diana — volver
              </button>
            </form>
          ) : (
            <>
              {!canEdit && (
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  Lectura
                </span>
              )}
              {realFull && (
                <form action={startViewAs}>
                  <button
                    type="submit"
                    className="press inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    title="Ver la interfaz como la ve Diana"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Ver como Diana</span>
                  </button>
                </form>
              )}
            </>
          )}

          <form action={logout}>
            <button
              type="submit"
              className="press inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </form>
        </div>

        <div className="w-full lg:hidden">
          <SubjectSwitcher subjects={subjects} />
        </div>
      </div>
    </header>
  );
}
