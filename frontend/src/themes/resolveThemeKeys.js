import themes from "./index.js";

/**
 * Modo y variante válidos a partir de lo guardado. Un valor inválido (o una
 * variante que ya no existe) no debe tumbar la app: cae a `light` / `default`.
 * Función pura: es el único sitio donde se sanean.
 */
export function resolveThemeKeys(mode, variant = "default") {
  return {
    mode: mode === "dark" ? "dark" : "light",
    variant: Object.hasOwn(themes, variant) ? variant : "default",
  };
}
