import React, { lazy, useMemo } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Routers
const PageIndex = lazy(() => import('./index/PageIndex'));
const PageBoletas = lazy(() => import('./boletas/PageBoletas'));

function RoutersPanel() {
	let { url } = useRouteMatch();
	
	const { permissions, privilegio } = useSelector((state) => ({
		permissions: state.userData.permissions,
		privilegio: state.userData.user.privilegio,
	}));
	
	const listV = useMemo(() => [
		{
			path: `${url}/boletas`,
			component: <PageBoletas />,
			exact: true,
			iCanSee: Boolean(permissions?.administrar?.registros_index),
		},
	], [permissions, url]);
	
	return (
		<React.Fragment>
			<Switch>
				<Route path={`${url}/`} exact>
					<PageIndex />
				</Route>
				
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