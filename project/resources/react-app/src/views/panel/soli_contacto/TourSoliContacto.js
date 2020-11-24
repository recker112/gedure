import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

function TourSoliContacto() {
	const theme = useTheme();
	
	const stepsSoliContacto = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Registros
					</Typography>
					<Typography variant='body1'>
						En esta sección del sistema podrá ver las solicitudes de contacto enviadas.
					</Typography>
					<Button size='small' color='primary' onClick={()=>goTo(4)}>
						Saltar guía
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="table__soliContacto"]',
			content: () => (
				<Typography variant='body1'>
					Aquí se mostrarán las solicitudes enviadas. Podrá buscarlas por nombre, asunto o fecha de creación.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="show__soliContacto"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite ver el mensaje completo.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="delete__soliContacto"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite eliminar esta solicitud del sistema. Asegurese de eliminarla solo si ya no tiene pensado usarla.
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
					Con esto finaliza esta guía, navege entre otras partes del sistema para encontrar más guías.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		}
	];
	
	return (
		<TourComponent select='solicitudContacto' steps={stepsSoliContacto} />
	);
}

export default TourSoliContacto;