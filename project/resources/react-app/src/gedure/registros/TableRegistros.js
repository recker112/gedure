import React, { useCallback } from 'react';

import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
		
		const res = await fetchData(prepare);
		
		dispatch(updateForms('registros', false));
		
		if (res) {
			const result = {
				data: res.data,
				page: res.page,
				totalCount: res.totalLogs,
			}
			return result;
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
		<MaterialTable
			tableRef={tableRef}
			title="Registros del sistema" 
			icons={tableIcons}
			columns={[
				{title: 'Usuario', field: 'username'},
				{title: 'Nombre', field: 'name'},
				{title: 'Acción', field: 'action'},
				{title: 'Fecha', field: 'created_at'}
			]}
			data={onFetch}
			localization={tableLocation}
			actions={[
				{
					icon: () => (<VisibilityIcon />),
					tooltip: 'Ver',
					onClick: (event, rowData) => {
						rowData.date = format(new Date(rowData.date_format), 'dd/mm/yy');
						rowData.hours = format(new Date(rowData.date_format), 'hh:mm a');
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
	);
}