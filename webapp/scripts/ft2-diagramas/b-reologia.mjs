import { C, T, TL, scale, line, curve, rect, circle, seg, axes, rng, wrap } from "./lib.mjs";

/* ─────────────────────────── Reogramas: 4 comportamientos ─────────────────────────── */
export function reograma() {
  const W = 720, H = 400;
  let b = T(W / 2, 26, "Cómo fluyen los sistemas: curvas de flujo", { size: 17, anchor: "middle", bold: true, fill: C.d });
  const fl = [
    ["Newtoniano (agua, aceite)", C.b, (g) => 1.0 * g],
    ["Pseudoplástico (kétchup)", C.p, (g) => 2.4 * Math.pow(g, 0.55)],
    ["Dilatante (maicena + agua)", C.a, (g) => 0.16 * Math.pow(g, 1.55)],
    ["Plástico / Bingham (pasta dental)", C.g, (g) => 3.2 + 0.7 * g],
  ];
  // panel izquierdo: esfuerzo vs velocidad
  const ox1 = 60, oy = 290;
  const gx1 = scale(0, 10, ox1, 330), gy1 = scale(0, 14, oy, 70);
  b += axes(ox1, oy, 345, 56) + T(ox1 - 4, 50, "esfuerzo τ", { size: 12.5, bold: true }) + T(344, oy + 18, "velocidad de cizalla γ̇", { size: 12.5, anchor: "end", bold: true });
  b += T(230, 52, "τ  vs  γ̇", { size: 14, bold: true, anchor: "middle", fill: C.d });
  fl.forEach(([, col, f], i) => {
    const x0 = i === 3 ? 0.001 : 0;
    b += line(curve(f, x0, 10, gx1, gy1, 120, [0, 14]), col, 3.3);
  });
  b += circle(gx1(0), gy1(3.2), 5, C.g) + T(gx1(0) + 8, gy1(3.2) - 7, "esfuerzo de cedencia", { size: 11.5, fill: C.g, bold: true });
  // panel derecho: viscosidad aparente
  const ox2 = 400;
  const gx2 = scale(0, 10, ox2, 670), gy2 = scale(0, 4, oy, 70);
  b += axes(ox2, oy, 685, 56) + T(ox2 - 4, 50, "viscosidad η", { size: 12.5, bold: true }) + T(684, oy + 18, "velocidad de cizalla γ̇", { size: 12.5, anchor: "end", bold: true });
  b += T(590, 52, "η = τ / γ̇  vs  γ̇", { size: 14, bold: true, anchor: "middle", fill: C.d });
  fl.forEach(([, col, f]) => {
    b += line(curve((g) => f(g) / g, 0.25, 10, gx2, gy2, 160, [0, 4]), col, 3.3);
  });
  // leyenda
  fl.forEach(([label, col], i) => {
    const x = 60 + (i % 2) * 330, y = 332 + Math.floor(i / 2) * 22;
    b += seg(x, y - 4, x + 26, y - 4, col, 3.5) + T(x + 34, y, label, { size: 12.5, fill: col, bold: true });
  });
  b += T(W / 2, 392, "Pseudoplástico: al agitar, se adelgaza.  Dilatante: al agitar, se endurece.  Plástico: no fluye hasta pasar un umbral.", { size: 11.5, anchor: "middle", fill: C.m });
  return wrap("ft2-reograma", W, H, "Curvas de flujo y viscosidad aparente", "Esfuerzo contra velocidad de cizalla y viscosidad aparente para fluidos newtonianos, pseudoplásticos, dilatantes y plásticos de Bingham.", b);
}

