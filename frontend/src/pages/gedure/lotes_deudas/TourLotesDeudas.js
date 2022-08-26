import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourLotesDeudas() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Lotes de deudas
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>administrar</strong> los <strong>lotes de deudas</strong> dentro del sistema, lo cuál le permite asignarle distintas deudas a los estudiantes registrados en el sistema.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(10)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="create-lote-deuda"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>crear un lote de deudas</strong> en el sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="verify-solvencia"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>verificar la solvencia</strong> de un estudiante en el sistema.
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
					Aquí podrá visualizar los <strong>lotes de deudas creados</strong> en el sistema.
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
					Puede <strong>buscar</strong> los lotes de deudas que desee utilizándo el <strong>ID o el motivo</strong>.
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
					En esta columna puede <strong>visualizar</strong> el <strong>ID</strong> que tiene el lote de deudas <strong>en el sistema</strong>.
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
					En esta columna puede <strong>visualizar</strong> el <strong>motivo</strong> por el cuál se ha creado este lote de deuda.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Monto a pagar"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>monto a pagar</strong>, este puede estar representado en Bs. o en $, todo depende de qué tipo de moneda esté usando el lote de dueda.
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
					En esta columna puede <strong>visualizar</strong> la <strong>fecha</strong> en la que se creó el lote de deuda.
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
					En esta columna puede <strong>visualizar</strong> las <strong>opciones disponibles</strong> que puede hacer con un lote de deudas. En estos momentos usted puede <strong>ver</strong> más información, <strong>editar</strong>, o <strong>eliminar</strong> un lote de deudas.
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
		<TourComponent select='lotes_deudas' steps={steps} />
	);
}