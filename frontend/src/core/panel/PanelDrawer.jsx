/**
 * React Router
 */
import { Link as RouterLink, useLocation } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

/**
 * Components
 */
import Crest from "../../components/brand/Crest";
import { PANEL_PATH } from "../../components/routers/Routers";
import { SCHOOL } from "../../school";
import { usePanelMenu } from "./usePanelMenu";

export const PANEL_DRAWER_ID = "menu-panel";
const DRAWER_WIDTH = 288;

/** URLs navegables del menú (las hojas), para marcar la activa. */
const leafUrls = (entries) => entries.flatMap((entry) => (entry.children ? leafUrls(entry.children) : [entry.url]));

/**
 * Entrada activa: la URL más larga que coincide con la actual o es su prefijo
 * (un detalle `/x/:id` marca `/x`). El inicio solo cuando se está en él.
 */
function activeUrl(pathname, menu) {
  const path = pathname.replace(/\/+$/, "");
  if (path === PANEL_PATH) return PANEL_PATH;

  return menu
    .flatMap((mod) => leafUrls(mod.entries))
    .filter((url) => path === url || path.startsWith(`${url}/`))
    .sort((a, b) => b.length - a.length)[0];
}

const itemSx = {
  borderRadius: 2,
  mx: 1,
  mb: 0.25,
  minHeight: 46,
  "&.Mui-selected": { bgcolor: "primary.light", color: "primary.main", "& .MuiListItemIcon-root": { color: "primary.main" } },
  "&.Mui-selected .MuiListItemText-primary": { fontWeight: 700 },
};

function NavItem({ title, icon: Icon, url, active, depth = 0, onNavigate }) {
  const selected = active === url;

  return (
    <ListItemButton
      component={RouterLink}
      to={url}
      selected={selected}
      aria-current={selected ? "page" : undefined}
      onClick={onNavigate}
      sx={{ ...itemSx, pl: 2 + depth * 2 }}
    >
      {Icon && (
        <ListItemIcon sx={{ minWidth: 38 }}>
          <Icon fontSize="small" />
        </ListItemIcon>
      )}
      <ListItemText primary={title} />
    </ListItemButton>
  );
}

/** Entradas de un módulo; un grupo pinta su título y sus hijas sangradas. */
function NavEntries({ entries, active, depth = 0, onNavigate }) {
  return entries.map((entry) =>
    entry.children ? (
      <Box key={entry.url} component="li" sx={{ listStyle: "none" }}>
        <Typography variant="caption" color="textSecondary" component="p" sx={{ pl: 3 + depth * 2, pt: 1, pb: 0.5, fontWeight: 700 }}>
          {entry.title}
        </Typography>
        <List disablePadding>
          <NavEntries entries={entry.children} active={active} depth={depth + 1} onNavigate={onNavigate} />
        </List>
      </Box>
    ) : (
      <NavItem key={entry.url} {...entry} active={active} depth={depth} onNavigate={onNavigate} />
    ),
  );
}

/**
 * Menú del panel: SIEMPRE temporal (en todos los anchos). Se abre con el botón
 * del AppBar y se cierra al elegir una sección, con Escape o tocando fuera.
 * Sale de apps/registry.js filtrado por permisos (usePanelMenu): cada
 * módulo es un bloque con sus entradas.
 */
export default function PanelDrawer({ open, onClose }) {
  const { pathname } = useLocation();
  const menu = usePanelMenu();
  const active = activeUrl(pathname, menu);

  return (
    <Drawer
      id={PANEL_DRAWER_ID}
      variant="temporary"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: DRAWER_WIDTH, maxWidth: "85vw", pt: "env(safe-area-inset-top)" } } }}
    >
      <Stack direction="row" sx={{ alignItems: "center", pl: 2, pr: 1, minHeight: 72, flexShrink: 0, gap: 1.25 }}>
        <Crest height={44} decorative />
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 18, lineHeight: 1.1 }}>Gedure</Typography>
          <Typography variant="caption" color="textSecondary" noWrap component="p">
            {SCHOOL.shortName}
          </Typography>
        </Box>
        <IconButton aria-label="Cerrar menú" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Box component="nav" aria-label="Menú del panel" sx={{ flexGrow: 1, overflowY: "auto", py: 1 }}>
        <List disablePadding>
          <NavItem title="Inicio" icon={HomeOutlinedIcon} url={PANEL_PATH} active={active} onNavigate={onClose} />
        </List>
        {menu.map((mod) => (
          <List
            key={mod.key}
            disablePadding
            sx={{ mt: 1 }}
            subheader={
              <ListSubheader
                disableSticky
                sx={{ bgcolor: "transparent", lineHeight: "32px", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}
              >
                {mod.title}
              </ListSubheader>
            }
          >
            {mod.disabled ? (
              <ListItem sx={{ mx: 1, width: "auto", minHeight: 46, color: "text.disabled" }} aria-disabled="true">
                {mod.icon && (
                  <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
                    <mod.icon fontSize="small" />
                  </ListItemIcon>
                )}
                <ListItemText primary={mod.title} />
                <Chip label="Próximamente" size="small" variant="outlined" />
              </ListItem>
            ) : (
              <NavEntries entries={mod.entries} active={active} onNavigate={onClose} />
            )}
          </List>
        ))}
      </Box>
    </Drawer>
  );
}
