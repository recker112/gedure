import React, { useRef, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { 
	Container,
	Grid,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import MaterialTable from 'material-table';

import useFetch from '../../../hooks/useFetch';

// Components
import ShowLocation from '../../../components/ShowLocation';
import { tableIcons, tableLocation } from '../../../components/TableConfig';
import CreateNoticia from './CreateNoticia';

// Redux
import { useDispatch } from 'react-redux';
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

function PageIndex() {
	const tableRef = useRef(null);
	
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const history = useHistory();
	
	const classes = useStyles();
	
	const handleCreate = () => {
		dispatch(updateDialogs('crearNoticia', true, false));
	}
	
	const onFetch = useCallback(
		async (query) => {
			const prepare = {
				url: `v1/table-posts?page=${query.page}&per_page=${query.pageSize}&search=${encodeURI(query.search)}`,
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
		}, []
	);
	
	return (
		<main className={classes.containerMain} ref={()=>{
			document.title = 'La Candelaria - Noticias';
		}}>
			<Container maxWidth='md' className='container--margin'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ShowLocation />
					</Grid>
					<Grid container justify='flex-end' item xs={12}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
							onClick={handleCreate}
						>
							Añadir
						</Button>
					</Grid>
					<Grid item xs={12}>
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
										history.push('/noticias/' + rowData.slug);
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
					</Grid>
				</Grid>
				<CreateNoticia tableRef={tableRef} />
			</Container>
		</main>
	);
}

export default PageIndex;