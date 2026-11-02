/**
 * Carga en la malla académica (`MallaSubject`) la historia académica de Cesar (SIA, plan 2515, Farmacia UNAL):
 * pone cada asignatura aprobada como «vista» con su nota. Las optativas y la libre elección se anotan en las
 * filas genéricas del plan («Optativa de fundamentación», «Optativa disciplinar», «Libre elección») y
 * esas filas toman el nombre y los créditos reales de la materia cursada.
 *
 * Uso (desde webapp/):  npx tsx scripts/load-malla-historia.ts [--dry]
 *
 * Reglas (nunca pisa lo que ya tocaste en la app):
 *  - Si la malla está vacía, primero inserta el plan (`MALLA_PLAN`), igual que «Cargar el plan de estudios».
 *  - Solo cambia filas que sigan «por ver»; las que ya marcaste (vista / en curso) no se tocan.
 *  - Es idempotente: una materia que ya está en la malla (mismo nombre) se salta.
 *  - Los intentos reprobados o perdidos del historial (Principios de análisis, Química orgánica II, Bioquímica)
 *    no se cargan: lo que cuenta es la repetición aprobada.
 */
import { prisma } from "../src/lib/prisma";
import { MALLA_PLAN } from "../src/lib/malla-plan";
import { mallaTotals, asMallaStatus } from "../src/lib/malla";

const DRY = process.argv.includes("--dry");

type Hist = { period: string; name: string; credits: number; grade: number | null; plan?: string; generic?: "OF" | "OD" | "LE" };

