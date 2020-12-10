import React from 'react';

import {
	Grid,
	Typography,
} from '@material-ui/core';

// Components
import DatosArtesanal from './components/DatosArtesanal';
import StepControls from './StepControls';

function StepDataArtesanal() {
	
	return (
		<Grid container justify='center' spacing={2} item xs={12}>
			<Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--big'>
					Centro taller artesanal
				</Typography>
			</Grid>
			<DatosArtesanal />
			<StepControls />
		</Grid>
	);
}

export default StepDataArtesanal;