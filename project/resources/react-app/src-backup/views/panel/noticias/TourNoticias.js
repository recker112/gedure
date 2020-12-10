import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

function TourNoticias() {
	const theme = useTheme();
	
	const stepsNoticias = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Registros
					</Typography>
					<Typography variant='body1'>
						En esta sección del sistema podrá administrar todas las noticias pubĺicadas en la App.
					</Typography>
					<Button size='small' color='primary' onClick={()=>goTo(6)}>
						Saltar guía
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="add__noticia"]',
			content: () => (
				<Typography variant='body1'>
					Este botón permite añadir una nueva noticia en el sistema, solo debe rellenar los campos solicitados.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table__noticia"]',
			content: () => (
				<Typography variant='body1'>
					Aquí se mostrarán las noticias las cuales pueden ser editadas o eliminadas. Si posee permisos para modificar otras noticias apareceran todas. Puede buscar noticias por su título, fecha de creación o usuario.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="show__noticia"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le redireccionará a la noticia para poder observarla.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="edit__noticia"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permitirá editar la noticia.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="delete__noticia"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permitirá borrar la noticia. Esta acción le pedirá una confirmación antes de eliminar.
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
		<TourComponent select='noticias' steps={stepsNoticias} />
	);
}

export default TourNoticias;