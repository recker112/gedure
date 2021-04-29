import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { 
	Typography,
	Grid,
	Button,
	Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";

import useFetch from '../../hooks/useFetch';

// Components
import {
	InputPasswordHook,
} from '@form-inputs';
import LoadingComponent from '../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	button: {
		minWidth: 160,
	}
}));

function FormChangePassword() {
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.recuperar.loading,
		data: state.forms.recuperar.data,
	}));
	const dispatch = useDispatch();
	
	const history = useHistory();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const { handleSubmit, watch, control } = useForm({
		mode: 'onTouched'
	});
	
	const onSubmit = useCallback(async (submitData) => {
		dispatch(updateForms('recuperar', true));
		
		const prepareDate = {
			url: 'v1/recovery-chpass',
			data: {
				...data,
				...submitData
			},
			successText: 'Contraseña cambiada',
			message404: 'Correo no encontrado',
			messageTo422: true,
		}
		
		const response = await fetchData(prepareDate);
		
		if (response) {
			history.push('/entrar');
		}
		
		dispatch(updateForms('recuperar', false));
	},[dispatch, data, history, fetchData]);
	
	return (
		<Fade in={true}>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography className='text__bold--semi' variant='h3'>
							Ingrese su nueva contraseña
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
							label='Repetir contraseña'
							helperText='* Campo requerido'
							fullWidth
							disabled={loading}
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
								Cambiar contraseña
							</Button>
						</LoadingComponent>
					</Grid>
				</Grid>
			</form>
		</Fade>
	);
}

export default FormChangePassword;