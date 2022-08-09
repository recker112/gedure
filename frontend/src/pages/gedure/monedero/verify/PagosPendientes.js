import React from 'react';

// MUI
import { Grid, Typography } from '@mui/material';

// Components
import Table from './Table';

export default function PagosPendientes() {
  return (
    <>
      <Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--semi'>
					Pagos pendientes a verificar
				</Typography>
			</Grid>
      <Grid item xs={12}>
				<Typography>
					Tenga en cuenta los siguientes puntos antes de realizar una transferencia:
				</Typography>
				<ul>
					<li>
						<Typography>
							Los pagos pendientes son procesados todos los días a las 9:00 PM y a las 2:00 PM.
						</Typography>
					</li>
					<li>
						<Typography>
							Verifique bien los datos que está enviando al sistema, si son erroneos no se podrá comprobar el pago.
						</Typography>
					</li>
				</ul>
			</Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </>
  )
}
