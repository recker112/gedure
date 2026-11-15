/**
 * React
 */
import { useState } from "react";
import { Outlet } from "react-router-dom";

/**
 * MUI
 */
import Container from "@mui/material/Container";

/**
 * Components
 */
import SkipLink from "./SkipLink";
import PanelAppBar from "../../core/panel/PanelAppBar";
import PanelDrawer, { PANEL_DRAWER_ID } from "../../core/panel/PanelDrawer";

/**
 * Carcasa del panel (ruta layout bajo AuthLayout): AppBar + menú lateral
 * TEMPORAL (cerrado al entrar y en todos los anchos: la pantalla queda limpia,
 * pensada para representantes desde el móvil) + <Container component="main"> (ancho por breakpoint, `lg`). Las
 * pantallas de los módulos se pintan en el <Outlet /> y no abren otro <main>.
 */
export default function ContainerGedure() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SkipLink href="#contenido">Saltar al contenido</SkipLink>
      <PanelAppBar menuOpen={menuOpen} menuId={PANEL_DRAWER_ID} onOpenMenu={() => setMenuOpen(true)} />
      <PanelDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Container
        component="main"
        id="contenido"
        tabIndex={-1}
        disableGutters
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          px: 2,
          py: { xs: 3, md: 5 },
          outline: "none",
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}
