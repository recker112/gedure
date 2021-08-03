import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../components/TableConfig';
import { parseFloatToMoneyString } from '../../../components/funciones/ParseString';

export default function TableTransacciones({ tableRef }) {
	const history = useHistory();
	
	const { fetchData } = useFetch();
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/transaction?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(query.search)}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);

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
				data: response.data || [],
				page: response.page || 0,
				totalCount: response.totalRows || 0,
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
		<div data-tour='transaction_table'>
			<MaterialTable
				tableRef={tableRef}
				title="Transacciones" 
				icons={tableIcons}
				columns={[
					{
						title: 'Id', 
						field: 'id',
					},
					{
						title: 'Usuario', 
						field: 'user',
						render: (rowData) => `${rowData.user.privilegio}${rowData.user.username}`,
					},
					{
						title: 'Tipo', 
						field: 'type',
					},
					{
						title: 'Cantidad', 
						field: 'amount',
						render: (rowData) => parseFloatToMoneyString(rowData.amount || 0)
					},
					{
						title: 'Fecha', 
						field: 'created_at',
					},
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
						icon: () => (<VisibilityIcon data-tour='view_transaction' />),
						tooltip: 'Ver transaccion',
						onClick: (event, rowData) => {
							history.push('/gedure/transacciones/ver/'+rowData.id);
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