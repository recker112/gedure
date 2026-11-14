import { describe, expect, test } from "vitest";

import { isChunkLoadError } from "./networkError";

describe("isChunkLoadError", () => {
  test.each([
    "Failed to fetch dynamically imported module: /assets/HomePage.abc.js",
    "error loading dynamically imported module",
    "Importing a module script failed.",
  ])("reconoce %s", (message) => {
    expect(isChunkLoadError(new TypeError(message))).toBe(true);
  });

  test("ignora otros errores y valores sin mensaje", () => {
    expect(isChunkLoadError(new Error("boom"))).toBe(false);
    expect(isChunkLoadError(null)).toBe(false);
    expect(isChunkLoadError({ status: 404 })).toBe(false);
  });
});
