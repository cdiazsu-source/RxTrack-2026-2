"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";
import { parseDateInput } from "@/lib/utils";

async function subjectIdOfModule(moduleId: string) {
  const m = await prisma.module.findUnique({ where: { id: moduleId }, select: { subjectId: true } });
  return m?.subjectId ?? null;
}

export async function addSession(moduleId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const topic = String(formData.get("topic") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  if (!topic && !content) return;

  const numRaw = String(formData.get("number") ?? "").trim();
  const number = numRaw ? Math.max(1, Math.round(Number(numRaw))) : null;
  const author = String(formData.get("author") ?? "").trim() || null;

  await prisma.session.create({
    data: {
      moduleId,
      topic: topic || "Sesión sin título",
      content,
      number: Number.isFinite(number as number) ? number : null,
      date: parseDateInput(formData.get("date")),
      author,
    },
  });
  const sid = await subjectIdOfModule(moduleId);
  if (sid) await touchSubject(sid);
  revalidateAll();
}

export async function updateSession(sessionId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const topic = String(formData.get("topic") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const numRaw = String(formData.get("number") ?? "").trim();
  const number = numRaw ? Math.max(1, Math.round(Number(numRaw))) : null;

  const session = await prisma.session.update({
    where: { id: sessionId },
    data: {
      ...(topic ? { topic } : {}),
      content,
      number: Number.isFinite(number as number) ? number : null,
      date: parseDateInput(formData.get("date")),
      author: String(formData.get("author") ?? "").trim() || null,
    },
    select: { module: { select: { subjectId: true } } },
  });
  await touchSubject(session.module.subjectId);
  revalidateAll();
}

export async function deleteSession(sessionId: string) {
  if (await blockedForRead()) return;
  await prisma.session.delete({ where: { id: sessionId } });
  revalidateAll();
}
