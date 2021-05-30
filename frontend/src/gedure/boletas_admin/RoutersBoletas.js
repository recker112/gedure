import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Routers
const PageBoletasIndex = lazy(() => import('./index/PageBoletasIndex'));
const PageShowBoletas = lazy(() => import('./show/PageShowBoletas'));

export default function RoutersBoletas() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageBoletasIndex />
				</Route>
				
				<Route path={`${url}/ver/:id`} exact>
					<PageShowBoletas />
				</Route>
				
				<Route>
					No encontrado
				</Route>
			</Switch>
		</React.Fragment>
	);
}