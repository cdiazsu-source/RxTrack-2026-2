"use server";

import type { SessionStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { blockedForContribute } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";
import { parseDateInput } from "@/lib/utils";

async function subjectIdOfModule(moduleId: string) {
  const m = await prisma.module.findUnique({ where: { id: moduleId }, select: { subjectId: true } });
  return m?.subjectId ?? null;
}

const STATUS_RANK: Record<SessionStatus, number> = {
  CRUDA: 0,
  TRANSCRITA: 1,
  CORNELL_IA: 2,
  REVISADA: 3,
};

/** Etapa que "corresponde" a la sesión según lo que tiene escrito. */
function derivedStatus(content: string, transcript: string | null): SessionStatus {
  if (content.trim()) return "CORNELL_IA";
  if (transcript && transcript.trim()) return "TRANSCRITA";
  return "CRUDA";
}

/** La etapa sube sola cuando se agrega transcripción/Cornell, pero nunca baja, y
 *  "REVISADA" (puesta a mano) se respeta siempre. */
function nextStatus(current: SessionStatus, derived: SessionStatus): SessionStatus {
  if (current === "REVISADA") return "REVISADA";
  return STATUS_RANK[derived] > STATUS_RANK[current] ? derived : current;
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
  if (await blockedForContribute()) return;
  const d = readSession(formData);
  if (!d.topic && !d.content && !d.transcript) return;

  await prisma.session.create({
    data: {
      moduleId,
      ...d,
      topic: d.topic || "Sesión sin título",
      status: derivedStatus(d.content, d.transcript),
    },
  });
  const sid = await subjectIdOfModule(moduleId);
  if (sid) await touchSubject(sid);
  revalidateAll();
}

export async function updateSession(sessionId: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const d = readSession(formData);
  const prev = await prisma.session.findUnique({ where: { id: sessionId }, select: { status: true } });
  const status = prev ? nextStatus(prev.status, derivedStatus(d.content, d.transcript)) : undefined;

  const session = await prisma.session.update({
    where: { id: sessionId },
    data: { ...d, ...(d.topic ? {} : { topic: undefined }), ...(status ? { status } : {}) },
    select: { module: { select: { subjectId: true } } },
  });
  await touchSubject(session.module.subjectId);
  revalidateAll();
}

/** Cambio manual de etapa (incluye marcar "REVISADA" o reabrir). */
export async function setSessionStatus(sessionId: string, status: SessionStatus) {
  if (await blockedForContribute()) return;
  const session = await prisma.session.update({
    where: { id: sessionId },
    data: { status },
    select: { module: { select: { subjectId: true } } },
  });
  await touchSubject(session.module.subjectId);
  revalidateAll();
}

export async function setSessionSlidesUrl(sessionId: string, formData: FormData) {
  if (await blockedForContribute()) return;
  const url = String(formData.get("driveUrl") ?? "").trim();
  await prisma.session.update({ where: { id: sessionId }, data: { slidesUrl: url || null } });
  revalidateAll();
}

export async function deleteSession(sessionId: string) {
  if (await blockedForContribute()) return;
  await prisma.session.delete({ where: { id: sessionId } });
  revalidateAll();
}
