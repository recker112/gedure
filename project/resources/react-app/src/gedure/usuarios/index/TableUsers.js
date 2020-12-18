import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import {
	Avatar,
	Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import PersonIcon from '@material-ui/icons/Person';
import Delete from '@material-ui/icons/Delete';

import useFetch from '../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../components/TableConfig';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		color: 'white',
	}
}));

export default function TableUsers({ tableRef, filters }) {
	const { loading } = useSelector((state) => ({
		loading: state.forms.usersIndex.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const history = useHistory();
	
	const onFetch = useCallback(async (query) => {
		if (loading) {
			query.page = 0;
		}
		
		const prepare = {
			url: `v1/users?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(
				query.search
			)}&type=${filters.type || ''}&curso=${filters.curso || ''}&seccion=${filters.seccion || ''}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		dispatch(updateForms('usersIndex', false));

		if (response) {
			return {
				data: response.data || [],
				page: response.page || 0,
				totalCount: response.totalUsers || 0,
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
		<MaterialTable
			tableRef={tableRef}
			title="Lista de usuarios" 
			icons={tableIcons}
			localization={tableLocation}
			data={onFetch}
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
						if (rowData.privilegio === 'V-') {
							return `${rowData.privilegio}${rowData.username} (N° lista ${rowData.estudiante_data.n_lista})`
						}else {
							return `${rowData.privilegio}${rowData.username}`
						}
					},
				},
				{
					title: 'Nombre', 
					field: 'name',
				},
				{title: 'Correo', field: 'email'},
				{
					title: 'Estado', 
					field: 'registred_at',
					render: (rowData) => (
						<Chip 
							color={rowData.registred_at ? 'primary':'default'}
							label={rowData.registred_at ? 'Activo':'Inactivo'}
						/>
					),
				},
			]}
			actions={[
				{
					icon: () => (<PersonIcon />),
					tooltip: 'Ver',
					onClick: (event, rowData) => {
						history.push(`/panel/usuarios/ver/${rowData.id}`);
					},
				},
				{
					icon: () => (<Delete />),
					tooltip: 'Eliminar',
					onClick: (event, rowData) => {
						/*const user = {
							id: rowData.id,
							privilegio: rowData.privilegio,
							cedula: rowData.cedula,
						}

						dispatch(updateDialogs('deleteConfirmation', true, false, user));*/
					},
				},
			]}
			options={{
				actionsColumnIndex: -1,
			}}
		/>
	);
}