import React, { useCallback, useRef } from 'react';

import { Container, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import MaterialTable from 'material-table';

import useFetch from './../../../hooks/useFetch';

import { tableIcons, tableLocation } from './../../../components/TableConfig';
import LocationShow from './../../../components/LocationShow';
import CreateNotice from './CreateNotice';

import { useDispatch } from 'react-redux';
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
	}
}));

function ShowNoticias() {
	const tableRef = useRef(null);

	const classes = useStyles();
	
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const handleCreate = () => {
		dispatch(updateDialogs('createNotice', true, false));
	}
	
	const onFetch = useCallback(async query => {
		const prepare = {
			url: `v1/noticias/admin?page=${query.page}&per_page=${query.pageSize}&search=${query.search}`,
			type: 'get',
			messageToFinish: false,
		}
		
		const response = await fetchData(prepare);
		
		if (response) {
			const result = {
				data: response.data || [],
				page: response.page || 0,
				totalCount: response.totalLogs || 0,
			}
			return result;
		}else {
			return {
				data: [],
				page: 0,
				totalCount: 0
			}
		}
		// eslint-disable-next-line
	}, [])
	
	return (
		<Container maxWidth='md' className={classes.marginFinish}>
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
				title="Lista de noticias" 
				icons={tableIcons}
				columns={[
					{title: 'Título', field: 'title'},
					{
						title: 'Dueño', field: 'user',
						render: rowData => rowData.user.privilegio + rowData.user.cedula
					},
					{title: 'Fecha de publicación', field: 'created_at'}
				]}
				data={onFetch}
				localization={tableLocation}
				actions={[
					{
						icon: () => <VisibilityIcon />,
						tooltip: 'Ver',
						onClick: (event, rowData) => {
							//
						},
					},
					{
						icon: () => <Edit />,
						tooltip: 'Editar',
						onClick: (event, rowData) => {
							//
						},
					},
					{
						icon: () => <Delete />,
						tooltip: 'Eliminar',
						onClick: (event, rowData) => {
							//
						},
					},
				]}
				options={{
					actionsColumnIndex: -1,
				}}
			/>
			
			<CreateNotice tableRef={tableRef} />
		</Container>
	);
}

export default ShowNoticias;