/**
 * React
 */
import { Link } from "react-router-dom";

/**
 * MUI
 */
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Components
 */
import Crest from "../brand/Crest";

/**
 * Pantalla completa de carga o error. `component` es "main" porque casi
 * siempre ocupa la pantalla entera; dentro del layout (que ya pone el
 * <main>) se pasa "section" para no anidar dos landmarks main.
 */
export default function Fallback({ text, loading = false, homeButton = false, component = "main", children }) {
  return (
    <Stack
      component={component}
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center", flexGrow: 1, py: 6, px: 3, textAlign: "center" }}
    >
      <Crest height={96} decorative={loading} />
      {text && (
        <Typography color="textSecondary" sx={{ fontSize: 16 }}>
          {text}
        </Typography>
      )}
      {loading && <LinearProgress aria-label="Cargando…" sx={{ width: 200 }} />}
      {children}
      {homeButton && (
        <Button component={Link} to="/" variant="text">
          Volver al inicio
        </Button>
      )}
    </Stack>
  );
}
