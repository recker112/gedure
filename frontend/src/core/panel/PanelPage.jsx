/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";

/**
 * Components
 */
import GedureLogo from "../../components/brand/GedureLogo";
import Crest from "../../components/brand/Crest";
import ThemeToggle from "../../components/menu/ThemeToggle";
import useTitleHook from "../../hooks/utils/useTitleHook";
import { useSessionUser } from "../../hooks/auth/useSessionUser";

/**
 * PLACEHOLDER del panel de Gedure (rama privada, tras el 2FA): saludo con el
 * nombre del usuario y cierre de sesión. Aquí crecerá la app.
 */
export default function PanelPage() {
  useTitleHook("Gedure");
  const { name, username, email } = useSessionUser();

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.appbar" }}>
        <Toolbar sx={{ gap: 1 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexGrow: 1 }}>
            <GedureLogo size={28} />
            <Typography component="span" sx={{ fontWeight: 700, fontSize: 18 }}>
              Gedure
            </Typography>
          </Stack>
          <ThemeToggle />
          {/* `?sitio=1`: la portada no rebota al panel (ver homeLoader). */}
          <Button component={RouterLink} to="/?sitio=1" color="inherit" aria-label="Ver sitio web" startIcon={<LanguageIcon />} sx={{ "& .MuiButton-startIcon": { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } } }}>
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Ver sitio web
            </Box>
          </Button>
          <Button component={RouterLink} to="/auth/logout" color="inherit" startIcon={<LogoutIcon />}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
        <Container maxWidth="sm">
          <Card>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
                <Crest height={64} decorative />
                <Typography variant="h4" component="h1">
                  Hola, {name || username}
                </Typography>
                <Typography color="textSecondary">
                  Iniciaste sesión como <strong>{username}</strong>
                  {email && ` (${email})`}.
                </Typography>
                <Typography color="textSecondary">
                  El panel de Gedure está en construcción: pronto encontrarás aquí boletas, pagos y avisos del colegio.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Próximamente: noticias del colegio.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1, width: { xs: "100%", sm: "auto" } }}>
                  <Button component={RouterLink} to="/auth/logout" variant="contained" startIcon={<LogoutIcon />}>
                    Cerrar sesión
                  </Button>
                  <Button component={RouterLink} to="/?sitio=1" variant="outlined">
                    Ir a la web del colegio
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
