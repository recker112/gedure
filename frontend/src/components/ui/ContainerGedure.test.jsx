import { afterEach, describe, expect, test, vi } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderRoute } from "../../test/renderRoute";
import { resetAuth, serveAuth, signIn } from "../../test/authBackend";

/**
 * En la fase 0 no hay módulos reales: se registra la plantilla
 * (modules/_plantilla) para probar la carcasa con un módulo de verdad
 * (registro → menú, moduleRoute → guards, rutas montadas en el panel).
 */
vi.mock("../../apps/registry", async (importOriginal) => {
  const original = await importOriginal();
  const { default: plantilla } = await import("../../modules/_plantilla/config");
  return { ...original, modules: original.createRegistry([plantilla]) };
});
vi.mock("../../apps/routes", async () => {
  const plantilla = await import("../../modules/_plantilla/routes");
  return { moduleRoutes: [plantilla.default], publicModuleRoutes: [] };
});

const TIMEOUT = { timeout: 8000 };
const findH1 = (name) => screen.findByRole("heading", { level: 1, name }, TIMEOUT);
const MENU = { name: "Menú del panel" };

const OWNER = { permissions: {}, roles: ["owner"], is_owner: true };

async function openMenu(user) {
  await user.click(screen.getByRole("button", { name: "Abrir menú" }));
  return screen.findByRole("navigation", MENU);
}

describe("carcasa del panel", () => {
  afterEach(resetAuth);

  test("el menú está cerrado al entrar y se abre con «Abrir menú»", async () => {
    serveAuth();
    signIn(OWNER);
    const user = userEvent.setup();
    renderRoute("/gedure");
    await findH1(/Hola, Administrador/);

    expect(screen.queryByRole("navigation", MENU)).not.toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();

    const nav = await openMenu(user);
    // El inicio del panel y el «Inicio» de la plantilla (su entrada index).
    const [home, plantillaIndex] = within(nav).getAllByRole("link", { name: "Inicio" });
    expect(home).toHaveAttribute("href", "/gedure");
    expect(home).toHaveAttribute("aria-current", "page");
    expect(plantillaIndex).toHaveAttribute("href", "/gedure/plantilla");
    expect(plantillaIndex).not.toHaveAttribute("aria-current");
    expect(within(nav).getByText("Plantilla")).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Elementos" })).toHaveAttribute("href", "/gedure/plantilla/elementos");
    expect(within(nav).getByText("Ajustes")).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Avanzado" })).toHaveAttribute("href", "/gedure/plantilla/ajustes/avanzado");
  });

  test("elegir una sección navega, cierra el menú y pone el módulo en el AppBar", async () => {
    serveAuth();
    signIn(OWNER);
    const user = userEvent.setup();
    const { router } = renderRoute("/gedure");
    await findH1(/Hola, Administrador/);

    const nav = await openMenu(user);
    await user.click(within(nav).getByRole("link", { name: "Elementos" }));

    await findH1("Plantilla");
    expect(router.state.location.pathname).toBe("/gedure/plantilla/elementos");
    await waitFor(() => expect(screen.queryByRole("navigation", MENU)).not.toBeInTheDocument());
    expect(screen.getByRole("link", { name: "Gedure, ir al inicio del panel" })).toHaveTextContent("Plantilla");

    const reopened = await openMenu(user);
    expect(within(reopened).getByRole("link", { name: "Elementos" })).toHaveAttribute("aria-current", "page");
  });

  test("Escape cierra el menú", async () => {
    serveAuth();
    signIn(OWNER);
    const user = userEvent.setup();
    renderRoute("/gedure");
    await findH1(/Hola, Administrador/);

    await openMenu(user);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("navigation", MENU)).not.toBeInTheDocument());
  });

  test("el menú solo muestra lo que permiten los permisos de la sesión", async () => {
    serveAuth();
    signIn({ permissions: { "plantilla.elemento.show": true } });
    const user = userEvent.setup();
    renderRoute("/gedure");
    await findH1(/Hola, Administrador/);

    const nav = await openMenu(user);
    expect(within(nav).getByRole("link", { name: "Elementos" })).toBeInTheDocument();
    expect(within(nav).queryByText("Ajustes")).not.toBeInTheDocument();
    expect(within(nav).queryByRole("link", { name: "Avanzado" })).not.toBeInTheDocument();
  });

  test("Inicio ofrece accesos a los módulos visibles", async () => {
    serveAuth();
    signIn(OWNER);
    renderRoute("/gedure");
    await findH1(/Hola, Administrador/);

    expect(screen.getByRole("link", { name: "Plantilla" })).toHaveAttribute("href", "/gedure/plantilla");
  });

  test("sin módulos visibles, Inicio lo explica en vez de mostrar accesos", async () => {
    serveAuth();
    signIn({ permissions: {} });
    renderRoute("/gedure");
    await findH1(/Hola, Administrador/);

    expect(screen.getByText("Aún no hay secciones disponibles para tu cuenta")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Plantilla" })).not.toBeInTheDocument();
  });

  test("sin el permiso del módulo, su URL lleva a /gedure/no-perm dentro del panel", async () => {
    serveAuth();
    signIn({ permissions: {} });
    const { router } = renderRoute("/gedure/plantilla");

    await findH1("No tienes permiso para ver esta página");
    expect(router.state.location.pathname).toBe("/gedure/no-perm");
    expect(screen.getByRole("button", { name: "Abrir menú" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/gedure");
  });

  test("con el permiso del módulo pero no el de la entrada (allPermissions), también a no-perm", async () => {
    serveAuth();
    signIn({ permissions: { "plantilla.ajuste.show": true } });
    const { router } = renderRoute("/gedure/plantilla/ajustes/avanzado");

    await findH1("No tienes permiso para ver esta página");
    expect(router.state.location.pathname).toBe("/gedure/no-perm");
  });

  test("con los permisos de la entrada, la pantalla se pinta en el panel", async () => {
    serveAuth();
    signIn({ permissions: { "plantilla.ajuste.show": true, "plantilla.ajuste.update": true } });
    const { router } = renderRoute("/gedure/plantilla/ajustes/avanzado");

    await findH1("Plantilla");
    expect(router.state.location.pathname).toBe("/gedure/plantilla/ajustes/avanzado");
  });

  test("una URL inexistente del panel muestra su 404 sin perder la carcasa", async () => {
    serveAuth();
    signIn(OWNER);
    renderRoute("/gedure/no-existe");

    await findH1("Página no encontrada");
    expect(screen.getByRole("button", { name: "Abrir menú" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/gedure");
  });
});
