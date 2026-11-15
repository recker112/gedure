/**
 * Estilo de la hoja inferior en móvil (esquinas superiores redondeadas),
 * compartido por los diálogos y menús que entran desde abajo. Es el `sx` del
 * `paper`; desde `md` no hay redondeo.
 */
export const bottomSheetPaperSx = {
  borderTopLeftRadius: { xs: "16px", md: 0 },
  borderTopRightRadius: { xs: "16px", md: 0 },
};
