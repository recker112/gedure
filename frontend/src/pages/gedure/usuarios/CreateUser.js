import React from 'react';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

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
import { createData, setOpen } from '../../../store/slices/gedure/usuarios/forms';

export default function CreateUser() {
  const { open, loading } = useSelector(state => state.gdUForms.create);
  const dispatch = useDispatch();

  const { control, handleSubmit, setValue, setError } = useForm({
    shouldUnregister: true,
  });

  const handleClose = () => {
		dispatch(setOpen({select: 'create', open: false}));
	}

  const onSubmit = async submitData => {
    if (submitData.curso_id) {
			submitData.curso_id = submitData.curso_id.id;
		}
    
    await dispatch(createData({submitData, errors: setError, handleClose}));
  }

  return (
    <Dialog open={open} TransitionComponent={AnimationDialog}>
      <DialogTitle>Crear usuario</DialogTitle>
      <DialogContent>
        <form autoComplete='off'>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <SwitchHook
                control={control}
                label="El usuario genera su contraseña"
                name='invitation_mode'
                color="primary"
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
							<SelectHook
								name='privilegio'
								label='Tipo de cuenta'
								control={control}
								disabled={loading}
                variant="standard"
								fullWidth
							>
								<MenuItem value=''><em>Ninguno</em></MenuItem>
								<MenuItem value='V-'>Estudiante</MenuItem>
								<MenuItem value='A-'>Administrador</MenuItem>
							</SelectHook>
						</Grid>
            <Grid item xs={12}>
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
                variant='standard'
								fullWidth
								disabled={loading}
							/>
						</Grid>
            <Grid item xs={12}>
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
                variant='standard'
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
                variant='standard'
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
        <Button disabled={loading} onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} variant="text" color="inherit">
          crear
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
