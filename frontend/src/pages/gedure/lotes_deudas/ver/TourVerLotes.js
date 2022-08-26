import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../../components/TourComponent';

export default function TourVerLotes() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Ver lotes de deudas
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá obtener <strong>más información</strong> de las deudas creadas dentro del lote de deudas.
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
			selector: '[data-tour="view-data"]',
			content: () => (
				<Typography variant='body1'>
					Esta zona le permite <strong>observar</strong> distinta <strong>información relevante</strong> del lote de deudas.
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
					Aquí podrá <strong>visualizar</strong> las <strong>deudas creadas</strong> para el lote de deudas.
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
					Puede <strong>buscar</strong> las deudas que desee utilizándo el <strong>usuario</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Usuario"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>usuario</strong> que el estudiante tiene <strong>en el sistema</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Nombre"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>nombre</strong> que el estudiante tiene <strong>en el sistema</strong>.
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
					En esta columna puede <strong>visualizar</strong> el <strong>estado</strong> que tiene la <strong>deuda</strong> <strong>en el sistema</strong>. Las deudas pueden tener <strong>2 estados disponibles</strong>: <strong>pagadas y no pagadas</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Fecha del pago"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> la <strong>fecha de pago</strong> que tiene la <strong>deuda</strong> <strong>en el sistema</strong>. Esta fecha <strong>solo se muestra</strong> si una deuda tiene el estado de <strong>pagada</strong>.
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
					En esta columna puede <strong>visualizar</strong> las <strong>opciones disponibles</strong> que puede hacer con una deuda. En estos momentos usted puede <strong>ver</strong> la transacción de una deuda pagada o <strong>eliminar</strong> una deuda no pagada.
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
		<TourComponent select='lotes_deudas_ver' steps={steps} />
	);
}