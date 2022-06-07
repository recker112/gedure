import React, { useCallback } from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

// Form
import { useForm } from 'react-hook-form'
import { SelectHook } from '../../../components/form/select';

// Components
import { CursosList, SeccionList } from '../../../components/Utils/StudiendsLists';
import AnimationDialog from '../../../components/AnimationDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatus';
import { updateSeccion } from '../../../store/slices/requestStatus/async_trunk/users/updateSeccion';

export default function UpdateSeccion() {
  const { open, loading, data } = useSelector(state => (state.requestStatus.updateSeccion));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});

  const onSubmit = (submitData) => {
    dispatch(updateSeccion({...submitData, ids: data, _method: 'PUT'}));
  }

  const handleClose = () => {
    dispatch(setRequestStatus({open: false, select: 'updateSeccion'}))
  }

  const MenuItemList = CursosList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.label}</MenuItem>
	),[]));
	
	const MenuItemList2 = SeccionList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.label}</MenuItem>
	),[]));

  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
    >
      <DialogTitle>Cambiar sección</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DialogContentText>Ha <strong>seleccionado data.length estudiante(s)</strong>, seleccione la sección a la que los desea cambiar.</DialogContentText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectHook
              name='curso'
							label='Curso'
							control={control}
							disabled={loading}
              variant='standard'
							fullWidth
            >
              <MenuItem value=''><em>Ninguno</em></MenuItem>
              {MenuItemList}
            </SelectHook>
          </Grid>
          <Grid container item xs={12} sm={6}>
            <SelectHook
              name='seccion'
							label='Sección'
							control={control}
							disabled={loading}
              variant='standard'
							fullWidth
            >
              <MenuItem value=''><em>Ninguno</em></MenuItem>
              {MenuItemList2}
            </SelectHook>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
				<Button disabled={loading} onClick={handleClose} color='inherit'>Cancelar</Button>
				<LoadingButton loading={loading} onClick={handleSubmit(onSubmit)} color='inherit'>
          Cambiar
        </LoadingButton>
			</DialogActions>
    </Dialog>
  )
}
