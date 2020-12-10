import React, { useRef, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { 
	Container,
	Grid,
	Avatar,
	Chip,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import MaterialTable from 'material-table';

import useFetch from '../../../../hooks/useFetch';

// Components
import ShowLocation from '../../../../components/ShowLocation';
import { tableIcons, tableLocation } from '../../../../components/TableConfig';
import DeleteConfirmation from '../../../../components/DeleteConfirmation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../../actions/updateDialogs';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		marginBottom: theme.spacing(6),
		[theme.breakpoints.up('xs')]: {
			marginTop: '48px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8),
		},
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	}
}));

function PageUsuarios() {
	const tableRef = useRef(null);
	
	const { permissions, data } = useSelector(state => ({
		permissions: state.userData.permissions,
		data: state.dialogs.deleteConfirmation.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const history = useHistory();
	
	const { fetchData } = useFetch();
	
	const handleCreate = () => {
		history.push('/panel/usuarios/crear');
	}
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/users?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(
				query.search
			)}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);

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
	}, []);
	
	const handleDelete = async () => {
		const prepare = {
			url: `v1/users/${data.id}`,
			type: 'delete',
			message404: 'Esta noticia ya no existe',
		};

		const response = await fetchData(prepare);

		dispatch(updateDialogs('deleteConfirmation', false, true));

		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
	}
	
	return (
		<main className={classes.containerMain} ref={()=>{
			document.title = 'La Candelaria - Usuarios';
		}}>
			<Container maxWidth='md' className='container--margin'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ShowLocation />
					</Grid>
					<Grid item xs={12}>
						<Button 
							color="primary" 
							variant="contained" 
							onClick={handleCreate}
							disabled={!permissions.administrar.users_create}
						>
							Crear
						</Button>
					</Grid>
					<Grid item xs={12}>
						<MaterialTable
							tableRef={tableRef}
							title="Usuarios" 
							icons={tableIcons}
							localization={tableLocation}
							data={onFetch}
							columns={[
								{
									title: 'Usuario',
									field: 'nombre',
									render: (rowData) => (
										<Grid container alignItems="center" spacing={2}>
											<Grid item xs={12} md={4}>
												<Avatar 
													className={classes.avatar}
													src={rowData.avatar} 
													alt={`Avatar User de ${rowData.nombre}`}
												>
													{rowData.nombre.substring(0, 1).toUpperCase()}
												</Avatar>
											</Grid>
											<Grid item xs>{rowData.nombre}</Grid>
										</Grid>
									),
								},
								{
									title: 'Cédula', 
									field: 'cedula',
									render: (rowData) => rowData.privilegio + rowData.cedula,
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
										//
									},
								},
								{
									icon: () => (<Edit />),
									tooltip: 'Editar',
									onClick: (event, rowData) => {
										history.push(`/panel/usuarios/editar/${rowData.id}`);
									},
								},
								{
									icon: () => (<Delete />),
									tooltip: 'Eliminar',
									onClick: (event, rowData) => {
										const user = {
											id: rowData.id,
											privilegio: rowData.privilegio,
											cedula: rowData.cedula,
										}
										
										dispatch(updateDialogs('deleteConfirmation', true, false, user));
									},
								},
							]}
							options={{
								actionsColumnIndex: -1,
							}}
						/>
					</Grid>
				</Grid>
				<DeleteConfirmation
					action={`Eliminar usuario ${data.privilegio + data.cedula}`} 
					callback={handleDelete} 
					yesBack
				/>
			</Container>
		</main>
	);
}

export default PageUsuarios;