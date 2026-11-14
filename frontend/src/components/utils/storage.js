/**
 * Acceso a localStorage y sessionStorage con prefijo y JSON, sin lanzar nunca:
 * en modo privado o con el almacenamiento bloqueado se usa el valor por
 * defecto (o la escritura se ignora).
 *
 * La sesión (`auth.apiKey`) se guarda con `writeStorage`: siempre en
 * sessionStorage (vive lo que la pestaña) y, con "Mantener sesión iniciada",
 * también en localStorage (sobrevive al cierre del navegador). `readStorage`
 * prefiere la de la pestaña.
 */
export const STORAGE_PREFIX = "gd.";

function read(storage, key, fallback) {
  try {
    const raw = storage().getItem(STORAGE_PREFIX + key);
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

function write(storage, key, value) {
  try {
    storage().setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento: el valor dura lo que la pestaña (o nada).
  }
}

function remove(storage, key) {
  try {
    storage().removeItem(STORAGE_PREFIX + key);
  } catch {
    // Nada que limpiar.
  }
}

const local = () => window.localStorage;
const session = () => window.sessionStorage;

export const readLocal = (key, fallback) => read(local, key, fallback);
export const readSession = (key, fallback) => read(session, key, fallback);
export const writeLocal = (key, value) => write(local, key, value);
export const writeSession = (key, value) => write(session, key, value);
export const removeLocal = (key) => remove(local, key);
export const removeSession = (key) => remove(session, key);

/** Primero la pestaña (sessionStorage); si no hay, localStorage. */
export function readStorage(key, fallback) {
  const value = readSession(key, null);
  return value === null ? readLocal(key, fallback) : value;
}

/**
 * sessionStorage siempre; localStorage solo con `remember`. Sin `remember`
 * se borra la copia persistente que pudiera quedar de una sesión anterior,
 * para que otra pestaña no recupere un token viejo.
 */
export function writeStorage(key, value, remember) {
  writeSession(key, value);
  if (remember) {
    writeLocal(key, value);
  } else {
    removeLocal(key);
  }
}

export function removeStorage(key) {
  removeSession(key);
  removeLocal(key);
}
