import { afterEach, describe, expect, test } from "vitest";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import store from "../../store";
import { renderRoute } from "../../test/renderRoute";
import { FULL_KEY, resetAuth, serveAuth } from "../../test/authBackend";
import { writeStorage } from "../../components/utils/storage";
import { updateUserData } from "../../store/reducers/auth/authReducer";

const TIMEOUT = { timeout: 8000 };
const NEUTRAL = "Si los datos corresponden a una cuenta, recibirás un código de seguridad en su correo";

const toResetStep = async (user) => {
  const utils = renderRoute("/auth/forgot-password");
  await screen.findByRole("heading", { level: 1, name: "Recuperar contraseña" }, TIMEOUT);
  await user.type(screen.getByLabelText("Usuario, cédula o correo"), "12345678");
  await user.click(screen.getByRole("button", { name: "Enviar código" }));
  await screen.findByRole("heading", { level: 1, name: "Restablecer contraseña" }, TIMEOUT);
  return utils;
};

const fillReset = async (user, { code = "abc234", password = "nueva-clave", confirm = password } = {}) => {
  await user.click(screen.getByLabelText("Código de seguridad: carácter 1 de 6"));
  await user.keyboard(code);
  await user.type(screen.getByLabelText("Contraseña nueva"), password);
  await user.type(screen.getByLabelText("Repite la contraseña nueva"), confirm);
};

describe("Recuperar contraseña (/auth/forgot-password)", () => {
  afterEach(resetAuth);

  test("el login enlaza aquí", async () => {
    renderRoute("/auth");
    const link = await screen.findByRole("link", { name: "¿Olvidaste tu contraseña?" }, TIMEOUT);
    expect(link).toHaveAttribute("href", "/auth/forgot-password");
  });

  test("paso 1: envía el login y muestra el mensaje neutro", async () => {
    const backend = serveAuth();
    const user = userEvent.setup();
    await toResetStep(user);

    expect(backend.calls[0]).toMatchObject({ path: "/auth/security/email/send", body: { login: "12345678" } });
    expect(screen.getByText(`${NEUTRAL}.`)).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña nueva")).toHaveAttribute("autocomplete", "new-password");
  });

  test("paso 2: valida que las contraseñas coincidan y el mínimo de 8", async () => {
    const backend = serveAuth();
    const user = userEvent.setup();
    await toResetStep(user);

    await fillReset(user, { password: "corta", confirm: "otra" });
    await user.click(screen.getByRole("button", { name: "Cambiar contraseña" }));

    expect(await screen.findByText("Debe tener al menos 8 caracteres")).toBeInTheDocument();
    expect(screen.getByText("Las contraseñas no coinciden")).toBeInTheDocument();
    expect(backend.calls.some((c) => c.path === "/auth/security/password/update")).toBe(false);
  });

  test("paso 2: un 422 del código se muestra en el campo", async () => {
    const msg = "Código de seguridad inválido o expirado";
    serveAuth({ "POST /auth/security/password/update": { status: 422, body: { status: 422, msg, errors: { otp: [msg] } } } });
    const user = userEvent.setup();
    await toResetStep(user);

    await fillReset(user);
    await user.click(screen.getByRole("button", { name: "Cambiar contraseña" }));

    await waitFor(() => expect(screen.getAllByText(msg).length).toBeGreaterThan(0));
    expect(screen.getByRole("heading", { level: 1, name: "Restablecer contraseña" })).toBeInTheDocument();
  });

  test("éxito: envía todo, limpia una sesión local y vuelve al login", async () => {
    const backend = serveAuth();
    const user = userEvent.setup();
    const { router } = await toResetStep(user);
    // Un token que quedó guardado en este navegador (el backend los revoca todos)
    act(() => {
      writeStorage("auth.apiKey", FULL_KEY, true);
      store.dispatch(updateUserData({ apiKey: FULL_KEY }));
    });

    await fillReset(user);
    await user.click(screen.getByRole("button", { name: "Cambiar contraseña" }));

    await screen.findByRole("heading", { level: 1, name: "Entrar a Gedure" }, TIMEOUT);
    expect(router.state.location.pathname).toBe("/auth");
    expect(screen.getByText("Contraseña actualizada correctamente")).toBeInTheDocument();
    expect(backend.calls.find((c) => c.path === "/auth/security/password/update").body).toEqual({
      login: "12345678",
      otp: "ABC234",
      new_password: "nueva-clave",
      new_password_confirmation: "nueva-clave",
    });
    expect(store.getState().auth.apiKey).toBeNull();
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBeNull();
  });

  test("«Volver al paso anterior» regresa al primer paso", async () => {
    serveAuth();
    const user = userEvent.setup();
    await toResetStep(user);

    await user.click(screen.getByRole("button", { name: "Volver al paso anterior" }));
    expect(await screen.findByRole("heading", { level: 1, name: "Recuperar contraseña" })).toBeInTheDocument();
  });
});
