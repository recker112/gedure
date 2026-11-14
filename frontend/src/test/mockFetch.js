import { vi } from "vitest";
import { reportUnmocked } from "./fetchGuard";

/**
 * Sustituye `fetch` (el que usa fetchBaseQuery) por un router de pruebas:
 * `handler({ method, path, search, headers, body })` devuelve `{ status, body }`
 * (o lanza para simular un fallo de red). Las llamadas quedan en `calls`.
 * `body` de la petición: el JSON ya leído, el `FormData` enviado o
 * `undefined` si no lleva cuerpo.
 */
/**
 * jsdom y Node (undici) tienen cada uno su `FormData` y su `File`, y `Request`
 * no admite los de jsdom como cuerpo. La `Request` de las pruebas se queda con
 * el `FormData` tal cual (en `form`) y no lo serializa.
 */
function formAwareRequest() {
  const RealRequest = globalThis.Request;
  return class extends RealRequest {
    constructor(input, init) {
      const form = init?.body instanceof FormData ? init.body : undefined;
      super(input, form ? { ...init, body: undefined } : init);
      this.form = form;
    }
  };
}

async function readBody(request) {
  if (request.form) return request.form;
  const type = request.headers.get("content-type") ?? "";
  return type.includes("application/json") ? request.clone().json() : undefined;
}

export function mockFetch(handler) {
  const calls = [];

  const fn = vi.fn(async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    const url = new URL(request.url);
    const call = {
      method: request.method,
      path: url.pathname.replace(/^\/api\/v1/, ""),
      search: url.searchParams,
      headers: request.headers,
      body: await readBody(request),
    };
    calls.push(call);

    const { status = 200, body = {} } = (await handler(call)) ?? {};
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  });

  vi.stubGlobal("Request", formAwareRequest());
  vi.stubGlobal("fetch", fn);
  return { fn, calls };
}

/** ¿`key` (`"GET /users/{id}"`) casa con la petición? `{algo}` es un segmento cualquiera. */
const matches = (key, request) =>
  key === request || (key.includes("{") && new RegExp(`^${key.replace(/[.*+?^$()|[\]\\]/g, "\\$&").replace(/\{[^}]+\}/g, "[^/]+")}$`).test(request));

/**
 * `mockFetch` con una tabla de rutas: `"MÉTODO /ruta"` (sin `/api/v1`; un
 * segmento `{id}` casa con cualquiera) → `{ status?, body }` o una función
 * `(call) => { status?, body }`. Gana la ruta exacta; si no, la primera que
 * casa. Sin ninguna, 404 `{status, msg}` y el test falla por la guardia de red. `routes` se puede cambiar durante
 * el test (p. ej. lo que devuelve la lista tras guardar).
 */
export function mockRoutes(table) {
  const routes = { ...table };
  const { fn, calls } = mockFetch((call) => {
    const request = `${call.method} ${call.path}`;
    const key = request in routes ? request : Object.keys(routes).find((k) => matches(k, request));
    const route = key === undefined ? undefined : routes[key];
    if (typeof route === "function") return route(call);
    if (route !== undefined) return route;
    // Ruta no declarada: cuenta para la guardia de red (test/fetchGuard.js).
    reportUnmocked(`${request} (sin ruta en mockRoutes)`);
    return { status: 404, body: { status: 404, msg: "Ruta no encontrada" } };
  });
  return { fn, calls, routes };
}
