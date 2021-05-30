import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourBoletasAdmin() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Boletas
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>cargar, ver, editar, y eliminar</strong> las boletas de distintos estudiantes.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(6)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="upload"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>cargar boletas</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="filters"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite filtrar a los <strong>estudiantes por sección</strong>.
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
					Aquí podrá observar los estudiantes del sistema, puede buscarlos por <strong>Usuario</strong> o <strong>Nombre</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="massive"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite activar las <strong>opciones masivas</strong> donde podrá <strong>eliminar boletas de varios estudiantes</strong>.
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
		<TourComponent select='boletas_admin' steps={steps} />
	);
}