/* ─────────────────────────── Tixotropía ─────────────────────────── */
export function tixotropia() {
  const W = 720, H = 370;
  let b = T(W / 2, 26, "Tixotropía: la viscosidad también depende del tiempo", { size: 17, anchor: "middle", bold: true, fill: C.d });
  // izquierda: lazo de histéresis
  const ox = 60, oy = 290;
  const gx = scale(0, 10, ox, 320), gy = scale(0, 16, oy, 80);
  b += axes(ox, oy, 335, 60) + T(ox - 4, 54, "esfuerzo τ", { size: 12.5, bold: true }) + T(334, oy + 18, "cizalla γ̇", { size: 12.5, anchor: "end", bold: true });
  const up = (g) => 4.0 * Math.pow(g, 0.62);
  const down = (g) => 1.7 * Math.pow(g, 0.62) + 0.35 * g * 0.6;
  const pu = curve(up, 0, 10, gx, gy, 80), pd = curve(down, 0, 10, gx, gy, 80);
  b += `<polygon points="${[...pu, ...pd.slice().reverse()].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")}" fill="${C.pl}" opacity="0.9"/>`;
  b += line(pu, C.p, 3.5) + line(pd, C.d, 3.5);
  b += seg(gx(6.2), gy(up(6.2)) - 2, gx(6.9), gy(up(6.9)) - 8, C.p, 3, "", "arp");
  b += seg(gx(6.9), gy(down(6.9)) + 5, gx(6.2), gy(down(6.2)) + 3, C.d, 3, "", "ar");
  b += TL(ox + 14, 96, ["subida: la red de la", "arcilla se va rompiendo"], { size: 12, fill: C.p, bold: true, lh: 15 });
  b += TL(gx(9.9), oy - 36, ["bajada: ya está rota,", "da menos esfuerzo"], { size: 12, fill: C.d, bold: true, anchor: "end", lh: 15 });
  b += TL(gx(3.5), 206, ["área entre", "curvas =", "tixotropía"], { size: 12.5, fill: C.p, bold: true, anchor: "middle", lh: 15 });
  // derecha: viscosidad vs tiempo
  const ox2 = 410;
  const tx = scale(0, 80, ox2, 690), ty = scale(0, 12, oy, 80);
  b += axes(ox2, oy, 700, 60) + T(ox2 - 4, 54, "viscosidad η", { size: 12.5, bold: true }) + T(698, oy + 18, "tiempo", { size: 12.5, anchor: "end", bold: true });
  b += rect(tx(15), 70, tx(45) - tx(15), oy - 70, "#FFF6E0", "none", 0);
  b += T(tx(30), 90, "se agita", { size: 12.5, anchor: "middle", fill: C.a, bold: true });
  b += T(tx(8), 90, "reposo", { size: 12.5, anchor: "middle", fill: C.m, bold: true }) + T(tx(62), 90, "reposo", { size: 12.5, anchor: "middle", fill: C.m, bold: true });
  const eta = (t) => (t < 15 ? 10 : t < 45 ? 3 + 7 * Math.exp(-(t - 15) / 7) : 10 - 7 * Math.exp(-(t - 45) / 14));
  b += line(curve(eta, 0, 80, tx, ty, 200), C.p, 3.8);
  b += T(tx(30), ty(3) + 20, "se \"afloja\"", { size: 12.5, anchor: "middle", fill: C.p, bold: true });
  b += T(tx(64), ty(8.6) - 8, "se recupera", { size: 12.5, anchor: "middle", fill: C.p, bold: true });
  b += TL(W / 2, 336, ["Como una pintura espesa: la remueves y se afloja; la dejas quieta y recupera su cuerpo.", "Reopexia = lo contrario (muy raro): agitar la espesa con el tiempo."], { size: 12.5, anchor: "middle", fill: C.d, lh: 17, bold: true });
  return wrap("ft2-tixotropia", W, H, "Tixotropía", "A la izquierda, el lazo de histéresis esfuerzo-cizalla de un sistema tixotrópico; a la derecha, la viscosidad que baja mientras se agita y se recupera en reposo.", b);
}

/* ─────────────────────────── Einstein ─────────────────────────── */
export function einstein() {
  const W = 720, H = 356;
  let b = T(W / 2, 26, "Ecuación de Einstein: más partículas, más viscosidad", { size: 17, anchor: "middle", bold: true, fill: C.d });
  const ox = 70, oy = 270;
  const gx = scale(0, 0.4, ox, 480), gy = scale(1, 4.4, oy, 70);
  b += rect(gx(0), 60, gx(0.1) - gx(0), oy - 60, C.gl, "none", 0);
  b += T((gx(0) + gx(0.1)) / 2, 78, "diluido", { size: 12.5, anchor: "middle", fill: C.g, bold: true });
  b += axes(ox, oy, 495, 56) + T(ox - 4, 50, "η / η₀", { size: 12.5, bold: true }) + T(494, oy + 42, "fracción de volumen de sólido φ", { size: 12.5, anchor: "end", bold: true });
  for (const v of [0, 0.1, 0.2, 0.3, 0.4]) b += seg(gx(v), oy - 4, gx(v), oy + 4, C.k, 2) + T(gx(v), oy + 20, String(v).replace(".", ","), { size: 11.5, anchor: "middle" });
  b += line(curve((p) => 1 + 2.5 * p, 0, 0.4, gx, gy, 60), C.p, 3.8);
  b += line(curve((p) => Math.pow(1 - p / 0.64, -1.6), 0, 0.4, gx, gy, 100, [1, 4.4]), C.m, 3, "6 5");
  b += T(gx(0.4) - 4, gy(1.45), "Einstein: η = η₀(1 + 2,5φ)", { size: 12.5, anchor: "end", fill: C.p, bold: true });
  b += T(gx(0.4) - 4, gy(3.1) - 6, "realidad (concentrado): se dispara", { size: 12.5, anchor: "end", fill: C.m, bold: true });
  // ejemplo
  b += rect(515, 90, 185, 150, "#FBF4FA", C.p, 8, 1.5);
  b += TL(528, 114, ["Ejemplo:", "φ = 0,05 (5 % del", "volumen es sólido)", "η = η₀(1 + 2,5·0,05)", "η = 1,125 η₀", "→ sube solo 12,5 %"], { size: 12.5, fill: C.d, lh: 20, bold: true });
  b += TL(W / 2, 340, ["Solo vale para esferas rígidas, diluidas y sin interacción. Por eso es un punto de partida, no la historia completa."], { size: 12.5, anchor: "middle", fill: C.m });
  return wrap("ft2-einstein", W, H, "Ecuación de Einstein", "Viscosidad relativa en función de la fracción de volumen de sólido: la recta de Einstein vale para sistemas diluidos y se separa de la curva real al concentrarse.", b);
}

