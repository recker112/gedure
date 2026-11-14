import { afterEach, describe, expect, test, vi } from "vitest";

/** El estado inicial se lee del storage al importar: módulo nuevo por test. */
const load = async () => {
  vi.resetModules();
  return import("./configReducer");
};

describe("configReducer: theme", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.unstubAllGlobals();
  });

  test('sin preferencia guardada ni matchMedia es "light"', async () => {
    const { default: reducer } = await load();
    expect(reducer(undefined, { type: "@@init" }).theme).toBe("light");
  });

  test("sin preferencia guardada sigue al sistema", async () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    const { default: reducer } = await load();
    expect(reducer(undefined, { type: "@@init" }).theme).toBe("dark");
  });

  test("lee la preferencia guardada al importarse", async () => {
    window.localStorage.setItem("gd.userConfig.theme", '"dark"');
    const { default: reducer } = await load();
    expect(reducer(undefined, { type: "@@init" }).theme).toBe("dark");
  });

  test("toggleTheme alterna y persiste", async () => {
    const { default: reducer, toggleTheme } = await load();
    const dark = reducer({ theme: "light" }, toggleTheme());
    expect(dark.theme).toBe("dark");
    expect(window.localStorage.getItem("gd.userConfig.theme")).toBe('"dark"');
    expect(reducer(dark, toggleTheme()).theme).toBe("light");
  });

  test("updateUserConfig con notSave no toca el storage", async () => {
    const { default: reducer, updateUserConfig } = await load();
    const state = reducer({ theme: "light" }, updateUserConfig({ key: "theme", value: "dark", notSave: true }));
    expect(state.theme).toBe("dark");
    expect(window.localStorage.getItem("gd.userConfig.theme")).toBeNull();
  });
});
