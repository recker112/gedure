import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Components
import NotFound from '../../../components/NotFound';

// Routers
const PageUsuarios = lazy(() => import('./index/PageUsuarios'));
const PageUsuariosCrear = lazy(() => import('./crear/PageUsuariosCrear'));

function RoutersPanelUsers() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageUsuarios />
				</Route>
				
				<Route path={`${url}/crear`}>
					<PageUsuariosCrear />
				</Route>
				
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default RoutersPanelUsers;