import React, { useCallback } from 'react';

import { 
	Typography,
	Grid,
	Button,
	TextField,
	Fade,
} from '@material-ui/core';

import useFetch from '../../hooks/useFetch';

import { useForm } from 'react-hook-form';

// Components
import LoadingComponent from '../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

function BoxFormRecoveryStep2(props) {
	const { classes, nextStep } = props;
	
	const { loading, dataR } = useSelector((state) => ({
		loading: state.forms.recuperar.loading,
		dataR: state.forms.recuperar.data,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const { register, handleSubmit, errors } = useForm({
		mode: 'onTouched'
	});
	
	const handleBack = () => {
		nextStep(1);
	}
	
	const onSubmit = useCallback(async (data) => {
		dispatch(updateForms('recuperar', true));
		
		const prepareDate = {
			url: 'v1/recovery-verify',
			data: {
				...data,
				...dataR
			},
			successText: 'Código verificado',
			message404: 'Correo no encontrado',
			messageTo422: true,
		}
		
		const response = await fetchData(prepareDate);
		
		if (response) {
			nextStep(3);
		}
		
		dispatch(updateForms('recuperar', false, dataR));
	},[dispatch, fetchData, dataR, nextStep]);
	
	const handleSendEmail = useCallback(async (data) => {
		dispatch(updateForms('recuperar', true));
		
		const prepareDate = {
			url: 'v1/recovery-password',
			data: data,
			successText: 'Correo enviado',
			message404: 'Correo no encontrado',
			messageTo422: true,
		}
		
		// eslint-disable-next-line
		const response = await fetchData(prepareDate);
		
		dispatch(updateForms('recuperar', false, data));
	},[dispatch, fetchData]);
	
	return (
		<Fade in={true}>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<Grid container>
					<Grid item xs={12}>
						<Typography 
							align='center' 
							variant='h4' 
							component='div' 
							className='text__bold--semi'
						>
							Introduzca el código
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField 
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 5, message: 'Código no válido' },
								maxLength: { value: 5, message: 'Código no válido' },
							})}
							id='recovery-code'
							name='code'
							label='Código'
							variant='outlined'
							error={Boolean(errors?.code)}
							helperText={errors?.code?.message ? errors.code.message : 'Ingrese el código que enviamos a su correo'}
							autoFocus={true}
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid container justify="center" item>
						<LoadingComponent loading={loading}>
							<Button
								color="primary"
								variant="contained"
								type="submit"
								className={classes.button}
							>
								Verificar código
							</Button>
						</LoadingComponent>
					</Grid>
					<Grid item xs={12}>
						<Typography 
							align='center' 
							className={classes.textButton} 
							variant='body1' 
							color='primary'
							onClick={()=>{handleSendEmail(dataR)}}
						>
							Reenviar mensaje
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography 
							align='center' 
							className={classes.textButton} 
							variant='body1' 
							color='primary'
							onClick={handleBack}
						>
							Cambiar correo
						</Typography>
					</Grid>
				</Grid>
			</form>
		</Fade>
	);
}

export default BoxFormRecoveryStep2;