import React from 'react';

// MUI
import { Box, Button, Container, Grid } from '@mui/material';

// Components
import TourLotesDeudas from './TourLotesDeudas';
import DialogConfirmation from '../../../components/DialogConfirmation';
import useNotifier from '../../../hooks/useNotifier';
import Table from './Table';
import EditLoteDeuda from './EditLoteDeuda';
import CreateLoteDeuda from './CreateLoteDeuda';
import VerifySolvencia from './VerifySolvencia';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatusWallet';
import { destroyLoteDebts } from '../../../store/slices/requestStatusWallet/async_trunk/lotes_deudas/destroyLoteDebts';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function LotesDeudas() {
  useNotifier();

  const { administrar_transac: { debt_lote_create }, count_notify } = useSelector((state) => ({
    administrar_transac: state.auth.permissions.administrar_transac,
    count_notify: state.auth.notify.count,
  }));
  const dispatch = useDispatch();

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Lotes de deudas - La Candelaria` : 'Lotes de deudas - La Candelaria';

  const handleOpenCreate = () => {
    dispatch(setRequestStatus({ select: 'createLoteDeuda', open: true }));
  }

  const handleOpenVerify = () => {
    dispatch(setRequestStatus({ select: 'verifySolvencia', open: true }));
  }

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Lotes de deudas
        </Box>
        <Grid container spacing={2}>
          <Grid container spacing={1} justifyContent="flex-end" item xs={12}>
            <Grid item>
              <Button 
                variant="contained"
                onClick={handleOpenVerify}
                data-tour="verify-solvencia"
              >
                Verificar solvencia
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                onClick={handleOpenCreate} 
                disabled={!debt_lote_create}
                data-tour="create-lote-deuda"
              >
                Crear lote de deudas
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
        <CreateLoteDeuda />
        <EditLoteDeuda />
        <VerifySolvencia />
        <DialogConfirmation 
          rdx1='requestStatusWallet' 
          rdx2='deleteLoteDeuda'
          close={
            setRequestStatus({open: false, select: 'deleteLoteDeuda'})
          }
          request={
            data => destroyLoteDebts(data.id)
          }
        >
          {(dataR) => (<span>Está a punto de eliminar el lote de deuda <strong>{dataR.reason} (#{dataR.id})</strong>. Una vez realizada no se podrá deshacer esta acción.</span>)}
        </DialogConfirmation>
      </Container>
      <TourLotesDeudas />
    </Box>
  )
}
