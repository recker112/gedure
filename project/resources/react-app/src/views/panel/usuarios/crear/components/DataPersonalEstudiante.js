import React from 'react';

import {
	Typography,
	Grid,
	MenuItem,
	TextField,
	Paper,
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useFormContext } from "react-hook-form";
import { Controller } from 'react-hook-form';

// Components
import { RenderSelectFormHook } from '../../../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function DataPersonalEstudiante() {
	const { register, errors, control, watch } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Datos del estudiante
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Sexo</FormLabel>
							<RadioGroup 
								aria-label="sexo" 
								defaultValue='Masculino' 
								name='personalData.estudi_sexo' 
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
					<Grid item xs={12} sm={6} md={4}>
						<RenderSelectFormHook
							id='personalData-estudiante-sexo'
							name='personalData.estudi_estado_civil'
							nameLabel='Estado civil *'
							control={control}
							defaultValue=''
							errors={errors?.personalData?.estudi_estado_civil}
							helperText='Seleccione un estado civil'
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
					<Grid item xs={12} sm={6} md={4}>
						<RenderSelectFormHook
							id='personalData-estudiante-lateralidad'
							name='personalData.estudi_lateralidad'
							nameLabel='Lateralidad *'
							control={control}
							defaultValue=''
							errors={errors?.personalData?.estudi_lateralidad}
							helperText='Seleccione una lateralidad'
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
					<Grid item xs={12} sm={6} md={3}>
						<RenderSelectFormHook
							id='personalData-estudiante-nacionalidad'
							name='personalData.estudi_nacionalidad'
							nameLabel='Nacionalidad *'
							control={control}
							defaultValue=''
							errors={errors?.personalData?.estudi_nacionalidad}
							helperText='Seleccione una nacionalidad'
							disabled={loading}
							>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							<MenuItem value="V">Venezolano</MenuItem>
							<MenuItem value="E">Extranjero</MenuItem>
						</RenderSelectFormHook>
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
									helperText={errors?.personalData?.estudi_nacimiento?.message ? errors.personalData.estudi_nacimiento.message : "Fecha de nacimiento"}
									error={Boolean(errors?.personalData?.estudi_nacimiento)}
									fullWidth
									size='small'
									KeyboardButtonProps={{
										size: 'small',
										'aria-label': 'change date',
									}}
								/>
							)}
							name="personalData.estudi_nacimiento"
							control={control}
							defaultValue={null}
							rules={{ 
								required: { value: true, message: 'Este campo es necesario' },
							}}
						/>
					</Grid>
					{watch('personalData.estudi_nacionalidad', '') === 'V' && (
						<Grid item xs={12} sm={6} md={5}>
							<Controller 
								render={({onChange, onBlur, value, ref})=> (
									<Autocomplete
										id="datosPersonal-estudiante-ubicacionEsta"
										getOptionLabel={(option) => option}
										options={[
											'amazonas'
										]}
										onBlur={onBlur}
										onChange={(e,selected) => {onChange(selected)}}
										value={value}
										disabled={loading}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Estado *"
												variant="outlined"
												size="small"
												inputRef={ref}
												error={Boolean(errors?.personalData?.repre_ubi_estado)}
												helperText={errors?.personalData?.repre_ubi_estado?.message ? errors.personalData.repre_ubi_estado.message : 'Seleccione un estado'}
											/>
										)}
									/>
								)}
								control={control}
								name='personalData.estudi_nacimiento_estado'
								defaultValue={null}
								rules={{
									required: { value: true, message: 'Este campo es obligatorio' },
								}}
							/>
						</Grid>
					)}
					<Grid item xs={12} sm={6} md={5}>
						<TextField 
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 10, message: 'Es muy corto' },
								maxLength: { value: 50, message: 'Es demaciado largo' },
							})}
							error={Boolean(errors?.personalData?.estudi_nacimiento_lugar)}
							helperText={errors?.personalData?.estudi_nacimiento_lugar?.message ? errors.personalData.estudi_nacimiento_lugar.message : 'Ingrese su lugar de nacimiento'}
							variant='outlined'
							name='personalData.estudi_nacimiento_lugar'
							label='Lugar de nacimiento *'
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

export default DataPersonalEstudiante;