import React from 'react';

import {
	Grid,
	Button,
	Divider,
	Box,
	Typography,
	MenuItem,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import {
	InputMaskHook,
	InputHook,
	SelectHook,
} from '@form-inputs';
import LoadingComponent from '../../../../components/LoadingComponent';

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
		buttonText,
		buttonDisable,
	} = props;
	
	return (
		<form onSubmit={onSubmit} autoComplete='off'>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Datos del padre
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.padre_nacionalidad'
						label='Nacionalidad'
						defaultValue={user.personal_data.padre_nacionalidad || ''}
						control={control}
						disabled={loading}
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value='V'>Venezolano</MenuItem>
						<MenuItem value='E'>Extranjero</MenuItem>
					</SelectHook>
				</Grid>
				<Grid item xs={12}>
					<InputHook
						control={control}
						rules={{
							required: '* Campo requerido',
							minLength: { value: 7, message: 'Error: Demaciado corto' },
							maxLength: { value: 14, message: 'Error: Demaciado largo' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						}}
						defaultValue={user.personal_data.padre_cedula || ''}
						name='personalData.padre_cedula'
						label='Cédula'
						size='small'
						variant='outlined'
						fullWidth
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputHook
						control={control}
						rules={{
							required: '* Campo requerido',
							minLength: { value: 8, message: 'Error: Demaciado corto' },
							maxLength: { value: 90, message: 'Error: Demaciado largo' },
						}}
						defaultValue={user.personal_data.padre_nombre || ''}
						name='personalData.padre_nombre'
						label='Nombre y apellido'
						size='small'
						variant='outlined'
						fullWidth
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputMaskHook
						control={control}
						rules={{
							required: '* Campo requerido',
							minLength: { value: 12, message: 'Error: No válido' },
						}}
						defaultValue={user.personal_data.padre_telefono || '58'}
						name='personalData.padre_telefono'
						label='Teléfono'
						variant='outlined'
						size='small'
						format='+## (###) ###-####'
						fullWidth
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputHook
						control={control}
						rules={{
							required: '* Campo requerido',
							minLength: { value: 10, message: 'Error: Demaciado corto' },
							maxLength: { value: 100, message: 'Error: Demaciado largo' },
						}}
						defaultValue={user.personal_data.padre_direccion || ''}
						name='personalData.padre_direccion'
						label='Dirección de domicilio'
						size='small'
						variant='outlined'
						fullWidth
						disabled={loading}
					/>
				</Grid>
				{!buttonDisable && (
					<Grid container justify='flex-end' item xs={12}>
						<LoadingComponent loading={loading}>
							<Button 
								type='submit' 
								variant='contained' 
								color='primary'
								disableElevation
							>
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
	
	const { control, handleSubmit } = useForm({
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
			control={control}
			loading={loading}
			buttonText='Actualizar'
			user={user}
		/>
	)
}