import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Components
import NotFound from '../../components/NotFound';

// Routers
const PageIndex = lazy(() => import('./index/PageIndex'));

function Routers() {
	let { url } = useRouteMatch();
	
	return (
		<Switch>
			<Route path={`${url}/`} exact>
				<PageIndex />
			</Route>
			
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default Routers;