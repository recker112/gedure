import React from 'react';

import {
	Typography,
	Grid,
	Paper,
	FormControlLabel,
	Switch,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function PermissionsAccountStudiend() {
	const { register } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Permisos
						</Typography>
					</Grid>
					<Grid item xs={6} sm={3}>
						<FormControlLabel control={
								<Switch
									name="permissions.boletas"
									inputRef={register}
									disabled={loading}
								/>
							} 
							label="Boletas" 
						/>
					</Grid>
					<Grid item xs={6} sm={3}>
						<FormControlLabel control={
								<Switch
									name="permissions.horarios"
									inputRef={register}
									disabled={loading}
								/>
							} 
							label="Horarios"
						/>
					</Grid>
					<Grid item xs={6} sm={3}>
						<FormControlLabel control={
								<Switch
									name="permissions.soporte"
									inputRef={register}
									disabled={loading}
								/>
							} 
							label="Soporte" 
						/>
					</Grid>
					<Grid item xs={6} sm={3}>
						<FormControlLabel control={
								<Switch 
									name="permissions.account_exonerada"
									inputRef={register}
									disabled={loading}
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

export default PermissionsAccountStudiend;