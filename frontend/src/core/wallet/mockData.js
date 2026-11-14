/**
 * MAQUETA. Monedero del representante (WalletController + PendingPayment de
 * la Gedure anterior: recargas por pago móvil/transferencia que verifica la
 * administración, y pagos de deudas con el saldo).
 */
export const WALLET = { balanceBs: 2350.75, pendingBs: 18747 };

export const WALLET_MOVEMENTS = [
  { id: 1, date: "14/11/2026", concept: "Recarga · Pago móvil Banesco", reference: "004512", amountBs: 18747, status: "Por verificar" },
  { id: 2, date: "13/11/2026", concept: "Recarga · Pago móvil Venezuela", reference: "771203", amountBs: 18747, status: "Verificado" },
  { id: 3, date: "13/11/2026", concept: "Pago · Mensualidad noviembre (Sofía)", reference: "GD-2311", amountBs: -18747, status: "Pagado" },
  { id: 4, date: "06/11/2026", concept: "Recarga · Transferencia Mercantil", reference: "889120", amountBs: 18000, status: "Verificado" },
  { id: 5, date: "06/11/2026", concept: "Pago · Mensualidad noviembre (Diego)", reference: "GD-2298", amountBs: -15622.5, status: "Pagado" },
  { id: 6, date: "28/10/2026", concept: "Recarga · Pago móvil Banesco", reference: "003911", amountBs: 5000, status: "Rechazado" },
];

/** Cuentas del colegio para recargar (bank_account_* en la anterior). */
export const SCHOOL_ACCOUNTS = [
  { id: 1, bank: "Banesco", type: "Pago móvil", holder: "A.P.E.P. La Candelaria", detail: "0412-000-0000 · J-00000000-0" },
  { id: 2, bank: "Banco de Venezuela", type: "Transferencia", holder: "A.P.E.P. La Candelaria", detail: "0102-0000-00-0000000000" },
];
