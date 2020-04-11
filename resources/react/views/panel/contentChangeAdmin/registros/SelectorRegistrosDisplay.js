import React from 'react';

//Componentes
import { RenderSelect } from '../../../../components/RendersGlobal';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';

function SelectorRegistrosDisplay({ select, updateInputValue }) {
	const handleChangeSelect = e => {
		const value = e.target.value;

		updateInputValue(value, 'LOGS_SELECT');
	};

	//Config de registros
	const registSelect = {
		name: 'registros',
		values: [
			{
				value: 'all',
				name: 'Todos'
			},
			{
				value: 'bans',
				name: 'Baneados'
			},
			{
				value: 'session',
				name: 'Inicio de sesión'
			},
			{
				value: 'changePass',
				name: 'Cambio de contraseña'
			}
		]
	};

	return (
		<div className="Box">
			<span className="title">Buscar Registros</span>
			<div className="content">
				<RenderSelect
					action={handleChangeSelect}
					val={select}
					data={registSelect}
					classNameSet="select"
					customWidth="auto"
					empty={false}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	select: state.panelSettings.logsSection.selectSearch
});

const mapDispatchToProps = {
	updateInputValue
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectorRegistrosDisplay);