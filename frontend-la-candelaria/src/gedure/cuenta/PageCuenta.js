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
import TourCuenta from './TourCuenta';

// Redux
import { useSelector } from 'react-redux';

// Pages
const PerfilAvatar = lazy(() => import('./perfil/PerfilAvatar'));
const PerfilDatos = lazy(() => import('./perfil/PerfilDatos'));
const Usuario = lazy(() => import('./personal/Usuario'));
const EstudianteData = lazy(() => import('./personal/EstudianteData'));
const EstudianteUbi = lazy(() => import('./personal/EstudianteUbi'));
const EstudianteOtros = lazy(() => import('./personal/EstudianteOtros'));
const RepresentanteData = lazy(() => import('./personal/RepresentanteData'));
const RepresentanteUbi = lazy(() => import('./personal/RepresentanteUbi'));
const RepresentanteEmpleo = lazy(() => import('./personal/RepresentanteEmpleo'));
const Madre = lazy(() => import('./personal/Madre'));
const Padre = lazy(() => import('./personal/Padre'));
const Password = lazy(() => import('./password/Password'));
const Opciones = lazy(() => import('./opciones/Opciones'));

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
			<Box mb={1} data-tour='perfil'>
				<ReturnSelected url={`${url}`}>
					Perfil
				</ReturnSelected>
			</Box>
			<Box mb={1} data-tour='personal'>
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
			<Box mb={1} data-tour='contrase単a'>
				<ReturnSelected url={`${url}/contraseña`}>
					Contraseña
				</ReturnSelected>
			</Box>
			<Box mb={1} data-tour='opciones'>
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
					<BreadCrumbsShow user={user} maxLengthPath={2} />
				</Box>
				<Grid container spacing={2}>
					<Navs />
					<Grid item xs={12} sm={9}>
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
							<Suspense fallback={<Loading />}>
								<Switch>
									<Route path={`${url}`} exact>
										<PerfilAvatar />
										<PerfilDatos />
									</Route>

									<Route path={`${url}/personal-usuario`} exact>
										<Usuario />
									</Route>

									<Route path={`${url}/personal-estudiante`} exact>
										<EstudianteData />
										<EstudianteUbi />
										<EstudianteOtros />
									</Route>

									<Route path={`${url}/personal-representante`} exact>
										<RepresentanteData />
										{user.personal_data.repre_nacionalidad !== 'E' && (
											<RepresentanteUbi />
										)}
										<RepresentanteEmpleo />
									</Route>

									<Route path={`${url}/personal-padres`} exact>
										<Madre />
										<Padre />
									</Route>

									<Route path={`${url}/contraseña`} exact>
										<Password />
									</Route>

									<Route path={`${url}/opciones`} exact>
										<Opciones />
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
			<TourCuenta />
		</main>
	);
}