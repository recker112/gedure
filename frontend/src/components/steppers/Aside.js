import React from 'react';

// MUI
import { Container, Grid, IconButton, Step, StepConnector, stepConnectorClasses, StepLabel, stepLabelClasses, Stepper, styled, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CustomStepperConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: 'white',
      opacity: 1
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: 'white',
    opacity: 0.3
  },
}));

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  [`&.${stepLabelClasses.root}`]: {
    [`& .${stepLabelClasses.iconContainer}`]: {
      [`& .${stepLabelClasses.completed}`]: {
        color: theme.palette.secondary.main,
      },
      [`& .${stepLabelClasses.active}`]: {
        color: theme.palette.secondary.main,
      },
    },
    [`& .${stepLabelClasses.labelContainer}`]: {
      [`& .${stepLabelClasses.completed}`]: {
        color: theme.palette.primary.contrastText,
      },
      [`& .${stepLabelClasses.active}`]: {
        color: theme.palette.primary.contrastText,
      },
      [`& .${stepLabelClasses.disabled}`]: {
        color: theme.palette.primary.contrastText,
        opacity: 0.7
      },
    },
  },
}));

const classes = {
  container: {
    marginTop: 2,
    userSelect: 'none',
    position: 'relative',
    zIndex: 10,
  },
  title: theme => ({
    color: theme.palette.primary.contrastText,
    ml: 1
  }),
}

export default function Aside({
  steps,
  handleReturn,
  activeStep,
  title,
}) {
  return (
    <Container sx={classes.container}>
      <Grid container>
        <Grid container justifyContent='space-between' alignItems='center' item xs={12}>
          <Grid item>
            <Tooltip title="Volver" arrow>
              <IconButton
                component='span'
                data-tour="return"
                onClick={handleReturn}
              >
                <ArrowBackIcon sx={theme => ({color: theme.palette.primary.contrastText})} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs>
            <Typography sx={classes.title} component='div' variant='h5'>
              {title}
            </Typography>
          </Grid>
        </Grid>
        
        <Grid container sx={{mt: 3, mb: 3}} item xs={12}>
          <Stepper
            activeStep={activeStep} 
            orientation="vertical"
            data-tour="steppers"
            connector={<CustomStepperConnector />}
          >
            {steps.map((label, i) => (
              <Step key={i}>
                <CustomStepLabel>{label}</CustomStepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Container>
  )
}
