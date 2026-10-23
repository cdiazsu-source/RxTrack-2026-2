import { C, T, TL, scale, line, curve, rect, circle, seg, axes, axes2, rng, wrap } from "./lib.mjs";

/* ─────────────────────────── Ley de Stokes: qué palanca mueve cuánto ─────────────────────────── */
export function stokesFactores() {
  const W = 720, H = 396;
  let b = T(W / 2, 26, "Ley de Stokes: ¿cuánto cambia la velocidad de caída?", { size: 17, anchor: "middle", bold: true, fill: C.d });
  b += T(W / 2, 46, "v  =  2 r² (ρ_partícula − ρ_medio) g  /  9 η", { size: 14, anchor: "middle", fill: C.m, bold: true });
  const sx = scale(-2, 0.7, 330, 690); // log10
  const x1 = sx(0);
  const rows = [
    ["Duplicar el tamaño (d × 2)", 4, "peor"],
    ["Duplicar la viscosidad (η × 2)", 0.5, "mejor"],
    ["Reducir a la mitad Δρ (sacarosa)", 0.5, "mejor"],
    ["Reducir a la mitad el tamaño", 0.25, "mejor"],
    ["Subir η ×10 (gel suspensor)", 0.1, "mejor"],
    ["Micronizar: tamaño ÷ 10", 0.01, "mejor"],
  ];
  const y0 = 82, dy = 42;
  b += seg(x1, 64, x1, y0 + rows.length * dy - 6, C.k, 2, "5 4") + T(x1, 62, "punto de partida = 1", { size: 12, anchor: "middle", fill: C.m, bold: true });
  rows.forEach(([label, f, kind], i) => {
    const y = y0 + i * dy;
    const xe = sx(Math.log10(f));
    const col = kind === "peor" ? C.r : C.g;
    b += T(20, y + 20, label, { size: 13.5, bold: true });
    b += rect(Math.min(x1, xe), y + 4, Math.abs(xe - x1), 24, col, "none", 3);
    const txt = f >= 1 ? `× ${f}  (cae ${f} veces más rápido)` : `× ${String(f).replace(".", ",")}  (${f === 0.01 ? "100" : Math.round(1 / f)} veces más lento)`;
    if (f >= 1) b += T(xe + 8, y + 21, txt.split("  ")[0], { size: 13, bold: true, fill: col });
    else b += T(xe - 8, y + 21, txt.split("  ")[0], { size: 13, bold: true, fill: col, anchor: "end" });
  });
  b += T(sx(-1.3), y0 + rows.length * dy + 8, "← cae más lento (más estable)", { size: 12.5, anchor: "middle", fill: C.g, bold: true });
  b += T(sx(0.3), y0 + rows.length * dy + 8, "más rápido →", { size: 12.5, anchor: "middle", fill: C.r, bold: true });
  b += T(W / 2, 382, "El tamaño pega al CUADRADO: es la palanca más potente. Micronizar gana 100×; duplicar la viscosidad, solo 2×.", { size: 12.5, anchor: "middle", fill: C.d, bold: true });
  return wrap("ft2-stokes-factores", W, H, "Efecto de cada variable en la velocidad de sedimentación", "Barras en escala logarítmica con el factor por el que cambia la velocidad de sedimentación al cambiar el tamaño, la viscosidad o la diferencia de densidad.", b);
}

