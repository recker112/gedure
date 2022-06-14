import React from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { Grid, Paper, Typography } from '@mui/material';

// Form
import { useForm } from 'react-hook-form';
import { InputPasswordHook } from '../../components/form/inputs';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { acceptInvitation } from '../../store/slices/requestStatus/async_trunk/invitacion/acceptInvitation';

export default function InvitationForm({ invitationKey }) {
  const { loading, data } = useSelector((state) => ({
		loading: state.requestStatus.invitation.loadingAccept,
		data: state.requestStatus.invitation.data,
	}));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { handleSubmit, control, watch } = useForm();

  const handleFinish = () => {
    navigate('/entrar');
  }

  const onSubmit = submitData => {
    dispatch(acceptInvitation({ submitData: { key: invitationKey, password: submitData.password }, handleFinish }));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Paper className='paper--padding'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
						<Typography>
							Hola <strong>{data.name}</strong>, tu usuario dentro del sistema es <strong>{data.username}</strong> pero antes de poder entrar al sistema es necesario que <strong>cree una contraseña</strong>, use una contraseña que sea <strong>fácil de recordar para usted</strong>. Si pierde su contraseña es posible recuperarla mediante el correo electrónico.
						</Typography>
					</Grid>
          <Grid item xs={12}>
						<InputPasswordHook
							control={control}
							rules={{
								required: '* Campo requerido',
								minLength: { value: 4, message: 'Error: No válido' },
							}}
							name='password'
							label='Contraseña'
							helperText='* Campo requerido'
							size='small'
							fullWidth
							disabled={loading}
						/>
					</Grid>
          <Grid item xs={12}>
						<InputPasswordHook
							control={control}
							rules={{
								required: '* Campo requerido',
								minLength: { value: 4, message: 'Error: No válido' },
									validate: value => value === watch('password', '') || 'Error: La contraseñas no coinciden'
							}}
							name='repear_password'
							label='Contraseña'
							helperText='* Repetir contraseña'
							size='small'
							fullWidth
							disabled={loading}
						/>
					</Grid>
          <Grid container justifyContent='flex-end' item xs={12}>
						<LoadingButton loading={loading} variant='contained' disableElevation type='submit'>
              Crear
            </LoadingButton>
					</Grid>
        </Grid>
      </Paper>
    </form>
  )
}
