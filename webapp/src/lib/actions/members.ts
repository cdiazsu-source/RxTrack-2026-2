"use server";

import { prisma } from "@/lib/prisma";
import { blockedForContribute } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

/**
 * Equipo del proyecto: nombres para llevar el control de quién participa y quién
 * publica notas en la bitácora. No son cuentas: no tienen usuario ni acceso.
 */

function readFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const role = String(formData.get("role") ?? "").trim().slice(0, 80) || null;
  return { name, role };
}

/** true si ya hay otro integrante con ese nombre (sin distinguir mayúsculas). */
async function nameTaken(projectId: string, name: string, exceptId?: string) {
  const all = await prisma.projectMember.findMany({ where: { projectId }, select: { id: true, name: true } });
  return all.some((m) => m.id !== exceptId && m.name.toLowerCase() === name.toLowerCase());
}

export async function addProjectMember(projectId: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const { name, role } = readFields(formData);
  if (!name || (await nameTaken(projectId, name))) return;
  const last = await prisma.projectMember.findFirst({
    where: { projectId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.projectMember.create({ data: { projectId, name, role, order: (last?.order ?? -1) + 1 } });
  revalidateAll();
}

export async function updateProjectMember(memberId: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const { name, role } = readFields(formData);
  const m = await prisma.projectMember.findUnique({ where: { id: memberId }, select: { projectId: true } });
  if (!m || !name || (await nameTaken(m.projectId, name, memberId))) return;
  await prisma.projectMember.update({ where: { id: memberId }, data: { name, role } });
  revalidateAll();
}

export async function deleteProjectMember(memberId: string) {
  if (await blockedForContribute()) return;
  await prisma.projectMember.delete({ where: { id: memberId } }).catch(() => undefined);
  revalidateAll();
}
