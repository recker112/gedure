import React, { lazy, Suspense, useState, useEffect } from 'react';

import { 
	Switch, 
	Route, 
	Redirect, 
	useParams, 
	useRouteMatch, 
	useHistory,
} from 'react-router-dom';

import { 
	Grid, 
	Container,
	Box,
	CircularProgress,
	Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useFetch from '../../../hooks/useFetch';

import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Components
import BreadCrumbsShow from './BreadCrumbsShow';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';

// Pages
const PerfilAvatar = lazy(() => import('./pages/PerfilAvatar'));
const PerfilDatos = lazy(() => import('./pages/PerfilDatos'));
const UserPassword = lazy(() => import('./pages/UserPassword'));
const UserPermisos = lazy(() => import('./pages/UserPermisos'));
const PersonalUsuario = lazy(() => import('./pages/PersonalUsuario'));
const PersonalEstudianteData = lazy(() => import('./pages/PersonalEstudianteData'));
const PersonalEstudianteUbi = lazy(() => import('./pages/PersonalEstudianteUbi'));
const PersonalEstudianteOtros = lazy(() => import('./pages/PersonalEstudianteOtros'));
const PersonalMadre = lazy(() => import('./pages/PersonalMadre'));
const PersonalPadre = lazy(() => import('./pages/PersonalPadre'));
const PersonalRepresentanteData = lazy(() => import('./pages/PersonalRepresentanteData'));
const PersonalRepresentanteUbi = lazy(() => import('./pages/PersonalRepresentanteUbi'));
const PersonalRepresentanteEmpleo = lazy(() => import('./pages/PersonalRepresentanteEmpleo'));
const Curso = lazy(() => import('./pages/Curso'));

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
	button: {
		cursor: 'pointer',
	},
	buttonNested: {
		cursor: 'pointer',
		marginLeft: theme.spacing(2),
	}
}));

function ReturnSelected(props) {
	const { children, url, onClick, nested } = props;
	
	const classes = useStyles();
	
	const match = useRouteMatch({
		path: url,
		exact: !Boolean(onClick),
	});
	
	const history = useHistory();
	
	const handleClick = () => history.push(url);
	
	return (
		<Box className={classes[nested ? 'buttonNested' : 'button']} component='span' fontSize='body1.fontSize' color={!match ? "text.secondary" : null} onClick={onClick ? onClick : handleClick}>
			{children}
		</Box>
	);
}

function Navs() {
	let { url } = useRouteMatch();
	const [personalNav, setPersonalNav] = useState(false);
	
	const { data } = useSelector((state) => ({
		data: state.forms.showUser.data,
	}));
	
	const history = useHistory();
	
	const handleClick = () => setPersonalNav(!personalNav);
	
	const handleReturn = () => history.push('/gedure/usuarios');
	
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
				{data.user?.privilegio === 'V-' && (
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
				{data.user?.privilegio === 'A-' && (
					<Box mb={1}>
						<ReturnSelected url={`${url}/personal-usuario`} nested>
							Usuario
						</ReturnSelected>
					</Box>
				)}
			</Collapse>
			{data.user?.privilegio === 'V-' && (
				<Box mb={1}>
					<ReturnSelected url={`${url}/curso`}>
						Curso
					</ReturnSelected>
				</Box>
			)}
			<Box mb={1}>
				<ReturnSelected url={`${url}/contraseña`}>
					Contraseña
				</ReturnSelected>
			</Box>
			<Box mb={1}>
				<ReturnSelected url={`${url}/permisos`}>
					Permisos
				</ReturnSelected>
			</Box>
			<Box mb={1}>
				<ReturnSelected onClick={handleReturn}>
					Regresar
				</ReturnSelected>
			</Box>
		</Grid>
	);
}

const Loading = () => <Grid container justify='center' item xs={12} sm={9}>
	<CircularProgress />
</Grid>;

export default function PageShowUser() {
	document.title = 'La Candelaria - Ver usuario';
	const { id } = useParams();
	let { url } = useRouteMatch();
	
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.showUser.loading,
		data: state.forms.showUser.data,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	useEffect(()=>{
		const getUser = async () => {
			const prepare = {
				url: `v1/user/${id}`,
				type: 'get',
				message404: 'No se pudo encontrar al usuario',
				messageToFinish: false,
			};

			const response = await fetchData(prepare);
			
			if (response) {
				dispatch(updateForms('showUser', false, response));
			}else {
				dispatch(updateForms('showUser', false));
			}
		}
		
		getUser();
		
		return () => {
			dispatch(updateForms('showUser', true, {}));
		}
		
		// eslint-disable-next-line
	},[]);
	
	return (
		<main className={classes.containerMain}>
			<Container maxWidth='md'>
				{loading && (
					<Box align='center'>
						<CircularProgress />
					</Box>
				)}
				{(!loading && data.user) && (
					<React.Fragment>
						<Box mb={4}>
							<BreadCrumbsShow />
						</Box>
						<Grid container spacing={2}>
							<Navs />
							<Grid item xs={12} sm={9}>
								<MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
									<Suspense fallback={<Loading />}>
										<Switch>
											<Route path={`${url}`} exact>
												<PerfilAvatar id={id} />
												<PerfilDatos id={id} />
											</Route>

											<Route path={`${url}/personal-usuario`} exact>
												<PersonalUsuario id={id} />
											</Route>

											<Route path={`${url}/personal-estudiante`} exact>
												<PersonalEstudianteData id={id} />
												<PersonalEstudianteUbi id={id} />
												<PersonalEstudianteOtros id={id} />
											</Route>
											
											<Route path={`${url}/personal-representante`} exact>
												<PersonalRepresentanteData id={id} />
												<PersonalRepresentanteUbi id={id} />
												<PersonalRepresentanteEmpleo id={id} />
											</Route>
											
											<Route path={`${url}/personal-padres`} exact>
												<PersonalMadre id={id} />
												<PersonalPadre id={id} />
											</Route>
											
											<Route path={`${url}/curso`} exact>
												<Curso id={id} />
											</Route>

											<Route path={`${url}/contraseña`} exact>
												<UserPassword id={id} />
											</Route>

											<Route path={`${url}/permisos`} exact>
												<UserPermisos id={id} />
											</Route>

											<Route>
												<Redirect to={`${url}`} />
											</Route>
										</Switch>
									</Suspense>
								</MuiPickersUtilsProvider>
							</Grid>
						</Grid>
					</React.Fragment>
				)}
				{(!loading && !data.user) && (
					<Box fontSize='body1.fontSize' align='center'>
						No se ha podido encontrar al usuario #{id}, es posible que este usuario se encuentre desactivado.
					</Box>
				)}
			</Container>
		</main>
	);
}