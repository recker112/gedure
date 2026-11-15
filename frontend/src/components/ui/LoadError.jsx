/**
 * MUI
 */
import { Button } from "@mui/material";
import CloudOffIcon from "@mui/icons-material/CloudOff";

/**
 * Components
 */
import EmptyState from "./EmptyState";

/**
 * Error al cargar una lista o sección (una query de RTK Query que falló sin
 * datos que enseñar), con "Reintentar" (`onRetry`, normalmente `refetch`). Se anuncia con `role="alert"`.
 */
export default function LoadError({ title = "No se pudo cargar", text = "Revisa tu conexión e inténtalo de nuevo.", onRetry, dense }) {
  return (
    <EmptyState
      role="alert"
      dense={dense}
      icon={CloudOffIcon}
      title={title}
      text={text}
      action={
        onRetry && (
          <Button variant="outlined" onClick={onRetry}>
            Reintentar
          </Button>
        )
      }
    />
  );
}
