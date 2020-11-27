import React from 'react';

import {
	Typography,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormHelperText,
	TextField,
	Paper,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

function DataAccount({ classes }) {
	const { register, errors } = useFormContext();
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Datos de la cuenta
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<FormControl className={classes.formControlSelect}>
							<InputLabel id="register-user-type-label">
								Tipo de cuenta *
							</InputLabel>
							<Select
								labelId="register-user-type-label"
								id="register-user-type"
								defaultValue='V-'
							>
								<MenuItem value='V-'>Estudiante</MenuItem>
								<MenuItem value='A-'>Administrador</MenuItem>
							</Select>
							<FormHelperText>Seleccione un tipo de cuenta</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={4}>
						<TextField 
							inputRef={register({
								required: { value: true, message: 'Este campo es obligatorio' },
								minLength: { value: 3, message: 'Es my corto' },
								maxLength: { value: 30, message: 'Es demaciado largo' },
							})}
							error={Boolean(errors?.cedula)}
							helperText={errors?.cedula?.message ? errors.cedula.message : 'Ingrese una cédula o un usuario'}
							variant='outlined'
							name='cedula'
							label='Cédula o usuario *'
							size='small'
							fullWidth
						/>
					</Grid>
					<Grid item xs={5}>
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
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField 
							variant='outlined'
							name='email'
							label='Correo *'
							helperText='Ingrese un correo activo'
							size='small'
							fullWidth
						/>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default DataAccount;