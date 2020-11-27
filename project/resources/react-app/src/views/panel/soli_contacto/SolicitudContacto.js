import React, { useRef, useCallback } from 'react';

import { 
	Container,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Delete from '@material-ui/icons/Delete';

import MaterialTable from 'material-table';

import useFetch from '../../../hooks/useFetch';

// Components
import ShowLocation from '../../../components/ShowLocation';
import { tableIcons, tableLocation } from '../../../components/TableConfig';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import ShowSolicitudContacto from './ShowSolicitudContacto';
import TourSoliContacto from './TourSoliContacto';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

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
}));

function SolicitudContacto() {
	const tableRef = useRef(null);

	const { data, permissions } = useSelector((state) => ({
		data: state.dialogs.deleteConfirmation.data,
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const handleDelete = async () => {
		const prepare = {
			url: `v1/contacto/${data.id}`,
			type: 'delete',
			message404: 'Esta noticia ya no existe',
		};

		const response = await fetchData(prepare);

		dispatch(updateDialogs('deleteConfirmation', false, true));

		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
	};
	
	const onFetch = useCallback(async (query) => {
		const prepare = {
			url: `v1/contacto?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(
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
				totalCount: response.totalPosts || 0,
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
		<main className={classes.containerMain} ref={()=>{
			document.title = 'La Candelaria - Solicitudes de contacto';
		}}>
			<Container maxWidth='md' className='container--margin'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ShowLocation />
					</Grid>
					<Grid data-tour="table__soliContacto" item xs={12}>
						<MaterialTable 
							tableRef={tableRef}
							title="Lista de solicitudes"
							icons={tableIcons}
							data={onFetch}
							localization={tableLocation}
							columns={[
								{ title: 'Asunto', field: 'asunto' },
								{ title: 'Nombre', field: 'nombre' },
								{ title: 'Correo', field: 'email'},
								{ title: 'Fecha de creación', field: 'created_at' },
							]}
							actions={[
								{
									icon: () => (<VisibilityIcon data-tour="show__soliContacto" />),
									tooltip: 'Ver',
									onClick: (event, rowData) => {
										dispatch(updateDialogs('showSoliContacto', true, false, rowData));
									},
								},
								{
									icon: () => (<Delete data-tour="delete__soliContacto" />),
									tooltip: 'Eliminar',
									onClick: (event, rowData) => {
										const data = {
											id: rowData.id,
										};
										
										dispatch(updateDialogs('deleteConfirmation', true, false, data));
									},
									disabled: permissions.administrar.soliContact_destroy,
								},
							]}
							options={{
								actionsColumnIndex: -1,
							}}
						/>
					</Grid>
				</Grid>
				<ShowSolicitudContacto />
				<DeleteConfirmation 
					action={`Eliminar solicitud de contacto #${data.id}`} 
					callback={handleDelete}
				/>
				<TourSoliContacto />
			</Container>
		</main>
	);
}

export default SolicitudContacto;