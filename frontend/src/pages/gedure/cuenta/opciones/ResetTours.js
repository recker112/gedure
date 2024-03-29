import React from 'react'

// MUI
import { Box, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Redux
import { useDispatch } from 'react-redux';
import { resetTours } from '../../../../store/slices/configs';
import { updateNotistack } from '../../../../store/slices/notistack';

export default function ResetTours() {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(resetTours());
    dispatch(updateNotistack({ status: 200, text: 'Todas las guias reactivadas', variant: 'default' }));
  }

  return (
    <>
      <Grid item xs={12} sm={8}>
				<Box fontSize='h5.fontSize' className='text__bold--semi'>
          Reactivar todos las guias
				</Box>
				<Box fontSize='body1.fontSize' color='text.secondary'>
          reactive todas la guias que ya haya realizado
				</Box>
			</Grid>
      <Grid container justifyContent='flex-end' alignItems='center' item xs={12} sm={4}>
				<LoadingButton
          variant='contained'
          disableElevation
          onClick={handleSubmit}
        >
          Reactivar
        </LoadingButton>
			</Grid>
    </>
  )
}
