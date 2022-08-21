import React from 'react';

// MUI
import { Grid, Typography } from '@mui/material';

// Form
import { useFormContext } from 'react-hook-form';

// Redux
import { useSelector } from 'react-redux';
import { parseFloatToMoneyString } from '../../../../components/Utils/ParseString';
import conveterCursorCode from '../../../../components/Utils/converterCursoCode';
import { InputHook } from '../../../../components/form/inputs';

export default function DataConfirm() {
  const { control, watch } = useFormContext();

  const { data, balance } = useSelector(state => ({
    data: state.requestStatusWallet.verifyTransfer.data,
    balance: state.auth.user.wallet.balance,
  }));

  return (
    <>
      <Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--semi'>
					Confirmar datos seleccionados
				</Typography>
			</Grid>
      <Grid item xs={12}>
        <Typography variant='h6'>
          Usuario seleccionado
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Usuario o cédula: {watch('username')}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography>
        Nombre: {data.name}
        </Typography>
      </Grid>

      {data.curso && (
        <Grid item xs={12}>
          <Typography>
            Curso actual: {conveterCursorCode(data.curso.code)}
          </Typography>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography variant='h6'>
          Información de saldo
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
					Monto a transferir: {parseFloatToMoneyString(watch('amount_to_transfer'))}
				</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
					Saldo actual en monedero: {parseFloatToMoneyString(balance)}
				</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
					Nuevo saldo: {parseFloatToMoneyString(balance - watch('amount_to_transfer'))}
				</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Confirmar contraseña
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <InputHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 8, message: 'Error: No válido' },
          }}
          name='password'
					label='Contraseña actual'
          size='small'
          variant='filled'
          disabled={false}
					helperText='Ingrese su contraseña actual'
          fullWidth
        />
      </Grid>
    </>
  )
}
