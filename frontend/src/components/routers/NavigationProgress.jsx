/**
 * Route
 */
import { useNavigation } from "react-router-dom";

/**
 * MUI
 */
import LinearProgress from "@mui/material/LinearProgress";

/**
 * Con route.lazy el router se queda en la pantalla actual mientras descarga
 * el chunk de la siguiente. Sin un indicador, pulsar un enlace parece no
 * hacer nada durante esa espera.
 */
export default function NavigationProgress() {
  const navigation = useNavigation();

  if (navigation.state === "idle") return null;

  return (
    <LinearProgress
      aria-label="Cargando página"
      sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: (theme) => theme.zIndex.appBar + 1 }}
    />
  );
}
