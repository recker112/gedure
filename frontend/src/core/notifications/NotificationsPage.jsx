/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DoneAllIcon from "@mui/icons-material/DoneAll";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import { StatusChip } from "../../components/ui/panel/cards";
import { useMockRole } from "../../hooks/app/useMockRole";
import { NOTIFICATIONS } from "../../mocks/mockData";

/** Todas las notificaciones de la vista (datos en mocks/mockData.js). */
export default function NotificationsPage() {
  const { role } = useMockRole();
  const items = NOTIFICATIONS[role] ?? [];

  return (
    <PanelPage
      title="Notificaciones"
      description="Avisos de Gedure sobre pagos, boletas, comunicados y tu cuenta."
      actions={
        <Button variant="outlined" startIcon={<DoneAllIcon />}>
          Marcar todas como leídas
        </Button>
      }
    >
      <Card>
        <List disablePadding>
          {items.map((n) => (
            <ListItemButton key={n.id} component={RouterLink} to={n.to} divider sx={{ gap: 2, py: 1.5 }}>
              <Box aria-hidden sx={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, bgcolor: n.read ? "transparent" : "primary.main" }} />
              <ListItemText primary={n.title} secondary={n.body} slotProps={{ primary: { sx: { fontWeight: n.read ? 500 : 800 } } }} />
              <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                <Typography variant="caption" color="textSecondary" component="p">
                  {n.date}
                </Typography>
                {!n.read && <StatusChip label="Nuevo" />}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Card>
    </PanelPage>
  );
}
