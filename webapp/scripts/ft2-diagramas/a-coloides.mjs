import { C, T, TL, scale, line, curve, rect, circle, seg, axes, axes2, rng, wrap } from "./lib.mjs";

/* ─────────────────────────── 1. Escala de tamaños ─────────────────────────── */
export function escalaTamano() {
  const W = 720, H = 372;
  const sx = scale(-1, 6, 40, 690); // log10(nm)
  const yb = 78, hb = 52;
  let b = T(W / 2, 28, "¿De qué tamaño es un coloide? (escala logarítmica)", { size: 17, anchor: "middle", bold: true, fill: C.d });
  b += T(W / 2, 48, "Cada marca es 10 veces mayor que la anterior", { size: 13, anchor: "middle", fill: C.m });
  const band = (a, z, fill, stroke, label, tcol = C.k, dash = "") =>
    rect(sx(a), yb, sx(z) - sx(a), hb, fill, stroke, 4, 2).replace("/>", dash ? ` stroke-dasharray="${dash}"/>` : "/>") +
    T((sx(a) + sx(z)) / 2, yb + 32, label, { size: 13, anchor: "middle", bold: true, fill: tcol });
  b += band(-1, 0, C.gl, C.g, "Solución", C.g);
  b += band(0, 1, C.pl, C.p, "zona gris", C.p, "6 4");
  b += band(1, 3, "#EBBDE6", C.p, "COLOIDE", C.d);
  b += band(3, 6, C.al, C.a, "Suspensión gruesa", C.a);
  b += T(sx(0.5), yb - 8, "1–10 nm", { size: 12, anchor: "middle", fill: C.p });
  b += T(sx(2), yb - 8, "10 – 1000 nm (lo que vimos en clase)", { size: 12, anchor: "middle", fill: C.d, bold: true });
  // eje
  const ya = 160;
  b += seg(sx(-1), ya, sx(6), ya, C.k, 2);
  const ticks = [[-1, "0,1 nm"], [0, "1 nm"], [1, "10 nm"], [2, "100 nm"], [3, "1 µm"], [4, "10 µm"], [5, "100 µm"], [6, "1 mm"]];
  for (const [v, l] of ticks) b += seg(sx(v), ya - 5, sx(v), ya + 5, C.k, 2) + T(sx(v), ya + 22, l, { size: 12, anchor: "middle" });
  // ejemplos
  const ex = [
    [-0.7, "Ion Na⁺", 200, C.g],
    [-0.05, "Glucosa", 232, C.g],
    [0.7, "Micela (≈5 nm)", 264, C.p],
    [2, "Virus (≈100 nm)", 200, C.p],
    [3.85, "Glóbulo rojo (≈7 µm)", 232, C.a],
  ];
  for (const [v, l, y, col] of ex) {
    b += seg(sx(v), ya + 30, sx(v), y - 14, col, 1.5, "3 3") + circle(sx(v), ya, 5, col);
    b += T(sx(v), y, l, { size: 13, anchor: "middle", fill: col, bold: true });
  }
  // rango del fármaco micronizado 1–50 µm
  b += rect(sx(3), 292, sx(4.7) - sx(3), 14, C.al, C.a, 3, 1.5) + T(sx(3.85), 328, "Fármaco micronizado en una suspensión: 1 – 50 µm", { size: 13, anchor: "middle", fill: C.a, bold: true });
  b += T(W / 2, 358, "Un coloide no se ve al microscopio óptico ni atraviesa una membrana semipermeable.", { size: 12.5, anchor: "middle", fill: C.m });
  return wrap("ft2-escala-tamano", W, H, "Escala de tamaños de partícula", "Escala logarítmica desde 0,1 nm hasta 1 mm: solución verdadera, zona gris, coloide (10 a 1000 nm) y suspensión gruesa, con ejemplos.", b);
}

