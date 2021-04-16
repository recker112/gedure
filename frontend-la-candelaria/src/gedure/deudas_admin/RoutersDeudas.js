import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Routers
const PageDeudasIndex = lazy(() => import('./index/PageDeudasIndex'));
const PageDeudasCreate = lazy(() => import('./crear/PageDeudasCrear'));

export default function RoutersBoletas() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageDeudasIndex />
				</Route>
				
				<Route path={`${url}/crear`} exact>
					<PageDeudasCreate />
				</Route>
				
				<Route>
					No encontrado
				</Route>
			</Switch>
		</React.Fragment>
	);
}