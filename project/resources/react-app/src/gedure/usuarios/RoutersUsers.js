import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Routers
const PageIndex = lazy(() => import('./index/PageIndex'));
const PageShow = lazy(() => import('./show/PageShow'));

function RoutersPanel() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageIndex />
				</Route>
				
				<Route path={`${url}/ver/:id`}>
					<PageShow />
				</Route>
				
				<Route>
					No encontrado
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default RoutersPanel;