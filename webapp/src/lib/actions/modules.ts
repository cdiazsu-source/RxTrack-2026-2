"use server";

import type { ModuleStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";

async function subjectIdOf(moduleId: string) {
  const m = await prisma.module.findUnique({ where: { id: moduleId }, select: { subjectId: true } });
  return m?.subjectId ?? null;
}

export async function setModuleStatus(moduleId: string, status: ModuleStatus) {
  if (await blockedForRead()) return;
  await prisma.module.update({ where: { id: moduleId }, data: { status } });
  const sid = await subjectIdOf(moduleId);
  if (sid) await touchSubject(sid);
  revalidateAll();
}

export async function setModuleDriveUrl(moduleId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const driveUrl = String(formData.get("driveUrl") ?? "").trim();
  await prisma.module.update({ where: { id: moduleId }, data: { driveUrl: driveUrl || null } });
  revalidateAll();
}

/** Crea un módulo a mano (fromContent=false: el seed lo ignora). */
export async function createModule(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  const description = String(formData.get("description") ?? "").trim();
  const hasLab = formData.get("hasLab") === "on";

  const last = await prisma.module.findFirst({
    where: { subjectId },
    orderBy: { order: "desc" },
    select: { order: true, slug: true },
  });
  const base = slugify(title) || "modulo";
  let slug = base;
  for (let n = 2; await prisma.module.findFirst({ where: { subjectId, slug }, select: { id: true } }); n++) {
    slug = `${base}-${n}`;
  }

  await prisma.module.create({
    data: {
      subjectId,
      slug,
      title,
      description,
      hasLab,
      order: (last?.order ?? -1) + 1,
      fromContent: false,
    },
  });
  await touchSubject(subjectId);
  revalidateAll();
}

export async function deleteModule(moduleId: string) {
  if (await blockedForRead()) return;
  const m = await prisma.module.findUnique({
    where: { id: moduleId },
    select: { fromContent: true, subjectId: true },
  });
  if (!m || m.fromContent) return; // los del temario no se borran desde la app
  await prisma.module.delete({ where: { id: moduleId } });
  revalidateAll();
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita tildes / diacríticos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}
