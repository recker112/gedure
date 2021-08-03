import React, { useCallback } from 'react';

import {
	Chip
} from '@material-ui/core';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../../components/TableConfig';
import { parseFloatToMoneyString } from '../../../../components/funciones/ParseString';
import { BankListSearch } from '../../../../components/funciones/BankList';

// Redux
import { useDispatch } from 'react-redux';
import updateDialogs from '../../../../actions/updateDialogs';

export default function TablePP({ tableRef }) {
	const { fetchData } = useFetch();
	
	const dispatch = useDispatch();
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/pending-payment?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(query.search)}`,
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
		<div data-tour='wallet_table'>
			<MaterialTable
				tableRef={tableRef}
				title="Pagos pendientes a verificar" 
				icons={tableIcons}
				columns={[
					{
						title: 'Referencia', 
						field: 'reference',
					},
					{
						title: 'Cantidad', 
						field: 'amount',
						render: (rowData) => parseFloatToMoneyString(rowData.amount || 0)
					},
					{
						title: 'Fecha', 
						field: 'date',
					},
					{
						title: 'Banco', 
						field: 'code',
						render: (rowData) => BankListSearch[rowData.code],
					},
					{
						title: 'Estado',
						field: 'status',
						render: (rowData) => {
							let style = {
								color: 'white !important'
							};
							if (rowData.status === 'no encontrado') {
								style.background = '#212020';
							}else if (rowData.status === 'verificado') {
								style.background = '#4caf50';
							}
							
							return (
								<Chip
									style={style}
									label={rowData.status.charAt(0).toUpperCase()+rowData.status.slice(1)}
								/>
							)
						}
					}
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
						icon: () => (<DeleteIcon data-tour='delete_pending' />),
						tooltip: 'Eliminar',
						onClick: (event, rowData) => {
							const data = {
								id: rowData.id,
								reference: rowData.reference,
								status: rowData.status,
							}

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