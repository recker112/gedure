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
	InputAdornment,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

import format from 'date-fns/format';

import { useForm, Controller } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';
import { RenderSelectFormHook } from '../../../../components/RendersGlobals';
import { NumberFormatInput } from '../../../../components/RendersGlobals';

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
		register, 
		errors, 
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
					<RenderSelectFormHook
						name='personalData.repre_nacionalidad'
						nameLabel='Nacionalidad'
						control={control}
						defaultValue={user.personal_data.repre_nacionalidad || ''}
						errors={errors.personalData?.repre_nacionalidad}
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
						error={Boolean(errors?.personalData?.repre_cedula)}
						helperText={errors?.personalData?.repre_cedula?.message ? errors.personalData.repre_cedula.message : ''}
						variant='outlined'
						name='personalData.repre_cedula'
						label='Cédula'
						size='small'
						defaultValue={user.personal_data.repre_cedula || ''}
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
						error={Boolean(errors?.personalData?.repre_nombre)}
						helperText={errors?.personalData?.repre_nombre?.message ? errors.personalData.repre_nombre.message : ''}
						variant='outlined'
						name='personalData.repre_nombre'
						label='Nombre y apellido'
						size='small'
						defaultValue={user.personal_data.repre_nombre || ''}
						disabled={loading}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<NumberFormatInput
						disabled={loading}
						error={Boolean(errors?.personalData?.repre_telefono)}
						helperText={errors?.personalData?.repre_telefono ? errors.personalData.repre_telefono.message : ''}
						label='Teléfono'
						size='small'
						mask='phone'
						fullWidth
						name='personalData.repre_telefono'
						variant='outlined'
						control={control}
						defaultValue={user.personal_data.repre_telefono || '58'}
						rules={{
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 12, message: 'Error: Teléfono no válido' }
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 10, message: 'Error: Demaciado corto' },
							maxLength: { value: 100, message: 'Error: Demaciado largo' },
						})}
						error={Boolean(errors?.personalData?.repre_direccion)}
						helperText={errors?.personalData?.repre_direccion?.message ? errors.personalData.repre_direccion.message : ''}
						variant='outlined'
						name='personalData.repre_direccion'
						label='Dirección de domicilio'
						size='small'
						defaultValue={user.personal_data.repre_direccion || ''}
						disabled={loading}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl component="fieldset" disabled={loading}>
						<FormLabel component="legend">Sexo</FormLabel>
						<RadioGroup 
							aria-label="sexo" 
							defaultValue={user.personal_data.repre_sexo || 'Masculino'}
							name='personalData.repre_sexo' 
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
						name='personalData.repre_tipo_familiar'
						nameLabel='Tipo de familiar'
						control={control}
						defaultValue={user.personal_data.repre_tipo_familiar || ''}
						errors={errors.personalData?.repre_tipo_familiar}
						disabled={loading}
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
					</RenderSelectFormHook>
				</Grid>
				<Grid item xs={12}>
					<RenderSelectFormHook
						name='personalData.repre_estado_civil'
						nameLabel='Estado civil'
						control={control}
						defaultValue={user.personal_data.repre_estado_civil || ''}
						errors={errors.personalData?.repre_estado_civil}
						disabled={loading}
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Soltero">Soltero</MenuItem>
						<MenuItem value="Casado">Casado</MenuItem>
						<MenuItem value="Viudo">Viudo</MenuItem>
						<MenuItem value="Concubino">Concubino</MenuItem>
						<MenuItem value="Divorciado">Divorciado</MenuItem>
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
								helperText={errors?.personalData?.repre_nacimiento?.message ? errors.personalData.repre_nacimiento.message : ''}
								error={Boolean(errors?.personalData?.repre_nacimiento)}
								fullWidth
								size='small'
							/>
						)}
						name="personalData.repre_nacimiento"
						control={control}
						defaultValue={user.personal_data.repre_nacimiento ? format(new Date(user.personal_data.repre_nacimiento), 'yyyy/MM/dd') : ''}
						rules={{ 
							required: { value: true, message: '* Campo requerido' }
						}}
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
						error={Boolean(errors?.personalData?.repre_email)}
						helperText={errors?.personalData?.repre_email?.message ? errors.personalData.repre_email.message : ''}
						type='email'
						variant='outlined'
						name='personalData.repre_email'
						label='Correo'
						size='small'
						defaultValue={user.personal_data.repre_email || ''}
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

export default function PersonalRepresentanteData({ id }) {
	const { user, loading, userData } = useSelector((state) => ({
		user: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalRepre.loading,
		userData: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { register, control, errors, handleSubmit } = useForm({
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
				register={register}
				control={control}
				errors={errors}
				loading={loading}
				buttonText='Actualizar'
				user={user}
			/>
		</Box>
	)
}