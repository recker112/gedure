import React, { Suspense, lazy } from 'react';

import { 
	useRouteMatch, 
	Link as RouteLink, 
	useLocation,
	Route,
	Switch,
	Redirect,
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
import { makeStyles } from '@material-ui/core/styles';

// Routers
const Cursos = lazy(() => import('./cursos/Main'));

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

function LinkTab(props) {
	return (
		<Tab 
			component={RouteLink}
			to={props.value}
			{...props}
		/>
	)
}

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
				Configuraciรณn del sistema,
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
	document.title = 'La Candelaria - Configuración del sistema';
	
	let { url } = useRouteMatch();
	let location = useLocation();
	
	const classes = useStyles();
	
	return (
		<main className={classes.containerMain}>
			<Slide direction="down" in={true} timeout={1000} mountOnEnter unmountOnExit>
				<Grid container direction='column' className={classes.header}>
					<Grid container alignItems='center' item style={{flexGrow: 1}}>
						<Header />
					</Grid>
					<Grid item>
						<Tabs
							value={location.pathname}
							centered
						>
							<LinkTab 
								label='General' 
								value={`${url}`} 
								{...a11yProps(0)}
							/>
							<LinkTab 
								label='Cursos' 
								value={`${url}/cursos`}
								{...a11yProps(1)}
								/>
							<LinkTab
								label='Reactivar usuarios' 
								value={`${url}/usuarios-desactivados`}
								{...a11yProps(2)}
							/>
						</Tabs>
					</Grid>
				</Grid>
			</Slide>
			<Fade in={true} style={{ transitionDelay: '1000ms' }}>
				<Container className={classes.content}>
					<Suspense fallback={<Loading />}>
						<Switch>
							<Route path={`${url}`} exact>
								<Typography align='center'>
									No hay nada disponible
								</Typography>
							</Route>
							
							<Route path={`${url}/cursos`} exact>
								<Cursos />
							</Route>
							
							<Route path={`${url}/usuarios-desactivados`} exact>
								Reactivar usuarios
							</Route>
							
							<Route>
								<Redirect to={`${url}`} />
							</Route>
						</Switch>
					</Suspense>
				</Container>
			</Fade>
		</main>
	)
}