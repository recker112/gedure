import React, { useEffect } from 'react';

//Components
import { CursosList, SeccionList } from '../../../../components/ListDataGlobal';
import { RenderSelect, RenderRadios, RenderInputs } from '../../../../components/RendersGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';
import verifyErrorCustom from '../../../../components/reutilizar/verifyErrorCustom';

//Material-ui
import { Grid, Zoom } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';
import updateLoading from '../../../../actions/updateLoading';
import verifyEmpty from '../../../../actions/panel/modify/verifyEmpty';
import errorInfo from '../../../../actions/errorInfo';

//SnackBar
import { useSnackbar } from 'notistack';

function ModifyForm({ 
	modifySection,
	updateValue, 
	updateLoading, 
	errorInfo, 
	verifyEmpty
}) {
	//Destruct
	const { 
		privilegio, 
		cedula, 
		name, 
		option, 
		curso, 
		seccion, 
		pass, 
		loading, 
		error 
	} = modifySection;
	
	//Cancel
	let cancel = false;
	
	//Crear un SnackBar
	const { enqueueSnackbar } = useSnackbar();
	
	//Al desmontar
	useEffect(()=>{
		return ()=>{
			cancel=true;
		}
	}, [cancel])
	
	//FetchData
	const fetchData = async () => {
		try {
			//Inicar datos
			const dataForm = {
				cedula,
				privilegio,
				name,
				pass,
				curso,
				seccion
			}
			
			//Inicializar res
			let res;
			
			//Elegir consulta
			if (option === 'insert'){
				res = await axios.post('api/user', dataForm);
			}else if (option === 'update'){
				res = await axios.patch(`api/user/${cedula}`, dataForm);
			}else if (option === 'delete'){
				res = await axios.delete(`api/user/${cedula}`, {
					data: dataForm
				});
			}
			
			if (!cancel){
				const { status, data } = res;
				//Mostar alerta
				enqueueSnackbar(data.description, {
					variant: 'success'
				});
			}
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
		//Quitar loading
		updateLoading(false, 'MODIFY');
	}

	//Enviar datos
	function handleSubmit(e) {
		//Preparativos
		e.preventDefault();
		let errorStatus = false;

		//Verificar datos
		const InputsArray = [
			{
				value: cedula,
				name: 'cedula',
				minValue: 3
			},
			{
				value: pass,
				name: 'pass',
				minValue: 4
			},
			{
				value: name,
				name: 'name',
				minValue: 3
			},
			{
				value: curso,
				name: 'curso'
			},
			{
				value: seccion,
				name: 'seccion'
			}
		];
		
		const error = verifyErrorCustom(InputsArray, errorInfo, 'MODIFY');

		if (error) {
			return null;
		}

		//Enviar consulta
		updateLoading(true, 'MODIFY');
		fetchData();
	}

	function handleChange(e) {
		//Cambiar elemento
		updateValue(e, 'MODIFY');
		verifyEmpty({ name: e.target.name, value: e.target.value });
	}

	//Config de Privilegios
	const radioPrivi = {
		title: 'Privilegio',
		name: 'privilegio',
		values: [
			{ value: 'V-', name: 'V-' },
			{ value: 'A-', name: 'A-' },
			{ value: 'CR-', name: 'CR-' }
		],
		color: 'primary'
	};

	//Config de Acción
	const radioAcc = {
		title: 'Acción',
		name: 'option',
		values: [
			{ value: 'insert', name: 'Añadir' },
			{ value: 'update', name: 'Actualizar' },
			{ value: 'delete', name: 'Borrar' }
		],
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
		<form autoComplete="off" method="POST" onSubmit={handleSubmit}>
			<Grid container spacing={2} justify="center">
				{/* RADIO PRIVILEGIO */}
				<Grid item xs={12}>
					<RenderRadios val={privilegio} accion={handleChange} data={radioPrivi} />
				</Grid>

				{/* INPUTS */}
				<Grid item xs={12} sm={6} md={4}>
					<Zoom in={true}>
						<div>
							<RenderInputs
								data={{ val: cedula, name: 'cedula', label: 'Cédula' }}
								accion={handleChange}
								error={error.cedula}
							/>
						</div>
					</Zoom>
				</Grid>

				<Grid item xs={12} sm={6} md={4}>
					<Zoom in={option === 'delete' ? false : true}>
						<div>
							<RenderInputs
								data={{ val: name, name: 'name', label: 'Nombre' }}
								accion={handleChange}
								error={error.name}
							/>
						</div>
					</Zoom>
				</Grid>

				<Grid item xs={12} sm={6} md={4}>
					<Zoom in={option === 'delete' || option === 'update' ? false : true}>
						<div>
							<RenderInputs
								data={{ val: pass, name: 'pass', label: 'Contraseña' }}
								accion={handleChange}
								error={error.pass}
							/>
						</div>
					</Zoom>
				</Grid>

				{/* RADIO ACCIÓN */}
				<Grid item xs={12}>
					<RenderRadios val={option} accion={handleChange} data={radioAcc} />
				</Grid>

				{/* CURSO */}
				<Zoom in={privilegio === 'V-' ? true : false}>
					<Grid item xs={5} sm={4} md={3}>
						<RenderSelect
							action={handleChange}
							val={curso}
							data={cursoSelect}
							error={error.curso}
						/>
					</Grid>
				</Zoom>
				<Zoom in={privilegio === 'V-' ? true : false}>
					<Grid item xs={5} sm={4} md={3}>
						<RenderSelect
							action={handleChange}
							val={seccion}
							data={seccionSelect}
							error={error.seccion}
						/>
					</Grid>
				</Zoom>
			</Grid>

			{/* BUTTON LOADING */}
			<Grid container justify="center" style={{ marginTop: '20px' }}>
				<ButtonLoading estilo="outlined" colorsito="inherit" text="Realizar" loading={loading} />
			</Grid>
		</form>
	);
}

const mapStateToProps = state => ({
	modifySection: state.panelSettings.modifySection
});

const mapDispatchToProps = {
	updateValue,
	updateLoading,
	errorInfo,
	verifyEmpty
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyForm);