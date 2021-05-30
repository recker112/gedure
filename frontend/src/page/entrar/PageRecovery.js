import React, { useState } from 'react';

import { 
	Grid,
	Typography,
	Container,
	Box,
	Link,
	Slide,
	Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import GedureLogo from '../../imgs/gedure-logo-recto.svg';
import institutoFondo from '../../imgs/instituto.jpg';
import institutoLogo from '../../imgs/Farvicon_no_fondo_white.png';
import ReloginComponent from './ReloginComponent';
import FormSendEmail from './FormSendEmail';
import FormVerifyCode from './FormVerifyCode';
import FormChangePassword from './FormChangePassword';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
	},
	aside: {
		background: `url(${institutoFondo}) no-repeat`,
		backgroundSize: 'cover',
		width: '100%',
	},
	fondo: {
		background: theme.palette.secondary.main + 'c7',
		height: '100%',
	}
}));

function Aside({ step }) {
	const classes = useStyles();
	
	return (
		<Container className={classes.fondo}>
			<Box py={2} color='primary.contrastText' style={{height: '100%'}}>
				<Grid container direction='column' justify='space-between' style={{height: '100%'}}>
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
							<Fade in={true}>
								<Grid item xs={12}>
									<Typography align='center' className='text__bold--big text__opacity--semi' variant='h6'>
										Tenga en cuenta que debe tener un correo asociado a la cuenta para poder recuperar la contraseña.
									</Typography>
								</Grid>
							</Fade>
						)}
						
						{step === 1 && (
							<Fade in={true}>
								<Grid item xs={12}>
									<Typography align='center' className='text__bold--big text__opacity--semi' variant='h6'>
										Enviaremos un código de verificación a su correo electrónico, es posible que el correo pueda tardar hasta 2 minutos en ser enviado.
									</Typography>
								</Grid>
							</Fade>
						)}
						
						{step === 2 && (
							<Fade in={true}>
								<Grid item xs={12}>
									<Typography align='center' className='text__bold--big text__opacity--semi' variant='h6'>
										Su correo fue verificado correctamente, cambie su contraseña por una que pueda recordar.
									</Typography>
								</Grid>
							</Fade>
						)}
					</Grid>

					<Grid container justify='center' alignItems='center' item>
						<Box display='inline-block' color="primary.contrastText" mr={1}>
							<Typography variant='h6' className='text__bold--big text__opacity--semi'>
								Powered by
							</Typography>
						</Box>
						<Link style={{display: 'inherit'}} href='https://github.com/recker112/gedure'>
							<img src={GedureLogo} alt='Logo de Gedure' height={25} />
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

function PageRecovery() {
	document.title = 'La Candelaria - Recuperar';
	const [step, setStep] = useState(0);
	
	const classes = useStyles();
	
	return (
		<ReloginComponent>
			<main className={classes.containerMain}>
				<Grid container style={{height: '100%'}}>
					<Slide direction="right" in={true} mountOnEnter unmountOnExit>
						<Grid className={classes.aside} item sm={12} md={4}>
							<Aside step={step} />
						</Grid>
					</Slide>

					<Slide direction="left" in={true} mountOnEnter unmountOnExit>
						<Grid container alignItems='center' item sm={12} md={8}>
							<Container maxWidth='sm' className='container--margin'>
								{step === 0 && (<FormSendEmail nextStep={setStep} />)}
								{step === 1 && (<FormVerifyCode nextStep={setStep} />)}
								{step === 2 && (<FormChangePassword />)}
							</Container>
						</Grid>
					</Slide>
				</Grid>
			</main>
		</ReloginComponent>
	);
}

export default PageRecovery;