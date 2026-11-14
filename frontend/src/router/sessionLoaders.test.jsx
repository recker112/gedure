import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { toast } from "sonner";
import { act, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import store from "../store";
import { renderRoute } from "../test/renderRoute";
import { FULL_KEY, TEMP_KEY, resetAuth, serveAuth } from "../test/authBackend";
import { writeStorage } from "../components/utils/storage";
import { updateUserData } from "../store/reducers/auth/authReducer";
import { resetSitePreference } from "./sessionLoaders";
import { news as NEWS } from "../core/news/newsData";

const TIMEOUT = { timeout: 8000 };
const findH1 = (name) => screen.findByRole("heading", { level: 1, name }, TIMEOUT);
const LOGIN_FIELD = "Usuario, cédula o correo";
const HERO = "Enfocados en el Estudio y la Fe";
/** Texto que solo existe en la portada (el lema también sale en el layout de /auth). */
const HOME_ONLY = "Educar para la vida y para el trabajo";

/** apiKey guardada al abrir la app (sin sesión confirmada todavía). */
const storedKey = (apiKey) =>
  act(() => {
    writeStorage("auth.apiKey", apiKey, true);
    store.dispatch(updateUserData({ apiKey }));
  });

const reloginCalls = (backend) => backend.calls.filter((c) => c.path === "/auth/relogin");

/** Hay un campo de login montado (en algún momento) si aparece en el DOM; lo vigilamos con un observer. */
function watchLoginField() {
  let seen = false;
  const check = () => {
    if (screen.queryByLabelText(new RegExp(LOGIN_FIELD)) || document.body.textContent.includes(LOGIN_FIELD)) seen = true;
  };
  const observer = new MutationObserver(check);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  return { seen: () => (check(), seen), stop: () => observer.disconnect() };
}

describe("web pública y sesión", () => {
  afterEach(resetAuth);

  test("sin sesión: la barra dice «Iniciar sesión» y va a /auth (desktop y menú móvil)", async () => {
    const user = userEvent.setup();
    const backend = serveAuth();
    renderRoute("/");
    await findH1("Enfocados en el Estudio y la Fe");

    const bar = screen.getAllByRole("link", { name: "Iniciar sesión" });
    for (const link of bar) expect(link).toHaveAttribute("href", "/auth");

    await user.click(screen.getByLabelText("Abrir menú"));
    await screen.findByRole("navigation", { name: "Menú" });
    // Con el drawer abierto el resto de la página queda aria-hidden: solo cuenta el menú.
    expect(screen.getByRole("link", { name: "Iniciar sesión" })).toHaveAttribute("href", "/auth");
    expect(reloginCalls(backend)).toHaveLength(0);
  });

  test("con sesión: «Ir a Gedure» con nombre e iniciales a /gedure (barra, menú y CTA de la landing)", async () => {
    const user = userEvent.setup();
    serveAuth();
    storedKey(FULL_KEY);
    renderRoute("/?sitio=1");
    await findH1("Enfocados en el Estudio y la Fe");

    // Primera pintura: ya sin «Iniciar sesión», aunque el relogin siga en vuelo.
    expect(screen.queryByRole("link", { name: "Iniciar sesión" })).not.toBeInTheDocument();

    await waitFor(() => expect(screen.getAllByRole("link", { name: /Ir a Gedure.*Administrador/ }).length).toBeGreaterThanOrEqual(2));
    for (const link of screen.getAllByRole("link", { name: /Ir a Gedure/ })) expect(link).toHaveAttribute("href", "/gedure");
    expect(screen.queryByRole("link", { name: "Entrar a Gedure" })).not.toBeInTheDocument();
    expect(screen.getAllByText("A").length).toBeGreaterThan(0); // iniciales del avatar

    await user.click(screen.getByLabelText("Abrir menú"));
    await screen.findByRole("navigation", { name: "Menú" });
    // Con el drawer abierto el resto de la página queda aria-hidden: solo cuenta el menú.
    expect(screen.getByRole("link", { name: /Ir a Gedure.*Administrador/ })).toHaveAttribute("href", "/gedure");
  });

  test("la web pública sigue visible con sesión (/nosotros, 404) y no bloquea el primer pintado", async () => {
    let release;
    const gate = new Promise((resolve) => (release = resolve));
    const backend = serveAuth({ "POST /auth/relogin": async () => (await gate, { body: { status: 200, user: { id: 1, name: "Administrador" }, token_can: [], permissions: {}, roles: [] } }) });
    storedKey(FULL_KEY);
    renderRoute("/nosotros");

    // El relogin sigue pendiente y la página ya se pinta.
    await screen.findByRole("heading", { level: 2, name: "Nuestra historia" }, TIMEOUT);
    expect(reloginCalls(backend)).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "Ir a Gedure" })[0]).toHaveAttribute("href", "/gedure");
    act(() => release());
    await screen.findAllByRole("link", { name: /Ir a Gedure.*Administrador/ });
  });

  test("apiKey caducada (relogin 401) en la web pública: vuelve a «Iniciar sesión», sin toast ni romper la página", async () => {
    serveAuth({ "POST /auth/relogin": { status: 401, body: { message: "Unauthenticated." } } });
    storedKey(FULL_KEY);
    const { router } = renderRoute("/?sitio=1");
    await findH1("Enfocados en el Estudio y la Fe");

    await waitFor(() => expect(store.getState().auth.apiKey).toBeNull());
    expect((await screen.findAllByRole("link", { name: "Iniciar sesión" }))[0]).toHaveAttribute("href", "/auth");
    expect(screen.queryByText("Tu sesión expiró")).not.toBeInTheDocument();
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBeNull();
    expect(router.state.location.pathname).toBe("/");
  });

  test("token temporal en la web pública: «Continuar verificación» a /auth/2fa", async () => {
    serveAuth();
    storedKey(TEMP_KEY);
    const { router } = renderRoute("/?sitio=1");
    await findH1("Enfocados en el Estudio y la Fe");

    const links = await screen.findAllByRole("link", { name: /Continuar verificación/ });
    for (const link of links) expect(link).toHaveAttribute("href", "/auth/2fa");
    expect(router.state.location.pathname).toBe("/");
  });
});

