import React, { Suspense, lazy } from 'react';

import { 
	useRouteMatch, 
	Link as RouteLink, 
	useLocation,
	Route,
	Switch,
} from 'react-router-dom';

import { 
	Grid, 
	Container,
	Box,
	Slide,
	Fade,
	Tabs,
	Tab,
	CircularProgress,
	Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

// Components
import TourGedure from './TourGedure';

// Redux
import { useSelector } from 'react-redux';

// Routers
const Cursos = lazy(() => import('./cursos/Main'));
const Deudas = lazy(() => import('./deudas/Main'));
const Reactivar = lazy(() => import('./disabled_accounts/Main'));

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(5),
	},
	header: {
		background: theme.palette.primary.main,
		height: 300,
		borderRadius: '0px 0px 15px 15px'
	},
	content: {
		marginTop: theme.spacing(3),
	}
}));

function a11yProps(index) {
	return {
		id: `nav-tab-${index}`,
		'aria-controls': `nav-tabpanel-${index}`,
	};
}

const LinkTabs = withStyles(theme => ({
	indicator: {
		backgroundColor: '#fff'
	}
}))(Tabs);

const LinkTab = withStyles(theme => ({
	root: {
		color: '#fff'
	}
}))((props) => (
	<Tab
		component={RouteLink}
		to={props.value}
		{...props}
	/>
));

function Loading() {
	return (
		<Box align='center'>
			<CircularProgress />
		</Box>
	);
}

function Header() {
	return (
		<Container>
			<Box 
				color='primary.contrastText' 
				fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize', md: 'h4.fontSize' }} 
				className='text__bold--semi'
			>
				Configuración del sistema,
			</Box>
			<Box 
				color='primary.contrastText' 
				fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize' }} 
				className='text__bold--semi'
			>
				adapte <Box color='secondary.main' component='span'>Gedure</Box> a su gusto.
			</Box>
		</Container>
	);
}

export default function PageUserIndex() {
	document.title = 'La Candelaria - Configuraciรณn del sistema';
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	
	let { url } = useRouteMatch();
	let location = useLocation();
	
	const classes = useStyles();
	
	const list = [
		{
			path: `${url}/cursos`,
			component: <Cursos />,
			exact: true,
			iCanSee: Boolean(permissions?.gedure?.cursos_index),
		},
		{
			path: `${url}/deudas`,
			component: <Deudas />,
			exact: true,
			iCanSee: Boolean(permissions?.gedure?.bank_account_index),
		},
		{
			path: `${url}/usuarios-desactivados`,
			component: <Reactivar />,
			exact: true,
			iCanSee: Boolean(permissions?.gedure?.users_disabled_index),
		},
	];
	
	return (
		<main className={classes.containerMain}>
			<Slide direction="down" in={true} timeout={1000} mountOnEnter unmountOnExit>
				<Grid container direction='column' className={classes.header}>
					<Grid container alignItems='center' item style={{flexGrow: 1}}>
						<Header />
					</Grid>
					<Grid item style={{width: '100%'}}>
						<LinkTabs
							value={location.pathname}
							variant="scrollable"
							scrollButtons="on"
						>
							<LinkTab 
								label='General' 
								value={`${url}`}
								data-tour='general'
								{...a11yProps(0)}
							/>
							<LinkTab 
								label='Cursos' 
								value={`${url}/cursos`}
								data-tour='cursos'
								{...a11yProps(1)}
							/>
							<LinkTab 
								label='Deudas' 
								value={`${url}/deudas`}
								data-tour='deudas'
								{...a11yProps(1)}
							/>
							<LinkTab
								label='Usuarios desactivados' 
								value={`${url}/usuarios-desactivados`}
								data-tour='usuarios'
								{...a11yProps(2)}
							/>
						</LinkTabs>
					</Grid>
				</Grid>
			</Slide>
			<Fade in={true} style={{ transitionDelay: '1000ms' }}>
				<Container className={classes.content}>
					<Suspense fallback={<Loading />}>
						<Switch>
							{list.map((data, i) => {
								if (data.iCanSee) {
									return (
										<Route key={i} path={data.path} exact={data.exact}>
											{data.component}
										</Route>
									);
								}

								return null;
							})}
							
							<Route>
								<Typography align='center'>
									No hay nada disponible
								</Typography>
							</Route>
						</Switch>
					</Suspense>
				</Container>
			</Fade>
			<TourGedure />
		</main>
	)
}