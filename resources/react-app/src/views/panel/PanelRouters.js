import React, { lazy } from 'react';

import { NoFound } from '../Routers';

import { useSelector } from 'react-redux';

import { Switch, Route, useRouteMatch } from 'react-router-dom';

const RegistrosAdmin = lazy(() =>
	import('./registros/ShowRegistros')
);

function PanelRouters () {
	const { privilegio } = useSelector(state => ({
		privilegio: state.userData.user.privilegio
	}));
	
	let { url } = useRouteMatch();
	
	const listV = [];
	
	const listA = [
		{
			path: `${url}/registros`,
			component: <RegistrosAdmin />
		}
	];
	
	const listC = [];
	
	return (
		<Switch>
			<Route path={`${url}/`} exact>
				PANEL
			</Route>
			
			{privilegio === 'V-' && listV.map((data, i) => {
				return (
					<Route key={i} path={data.path} exact>
						{data.component}
					</Route>
				);
			})}
			
			
			{privilegio === 'A-' && listA.map((data, i) => {
				return (
					<Route key={i} path={data.path} exact>
						{data.component}
					</Route>
				);
			})}
			
			{privilegio === 'CR-' && listC.map((data, i) => {
				return (
					<Route key={i} path={data.path} exact>
						{data.component}
					</Route>
				);
			})}
			
			<Route>
				<NoFound />
			</Route>
		</Switch>
	)
}

export default PanelRouters;