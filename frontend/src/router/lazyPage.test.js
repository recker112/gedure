import { describe, expect, test } from "vitest";

import lazyPage from "./lazyPage";

describe("lazyPage", () => {
  test("devuelve el export por defecto como Component", async () => {
    const Page = () => null;
    const lazy = lazyPage(() => Promise.resolve({ default: Page }));
    await expect(lazy()).resolves.toEqual({ Component: Page });
  });

  test("propaga el error del import", async () => {
    const lazy = lazyPage(() => Promise.reject(new Error("chunk")));
    await expect(lazy()).rejects.toThrow("chunk");
  });
});
