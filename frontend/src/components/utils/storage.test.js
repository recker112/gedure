import { afterEach, describe, expect, test } from "vitest";

import { readLocal, readStorage, removeLocal, removeStorage, writeLocal, writeStorage } from "./storage";

describe("storage", () => {
  afterEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

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

  test("writeStorage sin remember: solo sessionStorage (y borra la copia persistente)", () => {
    writeLocal("auth.apiKey", "viejo");
    writeStorage("auth.apiKey", "1|nuevo", false);
    expect(window.sessionStorage.getItem("gd.auth.apiKey")).toBe('"1|nuevo"');
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBeNull();
  });

  test("writeStorage con remember: sessionStorage y localStorage", () => {
    writeStorage("auth.apiKey", "1|abc", true);
    expect(window.sessionStorage.getItem("gd.auth.apiKey")).toBe('"1|abc"');
    expect(window.localStorage.getItem("gd.auth.apiKey")).toBe('"1|abc"');
  });

  test("readStorage prefiere la pestaña y cae a localStorage", () => {
    writeLocal("k", "local");
    expect(readStorage("k", null)).toBe("local");
    window.sessionStorage.setItem("gd.k", '"pestaña"');
    expect(readStorage("k", null)).toBe("pestaña");
    expect(readStorage("otra", "def")).toBe("def");
  });

  test("removeStorage borra de los dos", () => {
    writeStorage("k", 1, true);
    removeStorage("k");
    expect(window.sessionStorage.getItem("gd.k")).toBeNull();
    expect(window.localStorage.getItem("gd.k")).toBeNull();
  });
});
