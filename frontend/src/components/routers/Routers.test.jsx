import { afterEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { AppProviders } from "../../App";
import { AuthProtect, NO_PERM_PATH } from "./Routers";
import { TEMP_KEY, resetAuth, signIn } from "../../test/authBackend";

const TIMEOUT = { timeout: 8000 };

/**
 * Árbol mínimo con la forma del real: /gedure con AuthProtect sin permisos,
 * no-perm y, como HERMANAS, rutas con su propio AuthProtect.
 */
function renderGuarded(path) {
  const page = (name) => ({ element: <h1>{name}</h1> });
  const router = createMemoryRouter(
    [
      { path: "/auth", ...page("Login") },
      { path: "/auth/2fa", ...page("2FA") },
      {
        path: "/gedure",
        element: <AuthProtect />,
        children: [
          { index: true, ...page("Inicio") },
          { path: "no-perm", ...page("Sin permiso") },
          { element: <AuthProtect permission="usuarios.usuario.show" />, children: [{ path: "uno", ...page("Uno") }] },
          {
            element: <AuthProtect permission={["notas.nota.update", "usuarios.rol.update"]} />,
            children: [{ path: "alguno", ...page("Alguno") }],
          },
          {
            element: <AuthProtect allPermissions={["usuarios.rol.update", "usuarios.permiso.update"]} />,
            children: [{ path: "todos", ...page("Todos") }],
          },
        ],
      },
    ],
    { initialEntries: [path] },
  );
  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>,
  );
  return router;
}

const findH1 = (name) => screen.findByRole("heading", { level: 1, name }, TIMEOUT);

describe("AuthProtect con permisos", () => {
  afterEach(resetAuth);

  test("sin el permiso redirige a /gedure/no-perm", async () => {
    signIn({ permissions: {} });
    const router = renderGuarded("/gedure/uno");
    await findH1("Sin permiso");
    expect(router.state.location.pathname).toBe(NO_PERM_PATH);
  });

  test("con el permiso deja pasar", async () => {
    signIn({ permissions: { "usuarios.usuario.show": true } });
    renderGuarded("/gedure/uno");
    expect(await findH1("Uno")).toBeInTheDocument();
  });

  test("permission con array: basta uno", async () => {
    signIn({ permissions: { "usuarios.rol.update": true } });
    renderGuarded("/gedure/alguno");
    expect(await findH1("Alguno")).toBeInTheDocument();
  });

  test("allPermissions: con uno solo no basta", async () => {
    signIn({ permissions: { "usuarios.rol.update": true } });
    const router = renderGuarded("/gedure/todos");
    await findH1("Sin permiso");
    expect(router.state.location.pathname).toBe(NO_PERM_PATH);
  });

  test("allPermissions: con todos pasa", async () => {
    signIn({ permissions: { "usuarios.rol.update": true, "usuarios.permiso.update": true } });
    renderGuarded("/gedure/todos");
    expect(await findH1("Todos")).toBeInTheDocument();
  });

  test.each(["/gedure/uno", "/gedure/alguno", "/gedure/todos"])("el owner pasa siempre (%s)", async (path) => {
    signIn({ permissions: {}, roles: ["owner"], is_owner: true });
    const router = renderGuarded(path);
    await screen.findByRole("heading", { level: 1 }, TIMEOUT);
    expect(router.state.location.pathname).toBe(path);
  });

  test("sin sesión manda al login antes de mirar permisos", async () => {
    const router = renderGuarded("/gedure/uno");
    await findH1("Login");
    expect(router.state.location.pathname).toBe("/auth");
  });

  test("con el token temporal del 2FA manda al 2FA, no a no-perm", async () => {
    signIn({ apiKey: TEMP_KEY, token_can: ["2fa_required"] });
    const router = renderGuarded("/gedure/uno");
    await findH1("2FA");
    expect(router.state.location.pathname).toBe("/auth/2fa");
  });
});
