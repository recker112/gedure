import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../components/TableConfig';
import { parseFloatToMoneyString } from '../../../components/funciones/ParseString';

// Redux
import { useDispatch } from 'react-redux';
import updateWallet from '../../../actions/updateWallet';

export default function TableDeudas({ tableRef }) {
	const dispatch = useDispatch();
	
	const history = useHistory();
	
	const { fetchData } = useFetch();
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/transaction-user?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(query.search)}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);

		if (response) {
			// NOTA(RECKER): Actualizar balance
			dispatch(updateWallet(response.balance));
			
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
		<div data-tour='wallet_table'>
			<MaterialTable
				tableRef={tableRef}
				title="Transacciones realizadas" 
				icons={tableIcons}
				columns={[
					{
						title: 'Id', 
						field: 'id',
					},
					{
						title: 'Tipo', 
						field: 'type',
						render: (rowData) => rowData.type.charAt(0).toUpperCase()+rowData.type.slice(1),
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
						icon: () => (<VisibilityIcon />),
						tooltip: 'Ver transaccion',
						onClick: (event, rowData) => {
							history.push('/gedure/monedero/transacciones/ver/'+rowData.id);
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