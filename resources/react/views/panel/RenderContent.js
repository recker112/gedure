//React
import React from 'react';

//Loadable
import { lazy } from "@loadable/component";

//Redux
import { connect } from 'react-redux';

//Componentes
import { RenderNews } from '../news/PageNews';
const Home = lazy(() =>
	import(/* webpackChunkName: "Home" */ './contentChangeAdmin/home/RenderHome')
);
const Registros = lazy(() =>
	import(/* webpackChunkName: "Registros" */ './contentChangeAdmin/registros/RenderRegistros')
);
const Modificar = lazy(() =>
	import(/* webpackChunkName: "Modificar" */ './contentChangeAdmin/consultarModificar/RenderCO_MO')
);
const Cargar = lazy(() =>
	import(/* webpackChunkName: "Cargar" */ './contentChangeAdmin/cargar/RenderCargar')
);
const Opciones = lazy(() =>
	import(/* webpackChunkName: "Opciones" */ './contentChangeAdmin/opciones/RenderOptions')
);
const Borrar = lazy(() =>
	import(/* webpackChunkName: "Borrar" */ './contentChangeAdmin/borrar/RenderBorrar')
);
const Publicar = lazy(() =>
	import(/* webpackChunkName: "Publicar" */ './contentChangeAdmin/publicar/RenderPublicar')
);
const BoletasUser = lazy(() =>
	import(/* webpackChunkName: "Publicar" */ './contentChangeUser/boletas/RenderBoletas')
);

function RenderContent({ content, privilegio }) {
	if (privilegio === 'A-') {
		return <RenderContentAdmin content={content} />;
	} else if (privilegio === 'V-') {
		return <RenderContentUser content={content} />;
	} else {
		return <main>No disponible por los momentos</main>;
	}
}

function RenderContentUser({ content }) {
	if (content === 'home') {
		return <main>Bienvenido.</main>
	}
	
	if (content === 'news') {
		return <RenderNews />;
	}
	
	if (content === 'boleta') {
		return <main><BoletasUser /></main>;
	}
	
	return <main>No disponible por los momentos</main>;
}

function RenderContentAdmin({ content }) {
	if (content === 'home') {
		return (
			<main>
				<Home />
			</main>
		);
	} else if (content === 'news') {
		return <RenderNews />;
	} else if (content === 'reg') {
		return (
			<main>
				<Registros />
			</main>
		);
	} else if (content === 'co/mo') {
		return (
			<main>
				<Modificar />
			</main>
		);
	} else if (content === 'upload') {
		return (
			<main>
				<Cargar />
			</main>
		);
	} else if (content === 'options') {
		return (
			<main>
				<Opciones />
			</main>
		);
	} else if (content === 'delete') {
		return (
			<main>
				<Borrar />
			</main>
		);
	} else if (content === 'notice') {
		return (
			<main>
				<Publicar />
			</main>
		);
	} else {
		return (
			<main>
				<h1>Error</h1>
			</main>
		);
	}
}

const mapStateToProps = state => ({
	content: state.panelSettings.content,
    privilegio: state.userData.privilegio
});

export default connect(mapStateToProps)(RenderContent);
