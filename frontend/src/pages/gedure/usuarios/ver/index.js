import React, { useEffect, Suspense } from 'react'

// Router
import { useParams, Outlet } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid } from '@mui/material'

// Components
import useNotifier from '../../../../hooks/useNotifier';
import BreadCrumbsShow from './BreadCrumbsShow';
import Navs from './Navs';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getData, reset } from '../../../../store/slices/gedure/usuarios/ver';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function PageShowUser() {
  document.title = 'Ver usuario - La Candelaria';
  const { id } = useParams();
  useNotifier({
    message404: 'Usuario no encontrado'
  });

  const { userSelected, loading } = useSelector(state => state.gdUSelected);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      dispatch(getData(id));
    }

    return () => {
      dispatch(reset());
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
              <Navs />
              <Grid item xs={12} sm={9}>
                <Suspense fallback={
                  <Box textAlign='center'>
                    <CircularProgress />
                  </Box>
                }>
                  <Outlet />
                </Suspense>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  )
}
