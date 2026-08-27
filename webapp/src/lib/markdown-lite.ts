/**
 * Render seguro del contenido de una sesión (apuntes método Cornell).
 * Portado de `js/modulos.js` del borrador Farmacotecnia2.
 *
 * SEGURIDAD: se escapa TODO el texto primero; luego un safelist reconvierte
 * solo un puñado de patrones a etiquetas reales. Aunque el texto venga de un
 * respaldo importado, nunca puede inyectar HTML/scripts.
 *
 * Sintaxis soportada, una construcción por línea salvo el inline:
 *   #### / ### / ## Encabezado
 *   | celda | celda |         (tabla; la fila de guiones separadora es opcional)
 *   * viñeta      /  1. numerada
 *   * [ ] pendiente  /  * [x] hecho
 *   ---           (regla horizontal)
 *   **negrita**  *cursiva*  <br> literal dentro de celda
 */

export function escapeHtml(str: string | null | undefined): string {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapa **negrita**, *cursiva* y el token literal &lt;br&gt; → <br>. */
export function inlineLite(s: string): string {
  let e = escapeHtml(s);
  e = e.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  e = e.replace(/\*(.+?)\*/g, "<em>$1</em>");
  e = e.replace(/&lt;br&gt;/g, "<br>");
  return e;
}

export function renderCornell(texto: string | null | undefined): string {
  const lineas = String(texto ?? "").split("\n");
  let html = "";
  let listaAbierta: "ul" | "ol" | null = null;
  const cerrarLista = () => {
    if (listaAbierta) {
      html += `</${listaAbierta}>`;
      listaAbierta = null;
    }
  };

  let i = 0;
  while (i < lineas.length) {
    const t = lineas[i].trim();

    if (/^\|.*\|$/.test(t)) {
      cerrarLista();
      const filas: string[] = [];
      while (i < lineas.length && /^\|.*\|$/.test(lineas[i].trim())) {
        filas.push(lineas[i].trim());
        i++;
      }
      const celdas = (f: string) => f.slice(1, -1).split("|").map((c) => c.trim());
      const header = celdas(filas[0]);
      const inicioCuerpo = filas[1] && /^[\s:|-]+$/.test(filas[1]) ? 2 : 1;
      html +=
        '<div class="cornell-table-wrap"><table class="cornell-table"><thead><tr>' +
        header.map((h) => `<th>${inlineLite(h)}</th>`).join("") +
        "</tr></thead><tbody>";
      for (let r = inicioCuerpo; r < filas.length; r++) {
        const cols = celdas(filas[r]);
        html += "<tr>" + cols.map((c) => `<td>${inlineLite(c)}</td>`).join("") + "</tr>";
      }
      html += "</tbody></table></div>";
      continue;
    }

    const mH = t.match(/^#{2,4}\s+(.*)$/);
    if (mH) {
      cerrarLista();
      html += `<p class="cornell-heading">${inlineLite(mH[1])}</p>`;
      i++;
      continue;
    }

    if (/^-{3,}$/.test(t)) {
      cerrarLista();
      html += '<hr class="cornell-hr">';
      i++;
      continue;
    }

    const mChk = t.match(/^[*-]\s+\[( |x|X)\]\s+(.*)$/);
    if (mChk) {
      cerrarLista();
      html +=
        '<label class="cornell-check"><input type="checkbox" disabled' +
        (mChk[1].toLowerCase() === "x" ? " checked" : "") +
        ` /><span>${inlineLite(mChk[2])}</span></label>`;
      i++;
      continue;
    }

    const mBul = t.match(/^[*-]\s+(.*)$/);
    if (mBul) {
      if (listaAbierta !== "ul") {
        cerrarLista();
        html += '<ul class="cornell-list">';
        listaAbierta = "ul";
      }
      html += `<li>${inlineLite(mBul[1])}</li>`;
      i++;
      continue;
    }

    const mNum = t.match(/^\d+\.\s+(.*)$/);
    if (mNum) {
      if (listaAbierta !== "ol") {
        cerrarLista();
        html += '<ol class="cornell-list">';
        listaAbierta = "ol";
      }
      html += `<li>${inlineLite(mNum[1])}</li>`;
      i++;
      continue;
    }

    if (!t) {
      cerrarLista();
      i++;
      continue;
    }

    cerrarLista();
    html += `<p class="cornell-p">${inlineLite(t)}</p>`;
    i++;
  }
  cerrarLista();
  return html || '<p class="cornell-empty">(sin contenido)</p>';
}
