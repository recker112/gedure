import React from 'react';

import {
	Typography,
	Grid,
	MenuItem,
	TextField,
	Paper,
	InputAdornment,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { useFormContext } from "react-hook-form";
import { Controller } from 'react-hook-form';

// Components
import { RenderSelectFormHook } from '../../../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function DataPersonalRepresentante() {
	const { register, errors, control } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Información del representante
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<RenderSelectFormHook
							id='datosPersonal-representate-nacionalidad'
							name='personalData.repre_nacionalidad'
							nameLabel='Nacionalidad *'
							control={control}
							defaultValue=''
							errors={errors.personalData?.repre_nacionalidad}
							helperText='Seleccione una nacionalidad'
							disabled={loading}
							>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							<MenuItem value='V'>Venezolano</MenuItem>
							<MenuItem value='E'>Extranjero</MenuItem>
						</RenderSelectFormHook>
					</Grid>
					<Grid item xs={4}>
						<TextField 
							id='datosPersonal-representate-cedula'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 7, message: 'Cédula muy corta' },
								maxLength: { value: 14, message: 'Cédula muy larga' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Ingrese solo números',
								},
							})}
							error={Boolean(errors?.personalData?.repre_cedula)}
							helperText={errors?.personalData?.repre_cedula?.message ? errors.personalData.repre_cedula.message : 'Ingrese la cédula del representante'}
							variant='outlined'
							name='personalData.repre_cedula'
							label='Cédula *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							id='datosPersonal-padre-nombre'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 8, message: 'Nombre muy corto' },
								maxLength: { value: 90, message: 'Nombre muy largo' },
							})}
							error={Boolean(errors?.personalData?.repre_nombre)}
							helperText={errors?.personalData?.repre_nombre?.message ? errors.personalData.repre_nombre.message : 'Ingrese el nombre del representante'}
							variant='outlined'
							name='personalData.repre_nombre'
							label='Nombre y apellido *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField 
							type='tel'
							id='datosPersonal-padre-teléfono'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 6, message: 'Teléfono no válido' },
								maxLength: { value: 30, message: 'Teléfono no válido' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Ingrese solo números',
								},
							})}
							error={Boolean(errors?.personalData?.repre_telefono)}
							helperText={errors?.personalData?.repre_telefono?.message ? errors.personalData.repre_telefono.message : 'Ingrese el teléfono del representate'}
							variant='outlined'
							name='personalData.repre_telefono'
							label='Teléfono *'
							size='small'
							disabled={loading}
							fullWidth
							InputProps={{
								startAdornment: <InputAdornment position='start'>+58</InputAdornment>
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField 
							id='datosPersonal-padre-direccion'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 10, message: 'La dirección es muy corta' },
								maxLength: { value: 100, message: 'La dirección es muy larga' },
							})}
							error={Boolean(errors?.personalData?.repre_direccion)}
							helperText={errors?.personalData?.repre_direccion?.message ? errors.personalData.repre_direccion.message : 'Ingrese la dirección del representate'}
							variant='outlined'
							name='personalData.repre_direccion'
							label='Dirección de domicilio *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Sexo</FormLabel>
							<RadioGroup 
								aria-label="sexo" 
								defaultValue='Masculino' 
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
					<Grid item xs={4}>
						<RenderSelectFormHook
							id='datosPersonal-representate-tipoFamiliar'
							name='personalData.repre_tipo_familiar'
							nameLabel='Tipo de familiar *'
							control={control}
							defaultValue=''
							errors={errors.personalData?.repre_tipo_familiar}
							helperText='Seleccione el tipo de familiar'
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
					<Grid item xs={4}>
						<RenderSelectFormHook
							id='datosPersonal-representate-estadoCivil'
							name='personalData.repre_estado_civil'
							nameLabel='Estado civil *'
							control={control}
							defaultValue=''
							errors={errors.personalData?.repre_estado_civil}
							helperText='Seleccione el estado civil'
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
					<Grid item xs={4}>
						<Controller
							as={
								<KeyboardDatePicker
									disableFuture
									variant="inline"
									inputVariant="outlined"
									format="dd/MM/yyyy"
									views={['year', 'month', 'date']}
									openTo="year"
									label="Nacimiento *"
									helperText={errors?.dataPersonal?.repre_nacimiento?.message ? errors.dataPersonal.repre_nacimiento.message : "Fecha de nacimiento"}
									error={Boolean(errors?.dataPersonal?.repre_nacimiento)}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							}
							name="dataPersonal.repre_nacimiento"
							control={control}
							defaultValue={null}
							rules={{ 
								required: { value: true, message: 'Este campo es necesario' },
							}}
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'El correo no es válido',
								},
							})}
							error={Boolean(errors?.dataPersonal?.repre_email)}
							helperText={errors?.dataPersonal?.repre_email?.message ? errors.dataPersonal.repre_email.message : 'Ingrasar un correo válido'}
							type='email'
							variant='outlined'
							name='dataPersonal.repre_email'
							label='Correo *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default DataPersonalRepresentante;