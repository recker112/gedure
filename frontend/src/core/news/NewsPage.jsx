/**
 * React
 */
import { useState } from "react";

/**
 * MUI
 */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

/**
 * Components
 */
import PageHeader from "../../components/ui/PageHeader";
import useTitleHook from "../../hooks/utils/useTitleHook";
import NewsCard from "./NewsCard";
import { latestNews, searchNews } from "./newsData";

const ALL_NEWS = latestNews();

export default function NewsPage() {
  useTitleHook("Noticias");
  const [query, setQuery] = useState("");
  const results = searchNews(ALL_NEWS, query);

  return (
    <>
      <PageHeader eyebrow="Actualidad" title="Noticias" description="Avisos, actividades y celebraciones de nuestra comunidad educativa.">
        <TextField
          type="search"
          label="Buscar noticia"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          size="small"
          sx={{ mt: 3, width: { xs: "100%", sm: 360 }, "& .MuiInputBase-root": { bgcolor: "background.paper" } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </PageHeader>

      <Container maxWidth="lg" component="section" aria-label="Listado de noticias" sx={{ py: { xs: 5, md: 8 } }}>
        {results.length > 0 ? (
          <Grid container spacing={2.5}>
            {results.map((item) => (
              <Grid key={item.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                <NewsCard item={item} headingLevel="h2" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography role="status" color="textSecondary" sx={{ textAlign: "center", py: 6 }}>
            No se ha encontrado nada relacionado con «{query}». Prueba con otras palabras.
          </Typography>
        )}
      </Container>
    </>
  );
}
