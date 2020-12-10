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
							Información del padre
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<RenderSelectFormHook
							id='datosPersonal-padre-nacionalidad'
							name='personalData.padre_nacionalidad'
							nameLabel='Nacionalidad *'
							control={control}
							defaultValue=''
							errors={errors.personalData?.padre_nacionalidad}
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
					<Grid item xs={12} sm={6} md={4}>
						<TextField 
							id='datosPersonal-padre-cedula'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 7, message: 'Cédula muy corta' },
								maxLength: { value: 14, message: 'Cédula muy larga' },
								pattern: {
									value: /^[0-9]*$/,
									message: 'Ingrese solo números',
								},
							})}
							error={Boolean(errors?.personalData?.padre_cedula)}
							helperText={errors?.personalData?.padre_cedula?.message ? errors.personalData.padre_cedula.message : 'Ingrese la cédula del padre'}
							variant='outlined'
							name='personalData.padre_cedula'
							label='Cédula *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={5}>
						<TextField 
							id='datosPersonal-padre-nombre'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 8, message: 'Nombre muy corto' },
								maxLength: { value: 90, message: 'Nombre muy largo' },
							})}
							error={Boolean(errors?.personalData?.padre_nombre)}
							helperText={errors?.personalData?.padre_nombre?.message ? errors.personalData.padre_nombre.message : 'Ingrese el nombre del padre'}
							variant='outlined'
							name='personalData.padre_nombre'
							label='Nombre y apellido *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
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
							error={Boolean(errors?.personalData?.padre_telefono)}
							helperText={errors?.personalData?.padre_telefono?.message ? errors.personalData.padre_telefono.message : 'Ingrese el teléfono del padre'}
							variant='outlined'
							name='personalData.padre_telefono'
							label='Teléfono *'
							size='small'
							disabled={loading}
							fullWidth
							InputProps={{
								startAdornment: <InputAdornment position='start'>+58</InputAdornment>
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<TextField 
							id='datosPersonal-padre-direccion'
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 10, message: 'La dirección es muy corta' },
								maxLength: { value: 100, message: 'La dirección es muy larga' },
							})}
							error={Boolean(errors?.personalData?.padre_direccion)}
							helperText={errors?.personalData?.padre_direccion?.message ? errors.personalData.padre_direccion.message : 'Ingrese la dirección del padre'}
							variant='outlined'
							name='personalData.padre_direccion'
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