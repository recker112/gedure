import React from 'react';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


// Components
import AnimationDialog from '../../../components/AnimationDialog';
import Password from './CU/Password';
import Curso from './CU/Curso';
import Permisos from './CU/Permisos';

// Form
import { useForm } from "react-hook-form";
import { SwitchHook } from '../../../components/form/switch';
import { SelectHook } from '../../../components/form/select';
import { InputHook } from '../../../components/form/inputs/InputHook';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatus';
import { createUser } from '../../../store/slices/requestStatus/async_trunk/users/createUser';

export default function CreateUser() {
  const { open, loading } = useSelector(state => state.requestStatus.createUser);
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { control, handleSubmit, setValue, setError } = useForm({
    shouldUnregister: true,
  });

  const handleClose = () => {
		dispatch(setRequestStatus({select: 'createUser', open: false}));
	}

  const onSubmit = async submitData => {
    if (submitData.curso_id) {
			submitData.curso_id = submitData.curso_id.id;
		}
    
    await dispatch(createUser({submitData, errors: setError, handleClose}));
  }

  return (
    <Dialog open={open} fullScreen={fullScreen} TransitionComponent={AnimationDialog}>
      <DialogTitle>Crear usuario</DialogTitle>
      <DialogContent>
        <form autoComplete='off'>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography color='text.secondary'>
                Datos principales
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
							<SelectHook
								name='invitation_mode'
								label='Invitar usuario'
								control={control}
								disabled={loading}
                variant="outlined"
                defaultValue={false}
                rules={null}
                size='small'
								fullWidth
							>
								<MenuItem value={true}>Si</MenuItem>
								<MenuItem value={false}>No</MenuItem>
							</SelectHook>
						</Grid>
            <Grid item xs={12} sm={6}>
							<SelectHook
								name='privilegio'
								label='Tipo de cuenta'
								control={control}
								disabled={loading}
                variant="outlined"
                size='small'
								fullWidth
							>
								<MenuItem value='V-'>Estudiante</MenuItem>
								<MenuItem value='A-'>Administrador</MenuItem>
							</SelectHook>
						</Grid>
            <Grid sx={{mt: 4}} item xs={12}>
              <Typography color='text.secondary'>
                Datos de la cuenta
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 3, message: 'Error: Demaciado corto' },
									maxLength: { value: 30, message: 'Error: Demaciado largo' },
								}}
								name='username'
								label='Usuario o cédula'
								size='small'
                variant='outlined'
								fullWidth
								disabled={loading}
							/>
						</Grid>
            <Grid item xs={12} sm={6}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 3, message: 'Error: Demaciado corto' },
									maxLength: { value: 90, message: 'Error: Demaciado largo' },
								}}
								name='name'
								label='Nombre y apellido'
								size='small'
                variant='outlined'
								fullWidth
								disabled={loading}
							/>
						</Grid>
            <Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Error: Correo no válido',
									},
								}}
								name='email'
								label='Correo'
								size='small'
                variant='outlined'
								fullWidth
								disabled={loading}
							/>
						</Grid>
            <Password
              loading={loading}
              control={control}
              setValue={setValue}
            />
            <Curso
              disabled={loading}
              control={control}
            />
            <Grid sx={{mt: 4}} item xs={12}>
              <DialogContentText>Permisos</DialogContentText>
            </Grid>
            <Permisos
              disabled={loading}
              control={control}
              setValue={setValue}
            />
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <SwitchHook
          control={control}
          name='create_more'
          label="Crear más de uno"
          labelPlacement="start"
          color="primary"
          disabled={loading}
        />
        <Button sx={{ml: 1}} disabled={loading} onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} variant="text" color="inherit">
          crear
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
