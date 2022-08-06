import React from 'react';

// MUI
import { Box, Container } from '@mui/material';

// Components
import useNotifier from '../../../hooks/useNotifier';
import Table from './Table';
import ShowSC from './ShowSC';
import TourSoliC from './TourSoliC';
import DialogConfirmation from '../../../components/DialogConfirmation';

// Redux
import { useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatus';
import { deleteSoliContacto } from '../../../store/slices/requestStatus/async_trunk/soli_contacto/deleteSoliContacto';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function SoliContacto() {
  document.title = 'Solicitudes de contacto - La Candelaria';
  useNotifier();

  const count_notify = useSelector(state => state.auth.notify.count);

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Solicitudes de contacto - La Candelaria` : 'Solicitudes de contacto - La Candelaria';

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Solicitudes de contácto
        </Box>
        <Table />
        <ShowSC />
        <DialogConfirmation
          rdx1='requestStatus' 
          rdx2='deleteSoliContacto'
          close={
            setRequestStatus({open: false, data: {}, select: 'deleteSoliContacto'})
          }
          request={
            data => deleteSoliContacto(data.id)
          }
        >
          {(data) => (<span>Está a punto de eliminar la solicitud "<strong>{data.asunto}</strong>". Una vez realizada no se podrá deshacer esta acción.</span>)}
        </DialogConfirmation>
      </Container>
      <TourSoliC />
    </Box>
  )
}
