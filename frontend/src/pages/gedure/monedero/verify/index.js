import React, { useState } from 'react';

// Router 
import { useNavigate } from 'react-router-dom';

// MUI
import { Grid, Slide } from '@mui/material';

// Components
import useNotifier from '../../../../hooks/useNotifier';
import TourVerifyPay from './TourVerifyPay';
import Aside from '../../../../components/steppers/Aside';
import Forms from './Forms';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  aside: theme => ({
    backgroundColor: theme.palette.primary.main + 'c7',
  }),
}

const steps = [
	'Pagos pendientes',
	'Seleccionar cuenta', 
	'Datos de la transferencia',
];

export default function VerificarPagos() {
  useNotifier();
  const [activeStep, setActiveStep] = useState(0);

  const { count_notify } = useSelector(state => ({
    count_notify: state.auth.notify.count,
  }));

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Verificar pagos - La Candelaria` : `Verificar pagos - La Candelaria`;

  const navigate = useNavigate();

  const handleReturn = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/gedure/monedero');
    }
  }

  const handleNext = () => {
    setActiveStep(value => {
      if (value < steps.length - 1) {
        return value + 1;
      }

      return value;
    })
  }

  const handleBack = () => {
    setActiveStep(value => {
      if (value > 0) {
        return value - 1;
      }

      return value;
    })
  }

  const handleReset = () => setActiveStep(0);

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <Grid sx={classes.aside} item xs={12} sm={12} md={4} lg={3}>
          <Aside 
            steps={steps}
            handleReturn={handleReturn}
            activeStep={activeStep}
            title='Verificar Pagos'
          />
        </Grid>
      </Slide>

      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Grid container direction='column' justifyContent='space-between' item sm={12} md={8} lg={9} data-tour="content">
          <Forms
            handleNext={handleNext}
            handleBack={handleBack}
            handleReset={handleReset}
            activeStep={activeStep}
          />
        </Grid>
      </Slide>
      <TourVerifyPay setStep={setActiveStep} />
    </Grid>
  )
}
