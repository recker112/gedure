import { describe, expect, test } from "vitest";

import { OfflineError, isChunkLoadError, isConnectionError, isOfflineError } from "./networkError";

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

describe("isConnectionError", () => {
  test.each([
    { status: "FETCH_ERROR" },
    { status: "TIMEOUT_ERROR" },
    { status: 502 },
    { status: 503 },
    { status: "PARSING_ERROR", originalStatus: 504 },
  ])("%j es de conexión", (error) => {
    expect(isConnectionError(error)).toBe(true);
  });

  test.each([{ status: 401 }, { status: 500 }, { status: 422 }, null, undefined])("%j no lo es", (error) => {
    expect(isConnectionError(error)).toBe(false);
  });
});

test("OfflineError conserva la causa", () => {
  const cause = { status: "FETCH_ERROR" };
  const error = new OfflineError(cause);
  expect(isOfflineError(error)).toBe(true);
  expect(error.cause).toBe(cause);
  expect(isOfflineError(new Error("x"))).toBe(false);
});
