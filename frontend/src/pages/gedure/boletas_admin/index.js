import React from 'react';

// MUI
import { Box, Button, Container, Grid } from '@mui/material';

// Components
import useNotifier from '../../../hooks/useNotifier';
import DeleteBoleta from './DeleteBoleta';
import UploadBoleta from './UploadBoleta';
import Table from './Table';
import TourBoleta from './TourBoleta';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatus';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Boletas() {
  useNotifier();

  const { administrar: { boletas_upload }, count_notify } = useSelector((state) => ({
    administrar: state.auth.permissions.administrar,
    count_notify: state.auth.notify.count,
  }));
  const dispatch = useDispatch();

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Boletas - La Candelaria` : 'Boletas - La Candelaria';

  const handleOpenUpload = () => {
    dispatch(setRequestStatus({select: 'uploadBoleta', open: true}));
  }

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Boletas
        </Box>
        <Grid container spacing={2}>
          <Grid container justifyContent="flex-end" item xs={12}>
            <Button variant="contained" data-tour="gdBol__upload" onClick={handleOpenUpload} disabled={!boletas_upload}>Cargar boletas</Button>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
        <DeleteBoleta />
        <UploadBoleta />
      </Container>
      <TourBoleta />
    </Box>
  )
}
