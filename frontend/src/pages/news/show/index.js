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
import { getNewsShow } from '../../../store/slices/requestStatus/async_trunk/news/getNewsShow';
import { resetDataRequest } from '../../../store/slices/requestStatus';

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

  const { news: { loading, data }, auth, count_notify } = useSelector(state => ({
    news: state.requestStatus.newsShow,
    auth: state.auth.auth,
    count_notify: state.auth.notify.count,
  }));
  
  const dispatch = useDispatch();
  // NOTA(RECKER): Title
  document.title = data.title ? `${data.title} - La Candelaria` : ` - La Candelaria`;
  document.title = count_notify > 0 ? `(${count_notify}) ${document.title}` : document.title;

  const navigate = useNavigate();

  const handleReturn = () => {
    if (window.history.state && window.history.state.usr?.backPanel) {
      navigate('/gedure/publicaciones');
    } else {
      navigate('/noticias');
    }
  }

  useEffect(() => {
    let promise = null;
    if (loading) {
      promise = dispatch(getNewsShow(slug));
    }

    return () => {
      if (promise) {
        promise.abort();
      }
      dispatch(resetDataRequest({ select: 'newsShow' }));
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
