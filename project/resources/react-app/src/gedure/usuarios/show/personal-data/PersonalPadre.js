import React from 'react';

import {
	Grid,
	Button,
	TextField,
	Divider,
	Box,
	Typography,
	MenuItem,
	InputAdornment,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';
import { RenderSelectFormHook } from '../../../../components/RendersGlobals';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export function PersonalPadreForm(props) {
	const { 
		onSubmit, 
		loading, 
		control, 
		user, 
		register,
		errors,
		buttonText,
		buttonDisable,
	} = props;
	
	return (
		<form onSubmit={onSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Datos de la madre
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<RenderSelectFormHook
						name='personalData.padre_nacionalidad'
						nameLabel='Nacionalidad '
						control={control}
						defaultValue={user.personal_data.padre_nacionalidad || ''}
						errors={errors.personalData?.padre_nacionalidad}
						disabled={loading}
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value='V'>Venezolano</MenuItem>
						<MenuItem value='E'>Extranjero</MenuItem>
					</RenderSelectFormHook>
				</Grid>
				<Grid item xs={12}>
					<TextField
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 7, message: 'Error: Demaciado corto' },
							maxLength: { value: 14, message: 'Error: Demaciado largo' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						})}
						error={Boolean(errors?.personalData?.padre_cedula)}
						helperText={errors?.personalData?.padre_cedula?.message ? errors.personalData.padre_cedula.message : ''}
						variant='outlined'
						name='personalData.padre_cedula'
						label='Cédula'
						defaultValue={user.personal_data.padre_cedula || ''}
						size='small'
						disabled={loading}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 8, message: 'Error: Demaciado corto' },
							maxLength: { value: 90, message: 'Error: Demaciado largo' },
						})}
						error={Boolean(errors?.personalData?.padre_nombre)}
						helperText={errors?.personalData?.padre_nombre?.message ? errors.personalData.padre_nombre.message : ''}
						variant='outlined'
						name='personalData.padre_nombre'
						label='Nombre y apellido'
						defaultValue={user.personal_data.padre_nombre || ''}
						size='small'
						disabled={loading}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField 
						type='tel'
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 6, message: 'Error: Demaciado corto' },
							maxLength: { value: 30, message: 'Error: Demaciado largo' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						})}
						error={Boolean(errors?.personalData?.padre_telefono)}
						helperText={errors?.personalData?.padre_telefono?.message ? errors.personalData.padre_telefono.message : ''}
						variant='outlined'
						name='personalData.padre_telefono'
						label='Teléfono'
						size='small'
						defaultValue={user.personal_data.padre_telefono || ''}
						disabled={loading}
						fullWidth
						InputProps={{
							startAdornment: <InputAdornment position='start'>+58</InputAdornment>
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						inputRef={register({
							required: { value: true, message: '¨Campo requerido' },
							minLength: { value: 10, message: 'Error: Demaciado corto' },
							maxLength: { value: 100, message: 'Error: Demaciado largo' },
						})}
						error={Boolean(errors?.personalData?.padre_direccion)}
						helperText={errors?.personalData?.padre_direccion?.message ? errors.personalData.padre_direccion.message : ''}
						variant='outlined'
						name='personalData.padre_direccion'
						label='Dirección de domicilio'
						size='small'
						defaultValue={user.personal_data.padre_direccion || ''}
						disabled={loading}
						fullWidth
					/>
				</Grid>
				{!buttonDisable && (
					<Grid container justify='flex-end' item xs={12}>
						<LoadingComponent loading={loading}>
							<Button type='submit' variant='contained' color='primary'>
								{buttonText}
							</Button>
						</LoadingComponent>
					</Grid>
				)}
			</Grid>
		</form>
	);
}

export default function PersonalPadre({ id }) {
	const { user, loading, userData } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalPadre.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { register, control, errors, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalPadre', true));
		
		const prepare = {
			url: `v1/user/${id}`,
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT'
			},
			successText: 'Datos actualizados',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateForms('showUser', false, response));
			
			if (response.user?.id === userData.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updatePersonalPadre', false));
	}
	
	return (
		<PersonalPadreForm 
			onSubmit={handleSubmit(onSubmit)}
			register={register}
			control={control}
			errors={errors}
			loading={loading}
			buttonText='Actualizar'
			user={user}
		/>
	)
}