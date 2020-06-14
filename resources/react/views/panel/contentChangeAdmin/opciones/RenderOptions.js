//React
import React from 'react';

//Material-UI
import { Grid, Paper } from '@material-ui/core';
import { RenderSelect, RenderRadios, RenderInputs } from '../../../../components/RendersGlobal';

//Components
import ButtonLoading from '../../../../components/ButtonLoading';
import { CursosList, SeccionList } from '../../../../components/ListDataGlobal';
import verifyErrorCustom from '../../../../components/reutilizar/verifyErrorCustom';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';
import errorInfo from '../../../../actions/errorInfo';
import updateLoading from '../../../../actions/updateLoading';

//NotiStack
import { useSnackbar } from 'notistack';

function RenderOptions({ data, updateValue, errorInfo, updateLoading }) {
	const { option, nota, horario, estudiante, error, curso, seccion, loading } = data;
	
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();

	const handleChange = e => {
		updateValue(e, 'OPTIONS');
	};
	
	const fetchData = async () => {
		try {
			let res;
			
			if (option === 'estudiante') {
				res = await axios.post('api/user/options/studiend', {
					nota,
					horario,
					estudiante
				});
			}else if (option === 'seccion') {
				res = await axios.post('api/user/options/seccion', {
					nota,
					horario,
					curso,
					seccion
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

				if (status === 400) {
					enqueueSnackbar(data.description, {
						variant: 'warning'
					});
				} else if (status === 403) {
					enqueueSnackbar(data.description, {
						variant: 'error'
					});
				} else if (status === 422) {
					enqueueSnackbar(data.description, {
						variant: 'error'
					});
				} else if (status === 500) {
					enqueueSnackbar('No se ha podido conectar con la base de datos', {
						variant: 'error'
					});
				} else {
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
		
		updateLoading(false, 'OPTIONS');
	}

	const handleSubmit = e => {
		e.preventDefault();
		let error = false;

		//Verificar datos
		if (option === 'estudiante') {
			const InputsArray = [
				{
					value: estudiante,
					name: 'estudiante',
					minValue: 3
				}
			];
			
			error = verifyErrorCustom(InputsArray, errorInfo, 'OPTIONS');
		}else if (option === 'seccion') {
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

			error = verifyErrorCustom(InputsArray, errorInfo, 'OPTIONS');
		}

		//Cancelar REQ si hay errores
		if (error) {
			return null;
		}

		//REQ
		updateLoading(true, 'OPTIONS');
		fetchData();
	};

	//Config de Nota
	const notaRadio = {
		title: 'Nota',
		name: 'nota',
		values: [{ value: 'activo', name: 'Activar' }, { value: 'desactivo', name: 'Desactivar' }],
		color: 'primary'
	};

	//Config de Horario
	const horarioRadio = {
		title: 'Horario',
		name: 'horario',
		values: [{ value: 'activo', name: 'Activar' }, { value: 'desactivo', name: 'Desactivar' }],
		color: 'secondary'
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
			...SeccionList
		]
	};

	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} sm={5} md={4}>
				<Paper variant="outlined">
					<SelectFromOptions action={handleChange} value={option} />
				</Paper>
			</Grid>
			<Grid item xs={12} sm={10}>
				<Paper variant="outlined">
					<div className="Box">
						<div className="Box__Content">
							<form
								autoComplete="off"
								onSubmit={handleSubmit}
								method="POST"
								style={{ marginTop: '0' }}
							>
								<Grid container spacing={2} justify="center">
									<Grid item xs={12} style={{ textAlign: 'center' }}>
										<RenderRadios 
											val={nota} 
											accion={handleChange} 
											data={notaRadio} 
										/>
									</Grid>
									<Grid item xs={12} style={{ textAlign: 'center' }}>
										<RenderRadios 
											val={horario} 
											accion={handleChange} 
											data={horarioRadio}
										/>
									</Grid>
									{option === 'estudiante' && (
										<Grid 
											item 
											xs={12} 
											sm={6} 
											md={4} 
											style={{ textAlign: 'center' }}
										>
											<RenderInputs
												data={{ 
													val: estudiante,
													name: 'estudiante',
													label: 'Estudiante' 
												}}
												accion={handleChange}
												error={error.estudiante}
											/>
										</Grid>
									)}
									{option === 'seccion' && (
										<Grid item xs={5} sm={4} md={3}>
											<RenderSelect
												action={handleChange}
												val={curso}
												data={cursoSelect}
												error={error.curso}
											/>
										</Grid>
									)}
									{option === 'seccion' && (
										<Grid item xs={5} sm={4} md={3}>
											<RenderSelect
												action={handleChange}
												val={seccion}
												data={seccionSelect}
												error={error.seccion}
											/>
										</Grid>
									)}
									<Grid item xs={12} style={{ textAlign: 'center' }}>
										<ButtonLoading
											estilo="outlined"
											colorsito="inherit"
											text="Cambiar"
											loading={loading}
										/>
									</Grid>
								</Grid>
							</form>
						</div>
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
}

function SelectFromOptions({ action, value }) {
	//Config de opciones
	const optionsSelect = {
		name: 'option',
		values: [
			{
				value: 'estudiante',
				name: 'Estudiante'
			},
			{
				value: 'seccion',
				name: 'Sección'
			}
		]
	};

	return (
		<div className="Box">
			<span className="Box__Title">Cambiar opciones de:</span>
			<div className="Box__Content">
				<RenderSelect
					action={action}
					val={value}
					data={optionsSelect}
					classNameSet="select"
					customWidth="auto"
					empty={false}
				/>
			</div>
		</div>
	);
}

//REDUX
const mapStateToProps = state => ({
	data: state.panelSettings.optionsSection
});

const mapDispatchToProps = {
	updateValue,
	errorInfo,
	updateLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderOptions);