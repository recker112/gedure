/**
 * React Router
 */
import { Link as RouterLink, useParams } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import { EmptyState } from "../../components/ui/panel/cards";
import { NewsCover } from "../news/NewsCard";
import { findNews, formatNewsDate } from "../news/newsData";

const BACK = "/gedure/noticias";

/**
 * Detalle de una noticia dentro del panel. Son las mismas publicaciones de la
 * web (core/news/newsData.js): con sesión, /noticias/:slug redirige aquí.
 */
export default function SchoolNewsShowPage() {
  const { slug } = useParams();
  const item = findNews(slug);

  if (!item) {
    return (
      <PanelPage title="Noticia no encontrada" crumbs={["No encontrada"]}>
        <Card>
          <EmptyState
            icon={NewspaperOutlinedIcon}
            title="No encontramos esta noticia"
            description="Puede que se haya retirado o que el enlace esté incompleto."
            action={
              <Button component={RouterLink} to={BACK} variant="contained">
                Ver noticias
              </Button>
            }
          />
        </Card>
      </PanelPage>
    );
  }

  return (
    <PanelPage title={item.title} crumbs={[item.title]}>
      <Box component="article" sx={{ maxWidth: 760 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
          <Chip label={item.category} size="small" color="secondary" />
          <Typography variant="body2" color="textSecondary" component="time" dateTime={item.date}>
            {formatNewsDate(item.date)}
          </Typography>
        </Stack>
        <Typography color="textSecondary" sx={{ fontSize: 18, mb: 3 }}>
          {item.excerpt}
        </Typography>
        <Box sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
          <NewsCover height={{ xs: 160, md: 260 }} />
        </Box>
        <Stack spacing={2} sx={{ fontSize: 17 }}>
          {item.body.map((paragraph) => (
            <Typography key={paragraph.slice(0, 24)} sx={{ fontSize: "inherit", lineHeight: 1.75 }}>
              {paragraph}
            </Typography>
          ))}
        </Stack>
        <Button component={RouterLink} to={BACK} startIcon={<ArrowBackIcon />} sx={{ mt: 4 }}>
          Volver a noticias
        </Button>
      </Box>
    </PanelPage>
  );
}
