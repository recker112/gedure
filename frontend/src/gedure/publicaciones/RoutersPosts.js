import React, { lazy } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Componets
import { NotFound } from '../../Routers';

// Routers
const PagePublicaciones = lazy(() => import('./index/PagePublicaciones'));
const PageCrearPost = lazy(() =>  import('./crear/PageCrearPost'));
const PageEditPost = lazy(() =>  import('./editar/PageEditPost'));

function RoutersPanel() {
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	let { url } = useRouteMatch();
	
	const list = [
		{
			path: `${url}/crear`,
			component: <PageCrearPost />,
			exact: true,
			iCanSee: Boolean(permissions?.administrar?.posts_create),
		},
		{
			path: `${url}/editar/:slug`,
			component: <PageEditPost />,
			exact: true,
			iCanSee: Boolean(permissions?.administrar?.posts_edit),
		},
	];
	
	return (
		<Switch>
			<Route path={`${url}/`} exact>
				<PagePublicaciones />
			</Route>

			{list.map((data, i) => {
				if (data.iCanSee) {
					return (
						<Route key={i} path={data.path} exact={data.exact}>
							{data.component}
						</Route>
					);
				}

				return null;
			})}

			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default RoutersPanel;