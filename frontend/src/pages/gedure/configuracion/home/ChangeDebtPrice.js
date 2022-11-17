import React, { useEffect } from 'react';

// MUI
import { Grid, Paper, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import { InputMaskHook } from '../../../../components/form/inputs';

// Form
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setConfigs } from '../../../../store/slices/requestStatus/async_trunk/configuracion/general/setConfigs';

export default function ChangeDebtPrice() {
  const { getLoading, getData, setLoading, gc_edit } = useSelector(state => ({
    getLoading: state.requestStatus.getConfigs.loading,
    getData: state.requestStatus.getConfigs.data,
    setLoading: state.requestStatus.setConfigs.loading,
    gc_edit: state.auth.permissions.gedure.gc_edit,
  }))
  const dispatch = useDispatch();

  const { control, handleSubmit, setValue, setError } = useForm();

  useEffect(() => {
    if (getData !== null) {
      getData.forEach(item => {
        setValue(item.name, item.value);
      });
    }
  
  // eslint-disable-next-line
  }, [getData]);

  const onSubmit = submitData => {
    dispatch(setConfigs({ submitData, setError }));
  }

  return (
    <Paper component='form' autoComplete='off' onSubmit={handleSubmit(onSubmit)} data-tour="change-debt-price" className='paper--padding'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' className='text__bold--semi'>
            Precios automáticos
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <InputMaskHook
            control={control}
            rules={{
              required: '* Campo requerido',
              min: { value: 0, message: 'Error: El monto debe ser mayor a 0' },
            }}
            name='gc_mensualidad'
            label='Monto de la mensualidad'
            helperText='Ingrese el monto a pagar de la mensualidad'
            fullWidth
            size='small'
            disabled={getLoading || setLoading || !gc_edit}
            decimalScale={2}
            thousandSeparator='.'
            decimalSeparator=','
            allowNegative={false}
            prefix={'$ '}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <InputMaskHook
            control={control}
            rules={{
              required: '* Campo requerido',
              min: { value: 0, message: 'Error: El monto debe ser mayor a 0' },
            }}
            name='gc_inscripción'
            label='Monto de la inscripción'
            helperText='Ingrese el monto a pagar de la inscripción'
            fullWidth
            size='small'
            disabled={getLoading || setLoading || !gc_edit}
            decimalScale={2}
            thousandSeparator='.'
            decimalSeparator=','
            allowNegative={false}
            prefix={'$ '}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography className='text__opacity--semi'>
            Aquí puede cambiar el monto de las deudas generadas automáticamente en el sistema. Esto solo cambiará el precio de las deudas no generadas, las que ya fueron generadas debe de cambiarlas manualmente.
          </Typography>
        </Grid>

        <Grid container justifyContent='flex-end' item xs={12}>
          <LoadingButton
            variant='contained' 
            loading={setLoading}
            disableElevation
            disabled={!gc_edit}
            onClick={handleSubmit(onSubmit)}
          >
            Cambiar
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
