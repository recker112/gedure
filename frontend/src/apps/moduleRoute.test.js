import { afterEach, describe, expect, test, vi } from "vitest";

vi.mock("./registry", () => ({
  modules: {
    libre: { key: "libre", title: "Libre", menu: [{ title: "Inicio", index: true }] },
    pronto: { key: "pronto", title: "Pronto", disabled: true },
    academico: {
      key: "academico",
      title: "Académico",
      permission: ["academico.periodo.show", "academico.seccion.show"],
      menu: [
        { title: "Años escolares", index: true, permission: "academico.periodo.show" },
        { title: "Secciones", path: "secciones", permission: "academico.seccion.show" },
        { title: "Ayuda", path: "ayuda" },
        {
          title: "Planes",
          path: "planes",
          allPermissions: ["academico.plan.show"],
          children: [
            { title: "Resumen", index: true },
            { title: "Materias", path: "materias", permission: "academico.materia.show" },
          ],
        },
      ],
    },
  },
}));

import moduleRoute from "./moduleRoute";
import { AuthProtect } from "../components/routers/Routers";

describe("moduleRoute", () => {
  afterEach(() => vi.restoreAllMocks());

  test("path = clave y guard con el permiso del módulo", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const route = moduleRoute("academico", [{ path: "ayuda" }]);

    expect(route.path).toBe("academico");
    expect(route.element.type).toBe(AuthProtect);
    expect(route.element.props).toEqual({ permission: ["academico.periodo.show", "academico.seccion.show"] });
    expect(route.children).toEqual([{ path: "ayuda" }]);
  });

  test("sin permisos en el módulo no pone guard (basta el de /gedure)", () => {
    const index = { index: true };
    const route = moduleRoute("libre", [index]);
    expect(route).not.toHaveProperty("element");
    expect(route.children).toEqual([index]);
  });

  test("envuelve cada hija con el guard de su entrada del menú (por index y por path)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const index = { index: true };
    const secciones = { path: "secciones" };
    const ayuda = { path: "ayuda" };
    const detalle = { path: "secciones/:id" };
    const route = moduleRoute("academico", [
      index,
      secciones,
      detalle,
      ayuda,
      { path: "planes", children: [{ index: true }, { path: "materias" }] },
    ]);

    const [indexGuard, seccionesGuard, detalleRoute, ayudaRoute, planesGuard] = route.children;
    expect(indexGuard.path).toBeUndefined();
    expect(indexGuard.element.props).toEqual({ permission: "academico.periodo.show" });
    expect(indexGuard.children).toEqual([index]);
    expect(seccionesGuard.element.props).toEqual({ permission: "academico.seccion.show" });
    expect(seccionesGuard.children).toEqual([secciones]);
    // Sin entrada en el menú: solo el guard del módulo.
    expect(detalleRoute).toBe(detalle);
    // Entrada sin permiso propio: sin envolver.
    expect(ayudaRoute).toBe(ayuda);

    // Grupo: guard del grupo y, dentro, el de cada hija con permiso.
    expect(planesGuard.element.props).toEqual({ allPermissions: ["academico.plan.show"] });
    const [planes] = planesGuard.children;
    expect(planes.path).toBe("planes");
    const [resumen, materiasGuard] = planes.children;
    expect(resumen).toEqual({ index: true });
    expect(materiasGuard.element.props).toEqual({ permission: "academico.materia.show" });
    expect(materiasGuard.children).toEqual([{ path: "materias" }]);
    expect(warn).not.toHaveBeenCalled();
  });

  test("en desarrollo avisa si una entrada con permiso no tiene ruta hija", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    moduleRoute("academico", [{ index: true }, { path: "seciones" }, { path: "planes/materias" }]);

    const names = warn.mock.calls.map(([msg]) => msg.match(/"([^"]+)" de/)[1]);
    expect(names).toEqual(["Secciones", "Planes", "Planes › Materias"]);
  });

  test("falla si el módulo no está registrado o está deshabilitado", () => {
    expect(() => moduleRoute("no-existe", [])).toThrow(/no está registrado/);
    expect(() => moduleRoute("pronto", [])).toThrow(/deshabilitado/);
  });
});
