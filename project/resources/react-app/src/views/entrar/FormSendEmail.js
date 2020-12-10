import React, { useCallback } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { 
	Typography,
	Grid,
	TextField,
	Link,
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
	}
}));

function FormSendEmail({ nextStep }) {
	const { loading } = useSelector((state) => ({
		loading: state.forms.recuperar.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const { handleSubmit, register, errors } = useForm({
		mode: 'onTouched'
	});
	
	const onSubmit = useCallback(async (data) => {
		dispatch(updateForms('recuperar', true));
		
		const prepareDate = {
			url: 'v1/recovery-password',
			data: data,
			messageToFinish: false,
			message404: 'Correo no encontrado',
			messageTo400: false,
			return400: true,
		}
		
		const response = await fetchData(prepareDate);
		
		if (response) {
			dispatch(updateForms('recuperar', false, data));
			nextStep(1);
		}else {
			dispatch(updateForms('recuperar', false));
		}
	},[dispatch, nextStep, fetchData]);
	
	return (
		<Fade in={true}>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography className='text__bold--semi' variant='h3'>
							Ingrese su correo
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<TextField
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Error: Correo no válido',
								},
							})}
							error={Boolean(errors?.email)}
							helperText={errors?.email?.message ? errors.email.message : '* Campo requerido'}
							name='email'
							variant='outlined'
							label='Correo electrónico'
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
								Enviar correo
							</Button>
						</LoadingComponent>
					</Grid>

					<Grid container justify='center' item xs={12}>
						<Link color="inherit" component={RouterLink} to='/entrar'>
							<Typography className='text__bold--semi'>Regresar al login</Typography>
						</Link>
					</Grid>
				</Grid>
			</form>
		</Fade>
	);
}

export default FormSendEmail;