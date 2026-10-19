/**
 * BFC — ayudas de redacción para los capítulos y ejercicios (no es una asignatura).
 * `fx(...)` arma un bloque ```formula con el markup de fórmulas de la app
 * (_{sub} ^{sup} #{num|den}), una línea por renglón.
 */
export const fx = (...lines: string[]): string => "```formula\n" + lines.join("\n") + "\n```";
