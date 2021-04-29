import React from 'react';

import {
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	MenuItem,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Component
import {
	InputHook,
	InputMaskHook,
	SelectHook,
	SwitchHook,
	AutoCompleteAsyncHook,
} from '@form-inputs';
import AnimationDialog from '../../../components/AnimationDialog';
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
	
	const { control, watch, handleSubmit, setError } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
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
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 6, message: 'Error: Demaciado corto' },
									maxLength: { value: 100, message: 'Error: Demaciado largo' },
								}}
								name='motivo'
								label='Motivo'
								helperText='Ingrese el motivo de la deuda'
								fullWidth
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputMaskHook
								control={control}
								rules={{
									required: '* Campo requerido',
									min: { value: 1, message: 'Error: El monto debe ser mayor a 0' },
								}}
								name='cantidad_pagar'
								label='Monto a pagar'
								helperText='Ingrese el monto a pagar de la deuda'
								fullWidth
								disabled={loading}
								mask='money'
							/>
						</Grid>
						<Grid item xs={12}>
							<SelectHook
								name='type'
								label='Deuda para:'
								control={control}
								disabled={loading}
								helperText='Seleccione a los usuarios que recibirán esta deuda'
								fullWidth
							>
								<MenuItem value=''><em>Ninguno</em></MenuItem>
								<MenuItem value='selected'>Usuarios seleccionados</MenuItem>
								<MenuItem value='cursos'>Cursos</MenuItem>
							</SelectHook>
						</Grid>
						{watch('type') === 'selected' && (
							<Grid item xs={12}>
								<AutoCompleteAsyncHook
									label='Seleccionar usuarios'
									multiple
									name='selected_users'
									asyncRequest={asyncRequestUsers}
									getOptionLabel={(option) => option.username}
									renderOption={option => (`${option.privilegio}${option.username} - ${option.name}`)}
									helperText='Busque a los usuarios que desea seleccionar'
									control={control}
									rules={{
										required: { value: true, message: '* Campo requerido' },
										validate: value => value.length > 0 || 'Error: Debe de seleccionar al menos a 1 usuario',
									}}
								/>
							</Grid>
						)}
						{watch('type') === 'cursos' && (
							<Grid item xs={12}>
								<AutoCompleteAsyncHook
									label='Seleccionar cursos'
									multiple
									filterSelectedOptions
									name='cursos'
									asyncRequest={asyncRequestCursos}
									getOptionLabel={(option) => option.code}
									renderOption={option => option.code}
									helperText='Busque los cursos que desea seleccionar'
									control={control}
									rules={{
										required: { value: true, message: '* Campo requerido' },
										validate: value => value.length > 0 || 'Error: Debe de seleccionar al menos a 1 usuario',
									}}
								/>
							</Grid>
						)}
					</Grid>
				</form>
			</DialogContent>
			<DialogActions>
				<SwitchHook
					control={control}
					name='create_more'
					label="Crear más de uno"
					labelPlacement="start"
					color="primary"
					disabled={loading}
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