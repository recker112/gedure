/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Components
 */
import GedureLogo from "../../brand/GedureLogo";
import PanelNavList from "./PanelNavList";
import RoleSwitcher from "./RoleSwitcher";
import { SCHOOL } from "../../../school";
import { PANEL_ROOT } from "./panelNav";

export const DRAWER_WIDTH = 288;

/**
 * Menú del panel: SIEMPRE temporal (en todos los tamaños), para que la
 * pantalla quede limpia. Se abre con el botón de menú del AppBar y se cierra
 * al elegir una sección, con Escape o tocando fuera. Al final, discreto, el
 * selector de vista de rol de la MAQUETA.
 */
export default function PanelDrawer({ open, onClose }) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: DRAWER_WIDTH, maxWidth: "85vw", bgcolor: "background.paper", backgroundImage: "none", pt: "env(safe-area-inset-top)" } } }}
    >
      <Stack sx={{ height: "100%" }}>
        <Stack direction="row" sx={{ alignItems: "center", pl: 2.5, pr: 1, minHeight: 64, flexShrink: 0 }}>
          <Stack
            component={RouterLink}
            to={PANEL_ROOT}
            onClick={onClose}
            direction="row"
            spacing={1.25}
            sx={{ alignItems: "center", color: "inherit", textDecoration: "none", flexGrow: 1, minWidth: 0 }}
          >
            <GedureLogo size={30} />
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 19, lineHeight: 1.1 }}>Gedure</Typography>
              <Typography variant="caption" color="textSecondary" noWrap component="p">
                {SCHOOL.shortName}
              </Typography>
            </Box>
          </Stack>
          <IconButton aria-label="Cerrar menú" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Box sx={{ flexGrow: 1, overflowY: "auto", py: 1 }}>
          <PanelNavList onNavigate={onClose} />
        </Box>
        <Box sx={{ p: 1.5, flexShrink: 0 }}>
          <RoleSwitcher />
        </Box>
      </Stack>
    </Drawer>
  );
}
