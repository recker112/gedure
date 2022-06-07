import React, { useState, useEffect } from 'react'

// MUI
import { Container, Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';
import { InputHook } from '../../components/form/inputs';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailRecovery } from '../../store/slices/requestStatus/async_trunk/recovery/sendEmail';
import { verifyCodeRecovery } from '../../store/slices/requestStatus/async_trunk/recovery/verifyCode';

const classes = {
  button: {
    minWidth: 160,
  },
  textButton: {
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline'
		}
	}
}

function ResendEmail({ loading, handleSendEmail }) {
	const [wait, setWait] = useState(120);
	let divisor_for_minutes = wait % (60 * 60);
	let minutes = Math.floor(divisor_for_minutes / 60);
	let divisor_for_seconds = divisor_for_minutes % 60;
	let seconds = Math.ceil(divisor_for_seconds);
	
	useEffect(()=>{
		const waitTwoMinutes = () => {
			let seconds = wait - 1;
			if (wait) {
				setWait(seconds);
			}
		}
		
		let timer;
		if (wait) {
			timer = setTimeout(waitTwoMinutes,1000);
		}else if (loading) {
			setWait(120);
		}
		
		return ()=> clearTimeout(timer);
	},[wait, loading]);
	
	if (wait) {
		return (
			<Typography
				variant='body1'
			>
				Espere {minutes}min y {seconds}s para reenviar el correo.
			</Typography>
		);
	}
	
	return (
		<Typography
			variant='body1'
			sx={classes.textButton}
			onClick={!loading ? handleSendEmail : null}
		>
			Solicitar nuevamente el código
		</Typography>
	);
}

export default function VerifyCode({ setStep }) {
  const { loading, data } = useSelector(state => state.requestStatus.recovery);
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const handleNext = () => {
    setStep(value => value + 1);
  }

  const onSubmit = submitData => {
    dispatch(verifyCodeRecovery({ submitData: {...submitData, ...data}, handleNext }))
  }

  const handleSendEmail = () => {
    dispatch(sendEmailRecovery({submitData: data}));
  }

  return (
    <Container maxWidth="sm" className="container--margin">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className="text__bold--semi" variant="h3">
              Ingrese el código
            </Typography>
          </Grid>

          <Grid item xs={12}>
						<InputHook
							control={control}
							rules={{
								required: '* Campo requerido',
								minLength: { value: 5, message: 'Error: No válido' },
								maxLength: { value: 5, message: 'Error: No válido' },
							}}
              variant='standard'
							name='code'
							label='Código'
							helperText='* Campo requerido'
							fullWidth
							disabled={loading}
						/>
					</Grid>

          <Grid container justifyContent='center' item xs={12}>
						<ResendEmail
							loading={loading}
							handleSendEmail={handleSendEmail}
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
              Verificar código
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}