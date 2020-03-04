import React from 'react';

//Material-UI
import { Grid, Paper } from '@material-ui/core';

//Components
import SearchUsers from './SearchUsers';
import SearchSeccion from './SearchSeccion';
import ModifyForm from './ModifyForm';

function RenderCO_MO() {
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

export default RenderCO_MO;