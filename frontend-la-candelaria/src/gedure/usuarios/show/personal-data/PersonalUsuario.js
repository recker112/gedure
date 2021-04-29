import React from 'react';

import {
	Grid,
	Button,
	Divider,
	Box,
	Typography,
} from '@material-ui/core';

import useFetch from '../../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Components
import {
	DatePickerHook,
	InputMaskHook,
	InputHook,
	RadioHook,
} from '@form-inputs';
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export function PersonalUsuarioForm(props) {
	const { onSubmit, control, user, loading, watch, buttonText } = props;
	
	return (
		<form onSubmit={onSubmit} autoComplete='off'>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Datos del usuario
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<DatePickerHook 
						name="personalData.nacimiento"
						control={control}
						rules={{ 
							required: '* Campo requerido'
						}}
						defaultValue={user.personal_data.nacimiento || ''}
						disableFuture
						disabled={loading}
						format='yyyy/MM/dd'
						inputVariant="outlined"
						views={['year', 'month', 'date']}
						openTo="year"
						label="Fecha de nacimiento"
						fullWidth
						size='small'
					/>
				</Grid>
				<Grid item xs={12}>
					<InputMaskHook
						control={control}
						defaultValue={user.personal_data.telefono || '58'}
						rules={{
							required: '* Campo requerido',
							minLength: { value: 12, message: 'Error: No válido' },
						}}
						name='personalData.telefono'
						label='Teléfono'
						variant='outlined'
						size='small'
						helperText='Ingrese un número telefónico válido'
						fullWidth
						disabled={loading}
						format='+## (###) ###-####'
					/>
				</Grid>
				<Grid item xs={12}>
					<InputHook
						control={control}
						rules={{
							required: '* Campo requerido',
							minLength: { value: 10, message: 'Error: Demaciado corto' },
							maxLength: { value: 100, message: 'Error: Demaciado larga' },
						}}
						defaultValue={user.personal_data.direccion || ''}
						name='personalData.direccion'
						label='Dirección de domicilio'
						variant='outlined'
						size='small'
						fullWidth
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12}>
					<RadioHook
						control={control}
						defaultValue={user.personal_data.sexo || 'Masculino'}
						disabled={loading}
						label='Sexo'
						name='personalData.sexo'
						row
						radioList={[
							{
								value: 'Masculino',
								label: 'Masculino',
							},
							{
								value: 'Femenino',
								label: 'Femenino',
							}
						]}
					/>
				</Grid>
				<Grid item xs={12}>
					<RadioHook
						control={control}
						defaultValue={user.personal_data.docente || 'No'}
						disabled={loading}
						label='¿Es docente?'
						name='personalData.docente'
						row
						radioList={[
							{
								value: 'No',
								label: 'No',
							},
							{
								value: 'Si',
								label: 'Si',
							}
						]}
					/>
				</Grid>
				{watch('personalData.docente', 'No') === 'Si' && (
					<React.Fragment>
						<Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 5, message: 'Error: Demaciado corto' },
									maxLength: { value: 45, message: 'Error: Demaciado largo' },
								}}
								defaultValue={user.personal_data.docente_titulo || ''}
								name='personalData.docente_titulo'
								label='Título de docencia'
								variant='outlined'
								size='small'
								fullWidth
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12}>
							<DatePickerHook 
								name="personalData.docente_ingreso"
								label="Año de ingreso al Instituto"
								control={control}
								rules={{ 
									required: '* Campo requerido'
								}}
								defaultValue={user.personal_data.docente_ingreso || ''}
								disableFuture
								disabled={loading}
								format='yyyy/MM/dd'
								inputVariant="outlined"
								views={['year', 'month', 'date']}
								openTo="year"
								fullWidth
								size='small'
							/>
						</Grid>
						<Grid item xs={12}>
							<DatePickerHook 
								name="personalData.docente_ingreso_MPPE"
								label="Año de ingreso al MPPE"
								control={control}
								rules={{ 
									required: '* Campo requerido'
								}}
								defaultValue={user.personal_data.docente_ingreso_MPPE || ''}
								disableFuture
								disabled={loading}
								format='yyyy/MM/dd'
								inputVariant="outlined"
								views={['year', 'month', 'date']}
								openTo="year"
								fullWidth
								size='small'
							/>
						</Grid>
					</React.Fragment>
				)}
				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent loading={loading}>
						<Button
							color='primary'
							type='submit'
							variant='contained'
							disableElevation
						>
							{buttonText}
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</form>
	);
}

export default function PersonalUsuario({ id }) {
	const { loading, user, userData } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalUser.loading,
		userData: state.userData.user,
	}));
	
	const { control, handleSubmit, watch } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalUser', true));
		
		if (submitData.personalData.docente === 'No') {
			submitData.personalData.docente_titulo = null;
			submitData.personalData.docente_ingreso = null;
			submitData.personalData.docente_ingreso_MPPE = null;
		}
		
		const prepare = {
			url: `v1/user/${id}`,
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT',
			},
			successText: 'Datos actualizados',
		};

		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateForms('showUser', false, response));
			
			if (response.user.id === userData.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updatePersonalUser', false));
	}
	
	return (
		<PersonalUsuarioForm 
			onSubmit={handleSubmit(onSubmit)}
			buttonText='Actualizar'
			control={control}
			user={user}
			loading={loading}
			watch={watch}
		/>
	);
}