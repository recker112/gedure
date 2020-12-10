import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

function TourRegistros() {
	const theme = useTheme();
	
	const stepsRegistros = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Registros
					</Typography>
					<Typography variant='body1'>
						En esta sección del sistema podrá ver todos los procesos(registros) realizados en el sistemas.
					</Typography>
					<Button size='small' color='primary' onClick={()=>goTo(3)}>
						Saltar guía
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="filter__registros"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá filtrar los tipos de registros que desea ver.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table__registros"]',
			content: () => (
				<Typography variant='body1'>
					Aquí se mostrarán los registros obtenidos de la consulta hacia el servidor.
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
		<TourComponent select='registros' steps={stepsRegistros} />
	);
}

export default TourRegistros;