import React from 'react';

// MUI
import { Button, Container, Grid, Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es';

// Components
import PagosPendientes from './PagosPendientes';

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
  return (
    <>
      <Container sx={classes.container}>
        <form autoComplete='off'>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <Grid container spacing={2} item xs={12}>
              {activeStep === 0 && (
                <PagosPendientes />
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
          <Button disabled={activeStep > 1} onClick={handleNext}>
            Siguiente
          </Button>
        </Stack>
      </Container>
    </>
  )
}