/* ─────────────────────────── 2. Tyndall + browniano ─────────────────────────── */
export function tyndallBrowniano() {
  const W = 720, H = 320;
  let b = T(180, 28, "Efecto Tyndall: la luz delata al coloide", { size: 16, anchor: "middle", bold: true, fill: C.d });
  b += T(540, 28, "Movimiento browniano: el baile del coloide", { size: 16, anchor: "middle", bold: true, fill: C.d });
  b += seg(360, 14, 360, 300, C.l, 2, "5 5");
  const R = rng(11);
  const beaker = (x, label, colloid) => {
    let s = `<path d="M${x},95 L${x},235 Q${x},255 ${x + 20},255 L${x + 100},255 Q${x + 120},255 ${x + 120},235 L${x + 120},95" fill="#F9FAFB" stroke="${C.k}" stroke-width="2.5"/>`;
    s += `<path d="M${x + 2},120 L${x + 2},235 Q${x + 2},253 ${x + 20},253 L${x + 100},253 Q${x + 118},253 ${x + 118},235 L${x + 118},120 Z" fill="${colloid ? "#EEF1F6" : "#F1F8FF"}" opacity="0.9"/>`;
    if (colloid) for (let i = 0; i < 38; i++) s += circle(x + 8 + R() * 104, 128 + R() * 120, 1.6 + R() * 1.4, "#8A93A6");
    s += T(x + 60, 282, label, { size: 13.5, anchor: "middle", bold: true });
    return s;
  };
  b += beaker(60, "Solución verdadera", false) + beaker(210, "Coloide", true);
  // haces de luz
  const beam = (x0, x1, inside) =>
    `<polygon points="${x0},170 ${x1},170 ${x1},182 ${x0},182" fill="#FFD54A" opacity="${inside ? 0.85 : 0.35}"/>`;
  b += beam(20, 60, false) + beam(180, 210, false);
  b += `<polygon points="60,170 180,170 180,182 60,182" fill="#FFD54A" opacity="0.12"/>`;
  b += beam(210, 330, true);
  b += T(40, 160, "luz", { size: 12.5, fill: C.a, bold: true, anchor: "middle" });
  b += T(120, 205, "el haz no se ve", { size: 12, anchor: "middle", fill: C.m, italic: true });
  b += T(270, 214, "¡el haz se ve!", { size: 12.5, anchor: "middle", fill: C.a, bold: true });
  b += TL(180, 306, ["Las partículas coloidales dispersan la luz,", "como el polvo en el rayo de sol de una ventana."], { size: 12, anchor: "middle", fill: C.m, lh: 14 });
  // browniano
  let x = 540, y = 160;
  const pts = [[x, y]];
  const R2 = rng(5);
  for (let i = 0; i < 34; i++) {
    x += (R2() - 0.5) * 46;
    y += (R2() - 0.5) * 46;
    x = Math.max(410, Math.min(670, x));
    y = Math.max(75, Math.min(245, y));
    pts.push([x, y]);
  }
  b += rect(395, 60, 290, 200, "#F9FAFB", C.l, 8, 1.5);
  for (let i = 0; i < 90; i++) b += circle(402 + R2() * 276, 66 + R2() * 188, 1.6, "#9DB4D6");
  b += line(pts, C.p, 2.2);
  b += circle(pts[0][0], pts[0][1], 4, C.g) + T(pts[0][0] + 8, pts[0][1] - 8, "inicio", { size: 12, fill: C.g, bold: true });
  b += circle(x, y, 9, "#8A93A6", C.d, 2) + T(x - 4, y - 16, "partícula coloidal", { size: 12, bold: true, fill: C.d, anchor: "middle" });
  b += seg(x - 50, y + 44, x - 11, y + 12, C.b, 2, "", "ar") + seg(x + 50, y + 38, x + 12, y + 10, C.b, 2, "", "ar");
  b += T(540, 282, "Choques desiguales de las moléculas del medio (puntos azules)", { size: 12, anchor: "middle", fill: C.m });
  b += T(540, 298, "empujan a la partícula en zigzag; la mantienen \"flotando\".", { size: 12, anchor: "middle", fill: C.m });
  return wrap("ft2-tyndall-browniano", W, H, "Efecto Tyndall y movimiento browniano", "Dos vasos: en el coloide el haz de luz se ve (Tyndall), en la solución no. A la derecha, el recorrido en zigzag de una partícula coloidal empujada por moléculas del medio.", b);
}

