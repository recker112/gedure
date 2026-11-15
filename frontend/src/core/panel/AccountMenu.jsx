/**
 * React
 */
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";

/**
 * Components
 */
import { LOGOUT_PATH } from "../../components/routers/Routers";
import { useSessionUser } from "../../hooks/auth/useSessionUser";
import { initialsOf } from "../../hooks/auth/useSessionNav";

/**
 * Menú de cuenta del AppBar: quién tiene la sesión, "Ver sitio web" (con
 * `?sitio=1` la portada no rebota al panel, ver homeLoader) y "Cerrar sesión"
 * (/auth/logout cierra la sesión en su loader).
 */
export default function AccountMenu() {
  const { name, username, email } = useSessionUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);
  const displayName = name || username;
  const initials = initialsOf(displayName);

  return (
    <>
      <ButtonBase
        id="cuenta-boton"
        aria-label={`Cuenta de ${displayName}`}
        aria-haspopup="menu"
        aria-controls={open ? "cuenta-menu" : undefined}
        aria-expanded={open}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ borderRadius: 6, p: 0.5, pr: { xs: 0.5, md: 1 }, gap: 1 }}
      >
        <Avatar aria-hidden sx={{ width: 34, height: 34, fontSize: 14, fontWeight: 700, bgcolor: "primary.main", color: "primary.contrastText" }}>
          {initials || <PersonOutlineIcon fontSize="small" />}
        </Avatar>
        <Typography
          component="span"
          variant="body2"
          noWrap
          sx={{ display: { xs: "none", md: "block" }, fontWeight: 700, maxWidth: 180 }}
        >
          {displayName}
        </Typography>
        <KeyboardArrowDownIcon fontSize="small" sx={{ display: { xs: "none", md: "block" } }} />
      </ButtonBase>
      <Menu
        id="cuenta-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { width: 260, maxWidth: "calc(100vw - 32px)" } }, list: { "aria-labelledby": "cuenta-boton" } }}
      >
        <Box sx={{ px: 2, py: 1.25 }}>
          <Typography sx={{ fontWeight: 700 }} noWrap>
            {displayName}
          </Typography>
          {name && (
            <Typography variant="body2" color="textSecondary" noWrap>
              {username}
            </Typography>
          )}
          {email && (
            <Typography variant="caption" color="textSecondary" component="p" noWrap>
              {email}
            </Typography>
          )}
        </Box>
        <Divider />
        <MenuItem component={RouterLink} to="/?sitio=1" onClick={close}>
          <ListItemIcon>
            <LanguageIcon fontSize="small" />
          </ListItemIcon>
          Ver sitio web
        </MenuItem>
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
