import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../components/TourComponent';

// Redux
import { useSelector } from 'react-redux';

export default function TourIndex() {
	const { id } = useSelector((state) => ({
		id: state.userData.user.id,
	}));
	
	const theme = useTheme();
	
	let steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Gedure
					</Typography>
					<Typography variant='body1'>
						Bienvenido a Gedure, durante estas guias podrá enterarse de las funcionalidades las cuales tiene disponible. Si lo desea puede saltarse esta guia usando el boton.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(5)}}>
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
					Este boton le permite desplegar el Avatar Menú el cual contiene un pequeño menú con acciones relacionadas a la cuenta.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="theme__button"]',
			content: () => (
				<Typography variant='body1'>
					Este boton le permite cambiar entre el Modo Oscuro y el Modo Claro.
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
			selector: '[data-tour="infoBox"]',
			content: () => (
				<Typography variant='body1'>
					En esta zona podrá encontrar información rápida del sistema.
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
	
	if (id === 1) {
		steps = [
			...steps,
			{
				selector: '',
				content: () => (
					<div>
						<Typography color='primary' className='text__bold--big' variant='h5'>
							Una última cosa...
						</Typography>
						<Typography variant='body1'>
							Parece que acabas de iniciar gedure por primera vez, en ese caso le recomendamos que vaya a <strong>Configurar Gedure</strong> en el menú y configure el sistema a sus necesidades.
						</Typography>
					</div>
				),
				style: {
					backgroundColor: theme.palette.background.paper
				},
			}
		];
	}
	
	return (
		<TourComponent select='index' steps={steps} />
	);
}