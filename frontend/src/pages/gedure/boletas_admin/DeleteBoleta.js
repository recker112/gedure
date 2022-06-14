import React, { useCallback } from 'react';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem } from '@mui/material';

// Form
import { useForm } from 'react-hook-form';

// Components
import AnimationDialog from '../../../components/AnimationDialog';
import LoadingButton from '@mui/lab/LoadingButton';
import { LapsoList } from '../../../components/Utils/StudiendsLists';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SelectHook } from '../../../components/form/select';
import { setRequestStatus } from '../../../store/slices/requestStatus';
import { deleteMassiveBoletas } from '../../../store/slices/requestStatus/async_trunk/boletas_admin/deleteBoletaMassive';

export default function DeleteBoleta() {
  const { open, loading, data } = useSelector(state => (state.requestStatus.deleteMassiveBoletas));
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});

  const onSubmit = (submitData) => {
    dispatch(deleteMassiveBoletas({...submitData, ids: data, _method: 'PUT'}));
  }

  const handleClose = () => {
    dispatch(setRequestStatus({open: false, data: {}, select: 'deleteMassiveBoletas'}));
  }

  const MenuItemList = LapsoList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.label}</MenuItem>
	),[]));

  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
    >
      <DialogTitle>Eliminar boletas</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
					<Grid item xs={12}>
						<DialogContentText>Ha seleccionado a <strong>{data.length}</strong> estudiante(s) para eliminar su boleta de su curso actual, seleccione el lapso de la boleta a borrar:</DialogContentText>
					</Grid>
					<Grid container alignItems='center' item xs={12}>
						<SelectHook
							name='lapso'
							label='Lapso'
							control={control}
							disabled={loading}
              size='small'
              variant='standard'
							fullWidth
						>
							<MenuItem value=''><em>Ninguno</em></MenuItem>
							{MenuItemList}
						</SelectHook>
					</Grid>
				</Grid>
      </DialogContent>
      <DialogActions>
				<Button disabled={loading} onClick={handleClose} color='inherit'>Cancelar</Button>
				<LoadingButton loading={loading} onClick={handleSubmit(onSubmit)} color='inherit'>
          Eliminar
        </LoadingButton>
			</DialogActions>
    </Dialog>
  )
}
