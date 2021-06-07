import React, { useRef } from 'react';

import {
	Grid,
	Typography,
} from '@material-ui/core';

// Components
import TablePP from './TablePP';

export default function PendingPayments() {
	const tableRef = useRef(null);
	
	return (
		<React.Fragment>
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
							Todas las transferencias son procesadas los días Viernes a las 08:00 PM.
						</Typography>
					</li>
					<li>
						<Typography>
							Si presenta algún problema con su transferencia por favor comuníquese con su banco para solvertar el problema.
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
				<TablePP tableRef={tableRef} />
			</Grid>
		</React.Fragment>
	);
}