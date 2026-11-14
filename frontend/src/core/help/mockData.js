/**
 * MAQUETA. Preguntas frecuentes (gedure/faq de la anterior), por vista de rol.
 */
export const FAQ = [
  { id: 1, roles: ["representante"], q: "¿Cómo pago la mensualidad?", a: "Recarga tu monedero con pago móvil o transferencia, reporta la referencia y, cuando la administración lo verifique, paga la deuda con el saldo." },
  { id: 2, roles: ["representante"], q: "¿Cuándo puedo ver la boleta?", a: "Cuando el colegio cierre el lapso. Recibirás una notificación y la boleta aparecerá en «Boletas»." },
  { id: 3, roles: ["representante", "admin"], q: "¿A qué tasa se calculan los pagos en bolívares?", a: "A la tasa oficial del BCV del día en que se verifica el pago." },
  { id: 4, roles: ["profesor"], q: "¿Cómo nombro los PDF de las boletas?", a: "Con la cédula del estudiante, solo números (p. ej. 32418907.pdf). Gedure los asigna solos y reemplaza los anteriores." },
  { id: 5, roles: ["profesor", "admin"], q: "¿Quién ve los comunicados que publico?", a: "Solo la audiencia elegida: un rol, un curso o una sección. Puedes ver cuántos lo leyeron." },
  { id: 6, roles: ["admin"], q: "¿Cómo exonero a un representante?", a: "Desde «Monederos», con el botón «Ajustar», o marcando la deuda como exonerada en su estado de cuenta." },
  { id: 7, roles: ["admin", "profesor", "representante"], q: "Olvidé mi contraseña", a: "En la pantalla de inicio de sesión pulsa «¿Olvidaste tu contraseña?» y sigue el código que te llega al correo." },
  { id: 8, roles: ["admin", "profesor", "representante"], q: "¿Por qué me piden un código al entrar?", a: "Es la verificación en dos pasos: protege tu cuenta aunque alguien conozca tu contraseña." },
];

/** Motivos del formulario de soporte (Ayuda, con sesión). */
export const SUPPORT_REASONS = [
  { value: "pagos", label: "Pagos y estado de cuenta" },
  { value: "boletas", label: "Boletas" },
  { value: "cuenta", label: "Acceso o cuenta" },
  { value: "otro", label: "Otro" },
];
