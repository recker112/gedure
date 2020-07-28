//React
import React from 'react';

//React Route
import { useHistory } from 'react-router-dom';

//Material-UI
import { Grid, Paper, Button } from '@material-ui/core';

//Components
import SearchUsers from '../../../../components/SearchUsers';
import ConverterCursoCode from '../../../../components/reutilizar/ConverterCursoCode';
import ButtonLoading from '../../../../components/ButtonLoading';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';
import updateLoading from '../../../../actions/updateLoading';

//NotiStack
import { useSnackbar } from 'notistack';

function RenderDesblock({ blockData, updateLoading, updateValue }) {
	// Global Const
	const axios = window.axios;

	const { loading } = blockData;
	let history = useHistory();

	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	const handleClick = async () => {
		//Revertir loading
		updateLoading(true, 'DESBLOCK');

		try {
			const { cedula } = blockData.data;
			let res;

			res = await axios.delete(`api/ban/unlock/${cedula}`);

			const { description } = res.data;

			enqueueSnackbar(description, {
				variant: 'success',
			});

			// Limpiar recuadro
			updateValue({ cedula: '' }, 'DESBLOCK');
		} catch (error) {
			if (error.response) {
				//Errores HTTP
				const { status, data } = error.response;

				if (status === 400) {
					enqueueSnackbar(data.description, {
						variant: 'warning',
					});
				} else if (status === 403) {
					enqueueSnackbar(data.description, {
						variant: 'error',
					});
				} else if (status === 422) {
					enqueueSnackbar(data.description, {
						variant: 'error',
					});
				} else if (status === 500) {
					enqueueSnackbar('No se ha podido conectar con la base de datos', {
						variant: 'error',
					});
				} else {
					enqueueSnackbar('Error interno en el servidor', {
						variant: 'error',
					});
				}
			} else {
				enqueueSnackbar('Error interno en el sistema', {
					variant: 'error',
				});
			}
		}

		//Revertir loading
		updateLoading(false, 'DESBLOCK');
	};

	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} sm={6}>
				<Paper>
					<SearchUsers 
						apiUrl="api/ban/" 
						updateData={updateValue} 
						updateDataOption="DESBLOCK" 
					/>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={10}>
				<Paper className="Box">
					<span className="Box__Title">Información del usuario</span>
					<div className="Box__Content">
						<UserInfo
							data={blockData.data}
							updateData={updateValue}
							loading={loading}
							history={history}
							handleClick={handleClick}
						/>
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
}

function UserInfo({ loading, data, updateData, history, handleClick }) {
	const { cedula, name, privilegio, curso, seccion, locks, attemps } = data;

	const MakeData = {
		cedula,
		name,
		privilegio,
		option: 'update',
		curso,
		seccion,
	};

	const cursoParse = ConverterCursoCode(curso);

	if (cedula) {
		return (
			<Grid container spacing={2} justify="center">
				<Grid item xs={12} sm={6} style={{ fontSize: '20px', textAlign: 'center' }}>
					Privilegio: {privilegio}
				</Grid>
				<Grid item xs={12} sm={6} style={{ fontSize: '20px', textAlign: 'center' }}>
					Cédula: {cedula}
				</Grid>
				<Grid item xs={12} sm={6} style={{ fontSize: '20px', textAlign: 'center' }}>
					Nombre: {name}
				</Grid>
				{privilegio === 'V-' && (
					<Grid item xs={12} sm={6} style={{ fontSize: '20px', textAlign: 'center' }}>
						Curso: {cursoParse} sección {seccion}
					</Grid>
				)}
				<Grid item xs={12} sm={6} style={{ fontSize: '20px', textAlign: 'center' }}>
					Errores: {attemps}
				</Grid>
				<Grid item xs={12} sm={6} style={{ fontSize: '20px', textAlign: 'center' }}>
					Bloqueos: {locks}
				</Grid>
				<Grid container justify="center" spacing={2}>
					<Grid item xs={12} sm={3} style={{ textAlign: 'center' }}>
						<Button
							color="primary"
							variant="outlined"
							onClick={() => {
								updateData(MakeData, 'MODIFY_EXTERNO');
								history.push('/panel/modifyUsers');
							}}
							style={{ margin: '10px' }}
						>
							Editar
						</Button>
					</Grid>
					<Grid item xs={12} sm={3} style={{ textAlign: 'center', padding: '10px' }}>
						<ButtonLoading
							estilo="outlined"
							colorsito="secondary"
							text="Desbloquear"
							loading={loading}
							onClick={handleClick}
						/>
					</Grid>
				</Grid>
			</Grid>
		);
	}

	return null;
}

//Redux
const mapStateToProps = (state) => ({
	blockData: state.panelSettings.desblockSection,
});

const mapDispatchToProps = {
	updateLoading,
	updateValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderDesblock);