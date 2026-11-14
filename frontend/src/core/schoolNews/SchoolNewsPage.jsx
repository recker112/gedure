/**
 * MUI
 */
import Grid from "@mui/material/Grid";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import NewsCard from "../news/NewsCard";
import { latestNews } from "../news/newsData";

/**
 * Noticias del colegio dentro de Gedure. Son las MISMAS publicaciones
 * públicas (audiencia "web"): reutiliza core/news (datos de ejemplo en
 * core/news/newsData.js) y el detalle se abre aquí dentro
 * (SchoolNewsShowPage). Con sesión, /noticias redirige a esta página.
 */
export default function SchoolNewsPage() {
  return (
    <PanelPage title="Noticias del colegio" description="Lo que publica el colegio, sin salir de Gedure.">
      <Grid container spacing={2.5}>
        {latestNews().map((item) => (
          <Grid key={item.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
            <NewsCard item={item} headingLevel="h2" basePath="/gedure/noticias" />
          </Grid>
        ))}
      </Grid>
    </PanelPage>
  );
}
