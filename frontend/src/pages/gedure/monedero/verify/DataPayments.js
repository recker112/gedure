import React, { useCallback } from 'react';

// MUI
import { Grid, MenuItem, Typography } from '@mui/material';

// Form
import { useFormContext } from 'react-hook-form';

// Components
import { InputMaskHook } from '../../../../components/form/inputs';
import { SelectHook } from '../../../../components/form/select';
import { BankList } from '../../../../components/Utils/BankList';
import DatePickerHook from '../../../../components/form/datepicker';
import { useSelector } from 'react-redux';

export default function DataPayments() {
  const { control } = useFormContext();

  const { loading } = useSelector(state => ({
    loading: state.requestStatusWallet.verifyPayments.loading,
  }))

  const MenuItemList = BankList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.label}</MenuItem>
	),[]));

  return (
    <>
      <Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--semi'>
					Datos de la transferencia realizada
				</Typography>
			</Grid>
      <Grid item xs={12}>
				<InputMaskHook
					control={control}
					rules={{
						required: '* Campo requerido',
						min: { value: 0, message: 'Error: El monto debe ser mayor a 0' },
					}}
          size='small'
          data-tour="amount"
					name='amount'
					label='Monto pagado'
					helperText='Ingrese el monto el cual transfirió'
          variant='filled'
					fullWidth
          disabled={loading}
          decimalScale={2}
          thousandSeparator='.'
          decimalSeparator=','
          allowNegative={false}
          prefix={'Bs. '}
				/>
			</Grid>
      <Grid item xs={12} sm={6}>
        <InputMaskHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 8, message: 'Error: No válido' },
          }}
          data-tour="reference"
          name='reference'
					label='Referencia'
          variant='filled'
          size='small'
          format="########"
          disabled={loading}
					helperText='Ingrese los últimos 8 dígitos de la referencia'
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
				<SelectHook
          data-tour="bank"
          name='code'
					label='Banco emisor'
          control={control}
          variant='filled'
          helperText='Ingrese el banco desde donde realizó la transferencia'
          size='small'
          fullWidth
          disabled={loading}
        >
          <MenuItem value=''>
						<em>Ninguno</em>
					</MenuItem>
          {MenuItemList}
        </SelectHook>
			</Grid>
      <Grid item xs={12}>
        <DatePickerHook
          disableFuture
          data-tour="date"
          name="date"
					label="Fecha de la transferencia"
          variant='filled'
          control={control}
          size='small'
          helperText='Ingrese la fecha en la que realizó la transferencia'
          openTo='day'
          views={['month','day']}
          disabled={loading}
        />
      </Grid>
    </>
  )
}
