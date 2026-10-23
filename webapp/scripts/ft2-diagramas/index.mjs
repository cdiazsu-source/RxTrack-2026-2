/**
 * Genera los diagramas de Farmacotecnia 2 (segundo corte) en `public/diagramas/*.svg`.
 * Uso (desde webapp/):  node scripts/ft2-diagramas/index.mjs
 * Son SVG propios, calculados a partir de las ecuaciones de la clase; se pueden regenerar a voluntad.
 */
import * as a from "./a-coloides.mjs";

const jobs = [
  a.escalaTamano,
  a.tyndallBrowniano,
  a.dobleCapa,
  a.electrolitos,
  a.dlvoCurva,
  a.dlvoPotencial,
];

try {
  const b = await import("./b-reologia.mjs");
  jobs.push(b.reograma, b.tixotropia, b.einstein, b.castilloNaipes);
} catch (e) {
  if (e.code !== "ERR_MODULE_NOT_FOUND") throw e;
}
try {
  const c = await import("./c-suspensiones.mjs");
  jobs.push(c.stokesFactores, c.sedimentacion, c.floculacionControlada, c.humectacion, c.mapaFormulacion);
} catch (e) {
  if (e.code !== "ERR_MODULE_NOT_FOUND") throw e;
}

for (const job of jobs) console.log(job.name.padEnd(24), `${job()} bytes`);
