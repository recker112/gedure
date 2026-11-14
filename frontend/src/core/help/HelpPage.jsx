/**
 * React
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * MUI
 */
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import { SectionCard } from "../../components/ui/panel/cards";
import { useMockRole } from "../../hooks/app/useMockRole";
import SupportForm from "./SupportForm";
import { FAQ } from "./mockData";

/**
 * Ayuda: escribir al colegio (sin volver a dar los datos: con sesión,
 * /contactanos redirige aquí, a #soporte) y unas pocas preguntas frecuentes.
 */
export default function HelpPage() {
  const { role } = useMockRole();
  const { hash } = useLocation();
  const faq = FAQ.filter((f) => f.roles.includes(role)).slice(0, 4);

  useEffect(() => {
    if (hash === "#soporte") document.getElementById("soporte")?.scrollIntoView?.({ block: "start" });
  }, [hash]);

  return (
    <PanelPage title="Ayuda" description="Escríbenos o revisa las dudas más comunes.">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <SectionCard title="Escribir al colegio">
            <Box id="soporte" sx={{ scrollMarginTop: 96 }}>
              <SupportForm />
            </Box>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h6" component="h2" sx={{ fontSize: 17, mb: 1.5 }}>
            Preguntas frecuentes
          </Typography>
          {faq.map((f) => (
            <Accordion key={f.id} disableGutters elevation={0} sx={{ bgcolor: "transparent", "&::before": { opacity: 1 } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-${f.id}`} id={`faq-${f.id}-h`} sx={{ px: 0 }}>
                <Typography sx={{ fontWeight: 600 }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails id={`faq-${f.id}`} sx={{ px: 0, pt: 0 }}>
                <Typography color="textSecondary">{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </PanelPage>
  );
}
