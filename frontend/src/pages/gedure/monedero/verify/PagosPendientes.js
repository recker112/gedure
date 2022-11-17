import React from 'react';

// MUI
import { Grid, Typography } from '@mui/material';

// Components
import Table from './Table';
import DialogConfirmation from '../../../../components/DialogConfirmation';

// Redux
import { setRequestStatus } from '../../../../store/slices/requestStatusWallet';
import { deletePendingPayments } from '../../../../store/slices/requestStatusWallet/async_trunk/monedero/deletePendingPayments';

export default function PagosPendientes() {
  return (
    <>
      <Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--semi'>
					Pagos pendientes a verificar
				</Typography>
			</Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
			<Grid item xs={12} data-tour="important">
				<Typography variant='subtitle2'>
					Tenga en cuenta los siguientes puntos antes de realizar una transferencia:
				</Typography>
				<ul>
					<li>
						<Typography variant='subtitle2'>
							Los pagos pendientes son procesados todos los días a las 12:00 PM.
						</Typography>
					</li>
					<li>
						<Typography variant='subtitle2'>
							Verifique bien los datos que está enviando al sistema, si son erroneos no se podrá comprobar el pago.
						</Typography>
					</li>
					<li>
						<Typography variant='subtitle2'>
							Todos los precios dentro del sistema se actualizan los domingos a las 12:00 PM, intente no hacer transferencias los viernes.
						</Typography>
					</li>
				</ul>
			</Grid>
			<DialogConfirmation
				rdx1='requestStatusWallet' 
				rdx2='deletePendingPayments'
				close={
					setRequestStatus({open: false, select: 'deletePendingPayments'})
				}
				request={
					data => deletePendingPayments(data.id)
				}
			>
				{(data) => {
					if (data.status === 'pendiente') {
						return (
							<span>
								Está a punto de <strong>eliminar un pago pendiente a verificar</strong> con la referencia <strong>{data.reference}</strong>. Si borra un pago pendiente por error siempre podrá volver a crearlo.
							</span>
						)
					}else if (data.status !== 'pendiente') {
						return (
							<span>
								Este tipo de registros son <strong>eliminados automáticamente en la proxima revisión</strong>, puede eliminarlos manualmente o simplemente esperar a que el sistema lo haga por usted.
							</span>
						)
					}
				}}
			</DialogConfirmation>
    </>
  )
}
