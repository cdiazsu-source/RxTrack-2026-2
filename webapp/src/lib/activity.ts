import { prisma } from "@/lib/prisma";
import { ACCOUNT_DIRECTORY } from "@/lib/auth";

/** No se reescribe "visto por última vez" más de una vez cada tanto: evita una escritura por cada página. */
const SEEN_EVERY_MS = 5 * 60 * 1000;

/** Ingreso con usuario y clave. Nunca debe impedir el ingreso: si falla, se ignora. */
export async function recordLogin(username: string) {
  try {
    const now = new Date();
    await prisma.accountActivity.upsert({
      where: { username },
      create: { username, lastLoginAt: now, lastSeenAt: now, loginCount: 1 },
      update: { lastLoginAt: now, lastSeenAt: now, loginCount: { increment: 1 } },
    });
  } catch {
    /* seguimiento opcional */
  }
}

/** Visita con una sesión que ya estaba abierta (la cookie dura 30 días). */
export async function recordSeen(username: string) {
  try {
    const row = await prisma.accountActivity.findUnique({ where: { username }, select: { lastSeenAt: true } });
    const now = new Date();
    if (row?.lastSeenAt && now.getTime() - row.lastSeenAt.getTime() < SEEN_EVERY_MS) return;
    await prisma.accountActivity.upsert({
      where: { username },
      create: { username, lastSeenAt: now },
      update: { lastSeenAt: now },
    });
  } catch {
    /* seguimiento opcional */
  }
}

export type GuestActivity = {
  username: string;
  name: string;
  detail: string;
  lastLoginAt: string | null;
  lastSeenAt: string | null;
  loginCount: number;
};

/** Actividad de las cuentas con seguimiento, para la portada de Cesar. */
export async function getGuestActivity(): Promise<GuestActivity[]> {
  const tracked = ACCOUNT_DIRECTORY.filter((a) => a.trackAccess);
  if (tracked.length === 0) return [];
  const rows = await prisma.accountActivity
    .findMany({ where: { username: { in: tracked.map((a) => a.username) } } })
    .catch(() => []);
  return tracked.map((a) => {
    const r = rows.find((x) => x.username === a.username);
    return {
      username: a.username,
      name: a.name,
      detail: a.detail,
      lastLoginAt: r?.lastLoginAt?.toISOString() ?? null,
      lastSeenAt: r?.lastSeenAt?.toISOString() ?? null,
      loginCount: r?.loginCount ?? 0,
    };
  });
}
