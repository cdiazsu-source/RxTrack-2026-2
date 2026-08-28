"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Inbox, Layers, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions/auth";
import { SubjectSwitcher, type SwitcherSubject } from "@/components/subject-switcher";
import { SearchDialog } from "@/components/search-dialog";
import { QuickCapture } from "@/components/quick-capture";

export function SiteNav({
  canEdit,
  subjects,
  inboxCount,
}: {
  canEdit: boolean;
  subjects: SwitcherSubject[];
  inboxCount: number;
}) {
  const pathname = usePathname();
  if (pathname === "/login") return null;

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
        <Link href="/" className="text-lg font-bold tracking-tight text-primary">
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
          <SearchDialog />
          <QuickCapture />
          {!canEdit && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              Lectura
            </span>
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
