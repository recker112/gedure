import React, { lazy, Suspense, useState } from 'react';

import { 
	Switch, 
	Route, 
	Redirect, 
	useRouteMatch, 
} from 'react-router-dom';

import { 
	Grid, 
	Container,
	Box,
	CircularProgress,
	Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Components
import { ReturnSelected } from '../usuarios/show/PageShowUser';
import BreadCrumbsShow from '../usuarios/show/BreadCrumbsShow';

// Redux
import { useSelector } from 'react-redux';

// Pages
const PerfilAvatar = lazy(() => import('./perfil/PerfilAvatar'));
const PerfilDatos = lazy(() => import('./perfil/PerfilDatos'));
const Usuario = lazy(() => import('./personal/Usuario'));

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
}));

function Navs() {
	let { url } = useRouteMatch();
	const [personalNav, setPersonalNav] = useState(false);
	
	const { user } = useSelector((state) => ({
		user: state.userData.user,
	}));
	
	const handleClick = () => setPersonalNav(!personalNav);
	
	return (
		<Grid item xs={12} sm={3}>
			<Box mb={1}>
				<ReturnSelected url={`${url}`}>
					Perfil
				</ReturnSelected>
			</Box>
			<Box mb={1}>
				<ReturnSelected url={`${url}/personal`} onClick={handleClick}>
					Datos personales
				</ReturnSelected>
			</Box>
			<Collapse in={personalNav} timeout="auto" unmountOnExit>
				{user.privilegio === 'V-' && (
					<React.Fragment>
						<Box mb={1}>
							<ReturnSelected url={`${url}/personal-estudiante`} nested>
								Estudiante
							</ReturnSelected>
						</Box>
						<Box mb={1}>
							<ReturnSelected url={`${url}/personal-representante`} nested>
								Representante
							</ReturnSelected>
						</Box>
						<Box mb={1}>
							<ReturnSelected url={`${url}/personal-padres`} nested>
								Padres
							</ReturnSelected>
						</Box>
					</React.Fragment>
				)}
				{user.privilegio === 'A-' && (
					<Box mb={1}>
						<ReturnSelected url={`${url}/personal-usuario`} nested>
							Usuario
						</ReturnSelected>
					</Box>
				)}
			</Collapse>
			<Box mb={1}>
				<ReturnSelected url={`${url}/contraseña`}>
					Contraseña
				</ReturnSelected>
			</Box>
			<Box mb={1}>
				<ReturnSelected url={`${url}/opciones`}>
					Opciones
				</ReturnSelected>
			</Box>
		</Grid>
	);
}

const Loading = () => <Grid container justify='center' item xs={12} sm={9}>
	<CircularProgress />
</Grid>;

export default function PageCuenta() {
	document.title = 'La Candelaria - Cuenta';
	let { url } = useRouteMatch();
	
	const { user } = useSelector((state) => ({
		user: state.userData.user,
	}));
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Container maxWidth='md'>
				<Box mb={4}>
					<BreadCrumbsShow user={user} />
				</Box>
				<Grid container spacing={2}>
					<Navs />
					<Grid item xs={12} sm={9}>
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
							<Suspense fallback={<Loading />}>
								<Switch>
									<Route path={`${url}`} exact>
										{user.privilegio !== 'V-' && (
											<PerfilAvatar />
										)}
										<PerfilDatos />
									</Route>
									
									<Route path={`${url}/personal-usuario`} exact>
										<Usuario />
									</Route>

									<Route>
										<Redirect to={`${url}`} />
									</Route>
								</Switch>
							</Suspense>
						</MuiPickersUtilsProvider>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}