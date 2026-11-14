import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { notify } from "../../components/notify/notify";
import { notifyHttpStatus } from "../../components/notify/notifyHttpStatus";
import { isConnectionError } from "../../components/utils/networkError";

/**
 * Ruta relativa: en producción la SPA y la API comparten origen (Laravel sirve
 * las dos) y en desarrollo el dev server de Vite reenvía `/api` al backend
 * (`server.proxy` en vite.config.js), así que no hace falta CORS.
 */
export const API_BASE_URL = "/api/v1";

/**
 * fetchBaseQuery resuelve la URL con `new Request()`, que en jsdom (tests) no
 * admite rutas relativas: allí se antepone el origen de la página. En el
 * navegador ambas formas son equivalentes.
 */
const resolveBaseUrl = () =>
  typeof window !== "undefined" && window.location?.origin && window.location.origin !== "null"
    ? `${window.location.origin}${API_BASE_URL}`
    : API_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: resolveBaseUrl(),
  headers: { accept: "application/json" },
  prepareHeaders: (headers, { getState }) => {
    const apiKey = getState().auth.apiKey;
    if (apiKey) {
      headers.set("Authorization", `Bearer ${apiKey}`);
    }
    return headers;
  },
});

/**
 * Texto del backend para el aviso. Las respuestas propias llevan `msg`; las que
 * genera Laravel solas (FormRequest, 429...) llevan `message`. `message` se
 * ignora en 404, 405 y 500: ahí es texto técnico en inglés y es mejor el texto
 * por defecto de `notifyHttpStatus`. En 401 `notifyHttpStatus` ya lo ignora.
 */
const MESSAGE_IGNORED = [404, 405, 500];

export const backendText = (status, data) => {
  if (!data || typeof data !== "object") return undefined;
  if (typeof data.msg === "string" && data.msg.trim() !== "") return data.msg;
  if (MESSAGE_IGNORED.includes(status)) return undefined;
  return data.message;
};

/**
 * Manejador de errores por defecto de las mutaciones (con `setError` de
 * react-hook-form si hay formulario).
 *
 * En un 422 con `errors` y `setError`, cada mensaje va a su campo y el aviso
 * general es solo el `msg` propio del backend (o el texto por defecto); sin
 * `setError`, los mensajes de `errors` van en el aviso. Los errores de un
 * elemento de una lista (`roles.0`) van al campo de la lista.
 */
export const handleQueryError = (err, dispatch, setError) => {
  const error = err?.error;

  if (!error) {
    console.error(err);
    notify.error("Ocurrió un error inesperado");
    return;
  }

  if (error.status === "FETCH_ERROR" || isConnectionError(error)) {
    notifyHttpStatus({ status: "offline" }, dispatch);
    return;
  }

  const data = error.data;
  const hasFieldErrors = error.status === 422 && data?.errors;

  if (hasFieldErrors && setError) {
    const fields = new Map();
    Object.entries(data.errors).forEach(([key, messages]) => {
      const field = key.replace(/\.\d+$/, "");
      if (!fields.has(field)) fields.set(field, messages[0]);
    });
    fields.forEach((message, field) => {
      setError(field, { type: "fetchRequest", message });
    });
    notifyHttpStatus({ status: 422, text: data.msg }, dispatch);
    return;
  }

  notifyHttpStatus(
    {
      status: error.status,
      text: backendText(error.status, data),
      errors: hasFieldErrors ? data.errors : undefined,
    },
    dispatch,
  );
};

/**
 * `handleQueryError` para lo que carga una pantalla (el relogin del
 * `ensureSession`): los errores de conexión no avisan con un toast, la pantalla
 * de error ya muestra "sin conexión" con "Reintentar".
 */
export const handleScreenQueryError = (err, dispatch) => {
  if (isConnectionError(err?.error)) return;
  handleQueryError(err, dispatch);
};
