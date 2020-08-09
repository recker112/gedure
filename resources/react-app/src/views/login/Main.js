import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import { RenderInput } from './../../components/RendersGlobals';
import LoadingComponent from './../../components/LoadingComponent';
import logo from './../../imgs/favicon_no_fondo_white.png';

import { useSnackbar } from 'notistack';

import { useForm } from "react-hook-form";

import { connect } from 'react-redux';
import updateForms from './../../actions/updateForms';

import {
	Container,
	Grid,
	Typography,
	Paper,
	Button,
	Box,
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

function useFetch(){
	const axios = window.axios;
	
	const { enqueueSnackbar } = useSnackbar();
	
	const fetchData = async (url, data, successText)=>{
		try {
			const res = await axios.post(url, data);
			
			enqueueSnackbar(successText, {
				variant: 'success'
			});
			
			return res.data;
		} catch (error) {
			if (error.response){
				//Errores HTTP
				const { status, data } = error.response;

				if (status === 403){
					enqueueSnackbar(data.description, {
						variant: 'error'
					});
				}else if (status === 400){
					enqueueSnackbar(data.description, {
						variant: 'warning'
					});
				}else if (status === 500){
					enqueueSnackbar('No se ha podido conectar con la base de datos', {
						variant: 'error'
					});
				}else {
					enqueueSnackbar('Error interno en el servidor', {
						variant: 'error'
					});
				}
			}else {
				enqueueSnackbar('Error interno en el sistema', {
					variant: 'error'
				});
			}
		}
	}
	
	return { fetchData };
}

function Form({ state }) {
	const { fetchData } = useFetch();
	const { register, handleSubmit, errors } = useForm();
	const { loading, inputs, updateForms } = state;
	const { user, password } = inputs;
	

	let history = useHistory();

	const classes = useStyles();

	const handleRecovery = () => {
		if (!loading) {
			history.push('/recovery');
		}
	};

	const onSubmit = async (data) => {
		updateForms('login', true, data);
		
		const response = await fetchData('v1/login', data, 'Login exitoso');
		
		console.log(response);
		
		updateForms('login', false);
	}

	return (
		<Slide in={true} direction="left" mountOnEnter unmountOnExit>
			<form onSubmit={handleSubmit(onSubmit)}>
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
							<RenderInput 
								name='user'
								label='Usuario'
								defaultValue={user}
								errors={errors.user}
								registerInput={register({
									required: { value: true, message: 'Campo requerido.' },
									minLength: { value: 3, message: 'Campo no válido.' }
								})}
								disabledOnLoading={loading}
								focus
							/>
						</Grid>
						<Grid container item>
							<RenderInput 
								passwordMode
								name='password'
								label='Contraseña'
								defaultValue={password}
								errors={errors.password}
								registerInput={register({
									required: { value: true, message: 'Campo requerido.' },
									minLength: { value: 4, message: 'Campo no válido.' }
								})}
								disabledOnLoading={loading}
							/>
						</Grid>
						<Grid container item>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										name="checkbox"
										inputRef={register}
									/>
								}
								label="Mantener abierto"
							/>
						</Grid>
						<Grid container justify="center" item>
							<LoadingComponent loading={loading}>
								<Button
									color="primary"
									variant="contained"
									type='submit'
									className={classes.button}
								>
									Entrar
								</Button>
							</LoadingComponent>
						</Grid>
						<Grid container justify="center" item>
							<Box component="span" className={classes.login__recovery} onClick={handleRecovery}>
								Recuperar contraseña
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</form>
		</Slide>
	);
}

function Login({ updateForms, loading, inputs }) {
	document.title = 'La Candelaria - Login';
	
	let history = useHistory();

	const classes = useStyles();

	const handleReturn = () => {
		if (!loading) {
			history.push('/');
		}
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
							<Form state={{loading, inputs, updateForms}} />
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

//REDUX
const mapStateToProps = state => ({
	loading: state.forms.login.loading,
	inputs: state.forms.login.inputs
});

const mapDispatchToProps = {
	updateForms,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);