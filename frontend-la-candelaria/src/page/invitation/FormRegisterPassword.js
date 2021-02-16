import React from 'react';

import { useHistory } from 'react-router-dom';

import {
	Paper,
	Grid,
	Typography,
	Button,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../hooks/useFetch';

// Components
import { RenderInputPassword } from '../../components/RendersGlobals';
import LoadingComponent from '../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

export default function FormRegisterPassword({ invitationKey }) {
	const { data, loading } = useSelector((state) => ({
		data: state.forms.invitation.data,
		loading: state.forms.registerPassword.loading,
	}));
	const dispatch = useDispatch();
	
	const history = useHistory();
	
	const { register, handleSubmit, errors, setError, watch } = useForm({
		mode: 'onTouched',
	});
	const { fetchData } = useFetch(setError);
	
	const onSubmit = async (submitData) => {
		dispatch(updateForms('registerPassword', true));
		
		const prepare = {
			url: `v1/invitation/register`,
			type: 'post',
			data: {
				key: invitationKey,
				password: submitData.password,
			},
			message404: 'Invitación inválida',
		};

		const response = await fetchData(prepare);

		if (response) {
			history.push('/entrar');
		}
		
		dispatch(updateForms('registerPassword', false));
	}
	
	return (
		<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
			<Paper className='paper--padding'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography>
							Hola <strong>{data.name}</strong>, tu usuario dentro del sistema es <strong>{data.username}</strong> pero antes de poder entrar al sistema es necesario que <strong>cree una contraseña</strong>, use una contraseña que sea <strong>fácil de recordar para usted</strong>. Si pierde su contraseña es posible recuperarla mediante el correo electrónico.
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<RenderInputPassword
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								minLength: { value: 4, message: 'Error: Demaciado corto' },
							})}
							name='password'
							variant='standard'
							size='small'
							error={Boolean(errors?.password)}
							helperText={errors?.password?.message ? errors.password.message : '* Campo requerido'}
							label='Contraseña'
							disabled={loading}
						/>
					</Grid>
					<Grid item xs={12}>
						<RenderInputPassword
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								minLength: { value: 4, message: 'Error: Demaciado corto' },
								validate: value => value === watch('password', '') || 'Error: Las contraseñas no coinciden'
							})}
							name='repear_password'
							variant='standard'
							size='small'
							error={Boolean(errors?.repear_password)}
							helperText={errors?.repear_password?.message ? errors.repear_password.message : '* Campo requerido'}
							label='Repetir contraseña'
							disabled={loading}
						/>
					</Grid>
					<Grid container justify='flex-end' item xs={12}>
						<LoadingComponent loading={loading}>
							<Button color='primary' type='submit' variant='contained' disableElevation>
								Crear
							</Button>
						</LoadingComponent>
					</Grid>
				</Grid>
			</Paper>
		</form>
	)
}