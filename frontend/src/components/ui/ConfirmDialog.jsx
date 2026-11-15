/**
 * MUI
 */
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

/**
 * Components
 */
import ResponsiveDialog from "./ResponsiveDialog";

/**
 * Confirmación de una acción que no se deshace igual (suspender, eliminar,
 * revocar, descartar cambios). `children` añade contenido bajo el texto. En
 * móvil es una hoja inferior compacta.
 */
export default function ConfirmDialog({ open, title, text, confirmLabel = "Confirmar", color = "primary", onConfirm, onClose, children }) {
  return (
    <ResponsiveDialog open={open} onClose={onClose} aria-labelledby="confirm-dialog-title" maxWidth="xs" fullWidth>
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" color={color} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  );
}
