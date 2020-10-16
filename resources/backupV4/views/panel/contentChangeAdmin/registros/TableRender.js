import React from 'react';

//Material-UI
import Edit from '@material-ui/icons/Edit';

//Material Table
import MaterialTable from 'material-table';

//React Route
import { useHistory } from "react-router-dom";

//Componentes
import TableIcons from './TableIcons';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';

function TableRender({ dataTable, loading, updateValue }) {
	let history = useHistory();
	
	const EditUser = (event, rowData) => {
		const MakeData = {
			cedula: rowData.cedula,
			name: rowData.name,
			privilegio: rowData.privilegio
		}
		
		if (MakeData.privilegio === 'V-') {
			MakeData.curso = rowData.curso;
			MakeData.seccion = rowData.seccion;
		}
		
		updateValue(MakeData, 'MODIFY_EXTERNO');
		
		history.push("/panel/modifyUsers");
		return MakeData;
	}
	
	return (
		<MaterialTable
			title="Registros del sistema" 
			icons={TableIcons}
			columns={[
				{title: 'Cédula', field: 'cedula'},
				{title: 'Usuario', field: 'name'},
				{title: 'Acción', field: 'action'},
				{title: 'Fecha', field: 'fecha'}
			]}
			data={dataTable}
			actions={[
				{
					icon: ()=> <Edit />,
					tooltip: 'Editar usuario',
					onClick: EditUser
				},
			]}
			options={{
				actionsColumnIndex: -1
			}}
			localization={{
				body: {
					emptyDataSourceMessage: loading ? 'Buscando registros...' 
					: 'No hay registros'
				},
				header: {
					actions: 'Opciones'
				},
				toolbar: {
					searchPlaceholder: 'Buscar',
					searchTooltip: 'Buscar'
				},
				pagination: {
					labelDisplayedRows: '{from}-{to} de {count}',
					firstTooltip: 'Primera página',
					previousTooltip: 'Página anterior',
					nextTooltip: 'Próxima página',
					lastTooltip: 'Última página',
					labelRowsSelect: 'filas'
				},
			}}
		/>
	);
}

const mapStateToProps = (state) => ({
  dataTable: state.panelSettings.logsSection.dataTable,
	loading: state.panelSettings.logsSection.searching
});

const mapDispatchToProps = {
	updateValue
};

export default connect(mapStateToProps,mapDispatchToProps)(TableRender);