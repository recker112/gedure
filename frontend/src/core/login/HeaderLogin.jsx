/**
 * MUI
 */
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Components
 */
import GedureLogo from "../../components/brand/GedureLogo";

/**
 * Cabecera de las pantallas de acceso: marca de Gedure, título (h1) y texto
 * de apoyo.
 */
export default function HeaderLogin({ primaryText, secondaryText }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        <GedureLogo size={32} />
        <Typography component="span" sx={{ fontWeight: 700, fontSize: 20, letterSpacing: ".01em" }}>
          Gedure
        </Typography>
      </Stack>
      {primaryText && (
        <Typography variant="h4" component="h1">
          {primaryText}
        </Typography>
      )}
      {secondaryText && <Typography color="textSecondary">{secondaryText}</Typography>}
    </Stack>
  );
}
