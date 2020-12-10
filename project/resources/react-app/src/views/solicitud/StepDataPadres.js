import React from 'react';

import {
	Grid,
	Typography,
} from '@material-ui/core';

// Components
import DatosMadre from './components/DatosMadre';
import DatosPadre from './components/DatosPadre';
import StepControls from './StepControls';

function StepDataRepresentante() {
	
	return (
		<Grid container justify='center' spacing={2} item xs={12}>
			<Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--big'>
					Datos de los padres
				</Typography>
			</Grid>
			<DatosMadre />
			<DatosPadre />
			<StepControls />
		</Grid>
	);
}

export default StepDataRepresentante;