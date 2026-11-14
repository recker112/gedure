/**
 * React
 */
import { Link } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChurchOutlinedIcon from "@mui/icons-material/ChurchOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutlined";

/**
 * Components
 */
import Section from "../../components/ui/Section";
import GedureLogo from "../../components/brand/GedureLogo";
import useTitleHook from "../../hooks/utils/useTitleHook";
import HomeHero from "./HomeHero";
import NewsCard from "../news/NewsCard";
import { latestNews } from "../news/newsData";
import { levels } from "./levels";
import { MISSION, VISION } from "../about/identity";
import { SCHOOL } from "../../school";

const PILLARS = [
  { title: "Formación integral", text: "Desarrollo académico, humano y espiritual de cada estudiante.", Icon: Diversity3OutlinedIcon },
  { title: "Fe católica", text: "Valores cristianos de la mano de la Parroquia Nuestra Señora de Candelaria.", Icon: ChurchOutlinedIcon },
  { title: "Educación para el trabajo", text: "Filosofía A.P.E.P.: talleres y menciones técnicas con salida laboral.", Icon: EngineeringOutlinedIcon },
  { title: "Pasantías", text: "En el último año, los futuros Técnicos Medios se inician en el campo laboral.", Icon: WorkOutlineIcon },
];

const FEATURED_NEWS = latestNews(3);

function IconBadge({ Icon }) {
  return (
    <Box sx={{ width: 48, height: 48, borderRadius: 3, display: "grid", placeItems: "center", bgcolor: "primary.light", color: "primary.main" }}>
      <Icon aria-hidden />
    </Box>
  );
}

export default function HomePage() {
  useTitleHook(null);

  return (
    <>
      <HomeHero />

      <Section id="presentacion" eyebrow="Quiénes somos" title="Educar para la vida y para el trabajo">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography color="textSecondary" sx={{ fontSize: 17 }}>
              {SCHOOL.summary}
            </Typography>
            <Button component={Link} to="/nosotros" endIcon={<ArrowForwardIcon />} sx={{ mt: 3 }}>
              Nuestra historia
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={2}>
              {PILLARS.map(({ title, text, Icon }) => (
                <Grid key={title} size={{ xs: 12, sm: 6 }}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <IconBadge Icon={Icon} />
                      <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                        {title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Section>

      <Section
        id="niveles"
        bg="paper"
        align="center"
        eyebrow="Oferta académica"
        title="Etapas educativas"
        subtitle="Acompañamos a nuestros estudiantes desde Primaria hasta su título de Técnico Medio."
      >
        <Grid container spacing={2.5}>
          {levels.map(({ title, range, description, Icon }) => (
            <Grid key={title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 1.5 }}>
                    <IconBadge Icon={Icon} />
                    <Typography variant="body2" color="secondary" sx={{ fontWeight: 700 }}>
                      {range}
                    </Typography>
                  </Stack>
                  <Typography variant="h6" component="h3">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section id="identidad" eyebrow="Identidad" title="Misión y visión">
        <Grid container spacing={3}>
          {[
            { title: "Misión", text: MISSION },
            { title: "Visión", text: VISION },
          ].map(({ title, text }) => (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <Box sx={{ height: "100%", p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: "primary.light", borderLeft: 4, borderColor: "secondary.main" }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {title}
                </Typography>
                <Typography color="textSecondary">{text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section id="noticias-destacadas" bg="paper" eyebrow="Actualidad" title="Últimas noticias">
        <Grid container spacing={2.5}>
          {FEATURED_NEWS.map((item) => (
            <Grid key={item.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <NewsCard item={item} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button component={Link} to="/noticias" variant="outlined" endIcon={<ArrowForwardIcon />}>
            Ver todas las noticias
          </Button>
        </Box>
      </Section>

      <Box component="section" aria-labelledby="cta-titulo" sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box
            sx={(theme) => ({
              p: { xs: 4, md: 6 },
              borderRadius: 6,
              color: "#FFFFFF",
              background: `linear-gradient(120deg, #0F2A52 0%, ${theme.palette.mode === "dark" ? "#1B3A6E" : theme.palette.primary.main} 100%)`,
            })}
          >
            <Grid container spacing={3} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography id="cta-titulo" variant="h4" component="h2">
                  ¿Eres estudiante, representante o docente?
                </Typography>
                <Typography sx={{ mt: 1, opacity: 0.9 }}>
                  Consulta boletas, pagos y avisos del colegio en Gedure, nuestra plataforma de gestión escolar.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction={{ xs: "column", sm: "row", md: "column" }} spacing={1.5} sx={{ alignItems: { md: "flex-end" } }}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    size="large"
                    startIcon={<GedureLogo size={18} />}
                    sx={{ bgcolor: "#FFFFFF", color: "#0F2A52", "&:hover": { bgcolor: "#E8EFFA" } }}
                  >
                    Entrar a Gedure
                  </Button>
                  <Button component={Link} to="/contactanos" size="large" sx={{ color: "#FFFFFF" }}>
                    Escríbenos
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
