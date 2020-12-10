import React from 'react';

import {
	Grid,
	Typography,
} from '@material-ui/core';

// Components
import DatosProcedencia from './components/DatosProcedencia';
import CupoSolicitar from './components/CupoSolicitar';
import PreguntasSolicitud from './components/PreguntasSolicitud';
import StepControls from './StepControls';

function StepDataSolicitud() {
	
	return (
		<Grid container justify='center' spacing={2} item xs={12}>
			<Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--big'>
					Datos para la solicitud
				</Typography>
			</Grid>
			<DatosProcedencia />
			<CupoSolicitar />
			<PreguntasSolicitud />
			<StepControls />
		</Grid>
	);
}

export default StepDataSolicitud;