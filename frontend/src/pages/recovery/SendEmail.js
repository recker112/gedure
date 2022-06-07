import React from 'react'

// Router
import { Link as RouterLink } from 'react-router-dom';

// MUI
import { Container, Grid, Link, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';
import { InputHook } from '../../components/form/inputs';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailRecovery } from '../../store/slices/requestStatus/async_trunk/recovery/sendEmail';

const classes = {
  button: {
    width: 160,
  }
}

export default function SendEmail({ setStep }) {
  const loading = useSelector(state => state.requestStatus.recovery.loading);
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const handleNext = () => {
    setStep(value => value + 1);
  }

  const onSubmit = submitData => {
    dispatch(sendEmailRecovery({submitData, handleNext}));
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
            <InputHook
							control={control}
							rules={{
								required: '* Campo requerido',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Error: No válido',
								},
							}}
              variant='standard'
							name='email'
							label='Correo Electrónico *'
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
              Enviar correo
            </LoadingButton>
          </Grid>

          <Grid container justifyContent='center' item xs={12}>
						<Link color="inherit" component={RouterLink} to='/entrar'>
							<Typography className='text__bold--semi'>Regresar al login</Typography>
						</Link>
					</Grid>
        </Grid>
      </form>
    </Container>
  )
}
