/**
 * Render seguro de contenido en Markdown (apuntes método Cornell,
 * transcripciones, anverso/reverso de flashcards). Portado y ampliado desde
 * `js/modulos.js` del borrador Farmacotecnia2.
 *
 * SEGURIDAD: se escapa TODO el texto primero; luego un safelist reconvierte
 * solo un puñado de patrones a etiquetas reales. Aunque el texto venga de un
 * respaldo importado, nunca puede inyectar HTML/scripts. Los enlaces solo se
 * aceptan con protocolo http/https.
 *
 * Bloque (una construcción por línea):
 *   # / ## / ### / #### Encabezado
 *   > cita                         (bloques consecutivos se agrupan)
 *   ``` … ```                      (bloque de código)
 *   ```formula … ```                (fórmula: mismo markup que formula-markup.ts —
 *                                    _{sub} ^{sup} #{num|den} — una línea por renglón)
 *   | celda | celda |             (tabla; la fila de guiones es opcional)
 *   * viñeta   /  1. numerada   /  * [ ] pendiente  /  * [x] hecho
 *   ---                           (regla horizontal)
 * Inline:
 *   **negrita**  *cursiva*  `código`  [texto](https://url)  <br> literal
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

function isHttp(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/** Mismo markup que `formula-markup.ts` (duplicado a propósito: evita el
 *  import circular, ya que ese módulo importa `escapeHtml` de este). */
function applyFormulaMath(e: string): string {
  return e
    .replace(/_\{([^{}]+)\}/g, "<sub>$1</sub>")
    .replace(/\^\{([^{}]+)\}/g, "<sup>$1</sup>")
    .replace(
      /#\{([^|{}]+)\|([^{}]+)\}/g,
      '<span class="frac"><span class="frac-num">$1</span><span class="frac-den">$2</span></span>',
    );
}

// Delimitador del marcador temporal de `código` — caracteres del Área de Uso
// Privado de Unicode, imposibles de teclear por accidente y que ningún texto
// real va a contener, así nunca colisiona con dígitos sueltos del contenido
// (p. ej. "Farmacotecnia 2 —"). Antes se usaba ` N ` (espacio-número-espacio)
// y SÍ colisionaba con cualquier número suelto del texto, borrándolo.
const CODE_MARK = "";
const CODE_MARK_RE = /(\d+)/g;

/** Inline seguro: negrita, cursiva, código, enlaces http(s), <br> literal. */
export function inlineLite(s: string): string {
  let e = escapeHtml(s);
  // `código` primero, para que su contenido no se re-procese.
  const codes: string[] = [];
  e = e.replace(/`([^`]+)`/g, (_m, c) => {
    codes.push(`<code>${c}</code>`);
    return `${CODE_MARK}${codes.length - 1}${CODE_MARK}`;
  });
  e = e.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  e = e.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // [texto](url) — url ya escapada; solo aceptamos http/https.
  e = e.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_m, text, url) => {
    const clean = String(url).replace(/&amp;/g, "&");
    if (!isHttp(clean)) return `${text} (${url})`;
    return `<a href="${url}" target="_blank" rel="noreferrer" class="md-link">${text}</a>`;
  });
  e = e.replace(/&lt;br&gt;/g, "<br>");
  e = e.replace(CODE_MARK_RE, (_m, n) => codes[Number(n)] ?? "");
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
    const raw = lineas[i];
    const t = raw.trim();

    // Bloque de código ``` … ``` (```formula usa el markup de formula-markup.ts)
    if (/^```/.test(t)) {
      cerrarLista();
      const lang = t.replace(/^```/, "").trim().toLowerCase();
      i++;
      const buf: string[] = [];
      while (i < lineas.length && !/^```/.test(lineas[i].trim())) {
        buf.push(lineas[i]);
        i++;
      }
      i++; // salta el ``` de cierre
      if (lang === "formula") {
        html +=
          `<div class="formula">` +
          buf.map((l) => `<span class="formula-line">${applyFormulaMath(escapeHtml(l))}</span>`).join("") +
          `</div>`;
      } else {
        html += `<pre class="cornell-code"><code>${escapeHtml(buf.join("\n"))}</code></pre>`;
      }
      continue;
    }

    // Cita >
    if (/^>\s?/.test(t)) {
      cerrarLista();
      const buf: string[] = [];
      while (i < lineas.length && /^>\s?/.test(lineas[i].trim())) {
        buf.push(lineas[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      html += `<blockquote class="cornell-quote">${buf.map((l) => inlineLite(l)).join("<br>")}</blockquote>`;
      continue;
    }

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

    const mH = t.match(/^#{1,4}\s+(.*)$/);
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
