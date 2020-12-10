import React from 'react';

import { 
	Grid,
	Typography,
	TextField,
	InputAdornment,
	MenuItem,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { useFormContext, Controller } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function PersonalRepresentate() {
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
						defaultValue={dataStorage.repre_nombre || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 8, message: 'Error: Demaciado corto' },
							maxLength: { value: 80, message: 'Error: Demaciado largo' },
						})}
						error={Boolean(errors?.repre_nombre)}
						helperText={errors?.repre_nombre?.message ? errors.repre_nombre.message : 'Ingrese el nombre y apellido'}
						variant='outlined'
						name='repre_nombre'
						label='Nombre y apellido'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField 
						defaultValue={dataStorage.repre_cedula || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 7, message: 'Error: Demaciado corto' },
							maxLength: { value: 25, message: 'Error: Demaciado largo' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						})}
						error={Boolean(errors?.repre_cedula)}
						helperText={errors?.repre_cedula?.message ? errors.repre_cedula.message : 'Ingrese la cédula'}
						variant='outlined'
						name='repre_cedula'
						label='Cédula'
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<TextField 
						type='tel'
						defaultValue={dataStorage.repre_telefono || null}
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 6, message: 'Error: Teléfono no válido' },
							maxLength: { value: 30, message: 'Error: Teléfono no válido' },
							pattern: {
								value: /^[0-9]*$/,
								message: 'Error: Solo números',
							},
						})}
						error={Boolean(errors?.repre_telefono)}
						helperText={errors?.repre_telefono?.message ? errors.repre_telefono.message : 'Ingrese su teléfono'}
						variant='outlined'
						name='repre_telefono'
						label='Teléfono del representante'
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
								helperText={errors?.repre_nacimiento?.message ? errors.repre_nacimiento.message : "* Campo requerido"}
								error={Boolean(errors?.repre_nacimiento)}
								fullWidth
								size='small'
								KeyboardButtonProps={{
									size: 'small',
									'aria-label': 'change date',
								}}
							/>
						)}
						name="repre_nacimiento"
						control={control}
						defaultValue={dataStorage?.repre_nacimiento || null}
						rules={{ 
							required: { value: true, message: '* Campo requerido' },
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<RenderSelectFormHook
						id='representante-tipo-familiar'
						name='repre_tipo_familiar'
						nameLabel='Tipo de familiar'
						control={control}
						defaultValue={dataStorage.repre_tipo_familiar || ''}
						errors={errors?.repre_tipo_familiar}
						helperText='* Campo requerido'
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Madre">Madre</MenuItem>
						<MenuItem value="Padre">Padre</MenuItem>
						<MenuItem value="Abuelo">Abuelo</MenuItem>
						<MenuItem value="Abuela">Abuela</MenuItem>
						<MenuItem value="Tio">Tio</MenuItem>
						<MenuItem value="Tia">Tia</MenuItem>
						<MenuItem value="Otro">Otro</MenuItem>
					</RenderSelectFormHook>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default PersonalRepresentate;