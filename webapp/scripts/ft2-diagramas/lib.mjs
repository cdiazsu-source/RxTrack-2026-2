/**
 * Utilidades para dibujar los diagramas de Farmacotecnia 2 como SVG propios.
 * Los gráficos se CALCULAN a partir de las ecuaciones de la clase (DLVO, Stokes, Debye,
 * reología…): no se copian de ningún libro. Fondo blanco, paleta de la app.
 */
import fs from "node:fs";
import path from "node:path";

export const OUT = path.resolve("public/diagramas");
fs.mkdirSync(OUT, { recursive: true });

export const C = {
  p: "#A8009C", // magenta (primario)
  d: "#3B0136", // ciruela
  g: "#337561", // verde
  a: "#B45F06", // ámbar
  b: "#2B6CB0", // azul
  r: "#C53030", // rojo
  k: "#1F2937", // texto
  m: "#6B7280", // gris medio
  l: "#D1D5DB", // gris claro
  pl: "#F7E6F5",
  gl: "#E3F1EC",
  al: "#FDF0D5",
  bl: "#E3EEF9",
  rl: "#FBE4E4",
  kl: "#F3F4F6",
};

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const DEFS = `<defs>
<marker id="ar" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="${C.k}"/></marker>
<marker id="arp" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="${C.p}"/></marker>
<marker id="arr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="${C.r}"/></marker>
</defs>`;

/** Escribe `public/diagramas/<name>.svg`. */
export function wrap(name, w, h, title, desc, body) {
  const s =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d" font-family="Arial, Helvetica, sans-serif">` +
    `<title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc>${DEFS}<rect width="${w}" height="${h}" fill="#fff"/>${body}</svg>\n`;
  fs.writeFileSync(path.join(OUT, `${name}.svg`), s);
  return s.length;
}

/** Texto. opciones: size, fill, anchor (start|middle|end), bold, italic, rot. */
export const T = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size ?? 14}" fill="${o.fill ?? C.k}" text-anchor="${o.anchor ?? "start"}"` +
  `${o.bold ? ' font-weight="700"' : ""}${o.italic ? ' font-style="italic"' : ""}` +
  `${o.rot ? ` transform="rotate(${o.rot} ${x} ${y})"` : ""}>${esc(s)}</text>`;

/** Varias líneas de texto (cada una con su propio y). */
export const TL = (x, y, lines, o = {}) =>
  lines.map((ln, i) => T(x, y + i * (o.lh ?? (o.size ?? 14) * 1.3), ln, o)).join("");

/** Escala lineal dominio → rango. */
export const scale = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);

/** Polilínea. */
export const line = (pts, stroke, width = 3, dash = "", extra = "") =>
  `<polyline fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ""} ${extra} points="${pts
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ")}"/>`;

/** Muestrea f(x) en [x0,x1] y devuelve [sx(x), sy(f(x))]. */
export function curve(f, x0, x1, sx, sy, n = 160, clip = null) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    let y = f(x);
    if (clip) y = Math.max(clip[0], Math.min(clip[1], y));
    pts.push([sx(x), sy(y)]);
  }
  return pts;
}

export const rect = (x, y, w, h, fill, stroke = "none", r = 6, sw = 1.5) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

export const circle = (cx, cy, r, fill, stroke = "none", sw = 1.5) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

export const seg = (x1, y1, x2, y2, stroke = C.k, w = 2, dash = "", marker = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}${marker ? ` marker-end="url(#${marker})"` : ""} stroke-linecap="round"/>`;

/** Ejes con flechas: origen (ox,oy), eje x hasta xEnd, eje y hasta yTop (más arriba = menor y). */
export const axes = (ox, oy, xEnd, yTop) => seg(ox, oy, xEnd, oy, C.k, 2, "", "ar") + seg(ox, oy, ox, yTop, C.k, 2, "", "ar");

/** Ejes con el eje x en y=yZero y el eje y de yBottom a yTop (gráficas con valores negativos). */
export const axes2 = (ox, yZero, xEnd, yBottom, yTop) =>
  seg(ox, yBottom, ox, yTop, C.k, 2, "", "ar") + seg(ox, yZero, xEnd, yZero, C.k, 2, "", "ar");

/** Generador pseudoaleatorio determinista (para que el SVG sea reproducible). */
export function rng(seed = 7) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
