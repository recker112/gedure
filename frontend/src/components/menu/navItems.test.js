import { describe, expect, test } from "vitest";

import { loginItem, navItems } from "./navItems";

describe("navItems", () => {
  test("cada enlace tiene etiqueta, ruta absoluta e icono", () => {
    for (const item of navItems) {
      expect(item.label).toBeTruthy();
      expect(item.to).toMatch(/^\//);
      expect(item.Icon).toBeTruthy();
    }
  });

  test("rutas y etiquetas sin duplicados", () => {
    const paths = navItems.map((item) => item.to);
    expect(new Set(paths).size).toBe(paths.length);
    expect(loginItem.to).toBe("/login");
  });
});
