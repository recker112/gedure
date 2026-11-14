/**
 * MUI
 */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const BACKGROUNDS = {
  default: "background.default",
  paper: "background.paper",
  tint: "primary.light",
};

/**
 * Bloque de página: <section> con su encabezado h2 (que la etiqueta para
 * lectores de pantalla), antetítulo y entradilla opcionales.
 */
export default function Section({ id, eyebrow, title, subtitle, bg = "default", align = "left", maxWidth = "lg", children }) {
  const headingId = `${id}-titulo`;

  return (
    <Box component="section" id={id} aria-labelledby={headingId} sx={{ bgcolor: BACKGROUNDS[bg], py: { xs: 7, md: 10 } }}>
      <Container maxWidth={maxWidth}>
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: align, maxWidth: align === "center" ? 720 : "none", mx: align === "center" ? "auto" : 0 }}>
          {eyebrow && (
            <Typography variant="overline" color="secondary" component="p">
              {eyebrow}
            </Typography>
          )}
          <Typography id={headingId} variant="h3" component="h2">
            {title}
          </Typography>
          {subtitle && (
            <Typography color="textSecondary" sx={{ mt: 1.5, fontSize: 18 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {children}
      </Container>
    </Box>
  );
}
