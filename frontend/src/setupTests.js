import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom no implementa scrollTo (lo usa <ScrollRestoration /> al navegar).
window.scrollTo = vi.fn();

// Con `globals: true` RTL ya limpia solo, pero se deja explícito.
afterEach(() => cleanup());
