import React, { lazy, useMemo } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Routers
const PageIndex = lazy(() => import('./index/PageIndex'));
const PageRegistros = lazy(() => import('./registros/PageRegistros'));
const PageBoletas = lazy(() => import('./boletas/PageBoletas'));

function RoutersPanel() {
	let { url } = useRouteMatch();
	
	const { permissions, privilegio } = useSelector((state) => ({
		permissions: state.userData.permissions,
		privilegio: state.userData.user.privilegio,
	}));
	
	const listA = useMemo(() => [
		{
			path: `${url}/registros`,
			component: <PageRegistros />,
			exact: true,
			iCanSee: Boolean(permissions?.sin_asignar?.registros_index),
		},
	], [permissions, url]);
	
	const listV = useMemo(() => [
		{
			path: `${url}/boletas`,
			component: <PageBoletas />,
			exact: true,
			iCanSee: Boolean(permissions?.sin_asignar?.registros_index),
		},
	], [permissions, url]);
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageIndex />
				</Route>
				
				{privilegio === 'A-' && listA.map((data, i) => {
					if (data.iCanSee) {
						return (
							<Route key={i} path={data.path} exact={!Boolean(data?.enableNoExact)}>
								{data.component}
							</Route>
						);
					}

					return null;
				})}
				
				{privilegio === 'V-' && listV.map((data, i) => {
					if (data.iCanSee) {
						return (
							<Route key={i} path={data.path} exact={!Boolean(data?.enableNoExact)}>
								{data.component}
							</Route>
						);
					}

					return null;
				})}
				
				<Route>
					No encontrado
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default RoutersPanel;