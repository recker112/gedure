import React from 'react';

import { 
	Grid,
	Typography,
	TextField,
	InputAdornment,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { useFormContext, Controller } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function PersonalEstudiante() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors, control } = useFormContext();
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Datos personales
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={12} sm={6}>
					<TextField 
						defaultValue={dataStorage.estudi_nombre || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 8, message: 'Error: Demaciado corto' },
							maxLength: { value: 80, message: 'Error: Demaciado largo' },
						})}
						error={Boolean(errors?.estudi_nombre)}
						helperText={errors?.estudi_nombre?.message ? errors.estudi_nombre.message : '* Campo requerido'}
						variant='outlined'
						name='estudi_nombre'
						label='Nombre y apellido'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField 
						defaultValue={dataStorage.estudi_cedula || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 7, message: 'Error: Cédula no válida' },
							maxLength: { value: 25, message: 'Error: Cédula no válida' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						})}
						error={Boolean(errors?.estudi_cedula)}
						helperText={errors?.estudi_cedula?.message ? errors.estudi_cedula.message : '* Campo requerido'}
						variant='outlined'
						name='estudi_cedula'
						label='Cédula o cédula escolar'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<TextField 
						type='tel'
						defaultValue={dataStorage.estudi_telefono || null}
						inputRef={register({
							minLength: { value: 6, message: 'Error: Teléfono no válido' },
							maxLength: { value: 25, message: 'Error: Teléfono no válido' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						})}
						error={Boolean(errors?.estudi_telefono)}
						helperText={errors?.estudi_telefono?.message ? errors.estudi_telefono.message : 'Campo opcional'}
						variant='outlined'
						name='estudi_telefono'
						label='Teléfono del estudiante'
						size='small'
						InputProps={{
							startAdornment: <InputAdornment position='start'>+58</InputAdornment>
						}}
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
								label="Fecha de nacimiento"
								onBlur={onBlur}
								inputRef={ref}
								onChange={(date) => {onChange(date)}}
								value={value}
								helperText={errors?.estudi_nacimiento?.message ? errors.estudi_nacimiento.message : "* Campo requerido"}
								error={Boolean(errors?.estudi_nacimiento)}
								fullWidth
								size='small'
								KeyboardButtonProps={{
									size: 'small',
									'aria-label': 'change date',
								}}
							/>
						)}
						name="estudi_nacimiento"
						control={control}
						defaultValue={dataStorage?.estudi_nacimiento || null}
						rules={{ 
							required: { value: true, message: '* Campo requerido' },
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<TextField 
						defaultValue={dataStorage.estudi_lugar_nacimiento || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
						})}
						error={Boolean(errors?.estudi_lugar_nacimiento)}
						helperText={errors?.estudi_lugar_nacimiento?.message ? errors.estudi_lugar_nacimiento.message : '* Campo requerido'}
						variant='outlined'
						name='estudi_lugar_nacimiento'
						label='Lugar de nacimiento'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<TextField 
						defaultValue={dataStorage.estudi_email || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Error: Correo no válido',
							},
						})}
						error={Boolean(errors?.estudi_email)}
						helperText={errors?.estudi_email?.message ? errors.estudi_email.message : '* Campo requerido'}
						type='email'
						variant='outlined'
						name='estudi_email'
						label='Correo electrónico'
						size='small'
						fullWidth
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default PersonalEstudiante;