import React from 'react'

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Grid, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateDataUPREN } from '../../../../../store/slices/gedure/usuarios/ver/requests/gdUPREN';

export default function OPRenviar() {
  const { id } = useParams()
  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.gdUSelected.userSelected,
    loading: state.gdUPREN.loading,
  }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(updateDataUPREN({ id }));
  }

  return (
    <>
      <Grid item xs={12} sm={8}>
				<Box fontSize='h5.fontSize' className='text__bold--semi'>
					Reenviar invitación
				</Box>
				<Box fontSize='body1.fontSize' color='text.secondary'>
					solo disponible para usuarios inactivos
				</Box>
			</Grid>
      <Grid container justifyContent='flex-end' alignItems='center' item xs={12} sm={4}>
				<LoadingButton
          variant='contained' 
          loading={loading}
          disabled={Boolean(userSelected.actived_at)}
          disableElevation
          onClick={handleSubmit}
        >
          Reenviar
        </LoadingButton>
			</Grid>
    </>
  )
}
