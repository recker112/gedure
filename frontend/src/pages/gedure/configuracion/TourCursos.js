import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourCursos() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Configurar cursos
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá configurar los cursos que agruparán a los estudiantes en el sistema.
					</Typography>
					<Button size='small' color='primary' onClick={() => goTo(5)}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="create-curso"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá <strong>crear cursos</strong> en el sistema, con ellos podrá agrupas a estudiantes.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
    {
			selector: '[data-tour="cursos"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá visualizar los <strong>cursos activos</strong> en el sistema, y a su vez, <strong>eliminar</strong> los que ya no necesite.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="gdTable__search"]',
			content: () => (
				<Typography variant='body1'>
					Puede <strong>buscar</strong> los cursos que desee utilizándo el <strong>código</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="gdTable__massive"]',
			content: () => (
				<Typography variant='body1'>
					También puede usar las <strong>opciones masivas</strong> con las cuales puedes <strong>borrar varios cursos</strong> a la vez.
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
		<TourComponent select='config_cursos' steps={steps} />
	);
}