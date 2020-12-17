import React from 'react';

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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(10),
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
	}
}));

function ReturnSelected(props) {
	const { children, url } = props;
	
	const match = useRouteMatch({
		path: url,
		exact: true,
	});
	
	const history = useHistory();
	
	const handleClick = () => {
		history.push(url);
	}
	
	return (
		<Box style={{cursor: 'pointer'}} component='span' fontSize='body1.fontSize' color={!match ? "text.secondary" : null} onClick={handleClick}>
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
				<Avatar className={classes.avatar} alt='Avatar de' />
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
	
	return (
		<Grid container spacing={1} item xs={4}>
			<Grid item xs={12}>
				<ReturnSelected url={`/panel/usuarios/ver/${id}/`}>
					Perfil
				</ReturnSelected>
			</Grid>
			<Grid item xs={12}>
				<ReturnSelected url={`/panel/usuarios/ver/${id}/datos-personales`}>
					Datos personales
				</ReturnSelected>
			</Grid>
			<Grid item xs={12}>
				<ReturnSelected url={`/panel/usuarios/ver/${id}/configuracion`}>
					Configuraciรณn
				</ReturnSelected>
			</Grid>
		</Grid>
	);
}

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
					<Switch>
						<Route path={`${url}/`} exact>
							<Grid item xs={8}>
								Perfil
							</Grid>
						</Route>
						
						<Route path={`${url}/datos-personales`} exact>
							<Grid item xs={8}>
								Datos personales
							</Grid>
						</Route>
						
						<Route path={`${url}/configuracion`} exact>
							<Grid item xs={8}>
								Configuración
							</Grid>
						</Route>
						
						<Route>
							<Redirect to={`${url}/`} />
						</Route>
					</Switch>
				</Grid>
			</Container>
		</main>
	);
}