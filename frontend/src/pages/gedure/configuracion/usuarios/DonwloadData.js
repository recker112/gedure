import React from 'react';

// MUI
import { Grid, Paper, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { downloadDataUser } from '../../../../store/slices/requestStatus/async_trunk/configuracion/users/downloadDataUser';

export default function DonwloadData() {
  const { loadingData: { loading, progress } } = useSelector(state => ({
    loadingData: state.requestStatus.downloadDataUsers,
  }));
  const dispatch = useDispatch();

  const handleDownload = () => {
    dispatch(downloadDataUser());
  }

  return (
    <Paper className='paper--padding'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' className='text__bold--semi'>
            Descargar data
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <LoadingButton loading={loading} loadingIndicator={loading && progress < 99 ? `${progress}%` : null} onClick={handleDownload} variant='contained'>
            Descargar
          </LoadingButton>
        </Grid>

        <Grid item xs={12}>
          <Typography className='text__opacity--semi'>
            Aquí puede descargar la data de todos los estudiantes actualmente registrados en el sistema, esto le puede servir para poder ahorrar tiempo a la hora de realizar cambios en los cursos.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
