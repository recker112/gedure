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
								maxLength: { value: 90, message: 'Teléfono no válido' },
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
				</Grid>
			</Paper>
		</Grid>
	);
}

export default DataPersonalRepresentante;