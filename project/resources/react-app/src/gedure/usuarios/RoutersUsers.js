import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Routers
const PageUserIndex = lazy(() => import('./index/PageUserIndex'));
const PageShowUser = lazy(() => import('./show/PageShowUser'));

function RoutersPanel() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageUserIndex />
				</Route>
				
				<Route path={`${url}/ver/:id`}>
					<PageShowUser />
				</Route>
				
				<Route>
					No encontrado
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default RoutersPanel;