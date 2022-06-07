import React, { useEffect } from 'react';

// MUI
import { Box, CircularProgress, Container, Grid, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from "@mui/icons-material/Refresh";

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

  const handleRefresh = () => {
    dispatch(getDataUserBF())
  }

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
        <Grid container sx={{mb: 3}} justifyContent='space-between'>
          <Grid item xs={10}>
            <Box fontSize='h4.fontSize' className='text__bold--big'>Boletas cargadas</Box>
          </Grid>
          <Grid container justifyContent='flex-end' alignItems='center' item xs={2}>
            <Tooltip title="Recargar" arrow>
              <IconButton
                disabled={loading}
                onClick={handleRefresh}
                aria-label="return"
                component='span'
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
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