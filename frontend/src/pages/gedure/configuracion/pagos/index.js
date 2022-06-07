import React from 'react'

// MUI
import { Grid } from '@mui/material';

// Components
import CreateBankAccount from './CreateBankAccount';

export default function GDPagos() {
  return (
    <Grid container spacing={2} sx={{paddingBottom: 6}}>
      <Grid item xs={12}>
        <CreateBankAccount />
      </Grid>
    </Grid>
  )
}
