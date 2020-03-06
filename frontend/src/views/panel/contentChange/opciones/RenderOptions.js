import React from 'react';

//Material-UI
import { Grid, Paper } from '@material-ui/core';
import { RenderSelect, RenderRadios, RenderInputs } from '../../../../components/RendersGlobal';

//Components
import ButtonLoading from '../../../../components/ButtonLoading';
import { CursosList, SeccionList } from '../../../../components/ListDataGlobal';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';
import errorInfo from '../../../../actions/errorInfo';
import updateLoading from '../../../../actions/updateLoading';

function RenderOptions({ data, updateInputValue, errorInfo, updateLoading }) {
  const { option, nota, horario, estudiante, error, curso, seccion, loading } = data;

  const handleChange = e => {
    updateInputValue(e, 'OPTIONS');
  }

  const handleSubmit = e => {
    e.preventDefault();
    let errorStatus = false;

    //Verificar datos
    if (option === "estudiante") {
      if (estudiante.length === 0) {
        errorInfo("estudiante", "Campo obligatorio", "OPTIONS");
        errorStatus = true;
      }else if (estudiante.length < 7) {
        errorInfo("estudiante", "No válido", "OPTIONS");
        errorStatus = true;
      }
    }

    if (option === "seccion") {
      [{
        value: curso, 
        name: "curso"
      },{
        value: seccion, 
        name: "seccion"
      },].map((input)=>{
        if (input.value.length === 0) {
          //Empty
          errorInfo(input.name, "Campo obligatorio", "OPTIONS");
          errorStatus=true;
        }
        return null;
      });
    }

    //Cancelar REQ si hay errores
    if (errorStatus){
      return null;
    }

    //REQ
    updateLoading(true,'OPTIONS');
  }

  //Config de Nota
  const notaRadio = {
    title: 'Nota',
    name: 'nota',
    values: [
      { value: 'activo', name: 'Activar' },
      { value: 'desactivo', name: 'Desactivar' }
    ],
    color: 'primary'
  };

  //Config de Horario
  const horarioRadio = {
    title: 'Horario',
    name: 'horario',
    values: [
      { value: 'activo', name: 'Activar' },
      { value: 'desactivo', name: 'Desactivar' }
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
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={5} md={4}>
        <Paper variant="outlined">
          <SelectFromOptions action={handleChange} value={option} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper variant="outlined">
          <div className="Box">
            <div className="content">
              <form autoComplete="off" onSubmit={handleSubmit} method="POST" style={{ marginTop: "0" }}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <RenderRadios val={nota} accion={handleChange} data={notaRadio} />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <RenderRadios val={horario} accion={handleChange} data={horarioRadio} />
                  </Grid>
                    {option === "estudiante" && <Grid item xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
                      <RenderInputs
                        data={{ val: estudiante, name: 'estudiante', label: 'Estudiante' }}
                        accion={handleChange}
                        error={error.estudiante}
                      />
                    </Grid>
                    }
                  {option === "seccion" && <Grid item xs={5} sm={4} md={3}>
                    <RenderSelect action={handleChange} val={curso} data={cursoSelect} error={error.curso} />
                  </Grid>}
                  {option === "seccion" && <Grid item xs={5} sm={4} md={3}>
                    <RenderSelect action={handleChange} val={seccion} data={seccionSelect} error={error.seccion} />
                  </Grid>}
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <ButtonLoading estilo="outlined" colorsito="inherit" text="Cambiar" loading={loading} />
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
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
      <span className="title">Cambiar opciones de:</span>
      <div className="content">
        <RenderSelect action={action} val={value} data={optionsSelect} classNameSet="select" customWidth="auto" empty={false} />
      </div>
    </div>
  )
}

//REDUX
const mapStateToProps = (state) => ({
  data: state.panelSettings.optionsSection,
})

const mapDispatchToProps = {
  updateInputValue,
  errorInfo,
  updateLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderOptions);