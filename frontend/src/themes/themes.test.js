import { describe, expect, test } from "vitest";

import themes from ".";

const HEX = /^#[0-9A-Fa-f]{6}$/;
const MODES = ["light", "dark"];

// Solo comprobaciones estructurales: cada tema decide su paleta.
describe("temas", () => {
  test("existe el tema por defecto", () => {
    expect(themes.default.label).toBe("La Candelaria");
  });

  test.each(Object.entries(themes))("%s define fondos, texto y primary/secondary completos en ambos modos", (_, theme) => {
    for (const mode of MODES) {
      const { background, primary, secondary, text } = theme[mode];
      expect(background.default).toMatch(HEX);
      expect(background.paper).toMatch(HEX);
      expect(background.appbar).toMatch(HEX);
      expect(text.primary).toMatch(HEX);
      expect(text.secondary).toMatch(HEX);
      for (const color of [primary, secondary]) {
        for (const key of ["main", "dark", "light", "contrastText"]) {
          expect(color[key]).toMatch(HEX);
        }
      }
    }
  });
});
