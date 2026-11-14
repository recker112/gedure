import { afterEach, describe, expect, test } from "vitest";

import store from "./store";
import { toggleTheme } from "./store/reducers/user/configReducer";

describe("store", () => {
  afterEach(() => window.localStorage.clear());

  test("monta el slice userConfig", () => {
    expect(store.getState()).toHaveProperty("userConfig.theme");
  });

  test("toggleTheme cambia el tema del store", () => {
    const before = store.getState().userConfig.theme;
    store.dispatch(toggleTheme());
    expect(store.getState().userConfig.theme).not.toBe(before);
    store.dispatch(toggleTheme());
    expect(store.getState().userConfig.theme).toBe(before);
  });
});
