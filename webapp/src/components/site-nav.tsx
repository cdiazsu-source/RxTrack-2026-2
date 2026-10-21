"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Eye, Inbox, Layers, LayoutDashboard, LogOut, Pill } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SubjectScope, ViewProfile } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";
import { stopViewAs } from "@/lib/actions/view-as";
import { SubjectSwitcher, type SwitcherSubject } from "@/components/subject-switcher";
import { SearchDialog } from "@/components/search-dialog";
import { QuickCapture } from "@/components/quick-capture";
import { ViewAsMenu } from "@/components/view-as-menu";
import { SIDE_ICON_BTN, SIDE_ICON_TIP } from "@/components/side-icon";
import { subjectIcon } from "@/lib/subject-icons";
import { BRAND_CREDIT, BRAND_SUBTITLE } from "@/lib/brand";

/** Fecha del último cambio a la app. Actualízala a mano al publicar cambios. */
const LAST_MODIFIED = "21 oct 2026";

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

// Alturas del menú lateral: compactas por defecto en pantallas bajas (≤ 760 px) y un poco más
// holgadas en las altas, para que todo quepa sin desplazarse.
const SIDE_LINK =
  "press flex min-h-10 w-full items-center gap-2.5 rounded-l-[10px] px-3 text-sm transition-colors [@media(min-height:761px)]:min-h-11";
