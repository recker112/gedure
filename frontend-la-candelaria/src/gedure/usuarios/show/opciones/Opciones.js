import React from 'react';

import {
	Grid,
	Box,
	Divider,
} from '@material-ui/core';

import ReenviarInvitacion from './ReenviarInvitacion';

export default function Opciones({ id }) {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>
					Opciones de la cuenta
				</Box>
				<Divider />
			</Grid>
			<ReenviarInvitacion id={id} />
		</Grid>
	);
}