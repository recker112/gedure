import React, { useRef } from 'react';

import {
	Grid,
	Typography,
} from '@material-ui/core';

import useFetch from '../../../../hooks/useFetch';

// Components
import DialogConfirmation from '../../../../components/DialogConfirmation';
import TablePP from './TablePP';

// Redux
import { useSelector } from 'react-redux';

export default function PendingPayments() {
	const tableRef = useRef(null);
	
	const { data } = useSelector((state) => ({
		data: state.dialogs.deleteConfirmation.data,
	}));
	
	const { fetchData } = useFetch();
	
	const onConfirm = async handleClose => {
		const prepare = {
			url: `v1/pending-payment/${data.id}`,
			type: 'delete',
			message404: 'No se puede eliminar ese registro',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
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
							Todos los pagos pendientes son procesados los días Viernes a las 8:00 PM.
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
				<DialogConfirmation callback={onConfirm}>
					{data.status === 'pendiente' && (
						<span>
							Está a punto de <strong>eliminar un pago pendiente a verificar</strong> con la referencia <strong>{data.reference}</strong>. Si borra un pago pendiente por error siempre podrá volver a crearlo.
						</span>
					)}
					{data.status !== 'pendiente' && (
						<span>
							Este tipo de registros son <strong>eliminados automáticamente en la proxima revisión</strong>, puede eliminarlos manualmente o simplemente esperar a que el sistema lo haga por usted.
						</span>
					)}
				</DialogConfirmation>
			</Grid>
		</React.Fragment>
	);
}