import React from 'react';

import { 
	Typography,
	Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Components
import TourComponent from '../../../../components/TourComponent';

export default function TourVerifyPay({ setStep }) {
	const theme = useTheme();
	
	const steps = [
		{
			selector: '',
			content: ({goTo}) => (
				<div>
					<Typography color='primary' className='text__bold--big' variant='h5'>
						Verificar pagos
					</Typography>
					<Typography variant='body1'>
						En esta sección podrá <strong>ver</strong> las <strong>cuentas bancarias disponibles</strong> y <strong>verificar pagos</strong> en las mismas.
					</Typography>
					<Button size='small' color='primary' onClick={()=>{goTo(22)}}>
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
					En este primer paso podrá <strong>verificar</strong> los <strong>pagos pendientes</strong> a procesar por el sistema.
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
					Aquí podrá visualizar las <strong>pagos pendientes</strong> a procesar por el sistema.
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
					Puede <strong>buscar</strong> los pagos pendiente que desee utilizándo la <strong>referencia o la fecha</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Referencia"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> la <strong>referencia</strong> que tiene la transferencia realizada.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Cantidad"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> la <strong>cantidad</strong> de la transferencia realizada.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Fecha"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> la <strong>fecha</strong> en la cuál se realizó la transferencia.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Banco"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>banco</strong> desde donde se realizó la transferencia.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Estado"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> el <strong>estado</strong> del pago pendiente.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="table-Opciones"]',
			content: () => (
				<Typography variant='body1'>
					En esta columna puede <strong>visualizar</strong> las <strong>opciones disponibles</strong> que puede hacer con un pago pendiente. En estos momentos usted puede <strong>eliminar</strong> un pago pendiente.
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
					Por favor tenga en cuenta lo siguiente <strong>antes de realizar cualquier transferencia</strong> a las cuentas bancarias de la institución.
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
					En este segundo paso podrá <strong>listar</strong> y <strong>seleeccionar</strong> las diferentes cuentas bancarias registradas en el sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
			action: () => setStep(1),
		},
		{
			selector: '[data-tour="bank-account-selected"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá <strong>buscar</strong> la <strong>cuenta bancaria</strong> que desea seleccionar.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="bank-account-info"]',
			content: () => (
				<Typography variant='body1'>
					Aquí podrá <strong>visualizar</strong> la información de la <strong>cuenta bancaria</strong> que seleccionó.
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
					Si solo desea <strong>visualizar</strong> los <strong>datos</strong> de la <strong>cuenta bancaria</strong> seleccionada puede dejar el proceso en este paso, si desea <strong>verificar</strong> un pago ya realizado debe <strong>continuar</strong> con el proceso.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
			action: () => setStep(1),
		},
		{
			selector: '[data-tour="content"]',
			content: () => (
				<Typography variant='body1'>
					En este último paso podrá <strong>rellenar</strong> los datos de su pago realizado para ser verificado por el sistema.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
			action: () => setStep(2),
		},
		{
			selector: '[data-tour="amount"]',
			content: () => (
				<Typography variant='body1'>
					Aquí debe <strong>ingresar</strong> el <strong>monto</strong> de la <strong>transacción</strong> que realizó a la cuenta bancaria seleccionada.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="reference"]',
			content: () => (
				<Typography variant='body1'>
					Aquí debe <strong>ingresar</strong> los últimos 8 dígitos de la <strong>referencia</strong>.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="bank"]',
			content: () => (
				<Typography variant='body1'>
					Aquí debe <strong>ingresar</strong> el <strong>banco</strong> desde donde realizó su transferencia.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
		},
		{
			selector: '[data-tour="date"]',
			content: () => (
				<Typography variant='body1'>
					Aquí debe <strong>ingresar</strong> la <strong>fecha</strong> en la cuál realizó su transferencia.
				</Typography>
			),
			style: {
				backgroundColor: theme.palette.background.paper
			},
			action: () => setStep(2),
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
		<TourComponent select='verify_pay' steps={steps} />
	);
}