import React from 'react';

import { 
	Typography,
	Button,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

const classes = {
  secondaryText: (theme) => ({
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	}),
}

export default function TourRegistros() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Registros
					</Typography>
					<Typography variant='body1'>
						En esta sección del sistema podrá ver todos los procesos <Box component='span' sx={classes.secondaryText}>(registros)</Box> realizados en el sistemas. Incluyendo desde inicios de sesión hasta eliminación de usuarios.
					</Typography>
					<Button size='small' color='primary' onClick={() => {goTo(5)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="gdTable__search"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá buscar registros por por su <strong>acción</strong>, <strong>fecha</strong> o <strong>usuario</strong>.
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
			selector: '[data-tour="gdReg__filters"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permitirá <strong>filtrar</strong> los diferentes tipos de <strong>registros</strong> que desee ver.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="gdReg__show"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>obtener más información</strong> sobre el registro en si.
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
		<TourComponent select='registros' steps={steps} />
	);
}