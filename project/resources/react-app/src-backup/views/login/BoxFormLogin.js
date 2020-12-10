import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { 
	Typography,
	Grid,
	Paper,
	Button,
	Slide,
	TextField,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';

import useFetch from '../../hooks/useFetch';

import { useForm } from 'react-hook-form';

// Components
import { RenderInputPassword } from '../../components/RendersGlobals';
import LoadingComponent from '../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';
import updateAuth from '../../actions/updateAuth';
import updateDataUser from '../../actions/updateDataUser';

function BoxFormLogin(props) {
	const { classes } = props;
	
	const history = useHistory();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.login.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const { register, handleSubmit, errors } = useForm({
		mode: 'onTouched'
	});
	
	const handleRecovery = () => {
		history.push('/recuperar');
	}
	
	const onSubmit = useCallback(async (data) => {
		dispatch(updateForms('login', true));
		
		const prepareDate = {
			url: 'v1/login',
			data: data,
			successText: 'Login exitoso'
		}
		
		const response = await fetchData(prepareDate);
		
		if (response) {
			dispatch(updateDataUser(response));

			// Save access_key
			if (data.checkbox) {
				localStorage.setItem('access_key', JSON.stringify(response.access_key));
				sessionStorage.setItem('access_key', JSON.stringify(response.access_key));
			} else {
				sessionStorage.setItem('access_key', JSON.stringify(response.access_key));
			}
			
			dispatch(updateAuth(true));
		}
		
		dispatch(updateForms('login', false));
	},[dispatch, fetchData]);
	
	return (
		<Slide in={true} direction="left" mountOnEnter unmountOnExit>
			<Paper className={classes.boxForm}>
				<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
					<Grid container>
						<Grid item xs={12}>
							<Typography 
								align='center' 
								variant='h4' 
								component='div' 
								className='text__bold--semi'
							>
								Ingrese sus datos
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField 
								inputRef={register({
									required: { value: true, message: 'Este campo es obligatorio' },
									minLength: { value: 3, message: 'Esta ingresando algo no válido' },
								})}
								id='login-cedula'
								name='cedula'
								label='Usuario o cédula'
								variant='outlined'
								error={Boolean(errors?.cedula)}
								helperText={errors?.cedula?.message ? errors.cedula.message : 'Ingresa un usuario o una cédula'}
								autoFocus={true}
								disabled={loading}
								fullWidth
							/>
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
							<FormControlLabel
								control={
									<Checkbox 
										color="primary" 
										disabled={loading} 
										name="checkbox" 
										inputRef={register}
									/>
								}
								label="Mantener abierto"
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
									Entrar
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
								Recuperar contraseña
							</Typography>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Slide>
	);
}

export default BoxFormLogin;