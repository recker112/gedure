import React from 'react';

// MUI
import { Button, Container, Grid, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es';

// DATE-FNS
import { format } from 'date-fns';

// Form
import { FormProvider, useForm } from 'react-hook-form';

// Components
import PagosPendientes from './PagosPendientes';
import SelectAccount from './SelectAccount';
import DataPayments from './DataPayments';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { verifyPayments } from '../../../../store/slices/requestStatusWallet/async_trunk/monedero/verifyPayments';

const classes = {
  container: {
    marginTop: 3
  },
  controls: {
    mt: 4,
    mb: 2,
  }
}

export default function Forms({
  handleBack,
  handleNext,
  handleReset,
  activeStep,
}) {
  const methods = useForm({
		mode: 'onTouched',
	});

  const { loading } = useSelector(state => ({
    loading: state.requestStatusWallet.verifyPayments.loading,
  }))
  const dispatch = useDispatch();

  const callBack = () => {
    handleReset();
    methods.reset();
  }

  const onSubmit = submitData => {
    if (submitData.date) {
      submitData.date = format(new Date(submitData.date),'yyyy/MM/dd');
    }

    submitData.bank_account = submitData.bank_account.id;

    dispatch(verifyPayments({submitData, callBack}));
  }

  return (
    <FormProvider {...methods}>
      <Container sx={classes.container}>
        <form autoComplete='off' onSubmit={e => e.preventDefault()}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <Grid container spacing={2} item xs={12}>
              {activeStep === 0 && (
                <PagosPendientes />
              )}
              {activeStep === 1 && (
                <SelectAccount />
              )}
              {activeStep === 2 && (
                <DataPayments />
              )}
						</Grid>
          </LocalizationProvider>
        </form>
      </Container>
      <Container sx={classes.controls}>
        <Stack direction='row' justifyContent='space-between' data-tour='controls'>
          <Button variant='contained' disableElevation disabled={activeStep <= 0 || loading} onClick={handleBack}>
            Regresar
          </Button>
          {activeStep < 2 && (
            <Button disabled={loading} variant='contained' disableElevation onClick={methods.handleSubmit(handleNext)}>
              Siguiente
            </Button>
          )}
          {activeStep === 2 && (
            <LoadingButton
              variant='contained' 
              loading={loading}
              disableElevation
              onClick={methods.handleSubmit(onSubmit)}
            >
              Procesar
            </LoadingButton>
          )}
        </Stack>
      </Container>
    </FormProvider>
  )
}
