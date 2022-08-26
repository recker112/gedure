import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourTransactions() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Transacciones
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>visualizar</strong> todas las <strong>transacciones</strong> realizadas dentro del sistema.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(9)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="table"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá visualizar las <strong>transacciones creadas</strong> en el sistema.
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
					Puede <strong>buscar</strong> los lotes de deudas que desee utilizándo el <strong>ID o el dueño</strong>.
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
			selector: '[data-tour="table-Dueño"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>dueño</strong> de la transacción, generalmente se muestra el usuario de la cuenta que realizó la transacción.
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
					En esta columna puede <strong>visualizar</strong> la <strong>cantidad</strong> por la cuál se realizó la transacción.
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
					En esta columna puede <strong>visualizar</strong> las <strong>opciones disponibles</strong> que puede hacer con una transacción. En estos momentos usted puede <strong>ver</strong> la transacción.
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
		<TourComponent select='transactions' steps={steps} />
	);
}