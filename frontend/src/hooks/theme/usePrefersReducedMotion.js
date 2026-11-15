/**
 * MUI
 */
import { useMediaQuery } from "@mui/material";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * ¿Pide el sistema reducir el movimiento? MUI no respeta
 * `prefers-reduced-motion` en sus transiciones JS (p. ej. Slide), así que los
 * componentes lo consultan con este hook.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery(REDUCED_MOTION_QUERY, { noSsr: true });
}
