import React, { useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
	Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Delete from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import ClassIcon from '@material-ui/icons/Class';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../components/TableConfig';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import updateDialogs from '../../../actions/updateDialogs';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		color: 'white',
	}
}));

export default function TableBoletas({ tableRef, filters, massiveDelete, handleMassive }) {
	const [pageSizeController, setpageSizeController] = useState(5);
	const { loading, permissions } = useSelector((state) => ({
		loading: state.forms.boletasIndex.loading,
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const { fetchData } = useFetch();
	
	const history = useHistory();
	
	const handleChange = value => setpageSizeController(value);
	
	const onFetch = useCallback(async (query) => {
		if (loading) {
			query.page = 0;
		}
		
		const prepare = {
			url: `v1/boleta?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(
				query.search
			)}&curso=${filters.curso || ''}&seccion=${filters.seccion || ''}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		if (loading) {
			dispatch(updateForms('boletasIndex', false));
		}

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
	}, [loading]);
	
	return (
		<div data-tour='table'>
			<MaterialTable
				tableRef={tableRef}
				title="Lista de usuarios" 
				icons={tableIcons}
				localization={tableLocation}
				data={onFetch}
				onChangeRowsPerPage={pageSize => handleChange(pageSize)}
				columns={[
					{
						title: 'Avatar',
						field: 'avatar',
						render: (rowData) => (
							<Avatar 
								className={classes.avatar}
								src={rowData.avatar} 
								alt={`Avatar User de ${rowData.name}`}
							>
								{rowData.name.substring(0, 1).toUpperCase()}
							</Avatar>
						),
					},
					{
						title: 'Usuario',
						field: 'username',
						render: (rowData) => {
							if (filters.curso && filters.seccion) {
								return (
									<React.Fragment>
										<div>{rowData.privilegio+rowData.username}</div>
										<div>N° lista {rowData.n_lista}</div>
									</React.Fragment>
								)
							}else {
								return `${rowData.privilegio}${rowData.username}`
							}
						},
					},
					{title: 'Nombre', field: 'name'},
					{title: 'Boletas cargadas', field: 'boletas_count'},
				]}
				actions={[
					{
						icon: () => (<GroupIcon data-tour='massive' />),
						tooltip: 'Opciones masivas',
						isFreeAction: true,
						onClick: (event, rowData) => {
							handleMassive();
						},
					},
					{
						icon: () => (<RefreshIcon data-tour="refresh" />),
						tooltip: 'Recargar',
						isFreeAction: true,
						onClick: (event, rowData) => {
							tableRef.current && tableRef.current.onQueryChange();
						},
					},
					{
						icon: () => (<ClassIcon />),
						tooltip: 'Ver boletas',
						hidden: massiveDelete,
						onClick: (event, rowData) => {
							history.push(`/gedure/boletas/ver/${rowData.id}`);
						},
					},
					{
						icon: () => (<Delete />),
						tooltip: 'Eliminar boletas',
						hidden: !massiveDelete,
						disabled: !permissions?.administrar?.boletas_destroy,
						onClick: (event, rowData) => {
							let i = 0;
							let newData = [];
							for(let value of rowData){
								newData[i] = value.id;
								i++;
							}
							dispatch(updateDialogs('deleteConfirmation', true, false, newData));
						},
					},
				]}
				options={{
					sorting: false,
					draggable: false,
					actionsColumnIndex: -1,
					selection: massiveDelete,
					pageSizeOptions: [5,10,20,30,40],
					pageSize: pageSizeController,
				}}
			/>
		</div>
	);
}