/* ─────────────────────────── Castillo de naipes ─────────────────────────── */
export function castilloNaipes() {
  const W = 720, H = 360;
  let b = T(W / 2, 26, "Arcilla suspensora (Veegum, bentonita): castillo de naipes", { size: 17, anchor: "middle", bold: true, fill: C.d });
  const plate = (cx, cy, len, ang, col = C.d) =>
    `<g transform="rotate(${ang} ${cx} ${cy})">` + rect(cx - len / 2, cy - 4, len, 8, "#D8C4E0", col, 2, 1.5) +
    T(cx - len / 2 - 2, cy + 4, "+", { size: 10, fill: C.g, anchor: "end", bold: true }).replace('transform=', 'data-x=') +
    "</g>";
  // placa-guía
  b += rect(250, 44, 220, 34, "#F9FAFB", C.l, 6, 1);
  b += rect(290, 56, 140, 10, "#D8C4E0", C.d, 2, 1.5);
  b += T(284, 66, "+", { size: 15, fill: C.g, anchor: "end", bold: true }) + T(436, 66, "+", { size: 15, fill: C.g, bold: true });
  for (let i = 0; i < 5; i++) b += T(305 + i * 27, 53, "−", { size: 13, fill: C.p, bold: true, anchor: "middle" }) + T(305 + i * 27, 79, "−", { size: 13, fill: C.p, bold: true, anchor: "middle" });
  b += T(W / 2, 98, "caras (−) · bordes (+)", { size: 12.5, anchor: "middle", fill: C.d, bold: true });
  // reposo
  b += rect(30, 112, 310, 190, "#FBF8FC", C.l, 8, 1.5) + rect(380, 112, 310, 190, "#FBF8FC", C.l, 8, 1.5);
  const R = rng(9);
  const rest = [[90, 160, 70, 62], [135, 195, 70, -20], [180, 160, 70, 80], [220, 215, 74, 10], [262, 168, 70, -58], [300, 205, 64, 70], [110, 255, 70, 8], [160, 250, 66, -62], [208, 270, 70, 75], [255, 258, 70, -10], [300, 265, 56, 55], [75, 205, 60, -75], [235, 130, 52, 18], [150, 130, 52, -30]];
  for (const [x, y, l, a] of rest) b += plate(x, y, l, a);
  b += T(185, 322, "REPOSO: red tridimensional → gel", { size: 13.5, anchor: "middle", bold: true, fill: C.p });
  b += T(185, 340, "alta viscosidad: el fármaco no se asienta", { size: 12, anchor: "middle", fill: C.m });
  // agitación
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) b += plate(430 + c * 100 + (r % 2) * 22, 150 + r * 36, 84, 6 + (R() - 0.5) * 10);
  b += seg(398, 128, 672, 128, C.a, 2.5, "", "ar") + T(535, 123, "cizalla (agitar)", { size: 12, anchor: "middle", fill: C.a, bold: true });
  b += T(535, 322, "AGITACIÓN: placas alineadas → fluye", { size: 13.5, anchor: "middle", bold: true, fill: C.p });
  b += T(535, 340, "baja viscosidad: se vierte y se dosifica", { size: 12, anchor: "middle", fill: C.m });
  b += seg(342, 207, 378, 207, C.d, 3, "", "ar");
  return wrap("ft2-castillo-naipes", W, H, "Castillo de naipes", "Las placas de arcilla tienen caras negativas y bordes positivos; en reposo forman una red tridimensional que gelifica y al agitarse se alinean y el sistema fluye.", b);
}
