/**
 * React
 */
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

/**
 * Components
 */
import { useMockRole } from "../../../hooks/app/useMockRole";
import { NOTIFICATIONS } from "../../../mocks/mockData";

/**
 * Campana con contador y menú de las últimas notificaciones (MAQUETA:
 * NOTIFICATIONS de mocks/mockData.js; "marcar como leídas" es estado local).
 * En BluLabel llegan por el socket (useNotifySocket) y se abren en popover u
 * hoja inferior.
 */
export default function NotificationsMenu() {
  const { role } = useMockRole();
  const [anchorEl, setAnchorEl] = useState(null);
  const [readAll, setReadAll] = useState({});

  const items = NOTIFICATIONS[role] ?? [];
  const unread = readAll[role] ? 0 : items.filter((n) => !n.read).length;
  const label = unread ? `Notificaciones, ${unread} sin leer` : "Notificaciones";
  const close = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Notificaciones">
        <IconButton aria-label={label} aria-haspopup="true" aria-expanded={Boolean(anchorEl)} onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
          <Badge badgeContent={unread} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { width: 360, maxWidth: "calc(100vw - 32px)" } }, list: { "aria-label": "Notificaciones recientes" } }}
      >
        <Stack direction="row" sx={{ px: 2, py: 1, alignItems: "center", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 700 }}>Notificaciones</Typography>
          <Button size="small" disabled={!unread} onClick={() => setReadAll({ ...readAll, [role]: true })}>
            Marcar como leídas
          </Button>
        </Stack>
        <Divider />
        {items.map((n) => {
          const isUnread = !n.read && !readAll[role];
          return (
            <MenuItem key={n.id} component={RouterLink} to={n.to} onClick={close} sx={{ whiteSpace: "normal", alignItems: "flex-start", gap: 1.5, py: 1.25 }}>
              <Box aria-hidden sx={{ mt: 0.9, width: 8, height: 8, borderRadius: "50%", flexShrink: 0, bgcolor: isUnread ? "primary.main" : "transparent" }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: isUnread ? 700 : 500 }}>
                  {n.title}
                  {isUnread && <Box component="span" sx={visuallyHidden}> (sin leer)</Box>}
                </Typography>
                <Typography variant="caption" color="textSecondary" component="p">
                  {n.body}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {n.date}
                </Typography>
              </Box>
            </MenuItem>
          );
        })}
        <Divider />
        <MenuItem component={RouterLink} to="/gedure/notificaciones" onClick={close} sx={{ justifyContent: "center", color: "primary.main", fontWeight: 600 }}>
          Ver todas
        </MenuItem>
      </Menu>
    </>
  );
}

const visuallyHidden = { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" };