/* ─────────────────────────── Sedimentación: defloculada vs floculada ─────────────────────────── */
export function sedimentacion() {
  const W = 790, H = 430;
  const R = rng(21);
  let b = T(W / 2, 26, "Dos formas de sedimentar: una cementa, la otra se redispersa", { size: 17, anchor: "middle", bold: true, fill: C.d });
  const vw = 50, vh = 190, vy = 76;
  const dots = (x, y, w, h, n, r, col) => {
    let s = "";
    for (let i = 0; i < n; i++) s += circle(x + 3 + R() * (w - 6), y + 3 + R() * (h - 6), r, col);
    return s;
  };
  const clusters = (x, y, w, h, n, col) => {
    let s = "";
    for (let i = 0; i < n; i++) {
      const cx = x + 8 + R() * (w - 16), cy = y + 8 + R() * (h - 16);
      for (let k = 0; k < 5; k++) s += circle(cx + (R() - 0.5) * 9, cy + (R() - 0.5) * 9, 2.2, col);
    }
    return s;
  };
  const glass = (x) => `<path d="M${x},${vy} L${x},${vy + vh - 8} Q${x},${vy + vh} ${x + 8},${vy + vh} L${x + vw - 8},${vy + vh} Q${x + vw},${vy + vh} ${x + vw},${vy + vh - 8} L${x + vw},${vy}" fill="#F3F8FF" stroke="${C.k}" stroke-width="2.4"/>`;
  const labelT = (x, t) => T(x + vw / 2, vy + vh + 20, t, { size: 12, anchor: "middle", fill: C.m, bold: true });
  // ---------- defloculada
  b += T(140, 56, "NO FLOCULADA (defloculada)", { size: 14, anchor: "middle", bold: true, fill: C.r });
  const dx = [46, 112, 178];
  b += glass(dx[0]) + dots(dx[0], vy + 6, vw, vh - 12, 70, 1.7, "#7A5C86") + labelT(dx[0], "recién agitada");
  b += glass(dx[1]) + dots(dx[1], vy + 6, vw, 110, 26, 1.7, "#7A5C86") + dots(dx[1], vy + vh - 52, vw, 48, 80, 1.7, "#5B3F6B") + labelT(dx[1], "minutos");
  b += glass(dx[2]) + dots(dx[2], vy + 6, vw, 100, 12, 1.7, "#9A82A6") + dots(dx[2], vy + vh - 44, vw, 40, 150, 1.8, "#4B2F5B") + labelT(dx[2], "reposo largo");
  b += seg(dx[2] + vw + 6, vy + vh - 44, dx[2] + vw + 6, vy + vh - 4, C.r, 2, "", "arr").replace('marker-end="url(#arr)"', "");
  b += TL(dx[2] + vw + 12, vy + vh - 24, ["sedimento", "compacto"], { size: 12, fill: C.r, bold: true, lh: 14 });
  b += TL(140, 318, ["sobrenadante turbio (tarda en aclarar)", "sedimento denso: CEMENTACIÓN ✖", "F pequeño (≈ 0,2)"], { size: 12.5, anchor: "middle", fill: C.r, bold: true, lh: 16 });
  // ---------- floculada
  b += T(430, 56, "FLOCULADA", { size: 14, anchor: "middle", bold: true, fill: C.g });
  const fx = [334, 400, 466];
  b += glass(fx[0]) + clusters(fx[0], vy + 6, vw, vh - 12, 11, "#7A5C86") + labelT(fx[0], "recién agitada");
  b += glass(fx[1]) + clusters(fx[1], vy + 96, vw, vh - 100, 11, "#7A5C86") + seg(fx[1] + 1, vy + 90, fx[1] + vw - 1, vy + 90, C.g, 2.5, "5 3") + labelT(fx[1], "minutos");
  b += glass(fx[2]) + clusters(fx[2], vy + 52, vw, vh - 56, 12, "#5B3F6B") + seg(fx[2] + 1, vy + 52, fx[2] + vw - 1, vy + 52, C.g, 2.5, "5 3") + labelT(fx[2], "reposo largo");
  // h0 y h∞ (vial final)
  const bx = fx[2] + vw + 10;
  b += seg(bx, vy, bx, vy + vh, C.k, 1.5, "", "") + seg(bx - 4, vy, bx + 4, vy, C.k, 1.5) + seg(bx - 4, vy + vh, bx + 4, vy + vh, C.k, 1.5);
  b += T(bx + 7, vy + 96, "h₀", { size: 13, bold: true });
  const bx2 = bx + 34;
  b += seg(bx2, vy + 52, bx2, vy + vh, C.g, 2) + seg(bx2 - 4, vy + 52, bx2 + 4, vy + 52, C.g, 2) + seg(bx2 - 4, vy + vh, bx2 + 4, vy + vh, C.g, 2);
  b += T(bx2 + 7, vy + 128, "h∞", { size: 13, bold: true, fill: C.g });
  b += TL(430, 318, ["sobrenadante CLARO · sedimento esponjoso", "sin cementación ✔ · se redispersa al agitar", "F = h∞ / h₀  grande (≈ 0,8)"], { size: 12.5, anchor: "middle", fill: C.g, bold: true, lh: 16 });
  // zonas
  b += TL(606, 84, ["Zonas al sedimentar", "un sistema floculado:"], { size: 12.5, fill: C.d, bold: true, lh: 15 });
  const zones = [
    [112, "① zona clarificada", "(sobrenadante limpio)"],
    [156, "② sedimentación frenada", "(los flóculos caen en bloque)"],
    [200, "③ compresión", "(red porosa que se asienta)"],
  ];
  zones.forEach(([y, t1, t2]) => b += T(606, y, t1, { size: 12.5, fill: C.g, bold: true }) + T(606, y + 15, t2, { size: 11.5, fill: C.m }));
  b += TL(606, 262, ["Defloculada: cae LENTO,", "pero se apila y se pega.", "Floculada: cae RÁPIDO,", "pero queda suelta."], { size: 12, fill: C.k, bold: true, lh: 16 });
  b += T(W / 2, 400, "Analogía: arroz suelto que cae grano a grano y se apelmaza abajo, frente a copos de nieve que se posan esponjosos.", { size: 12, anchor: "middle", fill: C.m });
  b += T(W / 2, 418, "F (volumen de sedimentación) = Vu / V₀   ·   β (grado de floculación) = F / F∞", { size: 12.5, anchor: "middle", fill: C.d, bold: true });
  return wrap("ft2-sedimentacion", W, H, "Sedimentación de una suspensión defloculada y una floculada", "Tres tubos en el tiempo para cada tipo: la defloculada deja un sedimento compacto y sobrenadante turbio; la floculada un sedimento voluminoso con sobrenadante claro; se marcan h0, h infinito y las zonas de sedimentación.", b);
}

