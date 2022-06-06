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
import { deleteSCT, setConfirmConfgsSCT } from '../../../store/slices/gedure/soli_contacto/index.js';

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

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Solicitudes de contácto
        </Box>
        <Table />
        <ShowSC />
        <DialogConfirmation
          rdx1='gdSCTable' 
          rdx2='deleteSC'
          close={
            setConfirmConfgsSCT({open: false, data: {}, confirm: 'deleteSC'})
          }
          request={
            data => deleteSCT(data.id)
          }
        >
          {(data) => (<span>Está a punto de eliminar la solicitud "<strong>{data.asunto}</strong>". Una vez realizada no se podrá deshacer esta acción.</span>)}
        </DialogConfirmation>
      </Container>
      <TourSoliC />
    </Box>
  )
}
