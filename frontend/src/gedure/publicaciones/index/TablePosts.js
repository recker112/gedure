import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import useFetch from '../../../hooks/useFetch';

// Components
import { tableIcons, tableLocation } from '../../../components/TableConfig';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function TablePosts({ tableRef }) {
	const { permissions } = useSelector((state) => ({
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const history = useHistory();
	
	const { fetchData } = useFetch();
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/table-posts?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(query.search)}`,
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
				title="Lista de noticias"
				icons={tableIcons}
				columns={[
					{ title: 'Título', field: 'title' },
					{
						title: 'Dueño',
						field: 'user',
						render: (rowData) => rowData.user?.privilegio + rowData.user?.username || 'Ninguno',
					},
					{ title: 'Fecha de publicación', field: 'created_at' },
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
						icon: () => (<VisibilityIcon data-tour="show__noticia" />),
						tooltip: 'Ver',
						onClick: (event, rowData) => {
							history.push('/noticias/' + rowData.slug);
						},
					},
					{
						icon: () => (<Edit data-tour="edit__noticia" />),
						tooltip: 'Editar',
						onClick: (event, rowData) => {
							history.push('/gedure/publicaciones/editar/' + rowData.slug);
						},
						disabled: !permissions.administrar.posts_edit
					},
					{
						icon: () => (<Delete data-tour="delete__noticia" />),
						tooltip: 'Eliminar',
						onClick: (event, rowData) => {
							const data = {
								slug: rowData.slug,
								title: rowData.title,
							}

							dispatch(updateDialogs('deleteConfirmation', true, false, data));
						},
						disabled: !permissions.administrar.posts_destroy
					},
				]}
				options={{
					sorting: false,
					draggable: false,
					actionsColumnIndex: -1,
				}}
			/>
		</div>
	)
}