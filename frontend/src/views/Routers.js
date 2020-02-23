//React
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactLoading from 'react-loading';

//Componentes
const PageIndex = lazy(() => import(/* webpackChunkName: "Index" */ './index/PageIndex'));
const PageNews = lazy(() => import(/* webpackChunkName: "News" */ './news/PageNews'));
const PagePanel = lazy(() => import(/* webpackChunkName: "Panel" */ './panel/PagePanel'));

function Routers() {
	return (
		/* Switch sirve para escojer la ruta la que mas se acerque a la
    ruta actual, es decir, que de todas esas rutas, la app escogerรก
    la que mรกs se asemeje, excepto si se coloca el atributo "exact" */
		<Suspense fallback={<Loader />}>
			<Switch>
				<Route exact path="/" component={PageIndex} />
				<Route exact path="/login" component={PageIndex} />
				<Route exact path="/news" component={PageNews} />
				<Route exact path="/panel" component={PagePanel} />
				<Route component={noFound} />
			</Switch>
		</Suspense>
	);
}

function Loader(){
	return (
		<main className="BoxPage">
			<div className="loading" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
				<ReactLoading type="bars" color="#6B8DD6" width={150} height={100} />
			</div>
		</main>
	)
}

function noFound() {
	return <main className="BoxPage">No se ha encontrado una ruta</main>;
}

export default Routers;