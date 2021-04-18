import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Routers
const PageDeudasIndex = lazy(() => import('./index/PageDeudasIndex'));

export default function RoutersBoletas() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageDeudasIndex />
				</Route>
				
				<Route>
					No encontrado
				</Route>
			</Switch>
		</React.Fragment>
	);
}