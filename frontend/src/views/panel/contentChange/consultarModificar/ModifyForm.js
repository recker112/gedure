import React from 'react';

//Components
import { CursosList, SeccionList } from '../../../../components/ListDataGlobal';
import { RenderSelect, RenderRadios, RenderInputs } from '../../../../components/RendersGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';

//Material-ui
import { Grid, Zoom } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import updateInfoInput from '../../../../actions/panel/modify/updateInfoInput';
import updateModifyLoading from '../../../../actions/panel/modify/updateModifyLoading';

function ModifyForm({ modifySection, updateInfoInput, updateModifyLoading }) {
	const { privilegio, cedula, name, option, curso, seccion, pass, loading } = modifySection;

	//Enviar datos
	function handleSubmit(e) {
		e.preventDefault();
		updateModifyLoading();
	}

	function handleChange(e) {
		//Cambiar elemento
		updateInfoInput({ [e.target.name]: e.target.value });
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
							/>
						</div>
					</Zoom>
				</Grid>

				{/* RADIO ACCIÓN */}
				<Grid item xs={12}>
					<RenderRadios val={option} accion={handleChange} data={radioAcc} />
				</Grid>

				{/* SELECTS */}
				<Zoom in={privilegio === 'V-' ? true : false}>
					<Grid item xs={2}>
						<RenderSelect action={handleChange} val={curso} data={cursoSelect} />
					</Grid>
				</Zoom>
				<Zoom in={privilegio === 'V-' ? true : false}>
					<Grid item xs={2}>
						<RenderSelect action={handleChange} val={seccion} data={seccionSelect} />
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
	updateInfoInput,
	updateModifyLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyForm);