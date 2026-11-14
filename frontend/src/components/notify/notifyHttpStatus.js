/**
 * Redux
 */
import { logoutApp } from "../../store/reducers/auth/authReducer";

/**
 * Components
 */
import { notify } from "./notify";

const MAX_VALIDATION_MESSAGES = 3;

/** Texto del aviso de sesión caducada (401). */
export const SESSION_EXPIRED_TEXT = "Tu sesión expiró";

/**
 * Traduce el resultado de una petición a un aviso. Se llama desde los
 * `onQueryStarted` de RTK Query o desde componentes.
 *
 * `text` es el `msg` del backend (`{ status, msg }`) o, en su defecto, el
 * `message` que genera Laravel (lo decide `handleQueryError`). Si viene, se
 * muestra tal cual; si no, el texto por defecto de cada status. El 401 es la
 * excepción: el backend lo reserva para sesión ausente/inválida/caducada, así
 * que siempre es "Tu sesión expiró" y además cierra la sesión local.
 *
 * `errors` (422 sin formulario): los mensajes se muestran juntos en un aviso.
 */
export function notifyHttpStatus({ status, text, errors, variant = "success" } = {}, dispatch) {
  const backendOr = (fallback) => (typeof text === "string" && text.trim() !== "" ? text : fallback);

  switch (status) {
    case 200:
    case 201:
      if (text) notify[variant]?.(text);
      break;
    case 400:
      notify.warning(backendOr("No se pudo procesar la solicitud"));
      break;
    case 401:
      notify.info(SESSION_EXPIRED_TEXT, { id: "session-expired" });
      dispatch?.(logoutApp());
      break;
    case 403:
      notify.error(backendOr("No tienes permisos para esta acción"));
      break;
    case 404:
      notify.warning(backendOr("Ruta URL no encontrada"));
      break;
    case 405:
      notify.error(backendOr("Método no soportado"));
      break;
    case 422: {
      const messages = [...new Set(errors ? Object.values(errors).flat() : [])].filter(
        (msg) => typeof msg === "string" && msg.trim() !== "",
      );
      if (messages.length > 0) {
        const shown = messages.slice(0, MAX_VALIDATION_MESSAGES).join(" ");
        const rest = messages.length - MAX_VALIDATION_MESSAGES;
        notify.error(rest > 0 ? `${shown} (y ${rest} más)` : shown);
      } else {
        notify.error(backendOr("Error al verificar los datos"));
      }
      break;
    }
    case 429:
      notify.warning(backendOr("Demasiados intentos. Espera un momento e inténtalo de nuevo"));
      break;
    case 500:
      notify.error(backendOr("Error interno en el servidor"));
      break;
    case "offline":
      notify.error("No se pudo conectar con el servidor. Revisa tu conexión a internet");
      break;
    default:
      notify.error(backendOr("Ocurrió un error inesperado"));
  }
}
