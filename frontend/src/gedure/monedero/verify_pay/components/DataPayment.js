import React, { useCallback } from 'react';

import {
	Grid,
	Typography,
	MenuItem,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import {
	InputMaskHook,
	SelectHook,
	DatePickerHook,
} from '@form-inputs';
import { BankList } from '../../../../components/funciones/BankList';

export default function SelectAccount() {
	const { control } = useFormContext();
	
	const MenuItemList = BankList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--semi'>
					Datos de la transferencia realizada
				</Typography>
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
				<InputMaskHook
					control={control}
					rules={{
						required: '* Campo requerido',
						minLength: { value: 8, message: 'Error: Referencia no válida' },
						maxLength: { value: 8, message: 'Error: Referencia no válida' },
					}}
					name='reference'
					label='Referencia'
					helperText='Ingrese los últimos 8 dígitos de la referencia'
					fullWidth
					format="########"
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4}>
				<InputMaskHook
					control={control}
					rules={{
						required: '* Campo requerido',
						min: { value: 0, message: 'Error: El monto debe ser mayor a 0' },
					}}
					name='amount'
					label='Monto pagado'
					helperText='Ingrese el monto el cual transfirió'
					fullWidth
					mask='money'
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4}>
				<SelectHook
					name='code'
					label='Banco emisor'
					helperText='Ingrese el banco desde donde realizó la transferencia'
					control={control}
					fullWidth
				>
					<MenuItem value=''>
						<em>Ninguno</em>
					</MenuItem>
					{MenuItemList}
				</SelectHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={4}>
				<DatePickerHook 
					name="date"
					label="Fecha de la transferencia"
					control={control}
					rules={{ 
						required: '* Campo requerido'
					}}
					disableFuture
					format='yyyy/MM/dd'
					helperText='Ingrese la fecha en la que realizó la transferencia'
					views={['year', 'month', 'date']}
					openTo="date"
					fullWidth
				/>
			</Grid>
		</React.Fragment>
	);
}