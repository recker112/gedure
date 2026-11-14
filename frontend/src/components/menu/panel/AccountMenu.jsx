/**
 * React
 */
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Redux
 */
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../store/reducers/user/configReducer";

/**
 * MUI
 */
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * Components
 */
import { useSessionUser } from "../../../hooks/auth/useSessionUser";
import { useThemeSelection } from "../../../hooks/theme/useThemeSelection";
import { useMockRole } from "../../../hooks/app/useMockRole";
import { LOGOUT_PATH } from "../../routers/Routers";
import { initials } from "../../utils/initials";

/**
 * Menú de usuario (avatar): perfil, tema, web pública y cerrar sesión. Los
 * datos del usuario son los REALES de la sesión (auth.user); la vista de rol
 * es de la maqueta.
 */
export default function AccountMenu() {
  const dispatch = useDispatch();
  const { name, username, email } = useSessionUser();
  const { mode } = useThemeSelection();
  const { info } = useMockRole();
  const [anchorEl, setAnchorEl] = useState(null);
  const close = () => setAnchorEl(null);
  const displayName = name || username;

  return (
    <>
      <ButtonBase
        aria-label={`Cuenta de ${displayName}`}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ borderRadius: 6, p: 0.5, pr: { xs: 0.5, md: 1 }, gap: 1 }}
      >
        <Avatar sx={{ width: 34, height: 34, fontSize: 14, bgcolor: "primary.main", color: "primary.contrastText" }}>{initials(displayName)}</Avatar>
        <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "left" }}>
          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {displayName}
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ lineHeight: 1.2 }}>
            {info.label}
          </Typography>
        </Box>
        <KeyboardArrowDownIcon fontSize="small" sx={{ display: { xs: "none", md: "block" } }} />
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { width: 260 } }, list: { "aria-label": "Menú de cuenta" } }}
      >
        <Box sx={{ px: 2, py: 1.25 }}>
          <Typography sx={{ fontWeight: 700 }}>{displayName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {username}
          </Typography>
          {email && (
            <Typography variant="caption" color="textSecondary">
              {email}
            </Typography>
          )}
        </Box>
        <Divider />
        <MenuItem component={RouterLink} to="/gedure/perfil" onClick={close}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          Mi perfil
        </MenuItem>
        <MenuItem onClick={() => dispatch(toggleTheme())}>
          <ListItemIcon>{mode === "dark" ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}</ListItemIcon>
          {mode === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
        </MenuItem>
        {/* `?sitio=1`: la portada no rebota al panel (ver homeLoader). */}
        <MenuItem component={RouterLink} to="/?sitio=1" onClick={close}>
          <ListItemIcon>
            <LanguageIcon fontSize="small" />
          </ListItemIcon>
          Ver sitio web
        </MenuItem>
        <Divider />
        <MenuItem component={RouterLink} to={LOGOUT_PATH} onClick={close}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}
