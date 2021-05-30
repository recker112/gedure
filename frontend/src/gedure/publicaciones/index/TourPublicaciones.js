import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourPublicaciones() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Publicaciones
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>crear, editar y eliminar</strong> publicaciones.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(4)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="create"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite crear una nueva publicación.
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
					Aquí podrá observar las publicaciones del sistema, puede buscarlas por <strong>Usuario</strong>, <strong>Título</strong> o <strong>Fecha</strong>.
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
		<TourComponent select='publicaciones' steps={steps} />
	);
}