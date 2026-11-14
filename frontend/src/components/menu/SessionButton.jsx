/**
 * React
 */
import { Link } from "react-router-dom";

/**
 * MUI
 */
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";

/**
 * Components
 */
import GedureLogo from "../brand/GedureLogo";
import { sessionLabel, useSessionNav } from "../../hooks/auth/useSessionNav";

/**
 * Botón de acceso de la barra y del menú móvil. Sin sesión: "Iniciar sesión"
 * -> /auth. Con sesión: "Ir a Gedure" con el avatar (iniciales) y el nombre
 * -> /gedure. Con 2FA a medias: "Continuar verificación" -> /auth/2fa.
 */
export default function SessionButton({ onClick, size, sx }) {
  const { status, to, name, initials } = useSessionNav();
  const label = sessionLabel(status);
  const showUser = status !== "guest";

  return (
    <Button
      component={Link}
      to={to}
      onClick={onClick}
      variant="contained"
      size={size}
      startIcon={
        showUser ? (
          <Avatar aria-hidden sx={{ width: 26, height: 26, fontSize: 12, fontWeight: 700, bgcolor: "rgba(255,255,255,.22)", color: "inherit" }}>
            {initials || <PersonOutlineIcon sx={{ fontSize: 16 }} />}
          </Avatar>
        ) : (
          <GedureLogo size={18} />
        )
      }
      sx={sx}
    >
      <Box component="span" sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.2, textAlign: "left" }}>
        <span>{label}</span>
        {showUser && name && (
          <Box component="span" sx={{ fontSize: 11, fontWeight: 400, opacity: 0.85, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {name}
          </Box>
        )}
      </Box>
    </Button>
  );
}
