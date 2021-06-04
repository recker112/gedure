import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Components
import { NotFound } from '../../Routers';

// Routers
const PageTransaccionesIndex = lazy(() => import('./index/PageTransacciones'));
const PageVerTransacciones = lazy(() => import('./ver/PageVerTransacciones'));

export default function RoutersTransacciones() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageTransaccionesIndex />
				</Route>
				
				<Route path={`${url}/ver/:id`} exact>
					<PageVerTransacciones />
				</Route>
				
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</React.Fragment>
	);
}