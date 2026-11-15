/**
 * MUI
 */
import { Drawer } from "@mui/material";

/**
 * Components
 */
import ResponsiveDialog from "./ResponsiveDialog";
import { useIsDesktop } from "../../hooks/theme/useIsDesktop";

/**
 * Superficie de un panel con formulario (ficha de un usuario, editor de
 * comunicados): panel lateral derecho en escritorio (el listado sigue a la
 * vista) y diálogo a pantalla completa en móvil. Usa `useIsDesktop()`.
 * `labelledBy` es el id del título, para el nombre accesible del diálogo.
 * `width` es el ancho en escritorio (560 por defecto; nunca pasa del viewport).
 */
export default function ResponsivePanel({ open, onClose, labelledBy, width = 560, children }) {
  const isDesktop = useIsDesktop();
  if (isDesktop) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            role: "dialog",
            "aria-labelledby": labelledBy,
            sx: { width, maxWidth: "100vw", bgcolor: "background.default", display: "flex", flexDirection: "column" },
          },
        }}
      >
        {children}
      </Drawer>
    );
  }

  return (
    <ResponsiveDialog
      variant="fullScreen"
      isDesktop={false}
      open={open}
      onClose={onClose}
      aria-labelledby={labelledBy}
      slotProps={{
        paper: {
          sx: {
            bgcolor: "background.default",
            pt: "env(safe-area-inset-top)",
            pb: "env(safe-area-inset-bottom)",
            pl: "env(safe-area-inset-left)",
            pr: "env(safe-area-inset-right)",
          },
        },
      }}
    >
      {children}
    </ResponsiveDialog>
  );
}
