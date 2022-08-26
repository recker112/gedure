import React from 'react';

// MUI
import { Grid, Typography } from '@mui/material';

// Form
import { useFormContext } from 'react-hook-form';

// Redux
import { useSelector } from 'react-redux';
import { parseFloatToMoneyString } from '../../../../components/Utils/ParseString';
import conveterCursorCode from '../../../../components/Utils/converterCursoCode';
import { InputPasswordHook } from '../../../../components/form/inputs';

export default function DataConfirm() {
  const { control, watch } = useFormContext();

  const { data, balance, loading } = useSelector(state => ({
    data: state.requestStatusWallet.verifyTransfer.data,
    loading: state.requestStatusWallet.confirmTransfer.loading,
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
        <Typography>
          <strong>Usuario seleccionado</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography color='text.secondary'>
          Usuario o cédula
        </Typography>
        <Typography>
          {watch('username')}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography color='text.secondary'>
          Nombre
        </Typography>
        <Typography>
        {data.name}
        </Typography>
      </Grid>

      {data.curso && (
        <Grid item xs={12} sm={6}>
          <Typography color='text.secondary'>
          Curso actual
          </Typography>
          <Typography>
            {conveterCursorCode(data.curso.code) + ' ' + data.curso.code[data.curso.code.length - 1]}
          </Typography>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography>
          <strong>Información de saldo</strong>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography color='text.secondary'>
          Monto a transferir
        </Typography>
        <Typography>
          {parseFloatToMoneyString(watch('amount_to_transfer'))}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography color='text.secondary'>
          Saldo actual en monedero
        </Typography>
        <Typography>
          {parseFloatToMoneyString(balance)}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography color='text.secondary'>
          Nuevo saldo disponible
        </Typography>
        <Typography>
          {parseFloatToMoneyString(balance - watch('amount_to_transfer'))}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Confirmar transacción</strong>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <InputPasswordHook
          variant="filled"
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 4, message: 'Error: No válido' },
            maxLength: { value: 25, message: 'Error: No válida' }
          }}
          data-tour='password'
          name='password'
          label='Contraseña'
          helperText='Ingrese su contraseña actual para confirmar esta transacción'
          fullWidth
          disabled={loading}
        />
      </Grid>
    </>
  )
}
