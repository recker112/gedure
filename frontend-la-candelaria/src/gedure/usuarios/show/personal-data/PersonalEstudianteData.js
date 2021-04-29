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
	DatePickerHook,
	InputHook,
	RadioHook,
	SelectHook,
	AutoCompleteHook,
} from '@form-inputs';
import LoadingComponent from '../../../../components/LoadingComponent';
import { estadosVE } from '../../../../components/funciones/locationVenezuela';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export function PersonalEstudianteDataForm(props) {
	const { 
		onSubmit, 
		control, 
		loading,
		watch, 
		buttonText,
		user,
		buttonDisable = false,
	} = props;
	
	return (
		<form onSubmit={onSubmit} autoComplete='off'>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Datos del estudiante
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<RadioHook
						control={control}
						defaultValue={user.personal_data.estudi_sexo || 'Masculino'}
						disabled={loading}
						label='Sexo'
						name='personalData.estudi_sexo'
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
						name='personalData.estudi_estado_civil'
						label='Estado civil'
						control={control}
						disabled={loading}
						defaultValue={user.personal_data.estudi_estado_civil || ''} 
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Soltero">Soltero</MenuItem>
						<MenuItem value="Concubino">Concubino</MenuItem>
						<MenuItem value="Casado">Casado</MenuItem>
					</SelectHook>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.estudi_lateralidad'
						label='Lateralidad'
						control={control}
						disabled={loading}
						defaultValue={user.personal_data.estudi_lateralidad || ''} 
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Derecho">Derecho</MenuItem>
						<MenuItem value="Zurdo">Zurdo</MenuItem>
						<MenuItem value="Ambidiestro">Ambidiestro</MenuItem>
					</SelectHook>
				</Grid>
				<Grid item xs={12}>
					<SelectHook
						name='personalData.estudi_nacionalidad'
						label='Nacionalidad'
						control={control}
						disabled={loading}
						defaultValue={user.personal_data.estudi_nacionalidad || ''}
						fullWidth
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="V">Venezolano</MenuItem>
						<MenuItem value="E">Extranjero</MenuItem>
					</SelectHook>
				</Grid>
				<Grid item xs={12}>
					<DatePickerHook 
						name="personalData.estudi_nacimiento"
						label="Fecha de nacimiento"
						control={control}
						rules={{ 
							required: '* Campo requerido'
						}}
						defaultValue={user.personal_data.estudi_nacimiento || ''}
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
				{watch('personalData.estudi_nacionalidad', '') === 'V' && (
					<Grid item xs={12}>
						<AutoCompleteHook
							name='personalData.estudi_nacimiento_estado'
							label='Estado'
							options={estadosVE}
							getOptionLabel={(option) => option || ''}
							defaultValue={user.personal_data.estudi_nacimiento_estado || ''}
							control={control}
							rules={{
								required: { value: true, message: '* Campo requerido' },
							}}
							variant="outlined"
							size="small"
							disabled={loading}
						/>
					</Grid>
				)}
				<Grid item xs={12}>
					<InputHook
						control={control}
						rules={{
							required: '* Campo requerido',
							minLength: { value: 10, message: 'Error: Demaciado corto' },
							maxLength: { value: 50, message: 'Error: Demaciado largo' },
						}}
						defaultValue={user.personal_data.estudi_nacimiento_lugar || ''}
						name='personalData.estudi_nacimiento_lugar'
						label='Lugar de nacimiento'
						variant='outlined'
						size='small'
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

export default function PersonalEstudianteData({ id }) {
	const { userData, loading, user } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalStudiend.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { control, watch, handleSubmit } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalStudiend', true));
		
		if (submitData.personalData.estudi_nacionalidad !== 'V') {
			submitData.personalData.estudi_nacimiento_estado = null;
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
		
		dispatch(updateForms('updatePersonalStudiend', false));
	}
	
	return (
		<Box mb={4}>
			<PersonalEstudianteDataForm 
				onSubmit={handleSubmit(onSubmit)}
				control={control}
				loading={loading}
				watch={watch}
				user={user}
				buttonText='Actualizar'
			/>
		</Box>
	)
}