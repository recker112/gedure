import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

// Redux
import { useSelector } from 'react-redux';

export default function TourHome() {
	const id = useSelector((state) => state.auth.user.id);
	
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
			selector: '[data-tour="avatar-menu"]',
			content: () => (
				<Typography variant='body1'>
					Este boton le permite <strong>desplegar el Avatar Menú</strong> el cual contiene un pequeño menú con acciones relacionadas a la cuenta.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="change-theme"]',
			content: () => (
				<Typography variant='body1'>
					Este boton le permite <strong>cambiar</strong> entre el <strong>Modo Oscuro y el Modo Claro</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="notify"]',
			content: () => (
				<Typography variant='body1'>
					Este boton le permite <strong>ver las notificaciones</strong> del sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="drawer"]',
			content: () => (
				<Typography variant='body1'>
					Este boton <strong>abre el menú del sistema</strong>, desde aquí podrá navegar por todo el sistema.
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
					En esta zona podrá encontrar <strong>información rápida del sistema</strong>.
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
		<TourComponent select='home' steps={steps} />
	);
}