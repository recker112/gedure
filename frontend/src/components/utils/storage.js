/**
 * Acceso a localStorage con prefijo y JSON, sin lanzar nunca: en modo
 * privado o con el almacenamiento bloqueado se usa el valor por defecto.
 */
export const STORAGE_PREFIX = "gd.";

export function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;

    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch {
    return fallback;
  }
}

export function writeLocal(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento: la preferencia dura lo que la pestaña.
  }
}

export function removeLocal(key) {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    // Nada que limpiar.
  }
}
