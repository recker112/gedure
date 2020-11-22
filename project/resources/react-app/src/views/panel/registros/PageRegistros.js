import React, { useRef, useCallback } from 'react';

import { 
	Container,
	Grid,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable from 'material-table';

import { useForm } from 'react-hook-form';

import useFetch from '../../../hooks/useFetch';

// Components
import ShowLocation from '../../../components/ShowLocation';
import { tableIcons, tableLocation } from '../../../components/TableConfig';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';

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

function FormSelectType({ tableRef }) {
	const { loading } = useSelector((state) => ({
		loading: state.forms.registros.loading,
	}));
	
	console.log(loading);
	
	const { register, handleSubmit } = useForm();
	
	const dispatch = useDispatch();
	
	const onSubmit = (data) => {
		dispatch(updateForms('registros', true, data));
		tableRef.current && tableRef.current.onQueryChange();
	}
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<FormControl disabled={loading}  component="fieldset">
						<FormLabel component="legend">
							Tipo de registros
						</FormLabel>
						<RadioGroup 
							aria-label="type" 
							defaultValue='all' 
							name="type" 
							row
						>
							<FormControlLabel 
								value="all" 
								control={
									<Radio inputRef={register} />
								} 
								label='Todos' 
							/>
							<FormControlLabel 
								value="gedure" 
								control={
									<Radio inputRef={register} />
								} 
								label='Gedure' 
							/>
							<FormControlLabel 
								value="class" 
								control={
									<Radio inputRef={register} />
								} 
								label='Clases' 
							/>
							<FormControlLabel 
								value="session" 
								control={
									<Radio inputRef={register} />
								} 
								label='Sesión' 
							/>
							<FormControlLabel 
								value="user" 
								control={
									<Radio inputRef={register} />
								} 
								label='Usuario' 
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				
				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent loading={loading}>
						<Button 
							type='submit'
							variant='contained' 
							color='primary'
						>
							Cambiar
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</form>
	);
}

function PageRegistros() {
	const tableRef = useRef(null);
	
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.registros.loading,
		data: state.forms.registros.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const { fetchData } = useFetch();
	
	const onFetch = useCallback(async query => {
		if (loading) {
			query.page = 0;
		}
		
		const prepare = {
			url: `v1/logs?page=${query.page}&per_page=${query.pageSize}&type=${encodeURI(data.type)}&search=${encodeURI(query.search)}`,
			type: 'get',
			messageToFinish: false,
		}
		
		const res = await fetchData(prepare);
		
		dispatch(updateForms('registros', false));
		
		if (res) {
			const result = {
				data: res.data,
				page: res.page,
				totalCount: res.totalLogs
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
	}, [data, loading]);
	
	return (
		<main className={classes.containerMain} ref={()=>{
			document.title = 'La Candelaria - Registros';
		}}>
			<Container maxWidth='md' className='container--margin'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ShowLocation />
					</Grid>
					<Grid item xs={12}>
						<FormSelectType tableRef={tableRef} />
					</Grid>
					<Grid item xs={12}>
						<MaterialTable
							tableRef={tableRef}
							title="Registros del sistema" 
							icons={tableIcons}
							columns={[
								{title: 'Cédula', field: 'cedula'},
								{title: 'Usuario', field: 'name'},
								{title: 'Acción', field: 'action'},
								{title: 'Fecha', field: 'fecha'}
							]}
							data={onFetch}
							localization={tableLocation}
						/>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}

export default PageRegistros;