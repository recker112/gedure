import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Components
import { NotFound } from '../../Routers';

// Routers
const PageIndex = lazy(() => import('./index/PageIndex'));
const PageShow = lazy(() => import('./show/PageShow'));
const PageVerify = lazy(() => import('./verify_pay/PageVerify'));

export default function RoutersTransacciones() {
	let { url } = useRouteMatch();
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageIndex />
				</Route>
				
				<Route path={`${url}/verificar-pago`} exact>
					<PageVerify />
				</Route>
				
				<Route path={`${url}/transacciones/ver/:id`} exact>
					<PageShow />
				</Route>
				
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</React.Fragment>
	);
}