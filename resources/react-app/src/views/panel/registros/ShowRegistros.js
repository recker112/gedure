import React, { useRef, useCallback } from 'react';

import { Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable from 'material-table';

import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import updateForms from './../../../actions/updateForms';

import useFetch from './../../../hooks/useFetch';

import LoadingComponent from './../../../components/LoadingComponent';
import { tableIcons, tableLocation } from './../../../components/TableConfig';
import { RenderRadios } from './../../../components/RendersGlobals';
import LocationShow from './../../../components/LocationShow';

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

function Main() {
	const tableRef = useRef(null);
	
	const { register, handleSubmit, watch } = useForm();
	
	const { inputs, loading } = useSelector(state => ({
		inputs: state.forms.registros.inputs,
		loading: state.forms.registros.loading
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const radioSelect = {
		title: 'Tipo de registros',
		name: 'radioSelect',
		values: [
			{ value: 'all', name: 'Todos' },
			{ value: 'gedure', name: 'Gedure' },
			{ value: 'class', name: 'Clases' },
			{ value: 'session', name: 'Sesión' },
			{ value: 'user', name: 'Cambios de usuario' }
		],
		color: 'primary'
	};
	
	const onSubmit = data => {
		dispatch(updateForms('registros', true, data));
		
		tableRef.current && tableRef.current.onQueryChange();
	}
	
	const onFetch = useCallback(async query => {
		if (loading) {
			query.page = 0;
			dispatch(updateForms('registros', false));
		}
		
		const prepare = {
			url: `v1/logs?page=${query.page}&per_page=${query.pageSize}&type=${inputs.radioSelect}&search=${query.search}`,
			type: 'get',
			messageToFinish: false,
		}
		
		const res = await fetchData(prepare);
		
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
	}, []);
	
	return (
		<Container maxWidth='md' className={classes.marginFinish}>
			<Grid container className={classes.margin} spacing={2}>
				<Grid item xs={12}>
					<LocationShow />
				</Grid>
				<Grid item xs={12}>
					<Typography className='box__title'>
						Filtrador
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container>
							<Grid item xs={12}>
								<RenderRadios 
									registerInput={register({ required: true })} 
									data={radioSelect}
									defaultValue={inputs.radioSelect}
								/>
								<Grid container justify='flex-end' item xs={12}>
									<LoadingComponent loading={loading}>
										<Button 
											type='submit' 
											variant='outlined'
											disabled={inputs.radioSelect === watch('radioSelect') ? true : false}
										>
											Cambiar
										</Button>
									</LoadingComponent>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
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
		</Container>
	);
}

export default Main;