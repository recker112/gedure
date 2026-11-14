import { afterEach, describe, expect, test } from "vitest";

import { readLocal, removeLocal, writeLocal } from "./storage";

describe("storage", () => {
  afterEach(() => window.localStorage.clear());

  test("escribe y lee JSON con prefijo", () => {
    writeLocal("demo", { a: 1 });
    expect(window.localStorage.getItem("gd.demo")).toBe('{"a":1}');
    expect(readLocal("demo", null)).toEqual({ a: 1 });
  });

  test("devuelve el valor por defecto si no existe y el crudo si no es JSON", () => {
    expect(readLocal("nada", "x")).toBe("x");
    window.localStorage.setItem("gd.crudo", "hola");
    expect(readLocal("crudo", null)).toBe("hola");
  });

  test("removeLocal borra la clave", () => {
    writeLocal("demo", 1);
    removeLocal("demo");
    expect(readLocal("demo", null)).toBeNull();
  });
});
