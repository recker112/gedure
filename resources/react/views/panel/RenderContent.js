//React
import React, { lazy } from 'react';

//Router
import {
  Switch,
  Route,
} from "react-router-dom";

//Redux
import { connect } from 'react-redux';

//Components
import { NoFound } from '../Routers';

//Lazy
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
	let fixNull;
	if (content === null) {
		fixNull = "home";
	}else {
		fixNull = content;
	}
	
	if (privilegio === 'A-') {
		return (
			<RenderContentAdmin content={fixNull} />
		);
	} else if (privilegio === 'V-') {
		return (
			<RenderContentUser content={fixNull} />
		);
	} else {
		return <main>No disponible por los momentos</main>;
	}
}

function RenderContentUser({ content }) {
	if (content === 'home') {
		return <main>Bienvenido.</main>;
	}

	if (content === 'news') {
		return <React.Fragment />;
	}

	if (content === 'boleta') {
		return (
			<main>
				<BoletasUser />
			</main>
		);
	}

	return (<NoFound />);
}

function RenderContentAdmin({ content }) {
	if (content === "home") {
		return (
			<main>
				<Home />
			</main>
		);
	}else if (content === "reg") {
		return (
			<main>
				<Registros />
			</main>
		);
	}else if (content === "modify") {
		return (
			<main>
				<Modificar />
			</main>
		);
	}else if (content === "upload") {
		return (
			<main>
				<Cargar />
			</main>
		);
	}else if (content === "userOptions") {
		return (
			<main>
				<Opciones />
			</main>
		);
	}else if (content === "delete") {
		return (
			<main>
				<Borrar />
			</main>
		);
	}else if (content === "posting") {
		return (
			<main>
				<Publicar />
			</main>
		);
	}else {
		return (<NoFound />);
	}
}

const mapStateToProps = state => ({
	privilegio: state.userData.privilegio
});

export default connect(mapStateToProps)(RenderContent);