/* ─────────────────────────── Floculación controlada por electrolitos ─────────────────────────── */
export function floculacionControlada() {
  const W = 720, H = 410;
  let b = T(W / 2, 26, "Floculación controlada: la dosis de electrolito importa", { size: 17, anchor: "middle", bold: true, fill: C.d });
  const ox = 80, oy = 320, xr = 640;
  const gx = scale(0, 10, ox, xr), gz = scale(-50, 50, oy, 84), gh = scale(0, 1, oy, 84);
  // zonas
  b += rect(gx(0), 84, gx(3.35) - gx(0), oy - 84, C.rl, "none", 0);
  b += rect(gx(3.35), 84, gx(6.65) - gx(3.35), oy - 84, C.gl, "none", 0);
  b += rect(gx(6.65), 84, gx(10) - gx(6.65), oy - 84, C.rl, "none", 0);
  b += T((gx(0) + gx(3.35)) / 2, 74, "Zona de CEMENTACIÓN", { size: 12, anchor: "middle", bold: true, fill: C.r });
  b += T((gx(3.35) + gx(6.65)) / 2, 74, "Zona SIN cementación", { size: 12, anchor: "middle", bold: true, fill: C.g });
  b += T((gx(6.65) + gx(10)) / 2, 74, "Zona de CEMENTACIÓN", { size: 12, anchor: "middle", bold: true, fill: C.r });
  b += axes(ox, oy, xr + 14, 62) + T(xr + 12, oy + 30, "concentración de electrolito (p. ej. KH₂PO₄) →", { size: 12.5, anchor: "end", bold: true });
  b += seg(ox, gz(0), xr, gz(0), C.l, 1.5, "5 4");
  b += T(ox - 8, gz(0) + 4, "0", { size: 12, anchor: "end" }) + T(ox - 8, gz(40) + 4, "+40", { size: 12, anchor: "end" }) + T(ox - 8, gz(-40) + 4, "−40", { size: 12, anchor: "end" });
  b += T(ox - 6, 58, "ζ (mV)", { size: 12.5, bold: true, fill: C.p, anchor: "end" }) + T(xr + 8, 58, "h_u / h_o", { size: 12.5, bold: true, fill: C.g, anchor: "end" });
  const zeta = (c) => 45 - 90 / (1 + Math.exp(-(c - 5) / 1.25));
  const alt = (c) => 0.14 + 0.78 * Math.exp(-Math.pow((c - 5) / 1.6, 2));
  b += line(curve(zeta, 0, 10, gx, gz, 140), C.p, 3.8);
  b += line(curve(alt, 0, 10, gx, gh, 140), C.g, 3.8, "8 5");
  b += circle(gx(5), gz(0), 6, C.p) + T(gx(5) + 10, gz(0) - 10, "ζ ≈ 0", { size: 12, fill: C.p, bold: true });
  b += circle(gx(5), gh(alt(5)), 6, C.g) + T(gx(5) + 10, gh(alt(5)) - 6, "máximo: flóculos laxos (F máx.)", { size: 12, fill: C.g, bold: true });
  b += TL(gx(0.15), gz(20), ["ζ alto (+): repulsión", "→ defloculado"], { size: 11.5, fill: C.p, bold: true, lh: 14 });
  b += TL(gx(9.85), gz(-22), ["inversión de carga (ζ −):", "se repele de nuevo"], { size: 11.5, fill: C.p, bold: true, lh: 14, anchor: "end" });
  b += seg(xr, oy, xr, 84, C.g, 1.5);
  for (const v of [0, 0.5, 1]) b += seg(xr, gh(v), xr + 5, gh(v), C.g, 1.5) + T(xr + 8, gh(v) + 4, String(v).replace(".", ","), { size: 11.5, fill: C.g, bold: true });
  b += seg(gx(0.3), oy + 54, gx(1.0), oy + 54, C.p, 3.5) + T(gx(1.0) + 8, oy + 58, "potencial zeta", { size: 12, fill: C.p, bold: true });
  b += seg(gx(3.6), oy + 54, gx(4.3), oy + 54, C.g, 3.5, "8 5") + T(gx(4.3) + 8, oy + 58, "altura del sedimento", { size: 12, fill: C.g, bold: true });
  b += T(W / 2, 400, "β = F / F∞  (grado de floculación): cuántas veces crece el sedimento gracias al floculante. Más β = más eficaz.", { size: 12.5, anchor: "middle", fill: C.d, bold: true });
  return wrap("ft2-floculacion-controlada", W, H, "Floculación controlada por electrolitos", "Potencial zeta y altura relativa del sedimento frente a la concentración de electrolito: con poca sal hay cementación, con la dosis justa hay floculación sin cementación, y con exceso hay inversión de carga y cementación otra vez.", b);
}

