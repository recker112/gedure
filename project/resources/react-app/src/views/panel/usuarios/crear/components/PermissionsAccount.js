import React from 'react';

import {
	Typography,
	Grid,
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
							Permisos
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<FormControlLabel control={
								<Switch
									name="permissions.boletas"
								/>
							} 
							label="Boletas" 
						/>
					</Grid>
					<Grid item xs={3}>
						<FormControlLabel control={
								<Switch
									name="permissions.horarios"
								/>
							} 
							label="Horarios"
						/>
					</Grid>
					<Grid item xs={3}>
						<FormControlLabel control={
								<Switch
									name="permissions.soporte"
								/>
							} 
							label="Soporte" 
						/>
					</Grid>
					<Grid item xs={3}>
						<FormControlLabel control={
								<Switch 
									name="permissions.account_exonerada"
								/>
							} 
							label="Cuenta exonerada"
						/>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default PasswordAccount;