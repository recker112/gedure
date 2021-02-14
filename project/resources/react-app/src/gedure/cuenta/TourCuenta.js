import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../components/TourComponent';

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
						En esta sección podrá <strong>actualizar sus datos</strong> y realizar diversas acciones de su cuenta.
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
			selector: '[data-tour="perfil"]',
			content: () => (
				<Typography variant='body1'>
					Esta sección se agrupa los diferentes <strong>datos visibles</strong> su cuenta.
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
					Esta sección agrupa todos sus <strong>datos personales</strong>.
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
					En esta sección podrá <strong>cambiar su contraseña</strong>.
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
					En esta sección podrá realizar diversas <strong>acciones en su cuenta</strong>.
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
		<TourComponent select='cuenta' steps={steps} />
	);
}