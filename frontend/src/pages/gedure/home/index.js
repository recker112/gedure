import React from 'react';

// MUI
import { Box, Container, Fade, Grid, Slide } from '@mui/material';

// Components
import NotiBox from './NotiBox';

// Redux
import { useSelector } from 'react-redux';

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
    <Container sx={{height: '100%'}}>
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
  document.title = 'La Candelaria - Gedure';

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
            <NotiBox />
          </Grid>
        </Container>
      </Fade>
    </Box>
  )
}
