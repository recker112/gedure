import React from 'react';

import {
	Grid,
	Button,
	TextField,
	InputAdornment,
	Divider,
	Box,
	Typography,
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
} from '@material-ui/core';

import { DatePicker } from '@material-ui/pickers';

import format from 'date-fns/format';

import useFetch from '../../../../hooks/useFetch';

import { useForm, Controller } from "react-hook-form";

// Components
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export function PersonalUsuarioForm(props) {
	const { onSubmit, control, register, user, errors, loading, watch, buttonText } = props;
	
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
									onChange(format(date, 'yyyy/MM/dd'));
								}}
								value={value}
								helperText={errors?.personalData?.nacimiento?.message ? errors.personalData.nacimiento.message : ''}
								error={Boolean(errors?.personalData?.nacimiento)}
								fullWidth
								size='small'
							/>
						)}
						name="personalData.nacimiento"
						control={control}
						defaultValue={user.personal_data.nacimiento ? format(new Date(user.personal_data.nacimiento), 'yyyy/MM/dd') : ''}
						rules={{ 
							required: { value: true, message: '* Campo requerido' }
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField 
						type='tel'
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 6, message: 'Error: Teléfono no válido' },
							maxLength: { value: 30, message: 'Error: Teléfono no válido' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Ingrese solo números',
							},
						})}
						error={Boolean(errors?.personalData?.telefono)}
						helperText={errors?.personalData?.telefono?.message ? errors.personalData.telefono.message : ''}
						variant='outlined'
						name='personalData.telefono'
						label='Teléfono'
						size='small'
						disabled={loading}
						defaultValue={user.personal_data.telefono}
						fullWidth
						InputProps={{
							startAdornment: <InputAdornment position='start'>+58</InputAdornment>
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField 
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 10, message: 'Error: Demaciado corto' },
							maxLength: { value: 100, message: 'Error: Demaciado larga' },
						})}
						error={Boolean(errors?.personalData?.direccion)}
						helperText={errors?.personalData?.direccion?.message ? errors.personalData.direccion.message : ''}
						variant='outlined'
						name='personalData.direccion'
						label='Dirección de domicilio'
						size='small'
						disabled={loading}
						defaultValue={user.personal_data.direccion}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl component="fieldset" disabled={loading}>
						<FormLabel component="legend">Sexo</FormLabel>
						<RadioGroup 
							aria-label="sexo" 
							name='personalData.sexo'
							defaultValue={user.personal_data.sexo || 'Masculino'}
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
					<FormControl component="fieldset" disabled={loading}>
						<FormLabel component="legend">¿Es docente?</FormLabel>
						<RadioGroup 
							aria-label="Docente"
							name='personalData.docente' 
							defaultValue={user.personal_data.docente || 'No'}
							row
						>
							<FormControlLabel 
								value="No" 
								control={
									<Radio inputRef={register} />
								} 
								label="No"
							/>
							<FormControlLabel 
								value="Si" 
								control={
									<Radio inputRef={register} />
								} 
								label="Si"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				{watch('personalData.docente', 'No') === 'Si' && (
					<React.Fragment>
						<Grid item xs={12}>
							<TextField
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 5, message: 'Error: Demaciado corto' },
									maxLength: { value: 45, message: 'Error: Demaciado largo' },
								})}
								error={Boolean(errors?.personalData?.docente_titulo)}
								helperText={errors?.personalData?.docente_titulo?.message ? errors.personalData.docente_titulo.message : ''}
								variant='outlined'
								name='personalData.docente_titulo'
								label='Título de docencia'
								size='small'
								defaultValue={user.personal_data.docente_titulo}
								disabled={loading}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								render={({onChange, onBlur, value, ref}) => (
									<DatePicker
										disableFuture
										inputVariant="outlined"
										format="dd/MM/yyyy"
										views={['year', 'month', 'date']}
										openTo="year"
										label="Año de ingreso al Instituto"
										onBlur={onBlur}
										inputRef={ref}
										onChange={(date) => {onChange(format(date, 'yyyy/MM/dd'))}}
										value={value}
										helperText={errors?.personalData?.docente_ingreso?.message ? errors.personalData.docente_ingreso.message : ''}
										error={Boolean(errors?.personalData?.docente_ingreso)}
										fullWidth
										size='small'
										disabled={loading}
									/>
								)}
								name="personalData.docente_ingreso"
								control={control}
								defaultValue={user.personal_data.docente_ingreso ? format(new Date(user.personal_data.docente_ingreso), 'yyyy/MM/dd') : ''}
								rules={{ 
									required: { value: true, message: '* Campo requerido' }
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								render={({onChange, onBlur, value, ref}) => (
									<DatePicker
										disableFuture
										inputVariant="outlined"
										format="dd/MM/yyyy"
										views={['year', 'month', 'date']}
										openTo="year"
										label="Año de ingreso al MPPE"
										onBlur={onBlur}
										inputRef={ref}
										onChange={(date) => {onChange(format(date, 'yyyy/MM/dd'))}}
										value={value}
										helperText={errors?.personalData?.docente_ingreso_MPPE?.message ? errors.personalData.docente_ingreso_MPPE.message : ''}
										error={Boolean(errors?.personalData?.docente_ingreso_MPPE)}
										fullWidth
										size='small'
										disabled={loading}
									/>
								)}
								name="personalData.docente_ingreso_MPPE"
								control={control}
								defaultValue={user.personal_data.docente_ingreso_MPPE ? format(new Date(user.personal_data.docente_ingreso_MPPE), 'yyyy/MM/dd') : ''}
								rules={{ 
									required: { value: true, message: '* Campo requerido' }
								}}
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
	
	const { register, control, errors, handleSubmit, watch } = useForm({
		mode: 'onTouched',
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
			register={register}
			user={user}
			loading={loading}
			errors={errors}
			watch={watch}
		/>
	);
}