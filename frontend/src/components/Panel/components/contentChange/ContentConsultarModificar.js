import React from 'react';

//Material-UI
import { Grid, Paper } from '@material-ui/core';
import SearchUsers from './consultarModificar/SearchUsers';
import SearchSeccion from './consultarModificar/SearchSeccion';
import ModifyForm from './consultarModificar/ModifyForm';

function ContentConsultarModificar() {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={6}>
        <Paper>
          <SearchUsers />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>
          <SearchSeccion />
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper className='Box'>
          <span className="title">Modificar</span>
          <div className="content">
            <ModifyForm />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ContentConsultarModificar;