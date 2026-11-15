/**
 * MUI
 */
import { Box, Typography } from "@mui/material";

/**
 * Estado vacío: icono grande atenuado, un título, una explicación y una
 * acción opcional (p. ej. "Limpiar filtros"). `role` es `"status"` por
 * defecto (`"alert"` para errores) y `dense` reduce el relleno vertical para
 * paneles estrechos (popover, cajón).
 */
export default function EmptyState({ icon: Icon, title, text, action, role = "status", dense = false }) {
  return (
    <Box
      role={role}
      sx={{ py: dense ? 3 : 6, px: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}
    >
      {Icon && <Icon sx={{ fontSize: 48, color: "text.disabled" }} aria-hidden="true" />}
      <Typography variant="h6" component="p">
        {title}
      </Typography>
      {text && (
        <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 420 }}>
          {text}
        </Typography>
      )}
      {action && <Box sx={{ mt: 1 }}>{action}</Box>}
    </Box>
  );
}
