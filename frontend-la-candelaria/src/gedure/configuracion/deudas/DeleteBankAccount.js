import React from 'react';

import useFetch from '../../../hooks/useFetch';

// Components
import DialogConfirmation from '../../../components/DialogConfirmation';
import { parseToAccountString } from '../../../components/funciones/ParseString';

// Redux
import { useSelector } from 'react-redux';

export default function DeleteBankAccount({ tableRef }) {
	const { data } = useSelector((state) => ({
		data: state.dialogs.deleteConfirmation.data,
	}));
	
	const { fetchData } = useFetch();
	
	const onConfirmMassive = async handleClose => {
		const prepare = {
			url: `v1/bank-account?ids=${encodeURI(JSON.stringify(data.ids))}`,
			type: 'delete',
			message404: 'Las cuentas ya no existen',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	const onConfirm = async handleClose => {
		const prepare = {
			url: `v1/bank-account/${data.id}`,
			type: 'delete',
			message404: 'La cuenta ya no existe',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	if (data.deleteMassive) {
		return (
			<DialogConfirmation callback={onConfirmMassive}>
				Está a punto de eliminar <strong>{data.ids?.length}</strong> cuenta(s). Al realizarse esta acción todas las transacciones bancarias registradas de las mismas serán borradas, pero las transacciones internas realizadas dentro del sistema no se verán afectadas. Tenga en cuenta que esta acción no se puede deshacer.
			</DialogConfirmation>
		)
	} 
	
	return (
		<DialogConfirmation callback={onConfirm}>
			Está a punto de eliminar la cuenta <strong>{parseToAccountString(data.n_account || '')}</strong>. Al realizarse esta acción todas las transacciones bancarias registradas de la misma serán borradas, pero las transacciones internas realizadas dentro del sistema no se verán afectadas. Tenga en cuenta que esta acción no se puede deshacer.
		</DialogConfirmation>
	)
}