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
						<FormControlLabel control={<Switch />} label="Boletas" />
					</Grid>
					<Grid item xs={3}>
						<FormControlLabel control={<Switch />} label="Tickets" />
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default PasswordAccount;