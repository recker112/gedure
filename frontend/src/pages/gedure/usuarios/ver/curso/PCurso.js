import React, { useCallback } from 'react'

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, Divider, Grid, MenuItem, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form'
import { SelectHook } from '../../../../../components/form/select'

// Components
import { CursosList, SeccionList } from '../../../../../components/Utils/StudiendsLists';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../../../../store/slices/requestStatus/async_trunk/users/updateData';

export default function PCurso() {
  const { id } = useParams();

  const { userSelected, loading } = useSelector(state => ({
    userSelected: state.requestStatus.userShow.userSelected,
    loading: state.requestStatus.personalData.loadingPC,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();
  
  const MenuItemList = CursosList.map(useCallback((data, i) => (
    <MenuItem key={i} value={data.value}>{data.label}</MenuItem>
  ),[]));
  
  const MenuItemList2 = SeccionList.map(useCallback((data, i) => (
    <MenuItem key={i} value={data.value}>{data.label}</MenuItem>
  ),[]));

  const onSubmit = submitData => {
    submitData._method = 'PUT';

    dispatch(updateData({submitData, id, loading: 'loadingPC'}));
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
          Curso del estudiante
        </Typography>
        <Box mt={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectHook
          name='curso'
          label='Curso'
          control={control}
          disabled={loading}
          defaultValue={userSelected.alumno?.curso?.curso || ''}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          {MenuItemList}
        </SelectHook>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectHook
          name='seccion'
          label='Sección'
          control={control}
          disabled={loading}
          defaultValue={userSelected.alumno?.curso?.seccion || ''}
          size='small'
          fullWidth
        >
          <MenuItem value=''>
            <em>Ninguno</em>
          </MenuItem>
          {MenuItemList2}
        </SelectHook>
      </Grid>
      <Grid container justifyContent='flex-end' item xs={12}>
        <LoadingButton
          variant='contained' 
          loading={loading}
          disableElevation
          onClick={handleSubmit(onSubmit)}
        >
          Actualizar
        </LoadingButton>
      </Grid>
    </Grid>
  )
}
