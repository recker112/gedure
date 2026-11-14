import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { AppProviders } from "../App";
import { routes } from "../router/routes";

/**
 * Monta el árbol de rutas real (con sus `lazy`) en un router en memoria y
 * con los proveedores de la app (store + tema).
 */
export function renderRoute(path = "/") {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  const utils = render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>,
  );
  return { router, ...utils };
}
