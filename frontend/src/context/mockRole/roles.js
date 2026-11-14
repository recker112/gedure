/**
 * MAQUETA. Perfiles de la vista de rol: en la app real el menú saldrá de los
 * privilegios (V-/P-/A-) y permisos Spatie que mande el backend, no de aquí.
 */
export const ROLES = {
  admin: { key: "admin", label: "Administrador", short: "Admin", privilege: "A-" },
  profesor: { key: "profesor", label: "Profesor", short: "Profesor", privilege: "P-" },
  representante: { key: "representante", label: "Representante", short: "Representante", privilege: "V-" },
};

export const ROLE_KEYS = Object.keys(ROLES);
export const DEFAULT_ROLE = "admin";

/** Clave de sessionStorage (con el prefijo `gd.` de components/utils/storage). */
export const ROLE_STORAGE_KEY = "maqueta.rol";

export const isRole = (value) => ROLE_KEYS.includes(value);
