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

/**
 * Destino de AuthProtect cuando faltan permisos (/gedure/no-perm). Cuelga
 * solo del AuthProtect SIN permisos de /gedure (ver router/routes.jsx): bajo
 * uno con permisos se redirigiría a sí misma en bucle. Dentro del layout del
 * panel, que ya pone el <main>: por eso Fallback va como <section>.
 *
 * Sin "volver atrás" a propósito: la URL anterior es la que redirigió aquí.
 */
export default function NoPermPage() {
  useTitleHook("Sin permiso");

  return (
    <Fallback component="section">
      <Typography variant="h4" component="h1">
        No tienes permiso para ver esta página
      </Typography>
      <Typography color="textSecondary" sx={{ maxWidth: 480 }}>
        Tu cuenta no tiene acceso a esta sección. Si crees que es un error, comunícate con la administración del colegio.
      </Typography>
      <Button component={RouterLink} to={PANEL_PATH} variant="contained">
        Volver al inicio
      </Button>
    </Fallback>
  );
}
