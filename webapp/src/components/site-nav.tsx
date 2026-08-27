"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions/auth";
import { SubjectSwitcher, type SwitcherSubject } from "@/components/subject-switcher";

export function SiteNav({
  canEdit,
  subjects,
}: {
  canEdit: boolean;
  subjects: SwitcherSubject[];
}) {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  const onSemester = pathname === "/";

  return (
    <header className="site-nav sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-primary">
          RxTrack
        </Link>

        <Link
          href="/"
          className={cn(
            "press rounded-md px-2.5 py-1 text-sm font-medium transition-colors",
            onSemester ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          Semestre
        </Link>

        <SubjectSwitcher subjects={subjects} />

        <div className="ml-auto flex items-center gap-2">
          {!canEdit && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              Modo lectura
            </span>
          )}
          <form action={logout}>
            <button
              type="submit"
              className="press inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
