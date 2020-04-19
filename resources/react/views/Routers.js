//React
import React, { Suspense, lazy } from 'react';

//React Router
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

//redux
import { connect } from 'react-redux';

//Loading
import ReactLoading from 'react-loading';

//Componentes
const PageIndex = lazy(() => import(/* webpackChunkName: "Index" */ './index/PageIndex'));
const PageNews = lazy(() => import(/* webpackChunkName: "News" */ './news/PageNews'));
const PagePanel = lazy(() => import(/* webpackChunkName: "Panel" */ './panel/PagePanel'));

function Routers({ auth }) {
	let query = useQuery();
	return (
		/* Switch sirve para escojer la ruta la que mas se acerque a la
    ruta actual, es decir, que de todas esas rutas, la app escogerรก
    la que mรกs se asemeje, excepto si se coloca el atributo "exact" */
		<Suspense fallback={<Loader />}>
			<Switch>
				<PublicRoute exact auth={auth} path="/">
					<PageIndex />
				</PublicRoute>
				
				<PublicRoute exact auth={auth} path="/login">
					<PageIndex />
				</PublicRoute>
				
				<PublicRoute exact auth={auth} path="/news">
					<PageNews />
				</PublicRoute>
				
				<ProtectRoute exact auth={auth} path="/panel">
					<PagePanel content={query.get("show")} />
				</ProtectRoute>
				
				<PublicRoute auth={auth}>
					<NoFound />
				</PublicRoute>
			</Switch>
		</Suspense>
	);
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function PublicRoute({ children, auth, onlyUsers = null, ...rest }) {
	//AccessKey
	const keyL = JSON.parse(localStorage.getItem('key'));
	const keyS = JSON.parse(sessionStorage.getItem('key'));
	
	//Redireccionar al Login si existe una Access key almacenada
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (auth) {
					return	(children);
				}else {
					//Verificar si existen AccesKeys por validar
					if ((keyL || keyS) && location.pathname !== "/login") {
						return (
							<Redirect to={{
								pathname: "/login",
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

export function ProtectRoute({ children, auth, onlyUsers = null, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (auth) {
					return	children
				}else {
					return (
						<Redirect to={{
              pathname: "/login",
              state: { from: location, protect: true }
            }} />
					);
				}
			}}
		/>
	);
}

export function Loader(){
	return (
		<main className="BoxPage">
			<div className="loading" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
				<ReactLoading type="bars" color="#6B8DD6" width={150} height={100} />
			</div>
		</main>
	)
}

export function NoFound() {
	return (
		<main className="BoxPage" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
			<h1 style={{fontSize: 50, marginBottom: 0, marginTop: 0}}>
				4<span color="primary">0</span>4
			</h1>
			<ReactLoading type="cylon" color="#6B8DD6" />
			<p style={{marginTop: 0, textAlign: "center"}}>
				La pรกgina solicitada no se ha podido encontrar, por favor intente
				con una diferente.
			</p>
		</main>
	);
}

//REDUX
const mapStateToProps = state => ({
	auth: state.loginStatus.auth
});

export default connect(mapStateToProps, null)(Routers);
