/**
 * MUI
 */
import Link from "@mui/material/Link";

/**
 * Enlace "saltar al contenido": invisible hasta recibir foco con el teclado.
 */
export default function SkipLink({ href, children }) {
  return (
    <Link
      href={href}
      sx={{
        position: "absolute",
        left: 16,
        top: -64,
        zIndex: (theme) => theme.zIndex.tooltip,
        px: 2,
        py: 1,
        borderRadius: 1,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        "&:focus": { top: 16 },
      }}
    >
      {children}
    </Link>
  );
}
