/**
 * React
 */
import { Outlet } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";

/**
 * Components
 */
import PublicAppBar from "../menu/PublicAppBar";
import Footer from "./Footer";
import SkipLink from "./SkipLink";

/**
 * Layout de la web pública: AppBar + <main> + footer. Como ruta layout se
 * monta una vez y sus hijas cambian dentro del <Outlet />.
 */
export default function PublicLayout() {
  return (
    <>
      <SkipLink href="#contenido">Saltar al contenido</SkipLink>
      <PublicAppBar />
      <Box
        component="main"
        id="contenido"
        tabIndex={-1}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", outline: "none" }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
