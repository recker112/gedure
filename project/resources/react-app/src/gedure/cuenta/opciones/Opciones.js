import React from 'react';

import {
	Grid,
	Box,
	Divider,
} from '@material-ui/core';

import LogoutAll from './LogoutAll';

export default function Opciones() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>
					Opciones de la cuenta
				</Box>
				<Divider />
			</Grid>
			<LogoutAll />
		</Grid>
	);
}