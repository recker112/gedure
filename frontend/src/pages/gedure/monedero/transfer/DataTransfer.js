import React from 'react';

// MUI
import { Grid, Typography } from '@mui/material';

// Form
import { useFormContext } from 'react-hook-form';
import { InputHook, InputMaskHook } from '../../../../components/form/inputs';

export default function DataTransfer() {
  const { control } = useFormContext();

  return (
    <>
      <Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--semi'>
					Rellenar datos para transferir
				</Typography>
			</Grid>
      <Grid item xs={12}>
				<Typography>
					Tenga en cuenta los siguientes puntos antes de transferir saldo
				</Typography>
				<ul>
					<li>
						<Typography>
							Una ves realizada la transferencia de saldo no es posible deshacer esa acción.
						</Typography>
					</li>
					<li>
						<Typography>
							Verifique bien los datos ingresados.
						</Typography>
					</li>
				</ul>
			</Grid>
      <Grid item xs={12} sm={6}>
        <InputHook
          control={control}
          rules={{
            required: '* Campo requerido',
            minLength: { value: 3, message: 'Error: Demaciado corto' },
            maxLength: { value: 30, message: 'Error: Demaciado largo' },
          }}
          name='usernsme'
          label='Usuario o cédula'
          size='small'
          helperText='Ingrese el usuario al que desea transferir saldo'
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputMaskHook
					control={control}
					rules={{
						required: '* Campo requerido',
						min: { value: 0, message: 'Error: El monto debe ser mayor a 0' },
					}}
          size='small'
					name='amount_to_send'
					label='Monto a transferir'
					helperText='Ingrese el monto que desea transferir'
					fullWidth
          decimalScale={2}
          thousandSeparator='.'
          decimalSeparator=','
          allowNegative={false}
          prefix={'Bs. '}
				/>
      </Grid>
    </>
  )
}
