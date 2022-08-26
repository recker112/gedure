import React from 'react';

// MUI
import { Grid, Typography } from '@mui/material';

// Form
import { useFormContext } from 'react-hook-form';
import { InputHook, InputMaskHook } from '../../../../components/form/inputs';
import { useSelector } from 'react-redux';

export default function DataTransfer() {
  const { control } = useFormContext();

  const { balance, loading } = useSelector(state => ({
    balance: state.auth.user.wallet.balance,
    loading: state.requestStatusWallet.verifyTransfer.loading,
  }));

  return (
    <>
      <Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--semi'>
					Rellenar datos para transferir
				</Typography>
			</Grid>
      <Grid item xs={12} sm={6}>
        <InputHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 3, message: 'Error: Demaciado corto' },
            maxLength: { value: 30, message: 'Error: Demaciado largo' },
          }}
          data-tour='user'
          name='username'
          label='Usuario o cédula'
          size='small'
          variant='filled'
          helperText='Usuario al que desea transferir saldo'
          disabled={loading}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputMaskHook
          control={control}
          rules={{
            required: '* Campo requerido',
            min: { value: 0, message: 'Error: El monto debe ser mayor a 0' },
            validate: {
              balance: v => v <= balance || 'Error: Saldo insuficiente',
            }
          }}
          size='small'
          data-tour="amount"
          name='amount_to_transfer'
          label='Monto a transferir'
          helperText='Monto que desea transferir'
          disabled={loading}
          fullWidth
          variant='filled'
          decimalScale={2}
          thousandSeparator='.'
          decimalSeparator=','
          allowNegative={false}
          prefix={'Bs. '}
        />
      </Grid>
      <Grid item xs={12}>
        <InputHook
          control={control}
          rules={{
            minLength: { value: 4, message: 'Error: Demaciado corto' },
            maxLength: { value: 50, message: 'Error: Demaciado largo' },
          }}
          data-tour="reason"
          name='reason'
          label='Motivo (opcional)'
          size='small'
          variant='filled'
          helperText='Agrege el motivo de la transferencia si lo desea'
          disabled={loading}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} data-tour="important">
				<Typography variant='subtitle2'>
					Tenga en cuenta los siguientes puntos antes de transferir saldo
				</Typography>
				<ul>
					<li>
						<Typography variant='subtitle2'>
							Una ves realizada la transferencia de saldo no es posible deshacer esa acción.
						</Typography>
					</li>
					<li>
						<Typography variant='subtitle2'>
							Verifique bien los datos ingresados.
						</Typography>
					</li>
				</ul>
			</Grid>
    </>
  )
}
