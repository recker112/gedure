import React from 'react';

import {
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@material-ui/core';

import { useForm, useFieldArray, useWatch } from "react-hook-form";

import useFetch from '../../hooks/useFetch';

// Component
import {
	InputHook,
	InputMaskHook,
} from '@form-inputs';
import AnimationDialog from '../../components/AnimationDialog';
import LoadingComponent from '../../components/LoadingComponent';
import { parseFloatToMoneyString } from '../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../actions/updateDialogs';

function StatusAccount({ control, data }) {
	const balance = useWatch({
    control,
    name: 'data',
    defaultValue: [{amount:0}]
  });
	let new_balance = data.balance;
	balance.map((item) => new_balance += item.amount);
	
	return (
		<DialogContentText>
			<strong>Saldo actual del usuario:</strong> {parseFloatToMoneyString(data.balance || 0)}
			<br />
			<strong>Nuevo saldo:</strong> {parseFloatToMoneyString(new_balance || 0)}
			<br />
			Tenga en cuenta que el nuevo saldo no puede dar como resultado un número negativo.
		</DialogContentText>
	);
}

export default function EditLoteDeuda({ tableRef }) {
	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.editWallet.open,
		loading: state.dialogs.editWallet.loading,
		data: state.dialogs.editWallet.data,
	}));
	const dispatch = useDispatch();
	
	const { control, handleSubmit, setError } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
		shouldUnregister: true,
  });
	
	const { fetchData } = useFetch(setError);
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('editWallet', false, false, {}));
		}
	}
	
	const onSubmit = async submitData => {
		dispatch(updateDialogs('editWallet', true, true));
		
		// Fix array users
		if (submitData.selected_users) {
			const users = submitData.selected_users.map(obj => obj.id);
			submitData.selected_users = users;
		}
		
		const prepare = {
			url: `v1/wallet/${data.id}`,
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT'
			},
			message422: 'Debe de agregar una acción'
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
			dispatch(updateDialogs('editWallet', false, true));
		}else {
			dispatch(updateDialogs('editWallet', true, false));
		}
	}
	
	return (
		<Dialog 
			open={open} 
			onClose={handleClose} 
			TransitionComponent={AnimationDialog}
			fullWidth
		>
			<DialogTitle>Editar monedero de {data.privilegio+data.username}</DialogTitle>
			<DialogContent>
				<form autoComplete='off'>
					<Grid container spacing={2}>
						{fields.map((field, i) => (
							<React.Fragment key={field.id}>
								<Grid item xs={12}>
									<InputHook
										control={control}
										rules={{
											required: '* Campo requerido',
											minLength: { value: 6, message: 'Error: Demaciado corto' },
											maxLength: { value: 100, message: 'Error: Demaciado largo' },
										}}
										name={`data.${i}.reason`}
										label='Descripción'
										helperText='Ingrese una descripción a la acción'
										fullWidth
										disabled={loading}
									/>
								</Grid>
								<Grid item xs={12}>
									<InputMaskHook
										control={control}
										rules={{
											required: '* Campo requerido',
											validate: {
												noZero: v => v !== 0 || 'Error: El monto no debe ser igual a 0'
											},
										}}
										name={`data.${i}.amount`}
										label='Importe'
										helperText='Ingrese la cantidad del importe'
										fullWidth
										disabled={loading}
										mask='money'
										negative={true}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										size='small'
										onClick={() => remove(i)}
									>
										Eliminar
									</Button>
								</Grid>
							</React.Fragment>
						))}
						<Grid item xs={12}>
							<Button
								variant='outlined'
								onClick={() => append()}
							>
								Agregar acción
							</Button>
						</Grid>
						<Grid item xs={12}>
							<StatusAccount control={control} data={data} />
						</Grid>
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