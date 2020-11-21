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
import logoL from '../imgs/Farvicon_no_fondo.png';
import logoD from '../imgs/Farvicon_no_fondo_white.png';
import NotFound from '../components/NotFound';

// Redux
import { useSelector } from 'react-redux';

// Routers
const PageIndex = lazy(() => import('./index/PageIndex'));
const PageNoticias = lazy(() => import('./noticias/PageNoticias'));
const PageShowNoticia = lazy(() => import('./noticias/PageShowNoticia'));
const PageSolicitud = lazy(() => import('./solicitud/PageSolicitud'));
const PageContactanos = lazy(() => import('./contactanos/PageContactanos'));
const PageLogin = lazy(() => import('./login/PageLogin'));
const PageRecovery = lazy(() => import('./login/PageRecovery'));
const RoutersPanel = lazy(() => import('./panel/Routers'));

const useStyles = makeStyles((theme) => ({
	loading: {
		flexGrow: 1
	}
}));

function Routers() {
	const { theme, auth } = useSelector((state) => ({
		auth: state.userData.auth,
		theme: state.settings.tema,
	}));
	
	return (
		/* Switch sirve para escojer la ruta la que mas se acerque a la
    ruta actual, es decir, que de todas esas rutas, la app escogerรก
    la que mรกs se asemeje, excepto si se coloca el atributo "exact" */
		<Suspense fallback={<Loader theme={theme} />}>
			<Switch>
				<PublicRoute auth={auth} path='/' exact notSeeBeforeAuth>
					<PageIndex />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/noticias' exact>
					<PageNoticias />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/noticias/:slug' exact>
					<PageShowNoticia />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/solicitud' exact>
					<PageSolicitud />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/contactanos' exact>
					<PageContactanos />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/entrar' exact>
					<PageLogin />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/recuperar' exact notSeeBeforeAuth>
					<PageRecovery />
				</PublicRoute>
				
				<ProtectRoute auth={auth} path='/panel'>
					<RoutersPanel />
				</ProtectRoute>
				
				<PublicRoute auth={auth}>
					<NotFound />
				</PublicRoute>
			</Switch>
		</Suspense>
	);
}

export function PublicRoute({ children, auth, notSeeBeforeAuth=false, ...rest }) {
	// AccessKey
	const keyL = JSON.parse(localStorage.getItem('access_key'));
	const keyS = JSON.parse(sessionStorage.getItem('access_key'));
	
	// Redireccionar al Login si existe una Access key almacenada
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (auth && !notSeeBeforeAuth) {
					return	(children);
				}else if (auth && notSeeBeforeAuth){
					return (
						<Redirect to={'/panel'} />
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

export function ProtectRoute({ children, auth, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (auth) {
					return	children
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
	const { theme='light' } = props;
	
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