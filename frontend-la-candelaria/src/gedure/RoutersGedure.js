import React, { lazy, useMemo } from 'react';

// React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Routers
const PageIndex = lazy(() => import('./index/PageIndex'));
//const PageRegistros = lazy(() => import('./registros/PageRegistros'));
//const PageBoletas = lazy(() => import('./boletas/PageBoletas'));
//const RoutersUsers = lazy(() => import('./usuarios/RoutersUsers'));
//const RoutersPosts = lazy(() => import('./publicaciones/RoutersPosts'));
//const RoutersBoletas = lazy(() => import('./boletas_admin/RoutersBoletas'));
const RoutersDeudas = lazy(() => import('./deudas_admin/RoutersDeudas'));
//const PageSoliContacto = lazy(() => import('./soli_contacto/PageSoliContacto'));
const PageGedureConfiguracion = lazy(() => import('./configuracion/PageGedureConfiguracion'));
//const PageCuenta = lazy(() => import('./cuenta/PageCuenta'));
const PageFAQ = lazy(() => import('./preguntas/PageFAQ'));

export default function RoutersGedure() {
	let { url } = useRouteMatch();
	
	const { permissions, privilegio } = useSelector((state) => ({
		permissions: state.userData.permissions,
		privilegio: state.userData.user.privilegio,
	}));
	
	const listA = useMemo(() => [
		/*{
			path: `${url}/registros`,
			component: <PageRegistros />,
			exact: true,
			iCanSee: Boolean(permissions?.sin_asignar?.registros_index),
		},
		{
			path: `${url}/usuarios`,
			component: <RoutersUsers />,
			exact: false,
			iCanSee: Boolean(permissions?.administrar?.users_index),
		},
		{
			path: `${url}/publicaciones`,
			component: <RoutersPosts />,
			exact: false,
			iCanSee: Boolean(permissions?.administrar?.posts_index),
		},
		{
			path: `${url}/boletas`,
			component: <RoutersBoletas />,
			exact: false,
			iCanSee: Boolean(permissions?.administrar?.boletas_index),
		},*/
		{
			path: `${url}/deudas`,
			component: <RoutersDeudas />,
			exact: false,
			iCanSee: Boolean(true),
		},
		/*{
			path: `${url}/soli-contacto`,
			component: <PageSoliContacto />,
			exact: true,
			iCanSee: Boolean(permissions?.administrar?.contact_index),
		},*/
		{
			path: `${url}/configuracion`,
			component: <PageGedureConfiguracion />,
			exact: false,
			iCanSee: Object.keys(permissions?.gedure || {}).length !== 0,
		}
	], [permissions, url]);
	
	const listV = useMemo(() => [
		/*{
			path: `${url}/boletas`,
			component: <PageBoletas />,
			exact: true,
			iCanSee: true,
		},*/
	], [url]);
	
	return (
		<Switch>
			<Route path={`${url}/`} exact>
				<PageIndex />
			</Route>

			{privilegio === 'A-' && listA.map((data, i) => {
				if (data.iCanSee) {
					return (
						<Route key={i} path={data.path} exact={data.exact}>
							{data.component}
						</Route>
					);
				}

				return null;
			})}

			{privilegio === 'V-' && listV.map((data, i) => {
				if (data.iCanSee) {
					return (
						<Route key={i} path={data.path} exact={data.exact}>
							{data.component}
						</Route>
					);
				}

				return null;
			})}

			<Route path={`${url}/cuenta`}>
				{/*<PageCuenta />*/}
			</Route>

			<Route path={`${url}/preguntas-frecuentes`}>
				<PageFAQ />
			</Route>

			<Route>
				No encontrado
			</Route>
		</Switch>
	);
}