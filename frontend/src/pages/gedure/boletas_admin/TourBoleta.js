import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourBoleta() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Boletas
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>cargar, ver, editar, y eliminar</strong> las boletas de distintos estudiantes.
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
			selector: '[data-tour="gdBol__upload"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>cargar boletas</strong> a todos los estudiantes existentes en el sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
    {
			selector: '[data-tour="gdBol__filters"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permitirá filtrar a los estudiantes que desea ver.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
    {
			selector: '[data-tour="gdTable__refresh"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>refrescar los datos</strong> mostrados en la tabla.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
    {
			selector: '[data-tour="gdTable__massive"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite usar las <strong>opciones masivas</strong>, con lo cual podrá <strong>seleccionar varios estudiantes</strong> y realizar distintas acciones como: <strong>Eliminar boletas</strong>.
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
					Aquí podra buscar usuarios por por su <strong>usuario</strong> o <strong>nombre</strong>.
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
		<TourComponent select='boletas_admin' steps={steps} />
	);
}