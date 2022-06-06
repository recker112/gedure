import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourCuenta() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Cuenta
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá ver todos sus datos, también podrá modificarlos y realizar diversas acciones referentes a su cuenta.
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
			selector: '[data-tour="gdShowU__perfil"]',
			content: () => (
				<Typography variant='body1'>
					Esta sección agrupa los diferentes <strong>datos visibles</strong> de la cuenta.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="gdShowU__personal"]',
			content: () => (
				<Typography variant='body1'>
					Esta sección agrupa todos los <strong>datos personales</strong> de la cuenta.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="gdShowU__contraseña"]',
			content: () => (
				<Typography variant='body1'>
					Esta sección le permite <strong>cambiar la contraseña</strong> de la cuenta.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="gdShowU__opciones"]',
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
			selector: '[data-tour="gdShowU__regresar"]',
			content: () => (
				<Typography variant='body1'>
					Aquí puede <strong>regresar a la pestaña anterior</strong>.
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
		<TourComponent select='cuenta' steps={steps} />
	);
}
