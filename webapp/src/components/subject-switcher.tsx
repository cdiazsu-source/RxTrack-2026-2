"use client";

import { useRouter, usePathname } from "next/navigation";

import { Select } from "@/components/ui/select";
import { SUBJECT_SECTION_SEGMENTS } from "@/lib/subject-sections";

export type SwitcherSubject = { id: string; code: string; name: string };

/** Conmuta de asignatura sin salir de la sección actual cuando es posible. */
export function SubjectSwitcher({ subjects }: { subjects: SwitcherSubject[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean); // ["aif", "modulos", ...]
  const current = subjects.find((s) => s.id === parts[0])?.id ?? "";
  // Sección actual (modulos, fechas…), sin ids concretos de módulo/proyecto.
  const section = parts[1] && SUBJECT_SECTION_SEGMENTS.includes(parts[1]) ? parts[1] : "";

  return (
    <Select
      aria-label="Cambiar de asignatura"
      value={current}
      onChange={(e) => {
        const slug = e.target.value;
        if (!slug) return;
        router.push(section ? `/${slug}/${section}` : `/${slug}`);
      }}
      className="h-8 w-auto max-w-[13rem] text-xs font-medium"
    >
      <option value="" disabled>
        Elegir asignatura…
      </option>
      {subjects.map((s) => (
        <option key={s.id} value={s.id}>
          {s.code} · {s.name}
        </option>
      ))}
    </Select>
  );
}
