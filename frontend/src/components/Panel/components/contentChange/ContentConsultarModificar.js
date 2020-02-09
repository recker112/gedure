import React from 'react';

//Material-UI
import { Grid, Paper, Grow } from '@material-ui/core';
import SearchUsers from './consultarModificar/SearchUsers';
import SearchSeccion from './consultarModificar/SearchSeccion';
import ModifyForm from './registros/ModifyForm';

function ContentConsultarModificar() {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={6}>
        <Grow in={true}>
          <Paper>
            <SearchUsers />
          </Paper>
        </Grow>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grow in={true}>
          <Paper>
            <SearchSeccion />
          </Paper>
        </Grow>
      </Grid>
      <Grid item xs={10}>
        <Grow in={true}>
          <Paper className='Box'>
            <span className="title">Modificar</span>
            <div className="content">
              <ModifyForm />
            </div>
          </Paper>
        </Grow>
      </Grid>
    </Grid>
  );
}

export default ContentConsultarModificar;