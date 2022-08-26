import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourDeudas() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Deudas
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>administrar</strong> sus diferentes <strong>deudas</strong> dentro del sistema.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(8)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="balance"]',
			content: () => (
				<Typography variant='body1'>
					Aquí puede <strong>visualizar</strong> su <strong>saldo disponible</strong> dentro del sistema.
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
					Aquí podrá visualizar las <strong>deudas</strong> disponibles para usted en el sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="gdTable__search"]',
			content: () => (
				<Typography variant='body1'>
					Puede <strong>buscar</strong> las transacciones que desee utilizándo el <strong>motivo</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Motivo"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>motivo</strong> de la deuda <strong>en el sistema</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Cantidad"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> la <strong>cantidad</strong> que debe cancelar para pagar esta deuda.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Estado"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>estado</strong> en el que se encuentra la deuda.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Opciones"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> las <strong>opciones disponibles</strong> que puede hacer con una transacción. En estos momentos usted puede <strong>ver</strong> la transacción de una deuda pagada, y <strong>pagar</strong> una deuda pendiente.
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
		<TourComponent select='deudas' steps={steps} />
	);
}