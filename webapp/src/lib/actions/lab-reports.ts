"use server";

import type { LabReportStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";
import { touchSubject } from "@/lib/subjects";

function readCommon(formData: FormData) {
  const numberRaw = String(formData.get("number") ?? "").trim();
  const dueDateRaw = String(formData.get("dueDate") ?? "").trim();
  return {
    title: String(formData.get("title") ?? "").trim(),
    number: numberRaw ? Number(numberRaw) : null,
    dueDate: dueDateRaw ? new Date(dueDateRaw) : null,
  };
}

export async function addLabReport(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = readCommon(formData);
  if (!d.title) return;
  const last = await prisma.labReport.findFirst({
    where: { subjectId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.labReport.create({
    data: { subjectId, ...d, order: (last?.order ?? -1) + 1 },
  });
  await touchSubject(subjectId);
  revalidateAll();
}

export async function updateLabReport(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const d = readCommon(formData);
  if (!d.title) return;
  const content = String(formData.get("content") ?? "");
  const r = await prisma.labReport.update({
    where: { id },
    data: { ...d, content },
    select: { subjectId: true },
  });
  await touchSubject(r.subjectId);
  revalidateAll();
}

export async function setLabReportStatus(id: string, status: LabReportStatus) {
  if (await blockedForRead()) return;
  const r = await prisma.labReport.update({ where: { id }, data: { status }, select: { subjectId: true } });
  await touchSubject(r.subjectId);
  revalidateAll();
}

export async function setLabReportGrade(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const raw = String(formData.get("grade") ?? "").trim().replace(",", ".");
  const grade = raw === "" ? null : Number(raw);
  if (grade !== null && Number.isNaN(grade)) return;
  const r = await prisma.labReport.update({ where: { id }, data: { grade }, select: { subjectId: true } });
  await touchSubject(r.subjectId);
  revalidateAll();
}

export async function setLabReportDriveUrl(id: string, formData: FormData) {
  if (await blockedForRead()) return;
  const driveUrl = String(formData.get("driveUrl") ?? "").trim() || null;
  await prisma.labReport.update({ where: { id }, data: { driveUrl } });
  revalidateAll();
}

export async function deleteLabReport(id: string) {
  if (await blockedForRead()) return;
  const r = await prisma.labReport.delete({ where: { id }, select: { subjectId: true } });
  await touchSubject(r.subjectId);
  revalidateAll();
}
