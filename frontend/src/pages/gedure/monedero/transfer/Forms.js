import React from 'react';

// Form
import { FormProvider, useForm } from 'react-hook-form';

// DATE-FNS
import esLocale from 'date-fns/locale/es';

// MUI
import { Button, Container, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import DataTransfer from './DataTransfer';
import DataConfirm from './DataConfirm';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { verifyTransfer } from '../../../../store/slices/requestStatusWallet/async_trunk/monedero/verifyTransfer';
import { confirmTransfer } from '../../../../store/slices/requestStatusWallet/async_trunk/monedero/confirmTransfer';

const classes = {
  container: {
    marginTop: 2
  },
  controls: {
    mt: 4,
    mb: 2,
  }
}

export default function Form({
  handleBack,
  handleNext,
  handleReset,
  activeStep,
}) {
  const methods = useForm({
		mode: 'onTouched',
	});

  const { loadingVerify, loadingConfirm } = useSelector(state => ({
    loadingVerify: state.requestStatusWallet.verifyTransfer.loading,
    loadingConfirm: state.requestStatusWallet.confirmTransfer.loading,
  }));
  const dispatch = useDispatch();

  const onVerify = submitData => {
    dispatch(verifyTransfer({ callBack: handleNext, submitData, errors: methods.setError }));
  }

  const onSubmit = submitData => {
    dispatch(confirmTransfer({ callBack: handleReset, submitData, errors: methods.setError }));
  }

  return (
    <FormProvider {...methods}>
      <Container sx={classes.container}>
        <form autoComplete='off' onSubmit={e => e.preventDefault()}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <Grid container spacing={2} item xs={12}>
              {activeStep === 0 && (
                <DataTransfer />
              )}
              {activeStep === 1 && (
                <DataConfirm />
              )}
            </Grid>
          </LocalizationProvider>
        </form>
      </Container>
      <Container sx={classes.controls}>
        <Stack direction='row' justifyContent='space-between' data-tour='controls'>
          <Button variant='contained' disableElevation disabled={activeStep <= 0} onClick={handleBack}>
            Regresar
          </Button>
          {activeStep === 0 && (
            <LoadingButton loading={loadingVerify} variant='contained' disableElevation onClick={methods.handleSubmit(onVerify)}>
              Siguiente
            </LoadingButton>
          )}
          {activeStep === 1 && (
            <LoadingButton
              variant='contained'
              disableElevation
              loading={loadingConfirm}
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
