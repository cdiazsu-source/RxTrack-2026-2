/**
 * Aplica una migración de Prisma por WebSocket (puerto 443), no por el 5432.
 *
 * `prisma migrate deploy` abre una conexión Postgres directa al 5432, que en
 * algunas máquinas/redes está bloqueada (aquí, por McAfee). Este script hace lo
 * mismo por el driver serverless de Neon (mismo canal que prisma/seed.ts):
 *   1. ejecuta el/los .sql de la carpeta de migración, en una transacción;
 *   2. registra la fila en `_prisma_migrations` para que Prisma la dé por aplicada.
 *
 * Uso:
 *   node scripts/apply-sql.mjs prisma/migrations/20260908000000_note_links
 *
 * Idempotente: si esa migración ya está registrada, no hace nada.
 */
import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { createHash, randomUUID } from "node:crypto";

import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Carga webapp/.env igual que hace la CLI de Prisma para el seed.
try {
  process.loadEnvFile(new URL("../.env", import.meta.url));
} catch {
  /* si no existe, se usa el entorno tal cual */
}

neonConfig.webSocketConstructor = ws;

const dir = process.argv[2];
if (!dir) {
  console.error("Falta la carpeta de migración. Ej: node scripts/apply-sql.mjs prisma/migrations/20260908000000_note_links");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL (revisa webapp/.env).");
  process.exit(1);
}

const name = basename(dir);
const sqlFiles = readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
if (sqlFiles.length === 0) {
  console.error(`No hay .sql en ${dir}`);
  process.exit(1);
}
const sql = sqlFiles.map((f) => readFileSync(join(dir, f), "utf8")).join("\n");
const checksum = createHash("sha256").update(sql).digest("hex");

/** Parte el SQL en sentencias, ignorando líneas de comentario "--" y vacías. */
function statements(text) {
  return text
    .split(/;\s*$/m)
    .map((s) =>
      s
        .split("\n")
        .filter((l) => !l.trim().startsWith("--"))
        .join("\n")
        .trim(),
    )
    .filter(Boolean);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
        "id" VARCHAR(36) PRIMARY KEY NOT NULL,
        "checksum" VARCHAR(64) NOT NULL,
        "finished_at" TIMESTAMPTZ,
        "migration_name" VARCHAR(255) NOT NULL,
        "logs" TEXT,
        "rolled_back_at" TIMESTAMPTZ,
        "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "applied_steps_count" INTEGER NOT NULL DEFAULT 0
      )
    `);

    const already = await client.query(
      `SELECT 1 FROM "_prisma_migrations" WHERE migration_name = $1 AND rolled_back_at IS NULL`,
      [name],
    );
    if (already.rowCount > 0) {
      console.log(`✔ ${name} ya estaba aplicada. Nada que hacer.`);
      return;
    }

    await client.query("BEGIN");
    for (const stmt of statements(sql)) {
      await client.query(stmt);
    }
    await client.query(
      `INSERT INTO "_prisma_migrations"
        (id, checksum, migration_name, started_at, finished_at, applied_steps_count)
       VALUES ($1, $2, $3, now(), now(), 1)`,
      [randomUUID(), checksum, name],
    );
    await client.query("COMMIT");
    console.log(`✔ Migración ${name} aplicada y registrada.`);
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("✗ Falló la migración:", err.message);
  process.exit(1);
});
