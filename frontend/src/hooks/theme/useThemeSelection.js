/**
 * Redux
 */
import { useSelector } from "react-redux";
import { resolveThemeKeys } from "../../themes/resolveThemeKeys";

/**
 * Modo y variante del tema activo, ya saneados (`{ mode, variant }`), a
 * partir de `userConfig`. Lo usan useThemeConfig y el botón de tema.
 */
export function useThemeSelection() {
  const storedMode = useSelector((state) => state.userConfig.theme);

  return resolveThemeKeys(storedMode);
}
