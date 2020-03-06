import React from 'react';

//Components
import { CursosList, SeccionList } from '../../../../components/ListDataGlobal';
import { RenderSelect, RenderRadios, RenderInputs } from '../../../../components/RendersGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';

//Material-ui
import { Grid, Zoom } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';
import updateLoading from '../../../../actions/updateLoading';
import verifyEmpty from '../../../../actions/panel/modify/verifyEmpty';
import errorInfo from '../../../../actions/errorInfo';


function ModifyForm({ modifySection, updateInputValue, updateLoading, errorInfo, verifyEmpty }) {
  //Destruct
	const { privilegio, cedula, name, option, curso, seccion, pass, loading, error } = modifySection;
  
  //Enviar datos
	function handleSubmit(e) {
    //Preparativos
    e.preventDefault();
    let errorStatus = false;

    //Verificar datos
    [
      {
        value: cedula, 
        name: "cedula",
        minValue: 7
      },
      {
        value: pass, 
        name: "pass",
        minValue: 4
      },
      {
        value: name, 
        name: "name",
        minValue: 3
      },
      {
        value: curso, 
        name: "curso",
        minValue: 0
      },
      {
        value: seccion, 
        name: "seccion",
        minValue: 0
      }
    ].map((input)=>{
      if (input.value.length === 0) {
        //Empty
        errorInfo(input.name, "Campo obligatorio", "MODIFY");
        errorStatus=true;
      }else if (input.value.length < input.minValue) {
        //No valid cédula
        errorInfo(input.name, "No válido", "MODIFY");
        errorStatus=true;
      }
      return null;
    });

    if (errorStatus) {
      return null;
    }

    //Enviar consulta
		updateLoading(true,"MODIFY");
	}

	function handleChange(e) {
		//Cambiar elemento
    updateInputValue(e,"MODIFY");
    verifyEmpty({ name: e.target.name, value: e.target.value })
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
						<RenderSelect action={handleChange} val={curso} data={cursoSelect} error={error.curso} />
					</Grid>
				</Zoom>
				<Zoom in={privilegio === 'V-' ? true : false}>
					<Grid item xs={5} sm={4} md={3}>
						<RenderSelect action={handleChange} val={seccion} data={seccionSelect} error={error.seccion} />
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
	updateInputValue,
  updateLoading,
  errorInfo,
  verifyEmpty
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyForm);