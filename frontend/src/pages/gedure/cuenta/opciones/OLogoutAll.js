import React from 'react'

// MUI
import { Box, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Components

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutAll } from '../../../../store/slices/requestStatus/async_trunk/login/logoutAll';

export default function OLogoutAll() {
  const loading = useSelector(state => state.requestStatus.personalData.loadingLogoutAll);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(logoutAll());
  }

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
				<LoadingButton
          variant='contained' 
          loading={loading}
          disableElevation
          onClick={handleSubmit}
        >
          Salir
        </LoadingButton>
			</Grid>
    </>
  )
}
