import React, { useEffect } from 'react';

// MUI
import { Box, Container, Fade, Grid, Slide } from '@mui/material';

// Components
import NotiBox from './NotiBox';
import useNotifier from '../../../hooks/useNotifier';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { NotiBoxData, resetData } from '../../../store/slices/gedure/home';

const classes = {
  container: {
    flexGrow: 1,
  },
  header: (theme) => ({
		background: theme.palette.primary.main,
		height: 400,
		borderRadius: '0px 0px 15px 15px'
	}),
  content: {
		position: 'relative',
		top: -80,
	}
};

function Header() {
  const username = useSelector(state => state.auth.user.username);

  return (
    <Container sx={{height: '100%', userSelect: 'none'}}>
      <Grid container justifyContent='flex-start' alignItems='center' sx={{height: '100%'}}>
				<Grid item xs>
					<Box color='primary.contrastText' fontSize={{ xs: 'h5.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }} className='text__bold--semi'>
						<Box color='secondary.main' component='span'>Hola</Box> {username},
					</Box>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize' }} className='text__bold--semi'>
						Bienveido a <Box color='secondary.main' component='span'>Gedure</Box>
					</Box>
				</Grid>
			</Grid>
    </Container>
  );
}

export default function Home() {
  document.title = 'Gedure - La Candelaria';
  useNotifier({
    messageTo200: false,
  });

  const { loading, data } = useSelector(state => state.gdHome);
  const dispatch = useDispatch();

  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(NotiBoxData());
    }

    return () => {
      if (loading) {
        promise.abort();
      }
      dispatch(resetData());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box component='main' sx={classes.container}>
      <Slide direction="down" in={true} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={classes.header}>
          <Header />
        </Box>
      </Slide>
      <Fade in={true} style={{ transitionDelay: '1000ms' }}>
        <Container sx={classes.content}>
          <Grid container justifyContent='center' spacing={2} data-tour='infoBox'>
            <NotiBox data={data.posts} loading={loading} />
          </Grid>
        </Container>
      </Fade>
    </Box>
  )
}
