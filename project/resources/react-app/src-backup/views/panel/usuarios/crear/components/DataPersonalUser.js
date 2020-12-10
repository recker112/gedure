import React from 'react';

import {
	Typography,
	Grid,
	TextField,
	Paper,
	FormControl,
	FormControlLabel,
	InputAdornment,
	FormLabel,
	RadioGroup,
	Radio,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { useFormContext, useWatch, Controller } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function DataPersonalUser() {
	const { register, errors, control } = useFormContext();
	const docente = useWatch({
    name: 'personalData.docente',
    defaultValue: 'No'
  });
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Datos del usuario
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Controller
							render={({onChange, onBlur, value, ref}) => (
								<KeyboardDatePicker
									disableFuture
									variant="inline"
									inputVariant="outlined"
									format="dd/MM/yyyy"
									views={['year', 'month', 'date']}
									openTo="year"
									label="Nacimiento *"
									onBlur={onBlur}
									inputRef={ref}
									onChange={(date) => {onChange(date)}}
									value={value}
									helperText={errors?.personalData?.nacimiento?.message ? errors.personalData.nacimiento.message : "Fecha de nacimiento"}
									error={Boolean(errors?.personalData?.nacimiento)}
									fullWidth
									size='small'
									KeyboardButtonProps={{
										size: 'small',
										'aria-label': 'change date',
									}}
								/>
							)}
							name="personalData.nacimiento"
							control={control}
							defaultValue={null}
							rules={{ 
								required: { value: true, message: 'Este campo es necesario' },
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField 
							type='tel'
							id='datosPersonal-teléfono'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 6, message: 'Teléfono no válido' },
								maxLength: { value: 30, message: 'Teléfono no válido' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Ingrese solo números',
								},
							})}
							error={Boolean(errors?.personalData?.telefono)}
							helperText={errors?.personalData?.telefono?.message ? errors.personalData.telefono.message : 'Ingrese el teléfono de la madre'}
							variant='outlined'
							name='personalData.telefono'
							label='Teléfono *'
							size='small'
							disabled={loading}
							fullWidth
							InputProps={{
								startAdornment: <InputAdornment position='start'>+58</InputAdornment>
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField 
							id='datosPersonal-direccion'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 10, message: 'La dirección es muy corta' },
								maxLength: { value: 100, message: 'La dirección es muy larga' },
							})}
							error={Boolean(errors?.personalData?.direccion)}
							helperText={errors?.personalData?.direccion?.message ? errors.personalData.direccion.message : 'Ingrese la dirección de la madre'}
							variant='outlined'
							name='personalData.direccion'
							label='Dirección de domicilio *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Sexo</FormLabel>
							<RadioGroup 
								aria-label="sexo" 
								defaultValue='Masculino' 
								name='personalData.sexo' 
								disabled={loading}
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
					<Grid item xs={12} sm={6} md={3}>
						<FormControl component="fieldset">
							<FormLabel component="legend">¿Es docente?</FormLabel>
							<RadioGroup 
								aria-label="Docente" 
								defaultValue='No' 
								name='personalData.docente' 
								disabled={loading}
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
					{docente === 'Si' && (
						<React.Fragment>
							<Grid item xs={12} sm={6} md={5}>
								<TextField 
									id='datosPersonal-docente-título'
									inputRef={register({
										required: { value: true, message: 'Este campo es obligatorio' },
										minLength: { value: 5, message: 'Muy corto' },
										maxLength: { value: 45, message: 'Muy largo' },
									})}
									error={Boolean(errors?.personalData?.docente_titulo)}
									helperText={errors?.personalData?.docente_titulo?.message ? errors.personalData.docente_titulo.message : 'Título de docencia'}
									variant='outlined'
									name='personalData.docente_titulo'
									label='Título *'
									size='small'
									disabled={loading}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Controller
									render={({onChange, onBlur, value, ref}) => (
										<KeyboardDatePicker
											disableFuture
											variant="inline"
											inputVariant="outlined"
											format="dd/MM/yyyy"
											views={['year', 'month', 'date']}
											openTo="year"
											label="Año de ingreso al Instituto *"
											onBlur={onBlur}
											inputRef={ref}
											onChange={(date) => {onChange(date)}}
											value={value}
											helperText={errors?.personalData?.docente_ingreso?.message ? errors.personalData.docente_ingreso.message : "Fecha de ingreso al instituto"}
											error={Boolean(errors?.personalData?.docente_ingreso)}
											fullWidth
											size='small'
											disabled={loading}
											KeyboardButtonProps={{
												size: 'small',
												'aria-label': 'change date',
											}}
										/>
									)}
									name="personalData.docente_ingreso"
									control={control}
									defaultValue={null}
									rules={{ 
										required: { value: true, message: 'Este campo es necesario' },
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Controller
									render={({onChange, onBlur, value, ref}) => (
										<KeyboardDatePicker
											disableFuture
											variant="inline"
											inputVariant="outlined"
											format="dd/MM/yyyy"
											views={['year', 'month', 'date']}
											openTo="year"
											label="Año de ingreso al MPPE *"
											onBlur={onBlur}
											inputRef={ref}
											onChange={(date) => {onChange(date)}}
											value={value}
											helperText={errors?.personalData?.docente_ingreso_MPPE?.message ? errors.personalData.docente_ingreso_MPPE.message : "Fecha de ingreso al MPPE"}
											error={Boolean(errors?.personalData?.docente_ingreso_MPPE)}
											fullWidth
											size='small'
											disabled={loading}
											KeyboardButtonProps={{
												size: 'small',
												'aria-label': 'change date',
											}}
										/>
									)}
									name="personalData.docente_ingreso_MPPE"
									control={control}
									defaultValue={null}
									rules={{ 
										required: { value: true, message: 'Este campo es necesario' },
									}}
								/>
							</Grid>
						</React.Fragment>
					)}
				</Grid>
			</Paper>
		</Grid>
	);
}

export default DataPersonalUser;