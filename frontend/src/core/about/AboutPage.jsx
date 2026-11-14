/**
 * MUI
 */
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Components
 */
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import useTitleHook from "../../hooks/utils/useTitleHook";
import { directivos } from "./directivos";
import { history, IDENTITY, MISSION, VISION } from "./identity";
import { SCHOOL } from "../../school";

const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

/** Línea de tiempo vertical (lista ordenada: el orden es significativo). */
function Timeline() {
  return (
    <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, position: "relative" }}>
      {history.map(({ year, title, text }, index) => (
        <Box
          component="li"
          key={year}
          sx={{
            position: "relative",
            pl: { xs: 4, sm: 0 },
            pb: index === history.length - 1 ? 0 : 4,
            display: { sm: "grid" },
            gridTemplateColumns: { sm: "120px 1fr" },
            columnGap: 4,
            // Línea vertical
            "&::before": {
              content: '""',
              position: "absolute",
              left: { xs: 7, sm: 127 },
              top: 6,
              bottom: index === history.length - 1 ? "auto" : 0,
              height: index === history.length - 1 ? 0 : "auto",
              borderLeft: 2,
              borderColor: "divider",
            },
            // Punto
            "&::after": {
              content: '""',
              position: "absolute",
              left: { xs: 0, sm: 120 },
              top: 4,
              width: 16,
              height: 16,
              borderRadius: "50%",
              bgcolor: "secondary.main",
              border: 3,
              borderColor: "background.default",
            },
          }}
        >
          <Typography sx={{ fontFamily: "Lora, Georgia, serif", fontWeight: 700, fontSize: 22, color: "primary.main", textAlign: { sm: "right" }, pr: { sm: 3 } }}>
            {year}
          </Typography>
          <Box sx={{ pl: { sm: 3 } }}>
            <Typography variant="h6" component="h3">
              {title}
            </Typography>
            <Typography color="textSecondary">{text}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default function AboutPage() {
  useTitleHook("Nosotros");

  return (
    <>
      <PageHeader eyebrow="Nosotros" title={SCHOOL.fullName} description={`Enfocados en el estudio y la fe en ${SCHOOL.city} desde ${SCHOOL.founded}.`} />

      <Section id="identidad" eyebrow="Identidad" title="Una obra de la Iglesia al servicio de la comunidad">
        <Grid container spacing={{ xs: 3, md: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {IDENTITY.map((paragraph) => (
                <Typography key={paragraph.slice(0, 24)} color="textSecondary" sx={{ fontSize: 17 }}>
                  {paragraph}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {[
                { title: "Misión", text: MISSION },
                { title: "Visión", text: VISION },
              ].map(({ title, text }) => (
                <Card key={title}>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {title}
                    </Typography>
                    <Typography color="textSecondary">{text}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Section>

      <Section id="historia" bg="paper" eyebrow="Reseña histórica" title="Nuestra historia" maxWidth="md">
        <Timeline />
      </Section>

      <Section id="directivos" eyebrow="Equipo" title="Directivos" subtitle="Las personas que dirigen y coordinan el día a día del colegio.">
        <Grid container spacing={2}>
          {directivos.map(({ name, role, photo }) => (
            <Grid key={name} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar src={photo ?? undefined} alt={photo ? `Foto de ${name}` : undefined} sx={{ width: 64, height: 64, bgcolor: "primary.light", color: "primary.main", fontWeight: 700 }}>
                    {initials(name)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                      {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {role}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </>
  );
}
