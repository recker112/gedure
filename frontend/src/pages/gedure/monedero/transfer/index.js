import React, { useState } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { Grid, Slide } from '@mui/material';

// Components
import useNotifier from '../../../../hooks/useNotifier';
import Aside from '../../../../components/steppers/Aside';
import Forms from './Forms';

// Redux
import { useSelector } from 'react-redux';
import TourTransfer from './TourTransfer';

const classes = {
  aside: theme => ({
    backgroundColor: theme.palette.primary.main + 'c7',
  }),
}

const steps = [
	'Rellenar datos', 
	'Confirmar datos',
];

export default function TransfeririSaldo() {
  useNotifier();
  const [activeStep, setActiveStep] = useState(0);

  const { count_notify } = useSelector(state => ({
    count_notify: state.auth.notify.count,
  }));

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Transferir saldo - La Candelaria` : `Transferir saldo - La Candelaria`;

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

  const handleReset = () => navigate('/gedure/monedero');

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <Grid sx={classes.aside} item xs={12} sm={12} md={4} lg={3}>
          <Aside
            steps={steps}
            handleReturn={handleReturn}
            activeStep={activeStep}
            title='Transferir saldo'
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
      <TourTransfer setStep={setActiveStep} />
    </Grid>
  )
}
