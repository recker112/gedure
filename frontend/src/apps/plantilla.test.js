import { afterEach, describe, expect, test, vi } from "vitest";

/**
 * La plantilla (modules/_plantilla) no está registrada; aquí se registra solo
 * para comprobar que sigue siendo válida (registro y moduleRoute) y que lo
 * que explica es cierto.
 */
vi.mock("./registry", async (importOriginal) => {
  const { createRegistry } = await importOriginal();
  const { default: plantilla } = await import("../modules/_plantilla/config");
  return { modules: createRegistry([plantilla]) };
});

import { AuthProtect } from "../components/routers/Routers";

describe("plantilla de módulo", () => {
  afterEach(() => vi.restoreAllMocks());

  test("su config es válida y su ruta lleva el guard del módulo, el de cada entrada y el del grupo", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { default: route, publicRoutes } = await import("../modules/_plantilla/routes");

    expect(route.path).toBe("plantilla");
    expect(route.element.type).toBe(AuthProtect);
    expect(route.element.props).toEqual({ permission: ["plantilla.elemento.show", "plantilla.ajuste.show"] });

    const [index, elementos, detalle, ajustesGuard] = route.children;
    expect(index.element.props).toEqual({ permission: "plantilla.elemento.show" });
    expect(index.children[0].index).toBe(true);
    expect(elementos.element.props).toEqual({ permission: "plantilla.elemento.show" });
    expect(elementos.children[0].path).toBe("elementos");
    expect(detalle.path).toBe("elementos/:id");
    expect(detalle.element).toBeUndefined();

    expect(ajustesGuard.element.props).toEqual({ permission: "plantilla.ajuste.show" });
    const [ajustes] = ajustesGuard.children;
    const [general, avanzado] = ajustes.children;
    expect(general.index).toBe(true);
    expect(avanzado.element.props).toEqual({ allPermissions: ["plantilla.ajuste.show", "plantilla.ajuste.update"] });

    expect(publicRoutes).toEqual([]);
    expect(warn).not.toHaveBeenCalled();
  });
});
