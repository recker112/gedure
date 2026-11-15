/**
 * MUI
 */
import Typography from "@mui/material/Typography";

/**
 * Components
 */
import useTitleHook from "../../hooks/utils/useTitleHook";

/**
 * PLANTILLA — pantalla de ejemplo. El layout del panel ya pone el <main>: la
 * pantalla empieza por su h1 (y, con datos, sus estados de carga, error y
 * vacío; ver docs/frontend/ui.md).
 */
export default function PlantillaPage() {
  useTitleHook("Plantilla");

  return (
    <Typography variant="h4" component="h1">
      Plantilla
    </Typography>
  );
}
