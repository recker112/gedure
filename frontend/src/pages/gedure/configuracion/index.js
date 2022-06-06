import React, { Suspense } from 'react';

// Router
import { Outlet } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Fade, Grid, Slide } from '@mui/material';

// Components
import NavTabs from './NavTabs';
import useNotifier from '../../../hooks/useNotifier';

const classes = {
  container: {
    flexGrow: 1,
  },
  header: (theme) => ({
		background: theme.palette.primary.main,
		height: 300,
		borderRadius: '0px 0px 15px 15px',
    display: 'flex',
    flexDirection: 'column',
	}),
  content: {
		marginTop: 2
	}
};

function Loading() {
	return (
		<Box align='center'>
			<CircularProgress />
		</Box>
	);
}

function Header() {
  return (
    <Container sx={{height: '100%', userSelect: 'none'}}>
      <Grid container justifyContent='flex-start' alignItems='center' sx={{height: '100%'}}>
				<Grid item xs>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize', md: 'h4.fontSize' }} className='text__bold--semi'>
            Configuración del sistema,
					</Box>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize' }} className='text__bold--semi'>
						adapte <Box color='secondary.main' component='span'>Gedure</Box> a su gusto.
					</Box>
				</Grid>
			</Grid>
    </Container>
  );
}

export default function GDConfig() {
  document.title = 'Configuración del sistema - La Candelaria';
  useNotifier();

  return (
    <Box component='main' sx={classes.container}>
      <Slide direction="down" in={true} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={classes.header}>
          <Header />
          <NavTabs />
        </Box>
      </Slide>
      <Fade in={true} style={{ transitionDelay: '1000ms' }}>
        <Container sx={classes.content}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Container>
      </Fade>
    </Box>
  )
}
