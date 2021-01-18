import React, { useCallback } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { 
	Typography,
	Grid,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";

import useFetch from '../../hooks/useFetch';

// Components
import { RenderInputPassword } from '../../components/RendersGlobals';
import LoadingComponent from '../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';
import updateAuth from '../../actions/updateAuth';
import updateDataUser from '../../actions/updateDataUser';

const useStyles = makeStyles((theme) => ({
	button: {
		width: 160,
	}
}));

function FormLogin() {
	const { loading } = useSelector((state) => ({
		loading: state.forms.login.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const { handleSubmit, register, errors } = useForm({
		mode: 'onTouched'
	});
	
	const onSubmit = useCallback(async (data) => {
		dispatch(updateForms('login', true));
		
		const prepareDate = {
			url: 'v1/login',
			data: data,
			successText: 'Login exitoso',
			messageTo422: true,
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography className='text__bold--semi' variant='h3'>
						Ingrese sus datos
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<TextField
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 3, message: 'Error: No válido' },
							maxLength: { value: 30, message: 'Error: No válida' },
						})}
						error={Boolean(errors?.username)}
						helperText={errors?.username?.message ? errors.username.message : '* Campo requerido'}
						name='username'
						label='Usuario o cédula'
						fullWidth
						disabled={loading}
					/>
				</Grid>
				
				<Grid item xs={12}>
					<RenderInputPassword
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 4, message: 'Error: No válido' },
							maxLength: { value: 25, message: 'Error: No válida' },
						})}
						name='password'
						error={Boolean(errors?.password)}
						helperText={errors?.password?.message ? errors.password.message : '* Campo requerido'}
						label='Contraseña'
						fullWidth
						disabled={loading}
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
				
				<Grid item xs={12}>
					<Link component={RouterLink} to='/recuperar'>
						<Typography>Recuperar contraseña</Typography>
					</Link>
				</Grid>
				
				<Grid container justify='center' item xs={12}>
					<LoadingComponent loading={loading}>
						<Button 
							type="submit"
							color='primary'
							variant='contained'
							className={classes.button}
						>
							Entrar
						</Button>
					</LoadingComponent>
				</Grid>
				
				<Grid container justify='center' item xs={12}>
					<Link color="inherit" component={RouterLink} to='/'>
						<Typography className='text__bold--semi'>Volver al incio</Typography>
					</Link>
				</Grid>
			</Grid>
		</form>
	);
}

export default FormLogin;