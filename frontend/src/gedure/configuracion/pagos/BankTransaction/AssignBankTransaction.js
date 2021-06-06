import React from 'react';

import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	Button,
} from '@material-ui/core';

import useFetch from '../../../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Components
import {
	AutoCompleteAsyncHook,
} from '@form-inputs';
import AnimationDialog from '../../../../components/AnimationDialog';
import LoadingComponent from '../../../../components/LoadingComponent';
import { parseFloatToMoneyString } from '../../../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../../actions/updateDialogs';

export default function AssignBankTransaction({ tableRef }) {
	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.assignBankTransaction.open,
		loading: state.dialogs.assignBankTransaction.loading,
		data: state.dialogs.assignBankTransaction.data,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit, control } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const { fetchData } = useFetch();
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('assignBankTransaction', false, false));
		}
	}
	
	const asyncRequestUsers = async search => {
		const prepare = {
			url: `v1/find/users?search=${encodeURI(search)}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		return response || [];
	}
	
	const onSubmit = async submitData => {
		dispatch(updateDialogs('assignBankTransaction', true, true));
		
		submitData.user_selected = submitData.user_selected.id;
		
		const prepare = {
			url: `v1/bank-transaction/${data.id}/assign`,
			type: 'post',
			data: submitData,
			message404Server: true,
		};

		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
			
			dispatch(updateDialogs('assignBankTransaction', false, true));
		}else {
			dispatch(updateDialogs('assignBankTransaction', true, false));
		}
	}
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Asignar transacción bancaria</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid container alignItems='center' item xs={12}>
						<DialogContentText>
							Ha seleccionado la transacción bancaria <strong>#{data.id}</strong> para asigarla a un usuario, esta acción acreditará <strong>{parseFloatToMoneyString(data.amount || 0)}</strong> a la cuenta del usuario seleccionado.
						</DialogContentText>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AutoCompleteAsyncHook
							label='Seleccionar usuario'
							name='user_selected'
							asyncRequest={asyncRequestUsers}
							getOptionLabel={(option) => option.username}
							renderOption={option => (`${option.privilegio}${option.username} - ${option.name}`)}
							helperText='Busque al usuario que desea seleccionar'
							control={control}
							rules={{
								required: { value: true, message: '* Campo requerido' },
							}}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={loading}>Cancelar</Button>
				<LoadingComponent 
					loading={loading}
					color="inherit"
				>
					<Button onClick={handleSubmit(onSubmit)}>Cambiar</Button>
				</LoadingComponent>
			</DialogActions>
		</Dialog>
	);
}