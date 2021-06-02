import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../components/TourComponent';

export default function TourMonedero() {
	const theme = useTheme();
	
	let steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Monederos
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>ver y administrar los saldos</strong> de los monederos de los usuarios registrados en el sistema.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(2)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="wallet_table"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá <strong>observar los monederos</strong> existentes dentro del sistema, para <strong>buscar un monedero</strong> en específico <strong>use el usuario</strong> de la cuenta.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
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
		<TourComponent select='monedero_admin' steps={steps} />
	);
}