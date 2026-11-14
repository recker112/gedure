/**
 * React
 */
import { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * MUI
 */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

/**
 * Components
 */
import BrandLink from "./BrandLink";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import SessionButton from "./SessionButton";
import { usePublicNavItems } from "../../hooks/auth/useSessionNav";

/**
 * Barra superior pública. Desde `md` muestra los enlaces; por debajo, un
 * botón que abre MobileMenu. Se oculta/enseña por CSS (no con
 * useMediaQuery) para que el primer pintado ya sea el correcto.
 */
export default function PublicAppBar() {
  const items = usePublicNavItems();
  const [open, setOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={(theme) => ({
        bgcolor: alpha(theme.palette.background.appbar, 0.88),
        backdropFilter: "saturate(180%) blur(12px)",
        borderBottom: 1,
        borderColor: scrolled ? "divider" : "transparent",
        transition: theme.transitions.create("border-color"),
      })}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: { xs: 64, md: 72 } }}>
          <BrandLink />

          <Box
            component="nav"
            aria-label="Principal"
            sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, mx: "auto" }}
          >
            {items.map(({ label, to, end }) => (
              <Button
                key={to}
                component={NavLink}
                to={to}
                end={end}
                color="inherit"
                sx={{
                  px: 2,
                  color: "text.secondary",
                  "&:hover": { color: "text.primary" },
                  "&.active": { color: "primary.main", bgcolor: "primary.light" },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: { xs: "auto", md: 0 } }}>
            <ThemeToggle sx={{ display: { xs: "none", sm: "inline-flex" }, color: "text.secondary" }} />
            <SessionButton sx={{ display: { xs: "none", sm: "inline-flex" } }} />
            <IconButton
              aria-label="Abrir menú"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </AppBar>
  );
}
