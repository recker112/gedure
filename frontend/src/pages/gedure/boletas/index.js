import React, { useEffect } from 'react';

// MUI
import { Box, CircularProgress, Container, Grid } from '@mui/material';

// Components
import useNotifier from '../../../hooks/useNotifier';
import Boleta from './Boleta';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getDataUserBF, resetDataUserBF } from '../../../store/slices/gedure/boletas';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Boletas() {
  document.title = 'Boletas - La Candelaria';
  useNotifier();

  const { loading, data } = useSelector(state => state.gdUserBForm.getData);
  const dispatch = useDispatch();

  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getDataUserBF());
    }

    return () => {
      if (loading) {
        promise.abort();
      }
      dispatch(resetDataUserBF());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Boletas cargadas</Box>
        {loading && (
          <Box textAlign='center'>
            <CircularProgress />
          </Box>
        )}
        <Grid container spacing={2}>
          {(Boolean(data.length) && !loading) && data.map((props, key) => (<Boleta key={key} {...props} />))}
          {(!data.length && !loading && (
            <Grid item xs={12}>
              <Box fontSize='body1.fontSize' textAlign='center'>
                No tiene boletas subidas por los momentos.
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}