/**
 * Genera los íconos PNG de la PWA sin dependencias (encoder PNG mínimo).
 * Fondo verde UNAL + cruz de farmacia blanca. Ejecutar: `node scripts/gen-icons.mjs`
 * Los PNG resultantes se versionan en public/, así que no hace falta correrlo en cada build.
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PUB = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(PUB, { recursive: true });

// --- CRC32 ---
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

// Verde UNAL 7743 C ≈ #4A7729 ; blanco.
const BG = [74, 119, 41];
const FG = [255, 255, 255];

function makePng(size) {
  const raw = Buffer.alloc(size * (size * 3 + 1));
  const arm = Math.round(size * 0.16); // grosor de la cruz
  const half = size / 2;
  const reach = size * 0.32; // largo del brazo desde el centro
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0; // filtro
    for (let x = 0; x < size; x++) {
      const inVert = Math.abs(x - half) <= arm / 2 && Math.abs(y - half) <= reach;
      const inHorz = Math.abs(y - half) <= arm / 2 && Math.abs(x - half) <= reach;
      const [r, g, b] = inVert || inHorz ? FG : BG;
      const o = y * (size * 3 + 1) + 1 + x * 3;
      raw[o] = r;
      raw[o + 1] = g;
      raw[o + 2] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

for (const [name, size] of [
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-touch-icon.png", 180],
]) {
  writeFileSync(join(PUB, name), makePng(size));
  console.log("→ public/" + name);
}
