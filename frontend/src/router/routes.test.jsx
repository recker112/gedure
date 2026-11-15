import { afterEach, describe, expect, test } from "vitest";
import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import store from "../store";
import { renderRoute } from "../test/renderRoute";
import { mockRoutes } from "../test/mockFetch";
import { routes } from "./routes";
import { FULL_KEY, TEMP_KEY, resetAuth, serveAuth, signIn } from "../test/authBackend";
import { writeStorage } from "../components/utils/storage";
import { updateUserData } from "../store/reducers/auth/authReducer";

/**
 * Las rutas usan `route.lazy`, así que su forma se valida en tiempo de
 * ejecución: un anidamiento mal hecho o un layout sin <Outlet /> compilan
 * y revientan en el navegador.
 */
const TIMEOUT = { timeout: 8000 };

const findH1 = (name) => screen.findByRole("heading", { level: 1, name }, TIMEOUT);

describe("routes", () => {
  afterEach(resetAuth);

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

  test.each(["/login", "/entrar"])("%s (web anterior y landing) redirige al login /auth", async (path) => {
    const { router } = renderRoute(path);
    await findH1("Entrar a Gedure");
    expect(router.state.location.pathname).toBe("/auth");
    expect(screen.queryByRole("navigation", { name: "Principal" })).not.toBeInTheDocument();
  });

  test("sin sesión, la barra («Iniciar sesión») y la portada («Entrar a Gedure») llevan al login", async () => {
    const user = userEvent.setup();
    const { router } = renderRoute("/");
    await findH1("Enfocados en el Estudio y la Fe");

    for (const name of ["Iniciar sesión", "Entrar a Gedure"]) {
      for (const link of screen.getAllByRole("link", { name })) expect(link).toHaveAttribute("href", "/auth");
    }
    await user.click(screen.getAllByRole("link", { name: "Iniciar sesión" })[0]);

    await findH1("Entrar a Gedure");
    expect(router.state.location.pathname).toBe("/auth");
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

describe("sesión y guards", () => {
  afterEach(resetAuth);

  test("AuthProtect: /gedure sin sesión lleva al login", async () => {
    const { router } = renderRoute("/gedure");
    await findH1("Entrar a Gedure");
    expect(router.state.location.pathname).toBe("/auth");
  });

  test.each(["/auth/2fa", "/auth/logout"])("AuthProtect: %s sin sesión lleva al login", async (path) => {
    const { router } = renderRoute(path);
    await findH1("Entrar a Gedure");
    expect(router.state.location.pathname).toBe("/auth");
  });

  test("con la sesión completa, /auth manda al panel", async () => {
    serveAuth();
    signIn();
    const { router } = renderRoute("/auth");
    await findH1(/Hola, Administrador/);
    expect(router.state.location.pathname).toBe("/gedure");
  });

  test("con el token temporal, /gedure manda al 2FA", async () => {
    serveAuth();
    signIn({ apiKey: TEMP_KEY, token_can: ["2fa_required"] });
    const { router } = renderRoute("/gedure");
    await findH1("Verificación en dos pasos");
    expect(router.state.location.pathname).toBe("/auth/2fa");
  });

  test("carga inicial con apiKey guardada: el relogin restaura la sesión completa", async () => {
    const backend = serveAuth();
    act(() => {
      writeStorage("auth.apiKey", FULL_KEY, true);
      store.dispatch(updateUserData({ apiKey: FULL_KEY }));
    });

    renderRoute("/gedure");

    await findH1(/Hola, Administrador/);
    const call = backend.calls.find((c) => c.path === "/auth/relogin");
    expect(call.headers.get("authorization")).toBe(`Bearer ${FULL_KEY}`);
    expect(store.getState().auth.auth).toBe(true);
  });

  test("carga inicial con el token temporal guardado: el relogin lleva al 2FA", async () => {
    serveAuth();
    act(() => {
      writeStorage("auth.apiKey", TEMP_KEY, false);
      store.dispatch(updateUserData({ apiKey: TEMP_KEY }));
    });

    const { router } = renderRoute("/auth");

    await findH1("Verificación en dos pasos");
    expect(router.state.location.pathname).toBe("/auth/2fa");
  });

  test("carga inicial con un token caducado (401): limpia la sesión y avisa", async () => {
    serveAuth({ "POST /auth/relogin": { status: 401, body: { message: "Unauthenticated." } } });
    act(() => {
      writeStorage("auth.apiKey", FULL_KEY, true);
      store.dispatch(updateUserData({ apiKey: FULL_KEY }));
    });

    const { router } = renderRoute("/gedure");

    await findH1("Entrar a Gedure");
    expect(router.state.location.pathname).toBe("/auth");
    expect(await screen.findByText("Tu sesión expiró")).toBeInTheDocument();
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBeNull();
  });

  test("sin conexión al comprobar la sesión: pantalla de reintentar, sin cerrarla", async () => {
    mockRoutes({ "POST /auth/relogin": { status: 503, body: {} } });
    act(() => {
      writeStorage("auth.apiKey", FULL_KEY, true);
      store.dispatch(updateUserData({ apiKey: FULL_KEY }));
    });

    renderRoute("/gedure");

    expect(await screen.findByRole("button", { name: "Reintentar" }, TIMEOUT)).toBeInTheDocument();
    expect(store.getState().auth.apiKey).toBe(FULL_KEY);
  });

  test("el panel muestra el usuario y «Cerrar sesión» la cierra", async () => {
    const backend = serveAuth();
    signIn();
    const user = userEvent.setup();
    const { router } = renderRoute("/gedure");
    await findH1(/Hola, Administrador/);

    await user.click(screen.getByRole("button", { name: /Cuenta de Administrador/ }));
    const menu = await screen.findByRole("menu");
    expect(within(menu).getByText("12345678")).toBeInTheDocument();
    expect(within(menu).getByText("owner@example.com")).toBeInTheDocument();
    await user.click(within(menu).getByRole("menuitem", { name: "Cerrar sesión" }));

    await findH1("Entrar a Gedure");
    expect(router.state.location.pathname).toBe("/auth");
    expect(backend.calls.find((c) => c.path === "/auth/logout").headers.get("authorization")).toBe(`Bearer ${FULL_KEY}`);
    expect(await screen.findByText("Sesión cerrada")).toBeInTheDocument();
    expect(store.getState().auth).toMatchObject({ auth: false, apiKey: null });
    expect(window.sessionStorage.getItem("gd.auth.apiKey")).toBeNull();
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
