import React, { useCallback, useState, useEffect } from 'react';

import { 
	Typography,
	Grid,
	TextField,
	Button,
	Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";

import useFetch from '../../hooks/useFetch';

// Components
import LoadingComponent from '../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	button: {
		width: 160,
	},
	textButton: {
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline'
		}
	}
}));

function ResendEmail(props) {
	const { loading, handleSendEmail } = props;
	const [wait, setWait] = useState(120);
	let divisor_for_minutes = wait % (60 * 60);
	let minutes = Math.floor(divisor_for_minutes / 60);
	let divisor_for_seconds = divisor_for_minutes % 60;
	let seconds = Math.ceil(divisor_for_seconds);
	
	const classes = useStyles();
	
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
				align='center'
				variant='body1'
			>
				Espere {minutes}min y {seconds}s para reenviar el correo.
			</Typography>
		);
	}
	
	return (
		<Typography 
			align='center'
			variant='body1'
			className={classes.textButton}
			onClick={!loading && handleSendEmail}
		>
			Reenviar mensaje
		</Typography>
	);
}

function FormVerifyCode({ nextStep }) {
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.recuperar.loading,
		data: state.forms.recuperar.data,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const { handleSubmit, register, errors } = useForm({
		mode: 'onTouched'
	});
	
	const onSubmit = useCallback(async (submitData) => {
		dispatch(updateForms('recuperar', true));
		
		const prepareDate = {
			url: 'v1/recovery-verify',
			data: {
				...submitData,
				...data
			},
			messageToFinish: false,
			message404: 'Correo no encontrado',
		}
		
		const response = await fetchData(prepareDate);
		
		if (response) {
			nextStep(2);
		}
		
		dispatch(updateForms('recuperar', false));
	},[dispatch, fetchData, data, nextStep]);
	
	const handleSendEmail = useCallback(async () => {
		if (!loading) {
			dispatch(updateForms('recuperar', true));
		
			const prepareDate = {
				url: 'v1/recovery-password',
				data: data,
				successText: 'Correo enviado',
				message404: 'Correo no encontrado',
			}

			// eslint-disable-next-line
			const response = await fetchData(prepareDate);

			dispatch(updateForms('recuperar', false));
		}
	},[dispatch, fetchData, loading, data]);
	
	return (
		<Fade in={true}>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography className='text__bold--semi' variant='h3'>
							Ingrese el código
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<TextField
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								minLength: { value: 5, message: 'Error: Código no válido' },
								maxLength: { value: 5, message: 'Error: Código no válido' },
							})}
							error={Boolean(errors?.email)}
							helperText={errors?.email?.message ? errors.email.message : '* Campo requerido'}
							name='code'
							variant='outlined'
							label='Código'
							fullWidth
							disabled={loading}
						/>
					</Grid>
					
					<Grid container justify='center' item xs={12}>
						<ResendEmail
							loading={loading}
							handleSendEmail={handleSendEmail}
						/>
					</Grid>
					
					<Grid container justify='center' item xs={12}>
						<LoadingComponent loading={loading} color='secondary'>
							<Button 
								type="submit"
								color='secondary'
								variant='contained'
								className={classes.button}
							>
								Enviar correo
							</Button>
						</LoadingComponent>
					</Grid>
				</Grid>
			</form>
		</Fade>
	);
}

export default FormVerifyCode;