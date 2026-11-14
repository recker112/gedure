/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import DataTable from "../../components/ui/panel/DataTable";
import { MockNotice, SectionCard, StatusChip } from "../../components/ui/panel/cards";
import { POSTS } from "./mockData";

/** Publicaciones (admin): noticias públicas y comunicados con audiencia. */
export default function PostsPage() {
  return (
    <PanelPage
      title="Publicaciones"
      description="Noticias para la web y comunicados privados: una sola publicación, distinta audiencia."
      actions={
        <Button variant="contained" startIcon={<AddIcon />}>
          Nueva publicación
        </Button>
      }
    >
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DataTable
            label="Publicaciones"
            rows={POSTS}
            searchKeys={["title", "author"]}
            searchPlaceholder="Buscar título o autor"
            filters={[
              { key: "kind", label: "Tipo", options: ["Comunicado", "Noticia"] },
              { key: "status", label: "Estado", options: ["Publicado", "Programado", "Borrador"] },
            ]}
            columns={[
              {
                key: "title",
                label: "Publicación",
                render: (p) => (
                  <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                    {p.kind === "Noticia" ? <NewspaperOutlinedIcon fontSize="small" color="secondary" aria-label="Noticia" /> : <CampaignOutlinedIcon fontSize="small" color="primary" aria-label="Comunicado" />}
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {p.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {p.author} · {p.date}
                      </Typography>
                    </Box>
                  </Stack>
                ),
              },
              { key: "audience", label: "Audiencia", hideOnMobile: true, render: (p) => <Chip size="small" variant="outlined" label={p.audience} /> },
              { key: "reads", label: "Leído", align: "center", hideOnMobile: true },
              { key: "status", label: "Estado", render: (p) => <StatusChip label={p.status} /> },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard title="Redacción rápida">
            <Stack spacing={2} component="form" aria-label="Nueva publicación">
              <MockNotice>Formulario de ejemplo (deshabilitado).</MockNotice>
              <TextField label="Título" disabled defaultValue="Simulacro de evacuación" />
              <TextField select label="Audiencia" disabled defaultValue="todos">
                <MenuItem value="web">Web pública (noticia)</MenuItem>
                <MenuItem value="todos">Toda la comunidad</MenuItem>
                <MenuItem value="rep">Representantes</MenuItem>
                <MenuItem value="doc">Docentes</MenuItem>
                <MenuItem value="curso">Un curso o sección…</MenuItem>
              </TextField>
              <TextField label="Contenido" multiline minRows={4} disabled defaultValue="El viernes 20 de noviembre se realizará un simulacro de evacuación a las 10:00 a. m." />
              <FormControlLabel control={<Switch disabled defaultChecked />} label="Marcar como importante" />
              <FormControlLabel control={<Switch disabled />} label="Enviar también por correo" />
              <Button variant="contained" disabled>
                Programar publicación
              </Button>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </PanelPage>
  );
}
