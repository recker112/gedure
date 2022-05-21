import React from 'react';

// Router
import { Link as RouteLink } from 'react-router-dom';

// Forms
import { useForm } from 'react-hook-form';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Typography, Box, Grid } from '@mui/material';

// Components
import AnimationDialog from '../../../components/AnimationDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setOpen, uploadData } from '../../../store/slices/gedure/usuarios/forms';
import LoadingButton from '@mui/lab/LoadingButton';


export default function UploadStudiends() {
  const { open, loading, progress } = useSelector(state => state.gdUForms.upload);
  const dispatch = useDispatch();
  console.log(progress);

  const { handleSubmit, register, watch, formState: { errors }, setError } = useForm({
		shouldUnregister: true,
	});

  const handleClose = () => {
		dispatch(setOpen({select: 'upload', open: false}));
	}

  const onSubmit = submitData => {
    const formData = new FormData();
		formData.append('database', submitData.database[0]);
    dispatch(uploadData({submitData: formData, errors: setError, handleClose}))
  }

  return (
    <Dialog open={open} TransitionComponent={AnimationDialog}>
      <DialogTitle>Cargar estudiantes</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <DialogContentText>
              El proceso de carga de matrícula es realizado en segundo plano. Si tienes dudas respecto al formato que debe usar al cargar estudiantes puede ver el formato correcto <Link color='primary' onClick={handleClose} component={RouteLink} to='/gedure/preguntas-frecuentes'>aquí</Link>.
            </DialogContentText>
          </Grid>
          <Grid container alignItems='center' item xs={12}>
            <input
              id='matricula-upload-file'
              {...register('database',{
                required: { value: true, message: '* Debe subir un archivo' },
              })}
              defaultValue={null}
              disabled={loading}
              style={{display: 'none'}}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,application/vnd.oasis.opendocument.spreadsheet"
              type="file"
            />
            <label htmlFor="matricula-upload-file">
              <Button variant='contained' color='secondary' component='span' disabled={loading}>Cargar archivo</Button>
            </label>
            {(((watch('database') || []).length !== 0)) && (
              <Box sx={{width: 1/1}} mt={2}>
                <Typography>Archivo cargado</Typography>
              </Box>
            )}
            {Boolean(errors.database) && (
              <Box mt={2} sx={{width: 1/1}} color='#f44336'>
                <Typography >{errors.database.message}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} loadingIndicator={loading && progress < 99 ? `${progress}%` : null} variant="text" color="inherit">
            Cargar
          </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
