import React, { useState, useCallback } from 'react';

import { 
	Grid,
	Box,
	Paper,
	Button,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Components
import {
	AutoCompleteAsyncHook,
} from '@form-inputs';
import { parseToAccountString } from '../../../components/funciones/ParseString';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';

export default function CreateBankAccount({ tableRef }) {
	const [progress, setProgress] = useState(0);
	const { loading } = useSelector((state) => ({
		loading: state.forms.uploadBankTransaction.loading,
	}));
	const dispatch = useDispatch();
	
	const { register, control, handleSubmit, setError, watch, formState: { errors } } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch(setError);
	
	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);
	
	const onSubmit = async submitData => {
		dispatch(updateForms('uploadBankTransaction', true));
		
		const formData = new FormData();
		formData.append('transactions', submitData.transactions[0]);
		
		const prepare = {
			url: `v1/bank-account/${submitData.selected.id}/transaction`,
			type: 'post',
			data: formData,
			otherData: {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: onUploadProgress,
			},
			variant: 'info'
		};
		
		// eslint-disable-next-line
		const response = await fetchData(prepare);
		
		dispatch(updateForms('uploadBankTransaction', false));
	}
	
	const asyncRequestBankAccount = async search => {
		const prepare = {
			url: `v1/find/bank-account?search=${encodeURI(search)}`,
			type: 'get',
			messageToFinish: false,
		};

		const response = await fetchData(prepare);
		
		return response || [];
	}
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding'>
				<Box fontSize='h6.fontSize' mb={2} className='text__bold--semi'>
					Cargar transacciones bancarias
				</Box>
				<form autoComplete='off'>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={4}>
							<AutoCompleteAsyncHook
								label='Buscar cuenta bancaria'
								name='selected'
								asyncRequest={asyncRequestBankAccount}
								getOptionLabel={(option) => option.name || ""}
								renderOption={option => (
									<div>
										{option.name}
										<br />
										<i>{parseToAccountString(option.n_account)}</i>
									</div>
								)}
								helperText='Busque la cuenta bancaria a la cual desea cargar las transferencias'
								control={control}
								rules={{
									required: { value: true, message: '* Campo requerido' },
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<input
								id='upload-transactions'
								{...register('transactions',{
									required: '* Debe subir un archivo',
								})}
								defaultValue={null}
								style={{display: 'none'}}
								accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,application/vnd.oasis.opendocument.spreadsheet"
								type="file"
							/>
							<label htmlFor="upload-transactions">
								<Button variant='contained' color='secondary' component='span'>
									Cargar archivo
								</Button>
							</label>
							{Boolean(errors.transactions) && (
								<Box fontSize='body1.fontSize' component='span' ml={2} color='#f44336'>
									{errors.transactions.message}
								</Box>
							)}
							{((watch('transactions')?.length || []).length !== 0) && (
								<Box fontSize='body1.fontSize' component='span' ml={2}>
									Archivo cargado
								</Box>
							)}
						</Grid>
						<Grid container justify='flex-end' item xs={12}>
							<LoadingComponent
								loading={loading}
								progressLoading
								progress={progress}
								color="inherit"
							>
								<Button 
									color='primary' 
									variant='contained' 
									onClick={handleSubmit(onSubmit)}
									disableElevation
								>
									Cargar
								</Button>
							</LoadingComponent>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
}