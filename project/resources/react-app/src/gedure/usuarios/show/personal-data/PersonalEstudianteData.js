import React from 'react';

import {
	Grid,
	Button,
	TextField,
	Divider,
	Box,
	Typography,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
	MenuItem,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DatePicker } from '@material-ui/pickers';

import format from 'date-fns/format';

import { useForm, Controller } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';
import { RenderSelectFormHook } from '../../../../components/RendersGlobals';
import { estadosVE } from '../../../../components/funciones/locationVenezuela';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export function PersonalEstudianteDataForm(props) {
	const { 
		onSubmit, 
		register, 
		control, 
		errors, 
		loading,
		watch, 
		buttonText,
		user,
		buttonDisable = false,
	} = props;
	
	return (
		<form onSubmit={onSubmit}>
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
					<FormControl component="fieldset" disabled={loading}>
						<FormLabel component="legend">Sexo</FormLabel>
						<RadioGroup 
							aria-label="sexo" 
							defaultValue={user.personal_data.estudi_sexo || 'Masculino'} 
							name='personalData.estudi_sexo' 
							row
						>
							<FormControlLabel 
								value="Masculino" 
								control={
									<Radio inputRef={register} />
								} 
								label="Masculino"
							/>
							<FormControlLabel 
								value="Femenino" 
								control={
									<Radio inputRef={register} />
								} 
								label="Femenino"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<RenderSelectFormHook
						name='personalData.estudi_estado_civil'
						nameLabel='Estado civil'
						control={control}
						defaultValue={user.personal_data.estudi_estado_civil || ''} 
						errors={errors?.personalData?.estudi_estado_civil}
						disabled={loading}
						>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Soltero">Soltero</MenuItem>
						<MenuItem value="Concubino">Concubino</MenuItem>
						<MenuItem value="Casado">Casado</MenuItem>
					</RenderSelectFormHook>
				</Grid>
				<Grid item xs={12}>
					<RenderSelectFormHook
						name='personalData.estudi_lateralidad'
						nameLabel='Lateralidad'
						control={control}
						defaultValue={user.personal_data.estudi_lateralidad || ''} 
						errors={errors?.personalData?.estudi_lateralidad}
						disabled={loading}
						>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Derecho">Derecho</MenuItem>
						<MenuItem value="Zurdo">Zurdo</MenuItem>
						<MenuItem value="Ambidiestro">Ambidiestro</MenuItem>
					</RenderSelectFormHook>
				</Grid>
				<Grid item xs={12}>
					<RenderSelectFormHook
						name='personalData.estudi_nacionalidad'
						nameLabel='Nacionalidad'
						control={control}
						defaultValue={user.personal_data.estudi_nacionalidad || ''} 
						errors={errors?.personalData?.estudi_nacionalidad}
						disabled={loading}
						>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="V">Venezolano</MenuItem>
						<MenuItem value="E">Extranjero</MenuItem>
					</RenderSelectFormHook>
				</Grid>
				<Grid item xs={12}>
					<Controller
						render={({onChange, onBlur, value, ref}) => (
							<DatePicker
								disableFuture
								disabled={loading}
								format='dd/MM/yyyy'
								inputVariant="outlined"
								views={['year', 'month', 'date']}
								openTo="year"
								label="Fecha de nacimiento"
								onBlur={onBlur}
								inputRef={ref}
								onChange={date => {
									onChange(format(date, 'yyyy/MM/dd'))
								}}
								value={value}
								helperText={errors?.personalData?.estudi_nacimiento?.message ? errors.personalData.estudi_nacimiento.message : ''}
								error={Boolean(errors?.personalData?.estudi_nacimiento)}
								fullWidth
								size='small'
							/>
						)}
						name="personalData.estudi_nacimiento"
						control={control}
						defaultValue={user.personal_data.estudi_nacimiento ? format(new Date(user.personal_data.estudi_nacimiento), 'yyyy/MM/dd') : ''}
						rules={{ 
							required: { value: true, message: '* Campo requerido' },
							valueAsDate: true,
						}}
					/>
				</Grid>
				{watch('personalData.estudi_nacionalidad', '') === 'V' && (
					<Grid item xs={12}>
						<Controller 
							render={({onChange, onBlur, value, ref})=> (
								<Autocomplete
									getOptionLabel={(option) => option}
									options={estadosVE}
									onBlur={onBlur}
									onChange={(e,selected) => {onChange(selected)}}
									value={value}
									disabled={loading}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Estado"
											variant="outlined"
											size="small"
											inputRef={ref}
											error={Boolean(errors?.personalData?.estudi_nacimiento_estado)}
											helperText={errors?.personalData?.estudi_nacimiento_estado?.message ? errors.personalData.estudi_nacimiento_estado.message : ''}
										/>
									)}
								/>
							)}
							control={control}
							name='personalData.estudi_nacimiento_estado'
							defaultValue={user.personal_data.estudi_nacimiento_estado || ''}
							rules={{
								required: { value: true, message: '* Campo requerido' },
							}}
						/>
					</Grid>
				)}
				<Grid item xs={12}>
					<TextField 
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 10, message: 'Error: Demaciado corto' },
							maxLength: { value: 50, message: 'Error: Demaciado largo' },
						})}
						error={Boolean(errors?.personalData?.estudi_nacimiento_lugar)}
						helperText={errors?.personalData?.estudi_nacimiento_lugar?.message ? errors.personalData.estudi_nacimiento_lugar.message : ''}
						variant='outlined'
						name='personalData.estudi_nacimiento_lugar'
						defaultValue={user.personal_data.estudi_nacimiento_lugar || ''}
						label='Lugar de nacimiento'
						size='small'
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

export default function PersonalEstudianteData({ id }) {
	const { userData, loading, user } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalStudiend.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { register, control, errors, watch, handleSubmit } = useForm({
		mode: 'onTouched'
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
				register={register}
				errors={errors}
				control={control}
				loading={loading}
				watch={watch}
				user={user}
				buttonText='Actualizar'
			/>
		</Box>
	)
}