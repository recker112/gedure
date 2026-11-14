/**
 * MUI
 */
import Alert from "@mui/material/Alert";

/**
 * Se pinta con el Alert de MUI en vez de los estilos propios de Sonner para
 * que los avisos sigan el tema (colores, modo oscuro, tipografía).
 */
export default function NotifyAlert({ severity, message, icon, onClose }) {
  return (
    <Alert
      variant="filled"
      severity={severity}
      icon={icon}
      onClose={onClose}
      slotProps={{ closeButton: { "aria-label": "Cerrar aviso" } }}
      sx={{ width: "100%", boxShadow: 1, alignItems: "center" }}
    >
      {message}
    </Alert>
  );
}
