/**
 * MAQUETA. Datos de ejemplo del Inicio (dashboard) de cada vista de rol. Al
 * conectar la API, un endpoint de resumen (como el InfoBoxController de la
 * Gedure anterior) devolverá estos datos.
 */

/** Admin: solo lo que pide atención hoy (tres indicadores). */
export const ADMIN_KPIS = {
  pendingPayments: 7,
  paymentsTodayBs: 512418.5,
  pendingDebtUsd: 4860,
  pendingDebtHint: "63 representantes con saldo",
  unreadMessages: 4,
  unreadMessagesHint: "2 de hoy",
};

export const RECENT_ACTIVITY = [
  { id: 1, who: "Andreína Castillo", what: "reportó un pago móvil de Bs 18.747,00", when: "Hace 12 min" },
  { id: 2, who: "Luis Alberto Méndez", what: "subió 8 boletas de 2.º año A", when: "Hace 40 min" },
  { id: 3, who: "Carmen Elena Salazar", what: "publicó el comunicado «Mensualidad de diciembre»", when: "Hace 2 h" },
  { id: 4, who: "Gabriela Mora", what: "envió un mensaje de contacto", when: "Ayer" },
];

export const TEACHER_PENDING = [
  { course: "1.er año A", uploaded: 34, total: 34 },
  { course: "1.er año B", uploaded: 12, total: 32 },
  { course: "2.º año A", uploaded: 27, total: 33 },
];

/** Fecha de cierre de la carga de boletas del lapso. */
export const REPORT_CARDS_DEADLINE = "18/11";

export const GUARDIAN_ACCOUNT = {
  debtUsd: 120,
  nextDue: "05/12/2026",
};

/** Boletas del lapso publicadas que el representante aún no ha abierto. */
export const GUARDIAN_NEW_REPORT_CARDS = 1;
