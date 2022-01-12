import React, { useEffect } from 'react';

// React Router
import { useParams, useNavigate } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import Noticia from './Noticia';
import { resetData } from '../../../store/slices/news/show';
import Footer from '../../../components/Footer';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Show() {
  let { slug } = useParams();

  const { news: { loading, data }, auth } = useSelector(state => ({
    news: state.newsShow,
    auth: state.auth.auth,
  }));
  const dispatch = useDispatch();
  document.title = data.title ? `La Candelaria - ${data.title}` : `La Candelaria`;

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/noticias');
  }

  useEffect(() => {
    //
    return () => {
      dispatch(resetData());
    }
  }, [dispatch])

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
