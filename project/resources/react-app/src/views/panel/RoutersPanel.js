import React, { lazy, useMemo } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Components
import NotFound from '../../components/NotFound';

// Redux
import { useSelector } from 'react-redux';

// Routers
const PageIndex = lazy(() => import('./index/PageIndex'));
const PageRegistros = lazy(() => import('./registros/PageRegistros'));
const RoutersPanelUsers = lazy(() => import('./usuarios/RoutersPanelUsers'));
const PageNoticias = lazy(() => import('./noticias/PageNoticias'));
const SolicitudContacto = lazy(() => import('./soli_contacto/SolicitudContacto'));

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
			iCanSee: Boolean(permissions?.administrar?.registro_ver),
		},
		{
			path: `${url}/noticias`,
			component: <PageNoticias />,
			iCanSee: Boolean(permissions?.publicaciones?.post_modify),
		},
		{
			path: `${url}/usuarios`,
			component: <RoutersPanelUsers />,
			enableNoExact: true,
			iCanSee: Boolean(permissions?.administrar?.user_modify),
		},
		{
			path: `${url}/solicitudes_contacto`,
			component: <SolicitudContacto />,
			iCanSee: 1,
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

				<Route>
					<NotFound />
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default RoutersPanel;