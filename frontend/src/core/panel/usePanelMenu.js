/**
 * Hooks
 */
import { useCanAccess } from "../../hooks/auth/useCanAccess";

/**
 * Modules
 */
import { modules } from "../../apps/registry";
import { buildPanelMenu } from "./panelMenu";

/** Menú del panel visible para la sesión actual (ver ./panelMenu.js). */
export function usePanelMenu() {
  const can = useCanAccess();

  return buildPanelMenu(Object.values(modules), can);
}
