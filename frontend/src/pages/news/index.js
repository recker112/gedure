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

//Form
import { useForm } from "react-hook-form";
import { InputHook } from "../../components/form/inputs";
import PreviewNews from "./PreviewNews";

//Components
import InfiniteScroll from "react-infinite-scroll-component";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { newsPreview, resetData, updateSearch } from "../../store/slices/news";
import { logout } from "../../store/slices/auth";

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Index() {
  const { loading, data, error, hasFinish, search } = useSelector(
    (state) => state.news
  );
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm();

  useEffect(() => {
    const promise = dispatch(newsPreview());
    return () => {
      promise.abort();
      dispatch(resetData());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    await dispatch(updateSearch(data.search));
    await dispatch(newsPreview());
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

            {loading && data.length === 0 && (
              <Grid container justifyContent="center" item xs={12}>
                <CircularProgress />
              </Grid>
            )}

            {data.length > 0 && (
              <Grid item xs={12}>
                <InfiniteScroll
                  dataLength={0}
                  hasMore={!hasFinish}
                  next={() => {
                    dispatch(newsPreview());
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
                      <PreviewNews key={index} />
                    ))}
                  </Grid>
                </InfiniteScroll>
              </Grid>
            )}

            {error && (
              <Grid item xs={12}>
                <Typography align="center">
                  Se ha producido un error al intentar obtener los datos,
                  intente recargar la página.
                </Typography>
              </Grid>
            )}

            {data.length === 0 && hasFinish && search.length !== 0 && (
              <Grid item xs={12}>
                <Typography align="center">
                  No se ha encontrado nada relacionado con "{search}".
                  <br />
                  Intente probar con otras palabras.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