/* ─────────────────────────── Humectación y ángulo de contacto ─────────────────────────── */
function drop(cx, y0, a, thetaDeg, color) {
  const th = (thetaDeg * Math.PI) / 180;
  const Rr = a / Math.sin(th);
  const large = thetaDeg > 90 ? 1 : 0;
  let s = `<path d="M${cx - a},${y0} A${Rr},${Rr} 0 ${large} 1 ${cx + a},${y0} Z" fill="#CFE4F7" stroke="${color}" stroke-width="3"/>`;
  // tangente e indicador del ángulo en el punto izquierdo
  const px = cx - a, dir = [Math.cos(th), -Math.sin(th)];
  s += seg(px, y0, px + 70 * dir[0], y0 - 0 + 70 * dir[1], C.r, 2.5);
  s += seg(px - 10, y0, px + 62, y0, C.k, 1.5, "4 3");
  const r0 = 34;
  s += `<path d="M${px + r0},${y0} A${r0},${r0} 0 0 0 ${px + r0 * dir[0]},${y0 + r0 * dir[1]}" fill="none" stroke="${C.r}" stroke-width="2.5"/>`;
  return s;
}

export function humectacion() {
  const W = 720, H = 372;
  let b = T(W / 2, 26, "Humectar: bajar el ángulo de contacto (θ)", { size: 17, anchor: "middle", bold: true, fill: C.d });
  const y0 = 236;
  // izquierda
  b += rect(30, y0, 310, 20, "#9CA3AF", "none", 2) + T(185, y0 + 15, "sólido hidrófobo (sulfametazina)", { size: 12, anchor: "middle", fill: "#fff", bold: true });
  b += drop(185, y0, 62, 125, C.b);
  b += T(185, y0 - 78, "θ ≈ 125°  (> 90°)", { size: 14, anchor: "middle", bold: true, fill: C.r });
  b += TL(185, y0 + 48, ["SIN humectante: el agua no moja,", "el polvo atrapa aire y FLOTA ✖"], { size: 13, anchor: "middle", bold: true, fill: C.r, lh: 17 });
  // derecha
  b += rect(380, y0, 310, 20, "#9CA3AF", "none", 2) + T(535, y0 + 15, "mismo sólido + Span 20 adsorbido", { size: 12, anchor: "middle", fill: "#fff", bold: true });
  b += drop(535, y0, 100, 38, C.b);
  b += T(535, y0 - 78, "θ ≈ 38°  (< 90°)", { size: 14, anchor: "middle", bold: true, fill: C.g });
  b += TL(535, y0 + 48, ["CON humectante: el agua penetra,", "desplaza el aire y se dispersa ✔"], { size: 13, anchor: "middle", bold: true, fill: C.g, lh: 17 });
  // moléculas de tensioactivo en la interfase sólido-líquido
  for (let i = 0; i < 9; i++) {
    const x = 445 + i * 11 * 1.0 + 0;
    b += seg(x, y0 + 2, x, y0 - 12, C.p, 2) + circle(x, y0 - 16, 3.6, C.p);
  }
  b += T(535, y0 - 54, "cola (lipófila) al sólido, cabeza (hidrófila) al agua", { size: 11.5, anchor: "middle", fill: C.p, bold: true });
  b += T(W / 2, 338, "Young:   cos θ = ( γ_SV − γ_SL ) / γ_LV", { size: 15, anchor: "middle", bold: true, fill: C.d });
  b += T(W / 2, 358, "Span 20 baja γ_SL  →  cos θ sube  →  θ baja  →  el líquido moja", { size: 12.5, anchor: "middle", fill: C.d });
  return wrap("ft2-humectacion", W, H, "Ángulo de contacto y humectación", "Gota sobre un sólido hidrófobo con un ángulo de contacto mayor de 90 grados y la misma gota con un tensioactivo adsorbido que baja el ángulo; ecuación de Young.", b);
}

