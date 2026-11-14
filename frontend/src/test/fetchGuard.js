/**
 * Guardia de red de los tests: un test que hace un `fetch` que nadie ha
 * simulado falla. `installFetchGuard()` (setupTests) pone un `fetch` por
 * defecto antes de cada test que registra la llamada y la rechaza;
 * `assertNoUnmockedFetch()` (afterEach) lanza si quedó alguna. Una ruta que
 * `mockRoutes` no declara también cuenta (`reportUnmocked`).
 *
 * Vía de escape explícita y por test: `allowUnmockedFetch()`.
 */
let unmocked = [];
let allowed = false;
let realFetch;

const describeCall = (input, init) => {
  const request = typeof input === "object" && input !== null && "url" in input ? input : null;
  const method = (init?.method ?? request?.method ?? "GET").toUpperCase();
  return `${method} ${request ? request.url : String(input)}`;
};

/** Anota una petición que ningún mock atendió. */
export function reportUnmocked(description) {
  unmocked.push(description);
}

/** Permite peticiones sin simular en el test en curso (se reinicia solo). */
export function allowUnmockedFetch() {
  allowed = true;
}

/** Peticiones sin simular registradas hasta ahora (para probar la guardia). */
export const unmockedCalls = () => [...unmocked];

export function installFetchGuard() {
  realFetch = globalThis.fetch;
  unmocked = [];
  allowed = false;
  globalThis.fetch = (input, init) => {
    const description = describeCall(input, init);
    reportUnmocked(description);
    return Promise.reject(new TypeError(`fetch sin simular: ${description}`));
  };
}

/** Restaura el `fetch` real y falla si hubo peticiones sin simular. */
export function assertNoUnmockedFetch() {
  globalThis.fetch = realFetch;
  const calls = unmocked;
  const skip = allowed;
  unmocked = [];
  allowed = false;
  if (skip || calls.length === 0) return;
  throw new Error(
    `El test hizo ${calls.length} petición(es) de red sin simular:\n` +
      calls.map((c) => `  - ${c}`).join("\n") +
      "\nSimúlalas con mockRoutes (o el helper del dominio: test/authBackend.js) " +
      "o, si es a propósito, llama a allowUnmockedFetch().",
  );
}
