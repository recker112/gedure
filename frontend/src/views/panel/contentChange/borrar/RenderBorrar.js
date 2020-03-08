//React
import React from 'react'

//Material-UI
import { Grid, Paper } from '@material-ui/core'

//Components
import { RenderSelect } from '../../../../components/RendersGlobal';
import ButtonLoading from '../../../../components/ButtonLoading';
import { SeccionList, CursosList } from '../../../../components/ListDataGlobal';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';
import errorInfo from '../../../../actions/errorInfo';
import updateLoading from '../../../../actions/updateLoading';

function RenderBorrar({ data, updateInputValue, errorInfo, updateLoading }) {
  const { option, loading, curso, seccion, error } = data;

  const handleChange = e => {
    updateInputValue(e, 'DELETE');
  }

  const handleSubmit = e => {
    //Preparativos
    e.preventDefault();
    let errorStatus = false;

    //Verificar datos
    [{
      value: curso,
      name: "curso"
    }, {
      value: seccion,
      name: "seccion"
    },].map((input) => {
      if (input.value.length === 0) {
        //Empty
        errorInfo(input.name, "Campo obligatorio", "DELETE");
        errorStatus = true;
      }
      return null;
    });

    if (errorStatus) {
      return null;
    }
    updateLoading(true, 'DELETE');
  }

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
          <SelectorDelete action={handleChange} value={option} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper variant="outlined">
          <div className="Box">
            <div className="content">
              <form autoComplete="off" onSubmit={handleSubmit} method="POST" style={{ marginTop: "0" }}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={5} sm={4} md={3}>
                    <RenderSelect action={handleChange} val={curso} data={cursoSelect} error={error.curso} />
                  </Grid>
                  <Grid item xs={5} sm={4} md={3}>
                    <RenderSelect action={handleChange} val={seccion} data={seccionSelect} error={error.seccion} />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <ButtonLoading estilo="outlined" colorsito="inherit" text="Borrar" loading={loading} />
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
        value: 'estudiante',
        name: 'Estudiante'
      }
    ]
  };

  return (
    <div className="Box">
      <span className="title">Borrar</span>
      <div className="content">
        <RenderSelect action={action} val={value} data={deleteSelect} classNameSet="select" customWidth="auto" empty={false} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.panelSettings.deleteSection
})

const mapDispatchToProps = {
  updateInputValue,
  errorInfo,
  updateLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderBorrar);