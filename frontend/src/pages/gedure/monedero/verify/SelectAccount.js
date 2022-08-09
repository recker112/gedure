import React from 'react';

// MUI
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Form
import { useFormContext } from 'react-hook-form';

// Components
import { AutoCompleteAsyncHook } from '../../../../components/form/inputs';
import { parseToAccountString } from '../../../../components/Utils/ParseString';
import { BankListSearch } from '../../../../components/Utils/BankList';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAccountSelected } from '../../../../store/slices/requestStatusWallet/async_trunk/monedero/getAccountSelected';

export default function SelectAccount() {
  const { control, watch } = useFormContext();

  const bank_account = watch('bank_account', {}) || {};

  const { dataAccountSelected } = useSelector(state => ({
    dataAccountSelected: state.requestStatusWallet.verifyPayments.dataAccountSelected,
  }));
  const dispatch = useDispatch();

  const handleGetSelected = (valueInput) => {
    dispatch(getAccountSelected(valueInput));
  }

  return (
    <>
      <Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--semi'>
					Seleccionar cuenta de transferencia
				</Typography>
			</Grid>
      <Grid item xs={12}>
        <AutoCompleteAsyncHook
          data={dataAccountSelected}
          name='bank_account'
          label='Buscar cuenta bancaria'
          control={control}
          getOptionLabel={(option) => option.name || ''}
          renderOption={(props, option) => (
            <Box component="li" {...props} flexDirection='column' alignItems='flex-start !important'>
              {option.name}
              <i>{parseToAccountString(option.n_account)}</i>
            </Box>
          )}
          isOptionEqualToValue={(option, value) => option.n_account === value.n_account}
          helperText='Busque la cuenta bancaria a la cual realizó la transferencia'
          handleRequest={handleGetSelected}
          rules={{
            required: { value: true, message: '* Campo requerido' },
          }}
        />
      </Grid>
      <Grid sx={{mt: 2}} container justifyContent='center' item xs={12}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardContent>
							<Typography variant='h6' color="textSecondary" gutterBottom>
								Cuenta bancaria
							</Typography>

							<Typography>
								Nombre de la cuenta: <Box component='span' color='text.secondary'>{bank_account.name}</Box>
							</Typography>

							<Typography>
								N° cuenta: <Box component='span' color='text.secondary'>{parseToAccountString(bank_account.n_account || '')}</Box>
							</Typography>

							<Typography>
								RIF: <Box component='span' color='text.secondary'>J-{bank_account.rif?.slice(0,-1)}-{bank_account.rif?.charAt(bank_account.rif?.length - 1)}</Box>
							</Typography>

							<Typography>
								Correo: <Box component='span' color='text.secondary'>{bank_account.email}</Box>
							</Typography>

							<Typography>
								Banco: <Box component='span' color='text.secondary'>{bank_account.code ? BankListSearch[bank_account.code] : null}</Box>
							</Typography>

							<Typography>
								Tipo de cuenta: <Box component='span' color='text.secondary'>{bank_account.type}</Box>
							</Typography>

              <Box mt={4} textAlign='center'>
                <AccountBalanceIcon sx={{fontSize: 60}} />
              </Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
    </>
  )
}