import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

function TourIndex() {
	const theme = useTheme();
	
	const stepsIndex = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Gedure v5.0.0-beta.0
					</Typography>
					<Typography variant='body1'>
						Bienvenido a la Beta de Gedure, durante estas guias podrá enterarse de las funcionalidades las cuales tiene disponible  Si lo desea puede saltarse esta guia usando el boton.
					</Typography>
					<Button size='small' color='primary' onClick={()=>goTo(5)}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="avatar__menu"]',
			content: () => (
				<Typography variant='body1'>
					Este boton permite desplegar el Avatar Menú el cual contiene un pequeño menú con acciones relacionadas a la cuenta.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="theme__button"]',
			content: () => (
				<Typography variant='body1'>
					Este boton permite cambiar entre el Modo Oscuro y el Modo Claro.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="drawer__button"]',
			content: () => (
				<Typography variant='body1'>
					Este boton abre el menú del sistema, desde aquí podrá navegar por todo el sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="showSection"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá ver en qué parte del sistema se encuentra.
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
		<TourComponent select='index' steps={stepsIndex} />
	);
}

export default TourIndex;