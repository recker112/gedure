/**
 * React
 */
import { useState } from "react";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import { StatusChip } from "../../components/ui/panel/cards";
import { MESSAGES } from "./mockData";

/** Bandeja de mensajes de contacto de la web pública (admin). */
export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(MESSAGES[0].id);
  const selected = MESSAGES.find((m) => m.id === selectedId);
  const unread = MESSAGES.filter((m) => m.status === "Nuevo").length;

  return (
    <PanelPage title="Mensajes de contacto" description={`Lo que escriben desde el formulario de la web. ${unread} sin leer.`}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <List disablePadding aria-label="Mensajes">
              {MESSAGES.map((m) => (
                <ListItemButton key={m.id} divider selected={m.id === selectedId} onClick={() => setSelectedId(m.id)} sx={{ display: "block", py: 1.5 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Typography sx={{ fontWeight: m.status === "Nuevo" ? 800 : 600, flexGrow: 1 }} noWrap>
                      {m.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ flexShrink: 0 }}>
                      {m.date}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" noWrap sx={{ fontWeight: m.status === "Nuevo" ? 700 : 400 }}>
                    {m.subject}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" noWrap component="p">
                    {m.body}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card component="article" aria-label={selected.subject} sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
              <StatusChip label={selected.status} />
              <Chip size="small" variant="outlined" label="Formulario web" />
            </Stack>
            <Typography variant="h5" component="h2">
              {selected.subject}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              {selected.name} · {selected.email} · {selected.phone} · {selected.date}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography sx={{ lineHeight: 1.75 }}>{selected.body}</Typography>
            <Box sx={{ mt: 3 }}>
              <TextField label="Responder por correo" multiline minRows={3} fullWidth disabled placeholder="Escribe tu respuesta…" />
              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                <Button variant="contained" startIcon={<ReplyOutlinedIcon />} disabled>
                  Enviar respuesta
                </Button>
                <Button color="error" startIcon={<DeleteOutlineIcon />}>
                  Eliminar
                </Button>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </PanelPage>
  );
}
