import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../../components/TourComponent';

export default function TourEditPub() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Editar
					</Typography>
					<Typography variant='body1'>
						En este apartado podrá <strong>editar</strong> publicaciones existentes en el sistema.
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
			selector: '[data-tour="gdPub__preview"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>alternar</strong> entre <strong>visualizar</strong> una vista previa y <strong>editar</strong> la publicación.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
    {
			selector: '[data-tour="gdPub__title"]',
			content: () => (
				<Typography variant='body1'>
					Este campo le permite <strong>cambiar el título</strong> de la publicación.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="gdPub__tooltip"]',
			content: () => (
				<Typography variant='body1'>
					Este apartado le permite <strong>utilizar diferentes formatos</strong> para poder estilizar los diferentes textos del contenido de la publicación.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
    {
			selector: '[data-tour="gdPub__content"]',
			content: () => (
				<Typography variant='body1'>
					Este campo le permite <strong>cambiar el contenido</strong> a utilizar en la publicación.
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
					El <strong>resto de los campos son opcionales</strong>, con ellos puede realizar diversas acciones para terminar de completar su publicación.
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
		<TourComponent select='publicaciones_edit' steps={steps} />
	);
}