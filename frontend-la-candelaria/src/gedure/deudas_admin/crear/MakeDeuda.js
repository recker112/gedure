import React from 'react';

import {
	Paper,
	Grid,
	Typography,
	TextField,
	Button,
	MenuItem,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

import { Controller } from 'react-hook-form';

import useFetch from '../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../components/LoadingComponent';
import { CursosList, SeccionList } from '../../../components/funciones/CursosList';
import { NumberFormatInput, RenderSelectFormHook, AsyncInputFormHook } from '../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

export default function MakeDeuda() {
	const { loading } = useSelector((state) => ({
		loading: state.forms.crearDeuda.loading,
	}));
	
	const { fetchData } = useFetch();
	
	const { register, errors, control, watch, setValue } = useFormContext();
	
	const asyncRequestUsers = async search => {
		const prepare = {
			url: `v1/find/user?search=${encodeURI(search)}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		return response || [];
	}
	
	return (
		<Paper className='paper--padding' elevation={0}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' align='center'>Crear deuda</Typography>
				</Grid>
				<Grid container item xs={12}>
					<TextField 
						inputRef={register({
							required: { value: true, message: '* Campo requerido' },
							minLength: { value: 6, message: 'Error: Demaciado corto' },
							maxLength: { value: 100, message: 'Error: Demaciado largo' },
						})}
						disabled={loading}
						name='motivo'
						error={Boolean(errors.reason)}
						helperText={errors?.reason?.message ? errors.reason.message : 'Ingrese el motivo de la deuda'}
						style={{maxWidth: 450}} 
						label='Motivo'
						size='small' 
						defaultValue={''}
						fullWidth
					/>
				</Grid>
				<Grid container item xs={12}>
					<NumberFormatInput
						disabled={loading}
						error={Boolean(errors.amount_to_pay)}
						helperText={errors?.amount_to_pay?.message ? errors.amount_to_pay.message : 'Ingrese el monto a pagar de la deuda'}
						style={{maxWidth: 450}} 
						label='Monto a pagar'
						mask='money'
						size='small'
						fullWidth
						name='cantidad_pagar'
						control={control}
						defaultValue={''}
						rules={{
							required: { value: true, message: '* Campo requerido' },
							min: { value: 1, message: 'Error: El monto debe ser mayor a 0' }
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<RenderSelectFormHook
						id='select-type-deudas'
						name='type'
						nameLabel='Deuda para:'
						control={control}
						error={Boolean(errors.type)}
						helperText={errors?.type?.message ? errors.type.message : 'Seleccione a los usuarios que recibirán esta deuda'}
						defaultValue='selected'
						style={{maxWidth: 450}} 
					>
						<MenuItem value='selected'>Usuarios seleccionados</MenuItem>
						<MenuItem value='studiends'>Estudiantes</MenuItem>
					</RenderSelectFormHook>
				</Grid>
				{watch('type') === 'selected' && (
					<Grid item xs={12}>
						<AsyncInputFormHook
							label='Seleccionar usuarios'
							name='selected_users'
							asyncRequest={asyncRequestUsers}
							getOptionLabel={(option) => option.username}
							renderOption={option => (`${option.privilegio}${option.username}`)}
							error={Boolean(errors.selected_users)}
							helperText={errors?.selected_users?.message ? errors.selected_users.message : 'Busque a los usuarios que desea seleccionar'}
							control={control}
							rules={{
								required: { value: true, message: '* Campo requerido' },
								validate: value => value.length > 0 || 'Error: Debe de seleccionar al menos a 1 usuario',
							}}
						/>
					</Grid>
				)}
				{watch('type') === 'studiends' && (
					<Grid container spacing={2} item xs={12}>
						<Grid item xs={12} sm={6}>
							<RenderSelectFormHook
								id='select-curso-deudas'
								name='curso'
								nameLabel='Curso'
								control={control}
								error={Boolean(errors.curso)}
								helperText={errors?.curso?.message ? errors.curso.message : 'Seleccione un curso'}
								defaultValue='all'
							>
								<MenuItem value='all'>Todos</MenuItem>
								{CursosList.map((data, i) => (
									<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
								))}
							</RenderSelectFormHook>
						</Grid>
						<Grid item xs={12} sm={6}>
							<RenderSelectFormHook
								id='select-seccion-deudas'
								name='seccion'
								nameLabel='Sección'
								control={control}
								error={Boolean(errors.seccion)}
								helperText={errors?.seccion?.message ? errors.seccion.message : 'Seleccione una sección'}
								defaultValue='all'
							>
								<MenuItem value='all'>Todas</MenuItem>
								{SeccionList.map((data, i) => (
									<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
								))}
							</RenderSelectFormHook>
						</Grid>
					</Grid>
				)}
				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent loading={loading} color="inherit">
						<Button type='submit' color='primary' variant='contained' disableElevation>
							Crear
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</Paper>
	)
}