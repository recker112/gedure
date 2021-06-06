import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Components
import { NotFound } from '../../Routers';

// Routers
const PageIndex = lazy(() => import('./index/PageIndex'));

export default function RoutersTransacciones() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageIndex />
				</Route>
				
				<Route path={`${url}/transaccione/ver/:id`} exact>
					
				</Route>
				
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</React.Fragment>
	);
}