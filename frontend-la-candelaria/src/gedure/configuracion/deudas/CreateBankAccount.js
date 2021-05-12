import React, { useCallback } from 'react';

import { 
	Grid,
	Typography,
	Paper,
	MenuItem,
	Button,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Components
import {
	InputHook,
	InputMaskHook,
	SelectHook,
} from '@form-inputs';
import { BankList } from '../../../components/funciones/BankList';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';

export default function CreateBankAccount({ tableRef }) {
	const { loading } = useSelector((state) => ({
		loading: state.forms.createBankAccount.loading,
	}));
	const dispatch = useDispatch();
	
	const { control, handleSubmit, setError } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch(setError);
	
	const onSubmit = async submitData => {
		dispatch(updateForms('createBankAccount', true));
		
		const prepare = {
			url: 'v1/bank-account',
			type: 'post',
			data: submitData,
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
		}
		
		dispatch(updateForms('createBankAccount', false));
	}
	
	const MenuItemList = BankList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding'>
				<Typography variant='h6' className='text__bold--semi'>
					Añadir una cuenta de transferencias
				</Typography>
				<form autoComplete='off'>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={4}>
							<InputMaskHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 20, message: 'Error: Cuenta no válida' },
									maxLength: { value: 20, message: 'Error: Cuenta no válida' },
								}}
								name='n_account'
								label='N° de cuenta'
								fullWidth
								disabled={loading}
								format="#### #### #### #### ####"
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<InputMaskHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 9, message: 'Error: RIF no válida' },
									maxLength: { value: 9, message: 'Error: RIF no válida' },
								}}
								name='rif'
								label='RIF'
								fullWidth
								disabled={loading}
								format="J-########-#"
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 6, message: 'Error: Demaciado corto' },
									maxLength: { value: 100, message: 'Error: Demaciado largo' },
								}}
								name='name'
								label='Nombre'
								fullWidth
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Error: Correo no válido',
									},
								}}
								name='email'
								label='Correo'
								fullWidth
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<SelectHook
								name='type'
								label='Tipo de cuenta'
								control={control}
								disabled={loading}
								fullWidth
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								<MenuItem value='ahorro'>
									Ahorro
								</MenuItem>
								<MenuItem value='corriente'>
									Corriente
								</MenuItem>
							</SelectHook>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<SelectHook
								name='code'
								label='Banco'
								control={control}
								disabled={loading}
								fullWidth
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								{MenuItemList}
							</SelectHook>
						</Grid>
						<Grid container justify='flex-end' item xs={12}>
							<LoadingComponent 
								loading={loading}
								color="inherit"
							>
								<Button 
									color='primary' 
									variant='contained' 
									onClick={handleSubmit(onSubmit)}
									disableElevation
								>
									Crear
								</Button>
							</LoadingComponent>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
}