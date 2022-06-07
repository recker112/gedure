import React from 'react'

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { Container, Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';
import { InputPasswordHook } from '../../components/form/inputs';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordRecovery } from '../../store/slices/requestStatus/async_trunk/recovery/changePassword';

const classes = {
  button: {
    minWidth: 160,
  }
}

export default function ChangePassword({ setStep }) {
  const { loading, data } = useSelector(state => state.requestStatus.recovery);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { handleSubmit, control, watch } = useForm();

  const handleNext = () => {
    navigate('/entrar');
  }

  const onSubmit = submitData => {
    dispatch(changePasswordRecovery({submitData: {...submitData, ...data}, handleNext}));
  }

  return (
    <Container maxWidth="sm" className="container--margin">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className="text__bold--semi" variant="h3">
              Ingrese sus datos
            </Typography>
          </Grid>

          <Grid item xs={12}>
						<InputPasswordHook
							control={control}
							rules={{
								required: '* Campo requerido',
								minLength: { value: 4, message: 'Error: Demaciado corta' },
							}}
							name='password'
							label='Contraseña'
							helperText='* Campo requerido'
              variant='standard'
							fullWidth
							disabled={loading}
						/>
					</Grid>
					
					<Grid item xs={12}>
						<InputPasswordHook
							control={control}
							rules={{
								required: '* Campo requerido',
								minLength: { value: 4, message: 'Error: Demaciado corta' },
								validate: {
									verifyPass: (value) => value === watch('password') || 'Error: La contraseña no coincide',
								},
							}}
							name='confirm'
              variant='standard'
							label='Repetir contraseña'
							helperText='* Campo requerido'
							fullWidth
							disabled={loading}
						/>
					</Grid>

          <Grid container justifyContent='center' item xs={12}>
            <LoadingButton
              type="submit"
              color='secondary'
              variant='contained'
              sx={classes.button}
              loading={loading}
            >
              Cambiar contraseña
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}