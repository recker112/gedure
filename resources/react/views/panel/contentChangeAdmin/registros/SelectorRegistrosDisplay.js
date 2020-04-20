import React from 'react';

//Componentes
import { RenderSelect } from '../../../../components/RendersGlobal';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';

function SelectorRegistrosDisplay({ select, updateValue }) {
	const handleChangeSelect = e => {
		const value = e.target.value;

		updateValue(value, 'LOGS_SELECT');
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
	updateValue
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectorRegistrosDisplay);