import React from 'react';

import {
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Component
import {
	InputHook,
	InputMaskHook,
	AutoCompleteAsyncHook
} from '@form-inputs';
import AnimationDialog from '../../../components/AnimationDialog';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function EditLoteDeuda({ tableRef }) {
	const { open, loading, data, permissions } = useSelector((state) => ({
		open: state.dialogs.editLoteDeuda.open,
		loading: state.dialogs.editLoteDeuda.loading,
		data: state.dialogs.editLoteDeuda.data,
		permissions: state.userData.permissions,
	}));
	const dispatch = useDispatch();
	
	const { control, handleSubmit, setError } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	
	const { fetchData } = useFetch(setError);
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('editLoteDeuda', false, false, {}));
		}
	}
	
	const asyncRequestUsers = async search => {
		const prepare = {
			url: `v1/find/deudas-users?search=${encodeURI(search)}&id_lote_deuda=${data.id}&not_registred=1`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		return response || [];
	}
	
	const onSubmit = async submitData => {
		dispatch(updateDialogs('editLoteDeuda', true, true));
		
		// Fix array users
		if (submitData.selected_users) {
			const users = submitData.selected_users.map(obj => obj.id);
			submitData.selected_users = users;
		}
		
		const prepare = {
			url: `v1/deuda/lote/${data.id}`,
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT'
			},
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
			dispatch(updateDialogs('editLoteDeuda', false, false));
		}else {
			dispatch(updateDialogs('editLoteDeuda', true, false));
		}
	}
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Editar lote de deuda #{data.id}</DialogTitle>
			<DialogContent>
				<form autoComplete='off'>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 6, message: 'Error: Demaciado corto' },
									maxLength: { value: 100, message: 'Error: Demaciado largo' },
								}}
								name='reason'
								label='Motivo'
								helperText='Ingrese el motivo de la deuda'
								defaultValue={data.reason}
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
								name='new_price'
								label='Monto a pagar'
								helperText='Ingrese el monto a pagar de la deuda'
								defaultValue={data.amount_to_pay}
								fullWidth
								disabled={loading}
								mask='money'
							/>
						</Grid>
						{permissions.administrar?.debt_create && (
							<Grid item xs={12}>
								<AutoCompleteAsyncHook
									label='Agregar usuarios'
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
					</Grid>
				</form>
			</DialogContent>
			<DialogActions>
				<Button disabled={loading} onClick={handleClose}>
					Cancelar
				</Button>
				<LoadingComponent 
					loading={loading}
					color="inherit"
				>
					<Button onClick={handleSubmit(onSubmit)}>
						Actualizar
					</Button>
				</LoadingComponent>
			</DialogActions>
		</Dialog>
	);
}