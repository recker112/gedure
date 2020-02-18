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

//SnackBar
import { useSnackbar } from 'notistack';

function RenderTableError() {
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		enqueueSnackbar('No se ha podido relizar la petición', {
			variant: 'error'
		});
	});

	//Regresar componente
	return (
		<TableContainer
			component={Paper}
			style={{
				maxHeight: '450px',
				overflow: 'auto'
			}}
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

export default RenderTableError;