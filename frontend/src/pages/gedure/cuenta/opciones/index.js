import React from 'react'

// MUI
import { Grid, Box, Divider } from '@mui/material';

// Components
import OLogoutAll from './OLogoutAll';
import ResetTours from './ResetTours';

export default function POpciones() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
				<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>
					Opciones de la cuenta
				</Box>
				<Divider />
			</Grid>
      <OLogoutAll />
      <ResetTours />
    </Grid>
  )
}
