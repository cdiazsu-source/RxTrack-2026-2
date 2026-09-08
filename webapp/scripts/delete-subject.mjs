/**
 * Borra por completo una asignatura de la base (fila `Subject` + todo lo suyo por
 * cascada: módulos, sesiones, checklist, glosario, fórmulas, fechas, evaluación,
 * bibliografía, proyectos, flashcards, laboratorio).
 *
 * El seed NUNCA borra asignaturas —solo agrega/actualiza—, así que quitar una de
 * `content/index.ts` no basta. Corre esto además.
 *
 * Uso:  node scripts/delete-subject.mjs <slug>      (p. ej. fq2)
 *       node scripts/delete-subject.mjs <slug> --yes  (sin confirmar)
 *
 * Conecta por WebSocket (443), como prisma/seed.ts.
 */
import { createInterface } from "node:readline/promises";

import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

try {
  process.loadEnvFile(new URL("../.env", import.meta.url));
} catch {
  /* usa el entorno tal cual */
}
neonConfig.webSocketConstructor = ws;

const slug = process.argv[2];
const skipPrompt = process.argv.includes("--yes");
if (!slug) {
  console.error("Falta el slug. Ej: node scripts/delete-subject.mjs fq2");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL (revisa webapp/.env).");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    const found = await client.query(
      `SELECT s.name,
              (SELECT count(*) FROM "Module" m WHERE m."subjectId" = s.id) AS modules,
              (SELECT count(*) FROM "Session" se JOIN "Module" m ON m.id = se."moduleId" WHERE m."subjectId" = s.id) AS sessions
       FROM "Subject" s WHERE s.id = $1`,
      [slug],
    );
    if (found.rowCount === 0) {
      console.log(`No existe ninguna asignatura con slug "${slug}". Nada que borrar.`);
      return;
    }
    const { name, modules, sessions } = found.rows[0];
    console.log(`Vas a BORRAR "${name}" (${slug}): ${modules} módulo(s), ${sessions} sesión(es), y todo lo asociado.`);

    if (!skipPrompt) {
      const rl = createInterface({ input: process.stdin, output: process.stdout });
      const ans = (await rl.question(`Escribe el slug "${slug}" para confirmar: `)).trim();
      rl.close();
      if (ans !== slug) {
        console.log("Cancelado.");
        return;
      }
    }

    const res = await client.query(`DELETE FROM "Subject" WHERE id = $1`, [slug]);
    console.log(res.rowCount > 0 ? `✔ "${name}" borrada.` : "No se borró nada.");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("✗ Error:", err.message);
  process.exit(1);
});
