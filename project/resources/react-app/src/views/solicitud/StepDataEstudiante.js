import React from 'react';

import { 
	Grid,
	Typography,
} from '@material-ui/core';

// Components
import PersonalEstudiante from './components/PersonalEstudiante';
import DatosHogarEstudiante from './components/DatosHogarEstudiante';
import DatosReligion from './components/DatosReligion';
import DatosDiscapacidad from './components/DatosDiscapacidad';
import ArchivosEstudiante from './components/ArchivosEstudiante';
import StepControls from './StepControls';

function StepDataEstudiante() {
	return (
		<Grid container justify='center' spacing={2} item xs={12}>
			<Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--big'>
					Datos del estudiante
				</Typography>
			</Grid>
			<PersonalEstudiante />
			<DatosHogarEstudiante />
			<DatosReligion />
			<DatosDiscapacidad />
			<ArchivosEstudiante />
			<StepControls />
		</Grid>
	);
}

export default StepDataEstudiante;