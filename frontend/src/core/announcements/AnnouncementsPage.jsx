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
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import { EmptyState } from "../../components/ui/panel/cards";
import { useMockRole } from "../../hooks/app/useMockRole";
import { announcementsFor } from "./mockData";

/**
 * Comunicados privados (por rol/curso) con leído/no leído. MAQUETA: abrir
 * uno lo marca como leído solo en estado local.
 */
export default function AnnouncementsPage() {
  const { role } = useMockRole();
  const items = announcementsFor(role);
  const [readIds, setReadIds] = useState([]);
  const [tab, setTab] = useState("todos");
  const [selectedId, setSelectedId] = useState(null);

  const isRead = (a) => a.read[role] || readIds.includes(a.id);
  const unread = items.filter((a) => !isRead(a)).length;
  const visible = tab === "sin-leer" ? items.filter((a) => !isRead(a)) : items;
  const selected = items.find((a) => a.id === selectedId) ?? visible[0];

  const open = (a) => {
    setSelectedId(a.id);
    if (!readIds.includes(a.id)) setReadIds([...readIds, a.id]);
  };

  return (
    <PanelPage
      title="Comunicados"
      description="Avisos privados del colegio dirigidos a tu perfil, curso o sección."
      actions={
        role === "admin" && (
          <Button variant="contained" startIcon={<AddIcon />}>
            Nuevo comunicado
          </Button>
        )
      }
    >
      <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="Filtrar comunicados">
        <Tab value="todos" label={`Todos (${items.length})`} />
        <Tab value="sin-leer" label={`Sin leer (${unread})`} />
      </Tabs>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            {visible.length === 0 ? (
              <EmptyState icon={CampaignOutlinedIcon} title="¡Estás al día!" description="No tienes comunicados sin leer." />
            ) : (
              <List disablePadding aria-label="Lista de comunicados">
                {visible.map((a) => (
                  <ListItemButton
                    key={a.id}
                    selected={selected?.id === a.id}
                    onClick={() => open(a)}
                    divider
                    sx={{ alignItems: "flex-start", gap: 1.5, py: 1.5 }}
                  >
                    <Box aria-hidden sx={{ mt: 0.9, width: 8, height: 8, borderRadius: "50%", flexShrink: 0, bgcolor: isRead(a) ? "transparent" : "primary.main" }} />
                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <Typography sx={{ fontWeight: isRead(a) ? 500 : 700, flexGrow: 1 }}>{a.title}</Typography>
                        {!isRead(a) && <Chip label="Nuevo" size="small" color="primary" sx={{ height: 20 }} />}
                      </Stack>
                      <Typography variant="body2" color="textSecondary" noWrap>
                        {a.excerpt}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {a.author} · {a.date}
                      </Typography>
                    </Box>
                  </ListItemButton>
                ))}
              </List>
            )}
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          {selected && (
            <Card component="article" aria-label={selected.title} sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", mb: 1.5 }}>
                {selected.important && <Chip icon={<PriorityHighIcon />} label="Importante" color="secondary" size="small" />}
                <Chip icon={<GroupsOutlinedIcon />} label={selected.audience} size="small" variant="outlined" />
              </Stack>
              <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
                {selected.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2.5 }}>
                {selected.author} · {selected.date}
              </Typography>
              <Typography sx={{ lineHeight: 1.75 }}>{selected.body}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                <Button variant="outlined" disabled>
                  Descargar adjunto (PDF)
                </Button>
              </Stack>
            </Card>
          )}
        </Grid>
      </Grid>
    </PanelPage>
  );
}
