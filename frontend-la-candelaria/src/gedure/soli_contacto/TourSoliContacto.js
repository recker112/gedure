import React from 'react';

import { 
	Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../components/TourComponent';

export default function TourSoliContacto() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: () => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Solicitudes de contácto
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá visualizar las <strong>solicitudes</strong> hechas por personas de <strong>afuera del sistema</strong>.
					</Typography>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '',
			content: () => (
				<Typography variant='body1'>
					Con esto finaliza esta guía, navege entre otras partes del sistema para encontrar más guías.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		}
	];
	
	return (
		<TourComponent select='soli_contacto' steps={steps} />
	);
}