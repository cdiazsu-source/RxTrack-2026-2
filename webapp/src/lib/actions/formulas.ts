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
    moduleId: String(formData.get("moduleId") ?? "").trim() || null,
  };
}

export async function addFormula(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = read(formData);
  if (!d.name || !d.expression) return;
  await prisma.formula.create({ data: { subjectId, fromContent: false, ...d } });
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
