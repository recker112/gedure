import React, { lazy, useMemo } from 'react';

import { NoFound } from '../Routers';

import { useSelector } from 'react-redux';

import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Inicio = lazy(() =>
	import('./inicio/ShowIndex')
);

const RegistrosAdmin = lazy(() =>
	import('./registros/ShowRegistros')
);

const UsuariosAdmin = lazy(() =>
	import('./usuarios/ShowUsers')
);

function PanelRouters () {
	const { privilegio, permissions } = useSelector(state => ({
		privilegio: state.userData.user.privilegio,
		permissions: state.userData.permissions
	}));
	
	let { url } = useRouteMatch();
	
	const listV = [];
	
	const listA = useMemo(() => [
		{
			path: `${url}/registros`,
			component: <RegistrosAdmin />,
			iCanSee: Boolean(permissions.administrar.registro?.ver),
		},
		{
			path: `${url}/usuarios`,
			component: <UsuariosAdmin />,
			iCanSee: Boolean(permissions.administrar.user?.ver),
		}
	], [permissions, url]);
	
	const listC = [];
	
	return (
		<Switch>
			<Route path={`${url}/`} exact>
				<Inicio />
			</Route>
			
			{privilegio === 'V-' && listV.map((data, i) => {
				return (
					<Route key={i} path={data.path} exact>
						{data.component}
					</Route>
				);
			})}
			
			
			{privilegio === 'A-' && listA.map((data, i) => {
				if (data.iCanSee) {
					return (
						<Route key={i} path={data.path} exact>
							{data.component}
						</Route>
					);
				}
				
				return null;
			})}
			
			{privilegio === 'CR-' && listC.map((data, i) => {
				return (
					<Route key={i} path={data.path} exact>
						{data.component}
					</Route>
				);
			})}
			
			<Route>
				<NoFound styleUse={false} />
			</Route>
		</Switch>
	)
}

export default PanelRouters;