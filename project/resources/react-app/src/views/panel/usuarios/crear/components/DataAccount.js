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

function DataAccount({ classes }) {
	
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
							variant='outlined'
							name='cedula'
							label='Cédula o usuario *'
							helperText='Ingrese una cédula o un usuario'
							size='small'
							fullWidth
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							variant='outlined'
							name='nombre'
							label='Nombre y apellido *'
							helperText='Ingrese el nombre y apellido'
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