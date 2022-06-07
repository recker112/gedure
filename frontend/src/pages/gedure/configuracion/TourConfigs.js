import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourConfigs() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Configurar Gedure
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá configurar Gedure, adapte el sistema a sus necesidades.
					</Typography>
					<Button size='small' color='primary' onClick={() => {goTo(3)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="cursos"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá <strong>crear y eliminar</strong> cursos en el sistema, con ellos podrá agrupas a estudiantes.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
    {
			selector: '[data-tour="usuarios"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá <strong>reactivar y eliminar definitivamente</strong> usuarios del sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '',
			content: () => (
				<Typography variant='body1'>
					Con esto finaliza esta guía, navegue entre otras partes del sistema para encontrar más guías.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		}
	];
	
	return (
		<TourComponent select='registros' steps={steps} />
	);
}