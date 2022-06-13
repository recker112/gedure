import React from 'react'

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Grid, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { resendEmailUser } from '../../../../../store/slices/requestStatus/async_trunk/users/resendEmail';

export default function OPRenviar() {
  const { id } = useParams()
  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.requestStatus.userShow.userSelected,
    loading: state.requestStatus.personalData.loadingResendEmail,
  }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(resendEmailUser(id));
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
