/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

/**
 * Components
 */
import Fallback from "../../components/routers/Fallback";
import { PANEL_PATH } from "../../components/routers/Routers";
import useTitleHook from "../../hooks/utils/useTitleHook";

/** 404 dentro del panel: conserva el AppBar y el menú, y vuelve al inicio del panel. */
export default function PanelNotFoundPage() {
  useTitleHook("Página no encontrada");

  return (
    <Fallback component="section">
      <Typography variant="h4" component="h1">
        Página no encontrada
      </Typography>
      <Typography color="textSecondary" sx={{ maxWidth: 480 }}>
        Esta sección no existe o todavía no forma parte de Gedure.
      </Typography>
      <Button component={RouterLink} to={PANEL_PATH} variant="contained">
        Volver al inicio
      </Button>
    </Fallback>
  );
}
