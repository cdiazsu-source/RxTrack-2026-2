"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Eye, Inbox, Layers, LayoutDashboard, LogOut, Pill } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SubjectScope } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";
import { startViewAs, stopViewAs } from "@/lib/actions/view-as";
import { SubjectSwitcher, type SwitcherSubject } from "@/components/subject-switcher";
import { SearchDialog } from "@/components/search-dialog";
import { QuickCapture } from "@/components/quick-capture";

/** Fecha del último cambio a la app. Actualízala a mano al publicar cambios. */
const LAST_MODIFIED = "18 oct 2026";

/** Contenedor del contenido: reserva el ancho del menú lateral en pantallas grandes. */
export function MainFrame({ sidebar, children }: { sidebar: boolean; children: React.ReactNode }) {
  const pathname = usePathname();
  const withSide = sidebar && pathname !== "/login";
  return (
    <div className={cn(withSide && "lg:pl-56")}>
      <main className="page-enter mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}

const SIDE_LINK =
  "press flex min-h-11 w-full items-center gap-2.5 rounded-l-[10px] px-3 text-sm transition-colors";

function SideBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex h-5 min-w-[22px] items-center justify-center rounded-full bg-secondary px-1.5 text-xs font-medium text-secondary-foreground">
      {n}
    </span>
  );
}

/** Ítem del menú lateral. El activo se funde con el contenido (ver .sidebar-tab en globals.css). */
function SideItem({
  href,
  active,
  dense = false,
  children,
}: {
  href: string;
  active: boolean;
  dense?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className={cn("relative", active && "sidebar-tab")}>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          SIDE_LINK,
          dense && "min-h-10",
          active
            ? "bg-background font-semibold text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        {children}
      </Link>
    </li>
  );
}

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

  const sideLabel = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const sidebar = (
    <aside
      aria-label="Navegación principal"
      className="site-nav fixed inset-y-0 left-0 z-40 hidden w-56 flex-col bg-card pb-3 pl-3 pt-5 shadow-[inset_-1px_0_0_hsl(var(--border))] lg:flex"
    >
      <Link href="/" className="flex items-center gap-2.5 px-3 pb-3 outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-primary text-primary-foreground">
          <Pill className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="font-display text-xl font-semibold tracking-tight text-primary">RxTrack</span>
      </Link>

      <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-2 [scrollbar-color:hsl(var(--border))_transparent] [scrollbar-width:thin]">
        <p className="px-3 pb-1.5 pt-3 text-xs font-semibold text-muted-foreground">Semestre</p>
        <ul className="flex flex-col gap-1">
          <SideItem href="/" active={sideLabel("/")}>
            <LayoutDashboard className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="flex-1">Semestre</span>
          </SideItem>
          <SideItem href="/calendario" active={sideLabel("/calendario")}>
            <CalendarDays className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="flex-1">Calendario</span>
          </SideItem>
          <SideItem href="/repaso" active={sideLabel("/repaso")}>
            <Layers className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="flex-1">Repaso</span>
          </SideItem>
          <SideItem href="/inbox" active={sideLabel("/inbox")}>
            <Inbox className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="flex-1">Bandeja</span>
            {inboxCount > 0 && <SideBadge n={inboxCount} />}
          </SideItem>
        </ul>

        <p className="px-3 pb-1.5 pt-5 text-xs font-semibold text-muted-foreground">Asignaturas</p>
        <ul className="flex flex-col gap-1">
          {subjects.map((sub) => (
            <SideItem key={sub.id} dense href={`/${sub.id}`} active={pathname === `/${sub.id}` || pathname.startsWith(`/${sub.id}/`)}>
              <span className="w-10 shrink-0 text-xs font-semibold">{sub.code}</span>
              <span className="min-w-0 flex-1 truncate" title={sub.name}>
                {sub.name}
              </span>
            </SideItem>
          ))}
        </ul>
      </nav>

      <div className="mr-3 border-t border-border pt-2">
        <div className="-mr-0 flex flex-col gap-0.5">
          <SearchDialog variant="side" />
          <QuickCapture variant="side" />
          {viewingAs ? (
            <form action={stopViewAs}>
              <button
                type="submit"
                className="press my-1 inline-flex w-full items-center gap-1.5 rounded-full bg-warning px-3 py-1.5 text-xs font-semibold text-warning-foreground"
                title="Volver a tu vista de Cesar"
              >
                <Eye className="h-3.5 w-3.5 shrink-0" />
                Viendo como Diana — volver
              </button>
            </form>
          ) : (
            <>
              {realFull && (
                <form action={startViewAs}>
                  <button type="submit" className={cn(SIDE_LINK, "text-muted-foreground hover:bg-accent hover:text-accent-foreground")} title="Ver la interfaz como la ve Diana">
                    <Eye className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
                    <span className="flex-1 text-left">Ver como Diana</span>
                  </button>
                </form>
              )}
            </>
          )}
          <form action={logout}>
            <button type="submit" className={cn(SIDE_LINK, "text-muted-foreground hover:bg-accent hover:text-accent-foreground")}>
              <LogOut className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
              <span className="flex-1 text-left">Salir</span>
            </button>
          </form>
        </div>
        <div className="flex items-center justify-between gap-2 px-3 pt-2 text-xs text-muted-foreground">
          <span>Última modificación: {LAST_MODIFIED}</span>
          {!canEdit && !viewingAs && (
            <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">Lectura</span>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {sidebar}
    <header className="site-nav sticky lg:hidden top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70">
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
    </>
  );
}
