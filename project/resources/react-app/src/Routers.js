// React
import React, { Suspense, lazy } from 'react';

// React Router
import { Switch, Route, Redirect } from 'react-router-dom';

// Material-Ui
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Loading
import ReactLoading from 'react-loading';

// Componentes
import logoL from './imgs/Farvicon_no_fondo.png';
import logoD from './imgs/Farvicon_no_fondo_white.png';

// Redux
import { useSelector } from 'react-redux';

// Routers
const PageIndex = lazy(() => import('./page/index/PageIndex'));
const PageNews = lazy(() => import('./page/noticias/PageNews'));
const PageShowNews = lazy(() => import('./page/noticias/PageShowNews'));
const PageContactanos = lazy(() => import('./page/contactanos/PageContactanos'));
const PageLogin = lazy(() => import('./page/entrar/PageLogin'));
const PageRecovery = lazy(() => import('./page/entrar/PageRecovery'));
const RoutersGedure = lazy(() => import('./gedure/RoutersGedure'));
const PageInvitation = lazy(() => import('./page/invitation/PageInvitation'));
const PageSetup = lazy(() => import('./gedure/setup/PageSetup'));

const useStyles = makeStyles((theme) => ({
	loading: {
		flexGrow: 1
	}
}));

function Routers() {
	return (
		/* Switch sirve para escojer la ruta la que mas se acerque a la
    ruta actual, es decir, que de todas esas rutas, la app escogerรก
    la que mรกs se asemeje, excepto si se coloca el atributo "exact" */
		<Suspense fallback={<Loader />}>
			<Switch>
				<PublicRoute path='/' exact notSeeBeforeAuth>
					<PageIndex />
				</PublicRoute>
				
				<PublicRoute path='/noticias' exact>
					<PageNews />
				</PublicRoute>
				
				<PublicRoute path='/noticias/:slug' exact>
					<PageShowNews />
				</PublicRoute>
				
				<PublicRoute path='/contactanos' exact>
					<PageContactanos />
				</PublicRoute>
				
				<PublicRoute path='/entrar' exact>
					<PageLogin />
				</PublicRoute>
				
				<PublicRoute path='/recuperar' exact>
					<PageRecovery />
				</PublicRoute>
				
				<ProtectRoute path='/gedure'>
					<RoutersGedure />
				</ProtectRoute>
				
				<ProtectRoute path='/setup'>
					<PageSetup />
				</ProtectRoute>
				
				<PublicRoute path='/invitacion/:key' exact>
					<PageInvitation />
				</PublicRoute>
				
				<PublicRoute>
					No encontrado
				</PublicRoute>
			</Switch>
		</Suspense>
	);
}

export function PublicRoute({ children, notSeeBeforeAuth=false, ...rest }) {
	const { auth, actived_at } = useSelector((state) => ({
		auth: state.userData.auth,
		actived_at: state.userData.user.actived_at
	}));
	
	// AccessKey
	const keyL = JSON.parse(localStorage.getItem('access_key'));
	const keyS = JSON.parse(sessionStorage.getItem('access_key'));
	
	// Redireccionar al Login si existe una Access key almacenada
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (auth && !notSeeBeforeAuth) {
					if (!actived_at && location.pathname !== '/setup') {
						return (
							<Redirect to={'/setup'} />
						);
						
					}
					return	(children);	
				}else if (auth && notSeeBeforeAuth){
					return (
						<Redirect to={'/gedure'} />
					);
				}else {
					// Verificar si existen AccesKeys por validar y si el path actual
					// es diferente a "/entrar"
					if ((keyL || keyS) && location.pathname !== "/entrar") {
						return (
							<Redirect to={{
								pathname: "/entrar",
								state: { from: location, protect: false }
							}} />
						);
					}else {
						return (children);
					}
				}
			}}
		/>
	);
}

export function ProtectRoute({ children, ...rest }) {
	const { auth, actived_at } = useSelector((state) => ({
		auth: state.userData.auth,
		actived_at: state.userData.user.actived_at
	}));
	
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (auth) {
					if (!actived_at && location.pathname !== '/setup') {
						return (
							<Redirect to={'/setup'} />
						);
						
					}
					return	(children);	
				}else {
					return (
						<Redirect to={{
              pathname: "/entrar",
              state: { from: location, protect: true }
            }} />
					);
				}
			}}
		/>
	);
}

export function Loader(props){
	const { theme } = useSelector((state) => ({
		theme: state.settings.tema,
	}));
	
	const classes = useStyles();
	
	return (
		<Grid container direction='column' justify='center' alignItems='center' className={classes.loading}>
			{theme === 'light' ? 
				(
				<React.Fragment>
					<img src={logoL} alt='Logo de la institución' className='loading__img' />
					<ReactLoading type="bars" color="#00000080" width={150} height={100} />
				</React.Fragment>
				)
			:
				(
				<React.Fragment>
					<img src={logoD} alt='Logo de la institución' className='loading__img' />
					<ReactLoading type="bars" color="#FFFFFF80" width={150} height={100} />
				</React.Fragment>
				)
			}
		</Grid>
	)
}

export default Routers;