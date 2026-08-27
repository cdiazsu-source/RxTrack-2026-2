/**
 * Render seguro del markup de fórmulas del borrador Farmacotecnia2 (`js/formulas.js`).
 * Escapa todo primero; luego reconoce:
 *   _{sub}    → <sub>
 *   ^{sup}    → <sup>
 *   #{num|den} → fracción con línea (span.frac)
 * Cada "\n" es una línea de fórmula aparte.
 * `renderDerivation` además reconoce **negrita** y separa por párrafos.
 */
import { escapeHtml } from "./markdown-lite";

function applyMath(e: string): string {
  return e
    .replace(/_\{([^{}]+)\}/g, "<sub>$1</sub>")
    .replace(/\^\{([^{}]+)\}/g, "<sup>$1</sup>")
    .replace(
      /#\{([^|{}]+)\|([^{}]+)\}/g,
      '<span class="frac"><span class="frac-num">$1</span><span class="frac-den">$2</span></span>',
    );
}

export function renderFormula(texto: string | null | undefined): string {
  return String(texto ?? "")
    .split("\n")
    .map((linea) => `<span class="formula-line">${applyMath(escapeHtml(linea))}</span>`)
    .join("");
}

export function renderDerivation(texto: string | null | undefined): string {
  const lineas = String(texto ?? "")
    .split("\n")
    .filter((l) => l.trim());
  if (!lineas.length) return "";
  return lineas
    .map((linea) => {
      let e = escapeHtml(linea).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      e = applyMath(e);
      return `<p>${e}</p>`;
    })
    .join("");
}
