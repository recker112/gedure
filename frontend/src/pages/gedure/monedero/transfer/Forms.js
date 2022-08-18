import React from 'react';

// Form
import { FormProvider, useForm } from 'react-hook-form';

// DATE-FNS
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

// MUI
import { Button, Container, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import DataTransfer from './DataTransfer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { verifyTransfer } from '../../../../store/slices/requestStatusWallet/async_trunk/monedero/verifyTransfer';

const classes = {
  container: {
    marginTop: 2
  },
  controls: {
    my: 2,
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

  const { loading } = useSelector(state => ({
    loading: state.requestStatusWallet.verifyTransfer.loading,
  }));
  const dispatch = useDispatch();

  const callBack = () => {
    handleNext();
  }

  const verify = submitData => {
    dispatch(verifyTransfer({ callBack, submitData }));
  }

  return (
    <FormProvider {...methods}>
      <Container sx={classes.container}>
        <form autoComplete='off'>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <Grid container spacing={2} item xs={12}>
              {activeStep === 0 && (
                <DataTransfer />
              )}
            </Grid>
          </LocalizationProvider>
        </form>
      </Container>
      <Container sx={classes.controls}>
        <Stack direction='row' justifyContent='space-between'>
          <Button variant='contained' disableElevation disabled={activeStep <= 0} onClick={handleBack}>
            Regresar
          </Button>
          {activeStep === 0 && (
            <LoadingButton loading={loading} variant='contained' disableElevation onClick={methods.handleSubmit(verify)}>
              Siguiente
            </LoadingButton>
          )}
          {activeStep === 1 && (
            <LoadingButton
              variant='contained'
              disableElevation
              onClick={methods.handleSubmit()}
            >
              Procesar
            </LoadingButton>
          )}
        </Stack>
      </Container>
    </FormProvider>
  )
}
