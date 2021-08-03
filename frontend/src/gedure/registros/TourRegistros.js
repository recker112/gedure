import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../components/TourComponent';

export default function TourRegistros() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Registros
					</Typography>
					<Typography variant='body1'>
						En esta sección del sistema podrá ver todos los procesos(registros) realizados en el sistemas. Incluyendo desde inicios de sesión hasta eliminación de usuarios.
					</Typography>
					<Button size='small' color='primary' onClick={() => {goTo(5)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="filters"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permitirá filtrar los diferentes tipos de registros que desee ver.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podra ver los registros del sistema, puede <strong>buscar</strong> un registro por su <strong>acción</strong>, <strong>fecha</strong> o <strong>usuario</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="refresh"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>refrescar los datos</strong> mostrados en la tabla.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="show_registro"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>obtener más información</strong> sobre el registro en si.
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