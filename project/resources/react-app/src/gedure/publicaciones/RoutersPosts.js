import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Routers
const PagePublicaciones = lazy(() => import('./index/PagePublicaciones'));
const PageCrearPost = lazy(() =>  import('./crear/PageCrearPost'));

function RoutersPanel() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PagePublicaciones />
				</Route>
				
				<Route path={`${url}/crear`} exact>
					<PageCrearPost />
				</Route>
				
				<Route>
					No encontrado
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default RoutersPanel;