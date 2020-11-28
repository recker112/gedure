import React from 'react';

import {
	Typography,
	Grid,
	MenuItem,
	TextField,
	Paper,
	InputAdornment,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function DataPersonalMadre() {
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
							Información de la madre
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<RenderSelectFormHook
							id='datosPersonal-madre-nacionalidad'
							name='personalData.madre_nacionalidad'
							nameLabel='Nacionalidad *'
							control={control}
							defaultValue=''
							errors={errors.personalData?.madre_nacionalidad}
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
							id='datosPersonal-madre-cedula'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 7, message: 'Cédula muy corta' },
								maxLength: { value: 14, message: 'Cédula muy larga' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Ingrese solo números',
								},
							})}
							error={Boolean(errors?.personalData?.madre_cedula)}
							helperText={errors?.personalData?.madre_cedula?.message ? errors.personalData.madre_cedula.message : 'Ingrese la cédula de la madre'}
							variant='outlined'
							name='personalData.madre_cedula'
							label='Cédula *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							id='datosPersonal-madre-nombre'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 8, message: 'Nombre muy corto' },
								maxLength: { value: 90, message: 'Nombre muy largo' },
							})}
							error={Boolean(errors?.personalData?.madre_nombre)}
							helperText={errors?.personalData?.madre_nombre?.message ? errors.personalData.madre_nombre.message : 'Ingrese el nombre de la madre'}
							variant='outlined'
							name='personalData.madre_nombre'
							label='Nombre y apellido *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField 
							type='tel'
							id='datosPersonal-madre-teléfono'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 6, message: 'Teléfono no válido' },
								maxLength: { value: 30, message: 'Teléfono no válido' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Ingrese solo números',
								},
							})}
							error={Boolean(errors?.personalData?.madre_telefono)}
							helperText={errors?.personalData?.madre_telefono?.message ? errors.personalData.madre_telefono.message : 'Ingrese el teléfono de la madre'}
							variant='outlined'
							name='personalData.madre_telefono'
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
							id='datosPersonal-madre-direccion'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 10, message: 'La dirección es muy corta' },
								maxLength: { value: 100, message: 'La dirección es muy larga' },
							})}
							error={Boolean(errors?.personalData?.madre_direccion)}
							helperText={errors?.personalData?.madre_direccion?.message ? errors.personalData.madre_direccion.message : 'Ingrese la dirección de la madre'}
							variant='outlined'
							name='personalData.madre_direccion'
							label='Dirección de domicilio *'
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

export default DataPersonalMadre;