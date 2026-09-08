import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

/**
 * Cliente Prisma único (evita reconexiones en dev por el hot-reload de Next).
 *
 * En Vercel la conexión Postgres directa (TCP 5432) funciona sin problema, así
 * que allí se usa el cliente normal — el comportamiento de producción NO cambia.
 *
 * En local, algunas redes (p. ej. la de la universidad) bloquean o rompen el
 * puerto 5432 y `new PrismaClient()` falla con P1001. Fuera de Vercel usamos el
 * driver Neon sobre WebSocket (puerto 443), igual que `prisma/seed.ts`, para que
 * `npm run dev` funcione en cualquier red.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma(): PrismaClient {
  if (process.env.VERCEL) {
    return new PrismaClient();
  }
  neonConfig.webSocketConstructor = ws;
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaNeon(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
