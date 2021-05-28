import React, { useCallback, useState } from 'react';

import { 
	Grid,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Delete from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../components/TableConfig';
import { BankListSearch } from '../../../components/funciones/BankList';
import { parseFloatToMoneyString } from '../../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function TableBankTransaction({ tableRef }) {
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	const [massiveDelete, setMassiveDelete] = useState(false);
	const [pageSizeController, setpageSizeController] = useState(5);
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const handleMassive = () => setMassiveDelete(value => (!value));
	
	const handleChange = value => setpageSizeController(value);
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/bank-transaction?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(
				query.search
			)}`,
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
				data: response.data,
				page: response.page,
				totalCount: response.totalRows,
			};
		} else {
			return {
				data: [],
				page: 0,
				totalCount: 0,
			};
		}
		// eslint-disable-next-line
	},[]);
	
	return (
		<Grid item xs={12}>
			<MaterialTable
				tableRef={tableRef}
				title="Transacciones bancarias" 
				icons={tableIcons}
				localization={tableLocation}
				data={onFetch}
				onChangeRowsPerPage={handleChange}
				columns={[
					{
						title: 'Id',
						field: 'id'
					},
					{
						title: 'Referencia',
						field: 'reference',
					},
					{
						title: 'Concepto', 
						field: 'concepto'
					},
					{
						title: 'Fecha de transferencia', 
						field: 'date'
					},
					{
						title: 'Monto', 
						field: 'amount',
						render: (rowData) => parseFloatToMoneyString(rowData.amount),
					},
					{
						title: 'Banco', 
						field: 'code',
						render: (rowData) => BankListSearch[rowData.code] || 'No especificado',
					},
					{
						title: 'Reclamado por', 
						field: 'taked_by',
						render: (rowData) => rowData.user?.privilegio+rowData.user?.username || 'No reclamado',
					},
				]}
				actions={[
					{
						icon: () => (<GroupIcon />),
						tooltip: 'Opciones masivas',
						isFreeAction: true,
						onClick: handleMassive,
					},
					{
						icon: () => (<RefreshIcon />),
						tooltip: 'Recargar',
						isFreeAction: true,
						onClick: (event, rowData) => {
							tableRef.current && tableRef.current.onQueryChange();
						},
					},
					{
						icon: () => (<AssignmentIcon />),
						tooltip: 'Asignar',
						hidden: massiveDelete,
						disabled: !permissions?.gedure?.bank_transaction_assign,
						onClick: (event, rowData) => {
							dispatch(updateDialogs('assignBankTransaction', true, false, rowData));
						}
					},
					{
						icon: () => (<Delete />),
						tooltip: 'Eliminar',
						disabled: !permissions?.gedure?.bank_transaction_delete,
						onClick: (event, rowData) => {
							if (!massiveDelete) {
								const data = {
									id: rowData.id,
								}
								dispatch(updateDialogs('deleteBankTransaction', true, false, data));
							}else {
								let i = 0;
								let newData = [];
								for(let value of rowData){
									newData[i] = value.id;
									i++;
								}
								dispatch(updateDialogs('deleteBankTransaction', true, false, {
									deleteMassive: true,
									ids: newData
								}));
							}
						},
					},
				]}
				options={{
					sorting: false,
					draggable: false,
					actionsColumnIndex: -1,
					selection: massiveDelete,
					pageSize: pageSizeController,
				}}
			/>
		</Grid>
	);
}