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
const PageNoticias = lazy(() => import('./noticias/PageNoticias'));

function Routers() {
	let { url } = useRouteMatch();
	
	const { permissions, privilegio } = useSelector((state) => ({
		permissions: state.userData.permissions,
		privilegio: state.userData.user.privilegio,
	}));
	
	const listA = useMemo(() => [
		{
			path: `${url}/registros`,
			component: <PageRegistros />,
			iCanSee: Boolean(permissions?.administrar?.registro_ver),
		},
		{
			path: `${url}/noticias`,
			component: <PageNoticias />,
			iCanSee: Boolean(permissions?.publicaciones?.post_modify),
		},
	], [permissions, url]);
	
	return (
		<Switch>
			<Route path={`${url}/`} exact>
				<PageIndex />
			</Route>
			
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
			
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default Routers;