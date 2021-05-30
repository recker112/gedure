import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../components/TableConfig';
import { parseFloatToMoneyString } from '../../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function TableDeudas({ tableRef }) {
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const history = useHistory();
	
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
				title="Lotes de deudas registradas" 
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
						render: rowData => parseFloatToMoneyString(rowData.amount_to_pay),
					},
					{title: 'Fecha de creaciรณn', field: 'created_at'}
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
							history.push(`/gedure/lotes-deudas/ver/${rowData.id}`);
						},
					},
					{
						icon: () => (<EditIcon data-tour='edit_deuda' />),
						tooltip: 'Editar',
						disabled: !permissions.administrar_transac?.debt_lote_edit,
						onClick: (event, rowData) => {
							const { id, reason, amount_to_pay } = rowData;
							dispatch(updateDialogs('editLoteDeuda', true, false, {
								id, 
								reason, 
								amount_to_pay: parseFloat(amount_to_pay)
							}));
						},
					},
					{
						icon: () => (<DeleteIcon data-tour='delete_deuda' />),
						tooltip: 'Borrar',
						disabled: !permissions.administrar_transac?.debt_lote_delete,
						onClick: (event, rowData) => {
							const { id, reason } = rowData;
							dispatch(updateDialogs('deleteConfirmation', true, false, {
								id, 
								reason,
							}));
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