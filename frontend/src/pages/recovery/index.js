import React, { useState } from 'react';

import { Box, Grid, Slide } from "@mui/material";

// Components
import Aside from "./Aside";
import institutoFondo from '../../img/instituto.jpg';
import useNotifier from "../../hooks/useNotifier";
import SendEmail from './SendEmail';
import VerifyCode from './VerifyCode';
import ChangePassword from './ChangePassword';

const classes = {
  container: {
    flexGrow: 1,
  },
  aside: (theme) => ({
    background: theme.palette.primary.main + 'c7',
  }),
  fondo: {
    background: `url(${institutoFondo}) no-repeat`,
		backgroundSize: 'cover',
		width: '100%'
  }
};

export default function Recovery() {
  document.title = 'Recuperar - La Candelaria';
  const [step, setStep] = useState(0);
  useNotifier();

  return (
    <Box component='main' sx={classes.container}>
      <Grid container sx={{height: '100%'}}>
        <Slide direction="right" in={true}>
          <Grid container item sm md sx={classes.fondo}>
            <Aside step={step} />
          </Grid>
        </Slide>

        <Slide direction="left" in={true}>
          <Grid container alignItems='center' item sm={12} md={8}>
            {step === 0 && (<SendEmail setStep={setStep} />)}
            {step === 1 && (<VerifyCode setStep={setStep} />)}
            {step === 2 && (<ChangePassword setStep={setStep} />)}
          </Grid>
        </Slide>
      </Grid>
    </Box>
  );
}
