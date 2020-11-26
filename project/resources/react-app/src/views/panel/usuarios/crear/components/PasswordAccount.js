import React from 'react';

import {
	Typography,
	Grid,
	TextField,
	Paper,
	FormControlLabel,
	Switch,
} from '@material-ui/core';

function PasswordAccount({ classes }) {
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Contraseña de la cuenta
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<TextField 
							variant='outlined'
							name='password'
							label='Contraseña *'
							helperText='Ingrese una contraseña'
							size='small'
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField 
							variant='outlined'
							name='confirm_password'
							label='Repetir contraseña *'
							helperText='Repita la contraseña'
							size='small'
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel control={<Switch />} label="Generar contraseña" />
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default PasswordAccount;