"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SUBJECT_SECTIONS } from "@/lib/subject-sections";

export function SubjectSubnav({ slug }: { slug: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1 overflow-x-auto border-b border-border pb-2">
      {SUBJECT_SECTIONS.map((s) => {
        const href = s.segment ? `/${slug}/${s.segment}` : `/${slug}`;
        const active = s.segment
          ? pathname.startsWith(`/${slug}/${s.segment}`)
          : pathname === `/${slug}`;
        return (
          <Link
            key={s.segment || "root"}
            href={href}
            className={cn(
              "press whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-card"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
