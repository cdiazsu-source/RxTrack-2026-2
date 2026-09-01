"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

function read(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    expression: String(formData.get("expression") ?? "").trim(),
    variables: String(formData.get("variables") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    derivation: String(formData.get("derivation") ?? "").trim(),
    // Ejemplos: bloques de Markdown separados por una línea de guiones (`---`).
    examples: String(formData.get("examples") ?? "")
      .split(/\n-{3,}\n/)
      .map((s) => s.trim())
      .filter(Boolean),
    moduleId: String(formData.get("moduleId") ?? "").trim() || null,
  };
}

export async function addFormula(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = read(formData);
  if (!d.name || !d.expression) return;
  const last = await prisma.formula.findFirst({
    where: { subjectId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.formula.create({
    data: { subjectId, fromContent: false, order: (last?.order ?? -1) + 1, ...d },
  });
  revalidateAll();
}

export async function updateFormula(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = read(formData);
  await prisma.formula.update({
    where: { id },
    data: {
      ...(d.name ? { name: d.name } : {}),
      ...(d.expression ? { expression: d.expression } : {}),
      variables: d.variables,
      description: d.description,
      derivation: d.derivation,
      examples: d.examples,
      moduleId: d.moduleId,
    },
  });
  revalidateAll();
}

export async function deleteFormula(id: string) {
  if (await blockedForRead()) return;
  await prisma.formula.delete({ where: { id } });
  revalidateAll();
}
