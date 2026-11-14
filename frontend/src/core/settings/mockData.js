/**
 * MAQUETA. Configuración de Gedure (GedureConfigController, gc_*; cuentas
 * bancarias bank_account_*; tipo de cambio ExchangeRateSeeder de la anterior).
 */
export const GENERAL_SETTINGS = {
  schoolYear: "2026-2027",
  lapse: "1.er lapso",
  boletasDeadline: "18/11/2026",
  debtDay: "5",
};

export const BANK_ACCOUNTS = [
  { id: 1, bank: "Banesco", type: "Pago móvil", number: "0412-000-0000", rif: "J-00000000-0", status: "Activo" },
  { id: 2, bank: "Banco de Venezuela", type: "Corriente", number: "0102-0000-00-0000000000", rif: "J-00000000-0", status: "Activo" },
  { id: 3, bank: "Mercantil", type: "Corriente", number: "0105-0000-00-0000000000", rif: "J-00000000-0", status: "Deshabilitado" },
];

export const EXCHANGE_HISTORY = [
  { id: 1, date: "14/11/2026", rate: 312.45, source: "BCV (automático)" },
  { id: 2, date: "13/11/2026", rate: 311.9, source: "BCV (automático)" },
  { id: 3, date: "12/11/2026", rate: 310.72, source: "BCV (automático)" },
  { id: 4, date: "11/11/2026", rate: 309.05, source: "Manual · C. Salazar" },
];