const H: Hist[] = [
  // 2020-1S
  { period: "2020-1S", name: "Biología molecular y celular", credits: 3, grade: 4.1, plan: "Biología molecular y celular" },
  { period: "2020-1S", name: "Cálculo diferencial", credits: 4, grade: 3.6, plan: "Cálculo diferencial" },
  { period: "2020-1S", name: "Laboratorio de técnicas básicas en química", credits: 3, grade: 4.1, plan: "Laboratorio de técnicas básicas en química" },
  // 2020-2S
  { period: "2020-2S", name: "Bioestadística fundamental", credits: 3, grade: 3.5, plan: "Bioestadística fundamental" },
  { period: "2020-2S", name: "Principios de química", credits: 3, grade: 4.2, plan: "Principios de química" },
  // 2021-1S
  { period: "2021-1S", name: "Química orgánica I", credits: 3, grade: 4.4, plan: "Química orgánica I" },
  { period: "2021-1S", name: "Historia e identidad de la medicina y las profesiones de la salud", credits: 3, grade: 4.0, generic: "LE" },
  // 2024-1S
  { period: "2024-1S", name: "Química orgánica II", credits: 3, grade: 3.0, plan: "Química orgánica II" },
  { period: "2024-1S", name: "Bioquímica", credits: 3, grade: 3.7, plan: "Bioquímica" },
  { period: "2024-1S", name: "Biología molecular de la célula", credits: 4, grade: 4.3, generic: "LE" },
  { period: "2024-1S", name: "Cátedra Nacional en sostenibilidad y cambio climático", credits: 3, grade: 4.7, generic: "LE" },
  // 2024-2S
  { period: "2024-2S", name: "Laboratorio de principios de análisis químico", credits: 3, grade: 3.6, plan: "Laboratorio de principios de análisis químico" },
  { period: "2024-2S", name: "Mecánica y ondas para biociencias", credits: 4, grade: 3.9, plan: "Mecánica y ondas para biociencias" },
  { period: "2024-2S", name: "Principios de análisis químico", credits: 3, grade: 3.1, plan: "Principios de análisis químico" },
  { period: "2024-2S", name: "Química inorgánica farmacéutica", credits: 2, grade: 4.0, plan: "Química inorgánica farmacéutica" },
  { period: "2024-2S", name: "A luchar por la educación superior de servicio a derecho fundamental", credits: 3, grade: 4.4, generic: "LE" },
  // 2025-1S
  { period: "2025-1S", name: "Fisicoquímica I", credits: 3, grade: 3.4, plan: "Fisicoquímica I" },
  { period: "2025-1S", name: "Laboratorio de química orgánica I", credits: 3, grade: 4.1, plan: "Laboratorio de química orgánica I" },
  { period: "2025-1S", name: "Álgebra lineal", credits: 4, grade: 4.8, generic: "OF" },
  { period: "2025-1S", name: "Estadística social fundamental", credits: 3, grade: 3.8, generic: "OF" },
  { period: "2025-1S", name: "Introducción a la ciencia de materiales", credits: 3, grade: 3.0, generic: "OF" },
  { period: "2025-1S", name: "Microbiología general", credits: 3, grade: 3.9, plan: "Microbiología general" },
  { period: "2025-1S", name: "Resistencia a insecticidas", credits: 3, grade: 4.0, generic: "LE" },
  // 2025-2S
  { period: "2025-2S", name: "Farmacognosia y fitoquímica", credits: 4, grade: 3.6, plan: "Farmacognosia y fitoquímica" },
  { period: "2025-2S", name: "Fisioanatomía", credits: 3, grade: 4.0, plan: "Fisioanatomía" },
  { period: "2025-2S", name: "Microbiología farmacéutica", credits: 3, grade: 4.3, plan: "Microbiología farmacéutica" },
  { period: "2025-2S", name: "Operaciones unitarias farmacéuticas", credits: 2, grade: 3.5, plan: "Operaciones unitarias farmacéuticas" },
  { period: "2025-2S", name: "Biotecnología para no biotecnólogos", credits: 2, grade: 4.3, generic: "LE" },
  { period: "2025-2S", name: "Cátedra de Sede Manuel Ancízar: Centenario Orlando Fals Borda", credits: 3, grade: 4.9, generic: "LE" },
  { period: "2025-2S", name: "Constitución, democracia y paz", credits: 2, grade: 4.6, generic: "LE" },
  { period: "2025-2S", name: "Filosofía de la Mente", credits: 3, grade: 4.4, generic: "LE" },
  { period: "2025-2S", name: "Psicoanálisis, sujeto y problemáticas", credits: 3, grade: 4.3, generic: "LE" },
  // 2026-1S
  { period: "2026-1S", name: "Farmacia química I", credits: 4, grade: 3.5, plan: "Farmacia química I" },
  { period: "2026-1S", name: "Farmacotecnia I", credits: 4, grade: 3.9, plan: "Farmacotecnia I" },
  { period: "2026-1S", name: "Fisiopatología", credits: 3, grade: 4.4, plan: "Fisiopatología" },
  { period: "2026-1S", name: "Farmacoterapia", credits: 3, grade: 4.3, generic: "OD" },
  { period: "2026-1S", name: "Cuántica para todos y para todo", credits: 3, grade: 4.4, generic: "LE" },
  { period: "2026-1S", name: "Odontogeriatría", credits: 3, grade: 4.4, generic: "LE" },
  // Sin renglón en el historial, pero el resumen del SIA cuenta 2 créditos más de «disciplinar obligatoria»
  // aprobados (33 vs. 31 listados) y la única de 2 créditos que falta es esta: se infiere, sin nota.
  { period: "—", name: "Introducción a la farmacia", credits: 2, grade: null, plan: "Introducción a la farmacia" },
];

/** Fila genérica del plan -> (nombre, créditos exigidos de ese componente). */
const GENERIC = {
  OF: { name: "Optativa de fundamentación", required: 9 },
  OD: { name: "Optativa disciplinar", required: 12 },
  LE: { name: "Libre elección", required: 37 },
} as const;

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

