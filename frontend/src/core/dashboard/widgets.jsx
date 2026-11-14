/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/**
 * Components
 */
import { announcementsFor } from "../announcements/mockData";
import { latestNews, formatNewsDate } from "../news/newsData";

/** Saludo del inicio: h1 y una sola frase, sin adornos. */
export function Greeting({ name, subtitle }) {
  return (
    <Box component="header">
      <Typography variant="h4" component="h1" sx={{ fontSize: { xs: 28, md: 34 } }}>
        Hola, {name}
      </Typography>
      {subtitle && (
        <Typography color="textSecondary" sx={{ mt: 0.5, fontSize: 17 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

/** Bloque con título (h2), enlace «Ver todo» y una lista dentro de una tarjeta. */
export function ListBlock({ title, moreLabel, moreTo, children }) {
  return (
    <Box component="section" aria-label={title}>
      <Stack direction="row" sx={{ alignItems: "baseline", justifyContent: "space-between", mb: 1.25, gap: 1 }}>
        <Typography variant="h6" component="h2" sx={{ fontSize: 18 }}>
          {title}
        </Typography>
        {moreTo && (
          <Button component={RouterLink} to={moreTo} size="small">
            {moreLabel}
          </Button>
        )}
      </Stack>
      <Card>{children}</Card>
    </Box>
  );
}

/** Comunicados sin leer de la vista (máximo `limit`). */
export function UnreadAnnouncements({ role, limit = 3 }) {
  const unread = announcementsFor(role).filter((a) => !a.read[role]);

  return (
    <ListBlock title="Comunicados sin leer" moreLabel="Ver todos" moreTo="/gedure/comunicados">
      {unread.length === 0 ? (
        <Typography color="textSecondary" sx={{ p: 2.5 }}>
          Estás al día: no tienes comunicados pendientes.
        </Typography>
      ) : (
        <List disablePadding>
          {unread.slice(0, limit).map((a, i) => (
            <ListItemButton key={a.id} component={RouterLink} to="/gedure/comunicados" divider={i < Math.min(unread.length, limit) - 1} sx={{ px: 2.5, py: 1.5 }}>
              <ListItemText
                primary={a.title}
                secondary={a.important ? `Importante · ${a.date}` : a.date}
                slotProps={{ primary: { sx: { fontWeight: 700 } }, secondary: { sx: a.important ? { color: "secondary.main", fontWeight: 600 } : undefined } }}
              />
              <ChevronRightIcon color="action" aria-hidden />
            </ListItemButton>
          ))}
        </List>
      )}
    </ListBlock>
  );
}

/** Noticias del colegio, discreto (las mismas de la web; detalle dentro del panel). */
export function SchoolNewsBlock({ limit = 2 }) {
  return (
    <ListBlock title="Noticias del colegio" moreLabel="Ver noticias" moreTo="/gedure/noticias">
      <List disablePadding>
        {latestNews(limit).map((n, i) => (
          <ListItemButton key={n.slug} component={RouterLink} to={`/gedure/noticias/${n.slug}`} divider={i < limit - 1} sx={{ px: 2.5, py: 1.25 }}>
            <ListItemText primary={n.title} secondary={formatNewsDate(n.date)} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
            <ChevronRightIcon color="action" aria-hidden />
          </ListItemButton>
        ))}
      </List>
    </ListBlock>
  );
}

/** Accesos rápidos: `{ label, to, icon }`. */
export function QuickLinks({ title = "Accesos rápidos", links }) {
  return (
    <ListBlock title={title}>
      <List disablePadding>
        {links.map(({ label, to, icon: Icon }, i) => (
          <ListItemButton key={to + label} component={RouterLink} to={to} divider={i < links.length - 1} sx={{ px: 2.5, py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: "primary.main" }}>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
            <ChevronRightIcon color="action" aria-hidden />
          </ListItemButton>
        ))}
      </List>
    </ListBlock>
  );
}
