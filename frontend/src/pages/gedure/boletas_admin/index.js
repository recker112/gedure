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
import { setOpenBF } from '../../../store/slices/gedure/boletas_admin/forms';

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

  const { administrar: { boletas_upload } } = useSelector((state) => state.auth.permissions);
  const dispatch = useDispatch();

  const handleOpenUpload = () => {
    dispatch(setOpenBF({select: 'upload', open: true}));
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
