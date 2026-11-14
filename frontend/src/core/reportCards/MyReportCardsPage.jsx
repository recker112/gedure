/**
 * MUI
 */
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import { SectionCard, StatusChip } from "../../components/ui/panel/cards";
import { MY_REPORT_CARDS } from "./mockData";

/** Boletas de los representados (vista representante, /gedure/boletas de la Gedure anterior). */
export default function MyReportCardsPage() {
  return (
    <PanelPage title="Boletas" description="Descarga las boletas de calificaciones de tus representados.">
      <Grid container spacing={2.5}>
        {MY_REPORT_CARDS.map((child) => (
          <Grid key={child.student} size={{ xs: 12, lg: 6 }}>
            <SectionCard title={`${child.student} · ${child.course}`} padded={false}>
              <List disablePadding>
                {child.items.map((b) => (
                  <ListItem
                    key={b.id}
                    divider
                    sx={{ px: 2.5, pr: b.status === "Nuevo" ? 21 : 12 }}
                    secondaryAction={
                      // Solo se marca lo nuevo; la descarga se ve también en el móvil.
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        {b.status === "Nuevo" && <StatusChip label="Nuevo" />}
                        <Button size="small" startIcon={<FileDownloadOutlinedIcon />} aria-label={`Descargar boleta ${b.lapse} de ${child.student}`}>
                          PDF
                        </Button>
                      </Stack>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "error.light", color: "error.main" }}>
                        <PictureAsPdfOutlinedIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={b.lapse} secondary={`Publicada el ${b.date}`} />
                  </ListItem>
                ))}
              </List>
            </SectionCard>
          </Grid>
        ))}
      </Grid>
    </PanelPage>
  );
}
