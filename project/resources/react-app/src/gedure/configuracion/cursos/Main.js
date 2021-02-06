import React, { useRef } from 'react';

import { 
	Grid,
} from '@material-ui/core';

import useFetch from '../../../hooks/useFetch';

// Components
import CreateCurso from './CreateCurso';
import TableCursos from './TableCursos';
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
	
	const onConfirm = async handleClose => {
		const prepare = {
			url: `v1/curso/${data.id}`,
			type: 'delete',
			message404: 'El curso ya no existe',
		};
		
		const response = await fetchData(prepare);

		dispatch(updateDialogs('deleteConfirmation', false, true));
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	const onConfirm2 = async handleClose => {
		const prepare = {
			url: `v1/massive/curso?ids=${encodeURI(JSON.stringify(data.ids))}`,
			type: 'delete',
		};
		
		const response = await fetchData(prepare);

		dispatch(updateDialogs('deleteConfirmation', false, false));
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		handleClose();
	}
	
	return (
		<Grid container spacing={2}>
			<CreateCurso tableRef={tableRef} />
			<TableCursos tableRef={tableRef} />
			{data.deleteMassive && (
				<DialogConfirmation callback={onConfirm2}>
					Está a punto de eliminar <strong>{data.ids?.length}</strong> cursos. Las boletas de esta sección serán eliminadas por completo, pero los estudiantes se mantendrán activos.
				</DialogConfirmation>
			)}
			{!data.deleteMassive && (
				<DialogConfirmation callback={onConfirm}>
					Estรก a punto de eliminar el curso <strong>{data.code}</strong>. Las boletas de esta sección serán eliminadas por completo, pero los estudiantes se mantendrán activos.
				</DialogConfirmation>
			)}
		</Grid>
	);
}