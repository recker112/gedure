import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../../components/TourComponent';

export default function TourTransfer({ setStep }) {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Transferir saldo
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>transferir saldo</strong> a otros usuarios registrados en el sistema.
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
			selector: '[data-tour="steppers"]',
			content: () => (
				<Typography variant='body1'>
					Aquí puede <strong>visualizar</strong> la cantidad de <strong>pasos necesarios</strong> para completar este proceso.
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
					En este primer paso tendrá que <strong>rellenar</strong> los <strong>datos necesarios</strong> para realizar la transferencia.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="user"]',
			content: () => (
				<Typography variant='body1'>
					Aquí debe <strong>ingresar</strong> el <strong>usuario</strong> al que desea transferir saldo.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="amount"]',
			content: () => (
				<Typography variant='body1'>
					Aquí debe <strong>ingresar</strong> el <strong>monto</strong> que desea transferir al usuario.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="reason"]',
			content: () => (
				<Typography variant='body1'>
					Este campo es completamente <strong>opcional</strong>, si desea especificar el motivo por el cuál va a realizar la transferencia de saldo puede hacerlo aquí.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="important"]',
			content: () => (
				<Typography variant='body1'>
					Por favor tenga en cuenta lo siguiente <strong>antes de realizar cualquier transferencia</strong> a otro usuario.
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
					Aquí podrá <strong>moverse</strong> entre los diferentes pasos para realizar el proceso.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
			action: () => setStep(0),
		},
		{
			selector: '[data-tour="content"]',
			content: () => (
				<Typography variant='body1'>
					En este último paso podrá <strong>verificar</strong> los <strong>datos ingresados</strong> antes de realizar la transferencia de saldo.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
			action: () => setStep(1),
		},
		{
			selector: '[data-tour="password"]',
			content: () => (
				<Typography variant='body1'>
					Una vez verificado los datos ingresados, tendrá que colocar su <strong>contraseña actual</strong> como método de seguridad para poder completar la transferencia.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
			action: () => setStep(1),
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
			action: () => setStep(0),
		}
	];
	
	return (
		<TourComponent select='transfer_saldo' steps={steps} />
	);
}