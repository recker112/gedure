import React from 'react';

import { useHistory } from 'react-router-dom';

import { 
	Container,
	Typography,
	Grid,
	Paper,
	Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import FooterText from '../../components/FooterText';
import logo from '../../imgs/Farvicon_no_fondo_white.png';
import BoxFormLogin from './BoxFormLogin';
import ReloginComponent from './ReloginComponent';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingTop: 40,
		paddingBottom: 40,
	},
	boxInfo: {
		backgroundColor: theme.palette.primary.main,
		padding: theme.spacing(2),
		userSelect: 'none',
		
		[theme.breakpoints.down('sm')]: {
			borderRadius: '5px 5px 0px 0px',
		},

		[theme.breakpoints.up('md')]: {
			height: 500,
			borderRadius: 5,
		},
	},
	boxForm: {
		height: 470,
		
		[theme.breakpoints.down('xs')]: {
			padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
		},

		[theme.breakpoints.up('sm')]: {
			padding: `${theme.spacing(2)}px ${theme.spacing(8)}px`,
		},
		
		[theme.breakpoints.down('sm')]: {
			borderRadius: '0px 0px 5px 5px',
		},

		[theme.breakpoints.up('md')]: {
			borderRadius: '0px 5px 5px 0px',
		},
	},
	textColor: {
		color: 'white'
	},
	button: {
		width: 170,
		height: 45,
	},
	form: {
		height: '100%',
		display: 'flex',
	},
	textButton: {
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline',
		}
	}
}));

function BoxInfo() {
	const classes = useStyles();
	
	return (
		<Slide in={true} direction="right" mountOnEnter unmountOnExit>
			<Paper className={classes.boxInfo}>
				<Grid container spacing={2} direction='column' justify='space-between' style={{height: '100%'}}>
					<Grid item>
						<img src={logo} alt="Logo del instituo" className="login__logo" />
					</Grid>
					<Grid container spacing={2} item>
						<Grid item xs={12}>
							<Typography 
								className={`${classes.textColor} text__bold--big`} 
								align='center' 
								variant='h4'
								component='div'
							>
								Bienvenidos
							</Typography>
						</Grid>
						<Grid container justify='center' item xs={12}>
							<Typography 
								variant='body1'
								className={`${classes.textColor} text__opacity--semi`}
							>
								Al iniciar sesión usted podrá:
								<br />
								* Ver noticias privadas
								<br />
								* Realizar pagos
								<br />
								* Recibir y enviar tareas
								<br />
								* Ver boletas
								<br />* y más..
							</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Typography 
							className={`${classes.textColor} text__opacity--semi`}
							variant='caption'
						>
							<FooterText />
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Slide>
	);
}

function PageLogin() {	
	const classes = useStyles();
	
	const history = useHistory();
	
	return (
		<ReloginComponent>
			<main className={classes.containerMain} ref={()=>{
					document.title = 'La Candelaria - Entrar';
				}}>
				<Container maxWidth='md' style={{height: '100%'}}>
					<Grid container alignItems='center' alignContent='center' style={{height: '100%'}}>
						<Grid item xs={12} md={4}>
							<BoxInfo />
						</Grid>
						<Grid item xs={12} md={8}>
							<BoxFormLogin classes={classes} />
						</Grid>
						<Grid container justify='center' item xs={12}>
							<Typography 
								className={classes.textButton} 
								onClick={()=>{history.push('/')}}
								style={{marginTop: 10}}
							>
								Volver al inicio
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</main>
		</ReloginComponent>
	);
}

export default PageLogin;