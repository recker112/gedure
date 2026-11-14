/**
 * Components
 */
import Fallback from "../../components/routers/Fallback";
import useTitleHook from "../../hooks/utils/useTitleHook";

/**
 * Solo la pantalla de espera. El cierre de sesión lo hace `logoutLoader`
 * (router/logoutLoader.js), que corre una vez por navegación.
 */
export default function PaperLogout() {
  useTitleHook("Cerrando sesión");

  return <Fallback component="section" text="Cerrando tu sesión, espera un momento…" loading />;
}
