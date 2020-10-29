import React, { useCallback, useRef } from 'react';

import { Container, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import MaterialTable from 'material-table';

import { useHistory } from 'react-router-dom';

import useFetch from './../../../hooks/useFetch';

import { tableIcons, tableLocation } from './../../../components/TableConfig';
import LocationShow from './../../../components/LocationShow';
import CreateNotice from './CreateNotice';
import EditNotice from './EditNotice';
import ConfirmAction from './../../../components/ConfirmAction';

import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from './../../../actions/updateDialogs';

const useStyles = makeStyles((theme) => ({
	breadCrumbs: {
		marginBottom: theme.spacing(2),
	},
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(3),
	},
	padding: {
		padding: theme.spacing(2),
	},
	marginFinish: {
		marginBottom: theme.spacing(3),
	},
}));

function ShowNoticias() {
	const tableRef = useRef(null);

	const classes = useStyles();

	let history = useHistory();

	const { data, loading } = useSelector((state) => ({
		data: state.dialogs.confirmAction.data,
		loading: state.dialogs.confirmAction.loading,
	}));
	const dispatch = useDispatch();

	const { fetchData } = useFetch();

	const handleCreate = () => {
		dispatch(updateDialogs('createNotice', true, false));
	};

	const confirm = async () => {
		const prepare = {
			url: `v1/noticias/${data.id}`,
			type: 'delete',
		};

		const response = await fetchData(prepare);

		dispatch(updateDialogs('confirmAction', false, true));

		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
	};

	const onFetch = useCallback(
		async (query) => {
			if (loading) {
				query.page = 0;
				dispatch(updateDialogs('confirmAction', false, false));
			}

			const prepare = {
				url: `v1/noticias/admin?page=${query.page}&per_page=${query.pageSize}&search=${query.search}`,
				type: 'get',
				messageToFinish: false,
			};

			const response = await fetchData(prepare);

			if (response) {
				const result = {
					data: response.data || [],
					page: response.page || 0,
					totalCount: response.totalLogs || 0,
				};
				return result;
			} else {
				return {
					data: [],
					page: 0,
					totalCount: 0,
				};
			}
			// eslint-disable-next-line
		}, [loading]
	);

	return (
		<Container maxWidth="md" className={classes.marginFinish}>
			<Grid container className={classes.margin} spacing={2}>
				<Grid item xs={12}>
					<LocationShow />
				</Grid>
				<Grid container justify="flex-end" item xs={12}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleCreate}
						startIcon={<AddIcon />}
					>
						Añadir
					</Button>
				</Grid>
			</Grid>
			<MaterialTable
				tableRef={tableRef}
				title="Lista de noticias"
				icons={tableIcons}
				columns={[
					{ title: 'Título', field: 'title' },
					{
						title: 'Dueño',
						field: 'user',
						render: (rowData) => rowData.user?.privilegio + rowData.user?.cedula || 'Ninguno',
					},
					{ title: 'Fecha de publicación', field: 'created_at' },
				]}
				data={onFetch}
				localization={tableLocation}
				actions={[
					{
						icon: () => <VisibilityIcon />,
						tooltip: 'Ver',
						onClick: (event, rowData) => {
							history.push('/noticias/' + rowData.id);
						},
					},
					{
						icon: () => <Edit />,
						tooltip: 'Editar',
						onClick: (event, rowData) => {
							dispatch(updateDialogs('editNotice', true, false, rowData));
						},
					},
					{
						icon: () => <Delete />,
						tooltip: 'Eliminar',
						onClick: (event, rowData) => {
							dispatch(updateDialogs('confirmAction', true, false, { id: rowData.id }));
						},
					},
				]}
				options={{
					actionsColumnIndex: -1,
				}}
			/>

			<CreateNotice tableRef={tableRef} />
			<EditNotice tableRef={tableRef} />
			<ConfirmAction action={`Eliminar noticia #${data.id}`} callback={confirm} />
		</Container>
	);
}

export default ShowNoticias;