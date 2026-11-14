/**
 * MAQUETA. Pagos reportados por los representantes pendientes de verificar
 * (PendingPaymentController + BankTransactionController de la anterior:
 * se cruzan con el estado de cuenta bancario subido por la administración).
 */
export const PENDING_PAYMENTS = [
  { id: 1, guardian: "Andreína Castillo", cedula: "V-15.882.410", method: "Pago móvil", bank: "Banesco", reference: "004512", amountBs: 18747, date: "14/11/2026", status: "Por verificar", match: true },
  { id: 2, guardian: "Ramón Herrera", cedula: "V-12.774.091", method: "Transferencia", bank: "Mercantil", reference: "552019", amountBs: 37494, date: "14/11/2026", status: "Por verificar", match: true },
  { id: 3, guardian: "Yelitza Morales", cedula: "V-14.300.552", method: "Pago móvil", bank: "Venezuela", reference: "118734", amountBs: 18747, date: "14/11/2026", status: "Por verificar", match: false },
  { id: 4, guardian: "José Gregorio Díaz", cedula: "V-11.908.336", method: "Pago móvil", bank: "Provincial", reference: "771045", amountBs: 15622.5, date: "13/11/2026", status: "Por verificar", match: true },
  { id: 5, guardian: "Mariela Paredes", cedula: "V-16.201.774", method: "Transferencia", bank: "BNC", reference: "903311", amountBs: 9373.5, date: "13/11/2026", status: "Por verificar", match: false },
  { id: 6, guardian: "Carlos Ortega", cedula: "V-13.665.208", method: "Pago móvil", bank: "Banesco", reference: "004377", amountBs: 18747, date: "13/11/2026", status: "Por verificar", match: true },
  { id: 7, guardian: "Luisa Fuentes", cedula: "V-17.019.443", method: "Pago móvil", bank: "Bancamiga", reference: "620194", amountBs: 31245, date: "12/11/2026", status: "Por verificar", match: true },
  { id: 8, guardian: "Pedro Suárez", cedula: "V-12.118.760", method: "Transferencia", bank: "Mercantil", reference: "551870", amountBs: 18747, date: "12/11/2026", status: "Aprobado", match: true },
  { id: 9, guardian: "Ana Lugo", cedula: "V-15.443.902", method: "Pago móvil", bank: "Venezuela", reference: "117002", amountBs: 5000, date: "11/11/2026", status: "Rechazado", match: false },
];
