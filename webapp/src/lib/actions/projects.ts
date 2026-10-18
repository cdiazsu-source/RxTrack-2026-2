"use server";

import { redirect } from "next/navigation";
import type { ProjectStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { blockedForRead, blockedForContribute } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";

export async function createProject(subjectId: string, subjectSlug: string, formData: FormData) {
  if (await blockedForRead()) return;
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  const category = String(formData.get("category") ?? "").trim() || null;

  const last = await prisma.project.findFirst({
    where: { subjectId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const project = await prisma.project.create({
    data: { subjectId, title, category, order: (last?.order ?? -1) + 1, isManual: true },
  });
  await touchSubject(subjectId);
  revalidateAll();
  redirect(`/${subjectSlug}/proyectos/${project.id}`);
}

export async function setProjectStatus(projectId: string, status: ProjectStatus) {
  if (await blockedForRead()) return;
  const p = await prisma.project.update({
    where: { id: projectId },
    data: { status },
    select: { subjectId: true },
  });
  await touchSubject(p.subjectId);
  revalidateAll();
}

export async function updateProject(projectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || null;
  await prisma.project.update({
    where: { id: projectId },
    data: { ...(title ? { title } : {}), category },
  });
  revalidateAll();
}

export async function setProjectDriveUrl(projectId: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const driveUrl = String(formData.get("driveUrl") ?? "").trim();
  await prisma.project.update({ where: { id: projectId }, data: { driveUrl: driveUrl || null } });
  revalidateAll();
}

export async function deleteProject(projectId: string, subjectSlug: string) {
  if (await blockedForRead()) return;
  const p = await prisma.project.findUnique({
    where: { id: projectId },
    select: { isManual: true },
  });
  if (!p?.isManual) return; // los sembrados desde content no se borran aquí
  await prisma.project.delete({ where: { id: projectId } });
  revalidateAll();
  redirect(`/${subjectSlug}/proyectos`);
}

/** Solo http(s): evita `javascript:` y similares en un href. */
function cleanHttpUrl(raw: string): string | null {
  try {
    const u = new URL(raw.trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export async function addProjectLink(projectId: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const url = cleanHttpUrl(String(formData.get("url") ?? ""));
  if (!url) return;
  const name = String(formData.get("name") ?? "").trim().slice(0, 120) || new URL(url).hostname;
  const last = await prisma.projectLink.findFirst({
    where: { projectId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.projectLink.create({ data: { projectId, name, url, order: (last?.order ?? -1) + 1 } });
  revalidateAll();
}

export async function updateProjectLink(linkId: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const url = cleanHttpUrl(String(formData.get("url") ?? ""));
  if (!url) return;
  const name = String(formData.get("name") ?? "").trim().slice(0, 120) || new URL(url).hostname;
  await prisma.projectLink.update({ where: { id: linkId }, data: { name, url } });
  revalidateAll();
}

export async function deleteProjectLink(linkId: string) {
  if (await blockedForContribute()) return;
  await prisma.projectLink.delete({ where: { id: linkId } }).catch(() => undefined);
  revalidateAll();
}
