import React from 'react'

// Router
import { useParams } from 'react-router-dom'

// MUI
import { Divider, Grid, Typography, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';

// Components
import Permisos from '../../CU/Permisos';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/gedure/usuarios/ver/requests/gdUPD';

export default function PPermisos() {
  const { id } = useParams();

  const { permissions, loading, userSelected } = useSelector(state => ({
    permissions: state.requestStatus.userShow.permissions,
    userSelected: state.requestStatus.userShow.userSelected,
    loading: state.gdUPD.loadingPPE,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control, setValue, register } = useForm({
    shouldUnregister: true,
    defaultValues: {
      privilegio: userSelected.privilegio,
    }
  });

  const onSubmit = submitData => {
    submitData._method = 'PUT';

    dispatch(updateData({submitData, id, loading: 'loadingPPE'}));
  }
  
  return (
    <Grid container spacing={2}>
      <input type='hidden' {...register('privilegio')} />
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Permisos de la cuenta
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Permisos
        disabled={loading}
        control={control}
        setValue={setValue}
        defaultData={permissions}
      />
      <Grid container justifyContent='flex-end' item xs={12}>
        <LoadingButton
          variant='contained' 
          loading={loading}
          disableElevation
          onClick={handleSubmit(onSubmit)}
        >
          Actualizar permisos
        </LoadingButton>
      </Grid>
    </Grid>
  )
}
