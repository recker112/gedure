import { Box, Container, Grid, Link, Typography } from '@mui/material';

import GedureLogo from '../../img/gedure-logo-recto.svg';
import institutoLogo from '../../img/Farvicon_no_fondo_white.png';

const classes = {
  aside: (theme) => ({
    background: theme.palette.secondary.main + 'c7',
    width: '100%',
    userSelect: 'none'
  }),
  container: {
    py: 2,
    color: 'primary.contrastText',
    height: '100%'
  },
  footerText: {
    display: 'inline-block', 
    color: 'primary.contrastText', 
    mr: 1
  }
};

export default function Aside({ step }) {
  return (
    <Box sx={classes.aside}>
      <Container sx={classes.container}>
        <Grid container direction='column' justifyContent='space-between' sx={{ height: '100%' }}>
          <Grid item>
            <img src={institutoLogo} alt='Logo del instituto' height={60} />
          </Grid>

          <Grid container spacing={2} item>
						<Grid item xs={12}>
							<Typography align='center' className='text__bold--big' variant='h4'>
								RECUPERAR CONTRASEÑA
							</Typography>
						</Grid>

            {step === 0 && (
							<Grid item xs={12}>
                <Typography textAlign='center' className='text__bold--big text__opacity--semi' variant='h6'>
                  Tenga en cuenta que debe tener un correo asociado a la cuenta para poder recuperar la contraseña.
                </Typography>
              </Grid>
						)}
						
						{step === 1 && (
              <Grid item xs={12}>
                <Typography textAlign='center' className='text__bold--big text__opacity--semi' variant='h6'>
                  Enviaremos un código de verificación a su correo electrónico, es posible que el correo pueda tardar hasta 2 minutos en ser enviado.
                </Typography>
              </Grid>
						)}
						
						{step === 2 && (
              <Grid item xs={12}>
                <Typography textAlign='center' className='text__bold--big text__opacity--semi' variant='h6'>
                  Su correo fue verificado correctamente, cambie su contraseña por una que pueda recordar.
                </Typography>
              </Grid>
						)}
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
