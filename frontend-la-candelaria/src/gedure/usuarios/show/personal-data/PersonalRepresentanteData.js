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
	SelectHook,
	InputHook,
	InputMaskHook,
	RadioHook,
	DatePickerHook
} from '@form-inputs';
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export function PersonalRepresentanteDataForm(props) {
	const { 
		onSubmit, 
		loading, 
		control, 
		user, 
		buttonText, 
		buttonDisable
	} = props;
	
	return (
		<form onSubmit={onSubmit} autoComplete='off'>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Datos del representante
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.repre_nacionalidad'
						label='Nacionalidad'
						defaultValue={user.personal_data.repre_nacionalidad || ''}
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
							minLength: { value: 7, message: 'Error: No válido' },
							maxLength: { value: 14, message: 'Error: No válido' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						}}
						name='personalData.repre_cedula'
						label='Cédula'
						size='small'
						variant='outlined'
						fullWidth
						defaultValue={user.personal_data.repre_cedula || ''}
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
						name='personalData.repre_nombre'
						label='Nombre y apellido'
						size='small'
						variant='outlined'
						fullWidth
						defaultValue={user.personal_data.repre_nombre || ''}
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
						defaultValue={user.personal_data.repre_telefono || '58'}
						name='personalData.repre_telefono'
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
						name='personalData.repre_direccion'
						label='Dirección de domicilio'
						size='small'
						variant='outlined'
						fullWidth
						defaultValue={user.personal_data.repre_direccion || ''}
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12}>
					<RadioHook
						control={control}
						defaultValue={user.personal_data.repre_sexo || 'Masculino'}
						disabled={loading}
						label='Sexo'
						name='personalData.repre_sexo'
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
					<SelectHook
						name='personalData.repre_tipo_familiar'
						label='Tipo de familiar'
						defaultValue={user.personal_data.repre_tipo_familiar || ''}
						control={control}
						disabled={loading}
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Madre">Madre</MenuItem>
						<MenuItem value="Padre">Padre</MenuItem>
						<MenuItem value="Abuela(o)">Abuela(o)</MenuItem>
						<MenuItem value="Padrastro">Padrastro</MenuItem>
						<MenuItem value="Madastra">Madastra</MenuItem>
						<MenuItem value="Tia(o)">Tia(o)</MenuItem>
						<MenuItem value="Otro">Otro</MenuItem>
					</SelectHook>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.repre_estado_civil'
						label='Estado civil'
						defaultValue={user.personal_data.repre_estado_civil || ''}
						control={control}
						disabled={loading}
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Soltero">Soltero</MenuItem>
						<MenuItem value="Casado">Casado</MenuItem>
						<MenuItem value="Viudo">Viudo</MenuItem>
						<MenuItem value="Concubino">Concubino</MenuItem>
						<MenuItem value="Divorciado">Divorciado</MenuItem>
					</SelectHook>
				</Grid>
				<Grid item xs={12}>
					<DatePickerHook 
						name="personalData.repre_nacimiento"
						label="Fecha de nacimiento"
						control={control}
						rules={{ 
							required: '* Campo requerido'
						}}
						defaultValue={user.personal_data.repre_nacimiento || ''}
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
					<InputHook
						control={control}
						rules={{
							required: '* Campo requerido',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Error: No válido',
							},
						}}
						type='email'
						name='personalData.repre_email'
						label='Correo'
						size='small'
						variant='outlined'
						fullWidth
						defaultValue={user.personal_data.repre_email || ''}
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

export default function PersonalRepresentanteData({ id }) {
	const { user, loading, userData } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalRepre.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalRepre', true));
		
		if (submitData.personalData.repre_nacionalidad === 'E') {
			submitData.personalData.repre_ubi_estado = null;
			submitData.personalData.repre_ubi_municipio = null;
			submitData.personalData.repre_ubi_parroquia = null;
			submitData.personalData.repre_ubi_via = null;
		}
		
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
		
		dispatch(updateForms('updatePersonalRepre', false));
	}
	
	return (
		<Box mb={4}>
			<PersonalRepresentanteDataForm
				onSubmit={handleSubmit(onSubmit)}
				control={control}
				loading={loading}
				buttonText='Actualizar'
				user={user}
			/>
		</Box>
	)
}