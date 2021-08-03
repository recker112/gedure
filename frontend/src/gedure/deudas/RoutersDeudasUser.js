import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Components
import { NotFound } from '../../Routers';

// Routers
const PageDeudasIndex = lazy(() => import('./index/PageDeudasIndex'));

export default function RoutersDeudasUser() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageDeudasIndex />
				</Route>
				
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</React.Fragment>
	);
}