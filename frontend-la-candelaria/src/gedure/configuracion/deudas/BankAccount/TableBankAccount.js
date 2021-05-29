import React, { useCallback, useState } from 'react';

import { 
	Grid,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import GroupIcon from '@material-ui/icons/Group';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../../components/TableConfig';
import { BankListSearch } from '../../../../components/funciones/BankList';
import { parseToAccountString } from '../../../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../../actions/updateDialogs';

export default function TableBankAccount({ tableRef }) {
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
			url: `v1/bank-account?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(
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
				title="Cuentas bancarias" 
				icons={tableIcons}
				localization={tableLocation}
				data={onFetch}
				onChangeRowsPerPage={handleChange}
				columns={[
					{
						title: 'N° cuenta',
						field: 'n_account',
						render: rowData => parseToAccountString(rowData.n_account)
					},
					{
						title: 'Nombre',
						field: 'name',
					},
					{
						title: 'Correo', 
						field: 'email'
					},
					{
						title: 'Tipo', 
						field: 'type'
					},
					{
						title: 'Banco', 
						field: 'code',
						render: (rowData) => BankListSearch[rowData.code] || 'No especificado',
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
						icon: () => (<EditIcon />),
						tooltip: 'Editar',
						hidden: massiveDelete,
						disabled: !permissions?.gedure?.bank_account_edit,
						onClick: (event, rowData) => {
							dispatch(updateDialogs('editBankAccount', true, false, rowData));
						}
					},
					{
						icon: () => (<Delete />),
						tooltip: 'Eliminar curso',
						disabled: !permissions?.gedure?.bank_account_destroy,
						onClick: (event, rowData) => {
							if (!massiveDelete) {
								const data = {
									id: rowData.id,
									n_account: rowData.n_account,
								}
								dispatch(updateDialogs('deleteConfirmation', true, false, data));
							}else {
								let i = 0;
								let newData = [];
								for(let value of rowData){
									newData[i] = value.id;
									i++;
								}
								dispatch(updateDialogs('deleteConfirmation', true, false, {
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