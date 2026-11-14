/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

/**
 * Components
 */
import GedureLogo from "../../brand/GedureLogo";
import AccountMenu from "./AccountMenu";
import NotificationsMenu from "./NotificationsMenu";
import { PANEL_ROOT } from "./panelNav";

/**
 * AppBar del panel (sticky, como MenuBlu en BluLabel): botón de menú y logo a
 * la izquierda; campana y cuenta a la derecha. Nada más.
 */
export default function PanelAppBar({ menuOpen, onOpenMenu }) {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.appbar", pt: "env(safe-area-inset-top)" }}
    >
      <Toolbar sx={{ gap: 1, minHeight: { xs: 60, sm: 64 } }}>
        <IconButton edge="start" aria-label="Abrir menú" aria-haspopup="true" aria-expanded={menuOpen} onClick={onOpenMenu} color="inherit">
          <MenuIcon />
        </IconButton>
        <Stack component={RouterLink} to={PANEL_ROOT} direction="row" spacing={1} sx={{ alignItems: "center", color: "inherit", textDecoration: "none" }}>
          <GedureLogo size={26} />
          <Typography sx={{ fontWeight: 800, fontSize: 18, display: { xs: "none", sm: "block" } }}>Gedure</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <NotificationsMenu />
          <AccountMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
