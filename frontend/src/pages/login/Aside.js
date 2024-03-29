import { Box, Container, Grid, Link, Typography } from '@mui/material';

// Components
import GedureLogo from '../../img/gedure-logo-recto.svg';
import institutoLogo from '../../img/Farvicon_no_fondo_white.png';

// // SNOW
// import Snowfall from 'react-snowfall';

const classes = {
  aside: (theme) => ({
    background: theme.palette.primary.main + 'c7',
    width: '100%',
    userSelect: 'none',
    position: 'relative'
  }),
  container: {
    py: 2,
    color: 'primary.contrastText',
    height: '100%',
    position: 'relative',
    zIndex: 10,
  },
  footerText: {
    display: 'inline-block', 
    color: 'primary.contrastText', 
    mr: 1
  },
  // snow: {
  //   position: 'absolute',
  //   height: 1/1,
  //   width: 1/1,
  // },
};

export default function Aside() {
  return (
    <Box sx={classes.aside}>
      {/* <Box sx={classes.snow}>
        <Snowfall
          snowflakeCount={40}
        />
      </Box> */}
      <Container sx={classes.container}>
        <Grid container direction='column' justifyContent='space-between' sx={{ height: '100%' }}>
          <Grid item>
            <img src={institutoLogo} alt='Logo del instituto' height={60} />
          </Grid>

          <Grid container spacing={2} item>
						<Grid item xs={12}>
							<Typography align='center' className='text__bold--big' variant='h4'>
								BIENVENIDO
							</Typography>
						</Grid>
						
						<Grid item xs={12}>
							<Typography align='center' className='text__bold--big text__opacity--semi' variant='h6'>
								Al iniciar sesión usted podrá:
								<br/>
								* Ver noticias privadas
								<br/>
								* Ver boletas
								<br/>
								Y mas...
							</Typography>
						</Grid>
					</Grid>

          <Grid container justifyContent='center' alignItems='center' item>
            <Typography variant='h6' className='text__bold--big text__opacity--semi' sx={classes.footerText}>
              Powered by
            </Typography>
						<Link style={{display: 'inherit'}} href='https://github.com/recker112/gedure'>
							<img src={GedureLogo} alt='Logo de Gedure' height={25} />
						</Link>
					</Grid>
        </Grid>
      </Container>
    </Box>
  );
}
