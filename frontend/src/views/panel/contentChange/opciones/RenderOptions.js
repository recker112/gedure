import React from 'react';

//Material-UI
import { Grid, Paper } from '@material-ui/core';
import { RenderSelect } from '../../../../components/RendersGlobal';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';

function RenderOptions({data,updateInputValue}) {
  const { option } = data;

  const handleChange = e => {
    updateInputValue(e,'OPTIONS');
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={5} md={3}>
        <Paper variant="outlined">
          <SelectFromOptions action={handleChange} value={option} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Paper variant="outlined">
          X
        </Paper>
      </Grid>
    </Grid>
  )
}

function SelectFromOptions({action, value}) {
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
  updateInputValue
}


export default connect(mapStateToProps,mapDispatchToProps)(RenderOptions);