const SIDE_LINK_DENSE = "min-h-8 [@media(min-height:761px)]:min-h-9";

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
  title,
  children,
}: {
  href: string;
  active: boolean;
  dense?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <li className={cn("relative", active && "sidebar-tab")}>
      <Link
        href={href}
        title={title}
        aria-current={active ? "page" : undefined}
        className={cn(
          SIDE_LINK,
          dense && SIDE_LINK_DENSE,
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

/** Aviso fijo mientras Cesar ve la app como otra persona, con la salida a su vista. */
function ViewingPill({ name, className }: { name: string; className?: string }) {
  return (
    <form action={stopViewAs}>
      <button
        type="submit"
        className={cn(
          "press inline-flex items-center gap-1.5 rounded-full bg-warning px-2.5 py-1 text-xs font-semibold text-warning-foreground",
          className,
        )}
        title="Volver a tu vista de Cesar"
      >
        <Eye className="h-3.5 w-3.5 shrink-0" />
        Viendo como {name} — volver
      </button>
    </form>
  );
}

export function SiteNav({
  canEdit,
  subjects,
  inboxCount,
  realFull = false,
  viewingAs = false,
  viewingName = "",
  viewProfiles = [],
  scope = null,
  homeView = false,
}: {
  canEdit: boolean;
  subjects: SwitcherSubject[];
  inboxCount: number;
  /** Nivel real "full" (Cesar), aunque esté viendo como otro perfil. */
  realFull?: boolean;
  /** Cesar está en modo "Ver como". */
  viewingAs?: boolean;
  /** Nombre del perfil que está viendo (Diana, Paula, JOSE, Karen…). */
  viewingName?: string;
  /** Perfiles disponibles en "Ver como". */
  viewProfiles?: ViewProfile[];
  /** Sesión con acceso acotado (JOSE, Karen, Paula): solo marca + sus asignaturas + salir. */
  scope?: SubjectScope[] | null;
  /** La sesión acotada también ve la portada (vista reducida): se añade «Semestre» a la barra. */
  homeView?: boolean;
}) {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  if (scope && scope.length > 0) {
    return (
      <header className="site-nav sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-xl font-semibold tracking-tight text-primary">RxTrack</span>
            <span className="text-[10px] text-muted-foreground sm:text-[11px]">{BRAND_SUBTITLE}</span>
            <span className="text-[10px] text-muted-foreground sm:text-[11px]">{BRAND_CREDIT}</span>
          </span>
          <div className="flex items-center gap-3">
            {viewingAs && <ViewingPill name={viewingName} />}
            {(scope.length > 1 || homeView) && (
              <nav className="flex items-center gap-1.5">
                {homeView && (
                  <Link
                    href="/"
                    className={cn(
                      "press rounded-md px-2.5 py-1 text-sm font-medium transition-colors",
                      pathname === "/" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    Semestre
                  </Link>
                )}
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

  const sideActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const sidebar = (
    <aside
      aria-label="Navegación principal"
      className="site-nav fixed inset-y-0 left-0 z-40 hidden w-56 flex-col bg-card pb-2 pl-3 pt-4 shadow-[inset_-1px_0_0_hsl(var(--border))] lg:flex"
    >
      <Link href="/" className="flex items-center gap-2.5 px-3 pb-2 outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-primary text-primary-foreground">
          <Pill className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="font-display text-xl font-semibold tracking-tight text-primary">RxTrack</span>
          <span className="text-[10px] font-medium text-muted-foreground">{BRAND_SUBTITLE}</span>
          <span className="text-[10px] text-muted-foreground">{BRAND_CREDIT}</span>
        </span>
      </Link>

      <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex flex-col gap-1 pt-1">
          <SideItem href="/" active={sideActive("/")}>
            <LayoutDashboard className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="flex-1">Semestre</span>
          </SideItem>
          <SideItem href="/calendario" active={sideActive("/calendario")}>
            <CalendarDays className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="flex-1">Calendario</span>
          </SideItem>
          <SideItem href="/repaso" active={sideActive("/repaso")}>
            <Layers className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="flex-1">Repaso</span>
          </SideItem>
          <SideItem href="/inbox" active={sideActive("/inbox")}>
            <Inbox className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
            <span className="flex-1">Bandeja</span>
            {inboxCount > 0 && <SideBadge n={inboxCount} />}
          </SideItem>
        </ul>

        <p className="px-3 pb-1 pt-3 text-xs font-semibold text-muted-foreground [@media(min-height:761px)]:pt-4">Asignaturas</p>
        <ul className="flex flex-col gap-0.5">
          {subjects.map((sub) => {
            const Icon = subjectIcon(sub.id);
            return (
              <SideItem
                key={sub.id}
                dense
                href={`/${sub.id}`}
                title={`${sub.code} · ${sub.name}`}
                active={pathname === `/${sub.id}` || pathname.startsWith(`/${sub.id}/`)}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
                <span className="min-w-0 flex-1 truncate">{sub.name}</span>
              </SideItem>
            );
          })}
        </ul>
      </nav>

      <div className="mr-3 border-t border-border pt-1.5">
        {viewingAs && <ViewingPill name={viewingName} className="mb-1.5 w-full" />}
        <div className="flex items-center justify-between">
          <SearchDialog variant="icon" />
          <QuickCapture variant="icon" />
          {realFull && !viewingAs && <ViewAsMenu profiles={viewProfiles} variant="icon" />}
          <form action={logout}>
            <button type="submit" aria-label="Salir" className={SIDE_ICON_BTN}>
              <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              <span className={SIDE_ICON_TIP}>Salir</span>
            </button>
          </form>
        </div>
        <div className="flex items-center justify-between gap-2 px-1 pt-0.5 text-[11px] text-muted-foreground">
          <span>Actualizado: {LAST_MODIFIED}</span>
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
      <header className="site-nav sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70 lg:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-display text-xl font-semibold tracking-tight text-primary">RxTrack</span>
            <span className="max-w-[15rem] text-[10px] text-muted-foreground">{BRAND_SUBTITLE}</span>
            <span className="text-[10px] text-muted-foreground">{BRAND_CREDIT}</span>
          </Link>

          {link("/", "Semestre", Layers)}
          {link("/calendario", "Calendario", CalendarDays)}
          {link("/repaso", "Repaso", Layers)}
          {link("/inbox", "Bandeja", Inbox, inboxCount)}

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden whitespace-nowrap text-xs text-muted-foreground md:inline">
              Última modificación: {LAST_MODIFIED}
            </span>
            <SearchDialog />
            <QuickCapture />

            {viewingAs ? (
              <ViewingPill name={viewingName} />
            ) : (
              <>
                {!canEdit && (
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    Lectura
                  </span>
                )}
                {realFull && <ViewAsMenu profiles={viewProfiles} variant="bar" />}
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

          <div className="w-full">
            <SubjectSwitcher subjects={subjects} />
          </div>
        </div>
      </header>
    </>
  );
}
