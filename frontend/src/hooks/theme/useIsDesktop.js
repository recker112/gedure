/**
 * MUI
 */
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

/**
 * Única definición del breakpoint de escritorio: desde `md`. Lo usan los
 * componentes que cambian de forma entre escritorio y móvil.
 */
export function useIsDesktop() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
}
