import React, { useCallback } from 'react';

import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../components/TableConfig';

export default function TableDeudas({ tableRef }) {
	const { fetchData } = useFetch();
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/deuda/lote?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(query.search)}`,
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
		<div data-tour='table'>
			<MaterialTable
				tableRef={tableRef}
				title="Deudas registradas" 
				icons={tableIcons}
				columns={[
					{
						title: 'Id', 
						field: 'id',
						render: (rowData) => `#${rowData.id}`,
					},
					{title: 'Motivo', field: 'reason'},
					{
						title: 'Monto a pagar', 
						field: 'amount_to_pay',
						render: rowData => {
							let moneyText = rowData.amount_to_pay;
							moneyText = moneyText.split('.');
							let decimals = moneyText[1];
							let amount = moneyText[0].split('');
							moneyText = '';
							
							for(let i = 1; amount.length >= i; i++) {
								if (i % 3 === 0) {
									moneyText = `.${amount[amount.length - i]}${moneyText}`;
								}else {
									moneyText = `${amount[amount.length - i]}${moneyText}`;
								}
							}
							moneyText = `Bs/S ${moneyText},${decimals}`;
							
							return moneyText;
						},
					},
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
						icon: () => (<VisibilityIcon data-tour='show_deuda' />),
						tooltip: 'Ver',
						onClick: (event, rowData) => {
							// dispatch(updateDialogs('showRegistros', true, false, rowData));
						},
					},
					{
						icon: () => (<EditIcon data-tour='edit_deuda' />),
						tooltip: 'Editar',
						onClick: (event, rowData) => {
							// dispatch(updateDialogs('showRegistros', true, false, rowData));
						},
					},
					{
						icon: () => (<DeleteIcon data-tour='delete_deuda' />),
						tooltip: 'Borrar',
						onClick: (event, rowData) => {
							// dispatch(updateDialogs('showRegistros', true, false, rowData));
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