describe("loaders de sesión (redirect antes de pintar)", () => {
  afterEach(resetAuth);

  test("/auth con sesión completa: va al panel y el formulario de login nunca se monta", async () => {
    const backend = serveAuth();
    storedKey(FULL_KEY);
    const watcher = watchLoginField();

    const { router } = renderRoute("/auth");
    await findH1(/Hola, Administrador/);

    expect(router.state.location.pathname).toBe("/gedure");
    expect(watcher.seen()).toBe(false);
    watcher.stop();
    expect(screen.queryByLabelText(new RegExp(LOGIN_FIELD))).not.toBeInTheDocument();
    expect(reloginCalls(backend)).toHaveLength(1);
  });

  test("/auth/forgot-password con sesión completa: va al panel sin pintar el formulario", async () => {
    serveAuth();
    storedKey(FULL_KEY);
    const { router } = renderRoute("/auth/forgot-password");
    await findH1(/Hola, Administrador/);
    expect(router.state.location.pathname).toBe("/gedure");
  });

  test("/auth con token temporal: va a /auth/2fa sin pintar el login", async () => {
    serveAuth();
    storedKey(TEMP_KEY);
    const watcher = watchLoginField();

    const { router } = renderRoute("/auth");
    await findH1("Verificación en dos pasos");

    expect(router.state.location.pathname).toBe("/auth/2fa");
    expect(watcher.seen()).toBe(false);
    watcher.stop();
  });

  test("/gedure sin sesión: va a /auth sin pintar el panel", async () => {
    const backend = serveAuth();
    const { router } = renderRoute("/gedure");
    const seen = [];
    const observer = new MutationObserver(() => {
      if (document.body.textContent.includes("Hola,")) seen.push(true);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    await findH1("Entrar a Gedure");
    observer.disconnect();

    expect(router.state.location.pathname).toBe("/auth");
    expect(seen).toHaveLength(0);
    expect(reloginCalls(backend)).toHaveLength(0);
  });

  test("/ -> /gedure con apiKey: una sola llamada a relogin", async () => {
    const user = userEvent.setup();
    const backend = serveAuth();
    storedKey(FULL_KEY);
    const { router } = renderRoute("/?sitio=1");
    await findH1("Enfocados en el Estudio y la Fe");

    // Clic inmediato, con el relogin de la web pública posiblemente aún en vuelo.
    await user.click(screen.getAllByRole("link", { name: /Ir a Gedure/ })[0]);
    await findH1(/Hola, Administrador/);

    expect(router.state.location.pathname).toBe("/gedure");
    expect(reloginCalls(backend)).toHaveLength(1);
  });

  test("navegar entre /gedure y /auth con sesión no repite el relogin", async () => {
    const backend = serveAuth();
    storedKey(FULL_KEY);
    const { router } = renderRoute("/gedure");
    await findH1(/Hola, Administrador/);

    await act(() => router.navigate("/auth"));
    await findH1(/Hola, Administrador/);
    await act(() => router.navigate("/?sitio=1"));
    await findH1("Enfocados en el Estudio y la Fe");

    expect(router.state.location.pathname).toBe("/");
    expect(reloginCalls(backend)).toHaveLength(1);
  });

  test("sin conexión al comprobar la sesión en /auth: pantalla de reintentar, sesión intacta", async () => {
    serveAuth({ "POST /auth/relogin": { status: 503, body: {} } });
    storedKey(FULL_KEY);
    renderRoute("/auth");
    expect(await screen.findByRole("button", { name: "Reintentar" }, TIMEOUT)).toBeInTheDocument();
    expect(store.getState().auth.apiKey).toBe(FULL_KEY);
  });
});

/** Texto propio de la portada: vigila que nunca llegue al DOM. */
function watchHome() {
  let seen = false;
  const check = () => {
    if (document.body.textContent.includes(HOME_ONLY)) seen = true;
  };
  const observer = new MutationObserver(check);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  return { seen: () => (check(), seen), stop: () => observer.disconnect() };
}

describe("portada: redirección al panel con sesión", () => {
  afterEach(resetAuth);

  test("/ sin apiKey: portada normal, sin relogin", async () => {
    const backend = serveAuth();
    const { router } = renderRoute("/");
    await findH1(HERO);
    expect(router.state.location.pathname).toBe("/");
    expect(reloginCalls(backend)).toHaveLength(0);
  });

  test("/ con apiKey completa: va al panel, la portada nunca llega al DOM y el relogin es uno solo", async () => {
    const backend = serveAuth();
    storedKey(FULL_KEY);
    const watcher = watchHome();
    const { router } = renderRoute("/");
    await findH1(/Hola, Administrador/);

    expect(router.state.location.pathname).toBe("/gedure");
    expect(router.state.location.search).toBe("");
    expect(watcher.seen()).toBe(false);
    watcher.stop();
    expect(reloginCalls(backend)).toHaveLength(1);
  });

  test("/ con apiKey caducada (401): vuelve a / en silencio, sesión limpia y portada visible", async () => {
    const backend = serveAuth({ "POST /auth/relogin": { status: 401, body: { message: "Unauthenticated." } } });
    storedKey(FULL_KEY);
    const { router } = renderRoute("/");
    await findH1(HERO);

    expect(router.state.location.pathname).toBe("/");
    expect(router.state.location.search).toBe("");
    expect(store.getState().auth).toMatchObject({ auth: false, apiKey: null });
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBeNull();
    expect(screen.queryByText("Tu sesión expiró")).not.toBeInTheDocument();
    expect((await screen.findAllByRole("link", { name: "Iniciar sesión" }))[0]).toHaveAttribute("href", "/auth");
    expect(reloginCalls(backend)).toHaveLength(1);
    // Sigue sin aviso un momento después.
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(screen.queryByText("Tu sesión expiró")).not.toBeInTheDocument();
  });

  test("/gedure directo con 401: sigue yendo a /auth con aviso", async () => {
    serveAuth({ "POST /auth/relogin": { status: 401, body: { message: "Unauthenticated." } } });
    storedKey(FULL_KEY);
    const { router } = renderRoute("/gedure");
    await findH1("Entrar a Gedure");
    expect(router.state.location.pathname).toBe("/auth");
    expect(await screen.findByText("Tu sesión expiró")).toBeInTheDocument();
  });

  test("la marca de origen no sobrevive: tras volver a / por un 401, /gedure directo avisa", async () => {
    serveAuth({ "POST /auth/relogin": { status: 401, body: { message: "Unauthenticated." } } });
    storedKey(FULL_KEY);
    const { router } = renderRoute("/");
    await findH1(HERO);
    storedKey(FULL_KEY);
    await act(() => router.navigate("/gedure"));
    await findH1("Entrar a Gedure");
    expect(await screen.findByText("Tu sesión expiró")).toBeInTheDocument();
  });

  test("/ con token temporal: va a /auth/2fa", async () => {
    serveAuth();
    storedKey(TEMP_KEY);
    const watcher = watchHome();
    const { router } = renderRoute("/");
    await findH1("Verificación en dos pasos");
    expect(router.state.location.pathname).toBe("/auth/2fa");
    expect(watcher.seen()).toBe(false);
    watcher.stop();
  });

  test("/ sin conexión: pantalla de reintentar y sesión intacta", async () => {
    serveAuth({ "POST /auth/relogin": { status: 503, body: {} } });
    storedKey(FULL_KEY);
    renderRoute("/");
    expect(await screen.findByRole("button", { name: "Reintentar" }, TIMEOUT)).toBeInTheDocument();
    expect(store.getState().auth.apiKey).toBe(FULL_KEY);
  });

  test("«Ver sitio web» del panel: portada visible sin rebote y URL limpia", async () => {
    const user = userEvent.setup();
    const backend = serveAuth();
    storedKey(FULL_KEY);
    const { router } = renderRoute("/gedure");
    await findH1(/Hola, Administrador/);

    // «Ver sitio web» está en el menú de cuenta del panel.
    await user.click(screen.getByRole("button", { name: "Cuenta de Administrador" }));
    await user.click(await screen.findByRole("menuitem", { name: "Ver sitio web" }));
    await findH1(HERO);
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(router.state.location.pathname).toBe("/");
    expect(router.state.location.search).toBe("");
    expect(screen.getAllByRole("link", { name: /Ir a Gedure/ })[0]).toHaveAttribute("href", "/gedure");
    expect(reloginCalls(backend)).toHaveLength(1);
  });

  test("con la preferencia de la pestaña, Inicio no rebota al panel; al volver al panel se borra", async () => {
    const user = userEvent.setup();
    serveAuth();
    storedKey(FULL_KEY);
    const { router } = renderRoute("/gedure");
    await findH1(/Hola, Administrador/);
    // «Ver sitio web» está en el menú de cuenta del panel.
    await user.click(screen.getByRole("button", { name: "Cuenta de Administrador" }));
    await user.click(await screen.findByRole("menuitem", { name: "Ver sitio web" }));
    await findH1(HERO);

    await user.click(screen.getAllByRole("link", { name: "Nosotros" })[0]);
    await screen.findByRole("heading", { level: 2, name: "Nuestra historia" }, TIMEOUT);
    await user.click(screen.getAllByRole("link", { name: "Inicio" })[0]);
    await findH1(HERO);
    expect(router.state.location.pathname).toBe("/");

    // Volver al panel borra la preferencia: la portada vuelve a redirigir.
    await user.click(screen.getAllByRole("link", { name: /Ir a Gedure/ })[0]);
    await findH1(/Hola, Administrador/);
    await act(() => router.navigate("/"));
    await findH1(/Hola, Administrador/);
    expect(router.state.location.pathname).toBe("/gedure");
  });

  test("otras páginas públicas con sesión siguen visibles y no activan la preferencia: Inicio sí redirige", async () => {
    const user = userEvent.setup();
    serveAuth();
    storedKey(FULL_KEY);
    const { router } = renderRoute("/nosotros");
    await screen.findByRole("heading", { level: 2, name: "Nuestra historia" }, TIMEOUT);
    expect(router.state.location.pathname).toBe("/nosotros");

    await act(() => router.navigate("/ruta-inexistente"));
    expect(router.state.location.pathname).toBe("/ruta-inexistente");
    expect(window.sessionStorage.getItem("gd.web.publica")).toBeNull();

    await user.click(screen.getAllByRole("link", { name: "Inicio" })[0]);
    await findH1(/Hola, Administrador/);
    expect(router.state.location.pathname).toBe("/gedure");
  });

  // Regresión: la preferencia vivía en sessionStorage, así que tras visitar /nosotros
  // (o «Ver sitio web») cada recarga de / en esa pestaña se quedaba en la portada.
  describe("recarga de / (carga inicial con el storage del login)", () => {
    const boot = (remember) => {
      window.sessionStorage.setItem("gd.auth.apiKey", JSON.stringify(FULL_KEY));
      if (remember) window.localStorage.setItem("gd.auth.apiKey", JSON.stringify(FULL_KEY));
      act(() => store.dispatch(updateUserData({ apiKey: FULL_KEY })));
    };

    for (const remember of [false, true]) {
      test(`con sesión (remember=${remember}) redirige al panel sin pintar la portada`, async () => {
        serveAuth();
        boot(remember);
        const watcher = watchHome();
        const { router } = renderRoute("/");
        await findH1(/Hola, Administrador/);
        expect(router.state.location.pathname).toBe("/gedure");
        expect(watcher.seen()).toBe(false);
        watcher.stop();
      });
    }

    test("tras entrar directo a /nosotros, recargar / redirige", async () => {
      serveAuth();
      boot(false);
      const first = renderRoute("/nosotros");
      await screen.findByRole("heading", { level: 2, name: "Nuestra historia" }, TIMEOUT);
      first.unmount();
      const { router } = renderRoute("/");
      await findH1(/Hola, Administrador/);
      expect(router.state.location.pathname).toBe("/gedure");
    });

    test("tras «Ver sitio web», recargar (módulo nuevo, sin preferencia) redirige", async () => {
      serveAuth();
      boot(false);
      const first = renderRoute("/?sitio=1");
      await findH1(HERO);
      first.unmount();
      resetSitePreference(); // la recarga reinicia la memoria
      const { router } = renderRoute("/");
      await findH1(/Hola, Administrador/);
      expect(router.state.location.pathname).toBe("/gedure");
    });
  });
});

describe("con sesión, Noticias y Contacto van a su versión del panel", () => {
  afterEach(resetAuth);
  // Sonner guarda los avisos en un estado global: que no se cuele el de otro test.
  beforeEach(() => toast.dismiss());

  /** true si el texto aparece en algún momento del DOM (un MutationObserver lo vigila). */
  function watchText(text) {
    let seen = false;
    const check = () => {
      if (document.body.textContent.includes(text)) seen = true;
    };
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return { seen: () => (check(), seen), stop: () => observer.disconnect() };
  }

  test.each([
    ["/contactanos", "/gedure/ayuda", "Ayuda", "¿Tienes dudas sobre inscripciones"],
    ["/noticias", "/gedure/noticias", "Noticias del colegio", "Avisos, actividades y celebraciones"],
  ])("%s con apiKey completa -> %s sin pintar la página pública y con un solo relogin", async (from, to, h1, publicText) => {
    const backend = serveAuth();
    storedKey(FULL_KEY);
    const watcher = watchText(publicText);
    const { router } = renderRoute(from);

    await findH1(h1);
    expect(router.state.location.pathname).toBe(to);
    expect(watcher.seen()).toBe(false);
    watcher.stop();
    expect(screen.queryByRole("form", { name: "Formulario de contacto" })).not.toBeInTheDocument();
    expect(reloginCalls(backend)).toHaveLength(1);
  });

  test("/contactanos con sesión llega a la sección de soporte de Ayuda (#soporte)", async () => {
    serveAuth();
    storedKey(FULL_KEY);
    const { router } = renderRoute("/contactanos");
    await findH1("Ayuda");
    expect(router.state.location.hash).toBe("#soporte");
  });

  test("/noticias/:slug con sesión abre el detalle dentro del panel (enlaces compartidos)", async () => {
    const backend = serveAuth();
    storedKey(FULL_KEY);
    const { router } = renderRoute(`/noticias/${NEWS[0].slug}`);
    await findH1(NEWS[0].title);
    expect(router.state.location.pathname).toBe(`/gedure/noticias/${NEWS[0].slug}`);
    expect(screen.getByRole("navigation", { name: "Migas de pan" })).toHaveTextContent("Noticias del colegio");
    expect(reloginCalls(backend)).toHaveLength(1);
  });

  test.each(["/contactanos", "/noticias"])("%s sin sesión sigue siendo la página pública, sin relogin", async (path) => {
    const backend = serveAuth();
    const { router } = renderRoute(path);
    await findH1(path === "/noticias" ? "Noticias" : "Contacto");
    expect(router.state.location.pathname).toBe(path);
    expect(reloginCalls(backend)).toHaveLength(0);
  });

  test("/noticias/:slug sin sesión muestra la noticia pública", async () => {
    serveAuth();
    const { router } = renderRoute(`/noticias/${NEWS[0].slug}`);
    await findH1(NEWS[0].title);
    expect(router.state.location.pathname).toBe(`/noticias/${NEWS[0].slug}`);
  });

  test("con token caducado (401) se queda en la página pública en silencio", async () => {
    serveAuth({ "POST /auth/relogin": { status: 401, body: { message: "Unauthenticated." } } });
    storedKey(FULL_KEY);
    const { router } = renderRoute("/contactanos");
    await findH1("Contacto");
    expect(router.state.location.pathname).toBe("/contactanos");
    expect(store.getState().auth.apiKey).toBeNull();
    expect(screen.queryByText(/Tu sesión expiró/)).not.toBeInTheDocument();
  });

  test("con token temporal se queda en la página pública", async () => {
    serveAuth();
    storedKey(TEMP_KEY);
    const { router } = renderRoute("/noticias");
    await findH1("Noticias");
    expect(router.state.location.pathname).toBe("/noticias");
  });

  test("con la sesión confirmada, Noticias y Contacto de la barra apuntan al panel", async () => {
    serveAuth();
    storedKey(FULL_KEY);
    renderRoute("/nosotros");
    await screen.findByRole("heading", { level: 2, name: "Nuestra historia" }, TIMEOUT);
    const nav = screen.getByRole("navigation", { name: "Principal" });
    await waitFor(() => expect(within(nav).getByRole("link", { name: "Noticias" })).toHaveAttribute("href", "/gedure/noticias"));
    expect(within(nav).getByRole("link", { name: "Contacto" })).toHaveAttribute("href", "/gedure/ayuda");
  });

  test("sin sesión, la barra enlaza a las páginas públicas", async () => {
    serveAuth();
    renderRoute("/nosotros");
    await screen.findByRole("heading", { level: 2, name: "Nuestra historia" }, TIMEOUT);
    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(within(nav).getByRole("link", { name: "Noticias" })).toHaveAttribute("href", "/noticias");
    expect(within(nav).getByRole("link", { name: "Contacto" })).toHaveAttribute("href", "/contactanos");
  });
});