/* ─────────────────────────── 3. Doble capa eléctrica ─────────────────────────── */
export function dobleCapa() {
  const W = 720, H = 372;
  let b = T(W / 2, 26, "Doble capa eléctrica y potencial zeta", { size: 17, anchor: "middle", bold: true, fill: C.d });
  const cx = 132, cy = 206, s = 0.86;
  b += circle(cx, cy, 138 * s, "#F4FAF7", C.g, 1.5).replace('stroke-width="1.5"', 'stroke-width="1.5" stroke-dasharray="4 5"');
  b += circle(cx, cy, 78 * s, "#E3F1EC", C.g, 2);
  b += circle(cx, cy, 56 * s, "#F2D8EF", C.p, 3);
  b += circle(cx, cy, 98 * s, "none", C.r, 2).replace('stroke-width="2"', 'stroke-width="2" stroke-dasharray="8 5"');
  const ring = (r, n, ch, col, off = 0) => {
    let t = "";
    for (let i = 0; i < n; i++) {
      const an = off + (i * 2 * Math.PI) / n;
      t += T(cx + r * Math.cos(an), cy + r * Math.sin(an) + 5, ch, { size: 16, anchor: "middle", bold: true, fill: col });
    }
    return t;
  };
  b += ring(45 * s, 9, "−", C.p) + ring(67 * s, 10, "+", C.g, 0.2);
  const R = rng(3);
  for (let i = 0; i < 16; i++) {
    const an = R() * 2 * Math.PI, r = (84 + R() * 48) * s;
    b += T(cx + r * Math.cos(an), cy + r * Math.sin(an) + 5, i % 5 === 0 ? "−" : "+", { size: 14, anchor: "middle", fill: i % 5 === 0 ? C.p : C.g, bold: true });
  }
  b += T(cx, cy + 5, "partícula", { size: 12, anchor: "middle", fill: C.d, bold: true });
  // rótulos (a la derecha de la figura)
  const lx = 262;
  const lab = (y, ang, rad, col, text) => {
    const px = cx + rad * s * Math.cos(ang), py = cy + rad * s * Math.sin(ang);
    return seg(px, py, lx - 4, y - 4, col, 1.5) + circle(px, py, 3, col) + T(lx, y, text, { size: 12.5, fill: col, bold: true });
  };
  b += lab(66, -1.0, 138, C.g, "capa difusa (iones móviles)");
  b += lab(112, -0.5, 98, C.r, "plano de deslizamiento");
  b += lab(158, -0.2, 70, C.g, "capa fija de Stern (+)");
  b += lab(204, 0.0, 50, C.p, "superficie cargada (−)");
  // gráfica
  const ox = 452, oy = 292, gx = scale(0, 10, ox, 690), gy = scale(0, 110, oy, 84);
  b += axes(ox, oy, 704, 62);
  b += T(ox - 6, 56, "|potencial| (mV)", { size: 12, bold: true });
  b += T(704, oy + 18, "distancia (nm)", { size: 12, anchor: "end", bold: true });
  const d = 0.5, ps0 = 100, psd = 62, lam = 3;
  const f = (x) => (x < d ? ps0 - ((ps0 - psd) * x) / d : psd * Math.exp(-(x - d) / lam));
  b += line(curve(f, 0, 10, gx, gy, 200), C.d, 3.5);
  const xs = 1.8, zeta = f(xs);
  b += seg(ox, gy(30), 690, gy(30), C.g, 1.5, "6 4") + T(692, gy(30) - 5, "30 mV", { size: 12, anchor: "end", fill: C.g, bold: true });
  b += seg(gx(xs), oy, gx(xs), gy(zeta), C.r, 1.5, "5 4");
  b += circle(gx(0), gy(ps0), 6, C.p) + T(gx(0) + 12, gy(ps0) + 14, "Nernst (no medible)", { size: 12, fill: C.p, bold: true });
  b += circle(gx(d), gy(psd), 6, C.g) + T(gx(d) + 12, gy(psd) - 6, "Stern", { size: 12, fill: C.g, bold: true });
  b += circle(gx(xs), gy(zeta), 7, C.r) + T(gx(xs) + 12, gy(zeta) - 8, "ζ (zeta): lo que SÍ se mide", { size: 12.5, fill: C.r, bold: true });
  b += TL(ox - 10, oy + 40, ["|ζ| > 30 mV  →  repulsión suficiente:", "el sistema es estable"], { size: 12.5, fill: C.d, bold: true, lh: 16 });
  return wrap("ft2-doble-capa", W, H, "Doble capa eléctrica", "Partícula con carga negativa rodeada de una capa fija de contraiones (Stern) y una capa difusa; el plano de deslizamiento y el potencial zeta. A la derecha, el potencial cae con la distancia: Nernst, Stern y zeta.", b);
}

