import React, { useCallback } from 'react';

// MUI
import { Grid, MenuItem, Paper, Typography } from '@mui/material';

// Form
import { useForm } from 'react-hook-form';
import { InputMaskHook, InputHook } from '../../../../components/form/inputs';
import { SelectHook } from '../../../../components/form/select';

// Components
import { BankList } from '../../../../components/Utils/BankList';
import LoadingButton from '@mui/lab/LoadingButton';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createBankAccount } from '../../../../store/slices/gedure/configuracion/pagos/createBankAccount';

export default function CreateBankAccount() {
  const loading = useSelector(state => state.requestStatus.createBankAccount.loading);
  const dispatch = useDispatch();

  const { control, handleSubmit, setError } = useForm();

  const MenuItemList = BankList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.label}</MenuItem>
	),[]));

  const onSubmit = submitData => {
    dispatch(createBankAccount({ submitData, setError }));
  }

  return (
    <Paper component='form' autoComplete='off' className='paper--padding'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' className='text__bold--semi'>
            Crear cuenta bancaria
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputMaskHook
            control={control}
            rules={{
              required: '* Campo requerido',
              minLength: { value: 20, message: 'Error: Cuenta no válida' },
              maxLength: { value: 20, message: 'Error: Cuenta no válida' },
            }}
            name='n_account'
            label='N° de cuenta'
            fullWidth
            size='small'
            disabled={loading}
            format="#### #### #### #### ####"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputMaskHook
            control={control}
            rules={{
              required: '* Campo requerido',
              minLength: { value: 9, message: 'Error: RIF no válida' },
              maxLength: { value: 9, message: 'Error: RIF no válida' },
            }}
            name='rif'
            label='RIF'
            fullWidth
            size='small'
            disabled={loading}
            format="J-########-#"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputHook
            control={control}
            rules={{
              required: '* Campo requerido',
              minLength: { value: 6, message: 'Error: Demaciado corto' },
              maxLength: { value: 100, message: 'Error: Demaciado largo' },
            }}
            name='name'
            label='Nombre'
            size='small'
            fullWidth
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputHook
            control={control}
            rules={{
              required: '* Campo requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Error: Correo no válido',
              },
            }}
            name='email'
            label='Correo'
            size='small'
            fullWidth
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectHook
            name='type'
            label='Tipo de cuenta'
            control={control}
            size='small'
            disabled={loading}
            fullWidth
          >
            <MenuItem value=''>
              <em>Ninguno</em>
            </MenuItem>
            <MenuItem value='ahorro'>
              Ahorro
            </MenuItem>
            <MenuItem value='corriente'>
              Corriente
            </MenuItem>
          </SelectHook>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectHook
            name='code'
            label='Banco'
            control={control}
            disabled={loading}
            size='small'
            fullWidth
          >
            <MenuItem value=''>
              <em>Ninguno</em>
            </MenuItem>
            {MenuItemList}
          </SelectHook>
        </Grid>
        <Grid container justifyContent='flex-end' item xs={12}>
          <LoadingButton
            variant='contained' 
            loading={loading}
            disableElevation
            onClick={handleSubmit(onSubmit)}
          >
            Agregar
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  )
}
