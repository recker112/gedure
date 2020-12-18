import React from 'react';

import {
	Grid,
	Typography,
} from '@material-ui/core';

// Components
import PersonalRepresentate from './components/PersonalRepresentate';
import DatosHogarRepresentante from './components/DatosHogarRepresentante';
import ProfesionRepresentante from './components/ProfesionRepresentante';
import StepControls from './StepControls';

function StepDataRepresentante() {
	
	return (
		<Grid container justify='center' spacing={2} item xs={12}>
			<Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--big'>
					Datos del representante
				</Typography>
			</Grid>
			<PersonalRepresentate />
			<DatosHogarRepresentante />
			<ProfesionRepresentante />
			<StepControls />
		</Grid>
	);
}

export default StepDataRepresentante;