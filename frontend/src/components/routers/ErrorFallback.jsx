/**
 * React
 */
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

/**
 * MUI
 */
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

/**
 * Components
 */
import Fallback from "./Fallback";
import { isChunkLoadError, isOfflineError } from "../utils/networkError";

/**
 * Error de una ruta. Un chunk que ya no existe (nueva versión desplegada)
 * pide recargar; sin conexión al comprobar la sesión (OfflineError de
 * ensureSession), reintentar; cualquier otro error muestra un aviso genérico.
 */
export default function ErrorFallback() {
  const error = useRouteError();

  if (isChunkLoadError(error)) {
    return (
      <Fallback text="Hay una nueva versión de la página.">
        <Button variant="contained" onClick={() => window.location.reload()}>
          Recargar
        </Button>
      </Fallback>
    );
  }

  if (isOfflineError(error)) {
    return (
      <Fallback text="No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.">
        <Button variant="contained" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </Fallback>
    );
  }

  const status = isRouteErrorResponse(error) ? error.status : null;

  return (
    <Fallback text={status === 404 ? "Página no encontrada" : "Algo salió mal al mostrar esta página."} homeButton>
      {status && status !== 404 && (
        <Typography variant="body2" color="textSecondary">
          Código {status}
        </Typography>
      )}
    </Fallback>
  );
}
