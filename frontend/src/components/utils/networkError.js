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
