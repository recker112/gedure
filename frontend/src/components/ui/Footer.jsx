/**
 * React
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";

/**
 * Components
 */
import Crest from "../brand/Crest";
import GedureLogo from "../brand/GedureLogo";
import { loginItem, navItems } from "../menu/navItems";
import { MAPS_URL, SCHOOL } from "../../school";

const SOCIAL_ICONS = { instagram: InstagramIcon, facebook: FacebookIcon, youtube: YouTubeIcon };

// Fuera del render: el año no cambia durante la visita.
const YEAR = new Date().getFullYear();

const linkSx = { color: "inherit", opacity: 0.85, "&:hover": { opacity: 1 } };

function FooterHeading({ children }) {
  return (
    <Typography component="h2" variant="overline" sx={{ opacity: 0.7, display: "block", mb: 1.5 }}>
      {children}
    </Typography>
  );
}

function ContactLine({ Icon, children }) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
      <Icon fontSize="small" sx={{ mt: "2px", opacity: 0.8 }} aria-hidden />
      <Typography variant="body2" component="span" sx={{ opacity: 0.9 }}>
        {children}
      </Typography>
    </Stack>
  );
}

/** Pie de la web pública: identidad, enlaces, contacto, redes y créditos. */
export default function Footer() {
  const { address, contact } = SCHOOL;

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        bgcolor: theme.palette.mode === "dark" ? "background.paper" : "#0F2A52",
        color: theme.palette.mode === "dark" ? "text.primary" : "#F3F6FB",
        borderTop: 1,
        borderColor: "divider",
        pt: { xs: 6, md: 8 },
        pb: 4,
      })}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
              <Crest height={56} inverted decorative />
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                  {SCHOOL.shortName}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {SCHOOL.motto}
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 360 }}>
              {SCHOOL.fullName}. Educar para la vida y para el trabajo desde {SCHOOL.founded}.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <FooterHeading>Navegación</FooterHeading>
            <Stack component="nav" aria-label="Enlaces del pie" spacing={1}>
              {navItems.map(({ label, to }) => (
                <Link key={to} component={RouterLink} to={to} sx={linkSx}>
                  {label}
                </Link>
              ))}
              <Link component={RouterLink} to={loginItem.to} sx={linkSx}>
                Gedure
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ order: { xs: 3, sm: 0 } }}>
            <FooterHeading>Contacto</FooterHeading>
            <Stack spacing={1.25} component="address" sx={{ fontStyle: "normal" }}>
              <ContactLine Icon={PlaceOutlinedIcon}>
                <Link href={MAPS_URL} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                  {address.street}, {SCHOOL.city}, {address.municipality}, {address.state}
                </Link>
              </ContactLine>
              <ContactLine Icon={PhoneOutlinedIcon}>{contact.phone ?? "Teléfono: próximamente"}</ContactLine>
              <ContactLine Icon={MailOutlineIcon}>
                {contact.email ? (
                  <Link href={`mailto:${contact.email}`} sx={linkSx}>
                    {contact.email}
                  </Link>
                ) : (
                  "Correo: próximamente"
                )}
              </ContactLine>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <FooterHeading>Síguenos</FooterHeading>
            <Stack direction="row" spacing={0.5}>
              {SCHOOL.socials.map(({ id, label, url }) => {
                const Icon = SOCIAL_ICONS[id];
                return url ? (
                  <IconButton key={id} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} color="inherit">
                    <Icon />
                  </IconButton>
                ) : (
                  <Tooltip key={id} title={`${label}: próximamente`}>
                    {/* span: un botón deshabilitado no dispara el tooltip */}
                    <span>
                      <IconButton aria-label={`${label} (próximamente)`} color="inherit" disabled sx={{ "&.Mui-disabled": { color: "inherit", opacity: 0.45 } }}>
                        <Icon />
                      </IconButton>
                    </span>
                  </Tooltip>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "currentColor", opacity: 0.15 }} />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}>
          <Typography variant="body2" sx={{ opacity: 0.75 }}>
            © {YEAR} {SCHOOL.name}
          </Typography>
          <Link
            href={SCHOOL.gedureRepo}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ...linkSx, display: "inline-flex", alignItems: "center", gap: 1, fontSize: 14 }}
          >
            Desarrollado con <GedureLogo size={18} /> Gedure
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
