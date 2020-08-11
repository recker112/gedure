import React from 'react';

import { Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable from 'material-table';

import { useForm } from 'react-hook-form';
import updateForms from './../../../actions/updateForms';

import { useSelector, useDispatch } from 'react-redux';

import LoadingComponent from './../../../components/LoadingComponent';
import { tableIcons, tableLocation } from './../../../components/TableConfig';
import { RenderRadios } from './../../../components/RendersGlobals';

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	padding: {
		padding: theme.spacing(2),
	},
}));

function Main() {
	const { register, handleSubmit } = useForm();
	
	const { inputs, loading } = useSelector(state => ({
		inputs: state.forms.registros.inputs,
		loading: state.forms.registros.loading
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const radioSelect = {
		title: 'Tipo de registros',
		name: 'radioSelect',
		values: [
			{ value: 'all', name: 'Todos' },
			{ value: 'gedure', name: 'Gedure' },
			{ value: 'class', name: 'Clases' },
			{ value: 'session', name: 'Sesión' },
			{ value: 'password', name: 'Cambio de contraseña' }
		],
		color: 'primary'
	};
	
	const onSubmit = data => {
		dispatch(updateForms('registros', true, data));
		console.log(data);
	}
	
	return (
		<Container maxWidth='md'>
			<Grid container className={classes.margin}>
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
										>
											Buscar
										</Button>
									</LoadingComponent>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
			<MaterialTable
				title="Registros del sistema" 
				icons={tableIcons}
				columns={[
					{title: 'Cédula', field: 'cedula'},
					{title: 'Usuario', field: 'name'},
					{title: 'Acción', field: 'action'},
					{title: 'Fecha', field: 'fecha'}
				]}
				data={[]}
				localization={tableLocation}
			/>
		</Container>
	);
}

export default Main;