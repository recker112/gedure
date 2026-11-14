/**
 * React
 */
import { Link, NavLink } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Components
 */
import BrandLink from "./BrandLink";
import GedureLogo from "../brand/GedureLogo";
import ThemeToggle from "./ThemeToggle";
import { loginItem, navItems } from "./navItems";

/** Menú lateral de móvil/tablet (por debajo de `md`). */
export default function MobileMenu({ open, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} slotProps={{ paper: { sx: { width: 300, maxWidth: "85vw" } } }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
        <BrandLink onClick={onClose} />
        <IconButton aria-label="Cerrar menú" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box component="nav" aria-label="Menú">
        <List sx={{ px: 1 }}>
          {navItems.map(({ label, to, end, Icon }) => (
            <ListItemButton
              key={to}
              component={NavLink}
              to={to}
              end={end}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                "&.active": { bgcolor: "primary.light", color: "primary.main" },
                "&.active .MuiListItemIcon-root": { color: "primary.main" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Button
          component={Link}
          to={loginItem.to}
          onClick={onClose}
          variant="contained"
          size="large"
          startIcon={<GedureLogo size={18} />}
        >
          {loginItem.label}
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, color: "text.secondary" }}>
          <ThemeToggle />
        </Box>
      </Box>
    </Drawer>
  );
}
