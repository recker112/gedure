import React from 'react';

import {
	Grid,
	Button,
	TextField,
	Divider,
	Box,
} from '@material-ui/core';

export default function Password() {
	return (
		<Box mb={4}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>Cambiar contraseña</Box>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<TextField label='Nueva contraseña' variant='outlined' helperText='Tenga en cuenta que una vez cambiada la contraseña el usuario ya no podrá acceder con su contraseña antigüa, asegurese de informar al usuario de este cambio' size='small' fullWidth />
				</Grid>
				<Grid container justify='flex-end' item xs={12}>
					<Button variant='contained' color='primary' disableElevation>Cambiar contraseña</Button>
				</Grid>
			</Grid>
		</Box>
	);
}