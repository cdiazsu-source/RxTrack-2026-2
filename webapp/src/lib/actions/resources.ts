"use server";

import { prisma } from "@/lib/prisma";
import { blockedForRead } from "@/lib/session";
import { revalidateAll } from "@/lib/revalidate";

export async function addResource(moduleId: string, formData: FormData) {
  if (await blockedForRead()) return;
  const name = String(formData.get("name") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  if (!name || !isHttpUrl(url)) return;

  const last = await prisma.resource.findFirst({
    where: { moduleId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  await prisma.resource.create({
    data: { moduleId, name, url, order: (last?.order ?? -1) + 1 },
  });
  revalidateAll();
}

export async function deleteResource(resourceId: string) {
  if (await blockedForRead()) return;
  await prisma.resource.delete({ where: { id: resourceId } });
  revalidateAll();
}

function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
