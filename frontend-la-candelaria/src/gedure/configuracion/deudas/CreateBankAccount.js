import React, { useState, useEffect } from 'react';

import { 
	Grid,
	Typography,
	Paper,
	TextField,
	MenuItem,
	Button,
} from '@material-ui/core';

import { useForm, Controller } from "react-hook-form";

import NumberFormat from 'react-number-format';

import useFetch from '../../../hooks/useFetch';

// Components
import { RenderSelectFormHook } from '../../../components/RendersGlobals';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';

function NumberFormatCustom(props) {
	const { inputRef, onChange, format, mask, ...rest } = props;
	
	return (
		<NumberFormat
			{...rest}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange(values.value);
			}}
			format="#### #### #### #### ####"
			mask="_"
			isNumericString
		/>
	)
}

function NumberFormatCustom2(props) {
	const { inputRef, onChange, format, mask, ...rest } = props;
	
	return (
		<NumberFormat
			{...rest}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange(values.value);
			}}
			format="J-########-#"
			mask="_"
			isNumericString
		/>
	)
}

export default function CreateBankAccount({ tableRef }) {
	const { loading } = useSelector((state) => ({
		loading: state.forms.createBankAccount.loading,
	}));
	const dispatch = useDispatch();
	
	const { control, errors, handleSubmit, register, setError } = useForm({
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
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding'>
				<Typography variant='h6' className='text__bold--semi'>
					Añadir una cuenta de transferencias
				</Typography>
				<form autoComplete='off'>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={4}>
							<Controller 
								render={({onChange, onBlur, value, name, ref}, { invalid }) => (
									<TextField
										inputRef={ref}
										value={value}
										name={name}
										onChange={onChange}
										onBlur={onBlur}
										error={invalid}
										disabled={loading}
										helperText={errors[name] ? errors[name].message : ''}
										label='N° de cuenta'
										InputProps={{
											inputComponent: NumberFormatCustom
										}}
										fullWidth
									/>
								)}
								name='n_account'
								control={control}
								defaultValue=''
								rules={{
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 20, message: 'Error: Cuenta no válida' },
									maxLength: { value: 20, message: 'Error: Cuenta no válida' },
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Controller 
								render={({onChange, onBlur, value, name, ref}, { invalid }) => (
									<TextField
										inputRef={ref}
										value={value}
										name={name}
										onChange={onChange}
										onBlur={onBlur}
										error={invalid}
										disabled={loading}
										helperText={errors[name] ? errors[name].message : ''}
										label='RIF'
										InputProps={{
											inputComponent: NumberFormatCustom2
										}}
										fullWidth
									/>
								)}
								name='rif'
								control={control}
								defaultValue=''
								rules={{
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 9, message: 'Error: RIF no válida' },
									maxLength: { value: 9, message: 'Error: RIF no válida' },
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField 
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 6, message: 'Error: Demaciado corto' },
									maxLength: { value: 100, message: 'Error: Demaciado largo' },
								})}
								disabled={loading}
								name='name'
								error={Boolean(errors.name)}
								helperText={errors.name ? errors.name.message : ''}
								label='Nombre'
								defaultValue={''}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField 
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Error: Correo no válido',
									},
								})}
								disabled={loading}
								name='email'
								error={Boolean(errors.email)}
								helperText={errors.email ? errors.email.message : ''}
								label='Correo'
								defaultValue={''}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<RenderSelectFormHook
								name='type'
								nameLabel='Tipo de cuenta'
								control={control}
								defaultValue='' 
								errors={errors.type}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								<MenuItem value='ahorro'>
									Ahorro
								</MenuItem>
								<MenuItem value='ahorro'>
									Corriente
								</MenuItem>
							</RenderSelectFormHook>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<RenderSelectFormHook
								name='code'
								nameLabel='Banco'
								control={control}
								defaultValue=''
								errors={errors.code}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								<MenuItem value='0012'>
									Venezuela
								</MenuItem>
								<MenuItem value='1103'>
									Banesco
								</MenuItem>
							</RenderSelectFormHook>
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