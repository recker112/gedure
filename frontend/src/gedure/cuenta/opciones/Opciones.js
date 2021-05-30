import React from 'react';

import {
	Grid,
	Box,
	Divider,
} from '@material-ui/core';

// Components
import LogoutAll from './LogoutAll';
import ResetTours from './ResetTours';

export default function Opciones() {
	return (
		<Grid container spacing={4}>
			<Grid item xs={12}>
				<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>
					Opciones de la cuenta
				</Box>
				<Divider />
			</Grid>
			<LogoutAll />
			<ResetTours />
		</Grid>
	);
}