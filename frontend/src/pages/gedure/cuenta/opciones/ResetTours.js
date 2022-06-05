import React from 'react'

// MUI
import { Box, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Redux
import { useDispatch, useSelector } from 'react-redux';

export default function ResetTours() {
  const loading = useSelector(state => state.gdCO.logoutAll.loading);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch();
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
          loading={loading}
          disableElevation
          onClick={handleSubmit}
        >
          Reactivar
        </LoadingButton>
			</Grid>
    </>
  )
}
