/**
 * MUI
 */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

/**
 * Cabecera de las páginas interiores: antetítulo, h1 y entradilla sobre una
 * franja tintada del color principal.
 */
export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        py: { xs: 6, md: 9 },
        background: `linear-gradient(160deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
        borderBottom: 1,
        borderColor: "divider",
      })}
    >
      <Container maxWidth="lg">
        {eyebrow && (
          <Typography variant="overline" color="secondary" component="p">
            {eyebrow}
          </Typography>
        )}
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
        {description && (
          <Typography color="textSecondary" sx={{ mt: 2, maxWidth: 720, fontSize: { xs: 17, md: 19 } }}>
            {description}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
}
