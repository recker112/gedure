import React, { Suspense } from 'react';

// Router
import { Outlet } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es';

// Components
import BreadCrumbsShow from '../usuarios/ver/BreadCrumbsShow';
import Navs from '../usuarios/ver/Navs';
import TourCuenta from './TourCuenta';

// Redux
import { useSelector } from 'react-redux';
import useNotifier from '../../../hooks/useNotifier';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Cuenta() {
  document.title = 'Cuenta - La Candelaria';
  useNotifier();

  const user = useSelector(state => state.auth.user);

  return (
    <Box component='main' sx={classes.container}>
      <Container maxWidth='md'>
        <Box mb={4}>
          <BreadCrumbsShow
            userName={user.name}
            userAvatar={user.avatar}
          />
        </Box>
        <Grid container spacing={2}>
          <Navs 
            user={user}
            permissions={false}
            path='/gedure/cuenta'
            toBackURL={-1}
            curso={false}
          />
          <Grid item xs={12} sm={9}>
            <Suspense fallback={
              <Box textAlign='center'>
                <CircularProgress />
              </Box>
            }>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                <Outlet />
              </LocalizationProvider>
            </Suspense>
          </Grid>
        </Grid>
      </Container>
      <TourCuenta />
    </Box>
  )
}
