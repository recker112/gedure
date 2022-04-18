import React, { useEffect } from 'react';

// React Router
import { useParams, useNavigate } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Components
import Noticia from './Noticia';
import Footer from '../../../components/Footer';
import useNotifier from '../../../hooks/useNotifier';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { newsData, resetData } from '../../../store/slices/news/show';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Show() {
  let { slug } = useParams();
  useNotifier({
    messageTo200: false,
    messageTo404: false,
  });

  const { news: { loading, data }, auth } = useSelector(state => ({
    news: state.newsShow,
    auth: state.auth.auth,
  }));
  const dispatch = useDispatch();
  document.title = data.title ? `La Candelaria - ${data.title}` : `La Candelaria`;

  const navigate = useNavigate();

  const handleReturn = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/noticias');
    }
  }

  useEffect(() => {
    let promise = null;
    if (loading) {
      promise = dispatch(newsData(slug));
    }

    return () => {
      promise.abort();
      dispatch(resetData());
    }
    // eslint-disable-next-line
  }, [dispatch, slug])

  return (
    <>
      <Box componet='main' sx={classes.container}>
        <Container>
          <Box mb={3}>
						<Grid container justifyContent='space-between'>
							<Tooltip title='Volver' arrow>
								<IconButton onClick={handleReturn} aria-label="return">
									<ArrowBackIcon />
								</IconButton>
							</Tooltip>
						</Grid>
					</Box>
        </Container>

        {data?.slug && (
					<Noticia {...data} />
				)}

        {loading && (
          <Grid container justifyContent='center'>
            <CircularProgress />
          </Grid>
        )}

        {!data?.slug && !loading && (
					<Grid container justifyContent='center'>
						<Typography>
							No se pudo encontrar esta noticia.
						</Typography>
					</Grid>
				)}
      </Box>

      {!auth && <Footer />}
    </>
  )
}
