import { describe, expect, test } from "vitest";

import { resolveThemeKeys } from "./resolveThemeKeys";

describe("resolveThemeKeys", () => {
  test("respeta valores válidos", () => {
    expect(resolveThemeKeys("dark", "default")).toEqual({ mode: "dark", variant: "default" });
  });

  test("sanea modo y variante desconocidos", () => {
    expect(resolveThemeKeys("sepia", "neon")).toEqual({ mode: "light", variant: "default" });
    expect(resolveThemeKeys(undefined)).toEqual({ mode: "light", variant: "default" });
  });
});
