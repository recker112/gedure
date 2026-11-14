/**
 * React
 */
import { Link } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/**
 * Components
 */
import Crest from "../../components/brand/Crest";
import { SCHOOL } from "../../school";
import facade from "../../assets/img/fachada.webp";

/**
 * Portada: foto de la fachada con un velo azul para que el texto blanco
 * cumpla contraste sea cual sea la foto.
 */
export default function HomeHero() {
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        color: "#FFFFFF",
        overflow: "hidden",
        bgcolor: "#0F2A52",
        minHeight: { xs: 520, md: 600 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={facade}
        alt=""
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(100deg, rgba(10,30,62,.94) 0%, rgba(15,42,82,.82) 45%, rgba(15,42,82,.35) 100%)",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 8, md: 12 } }}>
        <Stack spacing={3} sx={{ maxWidth: 680 }}>
          <Crest height={88} inverted decorative />
          <Typography variant="overline" component="p" sx={{ color: "#F7CD8C" }}>
            {SCHOOL.name} · {SCHOOL.city}
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 40, sm: 52, md: 64 }, lineHeight: 1.05 }}>
            {SCHOOL.motto}
          </Typography>
          <Typography sx={{ fontSize: { xs: 17, md: 20 }, opacity: 0.92 }}>
            Formación integral en valores cristianos católicos, desde Primaria hasta la Media Técnica. Educar para la vida y para el trabajo.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button component={Link} to="/nosotros" variant="contained" color="secondary" size="large" endIcon={<ArrowForwardIcon />}>
              Conoce el colegio
            </Button>
            <Button
              component={Link}
              to="/contactanos"
              variant="outlined"
              size="large"
              sx={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,.6)", "&:hover": { borderColor: "#FFFFFF", bgcolor: "rgba(255,255,255,.08)" } }}
            >
              Contáctanos
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