async function main() {
  let rows = await prisma.mallaSubject.findMany({ orderBy: [{ semester: "asc" }, { order: "asc" }, { createdAt: "asc" }] });
  const log: string[] = [];

  if (rows.length === 0) {
    const data = MALLA_PLAN.flatMap((entries, i) =>
      entries.map((e, order) => ({
        semester: i + 1,
        name: e.name,
        credits: e.credits,
        area: e.area,
        status: e.slug ? "EN_CURSO" : "PENDIENTE",
        subjectSlug: e.slug ?? null,
        order,
      })),
    );
    log.push(`Plan: ${data.length} filas nuevas`);
    if (!DRY) {
      await prisma.mallaSubject.createMany({ data });
      rows = await prisma.mallaSubject.findMany({ orderBy: [{ semester: "asc" }, { order: "asc" }, { createdAt: "asc" }] });
    } else {
      rows = data.map((d, i) => ({ ...d, id: `dry-${i}`, grade: null, createdAt: new Date(), updatedAt: new Date() }));
    }
  }

  const pending = (r: (typeof rows)[number]) => r.status === "PENDIENTE";
  const used = new Set<string>();
  const updates: { id: string; data: { name?: string; credits?: number; status: string; grade: number | null } }[] = [];

  for (const h of H) {
    if (rows.some((r) => norm(r.name) === norm(h.name) && !used.has(r.id) && r.status === "APROBADA")) {
      log.push(`= ya está: ${h.name}`);
      continue;
    }
    const target = h.plan
      ? rows.find((r) => !used.has(r.id) && pending(r) && norm(r.name) === norm(h.plan!))
      : rows.find((r) => !used.has(r.id) && pending(r) && r.area === h.generic && norm(r.name) === norm(GENERIC[h.generic!].name));
    if (!target) {
      log.push(`! sin fila libre para: ${h.name}`);
      continue;
    }
    used.add(target.id);
    updates.push({
      id: target.id,
      data: h.generic
        ? { name: h.name, credits: h.credits, status: "APROBADA", grade: h.grade }
        : { status: "APROBADA", grade: h.grade },
    });
    log.push(`✓ ${h.period}  ${h.name}  (${h.credits} cr${h.grade != null ? `, ${h.grade.toFixed(1)}` : ""})`);
  }

  // Si una optativa/libre elección ya cubrió lo exigido con menos filas de las que traía el plan, o se
  // quedó corta sin filas libres, deja la fila pendiente con los créditos que realmente faltan.
  const extra: { semester: number; name: string; credits: number; area: string; order: number }[] = [];
  for (const [area, g] of Object.entries(GENERIC)) {
    const done = H.filter((h) => h.generic === area).reduce((s, h) => s + h.credits, 0);
    const deficit = g.required - done;
    const left = rows.filter((r) => !used.has(r.id) && pending(r) && r.area === area && norm(r.name) === norm(g.name));
    if (deficit > 0 && left.length === 0) {
      extra.push({ semester: 10, name: g.name, credits: deficit, area, order: 99 });
      log.push(`+ fila pendiente «${g.name}» de ${deficit} cr (completa los ${g.required} exigidos)`);
    }
  }

  if (!DRY) {
    for (const u of updates) await prisma.mallaSubject.update({ where: { id: u.id }, data: u.data });
    if (extra.length > 0) await prisma.mallaSubject.createMany({ data: extra.map((e) => ({ ...e, status: "PENDIENTE" })) });
  }

  const after = DRY
    ? rows.map((r) => {
        const u = updates.find((x) => x.id === r.id);
        return u ? { ...r, ...u.data } : r;
      })
    : await prisma.mallaSubject.findMany();
  const t = mallaTotals(
    [...after, ...(DRY ? extra.map((e) => ({ ...e, status: "PENDIENTE", grade: null })) : [])].map((r) => ({
      status: asMallaStatus(r.status),
      credits: r.credits,
      grade: r.grade,
    })),
  );

  console.log(log.join("\n"));
  console.log(
    `\n${DRY ? "[simulación] " : ""}Vistas: ${t.credits.APROBADA} cr · En curso: ${t.credits.EN_CURSO} cr · Faltan: ${t.credits.PENDIENTE} cr · Total: ${t.totalCredits} cr` +
      ` · Promedio ponderado: ${t.average?.toFixed(2) ?? "—"}`,
  );
  console.log("Referencia del SIA: 119 aprobados, 17 inscritos, 66 pendientes, promedio académico 4.0.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
