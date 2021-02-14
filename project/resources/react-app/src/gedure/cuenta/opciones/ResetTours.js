import React from 'react';

import {
	Grid,
	Button,
	Box,
} from '@material-ui/core';

import { useSnackbar } from 'notistack';

// Redux
import { useDispatch } from 'react-redux';
import resetTours from '../../../actions/resetTours';

export default function ResetTours() {
	const dispatch = useDispatch();
	
	const { enqueueSnackbar } = useSnackbar();
	
	const onSubmit = async () => {
		// Eliminar storage
		dispatch(resetTours());
		
		enqueueSnackbar('Todas las guias reactivadas');
	}
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={8}>
				<Box fontSize='h5.fontSize' className='text__bold--semi'>
					Reactivar todos las guias
				</Box>
				<Box fontSize='body1.fontSize' color='text.secondary'>
					Reactive todas la guias que ya haya realizado
				</Box>
			</Grid>
			<Grid container justify='flex-end' alignItems='center' item xs={12} sm={4}>
				<Button 
					variant='contained' 
					color='primary' 
					disableElevation
					onClick={onSubmit}
				>
					Reactivar
				</Button>
			</Grid>
		</React.Fragment>
	);
}