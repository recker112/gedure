import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { 
	Typography,
	Grid,
	Button,
	Fade,
} from '@material-ui/core';

import useFetch from '../../hooks/useFetch';

import { useForm } from 'react-hook-form';

// Components
import LoadingComponent from '../../components/LoadingComponent';
import { RenderInputPassword } from '../../components/RendersGlobals';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

function BoxFormRecoveryStep3(props) {
	const { classes, nextStep } = props;
	
	const { loading, dataR } = useSelector((state) => ({
		loading: state.forms.recuperar.loading,
		dataR: state.forms.recuperar.data,
	}));
	const dispatch = useDispatch();
	
	const history = useHistory();
	
	const { fetchData } = useFetch();
	
	const { register, handleSubmit, errors, watch } = useForm({
		mode: 'onTouched'
	});
	
	const onSubmit = useCallback(async (data) => {
		dispatch(updateForms('recuperar', true));
		
		const prepareDate = {
			url: 'v1/recovery-chpass',
			data: {
				...data,
				...dataR
			},
			successText: 'Contraseña cambiada',
			message404: 'Correo no encontrado',
			messageTo422: true,
		}
		
		const response = await fetchData(prepareDate);
		
		if (response) {
			dispatch(updateForms('recuperar', false));
			history.push('/entrar');
		}else {
			dispatch(updateForms('recuperar', false, dataR));
		}
		
		nextStep(2);
	},[dispatch, dataR, history, nextStep, fetchData]);
	
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
							Introduzca su nueva contraseña
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<RenderInputPassword 
							registerInput={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 4, message: 'Esta ingresando algo no válido' },
							})}
							id='login-password'
							name='password'
							label='Contraseña'
							variant='outlined'
							error={Boolean(errors?.password)}
							helperText={errors?.password?.message ? errors.password.message : 'Ingresa la contraseña'}
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<RenderInputPassword 
							registerInput={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 4, message: 'Esta ingresando algo no válido' },
								validate: {
									verifyPass: (value) => value === watch('password'),
								},
							})}
							id='login-confirm'
							name='confirm'
							label='Contraseña'
							variant='outlined'
							error={Boolean(errors?.confirm)}
							helperText={errors?.confirm?.message ? errors.confirm.message : 'Repita la contraseña'}
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
								Cambiar contraseña
							</Button>
						</LoadingComponent>
					</Grid>
				</Grid>
			</form>
		</Fade>
	);
}

export default BoxFormRecoveryStep3;