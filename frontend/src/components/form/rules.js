/**
 * Reglas de validación de react-hook-form compartidas entre formularios.
 */
export const REQUIRED = "Campo requerido";

/**
 * Usuario, cédula o correo: el backend decide por la `@` si es correo. Aquí
 * solo se exige y se limita el largo; el formato lo valida el servidor.
 */
export const loginRules = {
  required: REQUIRED,
  validate: (value) => String(value ?? "").trim() !== "" || REQUIRED,
  maxLength: { value: 255, message: "Demasiado largo" },
};

/** Login: solo obligatoria. Una contraseña antigua más corta no debe quedar bloqueada en el cliente. */
export const passwordRules = {
  required: REQUIRED,
};

/** Crear o cambiar contraseña: mínimo 8, como el backend. */
export const newPasswordRules = {
  required: REQUIRED,
  minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
  maxLength: { value: 255, message: "Demasiado larga" },
};

/** Código de seguridad / 2FA: 6 caracteres. */
export const otpRules = {
  required: "El código es obligatorio",
  minLength: { value: 6, message: "El código tiene 6 caracteres" },
};

/** Señal del backend de que el código se agotó (5 fallos): hay que pedir otro. */
export const isOtpExhausted = (message) => typeof message === "string" && /superado el número de intentos/i.test(message);
