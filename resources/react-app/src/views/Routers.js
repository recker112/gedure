// React
import React, { Suspense, lazy } from 'react';

// React Router
import { Switch, Route, Redirect } from 'react-router-dom';

// Material-Ui
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// redux
import { connect } from 'react-redux';

// Loading
import ReactLoading from 'react-loading';

// Componentes
import logoL from './../imgs/favicon_no_fondo.png';
import logoD from './../imgs/favicon_no_fondo_white.png';

// Routers
const PageIndex = lazy(() => import('./index/Main'));
const PageNews = lazy(() => import('./noticias/Main'));
const ShowNotice = lazy(() => import('./noticias/ShowNotice'));
const PageContacto = lazy(() => import('./contacto/Main'));
const Login = lazy(() => import('./login/Main'));
const Recovery = lazy(() => import('./login/Recovery'));

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		flexGrow: 1
	},
	loading: {
		flexGrow: 1
	}
}));

function Routers({ auth, theme }) {
	return (
		/* Switch sirve para escojer la ruta la que mas se acerque a la
    ruta actual, es decir, que de todas esas rutas, la app escogerรก
    la que mรกs se asemeje, excepto si se coloca el atributo "exact" */
		<Suspense fallback={<Loader theme={theme} />}>
			<Switch>
				<PublicRoute auth={auth} path='/' exact>
					<PageIndex />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/noticias' exact>
					<PageNews />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/noticias/:id' exact>
					<ShowNotice />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/contactanos' exact>
					<PageContacto />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/entrar' exact>
					<Login />
				</PublicRoute>
				
				<PublicRoute auth={auth} path='/recovery' exact>
					<Recovery />
				</PublicRoute>
				
				<PublicRoute auth={auth}>
					<NoFound />
				</PublicRoute>
			</Switch>
		</Suspense>
	);
}

export function PublicRoute({ children, auth, ...rest }) {
	// AccessKey
	const keyL = JSON.parse(localStorage.getItem('key'));
	const keyS = JSON.parse(sessionStorage.getItem('key'));
	
	// Redireccionar al Login si existe una Access key almacenada
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (auth) {
					return	(children);
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
              pathname: "/",
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

export function NoFound() {
	const classes = useStyles();
	
	return (
		<h1 className={classes.root}>Página no encontrada</h1>
	);
}

//REDUX
const mapStateToProps = state => ({
	auth: state.userData.auth,
	theme: state.settings.tema,
});

export default connect(mapStateToProps, null)(Routers);
