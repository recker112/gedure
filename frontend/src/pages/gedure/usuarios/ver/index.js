import React, { useEffect, Suspense } from 'react'

// Router
import { useParams, Outlet } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es';

// Components
import useNotifier from '../../../../hooks/useNotifier';
import BreadCrumbsShow from './BreadCrumbsShow';
import Navs from './Navs';
import TourShowUser from './TourShowUser';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../../store/slices/requestStatus/async_trunk/users/getUser';
import { resetDataRequest } from '../../../../store/slices/requestStatus';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function PageShowUser() {
  const { id } = useParams();
  useNotifier({
    message404: 'Usuario no encontrado'
  });

  const { userShow: { userSelected, loading }, count_notify } = useSelector(state => ({
    userShow: state.requestStatus.userShow,
    count_notify: state.auth.notify.count,
  }));
  const dispatch = useDispatch();

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Ver usuario - La Candelaria` : 'Ver usuario - La Candelaria';

  useEffect(() => {
    if (loading) {
      dispatch(getUser(id));
    }

    return () => {
      dispatch(resetDataRequest({ select: 'userShow' }));
    }

    // eslint-disable-next-line
  },[]);

  return (
    <Box component='main' sx={classes.container}>
      <Container maxWidth='md'>
        {loading && (
          <Box textAlign='center'>
            <CircularProgress />
          </Box>
        )}
        {(!loading && !userSelected.username) && (
					<Box fontSize='body1.fontSize' textAlign='center'>
						No se ha podido encontrar al usuario #{id}, es posible que este usuario se encuentre desactivado o eliminado.
					</Box>
				)}
        {(!loading && userSelected.username) && (
          <>
            <Box mb={4}>
							<BreadCrumbsShow />
						</Box>
            <Grid container spacing={2}>
              <Navs user={userSelected} />
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
          </>
        )}
      </Container>
      <TourShowUser />
    </Box>
  )
}
