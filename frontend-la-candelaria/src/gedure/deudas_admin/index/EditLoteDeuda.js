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
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Component
import AnimationDialog from '../../../components/AnimationDialog';
import { NumberFormatInput, AsyncInputFormHook } from '../../../components/RendersGlobals';
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
	
	const { register, errors, control, handleSubmit, setError } = useForm({
		mode: 'onTouched',
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
							<TextField 
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 6, message: 'Error: Demaciado corto' },
									maxLength: { value: 100, message: 'Error: Demaciado largo' },
								})}
								disabled={loading}
								name='reason'
								error={Boolean(errors.reason)}
								helperText={errors?.reason?.message ? errors.reason.message : 'Ingrese el motivo de la deuda'}
								label='Motivo'
								defaultValue={data.reason}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<NumberFormatInput
								disabled={loading}
								error={Boolean(errors.new_price)}
								helperText={errors?.new_price?.message ? errors.new_price.message : 'Ingrese el monto a pagar de la deuda'}
								label='Monto a pagar'
								mask='money'
								fullWidth
								name='new_price'
								control={control}
								defaultValue={data.amount_to_pay}
								rules={{
									required: { value: true, message: '* Campo requerido' },
									min: { value: 1, message: 'Error: El monto debe ser mayor a 0' }
								}}
							/>
						</Grid>
						{permissions.administrar?.debt_create && (
							<Grid item xs={12}>
								<AsyncInputFormHook
									label='Agregar usuarios'
									multiple
									disabled={loading}
									name='selected_users'
									asyncRequest={asyncRequestUsers}
									getOptionLabel={(option) => option.username}
									renderOption={option => (`${option.privilegio}${option.username}`)}
									error={Boolean(errors.selected_users)}
									helperText={errors?.selected_users?.message ? errors.selected_users.message : 'Busque a los usuarios que desea agregar'}
									control={control}
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