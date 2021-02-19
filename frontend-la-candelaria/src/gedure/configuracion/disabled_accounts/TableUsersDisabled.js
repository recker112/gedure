import React, { useCallback, useState } from 'react';

import { 
	Grid,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import GroupIcon from '@material-ui/icons/Group';
import RestoreIcon from '@material-ui/icons/Restore';
import Delete from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../components/TableConfig';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function TableUsersDisabled({ tableRef }) {
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
			url: `v1/user-disabled?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(
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
				totalCount: response.totalUsers,
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
				title="Usuarios desactivados" 
				icons={tableIcons}
				localization={tableLocation}
				data={onFetch}
				onChangeRowsPerPage={handleChange}
				columns={[
					{
						title: 'Usuario',
						field: 'code',
						render: (rowData) => `${rowData.privilegio}${rowData.username}`
					},
					{
						title: 'Nombre',
						field: 'name',
					},
					{
						title: 'Correo', 
						field: 'email'
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
						icon: () => (<RestoreIcon />),
						tooltip: 'Reactivar cuenta',
						disabled: !permissions?.gedure?.users_disabled_restore,
						onClick: (event, rowData) => {
							if (!massiveDelete) {
								const data = {
									id: rowData.id,
									username: rowData.username,
									type: 'restore'
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
									massive: true,
									ids: newData,
									type: 'restore'
								}));
							}
						},
					},
					{
						icon: () => (<Delete />),
						tooltip: 'Eliminar cuenta',
						disabled: !permissions?.gedure?.users_disabled_destroy,
						onClick: (event, rowData) => {
							if (!massiveDelete) {
								const data = {
									id: rowData.id,
									username: rowData.username,
									type: 'destroy'
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
									massive: true,
									ids: newData,
									type: 'destroy'
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