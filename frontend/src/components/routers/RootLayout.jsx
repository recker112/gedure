/**
 * React
 */
import { Outlet, ScrollRestoration } from "react-router-dom";

/**
 * Components
 */
import NavigationProgress from "./NavigationProgress";

/**
 * Raíz de todas las rutas. ScrollRestoration lleva al inicio de la página en
 * cada navegación nueva y restaura la posición al volver atrás.
 */
export default function RootLayout() {
  return (
    <>
      <NavigationProgress />
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
