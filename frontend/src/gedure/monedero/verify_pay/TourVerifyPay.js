import React from 'react';

import { 
	Typography,
	Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// Components
import TourComponent from '../../../components/TourComponent';

export default function TourVerifyPay() {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Verificar pago
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>verificar los pagos</strong> realizados mediante transferencias o depósito bancario.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(5)}}>
						Saltar tour
					</Button>
				</div>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			}
		},
		{
			selector: '[data-tour="return"]',
			content: () => (
				<Typography variant='body1'>
					Con este botón puede volver a la sección anterior.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="steppers"]',
			content: () => (
				<Typography variant='body1'>
					Aquí se muestran las <strong>diferentes etapas</strong> por las cual tiene que pasar para compeltar el proceso.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="content"]',
			content: () => (
				<Typography variant='body1'>
					Aquí puede <strong>visualizar el contenido de la etapa actual</strong>, complete todos los campos para poder pasar a la siguiente.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="controls"]',
			content: () => (
				<Typography variant='body1'>
					Aquí puede encontrar los distintos botones que le permitirán <strong>avanzar o retroceder</strong> en los pasos del proceso.
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
		<TourComponent select='verify_pay' steps={steps} />
	);
}