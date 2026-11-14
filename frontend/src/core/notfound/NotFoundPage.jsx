/**
 * MUI
 */
import Typography from "@mui/material/Typography";

/**
 * Components
 */
import Fallback from "../../components/routers/Fallback";
import useTitleHook from "../../hooks/utils/useTitleHook";

/** 404 dentro del layout público (ya hay un <main>: se usa <section>). */
export default function NotFoundPage() {
  useTitleHook("Página no encontrada");

  return (
    <Fallback component="section" homeButton>
      <Typography variant="h3" component="h1">
        Página no encontrada
      </Typography>
      <Typography color="textSecondary" sx={{ maxWidth: 480 }}>
        La dirección que estás buscando no existe o ya no está disponible.
      </Typography>
    </Fallback>
  );
}
