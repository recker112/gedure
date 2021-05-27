import React from 'react';

import useFetch from '../../../hooks/useFetch';

// Components
import DialogConfirmation from '../../../components/DialogConfirmation';

// Redux
import { useSelector } from 'react-redux';

export default function DeleteBankTransaction({ tableRef }) {
	const { data } = useSelector((state) => ({
		data: state.dialogs.deleteBankTransaction.data,
	}));
	
	const { fetchData } = useFetch();
	
	const onConfirmMassive = async handleClose => {
		const prepare = {
			url: `v1/bank-transaction?ids=${encodeURI(JSON.stringify(data.ids))}`,
			type: 'delete',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	const onConfirm = async handleClose => {
		const prepare = {
			url: `v1/bank-transaction/${data.id}`,
			type: 'delete',
			message404: 'La transacción no existe',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	if (data.deleteMassive) {
		return (
			<DialogConfirmation callback={onConfirmMassive} dialog='deleteBankTransaction'>
				Está a punto de eliminar <strong>{data.ids?.length}</strong> transacciones, tenga en cuenta que esta acción no se puede deshacer.
			</DialogConfirmation>
		)
	} 
	
	return (
		<DialogConfirmation callback={onConfirm} dialog='deleteBankTransaction'>
			Está a punto de eliminar la transacción <strong>#{data.id}</strong>, tenga en cuenta que esta acción no se puede deshacer.
		</DialogConfirmation>
	)
}