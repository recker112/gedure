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
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

/**
 * Components
 */
import PageHeader from "../../components/ui/PageHeader";
import useTitleHook from "../../hooks/utils/useTitleHook";
import ContactForm from "./ContactForm";
import { MAPS_URL, osmEmbedUrl, SCHOOL } from "../../school";

const SOON = "Próximamente";

function InfoRow({ Icon, title, children }) {
  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ width: 44, height: 44, flex: "none", borderRadius: 3, display: "grid", placeItems: "center", bgcolor: "primary.light", color: "primary.main" }}>
        <Icon aria-hidden />
      </Box>
      <Box>
        <Typography variant="subtitle2" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          {children}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function ContactPage() {
  useTitleHook("Contacto");
  const { address, contact } = SCHOOL;

  return (
    <>
      <PageHeader eyebrow="Contáctanos" title="Contacto" description="¿Tienes dudas sobre inscripciones, horarios o trámites? Escríbenos o visítanos en Turmero." />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 4, md: 5 }}>
          <Grid size={{ xs: 12, md: 5 }} component="section" aria-labelledby="donde-titulo">
            <Typography id="donde-titulo" variant="h4" component="h2" gutterBottom>
              Dónde estamos
            </Typography>
            <Stack spacing={2.5} component="address" sx={{ fontStyle: "normal", mt: 3 }}>
              <InfoRow Icon={PlaceOutlinedIcon} title="Dirección">
                {address.street}, {SCHOOL.city}
                <br />
                {address.parish}, {address.municipality}
                <br />
                {address.state}
              </InfoRow>
              <InfoRow Icon={PhoneOutlinedIcon} title="Teléfono">
                {contact.phone ?? SOON}
              </InfoRow>
              <InfoRow Icon={MailOutlineIcon} title="Correo">
                {contact.email ?? SOON}
              </InfoRow>
              <InfoRow Icon={ScheduleOutlinedIcon} title="Horario de atención">
                {contact.schedule ?? SOON}
              </InfoRow>
            </Stack>

            <Box component="dl" sx={{ mt: 4, display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 2, rowGap: 0.75, fontSize: 14 }}>
              {address.references.map(({ label, value }) => (
                <Box key={label} sx={{ display: "contents" }}>
                  <Typography component="dt" variant="body2" sx={{ fontWeight: 700 }}>
                    {label}
                  </Typography>
                  <Typography component="dd" variant="body2" color="textSecondary" sx={{ m: 0 }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ overflow: "hidden" }}>
              <Box
                component="iframe"
                title={`Mapa de la ubicación de ${SCHOOL.shortName}`}
                src={osmEmbedUrl(SCHOOL.coords)}
                loading="lazy"
                referrerPolicy="no-referrer"
                sx={{ display: "block", width: "100%", height: { xs: 300, md: 380 }, border: 0, bgcolor: "action.hover" }}
              />
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                <Typography variant="body2" color="textSecondary">
                  Plaza Mariño de Turmero
                </Typography>
                <Button href={MAPS_URL} target="_blank" rel="noopener noreferrer" size="small" endIcon={<OpenInNewIcon />}>
                  Abrir en Google Maps
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card component="section" aria-labelledby="mensaje-titulo" sx={{ mt: { xs: 5, md: 8 } }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography id="mensaje-titulo" variant="h4" component="h2">
              Envíanos un mensaje
            </Typography>
            <Typography color="textSecondary" sx={{ mt: 1, mb: 3 }}>
              Te responderemos al correo que indiques.
            </Typography>
            <ContactForm />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
