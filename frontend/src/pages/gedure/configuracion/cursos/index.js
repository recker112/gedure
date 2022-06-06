import React from 'react';

// MUI
import { Grid } from '@mui/material';

// Components
import CreateCurso from './CreateCurso';

export default function GDCursos() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CreateCurso />
      </Grid>
    </Grid>
  )
}
