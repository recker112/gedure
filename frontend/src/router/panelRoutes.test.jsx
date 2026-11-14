import { afterEach, describe, expect, test, vi } from "vitest";
import { act, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderRoute } from "../test/renderRoute";
import { resetAuth, serveAuth, signIn } from "../test/authBackend";
import { writeSession } from "../components/utils/storage";
import { ROLE_STORAGE_KEY } from "../context/mockRole/roles";
import { PANEL_ITEMS, itemTitle } from "../components/menu/panel/panelNav";
import { panelRoutes } from "./panelRoutes";

/**
 * Maqueta del panel (/gedure): menú por vista de rol y carga de cada sección
 * (rutas lazy reales). El menú es un cajón temporal en todos los tamaños: se
 * abre con «Abrir menú».
 */
const TIMEOUT = { timeout: 8000 };

function enterAs(role, path = "/gedure") {
  serveAuth();
  signIn();
  act(() => writeSession(ROLE_STORAGE_KEY, role));
  return renderRoute(path);
}

async function openNav(user) {
  await user.click(await screen.findByRole("button", { name: "Abrir menú" }, TIMEOUT));
  return screen.findByRole("navigation", { name: "Gedure" });
}

const linkNames = (nav) => within(nav).getAllByRole("link").map((a) => a.textContent);

