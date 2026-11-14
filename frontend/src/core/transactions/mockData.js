/**
 * MAQUETA. Transacciones del sistema de pagos (TransactionController de la
 * anterior: recargas, pagos de deudas, reembolsos y ajustes de monedero).
 */
export const TRANSACTIONS = [
  { id: "GD-2318", date: "14/11/2026 09:42", user: "Andreína Castillo", type: "Recarga", concept: "Pago móvil Banesco ref. 004512", amountBs: 18747, status: "Pendiente" },
  { id: "GD-2317", date: "14/11/2026 08:15", user: "Pedro Suárez", type: "Recarga", concept: "Transferencia Mercantil ref. 551870", amountBs: 18747, status: "Aprobado" },
  { id: "GD-2316", date: "14/11/2026 08:16", user: "Pedro Suárez", type: "Pago", concept: "Mensualidad noviembre 2026", amountBs: -18747, status: "Pagado" },
  { id: "GD-2315", date: "13/11/2026 17:03", user: "Andreína Castillo", type: "Pago", concept: "Mensualidad noviembre 2026 (Sofía)", amountBs: -18747, status: "Pagado" },
  { id: "GD-2314", date: "13/11/2026 11:20", user: "Ana Lugo", type: "Recarga", concept: "Pago móvil Venezuela ref. 117002", amountBs: 5000, status: "Rechazado" },
  { id: "GD-2313", date: "12/11/2026 15:47", user: "Carmen Elena Salazar", type: "Ajuste", concept: "Corrección de saldo (Luisa Fuentes)", amountBs: 1200, status: "Aprobado" },
  { id: "GD-2312", date: "12/11/2026 10:02", user: "Ramón Herrera", type: "Reembolso", concept: "Pago duplicado de octubre", amountBs: -15622.5, status: "Aprobado" },
  { id: "GD-2311", date: "11/11/2026 09:30", user: "Yelitza Morales", type: "Pago", concept: "Material de laboratorio", amountBs: -3124.5, status: "Pagado" },
  { id: "GD-2310", date: "11/11/2026 08:55", user: "José Gregorio Díaz", type: "Recarga", concept: "Pago móvil Provincial ref. 770981", amountBs: 15622.5, status: "Aprobado" },
  { id: "GD-2309", date: "10/11/2026 16:12", user: "Mariela Paredes", type: "Pago", concept: "Mensualidad noviembre 2026", amountBs: -18747, status: "Pagado" },
];
