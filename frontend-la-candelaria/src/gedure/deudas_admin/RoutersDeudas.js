import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Routers
const PageDeudasIndex = lazy(() => import('./index/PageDeudasIndex'));
const PageLoteDeudaShow = lazy(() => import('./show/PageLoteDeudaShow'));

export default function RoutersBoletas() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageDeudasIndex />
				</Route>
				
				<Route path={`${url}/ver/:id`} exact>
					<PageLoteDeudaShow />
				</Route>
				
				<Route>
					No encontrado
				</Route>
			</Switch>
		</React.Fragment>
	);
}