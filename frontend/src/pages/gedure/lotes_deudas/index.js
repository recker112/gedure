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
import EditLoteDeuda from './EditLoteDeuda';
import { destroyLoteDebts } from '../../../store/slices/requestStatusWallet/async_trunk/lotes_deudas/destroyLoteDebts';

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

  const { administrar_transac: { debt_lote_create } } = useSelector((state) => state.auth.permissions);
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
            <Button variant="contained" onClick={handleOpenCreate} disabled={!debt_lote_create}>Crear lote de deudas</Button>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
        <CreateLoteDeuda />
        <EditLoteDeuda />
        <DialogConfirmation 
          rdx1='requestStatusWallet' 
          rdx2='deleteLoteDeuda'
          close={
            setRequestStatus({open: false, data: {}, select: 'deleteLoteDeuda'})
          }
          request={
            data => destroyLoteDebts(data)
          }
        >
          {(dataR) => (<span>Está a punto de eliminar el lote de deuda <strong>{dataR.reason} (#{dataR.id})</strong>. Una vez realizada no se podrá deshacer esta acción.</span>)}
        </DialogConfirmation>
      </Container>
    </Box>
  )
}
