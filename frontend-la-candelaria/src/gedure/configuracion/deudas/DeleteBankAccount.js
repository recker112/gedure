import React from 'react';

import useFetch from '../../../hooks/useFetch';

// Components
import DialogConfirmation from '../../../components/DialogConfirmation';
import { parseToAccountString } from '../../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function DeleteBankAccount({ tableRef }) {
	const { data } = useSelector((state) => ({
		data: state.dialogs.deleteConfirmation.data,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onConfirm = async handleClose => {
		const prepare = {
			url: `v1/bank-account/${data.id}`,
			type: 'delete',
			message404: 'La cuenta ya no existe',
		};
		
		const response = await fetchData(prepare);

		dispatch(updateDialogs('deleteConfirmation', false, true));
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	if (data.deleteMassive) {
		return (
			<DialogConfirmation callback={null}>
				Está a punto de eliminar <strong>{data.ids?.length}</strong> cuenta(s). Al realizarse esta acción las transacciones ya realizadas no serán eliminadas del sistema, tenga en cuenta que esta acción no se puede deshacer.
			</DialogConfirmation>
		)
	} 
	
	return (
		<DialogConfirmation callback={onConfirm}>
			Está a punto de eliminar la cuenta <strong>{parseToAccountString(data.n_account || '')}</strong>. Al realizarse esta acción las transacciones ya realizadas no serán eliminadas del sistema, tenga en cuenta que esta acción no se puede deshacer.
		</DialogConfirmation>
	)
}