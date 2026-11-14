/**
 * React
 */
import { Link } from "react-router-dom";

/**
 * MUI
 */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";

/**
 * Components
 */
import { formatNewsDate } from "./newsData";

/**
 * Portada de imagen de ejemplo hasta que las noticias traigan foto.
 */
export function NewsCover({ category, height = 160 }) {
  return (
    <Box
      aria-hidden
      sx={(theme) => ({
        height,
        position: "relative",
        display: "grid",
        placeItems: "center",
        color: "primary.main",
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
      })}
    >
      <NewspaperOutlinedIcon sx={{ fontSize: 48, opacity: 0.5 }} />
      {category && (
        <Chip label={category} size="small" color="secondary" sx={{ position: "absolute", top: 12, left: 12, fontWeight: 600 }} />
      )}
    </Box>
  );
}

/**
 * Tarjeta de noticia para el listado y la portada. `basePath`: dónde vive el
 * detalle (`/noticias` en la web, `/gedure/noticias` dentro del panel).
 */
export default function NewsCard({ item, headingLevel = "h3", basePath = "/noticias" }) {
  return (
    <Card component="article" sx={{ height: "100%" }}>
      <CardActionArea component={Link} to={`${basePath}/${item.slug}`} sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        <NewsCover category={item.category} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="caption" color="textSecondary" component="time" dateTime={item.date}>
            {formatNewsDate(item.date)}
          </Typography>
          <Typography variant="h6" component={headingLevel} sx={{ mt: 0.5, mb: 1, lineHeight: 1.3 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