describe("panel (maqueta)", () => {
  afterEach(resetAuth);

  test("las rutas del router y el menú declaran las mismas secciones", () => {
    // Los detalles (`noticias/:slug`) cuelgan de su sección: no son entradas del menú.
    const routePaths = panelRoutes.map((r) => (r.index ? "" : r.path)).filter((p) => p !== "*" && !p.includes(":"));
    expect(routePaths.sort()).toEqual(PANEL_ITEMS.map((i) => i.path).sort());
  });

  test.each([
    ["admin", ["Inicio", "Comunicados", "Usuarios", "Pagos por verificar", "Configuración", "Cursos y secciones"], ["Estado de cuenta", "Mis cursos"]],
    ["profesor", ["Inicio", "Comunicados", "Mis cursos", "Subir boletas"], ["Usuarios", "Estado de cuenta", "Monedero"]],
    ["representante", ["Inicio", "Comunicados", "Estado de cuenta", "Monedero", "Boletas"], ["Usuarios", "Subir boletas", "Mis cursos"]],
  ])("la barra lateral muestra el menú de la vista %s", async (role, present, absent) => {
    const user = userEvent.setup();
    enterAs(role);
    await screen.findByRole("heading", { level: 1, name: /Hola, Administrador/ }, TIMEOUT);

    const names = linkNames(await openNav(user));
    for (const name of present) expect(names.some((n) => n.startsWith(name))).toBe(true);
    for (const name of absent) expect(names.some((n) => n.startsWith(name))).toBe(false);
  });

  test("el selector de vista (al final del menú) cambia el menú y el inicio", async () => {
    const user = userEvent.setup();
    enterAs("admin");
    expect(await screen.findByText("Mensajes sin leer", {}, TIMEOUT)).toBeInTheDocument();

    const nav = await openNav(user);
    expect(screen.getByText("Vista de rol · Maqueta")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Representante" }));

    // El cajón sigue abierto y deja el resto aria-hidden: por texto.
    expect(await screen.findByText("Pagar o reportar pago")).toBeInTheDocument();
    expect(screen.queryByText("Mensajes sin leer")).not.toBeInTheDocument();
    expect(linkNames(nav).some((n) => n.startsWith("Usuarios"))).toBe(false);
  });

  test("el menú es temporal: cerrado al entrar, se abre con el botón y se cierra al navegar", async () => {
    const user = userEvent.setup();
    const { router } = enterAs("representante");
    await screen.findByRole("heading", { level: 1, name: /Hola, Administrador/ }, TIMEOUT);
    expect(screen.queryByRole("navigation", { name: "Gedure" })).not.toBeInTheDocument();

    const nav = await openNav(user);
    expect(screen.getByRole("button", { name: "Abrir menú", hidden: true })).toHaveAttribute("aria-expanded", "true");
    await user.click(within(nav).getByRole("link", { name: /Estado de cuenta/ }));

    await screen.findByRole("heading", { level: 1, name: "Estado de cuenta" }, TIMEOUT);
    expect(router.state.location.pathname).toBe("/gedure/estado-de-cuenta");
    await waitFor(() => expect(screen.queryByRole("navigation", { name: "Gedure" })).not.toBeInTheDocument());
  });

  test("el menú del representante es corto y sin bloques", async () => {
    const user = userEvent.setup();
    enterAs("representante");
    const nav = await openNav(user);
    expect(linkNames(nav)).toEqual(["Inicio", "Comunicados2", "Boletas", "Estado de cuenta", "Monedero", "Noticias del colegio", "Ayuda"]);
  });

  test("una sección de otra vista avisa en lugar de pintarse", async () => {
    enterAs("representante", "/gedure/usuarios");
    expect(await screen.findByText("Esta sección no está disponible para tu perfil", {}, TIMEOUT)).toBeInTheDocument();
  });

  test("una URL desconocida del panel muestra el 404 con la barra", async () => {
    enterAs("admin", "/gedure/no-existe");
    expect(await screen.findByRole("heading", { level: 1, name: "Página no encontrada" }, TIMEOUT)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir menú" })).toBeInTheDocument();
  });

  const sections = PANEL_ITEMS.filter((item) => item.path).map((item) => [item.to, item.roles[0], item]);

  test.each(sections)("%s carga con la vista %s", async (path, role, item) => {
    enterAs(role, path);
    expect(await screen.findByRole("heading", { level: 1, name: itemTitle(item, role) }, TIMEOUT)).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Migas de pan" })).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  test.each([
    ["/gedure/cursos", "Mis cursos"],
    ["/gedure/boletas", "Subir boletas"],
  ])("%s cambia de título para el profesor", async (path, title) => {
    enterAs("profesor", path);
    expect(await screen.findByRole("heading", { level: 1, name: title }, TIMEOUT)).toBeInTheDocument();
  });

  test.each([
    ["admin", "Mensajes sin leer"],
    ["profesor", "Boletas por curso"],
    ["representante", "Pagar o reportar pago"],
  ])("el Inicio de la vista %s se pinta sin errores ni avisos en consola", async (role, text) => {
    const error = vi.spyOn(console, "error");
    const warn = vi.spyOn(console, "warn");
    try {
      enterAs(role);
      await screen.findByRole("heading", { level: 1, name: /Hola, Administrador/ }, TIMEOUT);
      expect(screen.getByText(text)).toBeInTheDocument();
      expect(document.body.textContent).not.toMatch(/NaN|undefined/);
      expect(error).not.toHaveBeenCalled();
      expect(warn).not.toHaveBeenCalled();
    } finally {
      error.mockRestore();
      warn.mockRestore();
    }
  });

  test("Inicio del representante: tres accesos, máx. 3 comunicados y 2 noticias, sin KPIs ni gráficos", async () => {
    enterAs("representante");
    await screen.findByRole("heading", { level: 1, name: /Hola, Administrador/ }, TIMEOUT);
    const h2 = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(h2).toEqual(["Comunicados", "Estado de cuenta", "Boletas", "Comunicados sin leer", "Noticias del colegio"]);
    const news = screen.getByRole("region", { name: "Noticias del colegio" });
    expect(within(news).getAllByRole("link").filter((a) => a.getAttribute("href").startsWith("/gedure/noticias/"))).toHaveLength(2);
    expect(screen.getByRole("link", { name: /Pagar o reportar pago/ })).toHaveAttribute("href", "/gedure/monedero");
  });

  test("Ayuda: formulario de soporte sin datos personales, con «Se enviará como»", async () => {
    const user = userEvent.setup();
    enterAs("representante", "/gedure/ayuda");
    const form = await screen.findByRole("form", { name: "Formulario de soporte" }, TIMEOUT);

    expect(within(form).getByText(/Se enviará como:/)).toHaveTextContent("Administrador · admin@lacandelaria.test");
    for (const label of [/Nombre/, /Correo/, /Teléfono/]) expect(within(form).queryByLabelText(label)).not.toBeInTheDocument();
    expect(within(form).getByLabelText(/Asunto/)).not.toBeRequired();

    // Sin motivo ni mensaje: errores y nada «enviado».
    await user.click(within(form).getByRole("button", { name: "Enviar" }));
    expect(await within(form).findAllByText("Campo requerido")).toHaveLength(2);
    expect(within(form).queryByRole("status")).not.toBeInTheDocument();

    await user.click(within(form).getByRole("combobox", { name: /Motivo/ }));
    await user.click(await screen.findByRole("option", { name: "Boletas" }));
    const message = within(form).getByLabelText(/Mensaje/);
    expect(message).toHaveAttribute("maxlength", "350");
    await user.type(message, "No veo la boleta de Sofía.");
    expect(within(form).getByText("26/350 caracteres")).toBeInTheDocument();
    await user.click(within(form).getByRole("button", { name: "Enviar" }));
    expect(await within(form).findByRole("status")).toHaveTextContent(/próximamente/);
  });

  test("/gedure/noticias/:slug inexistente avisa dentro del panel", async () => {
    enterAs("representante", "/gedure/noticias/no-existe");
    expect(await screen.findByText("No encontramos esta noticia", {}, TIMEOUT)).toBeInTheDocument();
  });
});
