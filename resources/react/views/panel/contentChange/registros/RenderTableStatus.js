import React, { useEffect } from 'react';

//Material-UI
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	LinearProgress
} from '@material-ui/core';

//Redux
import { connect } from 'react-redux';

//SnackBar
import { useSnackbar } from 'notistack';

function RenderTableError({ dataTable, error }) {
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	useEffect(
		() => {
			if (dataTable !== null) {
				enqueueSnackbar('No hay registros que mostrar', {
					variant: 'info'
				});
			} else if (error === 'no_access') {
				enqueueSnackbar('No estás autorizado', {
					variant: 'error'
				});
			}else {
				enqueueSnackbar('No se ha podido relizar la petición', {
					variant: 'error'
				});
			}
		},
		[enqueueSnackbar, dataTable]
	);

	//Regresar componente
	return (
		<TableContainer
			component={Paper}
			style={{
				maxHeight: '450px',
				overflow: 'auto'
			}}
			variant="outlined"
		>
			<Table aria-label="Tabla de Registros" size="small">
				<TableHead>
					<TableRow>
						<TableCell align="center">Cédula</TableCell>
						<TableCell align="center">Usuario</TableCell>
						<TableCell align="center">Acción</TableCell>
						<TableCell align="center">Opciones</TableCell>
					</TableRow>
				</TableHead>
			</Table>
			<LinearProgress
				variant="determinate"
				value={100}
				color="secondary"
				style={{ width: '100%' }}
			/>
		</TableContainer>
	);
}

export function RenderTableSearch() {
	return (
		<TableContainer
			component={Paper}
			style={{
				maxHeight: '450px',
				overflow: 'auto'
			}}
			variant="outlined"
		>
			<Table aria-label="Tabla de Registros" size="small">
				<TableHead>
					<TableRow>
						<TableCell align="center">Cédula</TableCell>
						<TableCell align="center">Usuario</TableCell>
						<TableCell align="center">Acción</TableCell>
						<TableCell align="center">Opciones</TableCell>
					</TableRow>
				</TableHead>
			</Table>
			<LinearProgress variant="query" style={{ width: '100%' }} />
		</TableContainer>
	);
}

const mapStateToProps = state => ({
	dataTable: state.panelSettings.logsSection.dataTable,
	error: state.panelSettings.logsSection.error
});

export default connect(mapStateToProps)(RenderTableError);