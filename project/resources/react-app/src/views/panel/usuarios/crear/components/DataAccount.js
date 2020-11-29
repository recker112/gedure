import React from 'react';

import {
	Typography,
	Grid,
	MenuItem,
	TextField,
	Paper,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function DataAccount() {
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
							Datos de la cuenta
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<RenderSelectFormHook
							id='register-user-type'
							name='privilegio'
							nameLabel='Tipo de cuenta *'
							control={control}
							defaultValue=''
							errors={errors.privilegio}
							helperText='Seleccione un tipo de cuenta'
							disabled={loading}
							>
							<MenuItem value=''>
								<em>Ninguno</em>
							</MenuItem>
							<MenuItem value='V-'>Estudiante</MenuItem>
							<MenuItem value='A-'>Administrador</MenuItem>
						</RenderSelectFormHook>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField 
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 3, message: 'Es muy corto' },
								maxLength: { value: 30, message: 'Es demaciado largo' },
							})}
							error={Boolean(errors?.cedula)}
							helperText={errors?.cedula?.message ? errors.cedula.message : 'Ingrese una cédula o un usuario'}
							variant='outlined'
							name='cedula'
							label='Cédula o usuario *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={5}>
						<TextField 
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 8, message: 'El nombre es muy corto' },
								maxLength: { value: 90, message: 'El nombre es demaciado largo' },
							})}
							error={Boolean(errors?.nombre)}
							helperText={errors?.nombre?.message ? errors.nombre.message : 'Ingrese el nombre y apellido'}
							variant='outlined'
							name='nombre'
							label='Nombre y apellido *'
							size='small'
							disabled={loading}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField 
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'El correo no es válido',
								},
							})}
							error={Boolean(errors?.email)}
							helperText={errors?.email?.message ? errors.email.message : 'Ingrasar un correo válido'}
							type='email'
							variant='outlined'
							name='email'
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

export default DataAccount;