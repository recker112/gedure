import React, { lazy, Suspense, useState } from 'react';

import { 
	Switch, 
	Route, 
	Redirect, 
	useParams, 
	useLocation, 
	useRouteMatch, 
	useHistory,
} from 'react-router-dom';

import { 
	Grid, 
	Container,
	Avatar,
	Typography,
	Box,
	CircularProgress,
	Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Perfil = lazy(() => import('./Perfil'));
const Password = lazy(() => import('./Password'));
const Permisos = lazy(() => import('./Permisos'));

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
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
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

function BreadCrumbs() {
	const classes = useStyles();
	
	let location = useLocation();
	
	let BreadCrumbsRouters = location.pathname.split('/');
	// eslint-disable-next-line
	let removed = BreadCrumbsRouters.splice(0,1);
	
	let route = BreadCrumbsRouters[BreadCrumbsRouters.length - 1].toString().replace('-', ' ');
	
	return (
		<Grid container alignItems='center' spacing={2}>
			<Grid item>
				<Avatar className={classes.avatar} alt='Avatar de Recker' />
			</Grid>
			<Grid item>
				<Typography variant='h6' className='text__bold--semi'>Usuario</Typography>
			</Grid>
			<Grid item>
				<Typography variant='h6' className='text__bold--semi'>/</Typography>
			</Grid>
			<Grid item>
				<Typography variant='h6' className='text__bold--semi'>
				{(BreadCrumbsRouters.length - 1 !== 4 || route === '') ? 'Perfil' : route[0].toUpperCase() + route.slice(1) }
				</Typography>
			</Grid>
		</Grid>
	);
}

function Navs() {
	const { id } = useParams();
	const [personalNav, setPersonalNav] = useState(false);
	
	const history = useHistory();
	
	const handleClick = () => setPersonalNav(!personalNav);
	
	const handleReturn = () => history.push('/gedure/usuarios');
	
	return (
		<Grid item xs={12} sm={3}>
			<Box mb={1}>
				<ReturnSelected url={`/gedure/usuarios/ver/${id}/`}>
					Perfil
				</ReturnSelected>
			</Box>
			<Box mb={1}>
				<ReturnSelected url={`/gedure/usuarios/ver/${id}/personal`} onClick={handleClick}>
					Datos personales
				</ReturnSelected>
			</Box>
			<Collapse in={personalNav} timeout="auto" unmountOnExit>
				<Box mb={1}>
					<ReturnSelected url={`/gedure/usuarios/ver/${id}/personal-estudiante`} nested>
						Estudiante
					</ReturnSelected>
				</Box>
				<Box mb={1}>
					<ReturnSelected url={`/gedure/usuarios/ver/${id}/personal-representante`} nested>
						Representante
					</ReturnSelected>
				</Box>
				<Box mb={1}>
					<ReturnSelected url={`/gedure/usuarios/ver/${id}/personal-padres`} nested>
						Padres
					</ReturnSelected>
				</Box>
			</Collapse>
			<Box mb={1}>
				<ReturnSelected url={`/gedure/usuarios/ver/${id}/contraseña`}>
					Contraseña
				</ReturnSelected>
			</Box>
			<Box mb={1}>
				<ReturnSelected url={`/gedure/usuarios/ver/${id}/permisos`}>
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

const Loading = () => <Grid container justify='center' item xs={8}>
	<CircularProgress />
</Grid>;

export default function PageShow() {
	document.title = 'La Candelaria - Ver usuario';
	let { url } = useRouteMatch();
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Container maxWidth='md'>
				<Box mb={4}>
					<BreadCrumbs />
				</Box>
				<Grid container spacing={2}>
					<Navs />
					<Grid item xs={12} sm={9}>
						<Suspense fallback={<Loading />}>
							<Switch>
								<Route path={`${url}/`} exact>
									<Perfil />
								</Route>

								<Route path={`${url}/personal-estudiante`} exact>
									Datos del estudiante como: Fecha de nacimiento, nacionalidad, religión, edad y otros.
								</Route>

								<Route path={`${url}/contraseña`} exact>
									<Password />
								</Route>

								<Route path={`${url}/permisos`} exact>
									<Permisos />
								</Route>

								<Route>
									<Redirect to={`${url}/`} />
								</Route>
							</Switch>
						</Suspense>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}