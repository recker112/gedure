import React from 'react'

// MUI
import { Grid, Box, Divider } from '@mui/material';

// Components
import OPRenviar from './OPRenviar'

export default function POpciones() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
				<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>
					Opciones de la cuenta
				</Box>
				<Divider />
			</Grid>
      <OPRenviar />
    </Grid>
  )
}
