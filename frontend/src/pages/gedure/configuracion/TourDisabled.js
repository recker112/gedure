import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourDisabled() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Usuarios desactivados
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá visualizar a los estudiantes desactivados del sistema.
					</Typography>
					<Button size='small' color='primary' onClick={() => goTo(4)}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
    {
			selector: '[data-tour="table-disabled"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá <strong>visualizar a los usuarios desactivados</strong> en el sistema. También puede <strong>eliminar definitivamente y restaurar</strong> a un usuario listado en esta tabla.
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
					Puede <strong>buscar</strong> a los usuarios que desee utilizándo el <strong>usuario, nombre, y correo</strong>.
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
					También puede usar las <strong>opciones masivas</strong> con las cuales puedes <strong>borrar definitivamente o restaurar varios usuarios</strong> a la vez.
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
		<TourComponent select='config_disabled' steps={steps} />
	);
}