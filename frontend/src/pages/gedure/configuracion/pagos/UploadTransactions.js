import React from 'react';

// MUI
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';
import { AutoCompleteAsyncHook } from '../../../../components/form/inputs';

// Components
import { parseToAccountString } from '../../../../components/Utils/ParseString';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getBankAccountsInput } from '../../../../store/slices/requestStatus/async_trunk/configuracion/pagos/getBankAccounts';
import { uploadTransactionsRequest } from '../../../../store/slices/requestStatus/async_trunk/configuracion/pagos/uploadTransactions';

export default function UploadTransactions() {
  const { autoComplete, loading, progress } = useSelector(state => state.requestStatus.uploadTransactions);
  const dispatch = useDispatch();

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
		mode: 'onTouched'
	});

  const handleRequest = async (valueInput) => {
    await dispatch(getBankAccountsInput(valueInput));
  }

  const onSubmit = submitData => {
    const formData = new FormData();
		formData.append('transactions', submitData.transactions[0]);

    dispatch(uploadTransactionsRequest({submitData: formData, id: submitData.selected.id}));
  }

  return (
    <Paper component='form' autoComplete='off' className='paper--padding'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' className='text__bold--semi'>
            Cargar transacciones bancarias
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AutoCompleteAsyncHook
            data={autoComplete}
            name='selected'
            label='Buscar cuenta bancaria'
            helperText='Busque la cuenta bancaria a la cual desea cargar las transferencias'
            control={control}
            disabled={loading}
            getOptionLabel={(option) => parseToAccountString(option.n_account) || ""}
            isOptionEqualToValue={(option, value) => option.n_account === value.n_account}
            handleRequest={handleRequest}
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
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,application/vnd.oasis.opendocument.spreadsheet"
            type="file"
          />
          <label htmlFor="upload-transactions">
            <Button variant='contained' color={Boolean(errors.transactions) ? 'error' : 'primary'} disableElevation component='span'>
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

        <Grid container justifyContent='flex-end' item xs={12}>
          <LoadingButton onClick={handleSubmit(onSubmit)} loading={loading} loadingIndicator={loading && progress < 99 ? `${progress}%` : null} variant="contained" disableElevation>
              Cargar
            </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  )
}
