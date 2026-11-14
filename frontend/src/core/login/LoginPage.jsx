/**
 * React
 */
import { Link } from "react-router-dom";

/**
 * MUI
 */
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * Components
 */
import Crest from "../../components/brand/Crest";
import GedureLogo from "../../components/brand/GedureLogo";
import ThemeToggle from "../../components/menu/ThemeToggle";
import useTitleHook from "../../hooks/utils/useTitleHook";

/**
 * PLACEHOLDER del acceso a Gedure: solo la maqueta. El login real (Sanctum,
 * store/services/auth/, guards de ruta) se hará después.
 */
export default function LoginPage() {
  useTitleHook("Entrar a Gedure");

  return (
    <Box
      component="main"
      sx={(theme) => ({
        flexGrow: 1,
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 6,
        background: `radial-gradient(circle at top, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 60%)`,
      })}
    >
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 420 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Button component={Link} to="/" startIcon={<ArrowBackIcon />} color="inherit">
            Volver al inicio
          </Button>
          <ThemeToggle />
        </Stack>
        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={1} sx={{ alignItems: "center", textAlign: "center", mb: 3 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Crest height={56} decorative />
                <GedureLogo size={40} />
              </Stack>
              <Typography variant="h4" component="h1">
                Entrar a Gedure
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Plataforma de gestión escolar de La Candelaria
              </Typography>
            </Stack>
            <Alert severity="info" sx={{ mb: 3 }}>
              El acceso estará disponible próximamente.
            </Alert>
            <Stack component="form" spacing={2} aria-label="Inicio de sesión" onSubmit={(event) => event.preventDefault()}>
              <TextField label="Usuario o correo" name="username" autoComplete="username" disabled fullWidth />
              <TextField label="Contraseña" name="password" type="password" autoComplete="current-password" disabled fullWidth />
              <Button type="submit" variant="contained" size="large" disabled fullWidth>
                Entrar
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
