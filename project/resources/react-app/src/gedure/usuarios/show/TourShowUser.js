import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourShowUser() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Ver usuario
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá ver todos los datos de un usuario en específico, además, podrá modificar los datos y realizar diversas acciones referentes al mismo.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(7)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="perfil"]',
			content: () => (
				<Typography variant='body1'>
					Esta sección agrupa los diferentes <strong>datos visibles</strong> del usuario.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="personal"]',
			content: () => (
				<Typography variant='body1'>
					Esta sección agrupa todos los <strong>datos personales</strong> del usuario.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="contraseña"]',
			content: () => (
				<Typography variant='body1'>
					Esta sección le permite <strong>cambiar la contraseña</strong> del usuario, use esta opción con cautela.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="permisos"]',
			content: () => (
				<Typography variant='body1'>
					En esta sección puede <strong>conceder o quitar permisos</strong> a una cuenta, activando o desactivando <strong>funcionalidades del sistema</strong> para ese usuario.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="opciones"]',
			content: () => (
				<Typography variant='body1'>
					En esta sección puede realizar <strong>diversas acciones</strong> para el usuario.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="regresar"]',
			content: () => (
				<Typography variant='body1'>
					Aquí puede regresar a <strong>Usuarios</strong>.
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
		<TourComponent select='ver_usuarios' steps={steps} />
	);
}