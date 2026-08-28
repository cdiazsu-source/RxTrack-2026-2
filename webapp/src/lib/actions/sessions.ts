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

function readSession(formData: FormData) {
  const numRaw = String(formData.get("number") ?? "").trim();
  const number = numRaw ? Math.max(1, Math.round(Number(numRaw))) : null;
  return {
    topic: String(formData.get("topic") ?? "").trim(),
    content: String(formData.get("content") ?? ""),
    transcript: String(formData.get("transcript") ?? "").trim() || null,
    number: Number.isFinite(number as number) ? number : null,
    date: parseDateInput(formData.get("date")),
    author: String(formData.get("author") ?? "").trim() || null,
  };
}

export async function addSession(moduleId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = readSession(formData);
  if (!d.topic && !d.content && !d.transcript) return;

  await prisma.session.create({
    data: { moduleId, ...d, topic: d.topic || "Sesión sin título" },
  });
  const sid = await subjectIdOfModule(moduleId);
  if (sid) await touchSubject(sid);
  revalidateAll();
}

export async function updateSession(sessionId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = readSession(formData);
  const session = await prisma.session.update({
    where: { id: sessionId },
    data: { ...d, ...(d.topic ? {} : { topic: undefined }) },
    select: { module: { select: { subjectId: true } } },
  });
  await touchSubject(session.module.subjectId);
  revalidateAll();
}

export async function setSessionSlidesUrl(sessionId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const url = String(formData.get("driveUrl") ?? "").trim();
  await prisma.session.update({ where: { id: sessionId }, data: { slidesUrl: url || null } });
  revalidateAll();
}

export async function deleteSession(sessionId: string) {
  if (await blockedForRead()) return;
  await prisma.session.delete({ where: { id: sessionId } });
  revalidateAll();
}
