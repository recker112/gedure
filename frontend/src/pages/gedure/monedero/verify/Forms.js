import React from 'react';

// MUI
import { Button, Container, Grid, Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es';

// Form
import { FormProvider, useForm } from 'react-hook-form';

// Components
import PagosPendientes from './PagosPendientes';
import SelectAccount from './SelectAccount';

const classes = {
  container: {
    marginTop: 2
  },
  controls: {
    my: 2,
  }
}

export default function Forms({
  handleBack,
  handleNext,
  activeStep,
}) {
  const methods = useForm({
		mode: 'onTouched',
	});

  const onSubmit = submitData => {
    console.log(submitData);
  }

  return (
    <FormProvider {...methods}>
      <Container sx={classes.container}>
        <form autoComplete='off'>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <Grid container spacing={2} item xs={12}>
              {activeStep === 0 && (
                <PagosPendientes />
              )}
              {activeStep === 1 && (
                <SelectAccount />
              )}
						</Grid>
          </LocalizationProvider>
        </form>
      </Container>
      <Container sx={classes.controls}>
        <Stack direction='row' justifyContent='space-between'>
          <Button disabled={activeStep <= 0} onClick={handleBack}>
            Regresar
          </Button>
          {activeStep < 2 && (
            <Button onClick={handleNext}>
              Siguiente
            </Button>
          )}
          {activeStep === 2 && (
            <Button type='submit' onClick={methods.handleSubmit(onSubmit)}>
              Procesar
            </Button>
          )}
        </Stack>
      </Container>
    </FormProvider>
  )
}
