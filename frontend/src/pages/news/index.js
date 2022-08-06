import React, { useEffect } from "react";

//MUI
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Form
import { useForm } from "react-hook-form";
import { InputHook } from "../../components/form/inputs";
import PreviewNews from "./PreviewNews";

// Components
import InfiniteScroll from "react-infinite-scroll-component";
import useNotifier from "../../hooks/useNotifier";
import Footer from "../../components/Footer";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { resetDataRequest, updateInputs } from "../../store/slices/requestStatus";
import { getNewsPreviews } from "../../store/slices/requestStatus/async_trunk/news/getNewsPreviews";

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function News() {
  useNotifier();

  // NOTA(RECKER): RTK
  const { news: { loading, data, error, hasFinish, search }, auth, count_notify } = useSelector(
    (state) => ({
      news: state.requestStatus.newsPreview,
      auth: state.auth.auth,
      count_notify: state.auth.notify.count,
    }),
  );
  const dispatch = useDispatch();

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Registros - La Candelaria` : 'Registros - La Candelaria';

  const { control, handleSubmit } = useForm();

  // NOTA(RECKER): Cargar noticias
  useEffect(() => {
    const promise = dispatch(getNewsPreviews());
    return () => {
      promise.abort();
      dispatch(resetDataRequest({ select: 'newsPreview' }));
    };
  }, [dispatch]);

  // NOTA(RECKER): Form request
  const onSubmit = async (data) => {
    await dispatch(updateInputs({ select: 'newsPreview', input: 'search', value: data.search }));
    await dispatch(getNewsPreviews());
  };

  return (
    <>
      <Box component="main" sx={classes.container}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
              <Typography variant="h4" className="text__bold--big">
                Noticias
              </Typography>
            </Grid>
            <Grid item xs sm>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <InputHook
                  control={control}
                  name="search"
                  size="small"
                  label="Buscar noticia"
                  defaultValue={search}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" type="submit">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Grid>

            {/*NOTA(RECKER): Loading*/}
            {loading && data.length === 0 && (
              <Grid container justifyContent="center" item xs={12}>
                <CircularProgress />
              </Grid>
            )}

            {/*NOTA(RECKER): Obtener datos*/}
            {data.length > 0 && (
              <Grid item xs={12}>
                <InfiniteScroll
                  dataLength={data.length}
                  hasMore={!hasFinish}
                  next={() => {
                    dispatch(getNewsPreviews());
                  }}
                  scrollThreshold={0.8}
                  loader={
                    <Grid
                      sx={{ marginTop: 2, overflow: "hidden" }}
                      container
                      justifyContent="center"
                    >
                      <CircularProgress />
                    </Grid>
                  }
                  endMessage={
                    <Typography sx={{ marginTop: 2 }} align="center">
                      No hay más noticias publicadas.
                    </Typography>
                  }
                >
                  <Grid container spacing={2} justifyContent="center">
                    {data.map((data, index) => (
                      <PreviewNews key={index} data={data} />
                    ))}
                  </Grid>
                </InfiniteScroll>
              </Grid>
            )}

            {/*NOTA(RECKER): Error crítico*/}
            {error && (
              <Grid item xs={12}>
                <Typography align="center">
                  Se ha producido un error al intentar obtener los datos,
                  intente recargar la página.
                </Typography>
              </Grid>
            )}

            {/*NOTA(RECKER): Error buscador*/}
            {((data.length === 0 && hasFinish) && search.length !== 0) && (
              <Grid item xs={12}>
                <Typography align="center">
                  No se ha encontrado nada relacionado con "{search}".
                  <br />
                  Intente probar con otras palabras.
                </Typography>
              </Grid>
            )}

            {/*NOTA(RECKER): Noticia no encontrada*/}
            {(data.length === 0 && hasFinish && search.length === 0) && (
              <Grid item xs={12}>
                <Typography align="center">
                  No hay noticias publicadas.
                </Typography>
              </Grid>
            )}  
          </Grid>
        </Container>
      </Box>
      {!auth && <Footer />}
    </>
  );
}