/* ─────────────────────────── 4. Electrolitos comprimen la doble capa ─────────────────────────── */
export function electrolitos() {
  const W = 720, H = 372;
  let b = T(W / 2, 26, "Los electrolitos comprimen la doble capa", { size: 17, anchor: "middle", bold: true, fill: C.d });
  const panel = (ox, title, curves) => {
    const gx = scale(0, 12, ox, ox + 270), gy = scale(0, 65, 270, 70);
    let s = axes(ox, 270, ox + 285, 58);
    s += T(ox + 135, 56, title, { size: 14, anchor: "middle", bold: true });
    s += T(ox + 280, 290, "distancia (nm)", { size: 12, anchor: "end" }) + T(ox + 4, 70, "ψ (mV)", { size: 12, bold: true });
    curves.forEach(([lam, col, label], i) => {
      s += line(curve((x) => 60 * Math.exp(-x / lam), 0, 12, gx, gy, 120), col, 3.2);
      s += seg(ox + 160, 112 + i * 22, ox + 188, 112 + i * 22, col, 3.2) + T(ox + 194, 117 + i * 22, label, { size: 12.5, fill: col, bold: true });
    });
    return s;
  };
  b += panel(40, "Más concentración", [[9.6, C.b, "10⁻³ N"], [3.04, C.p, "10⁻² N"], [0.96, C.d, "10⁻¹ N"]]);
  b += panel(390, "Más valencia del contraión", [[9.6, C.b, "Z = 1 (Na⁺)"], [4.8, C.p, "Z = 2 (Ca²⁺)"], [3.2, C.d, "Z = 3 (Al³⁺)"]]);
  b += TL(W / 2, 318, ["Más sal o iones más cargados  →  la \"armadura\" se encoge  →  ζ baja  →  menos repulsión."], { size: 13.5, anchor: "middle", fill: C.d, bold: true });
  b += T(W / 2, 340, "Schulze–Hardy: la concentración que coagula varía como 1/Z⁶ (con Z=2, ≈ 1/64 de la sal que con Z=1).", { size: 12.5, anchor: "middle", fill: C.m });
  b += T(W / 2, 356, "Curvas ilustrativas (calculadas con la longitud de Debye de un electrolito simétrico).", { size: 11.5, anchor: "middle", fill: C.m, italic: true });
  return wrap("ft2-electrolitos-compresion", W, H, "Efecto de los electrolitos sobre el potencial", "Dos paneles con la caída del potencial con la distancia: a mayor concentración de sal y a mayor valencia del contraión, la doble capa se comprime y el potencial cae más rápido.", b);
}

/* ─────────────────────────── 5. Curva DLVO ─────────────────────────── */
const VA = (H, A = 150) => -A / H;
const VR = (H, V0 = 200, L = 4) => V0 * Math.exp(-H / L);

