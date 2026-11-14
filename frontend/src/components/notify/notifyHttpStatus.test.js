import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("./notify", () => ({
  notify: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() },
}));

import { notify } from "./notify";
import { SESSION_EXPIRED_TEXT, notifyHttpStatus } from "./notifyHttpStatus";
import { logoutApp } from "../../store/reducers/auth/authReducer";

describe("notifyHttpStatus", () => {
  beforeEach(() => vi.clearAllMocks());

  test("200 muestra el texto del backend como éxito (o la variante pedida)", () => {
    notifyHttpStatus({ status: 200, text: "Hecho" });
    notifyHttpStatus({ status: 200, text: "Sesión cerrada", variant: "info" });
    expect(notify.success).toHaveBeenCalledWith("Hecho");
    expect(notify.info).toHaveBeenCalledWith("Sesión cerrada");
  });

  test("401: aviso fijo y cierra la sesión", () => {
    const dispatch = vi.fn();
    notifyHttpStatus({ status: 401, text: "Unauthenticated." }, dispatch);
    expect(notify.info).toHaveBeenCalledWith(SESSION_EXPIRED_TEXT, expect.anything());
    expect(dispatch).toHaveBeenCalledWith(logoutApp());
  });

  test("400 y 429 usan el msg del backend o un texto por defecto", () => {
    notifyHttpStatus({ status: 400, text: "Usuario o contraseña incorrectos" });
    notifyHttpStatus({ status: 429 });
    expect(notify.warning).toHaveBeenNthCalledWith(1, "Usuario o contraseña incorrectos");
    expect(notify.warning.mock.calls[1][0]).toMatch(/Demasiados intentos/);
  });

  test("422 sin formulario junta los mensajes con tope", () => {
    notifyHttpStatus({ status: 422, errors: { a: ["uno"], b: ["dos", "uno"], c: ["tres"], d: ["cuatro"] } });
    expect(notify.error).toHaveBeenCalledWith("uno dos tres (y 1 más)");
  });

  test("offline", () => {
    notifyHttpStatus({ status: "offline" });
    expect(notify.error.mock.calls[0][0]).toMatch(/conexión/);
  });
});
