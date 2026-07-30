/**
 * Couleurs d'accent de la charte, avec leur composante RGB pour composer
 * dynamiquement des `rgba(...)` (fonds dégradés, bordures, ombres teintées).
 */
export type AccentKey = "turquoise" | "violet" | "magenta" | "brand";

export const ACCENTS: Record<AccentKey, { hex: string; rgb: string }> = {
  turquoise: { hex: "#00a3bf", rgb: "0, 163, 191" },
  violet: { hex: "#735092", rgb: "115, 80, 146" },
  magenta: { hex: "#c02a87", rgb: "193, 42, 135" },
  brand: { hex: "#273582", rgb: "39, 53, 130" },
};

/** `rgba()` à partir d'une clé d'accent et d'une opacité. */
export function accentRgba(key: AccentKey, alpha: number): string {
  return `rgba(${ACCENTS[key].rgb}, ${alpha})`;
}

export function accentHex(key: AccentKey): string {
  return ACCENTS[key].hex;
}
