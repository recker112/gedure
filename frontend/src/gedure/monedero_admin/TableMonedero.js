import React, { useCallback } from 'react';

import MaterialTable from 'material-table';
import {
	CurrencyUsd as CurrencyUsdIcon,
} from 'mdi-material-ui';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../components/TableConfig';
import { parseFloatToMoneyString } from '../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../actions/updateDialogs';

export default function TableDeudas({ tableRef }) {
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/wallet?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(query.search)}`,
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
				title="Monederos" 
				icons={tableIcons}
				columns={[
					{
						title: 'Usuario', 
						field: 'user',
						render: (rowData) => `${rowData.privilegio}${rowData.username}`,
					},
					{
						title: 'Saldo disponible', 
						field: 'wallet',
						render: (rowData) => parseFloatToMoneyString(rowData.wallet?.balance || 0)
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
						icon: () => (<CurrencyUsdIcon data-tour='edit_wallet' />),
						tooltip: 'Administrar',
						disabled: !permissions.administrar_transac?.wallet_edit,
						onClick: (event, rowData) => {
							const { username, privilegio, wallet: { id, balance } } = rowData;
							dispatch(updateDialogs('editWallet', true, false, {
								id,
								username,
								privilegio,
								balance,
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