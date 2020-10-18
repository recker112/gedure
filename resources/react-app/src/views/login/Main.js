import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import { RenderInput } from './../../components/RendersGlobals';
import LoadingComponent from './../../components/LoadingComponent';
import logo from './../../imgs/favicon_no_fondo_white.png';
import ReloginComponent from './ReloginComponent';

import useFetch from './../../hooks/useFetch';

import { useForm } from 'react-hook-form';

import { connect } from 'react-redux';
import updateForms from './../../actions/updateForms';
import updateDataUser from './../../actions/updateDataUser';
import updateAuth from './../../actions/updateAuth';

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
	login__welcome: {
		background: theme.palette.primary.main,
		width: '100%',
		padding: theme.spacing(2),

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
		
		[theme.breakpoints.down('xs')]: {
			padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
		},

		[theme.breakpoints.up('sm')]: {
			padding: `${theme.spacing(2)}px ${theme.spacing(8)}px`,
		}
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

function Form({ state }) {
	const { loading, updateForms, updateDataUser, updateAuth } = state;
	const { fetchData } = useFetch();
	const { register, handleSubmit, errors } = useForm();

	let history = useHistory();

	const classes = useStyles();

	const handleRecovery = () => {
		if (!loading) {
			history.push('/recovery');
		}
	};

	const onSubmit = useCallback(async (data) => {
		updateForms('login', true);

		const prepareDate = {
			url: 'v1/login',
			data: data,
			successText: 'Login exitoso'
		}
		
		const response = await fetchData(prepareDate);

		if (response) {
			updateDataUser(response);

			// Save access_key
			if (data.checkbox) {
				localStorage.setItem('access_key', JSON.stringify(response.access_key));
				sessionStorage.setItem('access_key', JSON.stringify(response.access_key));
			} else {
				sessionStorage.setItem('access_key', JSON.stringify(response.access_key));
			}

			updateAuth(true);
		}

		updateForms('login', false);
	}, [fetchData, updateAuth, updateDataUser, updateForms]);

	return (
		<Slide in={true} direction="left" mountOnEnter unmountOnExit>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Paper className={classes.login__box}>
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
								name="user"
								label="Cédula o usuario"
								defaultValue=""
								errors={errors.user}
								registerInput={register({
									required: { value: true, message: 'Campo requerido.' },
									minLength: { value: 3, message: 'Campo no válido.' },
								})}
								disabledOnLoading={loading}
								focus
							/>
						</Grid>
						<Grid container item>
							<RenderInput
								passwordMode
								name="password"
								label="Contraseña"
								defaultValue=""
								errors={errors.password}
								registerInput={register({
									required: { value: true, message: 'Campo requerido.' },
									minLength: { value: 4, message: 'Campo no válido.' },
								})}
								disabledOnLoading={loading}
							/>
						</Grid>
						<Grid container item>
							<FormControlLabel
								control={<Checkbox color="primary" name="checkbox" inputRef={register} />}
								label="Mantener abierto"
							/>
						</Grid>
						<Grid container justify="center" item>
							<LoadingComponent loading={loading}>
								<Button
									color="primary"
									variant="contained"
									type="submit"
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

function Login(props) {
	const { updateForms, updateDataUser, updateAuth, loading, inputs } = props;

	let history = useHistory();

	const classes = useStyles();

	const handleReturn = () => {
		if (!loading) {
			history.push('/');
		}
	};

	return (
		<ReloginComponent>
			<main className={`${classes.root} ${classes.margin}`} ref={()=>{
					document.title = 'La Candelaria - Login';
				}}>
				<Container maxWidth="md" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
					<Grid container spacing={2}>
						<Grid container alignItems="center" item>
							<Grid item xs={12} sm={12} md={4}>
								<PanelWelcome />
							</Grid>
							<Grid item xs={12} sm={12} md={8}>
								<Form state={{ loading, inputs, updateForms, updateDataUser, updateAuth }} />
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
		</ReloginComponent>
	);
}

//REDUX
const mapStateToProps = (state) => ({
	loading: state.forms.login.loading,
});

const mapDispatchToProps = {
	updateForms,
	updateDataUser,
	updateAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);