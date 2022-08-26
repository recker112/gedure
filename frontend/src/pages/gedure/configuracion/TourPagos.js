import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourPagos() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Configurar pagos
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá configurar las cuentas bancarias y transacciones de las mismas.
					</Typography>
					<Button size='small' color='primary' onClick={() => goTo(9)}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="create-bank-account"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá <strong>crear cuentas bancarias</strong> en las cuales los estudiantes pueden transferir.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
    {
			selector: '[data-tour="bank-account"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá visualizar las <strong>cuentas bancarias creadas</strong> en el sistema. También puede <strong>editar y eliminar</strong> cualquier cuenta bancaria.
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
					Puede <strong>buscar</strong> las cuentas bancarias que desee utilizándo el <strong>número de cuenta o el nombre</strong>.
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
					También puede usar las <strong>opciones masivas</strong> con las cuales puedes <strong>borrar varias cuentas bancarias</strong> a la vez.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="upload-bank-transaction"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá <strong>subir las transacciones bancarias</strong> de cada cuenta bancaria creada, con las cuales los usuarios podrán <strong>verificar pagos</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="bank-transaction"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá visualizar todas las <strong>transacciones bancarias cargadas</strong> en el sistema. También puede <strong>asignar y eliminar</strong> las transacciones.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="tableT-global"]',
			content: () => (
				<Typography variant='body1'>
					Puede <strong>buscar</strong> las transacciones bancarias que desee utilizándo el <strong>ID, referencia, o concepto</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="tableT-massive"]',
			content: () => (
				<Typography variant='body1'>
					También puede usar las <strong>opciones masivas</strong> con las cuales puedes <strong>borrar varias transacciones bancarias</strong> a la vez.
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
		<TourComponent select='config_pagos' steps={steps} />
	);
}