/**
 * React
 */
import { Link, useParams } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * Components
 */
import Fallback from "../../components/routers/Fallback";
import useTitleHook from "../../hooks/utils/useTitleHook";
import { NewsCover } from "./NewsCard";
import { findNews, formatNewsDate } from "./newsData";

export default function NewsShowPage() {
  const { slug } = useParams();
  const item = findNews(slug);
  useTitleHook(item ? item.title : "Noticia no encontrada");

  if (!item) {
    return <Fallback component="section" text="Noticia no encontrada." homeButton />;
  }

  return (
    <Container maxWidth="md" component="article" sx={{ py: { xs: 4, md: 7 } }}>
      <Breadcrumbs aria-label="Ruta de navegación" sx={{ mb: 3 }}>
        <MuiLink component={Link} to="/" color="inherit">
          Inicio
        </MuiLink>
        <MuiLink component={Link} to="/noticias" color="inherit">
          Noticias
        </MuiLink>
        <Typography color="textPrimary" aria-current="page" noWrap sx={{ maxWidth: 220 }}>
          {item.title}
        </Typography>
      </Breadcrumbs>

      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
        <Chip label={item.category} size="small" color="secondary" />
        <Typography variant="body2" color="textSecondary" component="time" dateTime={item.date}>
          {formatNewsDate(item.date)}
        </Typography>
      </Stack>
      <Typography variant="h3" component="h1" gutterBottom>
        {item.title}
      </Typography>
      <Typography color="textSecondary" sx={{ fontSize: 19, mb: 4 }}>
        {item.excerpt}
      </Typography>

      <Box sx={{ borderRadius: 4, overflow: "hidden", mb: 4 }}>
        <NewsCover height={{ xs: 200, md: 320 }} />
      </Box>

      <Stack spacing={2} sx={{ fontSize: 17 }}>
        {item.body.map((paragraph) => (
          <Typography key={paragraph.slice(0, 24)} sx={{ fontSize: "inherit", lineHeight: 1.75 }}>
            {paragraph}
          </Typography>
        ))}
      </Stack>

      <Button component={Link} to="/noticias" startIcon={<ArrowBackIcon />} sx={{ mt: 5 }}>
        Volver a noticias
      </Button>
    </Container>
  );
}
