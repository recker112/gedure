import React, { useCallback } from 'react';

import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../hooks/useFetch';

import { format } from 'date-fns';

// Components
import { tableIcons, tableLocation } from '../../components/TableConfig';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';
import updateDialogs from '../../actions/updateDialogs';

export default function TableRegistros({ tableRef, filters }) {
	const { loading } = useSelector((state) => ({
		loading: state.forms.registros.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onFetch = useCallback(async query => {
		if (loading) {
			query.page = 0;
		}
		
		let type = filters.type ? encodeURI(filters.type) : 'all';
		
		const prepare = {
			url: `v1/logs?page=${query.page}&per_page=${query.pageSize}&type=${type}&search=${encodeURI(query.search)}`,
			type: 'get',
			messageToFinish: false,
		}
		
		const response = await fetchData(prepare);
		
		dispatch(updateForms('registros', false));
		
		if (response) {
			// Error page void
			if (response.data.length === 0 && response.page !== 0) {
				tableRef.current && tableRef.current.onQueryChange();
				return {
					data: [],
					page: 0,
					totalCount: 0,
				};
			}
			
			return {
				data: response.data,
				page: response.page,
				totalCount: response.totalRows,
			};
		}else {
			return {
				data: [],
				page: 0,
				totalCount: 0
			}
		}
		// eslint-disable-next-line
	}, [loading, filters]);
	
	return (
		<div data-tour='table'>
			<MaterialTable
				tableRef={tableRef}
				title="Registros del sistema" 
				icons={tableIcons}
				columns={[
					{
						title: 'Usuario', 
						field: 'username',
						render: rowData => rowData?.user?.privilegio+rowData?.user?.username,
					},
					{
						title: 'Nombre', 
						field: 'name',
						render: rowData => rowData?.user?.name,
					},
					{title: 'Acción', field: 'action'},
					{title: 'Fecha', field: 'created_at'}
				]}
				data={onFetch}
				localization={tableLocation}
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
						icon: () => (<VisibilityIcon data-tour='show_registro' />),
						tooltip: 'Ver',
						onClick: (event, rowData) => {
							const data = rowData;
							data.date = format(new Date(data.date_format), 'dd/MM/yy');
							data.hours = format(new Date(data.date_format), 'hh:mm a');
							data.username = rowData.user.privilegio+rowData.user.username;
							data.name = rowData.user.name;
							dispatch(updateDialogs('showRegistros', true, false, rowData));
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