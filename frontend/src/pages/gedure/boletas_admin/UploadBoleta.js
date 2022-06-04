import React, { useCallback } from 'react'

// Router
import { NavLink } from "react-router-dom";

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, MenuItem, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';
import { SelectHook } from '../../../components/form/select';

// Components
import AnimationDialog from '../../../components/AnimationDialog';
import { LapsoList } from '../../../components/Utils/StudiendsLists';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setOpenBF, uploadBoleta } from '../../../store/slices/gedure/boletas_admin/forms';

export default function UploadBoleta() {
  const { open, loading, progress } = useSelector(state => (state.gdBForm.upload));
  const dispatch = useDispatch();

  const { handleSubmit, register, control, watch, formState: { errors } } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});

  const onSubmit = (submitData) => {
    const formData = new FormData();
		formData.append('boletas', submitData.boletas[0]);
		formData.append('lapso', submitData.lapso);
    
    dispatch(uploadBoleta({submitData: formData}));
  }

  const handleClose = () => {
    dispatch(setOpenBF({select: 'upload', open: false}));
  }

  const MenuItemList = LapsoList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.label}</MenuItem>
	),[]));

  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
    >
      <DialogTitle>Cargar boletas</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
					<Grid item xs={12}>
          <DialogContentText>Recuerde que debe comprimir en <strong>ZIP</strong> todas las boletas que desee cargar. Para <strong>más información</strong> de cómo cargar boletas de click <Link component={NavLink} to='/gedure/preguntas-frecuentes'>aquí</Link>.</DialogContentText>
					</Grid>
					<Grid container alignItems='center' item xs={12}>
						<input
							id='boletas-upload-file'
							{...register('boletas',{
								required: '* Debe subir un archivo',
							})}
							defaultValue={null}
							style={{display: 'none'}}
							accept="application/zip"
							type="file"
						/>
						<label htmlFor="boletas-upload-file">
							<Button variant='contained' color='secondary' component='span'>Cargar archivo</Button>
						</label>
						{Boolean(errors.boletas) && (
							<Box ml={2} color='#f44336'>
								<Typography>{errors.boletas.message}</Typography>
							</Box>
						)}
						{((watch('boletas')?.length || []).length !== 0) && (
							<Box ml={2}>
								<Typography>Archivo cargado</Typography>
							</Box>
						)}
					</Grid>
          <Grid item xs={12}>
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
				<LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} loadingIndicator={loading && progress < 99 ? `${progress}%` : null} variant="text" color="inherit">
          Cargar
        </LoadingButton>
			</DialogActions>
    </Dialog>
  )
}
