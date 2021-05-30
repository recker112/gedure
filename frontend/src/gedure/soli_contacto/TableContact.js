import React, { useCallback } from 'react';

import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../components/TableConfig';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../actions/updateDialogs';

export default function TableUsers({ tableRef }) {
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/contacto?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(
				query.search
			)}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);

		if (response) {
			return {
				data: response.data,
				page: response.page,
				totalCount: response.totalSoli,
			};
		} else {
			return {
				data: [],
				page: 0,
				totalCount: 0,
			};
		}
		// eslint-disable-next-line
	}, []);
	
	return (
		<div data-tour='table'>
			<MaterialTable
				tableRef={tableRef}
				title="Lista de contáctanos" 
				icons={tableIcons}
				localization={tableLocation}
				data={onFetch}
				columns={[
					{title: 'Nombre',field: 'nombre',},
					{title: 'Asunto', field: 'asunto'},
					{title: 'Correo', field: 'email'},
					{title: 'Fecha', field: 'created_at',},
				]}
				actions={[
					{
						icon: () => (<RefreshIcon data-tour="refresh" />),
						tooltip: 'Recargar',
						isFreeAction: true,
						onClick: (event, rowData) => {
							tableRef.current && tableRef.current.onQueryChange();
						},
					},
					{
						icon: () => (<VisibilityIcon data-tour="show" />),
						tooltip: 'Ver solicitud',
						onClick: (event, rowData) => {
							dispatch(updateDialogs('showSoliContact', true, false, rowData));
						},
					},
					{
						icon: () => (<DeleteIcon data-tour="destroy" />),
						tooltip: 'Eliminar solicitud',
						disabled: !permissions.administrar?.contact_destroy,
						onClick: (event, rowData) => {
							const data = {
								id: rowData.id,
								asunto: rowData.asunto,
							};
							
							dispatch(updateDialogs('deleteConfirmation', true, false, data));
						},
					},
				]}
				options={{
					sorting: false,
					draggable: false,
					actionsColumnIndex: -1,
				}}
			/>
		</div>
	);
}