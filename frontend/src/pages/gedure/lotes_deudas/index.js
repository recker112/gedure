import React from 'react';

// MUI
import { Box, Button, Container, Grid } from '@mui/material';

// Components
import DialogConfirmation from '../../../components/DialogConfirmation';
import useNotifier from '../../../hooks/useNotifier';
import Table from './Table';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import CreateLoteDeuda from './CreateLoteDeuda';
import { setRequestStatus } from '../../../store/slices/requestStatusWallet';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function LotesDeudas() {
  document.title = 'Lotes de deudas - La Candelaria';
  useNotifier();

  const { administrar: { posts_create } } = useSelector((state) => state.auth.permissions);
  const dispatch = useDispatch();

  const handleOpenCreate = () => {
    dispatch(setRequestStatus({ select: 'createLoteDeuda', open: true }));
  }

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Lotes de deudas
        </Box>
        <Grid container spacing={2}>
          <Grid container justifyContent="flex-end" item xs={12}>
            <Button variant="contained" data-tour="gdPub__create" onClick={handleOpenCreate} disabled={!posts_create}>Crear lote de deudas</Button>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
        <CreateLoteDeuda />
      </Container>
    </Box>
  )
}
