import { describe, expect, test } from "vitest";

import { RESERVED_KEYS, createRegistry, modules } from "./registry";
import { collectRoutes, moduleRoutes } from "./routes";

const Icon = () => null;

/** Todas las entradas de un menú, recorriendo los grupos. */
const allEntries = (entries = []) => entries.flatMap((entry) => [entry, ...allEntries(entry.children)]);

describe("registro de módulos (el real)", () => {
  test("la clave del mapa es la `key` de cada config", () => {
    for (const [key, config] of Object.entries(modules)) expect(config.key).toBe(key);
  });

  test("cada módulo habilitado tiene su ruta y cada ruta su módulo; los deshabilitados no tienen ruta", () => {
    const enabled = Object.keys(modules).filter((key) => !modules[key].disabled);
    const paths = moduleRoutes.map((route) => route.path);

    expect([...paths].sort()).toEqual([...enabled].sort());
  });

  test("la plantilla no está registrada", () => {
    expect(modules).not.toHaveProperty("plantilla");
  });

  test("las entradas del menú usan index o path relativo, nunca `to`", () => {
    for (const config of Object.values(modules)) {
      for (const entry of allEntries(config.menu)) {
        expect(entry).not.toHaveProperty("to");
        if (!entry.index) expect(entry.path).toMatch(/^[^/]/);
      }
    }
  });
});

describe("createRegistry (con fixtures)", () => {
  const academico = {
    key: "academico",
    title: "Académico",
    icon: Icon,
    menu: [
      { title: "Años escolares", icon: Icon, index: true, permission: "academico.periodo.show" },
      { title: "Planes", icon: Icon, path: "planes", children: [{ title: "Materias", path: "materias" }] },
    ],
  };
  const pagos = { key: "pagos", title: "Pagos", icon: Icon, disabled: true };

  test("indexa por clave y conserva el orden del menú", () => {
    const registry = createRegistry([pagos, academico]);
    expect(Object.keys(registry)).toEqual(["pagos", "academico"]);
    expect(registry.academico).toBe(academico);
  });

  test("una clave repetida lanza", () => {
    expect(() => createRegistry([academico, { ...academico }])).toThrow(/registrada dos veces/);
  });

  test("claves no válidas o reservadas por el panel lanzan", () => {
    expect(() => createRegistry([{ ...academico, key: "Academico" }])).toThrow(/no válida/);
    expect(() => createRegistry([{ ...academico, key: "academico/x" }])).toThrow(/no válida/);
    for (const key of RESERVED_KEYS) expect(() => createRegistry([{ ...academico, key }])).toThrow(/reservada/);
  });

  test("permisos vacíos lanzan (en el módulo o en una entrada)", () => {
    expect(() => createRegistry([{ ...academico, permission: [] }])).toThrow(/vacíos/);
    expect(() =>
      createRegistry([{ ...academico, menu: [{ title: "X", index: true, allPermissions: [] }] }]),
    ).toThrow(/vacíos/);
  });

  test("entradas mal formadas lanzan", () => {
    const withMenu = (menu) => () => createRegistry([{ ...academico, menu }]);
    expect(withMenu([{ title: "X", to: "/gedure/x", path: "x" }])).toThrow(/moduleUrl/);
    expect(withMenu([{ title: "X" }])).toThrow(/index: true o path/);
    expect(withMenu([{ title: "X", path: "/x" }])).toThrow(/relativo/);
    expect(withMenu([{ title: "G", index: true, children: [{ title: "A", index: true }] }])).toThrow(/grupo/);
    expect(withMenu([{ title: "G", path: "g", children: [] }])).toThrow(/al menos una hija/);
  });
});

describe("collectRoutes (con fixtures)", () => {
  test("la ruta del panel es el default y las públicas se juntan en orden", () => {
    const a = { default: { path: "a" }, publicRoutes: [{ path: "a-publica" }] };
    const b = { default: { path: "b" } };
    expect(collectRoutes([a, b])).toEqual({
      moduleRoutes: [{ path: "a" }, { path: "b" }],
      publicModuleRoutes: [{ path: "a-publica" }],
    });
  });
});
