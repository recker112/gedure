import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../components/notify/notify", () => ({
  notify: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));
vi.mock("../../components/notify/notifyHttpStatus", () => ({
  notifyHttpStatus: vi.fn(),
}));

import { handleQueryError, handleScreenQueryError } from "./ReduxDefault";
import { notify } from "../../components/notify/notify";
import { notifyHttpStatus } from "../../components/notify/notifyHttpStatus";

const fail = (status, data) => ({ error: { status, data } });

describe("handleQueryError", () => {
  beforeEach(() => vi.clearAllMocks());

  it("usa msg del backend y, si no hay, message de Laravel", () => {
    handleQueryError(fail(403, { msg: "Propio", message: "Laravel" }), vi.fn());
    handleQueryError(fail(429, { message: "Too Many Attempts." }), vi.fn());

    expect(notifyHttpStatus).toHaveBeenNthCalledWith(1, { status: 403, text: "Propio", errors: undefined }, expect.any(Function));
    expect(notifyHttpStatus).toHaveBeenNthCalledWith(2, { status: 429, text: "Too Many Attempts.", errors: undefined }, expect.any(Function));
  });

  it("ignora message en 500, 404 y 405", () => {
    [500, 404, 405].forEach((s) => handleQueryError(fail(s, { message: "Server Error" })));
    notifyHttpStatus.mock.calls.forEach(([arg]) => expect(arg.text).toBeUndefined());
  });

  it("con setError marca los campos (login, password) y no repite los mensajes", () => {
    const setError = vi.fn();
    handleQueryError(
      fail(422, { message: "x", errors: { login: ["El usuario es obligatorio."], password: ["Mal"] } }),
      vi.fn(),
      setError,
    );

    expect(setError).toHaveBeenCalledWith("login", { type: "fetchRequest", message: "El usuario es obligatorio." });
    expect(setError).toHaveBeenCalledWith("password", { type: "fetchRequest", message: "Mal" });
    expect(notifyHttpStatus.mock.calls[0][0]).toEqual({ status: 422, text: undefined });
  });

  it("con setError conserva el msg propio como aviso general", () => {
    handleQueryError(fail(422, { msg: "Código inválido", errors: { otp: ["Código inválido"] } }), vi.fn(), vi.fn());
    expect(notifyHttpStatus.mock.calls[0][0]).toEqual({ status: 422, text: "Código inválido" });
  });

  it("sin setError pasa errors al aviso", () => {
    const errors = { login: ["Inválido"] };
    handleQueryError(fail(422, { message: "The given data was invalid.", errors }));
    expect(notifyHttpStatus).toHaveBeenCalledWith({ status: 422, text: "The given data was invalid.", errors }, undefined);
  });

  it("el 401 va a notifyHttpStatus con dispatch (cierra la sesión)", () => {
    const dispatch = vi.fn();
    handleQueryError(fail(401, { message: "Unauthenticated." }), dispatch);
    expect(notifyHttpStatus.mock.calls[0][0].status).toBe(401);
    expect(notifyHttpStatus.mock.calls[0][1]).toBe(dispatch);
  });

  it("avisa de falta de conexión", () => {
    handleQueryError({ error: { status: "FETCH_ERROR" } }, vi.fn());
    expect(notifyHttpStatus).toHaveBeenCalledWith({ status: "offline" }, expect.any(Function));
  });

  it("un error sin .error se registra aparte", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    handleQueryError(new Error("boom"), vi.fn());
    expect(notify.error).toHaveBeenCalledWith("Ocurrió un error inesperado");
    spy.mockRestore();
  });
});

describe("handleScreenQueryError", () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([["FETCH_ERROR"], ["TIMEOUT_ERROR"], [503]])("no notifica en %s", (status) => {
    handleScreenQueryError(fail(status), vi.fn());
    expect(notifyHttpStatus).not.toHaveBeenCalled();
  });

  it("en 401 pasa el dispatch para que se cierre la sesión", () => {
    const dispatch = vi.fn();
    handleScreenQueryError(fail(401), dispatch);
    expect(notifyHttpStatus).toHaveBeenCalledWith(expect.objectContaining({ status: 401 }), dispatch);
  });
});
