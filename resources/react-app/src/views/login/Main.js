import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import logo from './../../imgs/favicon_no_fondo_white.png';

import { useSnackbar } from 'notistack';

import {
	Container,
	Grid,
	Typography,
	Paper,
	Button,
	Box,
	TextField,
	FormControlLabel,
	Checkbox,
	Slide,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	padding: {
		padding: theme.spacing(2),
	},
	padding2: {
		padding: `${theme.spacing(2)}px ${theme.spacing(8)}px`,
	},
	login__welcome: {
		background: theme.palette.primary.main,
		width: '100%',

		[theme.breakpoints.down('sm')]: {
			borderRadius: '5px 5px 0px 0px',
		},

		[theme.breakpoints.up('md')]: {
			height: 500,
			borderRadius: 5,
		},
	},
	login__box: {
		width: '100%',
		height: 470,
	},
	button: {
		width: 170,
		height: 45,
	},
	login__recovery: {
		color: theme.palette.primary.main,
		cursor: 'pointer',
	},
}));

function PanelWelcome() {
	const classes = useStyles();

	return (
		<Slide in={true} direction="right" mountOnEnter unmountOnExit>
			<Box className={classes.login__welcome + ' ' + classes.padding + ' MuiPaper-elevation1'}>
				<Grid container direction="column" spacing={2} style={{ height: '100%' }}>
					<Grid container item>
						<img src={logo} alt="Logo del instituo" className="login__logo" />
					</Grid>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
						spacing={2}
						item
						className={classes.root}
					>
						<Grid item>
							<Typography className="login__welcome login__welcome--white">Bienvenido</Typography>
						</Grid>
						<Grid item>
							<Typography className="login__text">Al iniciar sesión usted podrá:</Typography>
							<Typography className="login__text login__text--list">
								- Ver noticias privadas
								<br />
								- Registrar pagos
								<br />
								- Recibir y enviar tareas
								<br />
								- Ver boletas
								<br />- y más..
							</Typography>
						</Grid>
					</Grid>
					<Grid container justify="center" item>
						<Box textAlign="center" className="login__footer">
							&copy; 2020 - Desarrollado por Recker
							<br />
							Powered by Gedure
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Slide>
	);
}

function Form() {
	const [inputs, setInputs] = useState({
		user: '',
		password: '',
		checkbox: true,
	});

	let history = useHistory();

	const classes = useStyles();
	
	const { enqueueSnackbar } = useSnackbar();

	const handleRecovery = () => {
		history.push('/recovery');
	};

	const handleChange = (event) => {
		if (event.target.name === 'checkbox') {
			setInputs({ ...inputs, [event.target.name]: event.target.checked });
		} else {
			setInputs({ ...inputs, [event.target.name]: event.target.value });
		}
	};
	
	const handleSubmit = () => {
		if (inputs.user === 'studiend') {
			history.push('/panel/V');
		}else if (inputs.user === 'admin') {
			history.push('/panel/A');
		} else if (inputs.user === 'teacher') {
			history.push('/panel/P');
		}else {
			enqueueSnackbar('Opciones no válidas', {
				variant: 'error'
			});
		}
	}

	return (
		<Slide in={true} direction="left" mountOnEnter unmountOnExit>
			<Paper className={classes.login__box + ' ' + classes.padding2}>
				<Grid
					container
					direction="column"
					justify="space-between"
					spacing={2}
					style={{ height: '100%' }}
				>
					<Grid container item justify="center">
						<Typography className="login__titleForm login__welcome--italic">
							Rellene los campos
						</Typography>
					</Grid>
					<Grid container item>
						<TextField
							type="text"
							name="user"
							value={inputs.user}
							style={{ width: '100%' }}
							label="Usuario"
							size="medium"
							autoFocus={true}
							variant="outlined"
							onChange={handleChange}
						/>
					</Grid>
					<Grid container item>
						<TextField
							type="password"
							name="password"
							value={inputs.password}
							style={{ width: '100%' }}
							label="Contraseña"
							size="medium"
							variant="outlined"
							onChange={handleChange}
						/>
					</Grid>
					<Grid container item>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									checked={inputs.checkbox}
									name="checkbox"
									onChange={handleChange}
								/>
							}
							label="Mantener abierto"
						/>
					</Grid>
					<Grid container justify="center" item>
						<Button color="primary" variant="contained" onClick={handleSubmit} className={classes.button}>
							Entrar
						</Button>
					</Grid>
					<Grid container justify="center" item>
						<Box component="span" className={classes.login__recovery} onClick={handleRecovery}>
							Recuperar contraseña
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</Slide>
	);
}

function Login() {
	let history = useHistory();

	const classes = useStyles();

	const handleReturn = () => {
		history.push('/');
	};

	return (
		<main className={classes.root}>
			<Container maxWidth="md" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
				<Grid container spacing={2}>
					<Grid container alignItems="center" item>
						<Grid item xs={12} sm={12} md={4}>
							<PanelWelcome />
						</Grid>
						<Grid item xs={12} sm={12} md={8}>
							<Form />
						</Grid>
					</Grid>
					<Grid container justify="center" item xs={12}>
						<Box component="span" className="login__return" onClick={handleReturn}>
							Volver al inicio
						</Box>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}

export default Login;