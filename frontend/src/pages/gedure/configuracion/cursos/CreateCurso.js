import React, { useCallback } from 'react';

// MUI
import { Grid, MenuItem, Paper, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';
import { SelectHook } from '../../../../components/form/select';

// Components
import { CursosList, SeccionList } from '../../../../components/Utils/StudiendsLists';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createCurso } from '../../../../store/slices/requestStatus/async_trunk/configuracion/cursos/createCurso';

export default function CreateCurso() {
  const loading = useSelector(state => state.requestStatus.createCurso.loading);
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm();

  const MenuItemList = CursosList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.label}</MenuItem>
	),[]));
	
	const MenuItemList2 = SeccionList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.label}</MenuItem>
	),[]));

  const onSubmit = submitData => {
    dispatch(createCurso(submitData));
  }

  return (
    <Paper className='paper--padding'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' className='text__bold--semi'>
            Agregar curso
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectHook
            name='curso'
            label='Curso'
            control={control}
            disabled={loading}
            size='small'
            fullWidth
          >
            <MenuItem value=''>
              <em>Ninguno</em>
            </MenuItem>
            {MenuItemList}
          </SelectHook>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectHook
            name='seccion'
            label='Sección'
            control={control}
            disabled={loading}
            size='small'
            fullWidth
          >
            <MenuItem value=''>
              <em>Ninguno</em>
            </MenuItem>
            {MenuItemList2}
          </SelectHook>
        </Grid>
        <Grid item xs={12}>
          <Typography className='text__opacity--semi'>
            Agrege cursos al sistema para agrupar a sus estudiantes.
          </Typography>
        </Grid>
        <Grid container justifyContent='flex-end' item xs={12}>
          <LoadingButton
            variant='contained' 
            loading={loading}
            disableElevation
            onClick={handleSubmit(onSubmit)}
          >
            Agregar
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  )
}
