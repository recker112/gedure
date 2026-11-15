import { describe, expect, test } from "vitest";
import { moduleKeyOf, moduleUrl } from "./moduleUrl";

describe("moduleUrl", () => {
  test("el módulo y su entrada index viven en /gedure/<key>", () => {
    expect(moduleUrl("academico")).toBe("/gedure/academico");
    expect(moduleUrl("academico", { index: true })).toBe("/gedure/academico");
  });

  test("una entrada con path cuelga del módulo", () => {
    expect(moduleUrl("academico", { path: "secciones" })).toBe("/gedure/academico/secciones");
  });

  test("las entradas de un grupo cuelgan del path de sus grupos", () => {
    const planes = { path: "planes", children: [] };
    expect(moduleUrl("academico", planes)).toBe("/gedure/academico/planes");
    expect(moduleUrl("academico", { index: true }, [planes])).toBe("/gedure/academico/planes");
    expect(moduleUrl("academico", { path: "materias" }, [planes])).toBe("/gedure/academico/planes/materias");
  });
});

describe("moduleKeyOf", () => {
  test("saca la clave del módulo de una URL del panel", () => {
    expect(moduleKeyOf("/gedure/academico")).toBe("academico");
    expect(moduleKeyOf("/gedure/academico/secciones/3")).toBe("academico");
    expect(moduleKeyOf("/gedure")).toBeNull();
    expect(moduleKeyOf("/noticias")).toBeNull();
    expect(moduleKeyOf(undefined)).toBeNull();
  });
});
