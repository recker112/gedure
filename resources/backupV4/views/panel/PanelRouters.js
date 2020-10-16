//React
import React, { lazy } from 'react';

//Components
import { NoFound } from '../Routers';

//Redux
import { connect } from 'react-redux';

//React Router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

//Lazy
const Home = lazy(() =>
	import('./contentChangeAdmin/home/RenderHome')
);
const Registros = lazy(() =>
	import('./contentChangeAdmin/registros/RenderRegistros')
);
const Modificar = lazy(() =>
	import('./contentChangeAdmin/consultarModificar/RenderCO_MO')
);
const Desblock = lazy(() =>
	import('./contentChangeAdmin/desblock/RenderDesblock')
);
const Cargar = lazy(() =>
	import('./contentChangeAdmin/cargar/RenderCargar')
);
const Opciones = lazy(() =>
	import('./contentChangeAdmin/opciones/RenderOptions')
);
const Borrar = lazy(() =>
	import('./contentChangeAdmin/borrar/RenderBorrar')
);
const Publicar = lazy(() =>
	import('./contentChangeAdmin/posting/RenderPublicar')
);
const BorrarPublicacion = lazy(() =>
	import('./contentChangeAdmin/delposting/RenderDelPublic')
);
const BoletasStudiend = lazy(() =>
	import('./contentChangeUser/boletas/RenderBoletas')
);

function PanelRouters ({ privilegio }) {
	//Get URL
	let { url } = useRouteMatch();
	
	const listV = [
		{
			path: `${url}/boletas`,
			component: <BoletasStudiend />,
		}
	];
	
	const listA = [
		{
			path: `${url}/registros`,
			component: <Registros />,
		},
		{
			path: `${url}/modifyUsers`,
			component: <Modificar />,
		},
		{
			path: `${url}/desblockAccount`,
			component: <Desblock />,
		},
		{
			path: `${url}/uploadData`,
			component: <Cargar />,
		},
		{
			path: `${url}/userOptions`,
			component: <Opciones />,
		},
		{
			path: `${url}/deleteData`,
			component: <Borrar />,
		},
		{
			path: `${url}/toPost`,
			component: <Publicar />,
		},
		{
			path: `${url}/deletePost`,
			component: <BorrarPublicacion />,
		}
	];
	
	const listC = [
		{
			path: `${url}/toPost`,
			component: <Publicar />,
		},
		{
			path: `${url}/deletePost`,
			component: <BorrarPublicacion />,
		}
	]
	
	return (
		<Switch>
			<Route path={`${url}/`} exact>
				<Home />
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

const mapStateToProps = state => ({
	privilegio: state.userData.privilegio
});

export default connect(mapStateToProps)(PanelRouters);