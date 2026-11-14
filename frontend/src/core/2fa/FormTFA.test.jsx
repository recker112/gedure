import { afterEach, describe, expect, test } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import store from "../../store";
import { renderRoute } from "../../test/renderRoute";
import { FULL_KEY, TEMP_KEY, resetAuth, serveAuth, signIn } from "../../test/authBackend";

const TIMEOUT = { timeout: 8000 };
const EXHAUSTED = "Has superado el número de intentos. Solicita un código nuevo";

/** Sesión temporal (tras el login) y la pantalla del 2FA abierta. */
const open2FA = async ({ remember = false } = {}) => {
  signIn({ apiKey: TEMP_KEY, token_can: remember ? ["2fa_required", "remember_me"] : ["2fa_required"], remember });
  const utils = renderRoute("/auth/2fa");
  await screen.findByRole("heading", { level: 1, name: "Verificación en dos pasos" }, TIMEOUT);
  return utils;
};

const typeCode = async (user, code) => {
  await user.click(screen.getByLabelText("Código de verificación: carácter 1 de 6"));
  await user.keyboard(code);
};

describe("2FA (/auth/2fa)", () => {
  afterEach(resetAuth);

  test("normaliza a mayúsculas, guarda el token definitivo y entra al panel", async () => {
    const backend = serveAuth();
    const user = userEvent.setup();
    const { router } = await open2FA();

    await typeCode(user, "abc234");

    // Se envía solo al completar las 6 casillas (onComplete)
    expect(await screen.findByRole("heading", { level: 1, name: /Hola, Administrador/ }, TIMEOUT)).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/gedure");

    const call = backend.calls.find((c) => c.path === "/auth/2fa");
    expect(call.body).toEqual({ otp: "ABC234" });
    expect(call.headers.get("authorization")).toBe(`Bearer ${TEMP_KEY}`);
    expect(store.getState().auth).toMatchObject({ apiKey: FULL_KEY, token_can: [] });
    expect(window.sessionStorage.getItem("gd.auth.apiKey")).toBe(JSON.stringify(FULL_KEY));
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBeNull();
  });

  test("con remember_me el token definitivo va también a localStorage", async () => {
    serveAuth({ "POST /auth/2fa": { body: { status: 200, user: { id: 1, name: "A" }, token_can: ["remember_me"], apiKey: FULL_KEY } } });
    const user = userEvent.setup();
    await open2FA({ remember: true });

    await typeCode(user, "ABC234");

    await screen.findByRole("heading", { level: 1, name: /Hola/ }, TIMEOUT);
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBe(JSON.stringify(FULL_KEY));
  });

  test("las casillas aceptan el autocompletado de códigos de un solo uso", async () => {
    serveAuth();
    await open2FA();
    expect(screen.getByLabelText("Código de verificación: carácter 1 de 6")).toHaveAttribute("autocomplete", "one-time-code");
  });

  test("422: muestra el error del código y sigue en el 2FA", async () => {
    const msg = "Código de autenticación inválido o expirado";
    serveAuth({ "POST /auth/2fa": { status: 422, body: { status: 422, msg, errors: { otp: [msg] } } } });
    const user = userEvent.setup();
    const { router } = await open2FA();

    await typeCode(user, "ZZZZZZ");

    expect(await screen.findAllByText(msg)).not.toHaveLength(0);
    expect(router.state.location.pathname).toBe("/auth/2fa");
    expect(store.getState().auth.apiKey).toBe(TEMP_KEY);
  });

  test("código agotado: ofrece pedir uno nuevo o volver al login", async () => {
    const backend = serveAuth({
      "POST /auth/2fa": { status: 422, body: { status: 422, msg: EXHAUSTED, errors: { otp: [EXHAUSTED] } } },
    });
    const user = userEvent.setup();
    await open2FA();

    await typeCode(user, "ZZZZZZ");

    expect(await screen.findByText("Código bloqueado")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Verificar" })).toBeDisabled();
    expect(screen.getByRole("link", { name: "vuelve al inicio de sesión" })).toHaveAttribute("href", "/auth/logout");

    await user.click(screen.getByRole("button", { name: "Pedir código nuevo" }));
    await waitFor(() => expect(backend.calls.some((c) => c.path === "/auth/2fa/resend")).toBe(true));
    expect(await screen.findByText("Código de seguridad reenviado")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("Código bloqueado")).not.toBeInTheDocument());
  });

  test("401 (token temporal caducado): cierra la sesión local y vuelve al login", async () => {
    serveAuth({ "POST /auth/2fa": { status: 401, body: { message: "Unauthenticated." } } });
    const user = userEvent.setup();
    const { router } = await open2FA();

    await typeCode(user, "ABC234");

    expect(await screen.findByText("Tu sesión expiró")).toBeInTheDocument();
    await screen.findByRole("heading", { level: 1, name: "Entrar a Gedure" }, TIMEOUT);
    expect(router.state.location.pathname).toBe("/auth");
    expect(store.getState().auth).toMatchObject({ auth: false, apiKey: null });
    expect(window.sessionStorage.getItem("gd.auth.apiKey")).toBeNull();
  });

  test("«cierra la sesión» borra el token temporal y vuelve al login", async () => {
    const backend = serveAuth();
    const user = userEvent.setup();
    const { router } = await open2FA();

    await user.click(screen.getByRole("link", { name: "cierra la sesión" }));

    await screen.findByRole("heading", { level: 1, name: "Entrar a Gedure" }, TIMEOUT);
    expect(router.state.location.pathname).toBe("/auth");
    const call = backend.calls.find((c) => c.path === "/auth/logout");
    expect(call.headers.get("authorization")).toBe(`Bearer ${TEMP_KEY}`);
    expect(store.getState().auth.apiKey).toBeNull();
  });
});
