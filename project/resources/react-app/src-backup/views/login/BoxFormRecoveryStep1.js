import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

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

function BoxFormRecoveryStep1(props) {
	const { classes, nextStep } = props;
	
	const history = useHistory();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.recuperar.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const { register, handleSubmit, errors } = useForm({
		mode: 'onTouched'
	});
	
	const handleRecovery = () => {
		history.push('/entrar');
	}
	
	const onSubmit = useCallback(async (data) => {
		dispatch(updateForms('recuperar', true));
		
		const prepareDate = {
			url: 'v1/recovery-password',
			data: data,
			successText: 'Correo enviado',
			message404: 'Correo no encontrado',
			messageTo422: true,
			messageTo400: false,
			return400: true,
		}
		
		const response = await fetchData(prepareDate);
		
		if (response) {
			dispatch(updateForms('recuperar', false, data));
			nextStep(2);
		}else {
			dispatch(updateForms('recuperar', false));
		}
	},[dispatch, nextStep, fetchData]);
	
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
							Introduzca su correo
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField 
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'El correo no es vรกlido',
								},
							})}
							id='recovery-email'
							name='email'
							type='email'
							label='Correo electróico'
							variant='outlined'
							error={Boolean(errors?.email)}
							helperText={errors?.email?.message ? errors.email.message : 'Ingrese un correo'}
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
								Enviar correo
							</Button>
						</LoadingComponent>
					</Grid>
					<Grid item xs={12}>
						<Typography 
							align='center' 
							className={classes.textButton} 
							variant='body1' 
							color='primary'
							onClick={handleRecovery}
						>
							Regresar al login
						</Typography>
					</Grid>
				</Grid>
			</form>
		</Fade>
	);
}

export default BoxFormRecoveryStep1;