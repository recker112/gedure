import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourMonedero() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Monedero
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>administrar</strong> su <strong>monedero</strong> dentro del sistema.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(11)}}>
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
			selector: '[data-tour="verify-pago"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>visualizar</strong> las <strong>cuentas bancarias</strong> existentes y <strong>verificar un pago</strong> realizado a una de las cuentas bancarias en el sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="transfer-saldo"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>transferir saldo</strong> a un usuario existente en el sistema.
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
					Aquí podrá visualizar las <strong>transacciones de su monedero</strong> en el sistema.
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
					Puede <strong>buscar</strong> las transacciones que desee utilizándo el <strong>ID</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Id"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>ID</strong> que tiene la transacción <strong>en el sistema</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Tipo"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>tipo</strong> de la transacción, este se utiliza para referirse a distintas acciones que se pueden realizar en el sistema.
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
					En esta columna puede <strong>visualizar</strong> la <strong>cantidad</strong> por la cual se realizó la transacción.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Fecha"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> la <strong>fecha</strong> en la que se creó la transacción.
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
					En esta columna puede <strong>visualizar</strong> las <strong>opciones disponibles</strong> que puede hacer con una transacción. En estos momentos usted puede <strong>ver</strong> una transacción.
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
		<TourComponent select='monedero' steps={steps} />
	);
}