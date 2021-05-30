import React, { useRef } from 'react';

import { 
	Grid,
} from '@material-ui/core';

import useFetch from '../../../hooks/useFetch';

// Components
import TableUsersDisabled from './TableUsersDisabled';
import DialogConfirmation from '../../../components/DialogConfirmation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function Main() {
	const tableRef = useRef(null);
	
	const { data } = useSelector((state) => ({
		data: state.dialogs.deleteConfirmation.data,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onRestore = async handleClose => {
		const prepare = {
			url: `v1/user-disabled/restore/${data.id}`,
			type: 'post',
			data: {
				_method: 'PATCH'
			},
			message404: 'El usuario ya no existe',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}

		dispatch(updateDialogs('deleteConfirmation', false, true));
		
		handleClose();
	}
	
	const onRestoreMassive = async handleClose => {
		const prepare = {
			url: `v1/user-disabled/restore?ids=${encodeURI(JSON.stringify(data.ids))}`,
			type: 'post',
			data: {
				_method: 'PATCH'
			},
			message404: 'El usuario ya no existe',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}

		dispatch(updateDialogs('deleteConfirmation', false, true));
		
		handleClose();
	}
	
	const onDestroy = async handleClose => {
		const prepare = {
			url: `v1/user-disabled/${data.id}`,
			type: 'delete',
			message404: 'El usuario ya no existe',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}

		dispatch(updateDialogs('deleteConfirmation', false, true));
		
		handleClose();
	}
	
	const onDestroyMassive = async handleClose => {
		const prepare = {
			url: `v1/user-disabled?ids=${encodeURI(JSON.stringify(data.ids))}`,
			type: 'delete',
			message404: 'El usuario ya no existe',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}

		dispatch(updateDialogs('deleteConfirmation', false, true));
		
		handleClose();
	}
	
	return (
		<Grid container spacing={2}>
			<TableUsersDisabled tableRef={tableRef} />
			{(data.type === 'restore' && !data.massive) && (
				<DialogConfirmation callback={onRestore}>
					Está a punto de restaurar al usuario <strong>{data.username}</strong>. Tenga en cuenta que si reactiva a un estudiante el mismo no se le asignará un curso.
				</DialogConfirmation>
			)}
			{(data.type === 'restore' && data.massive) && (
				<DialogConfirmation callback={onRestoreMassive}>
					Está a punto de restaurar <strong>{data.ids?.length}</strong> usuarios. Tenga en cuenta que si reactiva a un estudiante el mismo no se le asignará un curso.
				</DialogConfirmation>
			)}
			{(data.type === 'destroy' && !data.massive) && (
				<DialogConfirmation callback={onDestroy}>
					Está a punto de eliminar permanentemente al usuario <strong>{data.username}</strong>. Esta acción es irreversible, una vez fuera del sistema no podrá recuperar los datos.
				</DialogConfirmation>
			)}
			{(data.type === 'destroy' && data.massive) && (
				<DialogConfirmation callback={onDestroyMassive}>
					Está a punto de eliminar permanentemente <strong>{data.ids?.length}</strong> usuarios. Esta acción es irreversible, una vez fuera del sistema no podrá recuperar los datos.
				</DialogConfirmation>
			)}
		</Grid>
	);
}