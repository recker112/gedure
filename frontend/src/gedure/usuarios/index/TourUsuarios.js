import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourUsuarios() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Usuarios
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá administrar a todos los usuarios del sistema.
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
			selector: '[data-tour="create_user"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>crear o invitar usuarios</strong> al sistema, simplemente rellene todos los campos requeridos para que el sistema pueda agregarlo.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="upload_studiends"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>actualizar</strong> la lista de las secciones, <strong>cambiando</strong> a un estudiante de sección o <strong>creando</strong> uno nuevo con solamente cargar una matrícula.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="filters"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permitirá filtrar a los usuarios que desea ver, ¡incluso podrá <strong>buscar a estudiantes</strong> de una <strong>sección en específico</strong>!
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
					Aquí podrá observar los usuarios registrados en el sistema, puede buscarlos por <strong>Usuario</strong>, <strong>Nombre</strong> o <strong>Correo</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="status"]',
			content: () => (
				<Typography variant='body1'>
					Esta parte de la tabla mostrará el <strong>estado de la cuenta</strong>, un usuario es activado únicamente después de rellenar <strong>todos sus datos personales</strong>, por ende, haber entrado al sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="massive"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite usar las <strong>opciones masivas</strong>, con lo cual podrá <strong>seleccionar varios usuarios</strong> y realizar distintas acciones como: <strong>Desactivar usuarios</strong> y <strong>Cambiar de sección a estudiantes</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="refresh"]',
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
			selector: '[data-tour="show"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>ver al usuario</strong>, mostrando todos sus datos y podiendo modificarlos a su gusto. También puede realizar otras acciones referentes a esa cuenta.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="delete"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>desactivar al usuario</strong>, tenga en cuenta que una vez desactivado el mismo será borrado de su curso actual.
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
		<TourComponent select='usuarios' steps={steps} />
	);
}