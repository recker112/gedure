import React from 'react'

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';

// Form
import { useForm } from 'react-hook-form';

// Components
import AnimationDialog from '../../../../components/AnimationDialog';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { replaceBoleta, setConfgsBC } from '../../../../store/slices/gedure/boletas_admin/confirmDialogs';
import LoadingButton from '@mui/lab/LoadingButton';

export default function ReplaceBoleta() {
  const { open, loading, progress, data } = useSelector(state => state.gdBConfirm.replaceBoleta);
  const dispatch = useDispatch();

  const { handleSubmit, register, watch, formState: { errors } } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});

  const handleClose = () => {
    dispatch(setConfgsBC({open: false, data: {}, confirm: 'replaceBoleta'}));
  }

  const onSubmit = submitData => {
    const formData = new FormData();
		formData.append('boleta', submitData.boleta[0]);
		formData.append('_method', 'PUT');

    dispatch(replaceBoleta({id: data.id, submitData: formData}));
  }
  
  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
    >
      <DialogTitle>Reemplazar boleta</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
						<DialogContentText>Está a punto de reemplazar la boleta <strong>{data.curso} {data.seccion} {data.lapso}° Lapso</strong>. Tenga en cuenta que al reemplazar la boleta se borrará la anterior.</DialogContentText>
					</Grid>
          <Grid container alignItems='center' item xs={12}>
						<input
							id='boleta-upload-file'
							{...register('boleta',{
								required: '* Debe subir un archivo',
							})}
							defaultValue={null}
							style={{display: 'none'}}
							accept="application/pdf"
							type="file"
						/>
						<label htmlFor="boleta-upload-file">
							<Button variant='contained' color='secondary' component='span'>Cargar archivo</Button>
						</label>
						{Boolean(errors.boleta) && (
							<Box ml={2} color='#f44336'>
								<Typography>{errors.boleta.message}</Typography>
							</Box>
						)}
						{((watch('boleta')?.length || []).length !== 0) && (
							<Box ml={2}>
								<Typography>Archivo cargado</Typography>
							</Box>
						)}
					</Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
				<Button disabled={loading} onClick={handleClose} color='inherit'>Cancelar</Button>
				<LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} loadingIndicator={loading && progress < 99 ? `${progress}%` : null} variant="text" color="inherit">
          Cargar
        </LoadingButton>
			</DialogActions>
    </Dialog>
  )
}
