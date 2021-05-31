import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Componets
import { NotFound } from '../../Routers';

// Routers
const PageUserIndex = lazy(() => import('./index/PageUserIndex'));
const PageShowUser = lazy(() => import('./show/PageShowUser'));

export default function RoutersUsers() {
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
					<NotFound />
				</Route>
			</Switch>
		</React.Fragment>
	);
}