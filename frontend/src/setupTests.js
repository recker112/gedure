import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { assertNoUnmockedFetch, installFetchGuard } from "./test/fetchGuard";

// jsdom no implementa scrollTo (lo usa <ScrollRestoration /> al navegar).
window.scrollTo = vi.fn();

// Guardia: un `fetch` sin simular hace fallar el test (ver test/fetchGuard.js).
beforeEach(installFetchGuard);

// Con `globals: true` RTL ya limpia solo, pero se deja explícito.
afterEach(() => cleanup());
afterEach(assertNoUnmockedFetch);
