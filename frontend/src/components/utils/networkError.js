/**
 * ¿Falló la descarga de un chunk de Vite? Pasa cuando se despliega una
 * versión nueva y el navegador aún pide los archivos con el hash anterior.
 * Cada navegador lo dice con su propio mensaje.
 */
const CHUNK_PATTERNS = [
  /Failed to fetch dynamically imported module/i, // Chrome
  /error loading dynamically imported module/i, // Firefox
  /Importing a module script failed/i, // Safari
];

export function isChunkLoadError(error) {
  const message = typeof error?.message === "string" ? error.message : "";
  return CHUNK_PATTERNS.some((pattern) => pattern.test(message));
}

/**
 * Errores de RTK Query que significan "no se pudo hablar con el servidor" y
 * no "tu sesión no vale": red caída (`FETCH_ERROR`), tiempo agotado
 * (`TIMEOUT_ERROR`) y el proxy (Caddy, el de Vite en dev) sin backend detrás
 * (502/503/504). Con un cuerpo que no es JSON (la página HTML del proxy)
 * fetchBaseQuery devuelve `PARSING_ERROR` con el código en `originalStatus`.
 */
const SERVER_UNAVAILABLE_STATUSES = [502, 503, 504];

export function isConnectionError(error) {
  if (!error || typeof error !== "object") return false;

  const { status, originalStatus } = error;

  return (
    status === "FETCH_ERROR" ||
    status === "TIMEOUT_ERROR" ||
    SERVER_UNAVAILABLE_STATUSES.includes(status) ||
    SERVER_UNAVAILABLE_STATUSES.includes(originalStatus)
  );
}

/**
 * Lo lanza `ensureSession` (router/sessionLoaders.js) cuando no pudo comprobar la sesión guardada por falta
 * de conexión: la sesión no es inválida, así que no se cierra. El
 * `errorElement` de la raíz muestra "sin conexión" con "Reintentar".
 */
export class OfflineError extends Error {
  constructor(cause) {
    super("No se pudo conectar con el servidor", { cause });
    this.name = "OfflineError";
  }
}

export const isOfflineError = (error) => error instanceof OfflineError;
