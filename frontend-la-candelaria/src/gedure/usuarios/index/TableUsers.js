import React, { useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
	Avatar,
	Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import PersonIcon from '@material-ui/icons/Person';
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

export default function TableUsers({ tableRef, filters, massiveDelete, handleMassive }) {
	const [pageSizeController, setpageSizeController] = useState(5);
	const { loading, permissions } = useSelector((state) => ({
		loading: state.forms.usersIndex.loading,
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const history = useHistory();
	
	const handleChange = value => setpageSizeController(value);
	
	const onFetch = useCallback(async (query) => {
		if (loading) {
			query.page = 0;
		}
		
		const prepare = {
			url: `v1/user?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(
				query.search
			)}&type=${filters.type || ''}&curso=${filters.curso || ''}&seccion=${filters.seccion || ''}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		if (loading) {
			dispatch(updateForms('usersIndex', false));
		}

		if (response) {
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
							if (rowData.privilegio === 'V-' && rowData.n_lista) {
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
					{title: 'Correo', field: 'email'},
					{
						title: 'Estado', 
						field: 'actived_at',
						render: (rowData) => (
							<Chip 
								color={rowData.actived_at ? 'primary':'default'}
								label={rowData.actived_at ? 'Activo':'Inactivo'}
								data-tour='status'
							/>
						),
					},
				]}
				actions={[
					{
						icon: () => (<GroupIcon data-tour="massive" />),
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
						icon: () => (<PersonIcon data-tour="show" />),
						tooltip: 'Ver',
						hidden: massiveDelete,
						onClick: (event, rowData) => {
							history.push(`/gedure/usuarios/ver/${rowData.id}`);
						},
					},
					() => {
						let hidden = true;
						if (filters.type === 'V-' || filters.type === 'V-NA') {
							if (massiveDelete) {
								hidden = false;
							}
						}
						return ({
							icon: () => (<ClassIcon />),
							tooltip: 'Cambiar sección',
							hidden,
							disabled: !permissions.administrar?.users_edit,
							onClick: (event, rowData) => {
								let i = 0;
								let newData = [];
								for(let value of rowData){
									newData[i] = value.id;
									i++;
								}
								dispatch(updateDialogs('updateSeccion', true, false, newData));
							},
						})
					},
					{
						icon: () => (<Delete data-tour="delete" />),
						tooltip: 'Desactivar cuenta',
						disabled: !permissions.administrar?.users_delete,
						onClick: (event, rowData) => {
							if (!massiveDelete) {
								const data = {
									id: rowData.id,
									username: rowData.username,
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
					pageSizeOptions: [5,10,20,30,40],
					pageSize: pageSizeController,
				}}
			/>
		</div>
	);
}