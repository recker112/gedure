import { afterEach, describe, expect, test } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import store from "../../store";
import { renderRoute } from "../../test/renderRoute";
import { TEMP_KEY, resetAuth, serveAuth } from "../../test/authBackend";

const TIMEOUT = { timeout: 8000 };

const openLogin = async (path = "/auth") => {
  const utils = renderRoute(path);
  await screen.findByRole("heading", { level: 1, name: "Entrar a Gedure" }, TIMEOUT);
  return utils;
};

const fill = async (user, { login = " 12345678 ", password = "password" } = {}) => {
  if (login) await user.type(screen.getByLabelText("Usuario, cédula o correo"), login);
  if (password) await user.type(screen.getByLabelText("Contraseña"), password);
};

describe("FormLogin (/auth)", () => {
  afterEach(resetAuth);

  test("campos con autocompletado del navegador y sin el layout público", async () => {
    await openLogin();
    expect(screen.getByLabelText("Usuario, cédula o correo")).toHaveAttribute("autocomplete", "username");
    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("autocomplete", "current-password");
    expect(screen.getByRole("checkbox", { name: "Mantener sesión iniciada" })).not.toBeChecked();
    expect(screen.queryByRole("navigation", { name: "Principal" })).not.toBeInTheDocument();
  });

  test("valida en el cliente sin llamar a la API", async () => {
    const user = userEvent.setup();
    await openLogin();

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findAllByText("Campo requerido")).toHaveLength(2);
    expect(screen.getByLabelText("Usuario, cédula o correo")).toHaveAttribute("aria-invalid", "true");
  });

  test("envía login recortado y lleva al 2FA con el token temporal solo en la pestaña", async () => {
    const backend = serveAuth();
    const user = userEvent.setup();
    const { router } = await openLogin();

    await fill(user);
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await screen.findByRole("heading", { level: 1, name: "Verificación en dos pasos" }, TIMEOUT);
    expect(router.state.location.pathname).toBe("/auth/2fa");
    expect(backend.calls[0]).toMatchObject({
      method: "POST",
      path: "/auth/login",
      body: { login: "12345678", password: "password", remember: false },
    });
    expect(backend.calls[0].headers.get("accept")).toBe("application/json");
    expect(store.getState().auth).toMatchObject({ auth: true, apiKey: TEMP_KEY, token_can: ["2fa_required"] });
    expect(window.sessionStorage.getItem("gd.auth.apiKey")).toBe(JSON.stringify(TEMP_KEY));
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBeNull();
    expect(screen.getByText(/admin@lacandelaria.test/)).toBeInTheDocument();
  });

  test("con «Mantener sesión iniciada» envía remember y guarda también en localStorage", async () => {
    const backend = serveAuth();
    const user = userEvent.setup();
    await openLogin();

    await fill(user, { login: "admin@lacandelaria.test" });
    await user.click(screen.getByRole("checkbox", { name: "Mantener sesión iniciada" }));
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await screen.findByRole("heading", { level: 1, name: "Verificación en dos pasos" }, TIMEOUT);
    expect(backend.calls[0].body).toEqual({ login: "admin@lacandelaria.test", password: "password", remember: true });
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBe(JSON.stringify(TEMP_KEY));
  });

  test("400: avisa de credenciales incorrectas y sigue en el login", async () => {
    serveAuth({ "POST /auth/login": { status: 400, body: { status: 400, msg: "Usuario o contraseña incorrectos" } } });
    const user = userEvent.setup();
    const { router } = await openLogin();

    await fill(user);
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("Usuario o contraseña incorrectos")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/auth");
    expect(store.getState().auth.auth).toBe(false);
  });

  test("422: cada error de validación va a su campo", async () => {
    serveAuth({
      "POST /auth/login": {
        status: 422,
        body: {
          message: "El campo login es obligatorio.",
          errors: { login: ["El usuario no es válido."], password: ["La contraseña es obligatoria."] },
        },
      },
    });
    const user = userEvent.setup();
    await openLogin();

    await fill(user);
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("El usuario no es válido.")).toBeInTheDocument();
    expect(screen.getByText("La contraseña es obligatoria.")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText("Contraseña")).toHaveAttribute("aria-invalid", "true"));
  });
});
