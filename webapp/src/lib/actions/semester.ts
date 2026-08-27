"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead, getSession } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

async function meta() {
  return prisma.semesterMeta.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });
}

/** "Continuar donde ibas": la app llama esto al navegar (fire-and-forget). */
export async function setResumePoint(route: string, label: string, note?: string) {
  if (!(await getSession()).authed) return;
  await prisma.semesterMeta.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", resumeRoute: route, resumeLabel: label, resumeNote: note ?? null, resumeAt: new Date() },
    update: { resumeRoute: route, resumeLabel: label, resumeNote: note ?? null, resumeAt: new Date() },
  });
}

export async function clearResumePoint() {
  if (!(await getSession()).authed) return;
  await prisma.semesterMeta.update({
    where: { id: "singleton" },
    data: { resumeRoute: null, resumeLabel: null, resumeNote: null, resumeAt: null },
  });
  revalidateAll();
}

export async function setAttendanceMissed(subjectId: string, missed: number) {
  if (await blockedForRead()) return;
  await prisma.subject.update({
    where: { id: subjectId },
    data: { attendanceMissed: Math.max(0, Math.round(missed)) },
  });
  revalidateAll();
}

export async function setWeeklyGoal(subjectId: string, formData: FormData) {
  if (await blockedForRead()) return;
  await prisma.subject.update({
    where: { id: subjectId },
    data: { weeklyGoal: String(formData.get("weeklyGoal") ?? "").trim() || null },
  });
  revalidateAll();
}

export async function setFocusSettings(formData: FormData) {
  if (await blockedForRead()) return;
  await meta();
  await prisma.semesterMeta.update({
    where: { id: "singleton" },
    data: {
      focusItemCount: [1, 3, 5].includes(Number(formData.get("focusItemCount")))
        ? Number(formData.get("focusItemCount"))
        : 3,
      showStreak: formData.get("showStreak") === "on",
      gentleMotion: formData.get("gentleMotion") === "on",
      dailyReminder: formData.get("dailyReminder") === "on",
    },
  });
  revalidateAll();
}

/** Racha indulgente. Llamar una vez por carga; devuelve el conteo actualizado. */
export async function tickStreak(): Promise<number> {
  const m = await meta();
  const today = todayBogota();
  const last = m.streakLastDate ? dayStr(m.streakLastDate) : null;
  if (last === today) return m.streakDays;

  const yesterday = shiftDays(today, -1);
  let days = m.streakDays;
  let graceUsedOn = m.streakGraceUsedOn ? dayStr(m.streakGraceUsedOn) : null;

  if (!last) {
    days = 1;
  } else if (last === yesterday) {
    days = days + 1;
  } else if (last === shiftDays(today, -2) && graceUsedOn !== today) {
    // Falló un día: día de gracia. La racha NO se va a 0.
    days = days + 1;
    graceUsedOn = today;
  } else {
    days = 1;
  }

  await prisma.semesterMeta.update({
    where: { id: "singleton" },
    data: {
      streakDays: days,
      streakLastDate: new Date(`${today}T12:00:00.000Z`),
      streakGraceUsedOn: graceUsedOn ? new Date(`${graceUsedOn}T12:00:00.000Z`) : m.streakGraceUsedOn,
    },
  });
  return days;
}

function todayBogota(): string {
  return dayStr(new Date(Date.now() - 5 * 60 * 60 * 1000));
}
function dayStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}
function shiftDays(day: string, delta: number): string {
  const d = new Date(`${day}T12:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return dayStr(d);
}
