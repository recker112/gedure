//React
import React, {lazy, Suspense} from 'react';

//Redux
import { connect } from 'react-redux';

//Componentes
import { RenderNews } from '../news/PageNews';
const RenderHome = lazy(() => import(/* webpackChunkName: "Home" */ './contentChange/home/RenderHome'));
const RenderRegistros = lazy(() => import(/* webpackChunkName: "Registros" */ './contentChange/registros/RenderRegistros'));
const ContentConsultarModificar = lazy(() => import(/* webpackChunkName: "Modificar" */ './contentChange/ContentConsultarModificar'));

function RenderContent({ content, privilegio }) {
	if (privilegio === 'A-') {
		return <RenderContentAdmin content={content} />;
	} else if (privilegio === 'V-') {
		return <h1>USER</h1>;
	} else {
		return <h1>ERROR</h1>;
	}
}

function RenderContentAdmin({ content }) {
	if (content === 'home') {
		return (
			<main>
				<RenderHome />
			</main>
		);
	} else if (content === 'news') {
		return <RenderNews />;
	} else if (content === 'reg') {
		return (
			<main>
				<RenderRegistros />
			</main>
		);
	} else if (content === 'co/mo') {
		return (
			<main>
				<ContentConsultarModificar />
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