export function dlvoCurva() {
  const W = 720, H = 440;
  const gx = scale(0, 40, 80, 690), gy = scale(-62, 72, 385, 62);
  let b = T(W / 2, 26, "Teoría DLVO: la energía entre dos partículas", { size: 17, anchor: "middle", bold: true, fill: C.d });
  b += rect(gx(11), 62, gx(40) - gx(11), 323, "#F0F8F4", "none", 0);
  b += rect(80, 62, gx(1.2) - 80, 323, "#FBEAEA", "none", 0);
  b += axes2(80, gy(0), 700, 385, 52);
  b += T(86, 56, "Energía (kT)  ↑ repulsión   ↓ atracción", { size: 12.5, bold: true });
  b += T(696, gy(0) - 8, "distancia (nm)", { size: 12.5, anchor: "end", bold: true });
  const clip = [-62, 72];
  b += line(curve((h) => VR(h), 0.3, 40, gx, gy, 300, clip), C.p, 2.2, "7 5");
  b += line(curve((h) => VA(h), 0.3, 40, gx, gy, 300, clip), C.b, 2.2, "7 5");
  b += line(curve((h) => VR(h) + VA(h), 0.3, 40, gx, gy, 400, clip), C.d, 4.5);
  b += T(gx(9), gy(VR(9)) - 10, "V_R (repulsión)", { size: 12.5, fill: C.p, bold: true });
  b += T(gx(13), gy(VA(13)) + 22, "V_A (atracción)", { size: 12.5, fill: C.b, bold: true });
  b += T(gx(22), gy(0) - 12, "V_T = V_R + V_A", { size: 13.5, fill: C.d, bold: true });
  // puntos clave
  let hm = 2.3, ht = 19.3;
  const vt = VR(ht) + VA(ht), vm = VR(hm) + VA(hm);
  b += circle(gx(hm), gy(vm), 7, C.r) + seg(gx(hm) + 8, gy(vm) - 4, gx(10), gy(64), C.r, 1.5);
  b += TL(gx(10) + 6, gy(64) + 4, ["V_m  barrera de repulsión", "partículas SEPARADAS (defloculadas)"], { size: 12.5, fill: C.r, bold: true, lh: 16 });
  b += circle(gx(ht), gy(vt), 7, C.g) + seg(gx(ht), gy(vt) + 9, gx(ht), gy(vt) + 44, C.g, 1.5);
  b += TL(gx(ht), gy(vt) + 60, ["V_t  mínimo SECUNDARIO", "atracción débil y reversible", "→ FLOCULACIÓN CONTROLADA ✔"], { size: 12.5, fill: C.g, bold: true, anchor: "middle", lh: 16 });
  b += circle(gx(0.4), gy(-60), 7, C.r) + TL(gx(2.2), gy(-40), ["V_p  mínimo PRIMARIO", "contacto íntimo, irreversible", "→ CEMENTACIÓN (caking) ✖"], { size: 12.5, fill: C.r, bold: true, lh: 16 });
  b += TL(W / 2, 414, ["Analogía: una pelota que rueda sobre una colina con un hoyito poco profundo (Vt) y un pozo profundo al pie (Vp).", "Queremos que se quede en el hoyito: se puede sacar con una sacudida; del pozo no sale."], { size: 12, anchor: "middle", fill: C.m, lh: 15 });
  return wrap("ft2-dlvo-curva", W, H, "Curva DLVO", "Energía de atracción (van der Waals), repulsión (doble capa) y total en función de la distancia entre dos partículas, con el máximo Vm, el mínimo secundario Vt y el mínimo primario Vp.", b);
}

/* ─────────────────────────── 6. Efecto del potencial superficial ─────────────────────────── */
export function dlvoPotencial() {
  const W = 720, H = 404;
  const gx = scale(0, 30, 80, 500), gy = scale(-62, 90, 340, 60);
  let b = T(W / 2, 26, "Cuanto menor el potencial superficial, menor la barrera", { size: 17, anchor: "middle", bold: true, fill: C.d });
  b += axes2(80, gy(0), 515, 340, 50);
  b += T(86, 54, "Energía total V_T (kT)", { size: 12.5, bold: true }) + T(512, gy(0) - 8, "distancia (nm)", { size: 12.5, anchor: "end", bold: true });
  const set = [
    [32, "A  ψ₀ = 32 mV", C.d],
    [25.6, "B  ψ₀ = 25,6 mV", C.p],
    [19.2, "C  ψ₀ = 19,2 mV", C.a],
    [12.8, "D  ψ₀ = 12,8 mV", C.b],
    [0, "E  ψ₀ = 0 mV", C.r],
  ];
  set.forEach(([psi, label, col], i) => {
    const V0 = 200 * (psi / 32) ** 2;
    b += line(curve((h) => VR(h, V0) + VA(h), 0.4, 30, gx, gy, 300, [-62, 90]), col, 3.4);
    b += seg(540, 90 + i * 28, 566, 90 + i * 28, col, 3.4) + T(574, 95 + i * 28, label, { size: 12.5, fill: col, bold: true });
  });
  b += TL(540, 262, ["ψ₀ alto: barrera alta", "→ sistema defloculado", "ψ₀ = 0: sin barrera", "→ coagulación inmediata"], { size: 12.5, fill: C.m, lh: 17 });
  b += TL(W / 2, 372, ["En farmacotecnia: mantener |ζ| ≳ 30 mV para no perder la barrera por accidente,", "y bajarlo A PROPÓSITO (un poco) cuando se quiere flocular."], { size: 13, anchor: "middle", fill: C.d, bold: true, lh: 17 });
  return wrap("ft2-dlvo-potencial", W, H, "Influencia del potencial superficial en la energía total", "Cinco curvas de energía total DLVO para potenciales superficiales de 32; 25,6; 19,2; 12,8 y 0 mV: la barrera de repulsión disminuye hasta desaparecer.", b);
}