/* ─────────────────────────── Mapa de la formulación ─────────────────────────── */
export function mapaFormulacion() {
  const W = 720, H = 456;
  let b = T(W / 2, 26, "Anatomía de una suspensión: cada ingrediente tiene un trabajo", { size: 17, anchor: "middle", bold: true, fill: C.d });
  const box = (x, y, col, fill, title, lines) =>
    rect(x, y, 226, 88, fill, col, 8, 2) + T(x + 12, y + 22, title, { size: 13, bold: true, fill: col }) + TL(x + 12, y + 41, lines, { size: 11.5, fill: C.k, lh: 15 });
  const L = [
    [48, C.p, C.pl, "1 · EL FÁRMACO (fase dispersa)", ["Sulfametazina: insoluble en agua", "y hidrófoba. Micronizada (1–50 µm):", "menos arenosa, cae más lento."]],
    [142, C.b, C.bl, "2 · MOJARLO", ["Span 20 (HLB ≈ 8,6): baja el ángulo", "de contacto; el polvo ya no flota", "ni hace grumos."]],
    [236, C.a, C.al, "3 · SUSPENDERLO", ["Veegum: castillo de naipes, tixotrópico.", "CMC: sube η (Stokes: cae más lento).", "Trabajan en sinergia."]],
    [330, C.r, C.rl, "4 · EVITAR EL CAKING", ["CMC como coloide protector (carga −", "y barrera estérica). Si hace falta,", "floculación controlada con electrolito."]],
  ];
  const Rr = [
    [48, C.g, C.gl, "5 · EL VEHÍCULO", ["Agua purificada: disuelve lo soluble", "e hidrata Veegum y CMC. Calidad", "farmacopeica."]],
    [142, C.d, C.pl, "6 · CONSERVARLO", ["Metil + propilparabeno (3:1 a 4:1):", "bacterias y hongos. La eficacia", "depende del pH."]],
    [236, C.b, C.bl, "7 · ESTABILIDAD QUÍMICA", ["Buffer / ajuste de pH y antioxidante", "(catálisis ácido-base específica", "frente a general)."]],
    [330, C.g, C.gl, "8 · QUE SE PUEDA TOMAR", ["Sacarosa: cuerpo y mayor densidad", "del medio. Sacarina: dulzor potente.", "Menta: sabor y adherencia."]],
  ];
  L.forEach(([y, c, f, t, ls]) => (b += box(18, y, c, f, t, ls)));
  Rr.forEach(([y, c, f, t, ls]) => (b += box(476, y, c, f, t, ls)));
  b += rect(262, 190, 196, 100, C.d, "none", 12) + TL(360, 224, ["SUSPENSIÓN", "de sulfametazina", "estable y dosificable"], { size: 14, anchor: "middle", fill: "#fff", bold: true, lh: 20 });
  for (const [y] of L) b += seg(246, y + 44, 262, 240, C.m, 1.5);
  for (const [y] of Rr) b += seg(474, y + 44, 458, 240, C.m, 1.5);
  b += T(W / 2, 438, "Estabilidad FÍSICA (2, 3, 4) · QUÍMICA (7) · MICROBIOLÓGICA (6) · ACEPTABILIDAD / VÍA (8)", { size: 12.5, anchor: "middle", fill: C.d, bold: true });
  return wrap("ft2-mapa-formulacion", W, H, "Mapa de la formulación de una suspensión", "Ocho funciones de una suspensión de sulfametazina: fármaco, humectante, suspensores, protección contra el caking, vehículo, conservantes, estabilidad química y aceptabilidad, alrededor de la suspensión terminada.", b);
}
