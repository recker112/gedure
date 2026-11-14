/**
 * React Router
 */
import { Link as RouterLink, Outlet } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * Components
 */
import Crest from "../../components/brand/Crest";
import ThemeToggle from "../../components/menu/ThemeToggle";
import SkipLink from "../../components/ui/SkipLink";
import { SCHOOL } from "../../school";
import facade from "../../assets/img/fachada.webp";

/**
 * Layout de las pantallas de acceso (login, 2FA, recuperar contraseña,
 * cierre de sesión). Como el de BluLabel: un aside y el formulario centrado.
 * Desde `lg` el aside es una columna con la fachada del colegio; por debajo,
 * una franja con el escudo y el nombre.
 */
export default function LoginLayout() {
  return (
    <Box
      sx={{
        display: "grid",
        flexGrow: 1,
        minHeight: "100dvh",
        gridTemplateColumns: { xs: "1fr", lg: "minmax(360px, 440px) 1fr" },
        gridTemplateRows: { xs: "auto 1fr", lg: "1fr" },
      }}
    >
      <SkipLink href="#acceso">Saltar al formulario</SkipLink>
      <Box
        component="aside"
        aria-label={SCHOOL.name}
        sx={{
          position: "relative",
          overflow: "hidden",
          color: "#FFFFFF",
          bgcolor: "#0F2A52",
          display: "flex",
          alignItems: { xs: "center", lg: "flex-end" },
          px: { xs: 2.5, lg: 5 },
          py: { xs: 1.5, lg: 6 },
        }}
      >
        <Box
          component="img"
          src={facade}
          alt=""
          sx={{
            display: { xs: "none", lg: "block" },
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,30,62,.55) 0%, rgba(10,30,62,.94) 75%)",
          }}
        />
        <Stack
          direction={{ xs: "row", lg: "column" }}
          spacing={{ xs: 1.5, lg: 2.5 }}
          sx={{ position: "relative", alignItems: { xs: "center", lg: "flex-start" } }}
        >
          <Crest height={88} inverted decorative sx={{ display: { xs: "none", lg: "block" } }} />
          <Crest height={36} inverted decorative sx={{ display: { xs: "block", lg: "none" } }} />
          <div>
            <Typography
              variant="overline"
              component="p"
              sx={{ color: "#F7CD8C", lineHeight: 1.4, display: { xs: "none", lg: "block" } }}
            >
              {SCHOOL.city} · desde {SCHOOL.founded}
            </Typography>
            <Typography
              component="p"
              sx={{ fontFamily: "Lora, Georgia, serif", fontWeight: 700, fontSize: { xs: 16, lg: 30 }, lineHeight: 1.15 }}
            >
              {SCHOOL.name}
            </Typography>
            <Typography sx={{ display: { xs: "none", lg: "block" }, mt: 1.5, opacity: 0.9 }}>
              {SCHOOL.motto}
            </Typography>
          </div>
        </Stack>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", px: { xs: 1, sm: 2 }, pt: 1 }}>
          <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} color="inherit">
            Volver a la web
          </Button>
          <ThemeToggle />
        </Stack>
        <Box
          component="main"
          id="acceso"
          tabIndex={-1}
          sx={{
            flexGrow: 1,
            display: "grid",
            alignContent: "center",
            justifyItems: "center",
            px: { xs: 2, sm: 3 },
            py: { xs: 3, sm: 5 },
            outline: "none",
            "& > *": { width: "100%", maxWidth: "28rem" },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
