import React from 'react';

import {
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button,
	TextField,
	MenuItem,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Component
import AnimationDialog from '../../../components/AnimationDialog';
import { RenderSwitchFormHook, NumberFormatInput, RenderSelectFormHook, AsyncInputFormHook } from '../../../components/RendersGlobals';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function CrearLoteDeuda({ tableRef }) {
	const { open, loading } = useSelector((state) => ({
		open: state.dialogs.crearLoteDeuda.open,
		loading: state.dialogs.crearLoteDeuda.loading,
	}));
	const dispatch = useDispatch();
	
	const { register, errors, control, watch, handleSubmit, setError } = useForm({
		mode: 'onTouched',
	});
	
	const { fetchData } = useFetch(setError);
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('crearLoteDeuda', false, false));
		}
	}
	
	const asyncRequestUsers = async search => {
		const prepare = {
			url: `v1/find/user?search=${encodeURI(search)}&privilegio=V-`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		return response || [];
	}
	
	const asyncRequestCursos = async search => {
		const prepare = {
			url: `v1/find/curso?search=${encodeURI(search)}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		return response || [];
	}
	
	const onSubmit = async submitData => {
		dispatch(updateDialogs('crearLoteDeuda', true, true));
		
		// Fix array users
		if (submitData.selected_users) {
			const users = submitData.selected_users.map(obj => obj.id);
			submitData.selected_users = users;
		}else if (submitData.cursos) {
			const cursos = submitData.cursos.map(obj => obj.id);
			submitData.cursos = cursos;
		}
		
		const prepare = {
			url: `v1/deuda/lote`,
			type: 'post',
			data: submitData,
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
			if (submitData.create_more) {
				dispatch(updateDialogs('crearLoteDeuda', true, false));
			}else {
				dispatch(updateDialogs('crearLoteDeuda', false, false));
			}
		}else {
			dispatch(updateDialogs('crearLoteDeuda', true, false));
		}
	}
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Crear lote de deudas</DialogTitle>
			<DialogContent>
				<form autoComplete='off'>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<TextField 
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 6, message: 'Error: Demaciado corto' },
									maxLength: { value: 100, message: 'Error: Demaciado largo' },
								})}
								disabled={loading}
								name='motivo'
								error={Boolean(errors.motivo)}
								helperText={errors?.motivo?.message ? errors.motivo.message : 'Ingrese el motivo de la deuda'}
								label='Motivo'
								defaultValue={''}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<NumberFormatInput
								disabled={loading}
								error={Boolean(errors.cantidad_pagar)}
								helperText={errors?.cantidad_pagar?.message ? errors.cantidad_pagar.message : 'Ingrese el monto a pagar de la deuda'}
								label='Monto a pagar'
								mask='money'
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
							>
								<MenuItem value='selected'>Usuarios seleccionados</MenuItem>
								<MenuItem value='cursos'>Cursos</MenuItem>
							</RenderSelectFormHook>
						</Grid>
						{watch('type', 'selected') === 'selected' && (
							<Grid item xs={12}>
								<AsyncInputFormHook
									label='Seleccionar usuarios'
									multiple
									disabled={loading}
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
						{watch('type', 'selected') === 'cursos' && (
							<Grid item xs={12}>
								<AsyncInputFormHook
									label='Seleccionar cursos'
									name='cursos'
									multiple
									disabled={loading}
									asyncRequest={asyncRequestCursos}
									getOptionLabel={(option) => option.code}
									renderOption={option => option.code}
									error={Boolean(errors.cursos)}
									helperText={errors?.cursos?.message ? errors.cursos.message : 'Busque los cursos que desea seleccionar'}
									control={control}
									rules={{
										required: { value: true, message: '* Campo requerido' },
										validate: value => value.length > 0 || 'Error: Debe de seleccionar al menos a 1 curso',
									}}
								/>
							</Grid>
						)}
					</Grid>
				</form>
			</DialogContent>
			<DialogActions>
				<RenderSwitchFormHook
					labelPlacement="start"
					label="Crear mรกs de uno"
					name='create_more'
					control={control}
					disabled={loading}
					color='primary'
					defaultValue={false}
				/>
				<Button disabled={loading} onClick={handleClose}>
					Cancelar
				</Button>
				<LoadingComponent 
					loading={loading}
					color="inherit"
				>
					<Button onClick={handleSubmit(onSubmit)}>
						Crear
					</Button>
				</LoadingComponent>
			</DialogActions>
		</Dialog>
	);
}