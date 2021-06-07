import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourMonedero() {
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
						En esta sección podrá <strong>gestionar su monedero</strong>, desde <strong>verificar pagos</strong> realizados hasta <strong>transferir saldo</strong> a otro usuario.
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
			selector: '[data-tour="balance"]',
			content: () => (
				<Typography variant='body1'>
					Aquí puede visualizar la cantidad de saldo que dispone actualente.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="verify_pay"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>comenzar el proceso para verificar un pago</strong> en el sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="transfer"]',
			content: () => (
				<Typography variant='body1'>
					Este botón le permite <strong>realizar transferencia de saldo</strong> a otras cuentas existentes en el sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="wallet_table"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá observar todos los movimientos realizados con su monedero en el sistema, puede buscarlos por <strong>ID</strong> o por <strong>Fecha</strong>. También podrá visualizar la factura generada automáticamente por el sistema.
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
		<TourComponent select='monedero' steps={steps} />
	);
}