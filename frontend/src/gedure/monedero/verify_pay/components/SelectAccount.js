import React from 'react';

import {
	Grid,
	Typography,
	Card,
	CardContent
} from '@material-ui/core';

import useFetch from '../../../../hooks/useFetch';

import { useFormContext } from "react-hook-form";

// Components
import {
	AutoCompleteAsyncHook,
} from '@form-inputs';
import { parseToAccountString } from '../../../../components/funciones/ParseString';
import { BankListSearch } from '../../../../components/funciones/BankList';

export default function SelectAccount() {
	const { control, setError, watch } = useFormContext();
	
	const bank_account = watch('bank_account', {}) || {};
	
	const { fetchData } = useFetch(setError);
	
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
		<React.Fragment>
			<Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--semi'>
					Seleccionar cuenta de transferencia
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<AutoCompleteAsyncHook
					label='Buscar cuenta bancaria'
					name='bank_account'
					asyncRequest={asyncRequestBankAccount}
					getOptionLabel={(option) => option.name || ""}
					renderOption={option => (
						<div>
							{option.name}
							<br />
							<i>{parseToAccountString(option.n_account)}</i>
						</div>
					)}
					helperText='Busque la cuenta bancaria a la cual realizó la transferencia'
					control={control}
					rules={{
						required: { value: true, message: '* Campo requerido' },
					}}
				/>
			</Grid>
			
			<Grid container justify='center' item xs={12}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardContent>
							<Typography variant='h6' color="textSecondary" gutterBottom>
								Cuenta bancaria seleccionada
							</Typography>

							<Typography>
								Nombre de la cuenta: {watch('bank_account.name', '')}
							</Typography>

							<Typography>
								N° cuenta: {parseToAccountString(bank_account.n_account || '')}
							</Typography>

							<Typography>
								RIF: J-{bank_account.rif?.slice(0,-1)}-{watch('bank_account.rif', '')?.charAt(bank_account.rif?.length - 1)}
							</Typography>

							<Typography>
								Correo: {bank_account.email}
							</Typography>

							<Typography>
								Banco: {bank_account.code ? BankListSearch[bank_account.code] : null}
							</Typography>

							<Typography>
								Tipo de cuenta: {bank_account.type}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}