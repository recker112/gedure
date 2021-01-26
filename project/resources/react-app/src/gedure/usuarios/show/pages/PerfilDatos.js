import React from 'react';

import {
	Grid,
	Button,
	TextField,
	Divider,
	Box,
	Typography,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export default function PerfilDatos({ id }) {
	const { dataUser, loading, user } = useSelector((state) => ({
		dataUser: state.forms.showUser.data.user,
		loading: state.forms.updatePerfil.loading,
		user: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { register, handleSubmit, errors, setError } = useForm({
		mode: 'onTouched',
	});
	const { fetchData } = useFetch(setError);
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePerfil', true));
		let data = {};
		
		// setear datos si son diferentes
		if (submitData.username !== dataUser.username) {
			data.username = submitData.username
		}
		if (submitData.email !== dataUser.email) {
			data.email = submitData.email;
		}
		data.name = submitData.name;
		data._method = 'PUT';
		
		const prepare = {
			url: `v1/user/${id}`,
			type: 'post',
			data,
			successText: 'Datos actualizados',
		};

		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateForms('showUser', false, response));
			
			if (response.user?.id === user.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updatePerfil', false));
	}
	
	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Perfil del usuario
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<TextField 
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 3, message: 'Error: Demaciado corto' },
							maxLength: { value: 30, message: 'Error: Demaciado largo' },
						})}
						name='username'
						error={Boolean(errors?.username)}
						helperText={errors?.username?.message ? errors.username.message : 'El usuario identificará a esta cuenta dentro del sistema'}
						label='Usuario o cédula'
						defaultValue={dataUser.username} 
						variant='outlined'
						size='small'
						disabled={loading}
						fullWidth 
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField 
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 3, message: 'Error: Demaciado corto' },
							maxLength: { value: 90, message: 'Error: Demaciado largo' },
						})}
						name='name'
						error={Boolean(errors?.name)}
						helperText={errors?.name?.message ? errors.name.message : 'El nombre puede ser visto por otros usuarios, tenga discreción con lo que coloque aquí'}
						label='Nombre de la cuenta'
						defaultValue={dataUser.name} 
						variant='outlined' 
						size='small' 
						disabled={loading}
						fullWidth
					/>
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
						name='email'
						error={Boolean(errors?.email)}
						helperText={errors?.email?.message ? errors.email.message : 'Este correo será usado en distintas partes de la App para una comunicación directa con el usuario'}
						label='Correo electónico'
						defaultValue={dataUser.email} 
						variant='outlined' 
						size='small' 
						disabled={loading}
						fullWidth
					/>
				</Grid>

				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent loading={loading}>
						<Button 
							onClick={handleSubmit(onSubmit)}
							variant='contained' 
							color='primary' 
							disableElevation
						>
							Actualizar
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</Box>
	);
}