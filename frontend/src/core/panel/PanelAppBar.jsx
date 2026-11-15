/**
 * React Router
 */
import { Link as RouterLink, useLocation } from "react-router-dom";

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
import GedureLogo from "../../components/brand/GedureLogo";
import ThemeToggle from "../../components/menu/ThemeToggle";
import { PANEL_PATH } from "../../components/routers/Routers";
import AccountMenu from "./AccountMenu";

/**
 * Modules
 */
import { modules } from "../../apps/registry";
import { moduleKeyOf } from "../../apps/moduleUrl";

/**
 * AppBar del panel, reducido a lo esencial: botón del menú, logo con el
 * nombre de la sección actual (el módulo, o "Gedure" en el inicio), tema y
 * cuenta.
 */
export default function PanelAppBar({ menuOpen, menuId, onOpenMenu }) {
  const { pathname } = useLocation();
  const current = modules[moduleKeyOf(pathname)];

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.appbar", pt: "env(safe-area-inset-top)" }}
    >
      <Toolbar sx={{ gap: 1, minHeight: { xs: 60, sm: 64 } }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Abrir menú"
          aria-controls={menuId}
          aria-expanded={menuOpen}
          onClick={onOpenMenu}
        >
          <MenuIcon />
        </IconButton>
        <Stack
          component={RouterLink}
          to={PANEL_PATH}
          aria-label="Gedure, ir al inicio del panel"
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", color: "inherit", textDecoration: "none", minWidth: 0 }}
        >
          <GedureLogo size={26} />
          <Typography component="span" noWrap sx={{ fontWeight: 700, fontSize: 18 }}>
            {current?.title ?? "Gedure"}
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <ThemeToggle />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
