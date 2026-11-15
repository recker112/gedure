/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

/**
 * Components
 */
import EmptyState from "../../components/ui/EmptyState";
import Crest from "../../components/brand/Crest";
import useTitleHook from "../../hooks/utils/useTitleHook";
import { useSessionUser } from "../../hooks/auth/useSessionUser";
import { SCHOOL } from "../../school";
import { usePanelMenu } from "./usePanelMenu";

/** Primer nombre para el saludo ("María José Pérez" → "María"). */
const firstName = (name) => (name ?? "").trim().split(/\s+/)[0] ?? "";

/**
 * Inicio del panel: saludo y accesos a las secciones que la persona puede
 * abrir (las mismas del menú). Sin datos inventados: cuando no hay secciones,
 * lo dice.
 */
export default function PanelHome() {
  useTitleHook("Inicio");
  const { name, username } = useSessionUser();
  const sections = usePanelMenu().filter((mod) => !mod.disabled);

  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Crest height={56} decorative />
        <div>
          <Typography variant="h4" component="h1">
            Hola, {firstName(name) || username}
          </Typography>
          <Typography color="textSecondary">Te damos la bienvenida a Gedure, de {SCHOOL.name}.</Typography>
        </div>
      </Stack>

      {sections.length > 0 ? (
        <section aria-labelledby="accesos">
          <Typography id="accesos" variant="h6" component="h2" sx={{ mb: 1.5 }}>
            ¿Qué quieres hacer?
          </Typography>
          <Grid container spacing={2}>
            {sections.map(({ key, title, icon: Icon, entries }) => (
              <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: "100%" }}>
                  <CardActionArea component={RouterLink} to={entries[0].url} sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                        {Icon && <Icon color="primary" />}
                        <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      ) : (
        <Card>
          <EmptyState
            icon={DashboardOutlinedIcon}
            title="Aún no hay secciones disponibles para tu cuenta"
            text="Cuando el colegio active nuevas funciones en Gedure, aparecerán aquí y en el menú."
          />
        </Card>
      )}
    </Stack>
  );
}
