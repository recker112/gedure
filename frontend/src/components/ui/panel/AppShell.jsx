/**
 * React
 */
import { useState } from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

/**
 * Components
 */
import PanelAppBar from "../../menu/panel/PanelAppBar";
import PanelDrawer from "../../menu/panel/PanelDrawer";
import SkipLink from "../SkipLink";
import { EmptyState } from "./cards";
import MockRoleProvider from "../../../context/mockRole/MockRoleProvider";
import { useMockRole } from "../../../hooks/app/useMockRole";
import { PANEL_ROOT, canSeeItem, findPanelItem } from "../../menu/panel/panelNav";

/** Sección que existe pero no es de la vista de rol actual. */
function NotForRole() {
  const { info } = useMockRole();
  return (
    <Card>
      <EmptyState
        icon={LockOutlinedIcon}
        title="Esta sección no está disponible para tu perfil"
        description={`Con la vista «${info.label}» esta página no aparece en el menú. Cambia la vista de rol desde el menú o vuelve al inicio.`}
        action={
          <Button component={RouterLink} to={PANEL_ROOT} variant="contained">
            Volver al inicio
          </Button>
        }
      />
    </Card>
  );
}

function Shell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { role } = useMockRole();
  const allowed = canSeeItem(findPanelItem(pathname), role);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100dvh", bgcolor: "background.default" }}>
      <SkipLink href="#contenido">Saltar al contenido</SkipLink>
      <PanelAppBar menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
      <PanelDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Box
        component="main"
        id="contenido"
        tabIndex={-1}
        sx={{ flexGrow: 1, outline: "none", px: { xs: 2, sm: 3 }, py: { xs: 3, md: 5 }, width: "100%", maxWidth: 1120, mx: "auto", minWidth: 0 }}
      >
        {allowed ? <Outlet /> : <NotForRole />}
      </Box>
    </Box>
  );
}

/**
 * Esqueleto del panel de Gedure: AppBar + menú temporal + <main> a todo el
 * ancho (centrado). Lo monta
 * AuthLayout (rama privada, tras el 2FA). MockRoleProvider es de la MAQUETA
 * (vista de rol) y se quitará cuando el menú salga de los permisos reales.
 */
export default function AppShell() {
  return (
    <MockRoleProvider>
      <Shell />
    </MockRoleProvider>
  );
}
