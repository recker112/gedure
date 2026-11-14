import { describe, expect, test } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import store from "../store";
import { renderRoute } from "../test/renderRoute";
import { routes } from "./routes";

/**
 * Las rutas usan `route.lazy`, así que su forma se valida en tiempo de
 * ejecución: un anidamiento mal hecho o un layout sin <Outlet /> compilan
 * y revientan en el navegador.
 */
const TIMEOUT = { timeout: 8000 };

const findH1 = (name) => screen.findByRole("heading", { level: 1, name }, TIMEOUT);

describe("routes", () => {
  test("/ renderiza Inicio dentro del layout público", async () => {
    renderRoute("/");

    expect(await findH1("Enfocados en el Estudio y la Fe")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("navega a Contacto desde la barra principal", async () => {
    const user = userEvent.setup();
    const { router } = renderRoute("/");
    await findH1("Enfocados en el Estudio y la Fe");

    const nav = screen.getByRole("navigation", { name: "Principal" });
    await user.click(within(nav).getByRole("link", { name: "Contacto" }));

    expect(await findH1("Contacto")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/contactanos");
    expect(within(nav).getByRole("link", { name: "Contacto" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("form", { name: "Formulario de contacto" })).toBeInTheDocument();
  });

  test("una ruta inexistente muestra la 404 sin perder la navegación", async () => {
    renderRoute("/no-existe");

    expect(await findH1("Página no encontrada")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/");
  });

  test("/noticias lista las noticias y enlaza a su detalle", async () => {
    const user = userEvent.setup();
    renderRoute("/noticias");
    await findH1("Noticias");

    await user.click(screen.getByRole("link", { name: /Acto de grado/ }));
    expect(await findH1(/Acto de grado/)).toBeInTheDocument();
  });

  test("una noticia inexistente avisa dentro del layout", async () => {
    renderRoute("/noticias/no-existe");
    expect(await screen.findByText("Noticia no encontrada.", {}, TIMEOUT)).toBeInTheDocument();
  });

  test("/nosotros muestra historia y directivos", async () => {
    renderRoute("/nosotros");
    await findH1(/La Candelaria/);
    expect(screen.getByRole("heading", { level: 2, name: "Nuestra historia" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Directivos" })).toBeInTheDocument();
  });

  test("/login es una pantalla propia sin el layout público", async () => {
    renderRoute("/login");
    expect(await findH1("Entrar a Gedure")).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Principal" })).not.toBeInTheDocument();
  });

  test("/entrar (web anterior) redirige a /login", async () => {
    const { router } = renderRoute("/entrar");
    await findH1("Entrar a Gedure");
    expect(router.state.location.pathname).toBe("/login");
  });

  test("el botón de tema alterna el modo en el store", async () => {
    const user = userEvent.setup();
    renderRoute("/");
    await findH1("Enfocados en el Estudio y la Fe");

    const before = store.getState().userConfig.theme;
    const toggle = screen.getByRole("button", { name: /Activar modo (oscuro|claro)/ });
    await user.click(toggle);
    expect(store.getState().userConfig.theme).not.toBe(before);
    await user.click(screen.getByRole("button", { name: /Activar modo (oscuro|claro)/ }));
    expect(store.getState().userConfig.theme).toBe(before);
  });
});

/**
 * El catch-all de Laravel (backend/routes/web.php) no sirve el SPA para estos
 * prefijos: una ruta del cliente que empiece así daría 404 al recargar.
 */
describe("rutas frente al backend", () => {
  const RESERVED = /^\/?(api|up|app|broadcasting)(\/|$)|^\/?assets\//;

  const collectPaths = (list) =>
    list.flatMap((route) => [...(route.path ? [route.path] : []), ...collectPaths(route.children ?? [])]);

  test("ninguna ruta colisiona con las exclusiones del backend", () => {
    const paths = collectPaths(routes);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) expect(path).not.toMatch(RESERVED);
  });
});
