import React from 'react'

// Router
import { Link as RouteLink } from 'react-router-dom';

// MUI
import { Box, Button, Grid } from '@mui/material';

export default function OLogoutAll() {
  return (
    <>
      <Grid item xs={12} sm={8}>
				<Box fontSize='h5.fontSize' className='text__bold--semi'>
          Salir en todos los dispositivos
				</Box>
				<Box fontSize='body1.fontSize' color='text.secondary'>
					cerrar sesión en todos los dispositivos activos
				</Box>
			</Grid>
      <Grid container justifyContent='flex-end' alignItems='center' item xs={12} sm={4}>
        <Button
          variant='contained'
          disableElevation
          component={RouteLink} 
          to='/logout?drivers=all'
        >
          Salir
        </Button>
			</Grid>
    </>
  )
}
