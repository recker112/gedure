import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import logo from './../../imgs/favicon_no_fondo_white.png';

import {
	Container,
	Grid,
	Typography,
	Paper,
	Button,
	Box,
	TextField,
	InputAdornment,
	Fade,
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
		minHeight: 45,
	},
	login__back: {
		color: theme.palette.primary.main,
		cursor: 'pointer',
	},
}));

function PanelWelcome() {
	const classes = useStyles();

	return (
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
						<Typography className="login__recovery login__welcome--white">
							Recuperar contraseña
						</Typography>
					</Grid>
					<Grid item>
						<Typography className="login__text">
							Tenga en cuenta que solo puede recuperar su contraseña si posee algún correo asociado
							a la cuenta
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
	);
}

function Form(props) {
	const { setInputs, inputs, setStage } = props.states;

	let history = useHistory();

	const classes = useStyles();

	const handleBack = () => {
		history.push('/entrar');
	};

	const handleChange = (event) => {
		setInputs({ ...inputs, [event.target.name]: event.target.value });
	};

	return (
		<Fade in={true}>
			<Grid
				container
				direction="column"
				justify="space-between"
				spacing={2}
				style={{ height: '100%' }}
			>
				<Grid container item justify="center">
					<Typography className="login__titleForm login__welcome--italic">
						Introduzca su correo
					</Typography>
				</Grid>
				<Grid container alignItems="center" item className={classes.root}>
					<TextField
						type="text"
						name="email"
						value={inputs.email}
						style={{ width: '100%' }}
						label="ejemplo@gmail.com"
						size="medium"
						autoFocus={true}
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid container justify="center" item>
					<Button
						color="primary"
						variant="contained"
						className={classes.button}
						onClick={() => {
							setStage(2);
						}}
					>
						Enviar correo
					</Button>
				</Grid>
				<Grid container justify="center" item>
					<Box component="span" className={classes.login__back} onClick={handleBack}>
						Regresar al login
					</Box>
				</Grid>
			</Grid>
		</Fade>
	);
}

function VerifyCode(props) {
	const { setInputs, inputs, setStage } = props.states;

	const classes = useStyles();

	const handleBack = () => {
		setStage(1);
	};

	const handleChange = (event) => {
		setInputs({ ...inputs, [event.target.name]: event.target.value });
	};

	return (
		<Fade in={true}>
			<Grid
				container
				direction="column"
				justify="space-between"
				spacing={2}
				style={{ height: '100%' }}
			>
				<Grid container item justify="center">
					<Typography className="login__titleForm login__welcome--italic">
						Introduzca el código
					</Typography>
				</Grid>
				<Grid container alignItems="center" item className={classes.root}>
					<TextField
						type="text"
						name="code"
						value={inputs.code}
						style={{ width: '100%' }}
						label="Código"
						InputProps={{
							startAdornment: <InputAdornment position="start">R-</InputAdornment>,
						}}
						size="medium"
						autoFocus={true}
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid container justify="center" item>
					<Button
						color="primary"
						variant="contained"
						className={classes.button}
						onClick={() => {
							setStage(3);
						}}
					>
						Verificar código
					</Button>
				</Grid>
				<Grid container justify="center" item>
					<Box component="span" className={classes.login__back}>
						Reenviar mensaje
					</Box>
				</Grid>
				<Grid container justify="center" item>
					<Box component="span" className={classes.login__back} onClick={handleBack}>
						Cambiar correo
					</Box>
				</Grid>
			</Grid>
		</Fade>
	);
}

function ChangePassword(props) {
	const { setInputs, inputs } = props.states;

	const classes = useStyles();
	
	let history = useHistory();

	const handleChange = (event) => {
		setInputs({ ...inputs, [event.target.name]: event.target.value });
	};

	return (
		<Fade in={true}>
			<Grid
				container
				direction="column"
				justify="space-between"
				spacing={2}
				style={{ height: '100%' }}
			>
				<Grid container item justify="center">
					<Typography className="login__titleForm login__welcome--italic">
						Introduzca su nueva contraseña
					</Typography>
				</Grid>
				<Grid container alignItems="center" item className={classes.root}>
					<TextField
						type="text"
						name="code"
						value={inputs.password}
						style={{ width: '100%' }}
						label="Nueva contraseña"
						size="medium"
						autoFocus={true}
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid container alignItems="center" item className={classes.root}>
					<TextField
						type="text"
						name="code"
						value={inputs.confirmPass}
						style={{ width: '100%' }}
						label="Confirme contraseña"
						size="medium"
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid container justify="center" item>
					<Button
						color="primary"
						variant="contained"
						className={classes.button}
						onClick={() => {
							history.push('/entrar')
						}}
					>
						Cambiar contraseña
					</Button>
				</Grid>
			</Grid>
		</Fade>
	);
}

function Recovery() {
	const [stage, setStage] = useState(1);
	const [inputs, setInputs] = useState({
		email: '',
		code: '',
		password: '',
		confirmPass: '',
	});

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
							<Paper className={classes.login__box + ' ' + classes.padding2}>
								{stage === 1 && <Form states={{ inputs, setInputs, setStage }} />}
								{stage === 2 && <VerifyCode states={{ inputs, setInputs, setStage }} />}
								{stage === 3 && <ChangePassword states={{ inputs, setInputs }} />}
							</Paper>
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

export default Recovery;