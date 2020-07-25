//React
import React from 'react';

//Material-UI
import { Grid, Paper } from '@material-ui/core';

//Components
import { RenderSelect } from '../../../../components/RendersGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';
import { SeccionList, CursosList } from '../../../../components/ListDataGlobal';
import verifyErrorCustom from '../../../../components/reutilizar/verifyErrorCustom';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';
import errorInfo from '../../../../actions/errorInfo';
import updateLoading from '../../../../actions/updateLoading';

//Notistack
import { useSnackbar } from 'notistack';

function RenderBorrar({ data, updateValue, errorInfo, updateLoading }) {
	// Global Const
	const axios = window.axios;
	
	const { option, loading, curso, seccion, error } = data
	
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	const handleChange = e => {
		updateValue(e, 'DELETE');
	};
	
	const fetchData = async () => {
		try {
			let res;
			
			if (option === 'seccion'){
				res = await axios.delete(`api/users`, {
					data: {
						curso: curso,
						seccion: seccion
					}
				});
			}else if (option === 'boletas') {
				res = await axios.delete(`api/archivos/boletas`, {
					data: {
						curso: curso,
						seccion: seccion
					}
				});
			}
			
			const { description } = res.data;

			enqueueSnackbar(description, {
				variant: 'success'
			});
		} catch (error) {
			if (error.response){
				//Errores HTTP
				const { status, data } = error.response;

				if (status === 403){
					enqueueSnackbar(data.description, {
						variant: 'error'
					});
				}else if (status === 400){
					enqueueSnackbar(data.description, {
						variant: 'warning'
					});
				}else if (status === 500){
					enqueueSnackbar('No se ha podido conectar con la base de datos', {
						variant: 'error'
					});
				}else {
					enqueueSnackbar('Error interno en el servidor', {
						variant: 'error'
					});
				}
			}else {
				enqueueSnackbar('Error interno en el sistema', {
					variant: 'error'
				});
			}
		}
		
		updateLoading(false, 'DELETE');
	}

	const handleSubmit = e => {
		//Preparativos
		e.preventDefault();

		//Verificar datos
		const InputsArray = [
			{
				value: curso,
				name: 'curso'
			},
			{
				value: seccion,
				name: 'seccion'
			}
		];

		const error = verifyErrorCustom(InputsArray, errorInfo, 'DELETE');

		if (error) {
			return null;
		}
		
		
		updateLoading(true, 'DELETE');
		fetchData();
	};

	//Config de curso
	const cursoSelect = {
		name: 'curso',
		values: [
			{
				value: '',
				name: 'Grado/Año'
			},
			...CursosList
		]
	};

	//Config de seccion
	const seccionSelect = {
		name: 'seccion',
		values: [
			{
				value: '',
				name: 'Seccion'
			},
			...SeccionList,
			{
				value: 'all',
				name: 'Todas'
			}
		]
	};

	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} sm={5} md={4}>
				<Paper>
					<SelectorDelete action={handleChange} value={option} />
				</Paper>
			</Grid>
			<Grid item xs={12} sm={10}>
				<Paper className="Box">
					<div className="Box__Content">
						<form
							autoComplete="off"
							onSubmit={handleSubmit}
							method="POST"
							style={{ marginTop: '0' }}
						>
							<Grid container spacing={2} justify="center">
								<Grid item xs={5} sm={4} md={3}>
									<RenderSelect
										action={handleChange}
										val={curso}
										data={cursoSelect}
										error={error.curso}
									/>
								</Grid>
								<Grid item xs={5} sm={4} md={3}>
									<RenderSelect
										action={handleChange}
										val={seccion}
										data={seccionSelect}
										error={error.seccion}
									/>
								</Grid>
								<Grid item xs={12} style={{ textAlign: 'center' }}>
									<ButtonLoading
										estilo="outlined"
										colorsito="inherit"
										text="Borrar"
										loading={loading}
									/>
								</Grid>
							</Grid>
						</form>
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
}

function SelectorDelete({ action, value }) {
	//Config de opciones
	const deleteSelect = {
		name: 'option',
		values: [
			{
				value: 'seccion',
				name: 'Sección'
			},
			{
				value: 'boletas',
				name: 'Boletas'
			}
		]
	};

	return (
		<div className="Box">
			<span className="Box__Title">Borrar</span>
			<div className="Box__Content">
				<RenderSelect
					action={action}
					val={value}
					data={deleteSelect}
					classNameSet="select"
					customWidth="auto"
					empty={false}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	data: state.panelSettings.deleteSection
});

const mapDispatchToProps = {
	updateValue,
	errorInfo,
	updateLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderBorrar);